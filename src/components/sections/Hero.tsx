import { motion } from 'framer-motion'
import { ArrowRight, FileText, Shield, Waypoints } from 'lucide-react'
import { HeroRocketAccent } from '../scene/HeroRocketAccent'
import {
  capabilityBriefPath,
  contactPhone,
  contactPhoneHref,
  heroCertificationsMicro,
  pricingPagePath,
  serviceAreaOnSite,
  serviceAreaPrimary,
} from '../../data/site'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.07),_transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,0.68))]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0.82, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="si-hero-copy si-reveal-item relative z-10 flex flex-col justify-center pointer-events-none"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-100">
            <Shield size={14} />
            Veteran-led. Practical services. Disciplined execution.
          </div>
          <div
            className="si-hero-cert-micro mt-2.5 max-w-2xl"
            role="note"
            aria-label="Business certifications"
          >
            <p className="text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.2em] text-cyan-300/80 sm:text-[0.65rem] sm:tracking-[0.24em]">
              {heroCertificationsMicro}
            </p>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold tracking-[-0.065em] text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]">
            Custom PC builds, Tier 1 IT support, and practical local technology services—delivered reliably today.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            We help Fresno and Central Valley small businesses with custom Windows PC builds,
            Tier 1 IT cleanup, Wi-Fi and POS support, business websites, AI receptionist workflows, and mobile
            MVP prototypes—plus narrow operations coordination when a project needs structure.
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
              'Custom PC builds & upgrades',
              'Tier 1 IT support',
              'Wi-Fi & POS support',
              'Websites & 3D sections',
              'AI receptionist workflows',
              'Mobile MVP prototypes',
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
              href={pricingPagePath}
              className="si-primary-cta pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 [&_svg]:!stroke-slate-950"
            >
              View Pricing &amp; Packages
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="si-secondary-cta pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-6 py-3 text-sm font-semibold !text-cyan-50 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Send an inquiry
              <ArrowRight size={16} />
            </a>
            <a
              href={capabilityBriefPath}
              className="si-secondary-cta pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white [&_svg]:!stroke-white"
            >
              View Capability Brief
              <FileText size={16} />
            </a>
            <a
              href="#services"
              className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full px-2 py-3 text-sm font-medium !text-slate-300 transition hover:!text-white sm:px-4"
            >
              View Service Lines
              <Waypoints size={16} className="stroke-current" />
            </a>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            Browse starting packages and scope on the pricing pages, then submit an inquiry for a
            confirmed quote. Capability brief available for subcontracting outreach. No booking
            system on this site. Prefer phone?{' '}
            <a
              className="pointer-events-auto font-medium text-slate-300 underline hover:text-white"
              href={contactPhoneHref}
            >
              {contactPhone}
            </a>
            .
          </p>

          <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              ['Available today', 'Custom PC builds, Tier 1 IT, websites, Wi-Fi/POS, AI receptionist workflows, and mobile MVP prototypes for operators who need practical help now.'],
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
      </div>

      <div className="si-hero-rocket-mount hidden lg:block" aria-hidden="false">
        <HeroRocketAccent />
      </div>
    </section>
  )
}
