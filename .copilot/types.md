# TypeScript Patterns and Definitions

## Core Type Definitions

### Tool System Types
```typescript
// Base tool definition interface
interface ToolDefinition {
  id: string                    // Unique identifier (kebab-case)
  title: string                 // Display name
  description: string           // Brief description for UI
  keywords?: string[]           // Search keywords
  element: ComponentType        // React component (lazy-loaded)
  icon?: ReactNode             // Icon component
  seo?: {                      // SEO metadata
    title?: string
    description?: string
  }
}

// Props passed to tool components
interface ToolPageProps {
  className?: string           // Allow external styling
}

// Processing result pattern
interface ProcessingResult<T = any> {
  success: boolean            // Operation success status
  data?: T                   // Result data (if successful)
  error?: string             // Error message (if failed)
  processingTime?: number    // Time taken in milliseconds
}

// Validation result pattern
interface ValidationResult {
  valid: boolean             // Is input valid?
  error?: string            // Error description
  lineNumber?: number       // Error line (for code validation)
  columnNumber?: number     // Error column (for code validation)
}
```

### Cheat Sheet System Types
```typescript
// Individual cheat sheet item
interface CheatSheetItem {
  title: string              // Item name/title
  description?: string       // What this item does
  shortcut?: string         // Keyboard shortcut (if applicable)
  code?: string             // Code snippet or command
  example?: string          // Usage example
  category?: string         // Optional categorization
  os?: 'windows' | 'mac' | 'linux' | 'all'  // OS specificity
}

// Section grouping items
interface CheatSheetSection {
  title: string             // Section name
  items: CheatSheetItem[]   // Array of items
}

// Complete cheat sheet definition
interface CheatSheetDefinition {
  id: string                     // Unique identifier
  title: string                  // Display title
  description: string            // Brief description
  category: string               // Main category
  tags?: string[]               // Search tags
  sections: CheatSheetSection[]  // Organized sections
  icon?: ReactNode              // Display icon
  lastUpdated?: string          // Last update date (YYYY-MM-DD)
}
```

### Worker Communication Types
```typescript
// Message sent to worker
interface WorkerMessage<T = any> {
  type: string              // Action type
  payload: T               // Data to process
  id: string               // Unique request ID
}

// Response from worker
interface WorkerResponse<T = any> {
  type: string             // Response type
  payload: T               // Result data
  id: string               // Matching request ID
  error?: string           // Error message (if failed)
}

// Worker hook return type
interface WorkerHook<T, R> {
  execute: (type: string, payload: T) => Promise<R>
  isLoading: boolean
}
```

## Utility Type Patterns

### Component Prop Types
```typescript
// Base component props with common patterns
interface BaseComponentProps {
  className?: string                    // Styling override
  children?: React.ReactNode           // Child content
  'data-testid'?: string              // Testing identifier
}

// Input component patterns
interface InputProps extends BaseComponentProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  required?: boolean
  autoFocus?: boolean
  onEnterKey?: () => void
}

// Button component patterns
interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

// Modal/Dialog patterns
interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}
```

### Form Handling Types
```typescript
// Form field configuration
interface FormField<T = string> {
  name: keyof T
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  validation?: (value: any) => string | undefined
  options?: Array<{ label: string; value: string }>  // For select fields
}

// Form state management
interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
}

// Form hook return type
interface UseFormReturn<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
  setValue: (name: keyof T, value: any) => void
  setError: (name: keyof T, error: string) => void
  setTouched: (name: keyof T, touched: boolean) => void
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e?: React.FormEvent) => void
  reset: () => void
}
```

## API and Data Types

### File Handling Types
```typescript
// File processing configuration
interface FileProcessingOptions {
  maxSize?: number          // Maximum file size in bytes
  allowedTypes?: string[]   // MIME types allowed
  multiple?: boolean        // Allow multiple files
  transform?: (file: File) => Promise<any>  // File transformation function
}

// File processing result
interface FileProcessingResult<T = any> {
  success: boolean
  data?: T
  error?: string
  fileName: string
  fileSize: number
  mimeType: string
  processingTime?: number
}

// File upload state
interface FileUploadState {
  files: File[]
  isUploading: boolean
  progress: number
  error?: string
  results: FileProcessingResult[]
}
```

### Settings and Preferences
```typescript
// Application theme
interface Theme {
  mode: 'light' | 'dark' | 'system'
  primaryColor?: string
  customColors?: Record<string, string>
}

// User preferences
interface UserPreferences {
  theme: Theme
  defaultToolOptions: Record<string, any>
  keyboardShortcuts: Record<string, string>
  recentlyUsed: string[]    // Tool IDs
  favorites: string[]       // Tool IDs
}

// Application settings
interface AppSettings {
  theme: Theme
  autoSave: boolean
  showTooltips: boolean
  enableAnalytics: boolean
  language: string
}
```

## Hook Return Types

