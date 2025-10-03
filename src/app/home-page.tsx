import { Link } from 'react-router-dom'
import { getAllTools } from '@/plugins/registry'
import { clsx } from 'clsx'

export function HomePage() {
  const tools = getAllTools()

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Developer Utilities
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A collection of developer tools that work entirely in your browser
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg inline-flex">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            All processing happens locally - your data never leaves your browser
          </div>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              to={`/${tool.id}`}
              className={clsx(
                'group block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
                'hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900'
              )}
            >
              <div className="flex items-center gap-4 mb-3">
                {tool.icon && (
                  <div className="flex-shrink-0 w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    {tool.icon}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  {tool.title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {tool.description}
              </p>

              {tool.keywords && tool.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tool.keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                  {tool.keywords.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      +{tool.keywords.length - 3}
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>

        {tools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No tools are currently available.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Tools will appear here once they are registered.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Built with React + TypeScript + Vite. Open source and privacy-friendly.
          </p>
        </div>
      </div>
    </div>
  )
}