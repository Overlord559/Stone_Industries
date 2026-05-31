import { auditPagePath } from '../../data/revenueLeakAudit'
import {
  calendlyGeneralConsultationUrl,
  contactEmail,
  contactPhone,
  contactPhoneHref,
  emailMailto,
  ctaBookRevenueLeakAudit,
  ctaScheduleGeneralConsultation,
  externalBookingLinkProps,
  footerCertificationsCompact,
  pricingPagePath,
  servicesPagePath,
  siteContactBlurb,
  siteLastUpdated,
  visionPagePath,
} from '../../data/site'

const legalBasePath = import.meta.env.BASE_URL

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.12] bg-[linear-gradient(180deg,rgba(15,23,42,0.52),rgba(15,23,42,0.78))]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 text-sm text-slate-400 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        <div className="space-y-3">
          <p className="font-display text-lg font-semibold tracking-[-0.03em] text-white">
            Stone Industries
          </p>
          <p className="max-w-xl leading-6">
            AI Revenue Leak Audit, AI Customer Engine, Managed AI Ops, and BidSignal First Award Sprint—plus supporting PC, IT, and website
            packages for Fresno and the Central Valley.
          </p>
          <p className="max-w-xl text-xs leading-5 text-slate-500">{siteContactBlurb}</p>
          <p className="text-sm text-slate-400">
            <a className="font-medium text-slate-200 underline hover:text-white" href={emailMailto}>
              {contactEmail}
            </a>
            {' · '}
            <a className="font-medium text-slate-200 underline hover:text-white" href={contactPhoneHref}>
              {contactPhone}
            </a>
          </p>
          <p className="text-xs leading-5 text-slate-500">{footerCertificationsCompact}</p>
        </div>
        <div className="space-y-3 text-left lg:text-right">
          <p className="text-slate-200">Reliable Today. Autonomous Tomorrow.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 lg:justify-end">
            <a
              href={auditPagePath}
              data-cta="view-ai-revenue-leak-audit"
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {ctaBookRevenueLeakAudit}
            </a>
            <a
              href={calendlyGeneralConsultationUrl}
              {...externalBookingLinkProps}
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {ctaScheduleGeneralConsultation}
            </a>
            <a
              href={pricingPagePath}
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Pricing
            </a>
            <a
              href={servicesPagePath}
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Services
            </a>
            <a
              href={visionPagePath}
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Vision
            </a>
            <a
              href={`${legalBasePath}capability-brief.html`}
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Capability Brief
            </a>
            <a
              href={`${legalBasePath}privacy.html`}
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Privacy
            </a>
            <a
              href={`${legalBasePath}terms.html`}
              className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Terms
            </a>
          </div>
          <p className="text-xs text-slate-500">
            Last updated {siteLastUpdated}. Hosted invoice / Stripe Payment Link readiness later — no checkout on this site.
          </p>
        </div>
      </div>
    </footer>
  )
}
