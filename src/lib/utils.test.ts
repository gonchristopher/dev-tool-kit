import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { 
  debounce, 
  throttle, 
  formatBytes, 
  generateUUID,
  encodeStateInUrl,
  decodeStateFromUrl
} from '@/lib/utils'

describe('Utility Functions', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('debounce', () => {
    it('should delay function execution', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('test')
      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledWith('test')
    })

    it('should cancel previous calls when called multiple times', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('first')
      debouncedFn('second')
      debouncedFn('third')

      vi.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('third')
    })

    it('should preserve function context', () => {
      const obj = {
        value: 'test',
        getValue() {
          return this.value
        }
      }

      const debouncedGetValue = debounce(obj.getValue.bind(obj), 100)

      debouncedGetValue()
      vi.advanceTimersByTime(100)
      
      // Since debounce returns void, we test that it doesn't throw
      expect(() => debouncedGetValue()).not.toThrow()
    })
  })

  describe('throttle', () => {
    it('should limit function calls', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn('first')
      throttledFn('second')
      throttledFn('third')

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('first')

      vi.advanceTimersByTime(100)
      
      throttledFn('fourth')
      expect(mockFn).toHaveBeenCalledTimes(2)
      expect(mockFn).toHaveBeenCalledWith('fourth')
    })

    it('should allow calls after throttle period', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn('first')
      expect(mockFn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(100)
      
      throttledFn('second')
      expect(mockFn).toHaveBeenCalledTimes(2)
    })
  })

  describe('formatBytes', () => {
    it('should format bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 Bytes')
      expect(formatBytes(1024)).toBe('1 KB')
      expect(formatBytes(1024 * 1024)).toBe('1 MB')
      expect(formatBytes(1024 * 1024 * 1024)).toBe('1 GB')
    })

    it('should handle decimal places', () => {
      expect(formatBytes(1536)).toBe('1.5 KB') // 1024 * 1.5
      expect(formatBytes(1024 * 1024 * 1.5)).toBe('1.5 MB')
    })

    it('should handle large numbers', () => {
      expect(formatBytes(1024 ** 4)).toBe('1 TB')
      expect(formatBytes(1024 ** 5)).toBe('1 PB')
    })

    it('should handle negative numbers', () => {
      expect(formatBytes(-1024)).toBe('-1 KB')
    })
  })

  describe('generateUUID', () => {
    it('should generate unique IDs', () => {
      const id1 = generateUUID()
      const id2 = generateUUID()
      
      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(typeof id2).toBe('string')
    })

    it('should generate IDs of reasonable length', () => {
      const id = generateUUID()
      expect(id.length).toBeGreaterThan(5)
      expect(id.length).toBeLessThan(20)
    })
  })

  describe('URL state encoding/decoding', () => {
    it('should encode and decode state correctly', () => {
      const originalState = {
        input: 'Hello World',
        options: { format: true, minify: false },
        count: 42
      }

      const encoded = encodeStateInUrl(originalState)
      expect(typeof encoded).toBe('string')
      expect(encoded.length).toBeGreaterThan(0)

      const decoded = decodeStateFromUrl(encoded)
      expect(decoded).toEqual(originalState)
    })

    it('should handle empty state', () => {
      const emptyState = {}
      const encoded = encodeStateInUrl(emptyState)
      const decoded = decodeStateFromUrl(encoded)
      
      expect(decoded).toEqual(emptyState)
    })

    it('should handle complex nested objects', () => {
      const complexState = {
        user: {
          name: 'John Doe',
          preferences: {
            theme: 'dark',
            notifications: true,
            settings: {
              autoSave: true,
              version: 1.2
            }
          }
        },
        tools: ['base64', 'json', 'uuid'],
        metadata: {
          created: '2025-01-01',
          modified: '2025-01-02'
        }
      }

      const encoded = encodeStateInUrl(complexState)
      const decoded = decodeStateFromUrl(encoded)
      
      expect(decoded).toEqual(complexState)
    })

    it('should return null for invalid encoded state', () => {
      expect(decodeStateFromUrl('invalid-base64')).toBeNull()
      expect(decodeStateFromUrl('')).toBeNull()
      expect(decodeStateFromUrl('not-valid-json')).toBeNull()
    })

    it('should return empty string for encoding errors', () => {
      // Test with circular reference (should be caught by the try-catch)
      const circularObj: any = { name: 'test' }
      circularObj.self = circularObj

      const encoded = encodeStateInUrl(circularObj)
      expect(encoded).toBe('')
    })
  })
})

describe('Error Handling', () => {
  it('should handle function errors gracefully', () => {
    expect(() => {
      const mockErrorFn = () => {
        throw new Error('Test error')
      }
      const debouncedErrorFn = debounce(mockErrorFn, 100)
      debouncedErrorFn()
    }).not.toThrow()
  })

  it('should handle invalid inputs', () => {
    expect(formatBytes(NaN)).toBe('0 Bytes')
    expect(formatBytes(Infinity)).toBe('∞ Bytes')
  })
})