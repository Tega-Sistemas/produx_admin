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
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8090/TegaCEPP17_2023Produx',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
                configure: (proxy, options) => {
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        proxyReq.setHeader('token', 'askldjuiawe8981dnnu3y471231j0qkd903jfnfu3h487');
                        proxyReq.setHeader('Content-Type', 'application/json;charset=UTF-8');
                        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
                    });
                }
            }
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
