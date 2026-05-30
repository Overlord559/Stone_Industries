import { motion } from 'framer-motion'
import { credibilitySignals, siteContactBlurb, trustChips, whoWeWorkWith } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'
import { TrustCertificationsStrip } from '../ui/TrustCertificationsStrip'

const revealViewport = { once: true, amount: 0.1, margin: '0px 0px -56px 0px' } as const

export function About() {
  return (
    <section
      id="about"
      className="relative border-y border-white/[0.12] py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(6,182,212,0.06),rgba(6,182,212,0))]" />
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="About"
            title="Grounded, veteran-led, and built to earn trust through execution."
            description="Stone Industries is a veteran-led LLC focused on AI revenue systems, customer-engine sprints, and GovCon bid-path discipline—plus supporting local tech packages when scoped."
          />
          <p className="max-w-2xl text-sm leading-6 text-slate-400">{siteContactBlurb}</p>
          <div className="flex flex-wrap gap-2">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100"
              >
                {chip}
              </span>
            ))}
          </div>
          <TrustCertificationsStrip variant="section" />
          <div className="si-section-glass rounded-[1.75rem] border border-white/[0.14] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
              Who we work with
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {whoWeWorkWith.map((item) => (
                <div key={item.title} className="space-y-2">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              Stone Industries supports direct small-business jobs, one-off cleanup work,
              quote-based project inquiries, and subcontracting support conversations—without
              implying current major enterprise clients or government contract wins.
            </p>
          </div>
          <div className="si-section-glass rounded-[1.75rem] border border-white/[0.14] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
              Company standard
            </p>
            <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white">
              Reliable Today. Autonomous Tomorrow.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              That standard reflects how we operate: deliver useful support work now,
              serve local businesses and subcontracting partners honestly, and expand
              capability responsibly over time.
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          {credibilitySignals.map((signal, index) => {
            const Icon = signal.icon

            return (
              <motion.article
                key={signal.title}
                initial={{ opacity: 0.76, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="si-reveal-item si-section-glass rounded-[1.5rem] border border-white/[0.14] p-7"
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
