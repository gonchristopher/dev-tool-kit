# GitHub Copilot Instructions for Dev Tool Kit

## Project Overview

This is a React + TypeScript + Vite application that provides a collection of developer utilities and cheat sheets. The application runs entirely in the browser with no backend dependencies, focusing on privacy and performance.

## Architecture & Patterns

### Core Architecture
- **Frontend**: React 18 with TypeScript, Vite build system
- **Styling**: Tailwind CSS with custom components
- **State**: React hooks (useState, useEffect, custom hooks)
- **Routing**: React Router 6 with lazy loading
- **Plugin System**: Registry pattern for tools and cheat sheets
- **Workers**: Web Workers for heavy processing tasks
- **PWA**: Service worker for offline functionality

### Key Design Principles
1. **Privacy First**: All processing happens client-side, no data sent to servers
2. **Performance**: Lazy loading, code splitting, Web Workers for CPU-intensive tasks
3. **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
4. **Responsive**: Mobile-first design with Tailwind breakpoints
5. **Type Safety**: Strict TypeScript with comprehensive type definitions

## File Structure Patterns

```
src/
├── app/           # Main app component and routing
├── components/    # Reusable UI components
├── tools/         # Individual developer tools
├── cheat-sheets/  # Reference guides and cheat sheets
├── plugins/       # Plugin system (registry, loading)
├── lib/           # Utility functions and helpers
├── workers/       # Web Workers for background processing
├── types/         # TypeScript type definitions
└── assets/        # Static assets (icons, images)
```

## Coding Conventions

### Component Patterns
- Use functional components with hooks
- Props interface should be named `{ComponentName}Props`
- Export default for main component, named exports for utilities
- Use `React.memo()` for performance optimization when needed

```typescript
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export default function Button({ children, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

### Tool Development Pattern
Each tool follows this structure:

1. **Tool Definition** (`src/tools/{tool-name}/index.ts`):
```typescript
import type { ToolDefinition } from '@/types'
import { createElement } from 'react'
import { ToolIcon } from '@heroicons/react/24/outline'

export const toolDefinition: ToolDefinition = {
  id: 'tool-name',
  title: 'Tool Display Name',
  description: 'Brief description of what the tool does',
  keywords: ['keyword1', 'keyword2'],
  element: lazy(() => import('./ToolComponent')),
  icon: createElement(ToolIcon),
  seo: {
    title: 'SEO Title',
    description: 'SEO description'
  }
}
```

2. **Tool Component** (`src/tools/{tool-name}/ToolComponent.tsx`):
```typescript
import type { ToolPageProps } from '@/types'

export default function ToolComponent({ className }: ToolPageProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Tool UI implementation */}
    </div>
  )
}
```

### Cheat Sheet Pattern
Each cheat sheet follows this structure:

```typescript
import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { IconComponent } from '@heroicons/react/24/outline'

