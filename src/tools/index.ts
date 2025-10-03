// Import all tool definitions
import { jsonTool } from './json/index'
import { uuidTool } from './uuid/index'
import { base64Tool } from './base64/index'
import { csvJsonTool } from './csv-json/index'
import { hashTool } from './hash/index'
import { diffTool } from './diff/index'
import { 
  urlTool
} from './placeholders'

// Register tools with the registry
import { registerTool } from '@/plugins/registry'

export function registerTools() {
  // Core tools - implemented
  try {
    registerTool(jsonTool)
    registerTool(uuidTool) 
    registerTool(base64Tool)
    registerTool(csvJsonTool)
    registerTool(hashTool)
  } catch (error) {
    console.error('Error registering core tools:', error)
  }
  
  // Additional implemented tools
  registerTool(diffTool)
  
  // Placeholder tools - to be implemented
  registerTool(urlTool)
}

// Export individual tools if needed
export {
  jsonTool,
  uuidTool,
  base64Tool,
  csvJsonTool,
  urlTool,
  hashTool,
  diffTool,
}