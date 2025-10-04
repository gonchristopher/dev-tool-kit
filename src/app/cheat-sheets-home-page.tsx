import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCheatSheets, useCheatSheetCategories } from '@/cheat-sheets/registry'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

export function CheatSheetsHomePage() {
  const cheatSheets = useCheatSheets()
  const categories = useCheatSheetCategories()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter cheat sheets based on search and category
  const filteredCheatSheets = cheatSheets.filter(sheet => {
    const matchesSearch = !searchQuery.trim() || 
      sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sheet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sheet.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sheet.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = !selectedCategory || sheet.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category)
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Developer Cheat Sheets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Quick reference guides, shortcuts, and tips for your favorite tools
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg inline-flex">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Curated tips and shortcuts for enhanced productivity
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cheat sheets..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={clsx(
                  'px-3 py-1 text-sm rounded-full border transition-colors',
                  selectedCategory === null
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={clsx(
                    'px-3 py-1 text-sm rounded-full border transition-colors',
                    selectedCategory === category
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cheat Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCheatSheets.map((sheet) => (
            <Link
              key={sheet.id}
              to={`/cheat-sheets/${sheet.id}`}
              className={clsx(
                'group block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
                'hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900'
              )}
            >
              <div className="flex items-center gap-4 mb-3">
                {sheet.icon && (
                  <div className="flex-shrink-0 w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    {sheet.icon}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  {sheet.title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {sheet.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                  {sheet.category}
                </span>
                {sheet.sections.length > 0 && (
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                    {sheet.sections.length} sections
                  </span>
                )}
              </div>

              {sheet.tags && sheet.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {sheet.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {sheet.tags.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      +{sheet.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>

        {cheatSheets.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No cheat sheets are currently available.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Cheat sheets will appear here once they are registered.
            </p>
          </div>
        )}

        {filteredCheatSheets.length === 0 && cheatSheets.length > 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No cheat sheets found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}