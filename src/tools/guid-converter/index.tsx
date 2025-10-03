import { useState, useCallback, useMemo, useEffect } from 'react'
import type { ToolDefinition } from '@/types'
import { Button, CodeTextarea, Alert } from '@/components'
import { ArrowsRightLeftIcon, DocumentArrowDownIcon, CheckIcon } from '@heroicons/react/24/outline'

type GuidFormat = 
  | 'standard'     // 550e8400-e29b-41d4-a716-446655440000
  | 'uppercase'    // 550E8400-E29B-41D4-A716-446655440000
  | 'braces'       // {550e8400-e29b-41d4-a716-446655440000}
  | 'braces-upper' // {550E8400-E29B-41D4-A716-446655440000}
  | 'parentheses'  // (550e8400-e29b-41d4-a716-446655440000)
  | 'parentheses-upper' // (550E8400-E29B-41D4-A716-446655440000)
  | 'no-hyphens'   // 550e8400e29b41d4a716446655440000
  | 'no-hyphens-upper' // 550E8400E29B41D4A716446655440000
  | 'dotnet'       // "550e8400-e29b-41d4-a716-446655440000"
  | 'dotnet-upper' // "550E8400-E29B-41D4-A716-446655440000"
  | 'base64'       // VQ6EAOKbQdSnFkRmVUQAAA==
  | 'base64-url'   // VQ6EAOKbQdSnFkRmVUQAAA (URL-safe Base64)

interface GuidFormatOption {
  value: GuidFormat
  label: string
  description: string
  example: string
}

