import { CheatSheetPage } from '@/app/cheat-sheet-page'
import { CheatSheetsHomePage } from '@/app/cheat-sheets-home-page'
import { Header } from '@/app/header'
import { HomePage } from '@/app/home-page'
import { MainNavigation } from '@/app/main-navigation'
import { ThemeProvider } from '@/app/theme-provider'
import { ToolPage } from '@/app/tool-page'
import { registerCheatSheets } from '@/cheat-sheets'
import { ToastProvider } from '@/components'
import { registerTools } from '@/tools'
import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

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
      <MainNavigation />

      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cheat-sheets" element={<CheatSheetsHomePage />} />
          <Route path="/cheat-sheets/:cheatSheetId" element={<CheatSheetPage />} />
          <Route path="/:toolId" element={<ToolPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export function App() {
  // Register all tools and cheat sheets on app startup
  useEffect(() => {
    registerTools()
    registerCheatSheets()
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