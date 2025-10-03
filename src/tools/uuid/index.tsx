import { useState } from 'react'
import { ClipboardIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import type { ToolDefinition } from '@/types'

function UUIDGenerator() {
  const [uuids, setUUIDs] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState<string | null>(null)

  const generateUUIDs = () => {
    const newUUIDs: string[] = []
    for (let i = 0; i < count; i++) {
      newUUIDs.push(crypto.randomUUID())
    }
    setUUIDs(newUUIDs)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            UUID Generator
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generate RFC 4122 compliant UUIDs (version 4) for use in your applications
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="count" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Count:
            </label>
            <input
              id="count"
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            onClick={generateUUIDs}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                     text-white text-sm font-medium rounded-lg transition-colors
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Generate
          </button>

          {uuids.length > 0 && (
            <button
              onClick={() => copyToClipboard(uuids.join('\n'))}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600
                       text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ClipboardIcon className="w-4 h-4" />
              Copy All
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 p-6 overflow-y-auto">
        {uuids.length > 0 ? (
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <code className="flex-1 font-mono text-sm text-gray-900 dark:text-gray-100 select-all">
                  {uuid}
                </code>
                <button
                  onClick={() => copyToClipboard(uuid)}
                  className={`p-2 rounded transition-colors ${
                    copied === uuid
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  title="Copy to clipboard"
                >
                  <ClipboardIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ArrowPathIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No UUIDs generated yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Click the Generate button to create random UUIDs
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export const uuidTool: ToolDefinition = {
  id: 'uuid',
  title: 'UUID Generator',
  description: 'Generate RFC 4122 compliant UUIDs for your applications',
  keywords: ['uuid', 'guid', 'identifier', 'random', 'generator'],
  element: UUIDGenerator,
  icon: <ArrowPathIcon className="w-5 h-5" />,
  seo: {
    title: 'UUID Generator - Generate Random UUIDs Online',
    description: 'Generate RFC 4122 compliant UUIDs (version 4) for your applications. Free online tool that works in your browser.',
  },
}