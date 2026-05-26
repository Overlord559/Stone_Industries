import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'

const repoBasePath = process.env.VITE_BASE_PATH ?? '/Stone_Industries/'

function inquiryEnv(mode: string) {
  const fileEnv = loadEnv(mode, process.cwd(), '')
  return {
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL ?? fileEnv.VITE_SUPABASE_URL ?? '',
    VITE_SUPABASE_ANON_KEY:
      process.env.VITE_SUPABASE_ANON_KEY ?? fileEnv.VITE_SUPABASE_ANON_KEY ?? '',
  }
}

function inquiryConfigSource(env: { VITE_SUPABASE_URL?: string; VITE_SUPABASE_ANON_KEY?: string }) {
  return `window.__SI_INQUIRY_CONFIG__=${JSON.stringify({
    url: env.VITE_SUPABASE_URL ?? '',
    anonKey: env.VITE_SUPABASE_ANON_KEY ?? '',
  })};\n`
}

function stoneInquiryConfigPlugin(): Plugin {
  let outDir = 'dist'

  return {
    name: 'stone-inquiry-config',
    configResolved(config) {
      outDir = config.build.outDir
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/inquiry-config.js') {
          next()
          return
        }

        const env = inquiryEnv(server.config.mode)
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
        res.end(inquiryConfigSource(env))
      })
    },
    closeBundle() {
      const env = inquiryEnv(process.env.NODE_ENV === 'production' ? 'production' : 'development')
      writeFileSync(join(outDir, 'inquiry-config.js'), inquiryConfigSource(env), 'utf8')
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), stoneInquiryConfigPlugin()],
  base: mode === 'production' ? repoBasePath : '/',
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@react-three/fiber')) {
            return 'fiber'
          }

          if (id.includes('three')) {
            return 'three'
          }

          if (id.includes('framer-motion')) {
            return 'motion'
          }

          if (id.includes('react') || id.includes('scheduler')) {
            return 'react-vendor'
          }
        },
      },
    },
  },
}))
