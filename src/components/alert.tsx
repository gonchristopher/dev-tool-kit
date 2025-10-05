import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import type { ReactNode } from 'react'

interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

const alertVariants = {
  success: {
    container: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
    icon: 'text-green-500 dark:text-green-400',
    title: 'text-green-900 dark:text-green-200',
    content: 'text-green-700 dark:text-green-300',
    IconComponent: CheckCircleIcon,
  },
  error: {
    container: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
    icon: 'text-red-500 dark:text-red-400',
    title: 'text-red-900 dark:text-red-200',
    content: 'text-red-700 dark:text-red-300',
    IconComponent: XCircleIcon,
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-500 dark:text-yellow-400',
    title: 'text-yellow-900 dark:text-yellow-200',
    content: 'text-yellow-700 dark:text-yellow-300',
    IconComponent: ExclamationTriangleIcon,
  },
  info: {
    container: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    icon: 'text-blue-500 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-200',
    content: 'text-blue-700 dark:text-blue-300',
    IconComponent: InformationCircleIcon,
  },
}

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className
}: AlertProps) {
  const styles = alertVariants[variant]
  const { IconComponent } = styles

  return (
    <div className={clsx(
      'rounded-lg border p-4',
      styles.container,
      className
    )}>
      <div className="flex items-start gap-3">
        <IconComponent className={clsx('w-5 h-5 flex-shrink-0 mt-0.5', styles.icon)} />

        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={clsx('text-sm font-medium mb-1', styles.title)}>
              {title}
            </h4>
          )}
          <div className={clsx('text-sm', styles.content)}>
            {children}
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className={clsx(
              'flex-shrink-0 p-1 rounded-md transition-colors hover:bg-black hover:bg-opacity-10',
              styles.icon
            )}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Toast context and provider for global notifications
import { createContext, useCallback, useContext, useState } from 'react'

interface Toast {
  id: string
  variant: AlertProps['variant']
  title?: string
  message: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }

    setToasts(prev => [...prev, newToast])

    // Auto-hide after duration (default 5 seconds)
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id)
      }, duration)
    }
  }, [hideToast])

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onHide={hideToast} />
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

function ToastContainer({ toasts, onHide }: {
  toasts: Toast[]
  onHide: (id: string) => void
}) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in"
        >
          <Alert
            variant={toast.variant}
            title={toast.title}
            onClose={() => onHide(toast.id)}
            className="shadow-lg"
          >
            {toast.message}
          </Alert>
        </div>
      ))}
    </div>
  )
}