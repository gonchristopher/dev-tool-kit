import { Alert, Button, CodeTextarea } from '@/components'
import type { ToolDefinition } from '@/types'
/* eslint-disable react-refresh/only-export-components */
import { useCallback, useState } from 'react'

function GuidConverter() {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Extract and normalize GUID from input
  const normalizeGuid = useCallback((guidString: string): string | null => {
    if (!guidString.trim()) return null

    const cleaned = guidString.trim()
      .replace(/^["'`]|["'`]$/g, '') // Remove quotes
      .replace(/^[{(]|[})]$/g, '')   // Remove braces/parentheses
      .replace(/-/g, '')             // Remove hyphens
      .toLowerCase()

    // Validate GUID format (32 hex characters)
    const guidRegex = /^[0-9a-f]{32}$/
    if (!guidRegex.test(cleaned)) {
      return null
    }

    return cleaned
  }, [])

  // Convert GUID to different formats
  const convertGuid = useCallback((normalizedGuid: string) => {
    // Convert to correct GUID byte order
    // GUID format: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
    // The first 3 segments need byte reversal, last 2 segments stay in order
    const part1 = normalizedGuid.substr(0, 8)   // First 4 bytes (reverse)
    const part2 = normalizedGuid.substr(8, 4)   // Next 2 bytes (reverse)  
    const part3 = normalizedGuid.substr(12, 4)  // Next 2 bytes (reverse)
    const part4 = normalizedGuid.substr(16, 16) // Last 8 bytes (keep order)

    // Reverse byte order for first 3 parts, keep part4 as-is
    const reversedPart1 = part1.match(/../g)?.reverse().join('') || ''
    const reversedPart2 = part2.match(/../g)?.reverse().join('') || ''
    const reversedPart3 = part3.match(/../g)?.reverse().join('') || ''

    // Combine all parts with correct byte order
    const guidWithCorrectByteOrder = reversedPart1 + reversedPart2 + reversedPart3 + part4

    // Hex format with correct byte order (lowercase)
    const hex = guidWithCorrectByteOrder.toLowerCase()

    // Convert to binary string for Base64
    let binaryString = ''
    for (let i = 0; i < guidWithCorrectByteOrder.length; i += 2) {
      const hexPair = guidWithCorrectByteOrder.substr(i, 2)
      const byte = parseInt(hexPair, 16)
      binaryString += String.fromCharCode(byte)
    }
    const base64 = btoa(binaryString)

    return {
      hex,
      base64
    }
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)

    // Validate input
    if (!value.trim()) {
      setError(null)
      return
    }

    const normalized = normalizeGuid(value)
    if (!normalized) {
      setError('Invalid GUID format. Please enter a valid GUID.')
    } else {
      setError(null)
    }
  }, [normalizeGuid])

  const loadExample = useCallback(() => {
    setInput('550e8400-e29b-41d4-a716-446655440000')
  }, [])

  const generateRandomGuid = useCallback(() => {
    const randomGuid = crypto.randomUUID()
    setInput(randomGuid)
  }, [])

  const clearInput = useCallback(() => {
    setInput('')
    setError(null)
  }, [])

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  // Get conversion results
  const normalizedGuid = normalizeGuid(input)
  const results = normalizedGuid ? convertGuid(normalizedGuid) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          GUID Converter
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Enter a GUID and convert it to hexadecimal and Base64 formats.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={loadExample} variant="outline" size="sm">
          Load Example
        </Button>
        <Button onClick={generateRandomGuid} variant="outline" size="sm">
          Generate Random
        </Button>
        <Button onClick={clearInput} variant="outline" size="sm">
          Clear Input
        </Button>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          GUID Input
        </h3>
        <CodeTextarea
          value={input}
          onChange={handleInputChange}
          placeholder="Enter a GUID (e.g., 550e8400-e29b-41d4-a716-446655440000)"
          rows={2}
          language="text"
        />
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Conversion Results
          </h3>

          <div className="space-y-3">
            {/* Hexadecimal */}
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Hexadecimal
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    32-character hex string with correct byte order
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(results.hex)}
                  className="text-xs"
                >
                  Copy
                </Button>
              </div>
              <CodeTextarea
                value={results.hex}
                readOnly
                rows={1}
                language="text"
                className="font-mono text-sm"
              />
            </div>



            {/* Base64 */}
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Base64
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    Base64 encoded binary representation
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(results.base64)}
                  className="text-xs"
                >
                  Copy
                </Button>
              </div>
              <CodeTextarea
                value={results.base64}
                readOnly
                rows={1}
                language="text"
                className="font-mono text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 How to Use
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Enter any GUID format: with/without hyphens, braces, or quotes</li>
          <li>• <strong>Hexadecimal:</strong> 32-character hex string with correct GUID byte order</li>
          <li>• <strong>Base64:</strong> Compact binary representation with correct GUID byte order</li>
          <li>• Click "Copy" to copy individual values to clipboard</li>
        </ul>
      </div>
    </div>
  )
}

export const guidConverterTool: ToolDefinition = {
  id: 'guid-converter',
  title: 'GUID Converter',
  description: 'Convert GUIDs to hexadecimal and Base64 formats',
  element: GuidConverter,
  keywords: ['guid', 'uuid', 'converter', 'hex', 'hexadecimal', 'base64'],
  seo: {
    title: 'GUID Converter - Convert GUID to Hex and Base64',
    description: 'Simple GUID converter that converts GUIDs to hexadecimal and Base64 formats with correct byte order. Fast and easy to use.',
  },
}