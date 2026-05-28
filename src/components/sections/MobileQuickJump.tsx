import { pricingPagePath, servicesPagePath } from '../../data/site'
import { revenueLeakAuditSectionId } from '../../data/revenueLeakAudit'

const quickJumpLinks = [
  { label: 'Services', href: servicesPagePath },
  { label: 'Pricing', href: pricingPagePath },
  { label: 'Audit', href: `#${revenueLeakAuditSectionId}` },
  { label: 'Contact', href: '#contact' },
] as const

export function MobileQuickJump() {
  return (
    <nav
      className="mx-auto w-full max-w-7xl px-4 pb-2 md:hidden"
      aria-label="Quick jump"
    >
      <ul className="grid grid-cols-4 gap-2">
        {quickJumpLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-1 text-center text-xs font-semibold !text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
