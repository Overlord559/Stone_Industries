import { motion } from 'framer-motion'
import { ArrowRight, Shield, Waypoints } from 'lucide-react'
import { lazy, Suspense } from 'react'

const HeroScene = lazy(async () => import('../scene/HeroScene'))

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.14),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.12),_transparent_24%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.92))]" />
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-20 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 flex flex-col justify-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.45em] text-slate-500">
            Stone Industries
          </p>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-100">
            <Shield size={14} />
            Operational support. Disciplined execution.
          </div>
          <h1 className="mt-7 max-w-4xl font-display text-6xl font-semibold tracking-[-0.065em] text-white sm:text-7xl lg:text-[5.5rem] lg:leading-[0.93]">
            Reliable operational support now, with a disciplined path toward autonomous capability.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Stone Industries provides practical IT support, web development,
            and logistics coordination for clients who need responsive delivery,
            clear communication, and work that holds up in real operating
            conditions, while building toward advanced autonomous systems over time.
          </p>
          <p className="mt-5 text-sm font-medium uppercase tracking-[0.32em] text-slate-400">
            Reliable Today. Autonomous Tomorrow.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Request Capability Brief
              <ArrowRight size={16} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Service Lines
              <Waypoints size={16} />
            </a>
          </div>
          <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              ['Current focus', 'Support, delivery, and coordination work clients need executed reliably today.'],
              ['Operating style', 'Direct communication, accountable follow-through, and practical execution over theory.'],
              ['Long-term direction', 'DALRM, AI-assisted operations, autonomous logistics, and resilient infrastructure.'],
            ].map(([title, copy]) => (
              <div key={title}>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                  {title}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="pointer-events-none absolute right-5 top-5 z-10 max-w-xs rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 backdrop-blur sm:right-6 sm:top-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-cyan-300/80">
              Operating posture
            </p>
            <p className="mt-3 text-sm font-medium text-white">
              Support environments demand responsiveness, documentation, and dependable delivery.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Stone Industries is positioned for practical service work now and disciplined capability building over time.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="relative h-[340px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18),_rgba(2,6,23,0)_58%)] shadow-[0_30px_100px_rgba(2,6,23,0.55)] sm:h-[460px]" />
            }
          >
            <HeroScene />
          </Suspense>
        </motion.div>
      </div>
    </section>
  )
}
