import type { WorkerMessage, WorkerResponse } from '../../types'

// Sort object keys recursively
function sortObjectKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys)
  }
  
  if (obj && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj)
      .sort()
      .reduce((sorted: any, key) => {
        sorted[key] = sortObjectKeys(obj[key])
        return sorted
      }, {})
  }
  
  return obj
}

self.addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
  const { type, payload, id } = event.data
  let response: WorkerResponse

  try {
    switch (type) {
      case 'json-parse': {
        const { text, sortKeys = false } = payload
        let parsed = JSON.parse(text)
        
        if (sortKeys) {
          parsed = sortObjectKeys(parsed)
        }
        
        response = {
          type: 'json-parse-result',
          payload: { parsed },
          id,
        }
        break
      }

      case 'json-stringify': {
        const { data, minify = false, sortKeys = false } = payload
        let processedData = data
        
        if (sortKeys) {
          processedData = sortObjectKeys(data)
        }
        
        const formatted = minify 
          ? JSON.stringify(processedData)
          : JSON.stringify(processedData, null, 2)
        
        response = {
          type: 'json-stringify-result',
          payload: { formatted },
          id,
        }
        break
      }

      default:
        throw new Error(`Unknown task type: ${type}`)
    }
  } catch (error) {
    response = {
      type: 'error',
      payload: null,
      id,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }

  self.postMessage(response)
})