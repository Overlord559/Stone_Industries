import { ArrowRight } from 'lucide-react'

import {
  auditPagePath,
  auditTeaserCopy,
  auditTeaserHeadline,
  auditTeaserTitle,
  revenueLeakAuditSectionId,
} from '../../data/revenueLeakAudit'
import {
  calendlyRevenueLeakAuditUrl,
  externalBookingLinkProps,
} from '../../data/site'
import { trackAuditCtaClick } from '../../lib/analytics'
import { SectionHeading } from '../ui/SectionHeading'

export function RevenueLeakAuditTeaser() {
  return (
    <section id={revenueLeakAuditSectionId} className="relative border-t border-white/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="si-section-glass rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/[0.04] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow={auditTeaserTitle}
              title={auditTeaserHeadline}
              description={auditTeaserCopy}
            />
          </div>

          <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col xl:flex-row">
            <a
              href={auditPagePath}
              data-cta="see-audit-details"
              className="si-primary-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 [&_svg]:!stroke-slate-950"
            >
              See Audit Details
              <ArrowRight size={16} />
            </a>
            <a
              href={calendlyRevenueLeakAuditUrl}
              {...externalBookingLinkProps}
              data-cta="book-ai-revenue-leak-audit"
              onClick={() => trackAuditCtaClick('homepage_teaser')}
              className="si-secondary-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-6 py-3 text-sm font-semibold !text-cyan-50 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:!text-white"
            >
              Book Audit Call
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
