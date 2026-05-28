import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buildPricingServiceHref, recurringCarePaths, services } from '../../data/site'
import { revenueLeakAuditSectionId } from '../../data/revenueLeakAudit'
import { trackAuditCtaClick, trackPricingCtaClick } from '../../lib/analytics'
import { navigateToContactInquiry } from '../../lib/inquiryNavigation'
import { InteractiveOrbAccent } from '../scene/InteractiveOrbAccent'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceObjectLink } from '../ui/ServiceObjectLink'

const revealViewport = { once: true, amount: 0.1, margin: '0px 0px -56px 0px' } as const

export function Services() {
  return (
    <section id="services" className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent lg:inset-x-10" />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <SectionHeading
          eyebrow="Current Services"
          title="Fixed packages — faster to buy than a full agency, MSP, or 3PL contract."
          description="Revenue-first local services with clear scope and starting prices. Not a full marketing agency, managed IT provider, AI agency, app studio, or freight broker."
        />
        <div className="hidden shrink-0 self-start lg:block">
          <InteractiveOrbAccent
            variant="services"
            label="Interactive service network visual for package links"
          />
        </div>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {services.map((service, index) => {
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0.76, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="si-reveal-item si-section-glass si-card-tilt group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.14] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.22)] lg:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent opacity-70" />
              <span className="inline-flex w-fit rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cyan-200">
                {service.displayTier === 'secondary' ? 'Secondary capability' : 'Current service'}
              </span>
              <div className="mt-5">
                <ServiceObjectLink slug={service.slug} title={service.title} icon={service.icon} />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                {service.packageName}
              </p>
              <h3 className="mt-2 font-display text-[1.7rem] font-semibold tracking-[-0.05em] text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-300">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-300">
                {service.scope.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-cyan-300/80">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 h-px w-full bg-gradient-to-r from-white/12 via-white/6 to-transparent" />
              <p className="mt-5 text-sm font-medium text-slate-400">{service.tag}</p>
              <p className="mt-2 text-sm font-semibold text-cyan-200/90">{service.startingAtLabel}</p>
              <p className="mt-2 text-sm text-slate-500">{service.pricingNote}</p>
              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:flex-wrap">
                <a
                  href={buildPricingServiceHref(service.slug)}
                  onClick={() => trackPricingCtaClick('service_card')}
                  className="si-primary-cta inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 [&_svg]:!stroke-slate-950"
                >
                  {service.pricingPageLabel}
                  <ArrowRight size={15} />
                </a>
                <a
                  href="#contact"
                  className="si-secondary-cta inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 [&_svg]:!stroke-white"
                  onClick={(event) => {
                    event.preventDefault()
                    navigateToContactInquiry(service.slug)
                  }}
                >
                  {service.inquiryLabel}
                </a>
              </div>
            </motion.article>
          )
        })}
      </div>

      <div
        id="recurring-care"
        className="si-section-glass mt-14 rounded-[1.75rem] border border-white/[0.14] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.14)] lg:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
          Optional recurring care
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          After a one-time package — scoped monthly support, not a full MSP or agency contract.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {recurringCarePaths.map((path) => (
            <li key={path.name}>
              <a
                href={path.pricingHref}
                className="group block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/25 hover:bg-cyan-400/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-cyan-100">
                  {path.name}
                  <ArrowRight size={14} className="opacity-70" />
                </span>
                <span className="mt-1.5 block text-sm leading-6 text-slate-400">{path.detail}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="si-section-glass mt-10 rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/[0.06] p-5 sm:p-6">
        <p className="text-sm font-semibold text-white">Free Revenue Leak Audit for local service businesses</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          Send us your website and Google Business Profile — our team sends a human-reviewed leak report and
          recommended fix plan for Fresno and Central Valley service businesses.
        </p>
        <a
          href={`#${revenueLeakAuditSectionId}`}
          onClick={() => trackAuditCtaClick('services_promo')}
          className="si-secondary-cta mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold !text-cyan-50 transition hover:border-cyan-300/50 hover:bg-cyan-400/15 hover:!text-white"
        >
          Get Free Revenue Leak Audit
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  )
}
