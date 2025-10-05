import { Alert, Button, CodeTextarea, CopyButton, FileInput, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components'
import type { ToolDefinition } from '@/types'
import { ArrowsRightLeftIcon, DocumentArrowDownIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
/* eslint-disable react-refresh/only-export-components */
import { useCallback, useState } from 'react'

export function Base64Tool() {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  // Text-based encoding
  const encodeText = useCallback((text: string) => {
    try {
      setError(null)

      if (!text.trim()) {
        setOutput('')
        return
      }

      const encoded = btoa(unescape(encodeURIComponent(text)))
      setOutput(encoded)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error encoding text'
      setError(message)
      setOutput('')
    }
  }, [])

  // Text-based decoding
  const decodeText = useCallback((text: string) => {
    try {
      setError(null)

      if (!text.trim()) {
        setOutput('')
        return
      }

      // First validate that it's valid base64
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
      const cleanInput = text.replace(/\s/g, '') // Remove whitespace

      if (!base64Regex.test(cleanInput)) {
        throw new Error('Invalid Base64 format')
      }

      try {
        const decoded = decodeURIComponent(escape(atob(cleanInput)))
        setOutput(decoded)
      } catch {
        throw new Error('Invalid Base64 string - unable to decode')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error decoding Base64'
      setError(message)
      setOutput('')
    }
  }, [])

  // File-based encoding
  const encodeFile = useCallback((file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        setError(null)
        const result = e.target?.result

        if (result instanceof ArrayBuffer) {
          // Convert ArrayBuffer to base64
          const bytes = new Uint8Array(result)
          let binary = ''
          for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          const encoded = btoa(binary)
          setOutput(encoded)
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error encoding file'
        setError(message)
        setOutput('')
      }
    }

    reader.onerror = () => {
      setError('Error reading file')
      setOutput('')
    }

    reader.readAsArrayBuffer(file)
  }, [])

  // File-based decoding
  const decodeFile = useCallback((file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        setError(null)
        const result = e.target?.result

        if (typeof result === 'string') {
          const cleanInput = result.replace(/\s/g, '')
          const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/

          if (!base64Regex.test(cleanInput)) {
            throw new Error('File does not contain valid Base64 data')
          }

          const decoded = atob(cleanInput)
          setOutput(decoded)
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error decoding file'
        setError(message)
        setOutput('')
      }
    }

    reader.onerror = () => {
      setError('Error reading file')
      setOutput('')
    }

    reader.readAsText(file)
  }, [])

  const handleFilesChange = useCallback((files: File[]) => {
    if (files.length === 0) {
      setInput('')
      setOutput('')
      setFileName('')
      return
    }

    const file = files[0] // Take first file
    setFileName(file.name)
    setInput('')
    setOutput('')
  }, [])

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    setOutput('') // Clear output when input changes
  }, [])

  const handleEncode = useCallback(() => {
    if (activeTab === 'text') {
      encodeText(input)
    } else if (fileName) {
      // Re-process the file for encoding
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      const file = fileInput?.files?.[0]
      if (file) {
        encodeFile(file)
      }
    }
  }, [activeTab, input, fileName, encodeText, encodeFile])

  const handleDecode = useCallback(() => {
    if (activeTab === 'text') {
      decodeText(input)
    } else if (fileName) {
      // Re-process the file for decoding
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      const file = fileInput?.files?.[0]
      if (file) {
        decodeFile(file)
      }
    }
  }, [activeTab, input, fileName, decodeText, decodeFile])

  const downloadResult = useCallback(() => {
    if (!output) return

    // Determine if output is base64 or decoded text based on content
    const isBase64Output = /^[A-Za-z0-9+/]*={0,2}$/.test(output.replace(/\s/g, ''))

    const blob = isBase64Output
      ? new Blob([output], { type: 'text/plain' })
      : new Blob([atob(output)], { type: 'application/octet-stream' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = isBase64Output
      ? `${fileName || 'encoded'}.base64`
      : fileName.replace('.base64', '') || 'decoded'
    a.click()
    URL.revokeObjectURL(url)
  }, [output, fileName])

  const clearAll = useCallback(() => {
    setInput('')
    setOutput('')
    setError(null)
    setFileName('')
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Base64 Encoder/Decoder
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Encode text and files to Base64 or decode Base64 back to original format.
          Supports UTF-8 text and binary files up to 10MB.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="primary"
            onClick={handleEncode}
            className="flex items-center space-x-2"
            disabled={!input && !fileName}
          >
            <ArrowsRightLeftIcon className="h-4 w-4" />
            <span>Encode</span>
          </Button>

          <Button
            variant="secondary"
            onClick={handleDecode}
            className="flex items-center space-x-2"
            disabled={!input && !fileName}
          >
            <ArrowsRightLeftIcon className="h-4 w-4" />
            <span>Decode</span>
          </Button>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Convert to/from Base64 format
        </div>
      </div>

      {/* Input Type Tabs */}
      <Tabs defaultValue="text" value={activeTab} onValueChange={(value) => {
        setActiveTab(value as 'text' | 'file')
        clearAll()
      }}>
        <TabsList>
          <TabsTrigger value="text">
            <DocumentTextIcon className="h-4 w-4 mr-2" />
            Text Input
          </TabsTrigger>
          <TabsTrigger value="file">
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            File Input
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-4">
          <CodeTextarea
            value={input}
            onChange={handleTextChange}
            placeholder="Enter text to encode or Base64 string to decode..."
            rows={8}
            language="text"
          />
        </TabsContent>

        <TabsContent value="file" className="mt-4">
          <FileInput
            onFilesChange={handleFilesChange}
            accept="*/*"
            maxSize={10 * 1024 * 1024}
            onError={setError}
          />
        </TabsContent>
      </Tabs>

      {/* Error Display */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {fileName && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Selected file: <span className="font-medium">{fileName}</span>
        </div>
      )}

      {/* Output Section */}
      {output && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Output
            </h2>
            <div className="flex items-center space-x-2">
              <CopyButton text={output} />
              <Button
                variant="secondary"
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
            rows={8}
            language="text"
          />

          {/* Output Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Length: {output.length.toLocaleString()}</span>
            {input && (
              <span>
                Size change: {input.length > 0 ? Math.round((output.length / input.length - 1) * 100) : 0}%
              </span>
            )}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Tips
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Base64 encoding increases size by approximately 33%</li>
          <li>• Use file input for binary data like images, documents, etc.</li>
          <li>• Text input automatically handles UTF-8 encoding/decoding</li>
          <li>• Invalid Base64 characters are automatically detected</li>
          <li>• Maximum file size is 10MB for performance reasons</li>
        </ul>
      </div>
    </div>
  )
}

export const base64Tool: ToolDefinition = {
  id: 'base64',
  title: 'Base64 Encoder/Decoder',
  description: 'Encode text and files to Base64 or decode Base64 strings back to original format',
  element: Base64Tool,

  keywords: ['base64', 'encode', 'decode', 'encoding', 'decoding', 'binary', 'text'],
  seo: {
    title: 'Base64 Encoder/Decoder - Encode & Decode Online',
    description: 'Encode text and files to Base64 or decode Base64 strings back to original format. Free online tool that works in your browser.',
  },
}