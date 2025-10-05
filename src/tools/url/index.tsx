import { Alert, Button, CodeTextarea, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components'
import { buildQueryString, decodeUrl, encodeUrl, parseQueryString } from '@/lib/encoding'
import type { ToolDefinition } from '@/types'
import { ArrowsRightLeftIcon, DocumentArrowDownIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
/* eslint-disable react-refresh/only-export-components */
import { useCallback, useState } from 'react'

interface QueryParam {
  key: string
  value: string
  id: string
}

function UrlEncoderDecoder() {
  const [activeTab, setActiveTab] = useState<'encode-decode' | 'query-params'>('encode-decode')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Query parameters state
  const [queryString, setQueryString] = useState('')
  const [queryParams, setQueryParams] = useState<QueryParam[]>([
    { key: '', value: '', id: crypto.randomUUID() }
  ])

  const processUrl = useCallback((text: string, operation: 'encode' | 'decode') => {
    try {
      setError(null)

      if (!text.trim()) {
        setOutput('')
        return
      }

      if (operation === 'encode') {
        const encoded = encodeUrl(text)
        setOutput(encoded)
      } else {
        const decoded = decodeUrl(text)
        setOutput(decoded)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Operation failed'
      setError(message)
      setOutput('')
    }
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    processUrl(value, mode)
  }, [mode, processUrl])

  const handleModeToggle = useCallback(() => {
    const newMode = mode === 'encode' ? 'decode' : 'encode'
    setMode(newMode)

    if (input) {
      processUrl(input, newMode)
    }
  }, [mode, input, processUrl])

  const swapInputOutput = useCallback(() => {
    const temp = input
    setInput(output)
    setOutput(temp)

    if (output) {
      processUrl(output, mode)
    }
  }, [input, output, mode, processUrl])

  const clearAll = useCallback(() => {
    setInput('')
    setOutput('')
    setError(null)
  }, [])

  const downloadResult = useCallback(() => {
    if (!output) return

    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${mode}d-url.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [output, mode])

  const loadExample = useCallback(() => {
    if (mode === 'encode') {
      setInput('https://example.com/search?q=hello world&category=tech&sort=date')
    } else {
      setInput('https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26category%3Dtech%26sort%3Date')
    }
  }, [mode])

  // Query parameter functions
  const parseQuery = useCallback(() => {
    try {
      setError(null)
      const parsed = parseQueryString(queryString)
      const newParams = Object.entries(parsed).map(([key, value]) => ({
        key,
        value,
        id: crypto.randomUUID()
      }))

      if (newParams.length === 0) {
        newParams.push({ key: '', value: '', id: crypto.randomUUID() })
      }

      setQueryParams(newParams)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to parse query string'
      setError(message)
    }
  }, [queryString])

  const buildQuery = useCallback(() => {
    try {
      setError(null)
      const params: Record<string, string> = {}

      queryParams.forEach(param => {
        if (param.key.trim()) {
          params[param.key] = param.value
        }
      })

      const result = buildQueryString(params)
      setQueryString(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to build query string'
      setError(message)
    }
  }, [queryParams])

  const addQueryParam = useCallback(() => {
    setQueryParams(prev => [
      ...prev,
      { key: '', value: '', id: crypto.randomUUID() }
    ])
  }, [])

  const removeQueryParam = useCallback((id: string) => {
    setQueryParams(prev => {
      const filtered = prev.filter(param => param.id !== id)
      return filtered.length === 0
        ? [{ key: '', value: '', id: crypto.randomUUID() }]
        : filtered
    })
  }, [])

  const updateQueryParam = useCallback((id: string, field: 'key' | 'value', value: string) => {
    setQueryParams(prev => prev.map(param =>
      param.id === id ? { ...param, [field]: value } : param
    ))
  }, [])

  const clearQueryParams = useCallback(() => {
    setQueryParams([{ key: '', value: '', id: crypto.randomUUID() }])
    setQueryString('')
  }, [])

  const loadQueryExample = useCallback(() => {
    setQueryString('?search=hello%20world&category=tech&page=1&sort=date&active=true')
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          URL Encoder/Decoder
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Encode and decode URLs and query parameters for web development and API usage.
          Handles special characters, spaces, and Unicode properly.
        </p>
      </div>

      {/* Tab Navigation */}
      <Tabs defaultValue="encode-decode" value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
        <TabsList>
          <TabsTrigger value="encode-decode">URL Encode/Decode</TabsTrigger>
          <TabsTrigger value="query-params">Query Parameters</TabsTrigger>
        </TabsList>

        <TabsContent value="encode-decode" className="mt-6 space-y-6">
          {/* Mode Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              variant={mode === 'encode' ? 'primary' : 'secondary'}
              onClick={handleModeToggle}
              className="flex items-center space-x-2"
            >
              <ArrowsRightLeftIcon className="h-4 w-4" />
              <span>{mode === 'encode' ? 'Encode' : 'Decode'}</span>
            </Button>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {mode === 'encode'
                ? 'Convert URLs and text to percent-encoded format'
                : 'Convert percent-encoded URLs back to readable format'
              }
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={loadExample} variant="outline" size="sm">
              Load Example
            </Button>
            <Button onClick={swapInputOutput} variant="outline" size="sm" className="flex items-center space-x-1">
              <ArrowsRightLeftIcon className="h-4 w-4" />
              <span>Swap</span>
            </Button>
            <Button onClick={clearAll} variant="outline" size="sm">
              Clear All
            </Button>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {mode === 'encode' ? 'Text to Encode' : 'Encoded Text to Decode'}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {input.length.toLocaleString()} characters
              </div>
            </div>
            <CodeTextarea
              value={input}
              onChange={handleInputChange}
              placeholder={
                mode === 'encode'
                  ? 'Enter URL or text to encode...'
                  : 'Enter percent-encoded text to decode...'
              }
              rows={6}
              language="text"
            />
          </div>

          {/* Output */}
          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
                </h3>
                <div className="flex items-center space-x-2">
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
              </div>
              <CodeTextarea
                value={output}
                readOnly
                rows={6}
                language="text"
              />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Length: {output.length.toLocaleString()} characters
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="query-params" className="mt-6 space-y-6">
          {/* Query String Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Query String
              </h3>
              <div className="flex items-center space-x-2">
                <Button onClick={loadQueryExample} variant="outline" size="sm">
                  Load Example
                </Button>
                <Button onClick={parseQuery} size="sm">
                  Parse ↓
                </Button>
              </div>
            </div>
            <CodeTextarea
              value={queryString}
              onChange={(e) => setQueryString(e.target.value)}
              placeholder="?param1=value1&param2=value2 or param1=value1&param2=value2"
              rows={3}
              language="text"
            />
          </div>

          {/* Query Parameters Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Parameters
              </h3>
              <div className="flex items-center space-x-2">
                <Button onClick={addQueryParam} variant="outline" size="sm" className="flex items-center space-x-1">
                  <PlusIcon className="h-4 w-4" />
                  <span>Add</span>
                </Button>
                <Button onClick={clearQueryParams} variant="outline" size="sm">
                  Clear All
                </Button>
                <Button onClick={buildQuery} size="sm">
                  Build ↑
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {queryParams.map((param) => (
                <div key={param.id} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Parameter name"
                      value={param.key}
                      onChange={(e) => updateQueryParam(param.id, 'key', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-gray-400">=</div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Parameter value"
                      value={param.value}
                      onChange={(e) => updateQueryParam(param.id, 'value', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {queryParams.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeQueryParam(param.id)}
                      className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Error Display */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* Help Text */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Tips
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>URL Encoding:</strong> Converts special characters (spaces, &, ?, etc.) to percent-encoded format (%20, %26, %3F)</li>
          <li>• <strong>Query Parameters:</strong> Parse existing query strings or build new ones from key-value pairs</li>
          <li>• <strong>Unicode Support:</strong> Properly handles international characters and emojis</li>
          <li>• <strong>API Development:</strong> Essential for constructing URLs for REST APIs and web requests</li>
          <li>• <strong>Form Data:</strong> Use for application/x-www-form-urlencoded content type</li>
          <li>• Query strings can start with or without the ? character</li>
        </ul>
      </div>
    </div>
  )
}

export const urlTool: ToolDefinition = {
  id: 'url',
  title: 'URL Encoder/Decoder',
  description: 'Encode and decode URLs and query parameters with proper Unicode support',
  element: UrlEncoderDecoder,
  keywords: ['url', 'encode', 'decode', 'query', 'parameters', 'percent', 'uri', 'web'],
  seo: {
    title: 'URL Encoder/Decoder - Encode & Decode URLs Online',
    description: 'Encode and decode URLs and query parameters online. Handle special characters, Unicode, and build query strings. Free URL encoding tool.',
  },
}