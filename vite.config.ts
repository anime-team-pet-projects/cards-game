import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

const federationConfig = federation({
  name: 'remote_header',
  filename: 'remoteEntry.js',
  exposes: {
    './Header': '#widgets/Header',
  },
  shared: ['react', 'react-dom']
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') as ImportMetaEnv

  return {
    plugins: [
      react(),
      federationConfig,
    ],
    server: {
      port: parseInt(env.VITE_PORT),

      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    preview: {
      port: parseInt(env.VITE_PORT),
    },
    test: {
      globals: true,
      environment: 'happy-dom',
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@@': fileURLToPath(new URL('./', import.meta.url)),
        public: fileURLToPath(new URL('./public', import.meta.url)),
        '#app': fileURLToPath(new URL('./src/app', import.meta.url)),
        '#processes': fileURLToPath(new URL('./src/processes', import.meta.url)),
        '#pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '#widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
        '#features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '#entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
        '#shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      },
    }
  }
})
