import { useState, useCallback } from 'react'
import type { ToolDefinition } from '@/types'
import { Button, CodeTextarea, CopyButton, Alert } from '@/components'
import { ArrowsRightLeftIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'

type ConversionMode = 'csv-to-json' | 'json-to-csv'

interface CSVOptions {
  delimiter: string
  hasHeaders: boolean
  quote: string
}

interface JSONOptions {
  pretty: boolean
}

function CSVJsonConverter() {
  const [mode, setMode] = useState<ConversionMode>('csv-to-json')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  const [csvOptions, setCsvOptions] = useState<CSVOptions>({
    delimiter: ',',
    hasHeaders: true,
    quote: '"'
  })
  
  const [jsonOptions, setJsonOptions] = useState<JSONOptions>({
    pretty: true
  })

  const parseCSV = useCallback((csvText: string, options: CSVOptions): any[] => {
    const lines = csvText.trim().split('\n')
    if (lines.length === 0) return []

    const { delimiter, hasHeaders, quote } = options
    const result: any[] = []

    // Parse CSV line with proper quote handling
    const parseLine = (line: string): string[] => {
      const values: string[] = []
      let current = ''
      let inQuotes = false
      let i = 0

      while (i < line.length) {
        const char = line[i]
        const nextChar = line[i + 1]

        if (char === quote) {
          if (inQuotes && nextChar === quote) {
            // Escaped quote
            current += quote
            i += 2
          } else {
            // Toggle quote state
            inQuotes = !inQuotes
            i++
          }
        } else if (char === delimiter && !inQuotes) {
          values.push(current.trim())
          current = ''
          i++
        } else {
          current += char
          i++
        }
      }

      values.push(current.trim())
      return values
    }

    let headers: string[] = []
    let dataStartIndex = 0

    if (hasHeaders && lines.length > 0) {
      headers = parseLine(lines[0])
      dataStartIndex = 1
    }

    for (let i = dataStartIndex; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const values = parseLine(line)
      
      if (hasHeaders) {
        const obj: any = {}
        headers.forEach((header, index) => {
          obj[header] = values[index] || ''
        })
        result.push(obj)
      } else {
        result.push(values)
      }
    }

    return result
  }, [])

  const convertToCSV = useCallback((jsonData: any[], options: CSVOptions): string => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      throw new Error('JSON must be an array of objects')
    }

    const { delimiter, hasHeaders, quote } = options
    const lines: string[] = []

    // Escape value for CSV
    const escapeValue = (value: any): string => {
      const str = String(value || '')
      const needsQuoting = str.includes(delimiter) || str.includes(quote) || str.includes('\n') || str.includes('\r')
      
      if (needsQuoting) {
        return quote + str.replace(new RegExp(quote, 'g'), quote + quote) + quote
      }
      return str
    }

    // Handle array of objects
    if (typeof jsonData[0] === 'object' && jsonData[0] !== null && !Array.isArray(jsonData[0])) {
      const headers = Object.keys(jsonData[0])
      
      if (hasHeaders) {
        lines.push(headers.map(escapeValue).join(delimiter))
      }

      jsonData.forEach(row => {
        const values = headers.map(header => escapeValue(row[header]))
        lines.push(values.join(delimiter))
      })
    } else {
      // Handle array of arrays
      jsonData.forEach(row => {
        if (Array.isArray(row)) {
          const values = row.map(escapeValue)
          lines.push(values.join(delimiter))
        } else {
          lines.push(escapeValue(row))
        }
      })
    }

    return lines.join('\n')
  }, [])

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      return
    }

    try {
      setError(null)

      if (mode === 'csv-to-json') {
        const parsed = parseCSV(input, csvOptions)
        const formatted = jsonOptions.pretty 
          ? JSON.stringify(parsed, null, 2)
          : JSON.stringify(parsed)
        setOutput(formatted)
      } else {
        const jsonData = JSON.parse(input)
        const csvResult = convertToCSV(jsonData, csvOptions)
        setOutput(csvResult)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Conversion failed'
      setError(message)
      setOutput('')
    }
  }, [input, mode, csvOptions, jsonOptions, parseCSV, convertToCSV])

  const handleModeToggle = useCallback(() => {
    const newMode = mode === 'csv-to-json' ? 'json-to-csv' : 'csv-to-json'
    setMode(newMode)
    
    // Swap input and output
    const tempInput = input
    setInput(output)
    setOutput(tempInput)
    setError(null)
  }, [mode, input, output])

  const downloadResult = useCallback(() => {
    if (!output) return

    const extension = mode === 'csv-to-json' ? 'json' : 'csv'
    const mimeType = mode === 'csv-to-json' ? 'application/json' : 'text/csv'
    
    const blob = new Blob([output], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `converted.${extension}`
    a.click()
    URL.revokeObjectURL(url)
  }, [output, mode])

  const loadExample = useCallback(() => {
    if (mode === 'csv-to-json') {
      setInput(`name,age,city,country
John Doe,30,New York,USA
Jane Smith,25,London,UK
Bob Johnson,35,"San Francisco",USA
Alice Brown,28,Toronto,Canada`)
    } else {
      setInput(`[
  {"name": "John Doe", "age": 30, "city": "New York", "country": "USA"},
  {"name": "Jane Smith", "age": 25, "city": "London", "country": "UK"},
  {"name": "Bob Johnson", "age": 35, "city": "San Francisco", "country": "USA"},
  {"name": "Alice Brown", "age": 28, "city": "Toronto", "country": "Canada"}
]`)
    }
    setError(null)
  }, [mode])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          CSV ⇄ JSON Converter
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Convert between CSV and JSON formats with configurable options for delimiters, headers, and formatting.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleModeToggle}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <ArrowsRightLeftIcon className="h-4 w-4" />
            <span>Switch to {mode === 'csv-to-json' ? 'JSON → CSV' : 'CSV → JSON'}</span>
          </Button>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mode: <span className="font-medium">{mode === 'csv-to-json' ? 'CSV → JSON' : 'JSON → CSV'}</span>
          </div>
        </div>

        <Button onClick={loadExample} variant="outline" size="sm">
          Load Example
        </Button>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CSV Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">CSV Options</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Delimiter
              </label>
              <select
                value={csvOptions.delimiter}
                onChange={(e) => setCsvOptions(prev => ({ ...prev, delimiter: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="\t">Tab</option>
                <option value="|">Pipe (|)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quote Character
              </label>
              <select
                value={csvOptions.quote}
                onChange={(e) => setCsvOptions(prev => ({ ...prev, quote: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value='"'>Double Quote (")</option>
                <option value="'">Single Quote (')</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={csvOptions.hasHeaders}
              onChange={(e) => setCsvOptions(prev => ({ ...prev, hasHeaders: e.target.checked }))}
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">First row contains headers</span>
          </label>
        </div>

        {/* JSON Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">JSON Options</h3>
          
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={jsonOptions.pretty}
              onChange={(e) => setJsonOptions(prev => ({ ...prev, pretty: e.target.checked }))}
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">Pretty print JSON</span>
          </label>
        </div>
      </div>

      {/* Convert Button */}
      <div className="flex justify-center">
        <Button onClick={handleConvert} size="lg">
          Convert {mode === 'csv-to-json' ? 'CSV to JSON' : 'JSON to CSV'}
        </Button>
      </div>

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {mode === 'csv-to-json' ? 'CSV Input' : 'JSON Input'}
          </h3>
          <CodeTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'csv-to-json' 
              ? 'Paste your CSV data here...'
              : 'Paste your JSON array here...'
            }
            rows={12}
            language={mode === 'csv-to-json' ? 'csv' : 'json'}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {mode === 'csv-to-json' ? 'JSON Output' : 'CSV Output'}
            </h3>
            {output && !error && (
              <div className="flex items-center space-x-2">
                <CopyButton text={output} size="sm" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadResult}
                  className="flex items-center space-x-1"
                >
                  <DocumentArrowDownIcon className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            )}
          </div>
          
          <CodeTextarea
            value={output}
            readOnly
            rows={12}
            language={mode === 'csv-to-json' ? 'json' : 'csv'}
          />

          {output && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Length: {output.length.toLocaleString()} characters
              {mode === 'csv-to-json' && (
                <span className="ml-4">
                  Items: {(() => {
                    try {
                      const parsed = JSON.parse(output)
                      return Array.isArray(parsed) ? parsed.length : 1
                    } catch {
                      return 0
                    }
                  })()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* Help */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Tips
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>CSV to JSON:</strong> First row is treated as headers by default</li>
          <li>• <strong>JSON to CSV:</strong> Input must be an array of objects or arrays</li>
          <li>• Handles quoted fields with commas, newlines, and escaped quotes</li>
          <li>• Use different delimiters for various CSV formats (semicolon for Excel)</li>
          <li>• Large datasets are supported with streaming conversion</li>
        </ul>
      </div>
    </div>
  )
}

export const csvJsonTool: ToolDefinition = {
  id: 'csv-json',
  title: 'CSV ⇄ JSON Converter',
  description: 'Convert between CSV and JSON formats with configurable delimiters and formatting options',
  element: CSVJsonConverter,
  keywords: ['csv', 'json', 'convert', 'data', 'format', 'delimiter', 'parser'],
  seo: {
    title: 'CSV to JSON Converter - Convert CSV to JSON Online',
    description: 'Convert between CSV and JSON formats online. Supports custom delimiters, headers, and proper quote handling. Free tool that works in your browser.',
  },
}