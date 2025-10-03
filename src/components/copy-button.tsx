import { useState } from 'react'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Button } from './button'
import type { ButtonProps } from './button'

interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'children'> {
  text: string
  successDuration?: number
  children?: React.ReactNode
}

export function CopyButton({ 
  text, 
  successDuration = 2000,
  children,
  ...buttonProps 
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), successDuration)
    } catch (err) {
      console.error('Failed to copy text:', err)
      
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        
        setCopied(true)
        setTimeout(() => setCopied(false), successDuration)
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr)
      }
    }
  }

  return (
    <Button
      onClick={copyToClipboard}
      variant={copied ? 'secondary' : buttonProps.variant || 'outline'}
      leftIcon={
        copied ? (
          <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
        ) : (
          <ClipboardIcon className="w-4 h-4" />
        )
      }
      {...buttonProps}
    >
      {children || (copied ? 'Copied!' : 'Copy')}
    </Button>
  )
}

// Minimal copy button for inline use
interface CopyIconButtonProps {
  text: string
  className?: string
  successDuration?: number
}

export function CopyIconButton({ 
  text, 
  className = '',
  successDuration = 2000 
}: CopyIconButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), successDuration)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className={`p-1.5 rounded transition-colors ${
        copied
          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
      } ${className}`}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <CheckIcon className="w-4 h-4" />
      ) : (
        <ClipboardIcon className="w-4 h-4" />
      )}
    </button>
  )
}