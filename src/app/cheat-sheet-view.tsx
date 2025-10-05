import { useToast } from '@/components'
import type { CheatSheetDefinition, CheatSheetItem } from '@/types'
import { ClipboardIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

interface CheatSheetViewProps {
  cheatSheet: CheatSheetDefinition
}

interface CheatSheetItemCardProps {
  item: CheatSheetItem
  showCategory?: boolean
}

function CheatSheetItemCard({ item, showCategory = false }: CheatSheetItemCardProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const { showToast } = useToast()

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      showToast({
        variant: 'success',
        message: `${type} copied to clipboard!`
      })
      setTimeout(() => setCopied(null), 2000)
    } catch {
      showToast({
        variant: 'error',
        message: 'Failed to copy to clipboard'
      })
    }
  }

  const getOSDisplay = (os?: string) => {
    if (!os || os === 'all') return null
    const osMap = {
      windows: 'Windows',
      mac: 'macOS',
      linux: 'Linux'
    }
    return osMap[os as keyof typeof osMap] || os
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 dark:text-white">
            {item.title}
          </h4>

          {item.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {item.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {item.shortcut && (
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded border">
                  {item.shortcut}
                </kbd>
                <button
                  onClick={() => handleCopy(item.shortcut!, 'Shortcut')}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Copy shortcut"
                >
                  {copied === 'Shortcut' ? (
                    <CheckIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <ClipboardIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}

            {item.code && (
              <div className="flex items-center gap-2">
                <code className="px-2 py-1 text-xs font-mono bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded border">
                  {item.code}
                </code>
                <button
                  onClick={() => handleCopy(item.code!, 'Code')}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Copy code"
                >
                  {copied === 'Code' ? (
                    <CheckIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <ClipboardIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}

            {item.os && getOSDisplay(item.os) && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                {getOSDisplay(item.os)}
              </span>
            )}

            {showCategory && item.category && (
              <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                {item.category}
              </span>
            )}
          </div>

          {item.example && (
            <div className="mt-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Example:</div>
              <pre className="text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded border overflow-x-auto">
                <code>{item.example}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function CheatSheetView({ cheatSheet }: CheatSheetViewProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter items based on search query
  const filteredSections = cheatSheet.sections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase()
      return (
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.shortcut?.toLowerCase().includes(query) ||
        item.code?.toLowerCase().includes(query) ||
        item.example?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query)
      )
    })
  })).filter(section => section.items.length > 0)

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {cheatSheet.icon && (
              <div className="w-10 h-10 text-blue-600 dark:text-blue-400">
                {cheatSheet.icon}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {cheatSheet.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {cheatSheet.description}
              </p>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
              {cheatSheet.category}
            </span>
            {cheatSheet.lastUpdated && (
              <span>Updated: {cheatSheet.lastUpdated}</span>
            )}
            {cheatSheet.tags && cheatSheet.tags.length > 0 && (
              <div className="flex gap-1">
                {cheatSheet.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${cheatSheet.title.toLowerCase()}...`}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {filteredSections.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No results found for "{searchQuery}"
              </p>
            </div>
          )}

          {filteredSections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {section.items.map((item, itemIndex) => (
                  <CheatSheetItemCard
                    key={itemIndex}
                    item={item}
                    showCategory={false}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}