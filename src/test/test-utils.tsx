import { render, type RenderOptions } from '@testing-library/react'
import { type ReactElement } from 'react'

// Test utilities for consistent tool testing
export function renderTool(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    ...options,
  })
}

// Helper to create mock files for testing
export function createMockFile(content: string, name: string = 'test.txt', type: string = 'text/plain'): File {
  return new File([content], name, { type })
}

// Helper to simulate user input in textareas
export function getTextarea(container: HTMLElement, placeholder?: string): HTMLTextAreaElement {
  if (placeholder) {
    return container.querySelector(`textarea[placeholder*="${placeholder}"]`) as HTMLTextAreaElement
  }
  return container.querySelector('textarea') as HTMLTextAreaElement
}

// Helper to get button by text content
export function getButton(container: HTMLElement, text: string): HTMLButtonElement {
  return Array.from(container.querySelectorAll('button'))
    .find(button => button.textContent?.includes(text)) as HTMLButtonElement
}

// Helper to wait for async operations
export function waitFor(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Mock worker responses for testing
export function mockWorkerSuccess<T>(data: T) {
  return {
    success: true,
    data,
    error: undefined
  }
}

export function mockWorkerError(error: string) {
  return {
    success: false,
    data: undefined,
    error
  }
}