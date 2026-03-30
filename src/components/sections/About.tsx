import { motion } from 'framer-motion'
import { credibilitySignals } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section
      id="about"
      className="relative border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] py-22"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(6,182,212,0.06),rgba(6,182,212,0))]" />
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="About"
            title="Grounded, disciplined, and built to earn trust through execution."
            description="Stone Industries is an early-stage company with an operator-minded posture: practical work, consistent follow-through, and a long-range commitment to building credible capability rather than selling vision ahead of delivery."
          />
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
              Company standard
            </p>
            <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white">
              Reliable Today. Autonomous Tomorrow.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              That standard reflects how we intend to operate: deliver useful support work now, build trust through consistency, and expand capability responsibly over time.
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          {credibilitySignals.map((signal, index) => {
            const Icon = signal.icon

            return (
              <motion.article
                key={signal.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-7"
              >
                <div className="flex items-start gap-5">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-cyan-200">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-white">
                      {signal.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-300">
                      {signal.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
