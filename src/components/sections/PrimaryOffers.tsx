import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { primaryOffers, primaryOffersIntro } from '../../data/primaryOffers'
import {
  calendlyGeneralConsultationUrl,
  calendlyRevenueLeakAuditUrl,
  ctaContactCompany,
  ctaScheduleGeneralConsultation,
  emailMailto,
  externalBookingLinkProps,
  isCalendlyBookingUrl,
  siteContactBlurb,
} from '../../data/site'
import { trackAuditCtaClick } from '../../lib/analytics'
import { SectionHeading } from '../ui/SectionHeading'

const revealViewport = { once: true, amount: 0.1, margin: '0px 0px -56px 0px' } as const

export function PrimaryOffers() {
  return (
    <section id="primary-offers" className="relative mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionHeading
        eyebrow="Launch offers"
        title="AI systems and GovCon sprint work — live and taking inquiries."
        description={primaryOffersIntro}
      />
      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">{siteContactBlurb}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {primaryOffers.map((offer, index) => {
          const Icon = offer.icon
          const isExternalBooking = isCalendlyBookingUrl(offer.href)

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
                    Primary offer
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
                onClick={
                  offer.href === calendlyRevenueLeakAuditUrl
                    ? () => trackAuditCtaClick('primary_offers')
                    : undefined
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
          href={calendlyGeneralConsultationUrl}
          {...externalBookingLinkProps}
          className="si-secondary-cta inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-6 py-3 text-sm font-semibold !text-cyan-50 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:!text-white"
        >
          {ctaScheduleGeneralConsultation}
          <ArrowRight size={15} />
        </a>
        <a
          href={emailMailto}
          className="si-secondary-cta inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white"
        >
          {ctaContactCompany}
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  )
}
