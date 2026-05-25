import { motion } from 'framer-motion'
import { ArrowRight, FileText, Shield, Waypoints } from 'lucide-react'
import { buildMailto, capabilityBriefPath, serviceAreaOnSite, serviceAreaPrimary } from '../../data/site'

const serviceInquiryMailto = buildMailto('Service Inquiry — Stone Industries')

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.08),_transparent_32%),radial-gradient(ellipse_52%_44%_at_78%_34%,_rgba(6,182,212,0.07),_transparent_62%)]" />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(52%,32rem)] bg-[radial-gradient(ellipse_at_72%_36%,rgba(2,6,23,0.04),transparent_72%)] lg:block"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,0.68))]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0.82, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="si-reveal-item relative z-10 flex flex-col justify-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.45em] text-slate-500">
            Stone Industries
          </p>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-100">
            <Shield size={14} />
            Veteran-led. Practical services. Disciplined execution.
          </div>
          <h1 className="mt-7 max-w-4xl font-display text-4xl font-semibold tracking-[-0.065em] text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]">
            Veteran-led IT support, web development, and logistics coordination—delivered reliably today.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Stone Industries helps local businesses, home offices, and subcontracting
            partners with same-day tech cleanup, fast business websites, Wi-Fi and POS
            support, and logistics coordination—while building toward autonomous
            infrastructure responsibly over time.
          </p>
          <p className="mt-5 text-sm font-medium uppercase tracking-[0.32em] text-slate-400">
            Reliable Today. Autonomous Tomorrow.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            <span className="font-medium text-slate-300">Service area:</span> {serviceAreaPrimary}.{' '}
            {serviceAreaOnSite}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              'Same-day tech cleanup',
              '24-hour business websites',
              'Wi-Fi & POS support',
              'AI workflow automation',
              'Logistics coordination',
            ].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={serviceInquiryMailto}
              className="si-primary-cta inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 [&_svg]:!stroke-slate-950"
            >
              Start Service Inquiry
              <ArrowRight size={16} />
            </a>
            <a
              href={capabilityBriefPath}
              className="si-secondary-cta inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white [&_svg]:!stroke-white"
            >
              View Capability Brief
              <FileText size={16} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full px-2 py-3 text-sm font-medium !text-slate-300 transition hover:!text-white sm:px-4"
            >
              View Service Lines
              <Waypoints size={16} className="stroke-current" />
            </a>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            Email to start a quote-based service inquiry, or read the static capability
            brief for subcontracting outreach. No booking system on this site.
          </p>

          <div className="mt-5 max-w-2xl rounded-xl border border-cyan-400/20 bg-slate-900/28 px-4 py-3 backdrop-blur-sm si-section-glass">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-cyan-300/75">
              Operating posture
            </p>
            <p className="mt-1.5 text-sm leading-6 text-slate-300">
              Practical support for businesses and partners who need responsive delivery today.
              Same-day tech help, fast websites, Wi-Fi and POS cleanup, and logistics coordination—with a disciplined long-range roadmap, not hype.
            </p>
          </div>

          <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              ['Available today', 'Tech cleanup, business websites, Wi-Fi and POS support, and logistics coordination for operators who need practical help now.'],
              ['Who we serve', 'Local small businesses, home offices, and partners evaluating subcontracting or scoped operational support.'],
              ['Future roadmap', 'DALRM, AI-assisted operations, and autonomous logistics—long-range direction, not current products.'],
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

        <div className="pointer-events-none relative hidden min-h-[32rem] lg:block" aria-hidden="true" />
      </div>
    </section>
  )
}
