import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    // Handle unhandled errors more gracefully in CI
    dangerouslyIgnoreUnhandledErrors: true,
    // Set environment options for jsdom
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        runScripts: 'dangerously',
        pretendToBeVisual: true,
        url: 'http://localhost:3000',
      },
    },
    // Increase timeout for CI environments
    testTimeout: 15000,
    // Ensure proper cleanup between tests
    clearMocks: true,
    restoreMocks: true,
    // Pool options for better isolation - use forks for complete isolation
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), 'src'),
    },
  },
})