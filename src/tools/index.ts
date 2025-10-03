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
  // Core tools - implemented
  registerTool(jsonTool)
  registerTool(uuidTool)
  registerTool(base64Tool)
  
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