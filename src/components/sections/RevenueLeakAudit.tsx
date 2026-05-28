import {
  auditOfferCopy,
  auditPositioningCopy,
  revenueLeakAuditSectionId,
  secondShiftPackages,
} from '../../data/revenueLeakAudit'
import { RevenueLeakAuditForm } from '../RevenueLeakAuditForm'
import { SectionHeading } from '../ui/SectionHeading'

function AuditDeliverablesContent() {
  return (
    <>
      <div className="si-section-glass rounded-[1.75rem] border border-white/[0.14] p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">
          What you receive
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
          <li className="flex gap-2">
            <span className="text-cyan-300/80">•</span>
            <span>Scores for website, CTA, Google Business Profile, reviews, follow-up, and offer clarity</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-300/80">•</span>
            <span>Top revenue leaks with a practical fix plan</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-300/80">•</span>
            <span>Recommended package — Starter, Growth, or Operator — based on your situation</span>
          </li>
        </ul>
        <p className="mt-4 text-xs leading-5 text-slate-400">
          Human-reviewed managed service. Drafts go through an approval queue — not fully autonomous
          software. No revenue guarantees.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">
          Recommended packages after your audit
        </p>
        <div className="grid gap-4">
          {secondShiftPackages.map((pkg) => (
            <article
              key={pkg.name}
              className="si-section-glass rounded-2xl border border-white/[0.14] p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-white">{pkg.name}</h3>
                <p className="text-sm font-medium text-cyan-200/90">
                  {pkg.setup} setup + {pkg.monthly}
                </p>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm leading-6 text-slate-300">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-cyan-300/80">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export function RevenueLeakAudit() {
  return (
    <section id={revenueLeakAuditSectionId} className="relative border-t border-white/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="space-y-8 lg:col-start-1 lg:row-start-1">
            <SectionHeading
              eyebrow="SecondShift AI"
              title="Free Revenue Leak Audit"
              description={auditOfferCopy}
            />

            <div className="hidden lg:block space-y-8">
              <p className="text-sm leading-7 text-slate-300">{auditPositioningCopy}</p>
              <AuditDeliverablesContent />
            </div>
          </div>

          <div className="self-start lg:col-start-2 lg:row-start-1">
            <RevenueLeakAuditForm sourcePage="/#revenue-leak-audit" />
          </div>

          <div className="space-y-4 lg:hidden">
            <p className="text-sm leading-7 text-slate-300">{auditPositioningCopy}</p>
            <details className="si-section-glass rounded-[1.75rem] border border-white/[0.14] p-5 sm:p-6">
              <summary className="cursor-pointer text-sm font-semibold text-white">
                What you receive &amp; recommended packages
              </summary>
              <div className="mt-5 space-y-6">
                <AuditDeliverablesContent />
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  )
}
