import { forwardRef, useState } from 'react'
import { clsx } from 'clsx'
import type { TextareaHTMLAttributes } from 'react'

interface CodeTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  showLineNumbers?: boolean
  language?: string
  softWrap?: boolean
  onSoftWrapToggle?: (enabled: boolean) => void
}

const CodeTextarea = forwardRef<HTMLTextAreaElement, CodeTextareaProps>(
  ({ 
    className, 
    label,
    error,
    showLineNumbers = false,
    language,
    softWrap = true,
    onSoftWrapToggle,
    value = '',
    ...props 
  }, ref) => {
    const [localSoftWrap, setLocalSoftWrap] = useState(softWrap)

    const toggleSoftWrap = () => {
      const newValue = !localSoftWrap
      setLocalSoftWrap(newValue)
      onSoftWrapToggle?.(newValue)
    }

    const lineCount = String(value).split('\n').length
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1)

    return (
      <div className="w-full">
        {(label || language || onSoftWrapToggle) && (
          <div className="flex items-center justify-between mb-2">
            {label && (
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
                {language && (
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    ({language})
                  </span>
                )}
              </label>
            )}
            
            {onSoftWrapToggle && (
              <button
                type="button"
                onClick={toggleSoftWrap}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {localSoftWrap ? 'Disable' : 'Enable'} wrap
              </button>
            )}
          </div>
        )}
        
        <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
          {showLineNumbers && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 select-none">
              <div className="py-3 px-2 font-mono text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                {lineNumbers.map((num) => (
                  <div key={num} className="text-right">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <textarea
            ref={ref}
            value={value}
            className={clsx(
              'w-full resize-none border-0 bg-transparent font-mono text-sm leading-relaxed text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
              showLineNumbers ? 'pl-14 pr-4' : 'px-4',
              'py-3',
              localSoftWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre overflow-x-auto',
              error && 'ring-2 ring-red-500',
              className
            )}
            style={{
              whiteSpace: localSoftWrap ? 'pre-wrap' : 'pre',
              wordWrap: localSoftWrap ? 'break-word' : 'normal',
              overflowWrap: localSoftWrap ? 'break-word' : 'normal',
            }}
            spellCheck={false}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  }
)

CodeTextarea.displayName = 'CodeTextarea'

export { CodeTextarea }
export type { CodeTextareaProps }