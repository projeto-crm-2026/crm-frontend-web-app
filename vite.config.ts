import path from 'node:path'
import { defineConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      generatedRouteTree: './src/route-tree.gen.ts',
      routesDirectory: './src/routes',
      routeToken: 'layout'
    }),
    react()
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      }
    ]
  },
  server: {
    open: true,
    port: 5174
  },
  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }

            if (id.includes('@tanstack')) {
              return 'tanstack-vendor'
            }

            if (id.includes('zod')) {
              return 'form-libs'
            }

            return 'vendor'
          }
        }
      }
    },
    cssCodeSplit: true,
    reportCompressedSize: true
  }
})
