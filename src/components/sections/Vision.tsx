import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { futureVision, visionDirections, visionPagePath } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'
import { VisionObjectLink } from '../ui/VisionObjectLink'

const revealViewport = { once: true, amount: 0.1, margin: '0px 0px -56px 0px' } as const

export function Vision() {
  return (
    <section
      id="vision"
      className="si-vision-shell relative overflow-hidden border-y border-white/[0.12] bg-[linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.03))] py-12 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 si-vision-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 si-vision-glow" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:hidden">
        <div className="si-section-glass rounded-[1.75rem] border border-white/[0.14] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.14)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
            Future Vision
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.05em] text-white">
            Long-range roadmap — not sold today
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            DALRM, AI-assisted operations, and autonomous logistics are documented separately. They are
            future-direction research areas — not current products or contract offerings.
          </p>
          <a
            href={`${visionPagePath}#local-first`}
            className="si-secondary-cta mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold !text-cyan-50 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Explore future roadmap
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <div className="relative mx-auto hidden w-full max-w-7xl px-6 md:block lg:px-10">
        <SectionHeading
          eyebrow="Future Vision"
          title="Long-range roadmap—not what Stone Industries sells today."
          description="These are future-direction research areas. They are not deployed products, certifications, or current contract offerings."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visionDirections.map((item, index) => (
            <motion.div
              key={item.anchor}
              initial={{ opacity: 0.76, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="si-reveal-item flex flex-col gap-3"
            >
              <VisionObjectLink anchor={item.anchor} title={item.title} icon={item.icon} />
              <div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.summary}</p>
                <a
                  href={`${visionPagePath}#${item.anchor}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200/90 transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Read on vision page
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {futureVision.map((item, index) => {
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0.76, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="si-reveal-item si-vision-card group relative overflow-hidden rounded-[1.5rem] border border-cyan-400/20 bg-[linear-gradient(145deg,rgba(8,47,73,0.28),rgba(15,23,42,0.62))] p-6 shadow-[0_20px_70px_rgba(15,23,42,0.28)] backdrop-blur-sm"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent opacity-80" />
                <div className="flex items-start justify-between gap-4">
                  <VisionObjectLink
                    anchor={item.visionAnchor}
                    title={item.title}
                    icon={item.icon}
                  />
                  <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    Future roadmap
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-prose text-base leading-7 text-slate-300">
                  {item.description}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {item.status}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
