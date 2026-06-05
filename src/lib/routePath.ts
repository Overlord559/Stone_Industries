/** Normalize pathname for client-side route matching (respects Vite BASE_URL). */
export function normalizeAppPath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  let path = pathname
  if (base && path.startsWith(base)) {
    path = path.slice(base.length)
  }
  const normalized = path.replace(/\/$/, '') || '/'
  return normalized
}

export type AppRoute = 'home' | 'audit' | 'calculator' | 'remote-support'

const ROUTE_PATHS: Record<Exclude<AppRoute, 'home'>, string> = {
  audit: '/ai-revenue-leak-audit',
  calculator: '/price-fit-calculator',
  'remote-support': '/remote-support',
}

export function getAppRoute(pathname?: string): AppRoute {
  const path = normalizeAppPath(pathname ?? window.location.pathname)
  if (path === ROUTE_PATHS.audit) return 'audit'
  if (path === ROUTE_PATHS.calculator) return 'calculator'
  if (path === ROUTE_PATHS['remote-support']) return 'remote-support'
  return 'home'
}

export function isAiRevenueLeakAuditPath(pathname?: string): boolean {
  return getAppRoute(pathname) === 'audit'
}

export function isPriceFitCalculatorPath(pathname?: string): boolean {
  return getAppRoute(pathname) === 'calculator'
}

export function isRemoteSupportPath(pathname?: string): boolean {
  return getAppRoute(pathname) === 'remote-support'
}

export function isStandaloneAppPath(pathname?: string): boolean {
  return getAppRoute(pathname) !== 'home'
}
