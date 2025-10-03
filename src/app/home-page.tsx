import { Link } from 'react-router-dom'
import { useTools } from '@/plugins/registry'
import { clsx } from 'clsx'

export function HomePage() {
  const tools = useTools()

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
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Built with React + TypeScript + Vite. Open source and privacy-friendly.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a
              href="https://github.com/gonchristopher/dev-tool-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <a
              href="https://github.com/gonchristopher/dev-tool-kit/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Report Issues
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}