import type { WorkerMessage, WorkerResponse } from '../../types'
import { diffLines, diffChars } from 'diff'

self.addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
  const { type, payload, id } = event.data
  let response: WorkerResponse

  try {
    switch (type) {
      case 'diff-text': {
        const { oldText, newText } = payload
        
        // Perform both line-level and character-level diffs
        const lineDiff = diffLines(oldText, newText)
        const charDiff = diffChars(oldText, newText)
        
        response = {
          type: 'diff-result',
          payload: { 
            lineDiff, 
            charDiff,
            stats: {
              linesAdded: lineDiff.filter(part => part.added).length,
              linesRemoved: lineDiff.filter(part => part.removed).length,
              linesUnchanged: lineDiff.filter(part => !part.added && !part.removed).length,
            }
          },
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