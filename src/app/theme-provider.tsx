import type { AppSettings, Theme } from '@/types'
import { useEffect, useState } from 'react'
import { STORAGE_KEY, ThemeContext, defaultSettings } from './theme-context'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings
    } catch {
      return defaultSettings
    }
  })

  const updateSettings = (updates: Partial<AppSettings>) => {
    const newSettings = { ...settings, ...updates }
    setSettings(newSettings)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))
  }

  const setTheme = (mode: Theme['mode']) => {
    updateSettings({ theme: { mode } })
  }

  useEffect(() => {
    const root = window.document.documentElement

    const getSystemTheme = (): 'light' | 'dark' => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const applyTheme = (theme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
    }

    if (settings.theme.mode === 'system') {
      applyTheme(getSystemTheme())

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light')
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      applyTheme(settings.theme.mode)
    }
  }, [settings.theme.mode])

  return (
    <ThemeContext.Provider value={{
      theme: settings.theme.mode,
      setTheme,
      settings,
      updateSettings,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

