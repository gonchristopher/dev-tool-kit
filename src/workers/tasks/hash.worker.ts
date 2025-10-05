import { createHash } from 'crypto';
import { md5 } from 'js-md5';
import type { WorkerMessage, WorkerResponse } from '../../types';

function hashText(text: string, algorithm: string) {
  const hash = createHash(algorithm);
  hash.update(text);
  return hash.digest('hex');
}

function hashArrayBuffer(buffer: ArrayBuffer, algorithm: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Function to try browser crypto
    const tryBrowserCrypto = () => {
      if (typeof self !== 'undefined' && self.crypto && self.crypto.subtle) {
        self.crypto.subtle.digest(algorithm, buffer)
          .then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer))
            const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
            resolve(hash)
          })
          .catch(reject)
      } else {
        reject(new Error('Crypto API not available'))
      }
    }

    try {
      // Check if we're in Node.js environment
      if (typeof process !== 'undefined' && process.versions && process.versions.node) {
        // Use dynamic import for Node.js crypto
        import('crypto').then(crypto => {
          const normalizedAlg = algorithm.toLowerCase().replace('-', '')
          const uint8Array = new Uint8Array(buffer)
          const hash = crypto.createHash(normalizedAlg).update(uint8Array).digest('hex')
          resolve(hash)
        }).catch(() => {
          // Fall through to browser implementation
          tryBrowserCrypto()
        })
        return
      }

      // Browser environment fallback
      tryBrowserCrypto()
    } catch (error) {
      reject(error)
    }
  })
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
          const cryptoAlg = algorithm === 'SHA-1' ? 'SHA-1' :
            algorithm === 'SHA-256' ? 'SHA-256' : 'SHA-512'
          hash = await hashText(text, cryptoAlg)
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
          const cryptoAlg = algorithm === 'SHA-1' ? 'SHA-1' :
            algorithm === 'SHA-256' ? 'SHA-256' : 'SHA-512'
          hash = await hashArrayBuffer(file, cryptoAlg)
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