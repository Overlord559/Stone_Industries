import { motion } from 'framer-motion'
import { services } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

export function Services() {
  return (
    <section id="services" className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:inset-x-10" />
      <SectionHeading
        eyebrow="Current Services"
        title="Practical service lines you can contact Stone Industries for today."
        description="These are current offerings—not roadmap concepts. Each line is scoped for dependable delivery, clear communication, and work that holds up in real operating conditions."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon

          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)] transition hover:-translate-y-1 hover:border-cyan-400/28 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent opacity-70" />
              <div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 shadow-[0_12px_32px_rgba(8,145,178,0.16)]">
                <Icon size={22} />
              </div>
              <h3 className="mt-8 font-display text-[1.7rem] font-semibold tracking-[-0.05em] text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-300">
                {service.description}
              </p>
              <div className="mt-8 h-px w-full bg-gradient-to-r from-white/12 via-white/6 to-transparent" />
              <p className="mt-5 text-sm font-medium text-slate-400">
                {service.tag}
              </p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
