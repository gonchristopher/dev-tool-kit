import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/app/theme-provider'
import { ToastProvider } from '@/components'
import { Header } from '@/app/header'
import { Sidebar } from '@/app/sidebar'
import { HomePage } from '@/app/home-page'
import { ToolPage } from '@/app/tool-page'
import { registerTools } from '@/tools'

// Global keyboard shortcuts
function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K for tool switcher
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        // This will be handled by the Header component
        const toolSwitcherButton = document.querySelector('[title*="Quick tool search"]') as HTMLButtonElement
        toolSwitcherButton?.click()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}

function AppRoutes() {
  useKeyboardShortcuts()

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:toolId" element={<ToolPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export function App() {
  // Register all tools on app startup
  useEffect(() => {
    registerTools()
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}