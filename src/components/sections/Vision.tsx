import { motion } from 'framer-motion'
import { futureVision } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

export function Vision() {
  return (
    <section id="vision" className="relative mx-auto w-full max-w-7xl px-6 py-22 lg:px-10">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:inset-x-10" />
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Future Vision"
          title="A future roadmap built on practical service delivery today."
          description="Stone Industries is focused today on support, delivery, and coordination work. The longer-range roadmap includes DALRM, AI-assisted operations, autonomous logistics, and resilient infrastructure systems, but those are future-direction efforts rather than current offerings."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {futureVision.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(34,211,238,0.06),rgba(34,211,238,0.03))] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-slate-950/70 text-cyan-200">
                  <Icon size={20} />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
