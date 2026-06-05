import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { primaryOffers, primaryOffersIntro, primaryOffersSecondaryCta } from '../../data/primaryOffers'
import { auditPagePath } from '../../data/revenueLeakAudit'
import {
  calendlyFreeRemoteReviewUrl,
  ctaBookFreeRemoteReview,
  externalBookingLinkProps,
  isCalendlyBookingUrl,
} from '../../data/site'
import { trackAuditCtaClick } from '../../lib/analytics'
import { SectionHeading } from '../ui/SectionHeading'

const revealViewport = { once: true, amount: 0.1, margin: '0px 0px -56px 0px' } as const

export function PrimaryOffers() {
  return (
    <section id="primary-offers" className="relative mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionHeading
        eyebrow="Product ladder"
        title="Start free. Scale when the leaks are real."
        description={primaryOffersIntro}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {primaryOffers.map((offer, index) => {
          const Icon = offer.icon
          const isExternalBooking = isCalendlyBookingUrl(offer.href)
          const isAuditPath = offer.href === auditPagePath || offer.href.startsWith(auditPagePath)

          return (
            <motion.article
              key={offer.title}
              initial={{ opacity: 0.76, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="si-reveal-item si-section-glass flex flex-col rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/[0.04] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.14)] lg:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-200">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-300/85">
                    {index === 0 ? 'Primary CTA' : 'Offer'}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.04em] text-white">
                    {offer.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{offer.description}</p>
              <a
                href={offer.href}
                {...(isExternalBooking ? externalBookingLinkProps : {})}
                data-cta={isAuditPath ? 'view-ai-revenue-leak-audit' : undefined}
                onClick={
                  isAuditPath ? () => trackAuditCtaClick('primary_offers') : undefined
                }
                className="si-primary-cta mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 [&_svg]:!stroke-slate-950"
              >
                {offer.ctaLabel}
                <ArrowRight size={15} />
              </a>
            </motion.article>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={primaryOffersSecondaryCta.href}
          className="si-secondary-cta inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-6 py-3 text-sm font-semibold !text-cyan-50 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:!text-white"
        >
          {primaryOffersSecondaryCta.label}
          <ArrowRight size={15} />
        </a>
        <a
          href={calendlyFreeRemoteReviewUrl}
          {...externalBookingLinkProps}
          data-cta="book-free-remote-review"
          onClick={() => trackAuditCtaClick('primary_offers_calendly')}
          className="si-secondary-cta inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white"
        >
          {ctaBookFreeRemoteReview}
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  )
}
