import { getAllTools, searchTools } from '@/plugins/registry'
import type { ToolDefinition } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ToolSwitcherModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ToolSwitcherModal({ isOpen, onClose }: ToolSwitcherModalProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filteredTools, setFilteredTools] = useState<ToolDefinition[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Use setTimeout to batch state updates and avoid synchronous setState
      const timeoutId = setTimeout(() => {
        setQuery('')
        setSelectedIndex(0)
        const tools = getAllTools()
        setFilteredTools(tools)
      }, 0)

      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100)

      return () => clearTimeout(timeoutId)
    }
  }, [isOpen])

  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      const tools = query.trim() ? searchTools(query) : getAllTools()
      setFilteredTools(tools)
      setSelectedIndex(0)
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex(prev =>
            prev < filteredTools.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
          break
        case 'Enter': {
          event.preventDefault()
          const selectedTool = filteredTools[selectedIndex]
          if (selectedTool) {
            navigate(`/${selectedTool.id}`)
            onClose()
          }
          break
        }
        case 'Escape':
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredTools, selectedIndex, navigate, onClose])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl transition-all">
                <div className="relative">
                  {/* Search input */}
                  <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search for a tool..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg"
                    />
                    <button
                      onClick={onClose}
                      className="ml-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Tool list */}
                  <div className="max-h-96 overflow-y-auto">
                    {filteredTools.length > 0 ? (
                      <ul className="py-2">
                        {filteredTools.map((tool, index) => (
                          <li key={tool.id}>
                            <button
                              onClick={() => {
                                navigate(`/${tool.id}`)
                                onClose()
                              }}
                              className={clsx(
                                'w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
                                index === selectedIndex && 'bg-blue-50 dark:bg-blue-900/30'
                              )}
                            >
                              {tool.icon && (
                                <span className="flex-shrink-0 w-5 h-5 text-gray-400">
                                  {tool.icon}
                                </span>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {tool.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {tool.description}
                                </p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        No tools found for "{query}"
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600 text-xs text-gray-400 dark:text-gray-500">
                    <div className="flex items-center justify-between">
                      <span>Navigate with ↑↓ keys</span>
                      <span>Press Enter to select</span>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}