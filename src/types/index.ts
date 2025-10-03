import type { ReactNode, ComponentType } from 'react'

export interface ToolDefinition {
  id: string
  title: string
  description: string
  keywords?: string[]
  element: ComponentType
  icon?: ReactNode
  seo?: {
    title?: string
    description?: string
  }
}

export interface ToolPageProps {
  className?: string
}

export interface WorkerMessage<T = any> {
  type: string
  payload: T
  id: string
}

export interface WorkerResponse<T = any> {
  type: string
  payload: T
  id: string
  error?: string
}

export interface Theme {
  mode: 'light' | 'dark' | 'system'
}

export interface AppSettings {
  theme: Theme
  sidebarCollapsed: boolean
}

// Common result types for tools
export interface ValidationResult {
  valid: boolean
  error?: string
  lineNumber?: number
  columnNumber?: number
}

export interface ProcessingResult<T = any> {
  success: boolean
  data?: T
  error?: string
  processingTime?: number
}