import { useState, useCallback } from 'react'
import type { ToolDefinition } from '@/types'
import { Button, CodeTextarea, CopyButton, Alert, Tabs, TabsList, TabsTrigger, TabsContent, FileInput } from '@/components'
import { ArrowsRightLeftIcon, DocumentTextIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'

interface Base64ToolProps {}

function Base64Tool({}: Base64ToolProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  // Text-based encoding/decoding
  const processText = useCallback((text: string, operation: 'encode' | 'decode') => {
    try {
      setError(null)
      
      if (!text.trim()) {
        setOutput('')
        return
      }

      if (operation === 'encode') {
        // Convert string to base64
        const encoded = btoa(unescape(encodeURIComponent(text)))
        setOutput(encoded)
      } else {
        // Decode base64 to string
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
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(message)
      setOutput('')
    }
  }, [])

  // File-based encoding/decoding
  const processFile = useCallback((file: File, operation: 'encode' | 'decode') => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        setError(null)
        const result = e.target?.result
        
        if (operation === 'encode') {
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
        } else {
          // Decode base64 file content
          if (typeof result === 'string') {
            const cleanInput = result.replace(/\s/g, '')
            const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
            
            if (!base64Regex.test(cleanInput)) {
              throw new Error('File does not contain valid Base64 data')
            }

            const decoded = atob(cleanInput)
            setOutput(decoded)
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error processing file'
        setError(message)
        setOutput('')
      }
    }

    reader.onerror = () => {
      setError('Error reading file')
      setOutput('')
    }

    if (operation === 'encode') {
      reader.readAsArrayBuffer(file)
    } else {
      reader.readAsText(file)
    }
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
    
    processFile(file, mode)
  }, [mode, processFile])

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    if (activeTab === 'text') {
      processText(value, mode)
    }
  }, [activeTab, mode, processText])

  const handleModeToggle = useCallback(() => {
    const newMode = mode === 'encode' ? 'decode' : 'encode'
    setMode(newMode)
    
    if (activeTab === 'text' && input) {
      processText(input, newMode)
    }
  }, [mode, activeTab, input, processText])

  const downloadResult = useCallback(() => {
    if (!output) return

    const blob = mode === 'encode' 
      ? new Blob([output], { type: 'text/plain' })
      : new Blob([atob(output)], { type: 'application/octet-stream' })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = mode === 'encode' 
      ? `${fileName || 'encoded'}.base64` 
      : fileName.replace('.base64', '') || 'decoded'
    a.click()
    URL.revokeObjectURL(url)
  }, [output, mode, fileName])

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
            ? 'Convert text/files to Base64' 
            : 'Convert Base64 back to original format'
          }
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
            placeholder={
              mode === 'encode' 
                ? 'Enter text to encode...'
                : 'Enter Base64 string to decode...'
            }
            rows={8}
            language={mode === 'decode' ? 'base64' : 'text'}
          />
        </TabsContent>

        <TabsContent value="file" className="mt-4">
          <FileInput
            onFilesChange={handleFilesChange}
            accept={mode === 'encode' ? '*/*' : '.base64,.txt'}
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
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Output'}
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
            language={mode === 'encode' ? 'base64' : 'text'}
          />

          {/* Output Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Length: {output.length.toLocaleString()}</span>
            {mode === 'encode' && (
              <span>
                Size increase: {Math.round((output.length / input.length - 1) * 100)}%
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
  icon: <ArrowsRightLeftIcon className="w-5 h-5" />,
  keywords: ['base64', 'encode', 'decode', 'encoding', 'decoding', 'binary', 'text'],
  seo: {
    title: 'Base64 Encoder/Decoder - Encode & Decode Online',
    description: 'Encode text and files to Base64 or decode Base64 strings back to original format. Free online tool that works in your browser.',
  },
}