import { motion } from 'framer-motion'
import { ArrowRight, FileText, Shield, Waypoints } from 'lucide-react'
import { HeroRocketAccent } from '../scene/HeroRocketAccent'
import {
  buildMailto,
  calendlyRevenueLeakAuditUrl,
  capabilityBriefPath,
  contactPhone,
  contactPhoneHref,
  ctaBookRevenueLeakAudit,
  ctaContactCompany,
  ctaRequestCustomerEngineSprint,
  externalBookingLinkProps,
  gmailComposeUrl,
  heroCertificationsMicro,
  serviceAreaOnSite,
  serviceAreaPrimary,
  siteContactBlurb,
} from '../../data/site'
import {
  auditPagePath,
} from '../../data/revenueLeakAudit'
import { trackAuditCtaClick, trackServicesCtaClick } from '../../lib/analytics'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.07),_transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,0.68))]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-14 md:py-20 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0.82, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="si-hero-copy si-reveal-item relative z-10 flex flex-col justify-center pointer-events-none"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-100">
            <Shield size={14} />
            Veteran-led. Practical services. Disciplined execution.
          </div>
          <div
            className="si-hero-cert-micro mt-2.5 max-w-2xl"
            role="note"
            aria-label="Business certifications"
          >
            <p className="text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.2em] text-cyan-300/80 sm:text-[0.65rem] sm:tracking-[0.24em]">
              {heroCertificationsMicro}
            </p>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold tracking-[-0.065em] text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]">
            AI revenue and customer systems for Fresno operators—plus disciplined local tech support when scoped.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Primary work: AI Revenue Leak Audit, AI Customer Engine sprints, Managed AI Ops, and BidSignal First
            Award Sprint for GovCon teams. PC builds, Tier 1 IT, websites, and Wi-Fi/POS remain supporting
            services.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">{siteContactBlurb}</p>
          <p className="mt-5 hidden text-sm font-medium uppercase tracking-[0.32em] text-slate-400 md:block">
            Reliable Today. Autonomous Tomorrow.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            <span className="font-medium text-slate-300">Service area:</span> {serviceAreaPrimary}.{' '}
            <span className="hidden md:inline">{serviceAreaOnSite}</span>
          </p>
          <div className="mt-6 hidden flex-wrap gap-2 md:flex">
            {[
              'AI Revenue Leak Audit',
              'AI Customer Engine',
              'Managed AI Ops',
              'BidSignal First Award Sprint',
              'Tier 1 IT & websites (supporting)',
            ].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 md:mt-10 md:gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={calendlyRevenueLeakAuditUrl}
              {...externalBookingLinkProps}
              onClick={() => trackAuditCtaClick('hero')}
              className="si-primary-cta pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 [&_svg]:!stroke-slate-950"
            >
              {ctaBookRevenueLeakAudit}
              <ArrowRight size={16} />
            </a>
            <a
              href={buildMailto('AI Customer Engine Sprint Request — Stone Industries')}
              className="si-secondary-cta pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-6 py-3 text-sm font-semibold !text-cyan-50 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {ctaRequestCustomerEngineSprint}
              <ArrowRight size={16} />
            </a>
            <a
              href={gmailComposeUrl}
              {...externalBookingLinkProps}
              className="si-secondary-cta pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {ctaContactCompany}
              <ArrowRight size={16} />
            </a>
            <a
              href={capabilityBriefPath}
              className="si-secondary-cta pointer-events-auto hidden min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white md:inline-flex [&_svg]:!stroke-white"
            >
              View Capability Brief
              <FileText size={16} />
            </a>
            <a
              href="#services"
              onClick={() => trackServicesCtaClick('hero')}
              className="pointer-events-auto hidden min-h-11 items-center justify-center gap-2 rounded-full px-2 py-3 text-sm font-medium !text-slate-300 transition hover:!text-white sm:px-4 md:inline-flex"
            >
              View Service Lines
              <Waypoints size={16} className="stroke-current" />
            </a>
          </div>
          <a
            href={auditPagePath}
            className="pointer-events-auto mt-3 inline-flex min-h-11 items-center text-sm font-medium text-cyan-200/90 underline-offset-4 hover:text-cyan-100 hover:underline md:hidden"
          >
            See audit details ↓
          </a>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            <span className="hidden md:inline">
              Book audit calls on Calendly, or submit the audit form below for async review. Browse
              starting packages on pricing pages, then use the inquiry form for a confirmed quote.
              Capability brief available for subcontracting outreach. No online checkout on this site.{' '}
            </span>
            Prefer phone?{' '}
            <a
              className="pointer-events-auto font-medium text-slate-300 underline hover:text-white"
              href={contactPhoneHref}
            >
              {contactPhone}
            </a>
            .
          </p>

          <div className="mt-12 hidden gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 md:grid">
            {[
              ['Available today', 'AI Revenue Leak Audit, AI Customer Engine sprints, Managed AI Ops, and BidSignal First Award Sprint — with supporting PC, IT, website, and Wi-Fi/POS packages when scoped.'],
              ['Who we serve', 'Local small businesses, home offices, and partners evaluating subcontracting or scoped operational support.'],
              ['Future roadmap', 'DALRM, AI-assisted operations, and autonomous logistics—long-range direction, not current products.'],
            ].map(([title, copy]) => (
              <div key={title}>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                  {title}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="si-hero-rocket-mount hidden lg:block" aria-hidden="false">
        <HeroRocketAccent />
      </div>
    </section>
  )
}
