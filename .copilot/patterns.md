# Component Architecture Patterns

## Component Hierarchy

### Layout Components
```typescript
// Main layout wrapper
<AppLayout>
  <Header />
  <main>
    <ToolContainer>
      <ToolComponent />
    </ToolContainer>
  </main>
  <Footer />
</AppLayout>
```

### Tool Components Structure
```typescript
// Tool page layout pattern
export default function ToolName({ className }: ToolPageProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <ToolHeader 
        title="Tool Name"
        description="What this tool does"
      />
      
      <ToolContent>
        <InputSection>
          <TextArea />
          <FileUpload />
        </InputSection>
        
        <OutputSection>
          <CodeBlock />
          <CopyButton />
        </OutputSection>
      </ToolContent>
      
      <ToolFooter>
        <ProcessingStats />
        <ActionButtons />
      </ToolFooter>
    </div>
  )
}
```

## Reusable Component Patterns

### Input Components
```typescript
// TextArea with validation
interface TextAreaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  rows?: number
  className?: string
}

export function TextArea({ value, onChange, error, placeholder, rows = 10, className }: TextAreaProps) {
  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full px-3 py-2 border rounded-md font-mono text-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'resize-vertical',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
      />
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <ExclamationCircleIcon className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  )
}
```

### Button Components
```typescript
// Versatile button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  leftIcon, 
  rightIcon, 
  children, 
  className, 
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Size variants
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        
        // Color variants
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        variant === 'outline' && 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
        variant === 'ghost' && 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner className="w-4 h-4" />
      ) : leftIcon ? (
        leftIcon
      ) : null}
      
      {children}
      
      {rightIcon && !isLoading && rightIcon}
    </button>
  )
}
```

### Code Display Components
```typescript
// Syntax highlighted code block
interface CodeBlockProps {
  code: string
  language?: string
  fileName?: string
  showLineNumbers?: boolean
  maxHeight?: string
  onCopy?: () => void
}

export function CodeBlock({ 
  code, 
  language = 'text', 
  fileName, 
  showLineNumbers = false,
  maxHeight = '400px',
  onCopy 
}: CodeBlockProps) {
  return (
    <div className="relative">
      {fileName && (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-t-md">
          <span className="text-sm font-mono text-gray-600 dark:text-gray-300">{fileName}</span>
          {onCopy && (
            <Button variant="ghost" size="sm" onClick={onCopy} leftIcon={<CopyIcon className="w-4 h-4" />}>
              Copy
            </Button>
          )}
        </div>
      )}
      
      <pre
        className={cn(
          'overflow-auto bg-gray-50 dark:bg-gray-900 p-4 text-sm font-mono',
          fileName ? 'rounded-b-md' : 'rounded-md',
          showLineNumbers && 'pl-12'
        )}
        style={{ maxHeight }}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
      
      {!fileName && onCopy && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="absolute top-2 right-2"
          leftIcon={<CopyIcon className="w-4 h-4" />}
        >
          Copy
        </Button>
      )}
    </div>
  )
}
```

## Form Patterns

### Controlled Form Components
```typescript
interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  children: React.ReactNode
  description?: string
}

export function FormField({ label, htmlFor, error, required, children, description }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label 
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
      
      {children}
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <ExclamationCircleIcon className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  )
}

// Usage example
<FormField
  label="JSON Input"
  htmlFor="json-input"
  error={validationError}
  description="Paste your JSON here to format and validate"
  required
>
  <TextArea
    id="json-input"
    value={input}
    onChange={setInput}
    placeholder="Paste JSON here..."
    error={!!validationError}
  />
</FormField>
```

## Loading and Error States

### Loading Components
```typescript
// Loading spinner component
export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', className)} />
  )
}

// Loading skeleton
export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse bg-gray-200 dark:bg-gray-700 rounded', className)} />
  )
}

// Loading overlay
export function LoadingOverlay({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center rounded-md">
          <div className="flex items-center gap-3">
            <LoadingSpinner className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium">Processing...</span>
          </div>
        </div>
      )}
    </div>
  )
}
```

### Error Boundary Pattern
```typescript
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-6 border border-red-200 rounded-md bg-red-50">
      <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
      <p className="text-red-600 mb-4">{error.message}</p>
      <Button onClick={() => window.location.reload()} variant="outline">
        Reload page
      </Button>
    </div>
  )
}
```

## Modal and Dialog Patterns

### Modal Component
```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity" 
          onClick={onClose}
        />
        
        <div className={cn(
          'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl',
          'w-full max-h-[90vh] overflow-y-auto',
          size === 'sm' && 'max-w-sm',
          size === 'md' && 'max-w-md',
          size === 'lg' && 'max-w-2xl',
          size === 'xl' && 'max-w-4xl'
        )}>
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <XMarkIcon className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
```

## File Handling Patterns

### File Upload Component
```typescript
interface FileUploadProps {
  accept?: string
  multiple?: boolean
  onFileSelect: (files: File[]) => void
  maxSize?: number // in bytes
  disabled?: boolean
}

export function FileUpload({ accept, multiple, onFileSelect, maxSize, disabled }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    if (maxSize) {
      const validFiles = files.filter(file => file.size <= maxSize)
      if (validFiles.length !== files.length) {
        // Handle size error
        console.warn('Some files exceed maximum size')
      }
      onFileSelect(validFiles)
    } else {
      onFileSelect(files)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
        
        <DocumentIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-sm text-gray-600">
          Drop files here or <span className="text-blue-600 font-medium">browse</span>
        </p>
        {maxSize && (
          <p className="text-xs text-gray-500 mt-1">
            Maximum file size: {formatBytes(maxSize)}
          </p>
        )}
      </div>
    </div>
  )
}
```

## Performance Optimization Patterns

### Virtualized Lists
```typescript
interface VirtualizedListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
}

export function VirtualizedList<T>({ items, itemHeight, containerHeight, renderItem }: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight) + 1, items.length)
  const visibleItems = items.slice(startIndex, endIndex)
  
  return (
    <div
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### Memoized Search
```typescript
export function useFilteredItems<T>(items: T[], searchQuery: string, searchFields: (keyof T)[]) {
  return useMemo(() => {
    if (!searchQuery.trim()) return items
    
    const query = searchQuery.toLowerCase()
    return items.filter(item =>
      searchFields.some(field => {
        const value = item[field]
        return typeof value === 'string' && value.toLowerCase().includes(query)
      })
    )
  }, [items, searchQuery, searchFields])
}
```