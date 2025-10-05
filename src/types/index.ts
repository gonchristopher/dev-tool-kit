import type { ComponentType, ReactNode } from 'react'

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

export interface WorkerMessage<T = unknown> {
  type: string
  payload: T
  id: string
}

export interface WorkerResponse<T = unknown> {
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
}

// Common result types for tools
export interface ValidationResult {
  valid: boolean
  error?: string
  lineNumber?: number
  columnNumber?: number
}

export interface ProcessingResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
  processingTime?: number
}

// Cheat sheet types
export interface CheatSheetSection {
  title: string
  items: CheatSheetItem[]
}

export interface CheatSheetItem {
  title: string
  description?: string
  shortcut?: string
  code?: string
  example?: string
  category?: string
  os?: 'windows' | 'mac' | 'linux' | 'all'
}

export interface CheatSheetDefinition {
  id: string
  title: string
  description: string
  category: string
  tags?: string[]
  sections: CheatSheetSection[]
  icon?: ReactNode
  lastUpdated?: string
}