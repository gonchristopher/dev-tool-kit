/* eslint-disable react-refresh/only-export-components */
import { Alert, Button, CodeTextarea, CopyButton, FileInput, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components'
import type { ToolDefinition } from '@/types'
import { hashWorker } from '@/workers'
import { DocumentArrowDownIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useCallback, useState } from 'react'

type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'

interface HashResult {
  algorithm: HashAlgorithm
  hash: string
  input: string
  inputType: 'text' | 'file'
  fileName?: string
  fileSize?: number
  processingTime?: number
}

function HashGenerator() {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text')
  const [textInput, setTextInput] = useState('')
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<HashAlgorithm[]>(['MD5', 'SHA-256'])
  const [results, setResults] = useState<HashResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [fileName, setFileName] = useState<string>('')

  const algorithms: { value: HashAlgorithm; label: string; description: string }[] = [
    { value: 'MD5', label: 'MD5', description: '128-bit hash (legacy, not cryptographically secure)' },
    { value: 'SHA-1', label: 'SHA-1', description: '160-bit hash (legacy, not recommended for security)' },
    { value: 'SHA-256', label: 'SHA-256', description: '256-bit hash (recommended for security)' },
    { value: 'SHA-512', label: 'SHA-512', description: '512-bit hash (highest security)' },
  ]

  const toggleAlgorithm = useCallback((algorithm: HashAlgorithm) => {
    setSelectedAlgorithms(prev =>
      prev.includes(algorithm)
        ? prev.filter(a => a !== algorithm)
        : [...prev, algorithm]
    )
  }, [])

  const hashText = useCallback(async () => {
    if (!textInput.trim()) {
      setError('Please enter some text to hash')
      return
    }

    if (selectedAlgorithms.length === 0) {
      setError('Please select at least one hash algorithm')
      return
    }

    setIsProcessing(true)
    setError(null)
    const newResults: HashResult[] = []

    try {
      for (const algorithm of selectedAlgorithms) {
        const startTime = performance.now()

        const response = await hashWorker.hashText(textInput, algorithm)

        const endTime = performance.now()
        const processingTime = endTime - startTime

        if (response.type === 'hash-result') {
          newResults.push({
            algorithm,
            hash: response.payload.hash,
            input: textInput,
            inputType: 'text',
            processingTime
          })
        }
      }

      setResults(newResults)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate hashes'
      setError(message)
    } finally {
      setIsProcessing(false)
    }
  }, [textInput, selectedAlgorithms])

  const hashFile = useCallback(async (file: File) => {
    if (selectedAlgorithms.length === 0) {
      setError('Please select at least one hash algorithm')
      return
    }

    setIsProcessing(true)
    setError(null)
    setFileName(file.name)
    const newResults: HashResult[] = []

    try {
      const arrayBuffer = await file.arrayBuffer()

      for (const algorithm of selectedAlgorithms) {
        const startTime = performance.now()

        const response = await hashWorker.hashFile(arrayBuffer, algorithm)

        const endTime = performance.now()
        const processingTime = endTime - startTime

        if (response.type === 'hash-result') {
          newResults.push({
            algorithm,
            hash: response.payload.hash,
            input: `File: ${file.name}`,
            inputType: 'file',
            fileName: file.name,
            fileSize: file.size,
            processingTime
          })
        }
      }

      setResults(newResults)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate file hashes'
      setError(message)
    } finally {
      setIsProcessing(false)
    }
  }, [selectedAlgorithms])

  const handleFilesChange = useCallback((files: File[]) => {
    if (files.length > 0) {
      hashFile(files[0])
    }
  }, [hashFile])

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }, [])

  const downloadResults = useCallback(() => {
    if (results.length === 0) return

    const content = results.map(result => {
      const lines = [
        `Algorithm: ${result.algorithm}`,
        `Input: ${result.input}`,
        `Hash: ${result.hash}`
      ]

      if (result.fileSize) {
        lines.push(`File Size: ${formatFileSize(result.fileSize)}`)
      }

      if (result.processingTime) {
        lines.push(`Processing Time: ${result.processingTime.toFixed(2)}ms`)
      }

      return lines.join('\n')
    }).join('\n\n---\n\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hashes-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [results, formatFileSize])

  const clearResults = useCallback(() => {
    setResults([])
    setError(null)
    setFileName('')
  }, [])

  const loadExample = useCallback(() => {
    setTextInput('Hello, World! This is a sample text for hashing.')
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hash Generator
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files.
          Useful for data integrity verification and checksums.
        </p>
      </div>

      {/* Algorithm Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Select Hash Algorithms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {algorithms.map((algo) => (
            <label
              key={algo.value}
              className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAlgorithms.includes(algo.value)}
                onChange={() => toggleAlgorithm(algo.value)}
                className="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {algo.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {algo.description}
                </div>
              </div>
            </label>
          ))}
        </div>

        {selectedAlgorithms.length === 0 && (
          <p className="text-sm text-amber-600 dark:text-amber-400">
            Please select at least one hash algorithm
          </p>
        )}
      </div>

      {/* Input Type Tabs */}
      <Tabs defaultValue="text" value={activeTab} onValueChange={(value) => {
        setActiveTab(value as 'text' | 'file')
        clearResults()
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

        <TabsContent value="text" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Text to Hash
            </h3>
            <Button onClick={loadExample} variant="outline" size="sm">
              Load Example
            </Button>
          </div>

          <CodeTextarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text to generate hash..."
            rows={8}
            language="text"
          />

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Characters: {textInput.length.toLocaleString()}
            </div>
            <Button
              onClick={hashText}
              disabled={!textInput.trim() || selectedAlgorithms.length === 0 || isProcessing}
              isLoading={isProcessing}
            >
              Generate Hashes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="file" className="mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              File to Hash
            </h3>

            <FileInput
              onFilesChange={handleFilesChange}
              accept="*/*"
              maxSize={100 * 1024 * 1024} // 100MB
              onError={setError}
            >
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Drop a file here or{' '}
                <span className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-semibold">
                  browse
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Any file type • Maximum 100MB
              </p>
            </FileInput>

            {fileName && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Processing: <span className="font-medium">{fileName}</span>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Error Display */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Hash Results
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadResults}
                className="flex items-center space-x-1"
              >
                <DocumentArrowDownIcon className="h-4 w-4" />
                <span>Download</span>
              </Button>
              <Button variant="outline" size="sm" onClick={clearResults}>
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {result.algorithm}
                    </span>
                    {result.processingTime && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {result.processingTime.toFixed(2)}ms
                      </span>
                    )}
                  </div>
                  <CopyButton text={result.hash} size="sm" />
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Input: {result.input}
                    {result.fileSize && (
                      <span className="ml-2">({formatFileSize(result.fileSize)})</span>
                    )}
                  </div>

                  <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded border break-all">
                    {result.hash}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Hash Algorithm Guide
        </h3>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <div><strong>MD5:</strong> Fast but not cryptographically secure. Good for checksums and non-security purposes.</div>
          <div><strong>SHA-1:</strong> Legacy algorithm, not recommended for security-critical applications.</div>
          <div><strong>SHA-256:</strong> Current standard for security applications. Recommended for most use cases.</div>
          <div><strong>SHA-512:</strong> Strongest available algorithm. Best for high-security requirements.</div>
          <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-700">
            <strong>Use Cases:</strong> File integrity verification, password hashing (with salt), digital signatures, blockchain applications.
          </div>
        </div>
      </div>
    </div>
  )
}

export const hashTool: ToolDefinition = {
  id: 'hash',
  title: 'Hash Generator',
  description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files for integrity verification',
  element: HashGenerator,
  keywords: ['hash', 'md5', 'sha1', 'sha256', 'sha512', 'checksum', 'integrity', 'crypto'],
  seo: {
    title: 'Hash Generator - MD5, SHA-1, SHA-256, SHA-512 Online',
    description: 'Generate secure hashes from text or files using MD5, SHA-1, SHA-256, SHA-512 algorithms. Free online hash generator for data integrity verification.',
  },
}