export const cheatSheetName: CheatSheetDefinition = {
  id: 'unique-id',
  title: 'Display Title',
  description: 'Brief description',
  category: 'Development' | 'System' | 'Database' | 'Languages',
  tags: ['tag1', 'tag2'],
  lastUpdated: '2025-10-05',
  icon: createElement(IconComponent),
  sections: [
    {
      title: 'Section Name',
      items: [
        {
          title: 'Item Title',
          code: 'code snippet or command',
          description: 'What this does',
          shortcut: 'Ctrl+Alt+T', // Optional keyboard shortcut
          os: 'all' // Optional OS specification
        }
      ]
    }
  ]
}
```

## State Management Patterns

### Local State
Use `useState` for component-local state:
```typescript
const [input, setInput] = useState('')
const [isLoading, setIsLoading] = useState(false)
const [result, setResult] = useState<ProcessingResult | null>(null)
```

### Custom Hooks
Create custom hooks for shared logic:
```typescript
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  })

  const setStoredValue = useCallback((value: T) => {
    try {
      setValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving to localStorage:`, error)
    }
  }, [key])

  return [value, setStoredValue] as const
}
```

## Web Worker Patterns

For CPU-intensive operations, use Web Workers:

1. **Worker Definition** (`src/workers/{operation}Worker.ts`):
```typescript
import type { WorkerMessage, WorkerResponse } from '@/types'

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type, payload, id } = event.data

  try {
    let result
    switch (type) {
      case 'PROCESS_DATA':
        result = processData(payload)
        break
      default:
        throw new Error(`Unknown message type: ${type}`)
    }

    const response: WorkerResponse = {
      type: `${type}_SUCCESS`,
      payload: result,
      id
    }
    self.postMessage(response)
  } catch (error) {
    const response: WorkerResponse = {
      type: `${type}_ERROR`,
      payload: null,
      id,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
    self.postMessage(response)
  }
}
```

2. **Worker Hook** (`src/lib/useWorker.ts`):
```typescript
export function useWorker<T, R>(workerUrl: string) {
  const workerRef = useRef<Worker | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback((type: string, payload: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        workerRef.current = new Worker(workerUrl)
      }

      const id = Math.random().toString(36).substring(7)
      setIsLoading(true)

      const handleMessage = (event: MessageEvent<WorkerResponse<R>>) => {
        if (event.data.id === id) {
          setIsLoading(false)
          workerRef.current?.removeEventListener('message', handleMessage)
          
          if (event.data.error) {
            reject(new Error(event.data.error))
          } else {
            resolve(event.data.payload)
          }
        }
      }

      workerRef.current.addEventListener('message', handleMessage)
      workerRef.current.postMessage({ type, payload, id })
    })
  }, [workerUrl])

  return { execute, isLoading }
}
```

## Styling Patterns

### Tailwind CSS Guidelines
- Use Tailwind utility classes for styling
- Create custom components for repeated patterns
- Use `cn()` utility for conditional classes
- Follow mobile-first responsive design

```typescript
import { cn } from '@/lib/utils'

// Conditional styling
className={cn(
  'base-classes',
  condition && 'conditional-classes',
  variant === 'primary' && 'primary-classes',
  className // Allow override
)}

// Responsive design
className="w-full md:w-1/2 lg:w-1/3"
```

### Common Component Patterns
- Cards: `bg-white dark:bg-gray-800 rounded-lg border shadow-sm`
- Buttons: `px-4 py-2 rounded-md font-medium transition-colors`
- Inputs: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2`
- Loading states: `animate-pulse` or `animate-spin`

## Error Handling Patterns

### Try-Catch with User Feedback
```typescript
const handleSubmit = async () => {
  setIsLoading(true)
  setError(null)
  
  try {
    const result = await processData(input)
    setResult(result)
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An error occurred')
  } finally {
    setIsLoading(false)
  }
}
```

### Validation Patterns
```typescript
interface ValidationResult {
  valid: boolean
  error?: string
  lineNumber?: number
  columnNumber?: number
}

function validateInput(input: string): ValidationResult {
  if (!input.trim()) {
    return { valid: false, error: 'Input cannot be empty' }
  }
  
  try {
    // Validation logic here
    return { valid: true }
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Invalid input' 
    }
  }
}
```

## Testing Patterns

Use Vitest and React Testing Library:

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Component from './Component'

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    const mockFn = vi.fn()
    render(<Component onClick={mockFn} />)
    
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })
})
```

## Performance Optimization

### Code Splitting
- Use `React.lazy()` for route-level components
- Use dynamic imports for heavy libraries
- Implement proper loading states

### Memoization
```typescript
// Expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// Callback functions
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies])

// Component memoization
export default React.memo(Component, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data
})
```

## Common Utilities

### Class Name Helper
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Debounce Hook
```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

## SEO and Accessibility

### SEO Patterns
- Use proper meta tags in tool definitions
- Implement structured data where applicable
- Use semantic HTML elements

### Accessibility Patterns
- Always include ARIA labels for interactive elements
- Use proper heading hierarchy (h1 → h2 → h3)
- Ensure keyboard navigation works
- Provide focus indicators
- Use proper color contrast ratios

```typescript
// Accessible button example
<button
  aria-label="Copy to clipboard"
  aria-describedby="copy-description"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
  onClick={handleCopy}
>
  <CopyIcon className="w-4 h-4" aria-hidden="true" />
</button>
<div id="copy-description" className="sr-only">
  Copies the formatted JSON to your clipboard
</div>
```

## When Adding New Features

1. **New Tool**: Follow the tool development pattern above
2. **New Cheat Sheet**: Use the cheat sheet pattern and register it in `src/cheat-sheets/index.ts`
3. **New Component**: Create in `src/components/` with proper TypeScript interfaces
4. **New Utility**: Add to `src/lib/` with proper exports
5. **New Hook**: Create in `src/lib/hooks/` following existing patterns

## Common Pitfalls to Avoid

1. Don't put sensitive data in localStorage (this is a client-side app)
2. Always handle loading and error states in UI
3. Use proper TypeScript types, avoid `any`
4. Don't forget to register new tools/cheat sheets in their respective index files
5. Ensure all interactive elements are keyboard accessible
6. Use Web Workers for CPU-intensive operations to avoid blocking the main thread
7. Always provide fallbacks for browser APIs that might not be supported