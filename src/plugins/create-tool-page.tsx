import type { ReactNode } from 'react'
import { clsx } from 'clsx'

interface ToolPageLayoutProps {
  title: string
  description: string
  children: ReactNode
  className?: string
  actions?: ReactNode
  sidebar?: ReactNode
}

export function ToolPageLayout({ 
  title, 
  description, 
  children, 
  className, 
  actions,
  sidebar 
}: ToolPageLayoutProps) {
  return (
    <div className={clsx('flex flex-col h-full', className)}>
      <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
            {actions && (
              <div className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
        
        {sidebar && (
          <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            {sidebar}
          </div>
        )}
      </div>
    </div>
  )
}

interface CreateToolPageOptions {
  title: string
  description: string
  className?: string
}

export function createToolPage(Component: React.ComponentType, options: CreateToolPageOptions) {
  return function ToolPage() {
    return (
      <ToolPageLayout 
        title={options.title}
        description={options.description}
        className={options.className}
      >
        <Component />
      </ToolPageLayout>
    )
  }
}