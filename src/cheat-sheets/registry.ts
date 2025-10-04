import type { CheatSheetDefinition } from '@/types'
import { useState, useEffect } from 'react'

class CheatSheetRegistry {
  private cheatSheets = new Map<string, CheatSheetDefinition>()
  private listeners = new Set<() => void>()

  register(cheatSheet: CheatSheetDefinition) {
    this.cheatSheets.set(cheatSheet.id, cheatSheet)
    this.notifyListeners()
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener())
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  unregister(id: string) {
    this.cheatSheets.delete(id)
  }

  get(id: string): CheatSheetDefinition | undefined {
    return this.cheatSheets.get(id)
  }

  getAll(): CheatSheetDefinition[] {
    return Array.from(this.cheatSheets.values()).sort((a, b) => a.title.localeCompare(b.title))
  }

  getByCategory(category: string): CheatSheetDefinition[] {
    return this.getAll().filter(sheet => sheet.category.toLowerCase() === category.toLowerCase())
  }

  getCategories(): string[] {
    const categories = new Set(this.getAll().map(sheet => sheet.category))
    return Array.from(categories).sort()
  }

  search(query: string): CheatSheetDefinition[] {
    const lowerQuery = query.toLowerCase().trim()
    if (!lowerQuery) return this.getAll()

    return this.getAll().filter(sheet => {
      const searchText = [
        sheet.title,
        sheet.description,
        sheet.category,
        ...(sheet.tags || []),
        ...sheet.sections.flatMap(section => [
          section.title,
          ...section.items.map(item => `${item.title} ${item.description || ''} ${item.shortcut || ''}`)
        ])
      ].join(' ').toLowerCase()
      
      return searchText.includes(lowerQuery)
    })
  }

  clear() {
    this.cheatSheets.clear()
  }
}

export const cheatSheetRegistry = new CheatSheetRegistry()

export function registerCheatSheet(cheatSheet: CheatSheetDefinition) {
  cheatSheetRegistry.register(cheatSheet)
}

export function getCheatSheetById(id: string) {
  return cheatSheetRegistry.get(id)
}

export function getAllCheatSheets() {
  return cheatSheetRegistry.getAll()
}

export function getCheatSheetsByCategory(category: string) {
  return cheatSheetRegistry.getByCategory(category)
}

export function getCheatSheetCategories() {
  return cheatSheetRegistry.getCategories()
}

export function searchCheatSheets(query: string) {
  return cheatSheetRegistry.search(query)
}

// React hook for reactive cheat sheet registry
export function useCheatSheets() {
  const [cheatSheets, setCheatSheets] = useState<CheatSheetDefinition[]>(() => cheatSheetRegistry.getAll())

  useEffect(() => {
    const unsubscribe = cheatSheetRegistry.subscribe(() => {
      setCheatSheets(cheatSheetRegistry.getAll())
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return cheatSheets
}

// Hook for categories
export function useCheatSheetCategories() {
  const [categories, setCategories] = useState<string[]>(() => cheatSheetRegistry.getCategories())

  useEffect(() => {
    const unsubscribe = cheatSheetRegistry.subscribe(() => {
      setCategories(cheatSheetRegistry.getCategories())
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return categories
}