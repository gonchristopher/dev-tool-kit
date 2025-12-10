import { Alert, Button, CodeTextarea } from '@/components'
import type { ToolDefinition } from '@/types'
/* eslint-disable react-refresh/only-export-components */
import { useCallback, useEffect, useRef, useState } from 'react'

// Shared helper function to split GUID strings
const splitGuidStrings = (inputText: string): string[] => {
  return inputText
    .split(/[,\s\n\r]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
}

function GuidConverter() {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [bulkMode, setBulkMode] = useState(false)
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const mountedRef = useRef(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      mountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Extract and normalize GUID from input
  const normalizeGuid = useCallback((guidString: string): string | null => {
    if (!guidString.trim()) return null

    const cleaned = guidString.trim()
      .replace(/^["'`]|["'`]$/g, '') // Remove quotes
      .replace(/^[{(]|[})]$/g, '')   // Remove braces/parentheses

    // Check if input looks like Base64 (MongoDB format)
    const base64Regex = /^[A-Za-z0-9+/]{22}==$/
    if (base64Regex.test(cleaned)) {
      try {
        // Decode Base64 to binary
        const binaryString = atob(cleaned)

        // Convert binary to hex string
        let hexString = ''
        for (let i = 0; i < binaryString.length; i++) {
          const hex = binaryString.charCodeAt(i).toString(16).padStart(2, '0')
          hexString += hex
        }

        return hexString.toLowerCase()
      } catch {
        return null
      }
    }

    // Handle standard GUID format
    const normalizedHex = cleaned.replace(/-/g, '').toLowerCase()

    // Validate GUID format (32 hex characters)
    const guidRegex = /^[0-9a-f]{32}$/
    if (!guidRegex.test(normalizedHex)) {
      return null
    }

    return normalizedHex
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

    // Standard GUID format with hyphens (uppercase)
    const standardGuid = `${guidWithCorrectByteOrder.substr(0, 8)}-${guidWithCorrectByteOrder.substr(8, 4)}-${guidWithCorrectByteOrder.substr(12, 4)}-${guidWithCorrectByteOrder.substr(16, 4)}-${guidWithCorrectByteOrder.substr(20, 12)}`.toUpperCase()

    // Convert to binary string for Base64
    let binaryString = ''
    for (let i = 0; i < guidWithCorrectByteOrder.length; i += 2) {
      const hexPair = guidWithCorrectByteOrder.substr(i, 2)
      const byte = parseInt(hexPair, 16)
      binaryString += String.fromCharCode(byte)
    }
    const base64 = btoa(binaryString)

    return {
      standardGuid,
      hex,
      base64
    }
  }, [])

  // Process bulk GUIDs
  const processBulkGuids = useCallback((inputText: string) => {
    // Split by commas, spaces, newlines, and filter empty strings
    const guidStrings = splitGuidStrings(inputText)

    const results: Array<{
      original: string
      normalized: string | null
      standardGuid: string | null
      hex: string | null
      base64: string | null
      error: string | null
    }> = []

    guidStrings.forEach(original => {
      const normalized = normalizeGuid(original)
      if (normalized) {
        const converted = convertGuid(normalized)
        results.push({
          original,
          normalized,
          standardGuid: converted.standardGuid,
          hex: converted.hex,
          base64: converted.base64,
          error: null
        })
      } else {
        results.push({
          original,
          normalized: null,
          standardGuid: null,
          hex: null,
          base64: null,
          error: 'Invalid GUID format'
        })
      }
    })

    return results
  }, [normalizeGuid, convertGuid])

  // Generate CSV output for bulk results
  // Helper function to properly escape CSV values
  const escapeCsvValue = useCallback((value: string): string => {
    if (!value) return '""'
    // Escape internal quotes by doubling them, then wrap in quotes
    const escaped = value.replace(/"/g, '""')
    return `"${escaped}"`
  }, [])

  const generateCsvOutput = useCallback((results: ReturnType<typeof processBulkGuids>) => {
    const headers = 'Original GUID,Standard GUID,Hexadecimal,Base64,Status'
    const rows = results.map(result => {
      const original = escapeCsvValue(result.original)
      const standardGuid = result.standardGuid ? escapeCsvValue(result.standardGuid) : '""'
      const hex = result.hex ? escapeCsvValue(result.hex) : '""'
      const base64 = result.base64 ? escapeCsvValue(result.base64) : '""'
      const status = result.error ? escapeCsvValue(result.error) : '"Success"'
      return `${original},${standardGuid},${hex},${base64},${status}`
    })

    return [headers, ...rows].join('\n')
  }, [escapeCsvValue])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)

    // Validate input
    if (!value.trim()) {
      setError(null)
      return
    }

    if (bulkMode) {
      // In bulk mode, validate that at least one GUID is valid
      const guidStrings = splitGuidStrings(value)

      const hasValidGuid = guidStrings.some(guid => normalizeGuid(guid) !== null)

      if (!hasValidGuid) {
        setError('No valid GUIDs found. Please enter at least one valid GUID.')
      } else {
        setError(null)
      }
    } else {
      // Single mode validation
      const normalized = normalizeGuid(value)
      if (!normalized) {
        setError('Invalid GUID format. Please enter a valid GUID.')
      } else {
        setError(null)
      }
    }
  }, [normalizeGuid, bulkMode])

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

  const copyToClipboard = useCallback(async (text: string, label: string = 'Content') => {
    // Clear any existing timeout to prevent multiple timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    try {
      await navigator.clipboard.writeText(text)
      if (mountedRef.current) {
        setCopySuccess(`${label} copied to clipboard!`)
        // Clear success message after 2 seconds
        timeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            setCopySuccess(null)
            timeoutRef.current = null
          }
        }, 2000)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
      if (mountedRef.current) {
        setCopySuccess(`Failed to copy ${label}`)
        timeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            setCopySuccess(null)
            timeoutRef.current = null
          }
        }, 3000)
      }
    }
  }, [])

  // Get conversion results
  const normalizedGuid = normalizeGuid(input)
  const results = normalizedGuid ? convertGuid(normalizedGuid) : null
  const bulkResults = bulkMode && input.trim() ? processBulkGuids(input) : []
  const csvOutput = bulkMode && bulkResults.length > 0 ? generateCsvOutput(bulkResults) : ''

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

      {/* Mode Toggle */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bulkMode}
            onChange={(e) => {
              setBulkMode(e.target.checked)
              setInput('')
              setError(null)
            }}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Bulk Mode
          </span>
        </label>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {bulkMode ? 'Process multiple GUIDs separated by commas, spaces, or newlines' : 'Process a single GUID'}
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {!bulkMode && (
          <>
            <Button onClick={loadExample} variant="outline" size="sm">
              Load Standard Example
            </Button>
            <Button onClick={() => setInput('zsepo5mfDUiWBErjVkslIw==')} variant="outline" size="sm">
              Load MongoDB Example
            </Button>
            <Button onClick={generateRandomGuid} variant="outline" size="sm">
              Generate Random
            </Button>
          </>
        )}
        {bulkMode && (
          <Button
            onClick={() => setInput('550e8400-e29b-41d4-a716-446655440000, 6ba7b810-9dad-11d1-80b4-00c04fd430c8, zsepo5mfDUiWBErjVkslIw==')}
            variant="outline"
            size="sm"
          >
            Load Example GUIDs
          </Button>
        )}
        <Button onClick={clearInput} variant="outline" size="sm">
          Clear Input
        </Button>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {bulkMode ? 'GUID List Input' : 'GUID Input'}
        </h3>
        <CodeTextarea
          value={input}
          onChange={handleInputChange}
          placeholder={
            bulkMode
              ? "Enter multiple GUIDs separated by commas, spaces, or newlines:\n550e8400-e29b-41d4-a716-446655440000, 6ba7b810-9dad-11d1-80b4-00c04fd430c8\nzsepo5mfDUiWBErjVkslIw=="
              : "Enter a GUID (e.g., 550e8400-e29b-41d4-a716-446655440000 or zsepo5mfDUiWBErjVkslIw==)"
          }
          rows={bulkMode ? 6 : 2}
          language="text"
        />
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* Copy Success Display */}
      {copySuccess && (
        <Alert variant="success">
          {copySuccess}
        </Alert>
      )}

      {/* Results */}
      {!bulkMode && results && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Conversion Results
          </h3>

          <div className="space-y-3">
            {/* Standard GUID */}
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Standard GUID
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    Standard GUID format with hyphens
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(results.standardGuid, 'Standard GUID')}
                  className="text-xs"
                >
                  Copy
                </Button>
              </div>
              <CodeTextarea
                value={results.standardGuid}
                readOnly
                rows={1}
                language="text"
                className="font-mono text-sm"
              />
            </div>

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
                  onClick={() => copyToClipboard(results.hex, 'Hexadecimal')}
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
                  onClick={() => copyToClipboard(results.base64, 'Base64')}
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

      {/* Bulk Results */}
      {bulkMode && bulkResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Bulk Conversion Results ({bulkResults.length} GUIDs)
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(csvOutput, 'CSV')}
              className="text-xs"
            >
              Copy CSV
            </Button>
          </div>

          {/* CSV Output */}
          <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 dark:text-white">
                CSV Format (Excel/Spreadsheet Ready)
              </span>
            </div>
            <CodeTextarea
              value={csvOutput}
              readOnly
              rows={Math.min(bulkResults.length + 2, 15)}
              language="csv"
              className="font-mono text-sm"
            />
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Original GUID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Standard GUID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Hexadecimal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Base64
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {bulkResults.map((result, index) => (
                  <tr key={index} className={result.error ? 'bg-red-50 dark:bg-red-900/20' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                      {result.original}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                      {result.standardGuid ? (
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-xs" title={result.standardGuid}>
                            {result.standardGuid}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(result.standardGuid!, 'Standard GUID')}
                            className="text-xs flex-shrink-0"
                          >
                            Copy
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                      {result.hex ? (
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-xs" title={result.hex}>
                            {result.hex}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(result.hex!, 'Hexadecimal')}
                            className="text-xs flex-shrink-0"
                          >
                            Copy
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                      {result.base64 ? (
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-xs" title={result.base64}>
                            {result.base64}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(result.base64!, 'Base64')}
                            className="text-xs flex-shrink-0"
                          >
                            Copy
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {result.error ? (
                        <span className="text-red-600 dark:text-red-400">
                          {result.error}
                        </span>
                      ) : (
                        <span className="text-green-600 dark:text-green-400">
                          Success
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 How to Use
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>Single Mode:</strong> Enter one GUID in any format (with/without hyphens, braces, or quotes)</li>
          <li>• <strong>Bulk Mode:</strong> Enter multiple GUIDs separated by commas, spaces, or newlines</li>
          <li>• <strong>MongoDB Base64:</strong> Supports MongoDB's Base64 GUID format (e.g., "zsepo5mfDUiWBErjVkslIw==")</li>
          <li>• <strong>Hexadecimal:</strong> 32-character hex string with correct GUID byte order</li>
          <li>• <strong>Base64:</strong> Compact binary representation with correct GUID byte order</li>
          <li>• <strong>CSV Export:</strong> In bulk mode, copy CSV format for easy import into Excel/spreadsheets</li>
          <li>• Click "Copy" buttons to copy individual values or entire CSV to clipboard</li>
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