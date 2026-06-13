import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import {
  competitorPositioningNote,
  cyberTier1Help,
  cyberTier2Help,
  outOfScopeHourlyNote,
  pricingCatalog,
  secureLeadCaptureHelp,
} from './src/data/pricingCatalog'
import { advancedSeoNotIncludedNote, advancedSeoPublicLine, aiWorkflowScopeNote } from './src/data/addOnExplanations'

/** Root deploy (Cloudflare Pages, Netlify). Override with VITE_BASE_PATH for GitHub Pages mirror only. */
const basePath = process.env.VITE_BASE_PATH ?? '/'

/** Bump when lead-capture static JS behavior changes; stamped into dist HTML at build. */
const LEAD_CAPTURE_ASSET_VERSION = '2026-06-13-capture'

const LEAD_CAPTURE_SCRIPTS = [
  'inquiry-config.js',
  'inquiry-submit.js',
  'inquiry-form.js',
  'pricing-estimator.js',
  'pricing-catalog.js',
  'package-request-form.js',
] as const

function stampLeadCaptureScriptsInHtml(html: string): string {
  let result = html
  for (const script of LEAD_CAPTURE_SCRIPTS) {
    const escaped = script.replace('.', '\\.')
    const pattern = new RegExp(`((?:\\.\\./|\\.\\/|/)?)(${escaped})(?![?&])`, 'g')
    result = result.replace(pattern, `$1$2?v=${LEAD_CAPTURE_ASSET_VERSION}`)
  }
  return result
}

function walkHtmlFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      files.push(...walkHtmlFiles(full))
      continue
    }
    if (entry.endsWith('.html')) {
      files.push(full)
    }
  }
  return files
}

function stampLeadCaptureScriptsInDist(outDir: string) {
  for (const file of walkHtmlFiles(outDir)) {
    const html = readFileSync(file, 'utf8')
    const stamped = stampLeadCaptureScriptsInHtml(html)
    if (stamped !== html) {
      writeFileSync(file, stamped, 'utf8')
    }
  }
}

function inquiryEnv(mode: string) {
  const fileEnv = loadEnv(mode, process.cwd(), '')
  return {
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL ?? fileEnv.VITE_SUPABASE_URL ?? '',
    VITE_SUPABASE_ANON_KEY:
      process.env.VITE_SUPABASE_ANON_KEY ?? fileEnv.VITE_SUPABASE_ANON_KEY ?? '',
  }
}

function analyticsEnv(mode: string) {
  const fileEnv = loadEnv(mode, process.cwd(), '')
  return {
    VITE_GA_MEASUREMENT_ID:
      process.env.VITE_GA_MEASUREMENT_ID ?? fileEnv.VITE_GA_MEASUREMENT_ID ?? '',
    VITE_CLARITY_PROJECT_ID:
      process.env.VITE_CLARITY_PROJECT_ID ?? fileEnv.VITE_CLARITY_PROJECT_ID ?? '',
  }
}

function inquiryConfigSource(env: { VITE_SUPABASE_URL?: string; VITE_SUPABASE_ANON_KEY?: string }) {
  return `window.__SI_INQUIRY_CONFIG__=${JSON.stringify({
    url: env.VITE_SUPABASE_URL ?? '',
    anonKey: env.VITE_SUPABASE_ANON_KEY ?? '',
  })};\n`
}

function analyticsConfigSource(env: {
  VITE_GA_MEASUREMENT_ID?: string
  VITE_CLARITY_PROJECT_ID?: string
}) {
  return `window.__SI_ANALYTICS_CONFIG__=${JSON.stringify({
    gaMeasurementId: env.VITE_GA_MEASUREMENT_ID ?? '',
    clarityProjectId: env.VITE_CLARITY_PROJECT_ID ?? '',
  })};\n`
}

function pricingCatalogSource() {
  return `window.__SI_PRICING_CATALOG__=${JSON.stringify({
    services: pricingCatalog,
    outOfScopeHourlyNote,
    competitorPositioningNote,
    secureLeadCaptureHelp,
    cyberTier1Help,
    cyberTier2Help,
    advancedSeoNote: advancedSeoPublicLine + ' ' + advancedSeoNotIncludedNote,
    aiWorkflowScopeNote,
  })};\n`
}

function stoneStaticAssetsPlugin(): Plugin {
  let outDir = 'dist'

  return {
    name: 'stone-static-assets',
    configResolved(config) {
      outDir = config.build.outDir
      writeFileSync(join(process.cwd(), 'public', 'pricing-catalog.js'), pricingCatalogSource(), 'utf8')
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0]
        if (path === '/inquiry-config.js') {
          const env = inquiryEnv(server.config.mode)
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
          res.end(inquiryConfigSource(env))
          return
        }
        if (path === '/pricing-catalog.js') {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
          res.end(pricingCatalogSource())
          return
        }
        if (path === '/analytics-config.js') {
          const env = analyticsEnv(server.config.mode)
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
          res.end(analyticsConfigSource(env))
          return
        }
        next()
      })
    },
    closeBundle() {
      const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
      const inquiry = inquiryEnv(mode)
      const analytics = analyticsEnv(mode)
      writeFileSync(join(outDir, 'inquiry-config.js'), inquiryConfigSource(inquiry), 'utf8')
      writeFileSync(join(outDir, 'analytics-config.js'), analyticsConfigSource(analytics), 'utf8')
      writeFileSync(join(outDir, 'pricing-catalog.js'), pricingCatalogSource(), 'utf8')
      stampLeadCaptureScriptsInDist(outDir)
    },
  }
}

export default defineConfig(() => ({
  plugins: [react(), tailwindcss(), stoneStaticAssetsPlugin()],
  base: basePath,
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        audit: resolve(process.cwd(), 'ai-revenue-leak-audit/index.html'),
        calculator: resolve(process.cwd(), 'price-fit-calculator/index.html'),
        remoteSupport: resolve(process.cwd(), 'remote-support/index.html'),
      },
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
