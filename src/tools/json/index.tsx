import type { ToolDefinition } from '@/types'
import { ArrowDownTrayIcon, CheckIcon, ClipboardIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CodeBracketIcon } from '@heroicons/react/24/solid'
/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

interface JSONError {
  message: string
  line?: number
  column?: number
}

function JSONFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<JSONError | null>(null)
  const [sortKeys, setSortKeys] = useState(false)
  const [copied, setCopied] = useState(false)

  const formatJSON = (minify = false) => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      return
    }

    try {
      let parsed = JSON.parse(input)

      if (sortKeys && typeof parsed === 'object' && parsed !== null) {
        parsed = sortObjectKeys(parsed)
      }

      const formatted = minify
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2)

      setOutput(formatted)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid JSON'

      // Try to extract line and column from error message
      const match = errorMessage.match(/position (\d+)/)
      if (match) {
        const position = parseInt(match[1])
        const lines = input.substring(0, position).split('\n')
        setError({
          message: errorMessage,
          line: lines.length,
          column: lines[lines.length - 1].length + 1
        })
      } else {
        setError({ message: errorMessage })
      }

      setOutput('')
    }
  }

  const sortObjectKeys = (obj: JsonValue): JsonValue => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys)
    }

    if (obj && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((sorted: Record<string, JsonValue>, key) => {
          sorted[key] = sortObjectKeys((obj as Record<string, JsonValue>)[key])
          return sorted
        }, {} as Record<string, JsonValue>)
    }

    return obj
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadJSON = () => {
    if (!output) return

    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const loadExample = () => {
    const example = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "hobbies": ["reading", "swimming"],
  "address": {
    "street": "123 Main St",
    "zip": "10001"
  }
}`
    setInput(example)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                JSON Formatter
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Format, validate, and minify JSON with syntax error detection
              </p>
            </div>
            <button
              onClick={loadExample}
              className="px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            >
              Load Example
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={sortKeys}
                onChange={(e) => setSortKeys(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">Sort keys</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => formatJSON(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Format
            </button>
            <button
              onClick={() => formatJSON(true)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Minify
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex min-h-0">
        {/* Input */}
        <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Input JSON</h3>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full h-full p-4 font-mono text-sm resize-none border-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
              {error && (
                <span className="ml-2 inline-flex items-center gap-1 text-red-600 dark:text-red-400">
                  <XMarkIcon className="w-4 h-4" />
                  Error
                </span>
              )}
              {output && !error && (
                <span className="ml-2 inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckIcon className="w-4 h-4" />
                  Valid
                </span>
              )}
            </h3>

            {output && !error && (
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  className={`p-1.5 rounded transition-colors ${copied
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400'
                    }`}
                  title="Copy to clipboard"
                >
                  <ClipboardIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={downloadJSON}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 rounded transition-colors"
                  title="Download as file"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 relative">
            {error ? (
              <div className="p-4">
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <XMarkIcon className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-red-900 dark:text-red-200 mb-1">
                        JSON Syntax Error
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                        {error.message}
                      </p>
                      {error.line && error.column && (
                        <p className="text-xs text-red-600 dark:text-red-400">
                          Line {error.line}, Column {error.column}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : output ? (
              <pre className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-auto">
                {output}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <CodeBracketIcon className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p>Formatted JSON will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const jsonTool: ToolDefinition = {
  id: 'json',
  title: 'JSON Formatter',
  description: 'Format, validate, and minify JSON with syntax error detection',
  keywords: ['json', 'format', 'validate', 'minify', 'pretty', 'syntax'],
  element: JSONFormatter,

  seo: {
    title: 'JSON Formatter & Validator - Format JSON Online',
    description: 'Format, validate, and minify JSON online. Detect syntax errors with line-by-line error reporting. Free JSON formatter tool.',
  },
}