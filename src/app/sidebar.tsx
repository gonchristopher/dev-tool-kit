import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { useTheme } from '@/app/theme-provider'
import { searchTools, getAllTools } from '@/plugins/registry'
import type { ToolDefinition } from '@/types'

export function Sidebar() {
  const location = useLocation()
  const { settings, updateSettings } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTools, setFilteredTools] = useState<ToolDefinition[]>([])

  useEffect(() => {
    const tools = searchQuery ? searchTools(searchQuery) : getAllTools()
    setFilteredTools(tools)
  }, [searchQuery])

  const toggleSidebar = useCallback(() => {
    updateSettings({ sidebarCollapsed: !settings.sidebarCollapsed })
  }, [settings.sidebarCollapsed, updateSettings])

  if (settings.sidebarCollapsed) {
    return (
      <div className="w-12 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <button
          onClick={toggleSidebar}
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    )
  }

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dev Utilities
          </h2>
          <button
            onClick={toggleSidebar}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tool List */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          {filteredTools.length > 0 ? (
            <ul className="space-y-1">
              {filteredTools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={`/${tool.id}`}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      location.pathname === `/${tool.id}`
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                  >
                    {tool.icon && (
                      <span className="flex-shrink-0 w-5 h-5">
                        {tool.icon}
                      </span>
                    )}
                    <span className="truncate">{tool.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              {searchQuery ? 'No tools found' : 'No tools available'}
            </div>
          )}
        </nav>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          🔒 All processing happens locally in your browser
        </p>
      </div>
    </div>
  )
}