import { Link, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import { WrenchScrewdriverIcon, BookOpenIcon } from '@heroicons/react/24/outline'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const navigation: NavigationItem[] = [
  {
    name: 'Tools',
    href: '/',
    icon: WrenchScrewdriverIcon,
    description: 'Developer utilities and converters'
  },
  {
    name: 'Cheat Sheets',
    href: '/cheat-sheets',
    icon: BookOpenIcon,
    description: 'Quick reference guides and tips'
  }
]

export function MainNavigation() {
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === '/') {
      return !location.pathname.startsWith('/cheat-sheets')
    }
    return location.pathname.startsWith(href)
  }

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center gap-2 px-1 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                  active
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}