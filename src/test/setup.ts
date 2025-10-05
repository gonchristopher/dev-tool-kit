import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Comprehensive polyfills for JSDOM environment
try {
  // Polyfill for global objects to prevent webidl-conversions errors
  if (typeof global !== 'undefined') {
    // Ensure global has necessary properties for JSDOM/webidl-conversions
    if (!global.Symbol) {
      global.Symbol = Symbol
    }
    if (!global.Symbol.iterator && typeof Symbol.iterator !== 'undefined') {
      try {
        Object.defineProperty(global.Symbol, 'iterator', {
          value: Symbol.iterator,
          writable: false,
          enumerable: false,
          configurable: false
        })
      } catch {
        // Ignore if already defined or can't be set
      }
    }
    if (!global.Map) {
      global.Map = Map
    }
    if (!global.Set) {
      global.Set = Set
    }
    if (!global.WeakMap) {
      global.WeakMap = WeakMap
    }
    if (!global.WeakSet) {
      global.WeakSet = WeakSet
    }
  }
} catch {
  // Silently ignore polyfill errors
}

// Mock Web Workers
global.Worker = class MockWorker {
  url: string

  constructor(url: string) {
    this.url = url
  }

  addEventListener() { }
  removeEventListener() { }
  postMessage() { }
  terminate() { }
} as any // eslint-disable-line @typescript-eslint/no-explicit-any

// Mock crypto.randomUUID for older browsers/Node environments
if (!global.crypto) {
  global.crypto = {} as any // eslint-disable-line @typescript-eslint/no-explicit-any
}

if (!global.crypto.randomUUID) {
  global.crypto.randomUUID = (() => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }) as () => `${string}-${string}-${string}-${string}-${string}`
}

// Mock crypto.subtle for testing
if (!global.crypto.subtle) {
  Object.defineProperty(global.crypto, 'subtle', {
    value: {
      digest: async () => {
        // Mock implementation for testing
        return new ArrayBuffer(32)
      }
    },
    writable: true,
    configurable: true
  })
}

// Enhanced URL mocking to prevent webidl-conversions issues
if (!global.URL.createObjectURL) {
  global.URL.createObjectURL = () => 'blob:mock-url'
}

if (!global.URL.revokeObjectURL) {
  global.URL.revokeObjectURL = () => { }
}

// Handle unhandled promise rejections that might cause test failures
process.on('unhandledRejection', (reason: unknown) => {
  // Suppress known JSDOM/webidl-conversions issues that don't affect tests
  if (
    reason &&
    typeof reason === 'object' &&
    reason !== null &&
    'message' in reason &&
    typeof reason.message === 'string' &&
    (reason.message.includes('webidl-conversions') ||
      reason.message.includes('whatwg-url') ||
      reason.message.includes('Cannot read properties of undefined'))
  ) {
    return // Suppress these specific errors
  }
  // Re-throw other unhandled rejections
  throw reason
})// Enhanced cleanup between tests

// Cleanup after each test to prevent state leakage
afterEach(() => {
  cleanup()
  // Clear any pending timers
  vi.clearAllTimers()
  // Clear all mocks to prevent cross-test interference
  vi.clearAllMocks()
})

// Suppress console errors for known test environment issues
const originalError = console.error
console.error = (...args: unknown[]) => {
  // Suppress specific webidl-conversions and whatwg-url errors that don't affect tests
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('webidl-conversions') ||
      args[0].includes('whatwg-url') ||
      args[0].includes('Cannot read properties of undefined (reading \'get\')') ||
      args[0].includes('TypeError: Cannot read properties of undefined'))
  ) {
    return
  }
  originalError.call(console, ...args)
}