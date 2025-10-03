import { useState } from 'react'
import { 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { useTheme } from '@/app/theme-provider'
import { ToolSwitcherModal } from '@/app/tool-switcher'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [showToolSwitcher, setShowToolSwitcher] = useState(false)

  const themeOptions = [
    { value: 'light' as const, icon: SunIcon, label: 'Light' },
    { value: 'dark' as const, icon: MoonIcon, label: 'Dark' },
    { value: 'system' as const, icon: ComputerDesktopIcon, label: 'System' },
  ]

  return (
    <>
      <header className="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
            Developer Utilities
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick tool search */}
          <button
            onClick={() => setShowToolSwitcher(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 
                     hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 
                     rounded-md transition-colors"
            title="Quick tool search (Ctrl/Cmd + K)"
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
            <span className="hidden md:inline">Search tools</span>
            <div className="hidden sm:flex items-center gap-1 text-xs">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-600 rounded border">
                ⌘K
              </kbd>
            </div>
          </button>

          {/* Theme toggle */}
          <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg p-1">
            {themeOptions.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`p-1.5 rounded-md transition-colors ${
                  theme === value
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </header>

      <ToolSwitcherModal 
        isOpen={showToolSwitcher} 
        onClose={() => setShowToolSwitcher(false)} 
      />
    </>
  )
}