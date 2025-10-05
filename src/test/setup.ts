import '@testing-library/jest-dom'

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