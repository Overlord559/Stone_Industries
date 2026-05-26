import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buildMailto, services } from '../../data/site'
import { InteractiveOrbAccent } from '../scene/InteractiveOrbAccent'
import { SectionHeading } from '../ui/SectionHeading'

const revealViewport = { once: true, amount: 0.1, margin: '0px 0px -56px 0px' } as const

export function Services() {
  return (
    <section id="services" className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent lg:inset-x-10" />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <SectionHeading
          eyebrow="Current Services"
          title="Fixed packages — faster to buy than a full agency, MSP, or 3PL contract."
          description="Current offerings with clear scope and starting prices. Not a full marketing agency, managed IT provider, AI agency, or freight broker — practical fixed-scope work for Fresno and Central Valley small businesses."
        />
        <div className="hidden shrink-0 self-start lg:block">
          <InteractiveOrbAccent
            variant="services"
            label="Interactive logistics network visual for service packages"
          />
        </div>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon

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
                Current service
              </span>
              <div className="mt-5 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 shadow-[0_12px_32px_rgba(8,145,178,0.16)]">
                <Icon size={22} />
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
                  href={service.detailPagePath}
                  className="si-primary-cta inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 [&_svg]:!stroke-slate-950"
                >
                  {service.pricingPageLabel}
                  <ArrowRight size={15} />
                </a>
                <a
                  href={buildMailto(service.inquirySubject)}
                  className="si-secondary-cta inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 [&_svg]:!stroke-white"
                >
                  {service.inquiryLabel}
                </a>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
