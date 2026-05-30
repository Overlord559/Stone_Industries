import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import {
  trackAuditCtaClick,
  trackPricingCtaClick,
  trackServicesCtaClick,
} from '../../lib/analytics'
import {
  buildMailto,
  calendlyRevenueLeakAuditUrl,
  ctaBookRevenueLeakAudit,
  ctaContactCompany,
  defaultInquiryMailtoSubject,
  externalBookingLinkProps,
  navItems,
  pricingPagePath,
  servicesPagePath,
} from '../../data/site'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-white/[0.12] bg-slate-900/72 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#top"
          className="flex items-center gap-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-semibold tracking-[0.3em] text-cyan-200">
            SI
          </div>
          <div>
            <div className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-slate-200">
              Stone Industries
            </div>
            <div className="text-xs text-slate-400">
              Reliable Today. Autonomous Tomorrow.
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                if (item.href === servicesPagePath) trackServicesCtaClick('navbar')
                if (item.href === pricingPagePath) trackPricingCtaClick('navbar')
              }}
              className="text-sm !text-slate-300 transition hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {item.label}
            </a>
          ))}
          <a
            href={calendlyRevenueLeakAuditUrl}
            {...externalBookingLinkProps}
            onClick={() => trackAuditCtaClick('navbar_desktop')}
            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium !text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/15 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {ctaBookRevenueLeakAudit}
          </a>
          <a
            href={buildMailto(defaultInquiryMailtoSubject)}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium !text-white transition hover:bg-white/10 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {ctaContactCompany}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 !text-white transition hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 [&_svg]:stroke-current"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-white/[0.12] bg-slate-900/88 px-6 py-5 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false)
                    if (item.href === servicesPagePath) trackServicesCtaClick('navbar_mobile')
                    if (item.href === pricingPagePath) trackPricingCtaClick('navbar_mobile')
                  }}
                  className="flex min-h-11 items-center text-sm !text-slate-300 transition hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={calendlyRevenueLeakAuditUrl}
                {...externalBookingLinkProps}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-medium !text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/15 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                onClick={() => {
                  setIsOpen(false)
                  trackAuditCtaClick('navbar_mobile')
                }}
              >
                {ctaBookRevenueLeakAudit}
              </a>
              <a
                href={buildMailto(defaultInquiryMailtoSubject)}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium !text-white transition hover:border-white/25 hover:bg-white/10 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                onClick={() => setIsOpen(false)}
              >
                {ctaContactCompany}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>

    <div
      className="si-mobile-contact-bar fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.12] bg-slate-900/92 backdrop-blur-xl md:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <div className="mx-auto flex max-w-7xl gap-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={calendlyRevenueLeakAuditUrl}
          {...externalBookingLinkProps}
          onClick={() => trackAuditCtaClick('mobile_sticky')}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 text-sm font-semibold !text-cyan-50 transition hover:border-cyan-300/50 hover:bg-cyan-400/15 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Book Audit
        </a>
        <a
          href={pricingPagePath}
          onClick={() => trackPricingCtaClick('mobile_sticky')}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold !text-white transition hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Pricing
        </a>
      </div>
    </div>
    </>
  )
}
