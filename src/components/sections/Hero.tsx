import { motion } from 'framer-motion'
import { ArrowRight, FileText, Shield, Waypoints } from 'lucide-react'
import { HeroRocketAccent } from '../scene/HeroRocketAccent'
import {
  capabilityBriefPath,
  contactPhone,
  contactPhoneHref,
  ctaBookFreeRemoteReview,
  ctaFindBestFitPackage,
  calendlyFreeRemoteReviewUrl,
  externalBookingLinkProps,
  heroCertificationsMicro,
  priceFitCalculatorPath,
  serviceAreaOnSite,
  serviceAreaPrimary,
  serviceAreaRemote,
  siteContactBlurb,
} from '../../data/site'
import { positioningHeadline, positioningSubheadline, proofLedgerCopy } from '../../data/productLadder'
import { auditPagePath } from '../../data/revenueLeakAudit'
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
            California remote-first · Veteran-led
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
            {positioningHeadline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            {positioningSubheadline}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">{siteContactBlurb}</p>
          <p className="mt-5 hidden text-sm font-medium uppercase tracking-[0.32em] text-slate-400 md:block">
            Reliable Today. Autonomous Tomorrow.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            <span className="font-medium text-slate-300">Service area:</span> {serviceAreaPrimary}.{' '}
            {serviceAreaRemote}{' '}
            <span className="hidden md:inline">{serviceAreaOnSite}</span>
          </p>
          <div className="mt-6 hidden flex-wrap gap-2 md:flex">
            {[
              'Free Remote Revenue Leak Review',
              'AI Revenue Leak Audit',
              'AI Customer Engine Sprint',
              'Remote Quick Fix',
              'Managed AI Ops',
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
              href={calendlyFreeRemoteReviewUrl}
              {...externalBookingLinkProps}
              data-cta="book-free-remote-review"
              onClick={() => trackAuditCtaClick('hero')}
              className="si-primary-cta pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 [&_svg]:!stroke-slate-950"
            >
              {ctaBookFreeRemoteReview}
              <ArrowRight size={16} />
            </a>
            <a
              href={priceFitCalculatorPath}
              className="si-secondary-cta pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-6 py-3 text-sm font-semibold !text-cyan-50 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {ctaFindBestFitPackage}
              <ArrowRight size={16} />
            </a>
            <a
              href={auditPagePath}
              data-cta="view-ai-revenue-leak-audit"
              onClick={() => trackAuditCtaClick('hero_audit_details')}
              className="si-secondary-cta pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Free Review vs Paid Audit
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
            data-cta="view-ai-revenue-leak-audit"
            onClick={() => trackAuditCtaClick('hero_mobile_audit_details')}
            className="pointer-events-auto mt-3 inline-flex min-h-11 items-center text-sm font-medium text-cyan-200/90 underline-offset-4 hover:text-cyan-100 hover:underline md:hidden"
          >
            See review vs audit details ↓
          </a>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            <span className="hidden md:inline">
              Book on Calendly or use the inquiry form for async review. No online checkout on this site.{' '}
            </span>
            {proofLedgerCopy}{' '}
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
              ['Available today', 'Free remote revenue leak review, paid audit, sprints, remote tech sessions, and Managed AI Ops — plus Central Valley on-site for hardware when quoted.'],
              ['Who we serve', 'California small businesses, home offices, and operators who need practical remote systems help.'],
              ['How we measure', 'Before/after signals over 30 days — calls, forms, bookings, follow-up. No revenue guarantees.'],
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
