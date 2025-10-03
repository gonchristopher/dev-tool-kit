import type { ToolDefinition } from '@/types'

class ToolRegistry {
  private tools = new Map<string, ToolDefinition>()

  register(tool: ToolDefinition) {
    this.tools.set(tool.id, tool)
  }

  unregister(id: string) {
    this.tools.delete(id)
  }

  get(id: string): ToolDefinition | undefined {
    return this.tools.get(id)
  }

  getAll(): ToolDefinition[] {
    return Array.from(this.tools.values()).sort((a, b) => a.title.localeCompare(b.title))
  }

  search(query: string): ToolDefinition[] {
    const lowerQuery = query.toLowerCase().trim()
    if (!lowerQuery) return this.getAll()

    return this.getAll().filter(tool => {
      const searchText = [
        tool.title,
        tool.description,
        ...(tool.keywords || [])
      ].join(' ').toLowerCase()
      
      return searchText.includes(lowerQuery)
    })
  }

  clear() {
    this.tools.clear()
  }
}

export const toolRegistry = new ToolRegistry()

export function registerTool(tool: ToolDefinition) {
  toolRegistry.register(tool)
}

export function getToolById(id: string) {
  return toolRegistry.get(id)
}

export function getAllTools() {
  return toolRegistry.getAll()
}

export function searchTools(query: string) {
  return toolRegistry.search(query)
}