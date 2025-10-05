import type { AppSettings, Theme } from '@/types'
import { createContext, useContext } from 'react'

export interface ThemeContextType {
    theme: Theme['mode']
    setTheme: (theme: Theme['mode']) => void
    settings: AppSettings
    updateSettings: (updates: Partial<AppSettings>) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const STORAGE_KEY = 'dev-utils-settings'

export const defaultSettings: AppSettings = {
    theme: { mode: 'system' },
}