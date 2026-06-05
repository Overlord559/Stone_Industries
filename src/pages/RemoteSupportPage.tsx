import { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

import { SectionHeading } from '../components/ui/SectionHeading'
import { productLadder } from '../data/productLadder'
import {
  onSiteServices,
  onSiteServiceAreas,
  remoteFirstSummary,
  remoteServiceAreas,
  remoteSupportSafetyRules,
} from '../data/serviceAreas'
import {
  calendlyFreeRemoteReviewUrl,
  ctaBookFreeRemoteReview,
  externalBookingLinkProps,
  pricingPagePath,
} from '../data/site'
import { trackAuditCtaClick, trackPageView } from '../lib/analytics'

const PAGE_TITLE = 'Remote Support | Stone Industries California'
const PAGE_DESCRIPTION =
  'Remote Quick Fix and Business Tech Sessions across California. Central Valley on-site for hardware, POS, and networking by custom quote.'

const remoteTiers = productLadder.filter((t) =>
  ['remote_quick_fix', 'remote_business_tech'].includes(t.id),
)

export function RemoteSupportPage() {
  useEffect(() => {
    document.title = PAGE_TITLE
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', PAGE_DESCRIPTION)
    trackPageView()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div data-page="remote-support" className="relative isolate">
      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Remote support"
            title="California Remote Business Tech Support"
            description={remoteFirstSummary}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={calendlyFreeRemoteReviewUrl}
              {...externalBookingLinkProps}
              onClick={() => trackAuditCtaClick('remote_support_hero')}
              className="si-primary-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200"
            >
              {ctaBookFreeRemoteReview}
              <ArrowRight size={16} />
            </a>
            <a
              href={pricingPagePath}
              className="si-secondary-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10"
            >
              See package ranges
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-2">
            {remoteTiers.map((tier) => (
              <article
                key={tier.id}
                className="si-section-glass rounded-[1.75rem] border border-white/[0.14] p-6 sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/85">
                  {tier.delivery}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white">{tier.name}</h2>
                <p className="mt-2 text-lg font-medium text-cyan-200/90">{tier.price}</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-cyan-300/80">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Safety rules"
            title="How Remote Sessions Work"
            description="We keep remote support safe and scope-bounded."
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {remoteSupportSafetyRules.map((rule) => (
              <li
                key={rule}
                className="si-section-glass rounded-2xl border border-white/[0.14] px-5 py-4 text-sm leading-6 text-slate-300"
              >
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Service area"
                title="Remote Across California"
                description="Default delivery is remote. We serve businesses statewide."
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {remoteServiceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="On-site exception"
                title="Central Valley Hardware Only"
                description="Physical work requires on-site visit — custom quote by appointment."
              />
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                {onSiteServiceAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
                {onSiteServices.map((svc) => (
                  <li key={svc} className="flex gap-2">
                    <span className="text-cyan-300/80">•</span>
                    <span>{svc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
