import { md5 } from 'js-md5'
import type { WorkerMessage, WorkerResponse } from '../../types'

async function hashWithWebCrypto(data: ArrayBuffer, algorithm: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

function stringToArrayBuffer(str: string): ArrayBuffer {
  const encoder = new TextEncoder()
  return encoder.encode(str).buffer
}

self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  const { type, payload, id } = event.data
  let response: WorkerResponse

  try {
    switch (type) {
      case 'hash-text': {
        const { text, algorithm } = payload as { text: string; algorithm: string }
        let hash: string

        if (algorithm === 'MD5') {
          hash = md5(text)
        } else {
          const data = stringToArrayBuffer(text)
          const webCryptoAlg = algorithm === 'SHA-1' ? 'SHA-1' :
            algorithm === 'SHA-256' ? 'SHA-256' : 'SHA-512'
          hash = await hashWithWebCrypto(data, webCryptoAlg)
        }

        response = {
          type: 'hash-result',
          payload: { hash, algorithm },
          id,
        }
        break
      }

      case 'hash-file': {
        const { file, algorithm } = payload as { file: ArrayBuffer; algorithm: string }
        let hash: string

        if (algorithm === 'MD5') {
          // Convert ArrayBuffer to string for MD5
          const bytes = new Uint8Array(file)
          hash = md5(bytes)
        } else {
          const webCryptoAlg = algorithm === 'SHA-1' ? 'SHA-1' :
            algorithm === 'SHA-256' ? 'SHA-256' : 'SHA-512'
          hash = await hashWithWebCrypto(file, webCryptoAlg)
        }

        response = {
          type: 'hash-result',
          payload: { hash, algorithm },
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