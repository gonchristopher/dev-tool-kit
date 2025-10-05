import type { WorkerMessage, WorkerResponse } from '../../types'

// Sort object keys recursively
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

function sortObjectKeys(obj: JsonValue): JsonValue {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys)
  }

  if (obj && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj)
      .sort()
      .reduce((sorted: Record<string, JsonValue>, key) => {
        sorted[key] = sortObjectKeys((obj as Record<string, JsonValue>)[key])
        return sorted
      }, {} as Record<string, JsonValue>)
  }

  return obj
}

self.addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
  const { type, payload, id } = event.data
  let response: WorkerResponse

  try {
    switch (type) {
      case 'json-parse': {
        const { text, sortKeys = false } = payload as { text: string; sortKeys?: boolean }
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
        const { data, minify = false, sortKeys = false } = payload as { data: JsonValue; minify?: boolean; sortKeys?: boolean }
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