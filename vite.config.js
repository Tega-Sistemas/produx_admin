import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon.ico', 'logo192.png', 'logo512.png'],
      manifest: {
        name: 'Produx Admin',
        short_name: 'Produx',
        description: 'Industrial Process Management',
        theme_color: '#041A56',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 5000,
    hmr: {
      overlay: true
    }
  },
  build: {
    rollupOptions: {
      external: ['workbox-core', 'workbox-expiration', 'workbox-precaching', 'workbox-routing', 'workbox-strategies']
    }
  },
  // Ignore service worker files during development
  optimizeDeps: {
    exclude: ['workbox-core', 'workbox-expiration', 'workbox-precaching', 'workbox-routing', 'workbox-strategies']
  }
})
