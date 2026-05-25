import { motion } from 'framer-motion'
import { futureVision } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

const revealViewport = { once: true, amount: 0.1, margin: '0px 0px -56px 0px' } as const

export function Vision() {
  return (
    <section
      id="vision"
      className="si-vision-shell relative overflow-hidden border-y border-white/[0.12] bg-[linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.03))] py-20"
    >
      <div className="pointer-events-none absolute inset-0 si-vision-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 si-vision-glow" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Future Vision"
          title="Long-range roadmap—not what Stone Industries sells today."
          description="These are future-direction research areas. They are not deployed products, certifications, or current contract offerings."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {futureVision.map((item, index) => {
            const Icon = item.icon

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
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
                    <Icon size={20} />
                  </div>
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
