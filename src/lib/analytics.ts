export type AnalyticsEvent =
  | 'page_view'
  | 'audit_cta_click'
  | 'audit_form_start'
  | 'audit_form_submit_success'
  | 'audit_form_submit_error'
  | 'mailto_fallback_click'
  | 'pricing_cta_click'
  | 'services_cta_click'

export type AnalyticsErrorType = 'validation' | 'not_configured' | 'submit'

type SafeEventParams = {
  page_path?: string
  cta_location?: string
  error_type?: AnalyticsErrorType
  context?: 'audit' | 'inquiry'
}

function readEnv(id: keyof ImportMetaEnv): string {
  const value = import.meta.env[id]
  return typeof value === 'string' ? value.trim() : ''
}

function getPagePath(): string {
  return `${window.location.pathname}${window.location.hash}`
}

function buildSafeParams(params?: SafeEventParams): Record<string, string> {
  const safe: Record<string, string> = {
    page_path: params?.page_path ?? getPagePath(),
  }

  if (params?.cta_location) safe.cta_location = params.cta_location
  if (params?.error_type) safe.error_type = params.error_type
  if (params?.context) safe.context = params.context

  return safe
}

export function isAnalyticsConfigured(): boolean {
  return Boolean(readEnv('VITE_GA_MEASUREMENT_ID') || readEnv('VITE_CLARITY_PROJECT_ID'))
}

export function initAnalytics(): void {
  const gaId = readEnv('VITE_GA_MEASUREMENT_ID')
  const clarityId = readEnv('VITE_CLARITY_PROJECT_ID')

  if (gaId) {
    window.dataLayer = window.dataLayer ?? []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId, { send_page_view: false })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    document.head.appendChild(script)
  }

  if (clarityId) {
    type ClarityStub = ((...args: unknown[]) => void) & { q?: unknown[] }
    const clarityWindow = window as Window & { clarity?: ClarityStub }
    clarityWindow.clarity =
      clarityWindow.clarity ??
      function (...args: unknown[]) {
        ;(clarityWindow.clarity!.q = clarityWindow.clarity!.q ?? []).push(args)
      }
    const clarityScript = document.createElement('script')
    clarityScript.async = true
    clarityScript.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript?.parentNode?.insertBefore(clarityScript, firstScript)
  }
}

export function trackEvent(event: AnalyticsEvent, params?: SafeEventParams): void {
  const gaId = readEnv('VITE_GA_MEASUREMENT_ID')
  if (!gaId || typeof window.gtag !== 'function') return

  window.gtag('event', event, buildSafeParams(params))
}

export function trackPageView(): void {
  trackEvent('page_view')
}

export function trackAuditCtaClick(ctaLocation: string): void {
  trackEvent('audit_cta_click', { cta_location: ctaLocation })
}

export function trackPricingCtaClick(ctaLocation: string): void {
  trackEvent('pricing_cta_click', { cta_location: ctaLocation })
}

export function trackServicesCtaClick(ctaLocation: string): void {
  trackEvent('services_cta_click', { cta_location: ctaLocation })
}

export function trackMailtoFallbackClick(context: 'audit' | 'inquiry' = 'audit'): void {
  trackEvent('mailto_fallback_click', { context })
}
