// Import all tool definitions
import { jsonTool } from './json/index'
import { uuidTool } from './uuid/index'
import { base64Tool } from './base64/index'
import { 
  urlTool, 
  hashTool, 
  timestampTool, 
  jwtTool, 
  regexTool, 
  diffTool, 
  csvJsonTool 
} from './placeholders'

// Register tools with the registry
import { registerTool } from '@/plugins/registry'

export function registerTools() {
  console.log('registerTools called')
  // Core tools - implemented
  try {
    console.log('Registering jsonTool:', jsonTool)
    registerTool(jsonTool)
    console.log('Registering uuidTool:', uuidTool)
    registerTool(uuidTool) 
    console.log('Registering base64Tool:', base64Tool)
    registerTool(base64Tool)
  } catch (error) {
    console.error('Error registering core tools:', error)
  }
  
  // Placeholder tools - to be implemented
  registerTool(urlTool)
  registerTool(hashTool)
  registerTool(timestampTool)
  registerTool(jwtTool)
  registerTool(regexTool)
  registerTool(diffTool)
  registerTool(csvJsonTool)
}

// Export individual tools if needed
export {
  jsonTool,
  uuidTool,
  base64Tool,
  urlTool,
  hashTool,
  timestampTool,
  jwtTool,
  regexTool,
  diffTool,
  csvJsonTool,
}