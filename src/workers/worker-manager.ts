import type { WorkerMessage, WorkerResponse } from '@/types'

// Available worker tasks
export type WorkerTaskType = 
  | 'json-parse'
  | 'json-stringify' 
  | 'hash-text'
  | 'hash-file'
  | 'diff-text'

export interface JsonParseTask {
  type: 'json-parse'
  payload: {
    text: string
    sortKeys?: boolean
  }
}

export interface JsonStringifyTask {
  type: 'json-stringify'
  payload: {
    data: any
    minify?: boolean
    sortKeys?: boolean
  }
}

export interface HashTextTask {
  type: 'hash-text'
  payload: {
    text: string
    algorithm: 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'
  }
}

export interface HashFileTask {
  type: 'hash-file'
  payload: {
    file: ArrayBuffer
    algorithm: 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'
  }
}

export interface DiffTextTask {
  type: 'diff-text'
  payload: {
    oldText: string
    newText: string
  }
}

export type WorkerTask = JsonParseTask | JsonStringifyTask | HashTextTask | HashFileTask | DiffTextTask

class WorkerManager {
  private workers = new Map<string, Worker>()
  private messageHandlers = new Map<string, (response: WorkerResponse) => void>()

  private getWorker(taskType: WorkerTaskType): Worker {
    if (!this.workers.has(taskType)) {
      const worker = new Worker(
        new URL(`./tasks/${this.getWorkerFile(taskType)}`, import.meta.url),
        { type: 'module' }
      )
      
      worker.addEventListener('message', this.handleWorkerMessage.bind(this))
      worker.addEventListener('error', this.handleWorkerError.bind(this))
      
      this.workers.set(taskType, worker)
    }
    
    return this.workers.get(taskType)!
  }

  private getWorkerFile(taskType: WorkerTaskType): string {
    switch (taskType) {
      case 'json-parse':
      case 'json-stringify':
        return 'json.worker.ts'
      case 'hash-text':
      case 'hash-file':
        return 'hash.worker.ts'
      case 'diff-text':
        return 'diff.worker.ts'
      default:
        throw new Error(`Unknown task type: ${taskType}`)
    }
  }

  private handleWorkerMessage(event: MessageEvent<WorkerResponse>) {
    const response = event.data
    const handler = this.messageHandlers.get(response.id)
    
    if (handler) {
      handler(response)
      this.messageHandlers.delete(response.id)
    }
  }

  private handleWorkerError(event: ErrorEvent) {
    console.error('Worker error:', event.error)
  }

  public async runTask<T extends WorkerTask>(task: T): Promise<WorkerResponse> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substr(2, 9)
      const message: WorkerMessage = {
        type: task.type,
        payload: task.payload,
        id,
      }

      const timeoutId = setTimeout(() => {
        this.messageHandlers.delete(id)
        reject(new Error('Worker task timeout'))
      }, 30000) // 30 second timeout

      this.messageHandlers.set(id, (response: WorkerResponse) => {
        clearTimeout(timeoutId)
        if (response.error) {
          reject(new Error(response.error))
        } else {
          resolve(response)
        }
      })

      try {
        const worker = this.getWorker(task.type as WorkerTaskType)
        worker.postMessage(message)
      } catch (error) {
        this.messageHandlers.delete(id)
        clearTimeout(timeoutId)
        reject(error)
      }
    })
  }

  public terminate(taskType?: WorkerTaskType) {
    if (taskType) {
      const worker = this.workers.get(taskType)
      if (worker) {
        worker.terminate()
        this.workers.delete(taskType)
      }
    } else {
      // Terminate all workers
      for (const worker of this.workers.values()) {
        worker.terminate()
      }
      this.workers.clear()
      this.messageHandlers.clear()
    }
  }
}

// Singleton instance
export const workerManager = new WorkerManager()

// Convenience functions for common tasks
export const jsonWorker = {
  parse: (text: string, sortKeys?: boolean) =>
    workerManager.runTask({
      type: 'json-parse',
      payload: { text, sortKeys },
    }),

  stringify: (data: any, minify = false, sortKeys = false) =>
    workerManager.runTask({
      type: 'json-stringify',
      payload: { data, minify, sortKeys },
    }),
}

export const hashWorker = {
  hashText: (text: string, algorithm: HashTextTask['payload']['algorithm']) =>
    workerManager.runTask({
      type: 'hash-text',
      payload: { text, algorithm },
    }),

  hashFile: (file: ArrayBuffer, algorithm: HashFileTask['payload']['algorithm']) =>
    workerManager.runTask({
      type: 'hash-file',
      payload: { file, algorithm },
    }),
}

export const diffWorker = {
  compare: (oldText: string, newText: string) =>
    workerManager.runTask({
      type: 'diff-text',
      payload: { oldText, newText },
    }),
}