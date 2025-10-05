import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        globIgnores: ['**/worker*.js', '**/sw.js', '**/workbox-*.js'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Developer Utilities',
        short_name: 'DevUtils',
        description: 'A collection of developer tools that work entirely in your browser',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'vite.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), 'src'),
    },
  },
  define: {
    '__DEV_TOOL_KIT_VERSION__': JSON.stringify(process.env.npm_package_version || '0.1.0'),
  },
  worker: {
    format: 'es',
    // Ensure workers are built properly for browser environment
    plugins: () => [react()],
    rollupOptions: {
      // Prevent Node.js crypto module confusion in workers
      external: ['crypto', 'node:crypto'],
      output: {
        format: 'es',
      },
    },
  },
  build: {
    rollupOptions: {
      // Ensure crypto references in workers use the browser version
      external: [],
      output: {
        // Separate worker files to prevent crypto conflicts
        manualChunks: (id) => {
          if (id.includes('worker')) {
            return 'workers'
          }
        },
      },
    },
  },
})
