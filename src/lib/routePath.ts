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

export function isAiRevenueLeakAuditPath(pathname?: string): boolean {
  const path = normalizeAppPath(pathname ?? window.location.pathname)
  return path === '/ai-revenue-leak-audit'
}