function GuidConverter() {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [selectedFormats, setSelectedFormats] = useState<GuidFormat[]>(['standard', 'braces', 'no-hyphens', 'base64'])

  const formatOptions: GuidFormatOption[] = [
    {
      value: 'standard',
      label: 'Standard',
      description: 'Lowercase with hyphens',
      example: '550e8400-e29b-41d4-a716-446655440000'
    },
    {
      value: 'uppercase',
      label: 'Uppercase',
      description: 'Uppercase with hyphens',
      example: '550E8400-E29B-41D4-A716-446655440000'
    },
    {
      value: 'braces',
      label: 'Braces',
      description: 'Lowercase with braces',
      example: '{550e8400-e29b-41d4-a716-446655440000}'
    },
    {
      value: 'braces-upper',
      label: 'Braces Uppercase',
      description: 'Uppercase with braces',
      example: '{550E8400-E29B-41D4-A716-446655440000}'
    },
    {
      value: 'parentheses',
      label: 'Parentheses',
      description: 'Lowercase with parentheses',
      example: '(550e8400-e29b-41d4-a716-446655440000)'
    },
    {
      value: 'parentheses-upper',
      label: 'Parentheses Uppercase',
      description: 'Uppercase with parentheses',
      example: '(550E8400-E29B-41D4-A716-446655440000)'
    },
    {
      value: 'no-hyphens',
      label: 'No Hyphens',
      description: 'Lowercase without hyphens',
      example: '550e8400e29b41d4a716446655440000'
    },
    {
      value: 'no-hyphens-upper',
      label: 'No Hyphens Uppercase',
      description: 'Uppercase without hyphens',
      example: '550E8400E29B41D4A716446655440000'
    },
    {
      value: 'dotnet',
      label: '.NET String',
      description: 'Lowercase with quotes',
      example: '"550e8400-e29b-41d4-a716-446655440000"'
    },
    {
      value: 'dotnet-upper',
      label: '.NET String Uppercase',
      description: 'Uppercase with quotes',
      example: '"550E8400-E29B-41D4-A716-446655440000"'
    },
    {
      value: 'base64',
      label: 'Base64',
      description: 'Base64 encoded (MongoDB ObjectId style)',
      example: 'VQ6EAOKbQdSnFkRmVUQAAA=='
    },
    {
      value: 'base64-url',
      label: 'Base64 URL-Safe',
      description: 'URL-safe Base64 encoded (no padding)',
      example: 'VQ6EAOKbQdSnFkRmVUQAAA'
    }
  ]

  // Extract and normalize GUID from input
  const normalizeGuid = useCallback((guidString: string): string | null => {
    if (!guidString.trim()) return null

    let input = guidString.trim()

    // Try to detect and convert Base64 input first
    if (input.length === 22 || input.length === 24) {
      try {
        // Handle URL-safe Base64 (restore padding if needed)
        let base64Input = input
        if (input.length === 22) {
          base64Input += '=='  // Add padding for URL-safe Base64
        }
        
        // Convert Base64 to binary
        const binaryString = atob(base64Input)
        if (binaryString.length === 16) {
          // Convert binary to hex string
          let hexString = ''
          for (let i = 0; i < binaryString.length; i++) {
            const byte = binaryString.charCodeAt(i)
            hexString += byte.toString(16).padStart(2, '0')
          }
          return hexString.toLowerCase()
        }
      } catch {
        // Fall through to normal processing if Base64 decode fails
      }
    }

    // Remove common prefixes/suffixes and normalize
    let cleaned = input
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

  // Convert normalized GUID to specific format
  const formatGuid = useCallback((normalizedGuid: string, format: GuidFormat): string => {
    // Add hyphens back: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    const withHyphens = normalizedGuid.replace(
      /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
      '$1-$2-$3-$4-$5'
    )

    switch (format) {
      case 'standard':
        return withHyphens.toLowerCase()
      case 'uppercase':
        return withHyphens.toUpperCase()
      case 'braces':
        return `{${withHyphens.toLowerCase()}}`
      case 'braces-upper':
        return `{${withHyphens.toUpperCase()}}`
      case 'parentheses':
        return `(${withHyphens.toLowerCase()})`
      case 'parentheses-upper':
        return `(${withHyphens.toUpperCase()})`
      case 'no-hyphens':
        return normalizedGuid.toLowerCase()
      case 'no-hyphens-upper':
        return normalizedGuid.toUpperCase()
      case 'dotnet':
        return `"${withHyphens.toLowerCase()}"`
      case 'dotnet-upper':
        return `"${withHyphens.toUpperCase()}"`
      case 'base64': {
        // Convert hex string to binary then to Base64
        let binaryString = ''
        for (let i = 0; i < normalizedGuid.length; i += 2) {
          const hexPair = normalizedGuid.substr(i, 2)
          const byte = parseInt(hexPair, 16)
          binaryString += String.fromCharCode(byte)
        }
        return btoa(binaryString)
      }
      case 'base64-url': {
        // Convert hex string to binary then to URL-safe Base64 (no padding)
        let binaryString = ''
        for (let i = 0; i < normalizedGuid.length; i += 2) {
          const hexPair = normalizedGuid.substr(i, 2)
          const byte = parseInt(hexPair, 16)
          binaryString += String.fromCharCode(byte)
        }
        return btoa(binaryString)
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '')
      }
      default:
        return withHyphens.toLowerCase()
    }
  }, [])

  // Convert input to all selected formats
  const convertedGuids = useMemo(() => {
    const normalized = normalizeGuid(input)
    if (!normalized) return []

    return selectedFormats.map(format => ({
      format,
      value: formatGuid(normalized, format),
      option: formatOptions.find(opt => opt.value === format)!
    }))
  }, [input, selectedFormats, normalizeGuid, formatGuid, formatOptions])

  // Validate input and set error
  const validateInput = useCallback(() => {
    if (!input.trim()) {
      setError(null)
      return
    }

    const normalized = normalizeGuid(input)
    if (!normalized) {
      setError('Invalid GUID format. Please enter a valid GUID with or without hyphens, braces, or quotes.')
    } else {
      setError(null)
    }
  }, [input, normalizeGuid])

  // Update validation when input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])

  // Validate on input change with debounce effect
  useEffect(() => {
    const timer = setTimeout(validateInput, 300)
    return () => clearTimeout(timer)
  }, [validateInput])

  const toggleFormat = useCallback((format: GuidFormat) => {
    setSelectedFormats(prev => 
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    )
  }, [])

  const selectAllFormats = useCallback(() => {
    setSelectedFormats(formatOptions.map(opt => opt.value))
  }, [formatOptions])

  const clearAllFormats = useCallback(() => {
    setSelectedFormats([])
  }, [])

  const loadExample = useCallback(() => {
    setInput('550e8400-e29b-41d4-a716-446655440000')
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

  const copyAllResults = useCallback(() => {
    if (convertedGuids.length === 0) return
    
    const allResults = convertedGuids
      .map(guid => `${guid.option.label}: ${guid.value}`)
      .join('\n')
    
    copyToClipboard(allResults)
  }, [convertedGuids, copyToClipboard])

  const downloadResults = useCallback(() => {
    if (convertedGuids.length === 0) return

    let content = `GUID Conversion Results\n`
    content += `Generated: ${new Date().toISOString()}\n`
    content += `Original Input: ${input}\n\n`
    
    convertedGuids.forEach(guid => {
      content += `${guid.option.label}:\n`
      content += `  ${guid.value}\n`
      content += `  Description: ${guid.option.description}\n\n`
    })

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `guid-conversions-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [convertedGuids, input])

  const generateRandomGuid = useCallback(() => {
    const randomGuid = crypto.randomUUID()
    setInput(randomGuid)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          GUID Converter
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Convert GUIDs between different formats including standard, uppercase, braces, parentheses, 
          and formats without hyphens. Supports various programming language conventions.
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
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            GUID Input
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {input.length} characters
          </div>
        </div>
        <CodeTextarea
          value={input}
          onChange={handleInputChange}
          placeholder="Enter a GUID in any format (with or without hyphens, braces, quotes)..."
          rows={3}
          language="text"
        />
      </div>

      {/* Format Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Output Formats
          </h3>
          <div className="flex items-center space-x-2">
            <Button onClick={selectAllFormats} variant="outline" size="sm">
              Select All
            </Button>
            <Button onClick={clearAllFormats} variant="outline" size="sm">
              Clear All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {formatOptions.map(option => (
            <div
              key={option.value}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedFormats.includes(option.value)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => toggleFormat(option.value)}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  selectedFormats.includes(option.value)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {selectedFormats.includes(option.value) && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {option.label}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {option.description}
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded block overflow-x-auto">
                {option.example}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* Results */}
      {convertedGuids.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Conversion Results
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyAllResults}
                className="flex items-center space-x-1"
              >
                <ArrowsRightLeftIcon className="h-4 w-4" />
                <span>Copy All</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadResults}
                className="flex items-center space-x-1"
              >
                <DocumentArrowDownIcon className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {convertedGuids.map((guid) => (
              <div
                key={guid.format}
                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {guid.option.label}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      {guid.option.description}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(guid.value)}
                    className="text-xs"
                  >
                    Copy
                  </Button>
                </div>
                <CodeTextarea
                  value={guid.value}
                  readOnly
                  rows={1}
                  language="text"
                  className="font-mono text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Supported GUID Formats
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>Standard:</strong> 8-4-4-4-12 digit pattern with hyphens</li>
          <li>• <strong>Braces:</strong> Wrapped in curly braces {'{}'} - common in .NET</li>
          <li>• <strong>Parentheses:</strong> Wrapped in parentheses () - used in some databases</li>
          <li>• <strong>No Hyphens:</strong> 32 continuous hex digits - compact format</li>
          <li>• <strong>Base64:</strong> Base64 encoded format (MongoDB ObjectId style)</li>
          <li>• <strong>Base64 URL-Safe:</strong> URL-safe Base64 without padding</li>
          <li>• <strong>Quoted:</strong> Wrapped in quotes - string literal format</li>
          <li>• <strong>Case Options:</strong> Both uppercase and lowercase variants</li>
          <li>• Input is flexible - paste any format and it will be converted</li>
        </ul>
      </div>
    </div>
  )
}

export const guidConverterTool: ToolDefinition = {
  id: 'guid-converter',
  title: 'GUID Converter',
  description: 'Convert GUIDs between different formats including braces, hyphens, uppercase/lowercase variants',
  element: GuidConverter,
  keywords: ['guid', 'uuid', 'converter', 'format', 'braces', 'hyphens', 'uppercase', 'lowercase'],
  seo: {
    title: 'GUID Converter - Convert GUID Formats Online',
    description: 'Convert GUIDs between different formats including standard, braces, parentheses, uppercase/lowercase variants. Free GUID format converter.',
  },
}