### Common Custom Hook Patterns
```typescript
// Local storage hook
interface UseLocalStorageReturn<T> {
  value: T
  setValue: (value: T) => void
  removeValue: () => void
}

// Debounce hook
interface UseDebounceReturn<T> {
  debouncedValue: T
  isDebouncing: boolean
}

// Async operation hook
interface UseAsyncReturn<T, E = Error> {
  data: T | null
  error: E | null
  isLoading: boolean
  execute: (...args: any[]) => Promise<void>
  reset: () => void
}

// Copy to clipboard hook
interface UseCopyToClipboardReturn {
  isCopied: boolean
  copy: (text: string) => Promise<void>
  error?: string
}

// File reader hook
interface UseFileReaderReturn {
  result: string | ArrayBuffer | null
  error: string | null
  isReading: boolean
  readAsText: (file: File) => void
  readAsDataURL: (file: File) => void
  readAsArrayBuffer: (file: File) => void
}
```

## Utility Function Types

### String Manipulation
```typescript
// Text transformation functions
type TextTransform = (input: string) => string

interface TextTransforms {
  toLowerCase: TextTransform
  toUpperCase: TextTransform
  toCamelCase: TextTransform
  toKebabCase: TextTransform
  toSnakeCase: TextTransform
  toPascalCase: TextTransform
  removeWhitespace: TextTransform
  trimLines: TextTransform
}

// String validation functions
type StringValidator = (input: string) => ValidationResult

interface StringValidators {
  isEmail: StringValidator
  isURL: StringValidator
  isJSON: StringValidator
  isBase64: StringValidator
  isEmpty: StringValidator
  minLength: (min: number) => StringValidator
  maxLength: (max: number) => StringValidator
  pattern: (regex: RegExp) => StringValidator
}
```

### Data Conversion
```typescript
// Generic converter interface
interface Converter<T, U> {
  convert: (input: T) => ProcessingResult<U>
  validate: (input: T) => ValidationResult
}

// Specific converter types
interface JSONConverter extends Converter<string, object> {
  format: (input: string, indent?: number) => ProcessingResult<string>
  minify: (input: string) => ProcessingResult<string>
}

interface Base64Converter extends Converter<string, string> {
  encode: (input: string) => string
  decode: (input: string) => ProcessingResult<string>
  isValid: (input: string) => boolean
}

interface URLConverter extends Converter<string, string> {
  encode: (input: string) => string
  decode: (input: string) => string
  encodeComponent: (input: string) => string
  decodeComponent: (input: string) => string
}
```

## Advanced Type Patterns

### Generic Utility Types
```typescript
// Make all properties optional recursively
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Make specific properties required
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Exclude null and undefined
type NonNullable<T> = T extends null | undefined ? never : T

// Extract function return type
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

// Create a type from union of string literals
type StringLiteralUnion<T extends string> = T | (string & {})

// Pick by value type
type PickByType<T, U> = Pick<T, {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]>
```

### Component Composition Types
```typescript
// Higher-order component types
type HOC<P = {}> = <T extends P>(component: ComponentType<T>) => ComponentType<Omit<T, keyof P>>

// Render prop pattern
interface RenderPropComponent<T> {
  children: (props: T) => React.ReactNode
}

// Compound component pattern
interface CompoundComponent<T> {
  Root: ComponentType<T>
  Header?: ComponentType<any>
  Body?: ComponentType<any>
  Footer?: ComponentType<any>
}

// Polymorphic component pattern
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"]

interface PolymorphicProps<C extends React.ElementType> {
  as?: C
  children?: React.ReactNode
}

type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = 
  PolymorphicProps<C> & 
  Props & 
  Omit<React.ComponentPropsWithoutRef<C>, keyof (PolymorphicProps<C> & Props)>

interface PolymorphicComponent<DefaultElement extends React.ElementType, Props = {}> {
  <C extends React.ElementType = DefaultElement>(
    props: PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }
  ): React.ReactElement | null
}
```

## Testing Types

### Testing Utilities
```typescript
// Mock function types
type MockFunction<T extends (...args: any[]) => any> = jest.Mock<ReturnType<T>, Parameters<T>>

// Test render options
interface TestRenderOptions {
  initialEntries?: string[]
  theme?: 'light' | 'dark'
  providers?: React.ComponentType<{ children: React.ReactNode }>[]
}

// Test utilities return type
interface TestUtils {
  rerender: (ui: React.ReactElement) => void
  unmount: () => void
  container: HTMLElement
  baseElement: HTMLElement
}

// Component test helpers
interface ComponentTestHelpers<P = {}> {
  renderComponent: (props?: Partial<P>, options?: TestRenderOptions) => TestUtils
  getByTestId: (testId: string) => HTMLElement
  queryByTestId: (testId: string) => HTMLElement | null
  findByTestId: (testId: string) => Promise<HTMLElement>
}
```

## Error Handling Types

### Error Boundary Types
```typescript
interface ErrorInfo {
  componentStack: string
  errorBoundary?: string
  errorBoundaryStack?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: ComponentType<{ error: Error; errorInfo?: ErrorInfo }>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

// Application error types
type ApplicationError = 
  | ValidationError
  | NetworkError
  | FileProcessingError
  | UserError
  | SystemError

interface BaseError {
  code: string
  message: string
  timestamp: Date
  context?: Record<string, any>
}

interface ValidationError extends BaseError {
  type: 'validation'
  field?: string
  value?: any
}

interface NetworkError extends BaseError {
  type: 'network'
  status?: number
  url?: string
}

interface FileProcessingError extends BaseError {
  type: 'file'
  fileName?: string
  fileSize?: number
}
```