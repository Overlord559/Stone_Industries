import { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

import { RevenueLeakAuditForm } from '../components/RevenueLeakAuditForm'
import { SectionHeading } from '../components/ui/SectionHeading'
import {
  afterAuditIntro,
  afterAuditOptions,
  auditAudienceSegments,
  auditChecklistItems,
  auditChecklistSectionId,
  auditDeliverables,
  auditFormSectionId,
  auditHeroHeadline,
  auditHeroSubheadline,
  auditHeroTrustLine,
  auditOfferCopy,
  auditOfferTitle,
  auditProcessSteps,
  auditTrustBoundaries,
} from '../data/revenueLeakAudit'
import {
  calendlyRevenueLeakAuditUrl,
  externalBookingLinkProps,
  serviceAreaPrimary,
} from '../data/site'
import { trackAuditCtaClick, trackPageView } from '../lib/analytics'

const PAGE_TITLE = 'AI Revenue Leak Audit Fresno | Stone Industries LLC'
const PAGE_DESCRIPTION =
  'Stone Industries helps Fresno and Central Valley businesses find lost leads from weak website flow, missed calls, poor booking, and slow follow-up.'

const auditSourcePage = '/ai-revenue-leak-audit'

function scrollToChecklist() {
  document.getElementById(auditChecklistSectionId)?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToForm() {
  document.getElementById(auditFormSectionId)?.scrollIntoView({ behavior: 'smooth' })
}

export function AiRevenueLeakAuditPage() {
  useEffect(() => {
    document.title = PAGE_TITLE

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', PAGE_DESCRIPTION)
    }

    trackPageView()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div data-page="ai-revenue-leak-audit" className="relative isolate">
      {/* Hero */}
      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(6,182,212,0.08),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="max-w-3xl space-y-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-cyan-300/85">
              AI Revenue Leak Audit
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
              {auditHeroHeadline}
            </h1>
            <p className="text-lg leading-8 text-slate-300 sm:text-xl">{auditHeroSubheadline}</p>
            <p className="text-sm leading-6 text-slate-400">{auditHeroTrustLine}</p>
            <p className="text-sm text-slate-500">{serviceAreaPrimary}</p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <a
                href={calendlyRevenueLeakAuditUrl}
                {...externalBookingLinkProps}
                data-cta="book-ai-revenue-leak-audit"
                onClick={() => trackAuditCtaClick('audit_landing_hero')}
                className="si-primary-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 [&_svg]:!stroke-slate-950"
              >
                Book AI Revenue Leak Audit Call
                <ArrowRight size={16} />
              </a>
              <button
                type="button"
                onClick={scrollToChecklist}
                className="si-secondary-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white"
              >
                See What We Check
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main offer + checklist */}
      <section
        id={auditChecklistSectionId}
        className="relative border-b border-white/10 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeading
                eyebrow="The offer"
                title={auditOfferTitle}
                description={auditOfferCopy}
              />
            </div>
            <div className="si-section-glass rounded-[1.75rem] border border-white/[0.14] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">
                What we check
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                {auditChecklistItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-cyan-300/80">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What you receive */}
      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Deliverables"
            title="What You Receive"
            description="A practical report you can act on — not generic marketing advice."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {auditDeliverables.map((item) => (
              <li
                key={item}
                className="si-section-glass rounded-2xl border border-white/[0.14] px-5 py-4 text-sm leading-6 text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it is for */}
      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Audience"
            title="Built for Local Service Businesses"
            description="If customers find you online, call, or book — this audit is built for your type of operation."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {auditAudienceSegments.map((segment) => (
              <article
                key={segment}
                className="si-section-glass rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.03] px-4 py-4 text-sm font-medium text-slate-200"
              >
                {segment}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Process"
            title="How the Audit Works"
            description="Clear steps from first contact to your fix plan."
          />
          <ol className="mt-8 space-y-4">
            {auditProcessSteps.map((step, index) => (
              <li
                key={step}
                className="si-section-glass flex gap-4 rounded-2xl border border-white/[0.14] p-5 sm:p-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-7 text-slate-300 sm:text-base">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Request form */}
      <section
        id={auditFormSectionId}
        className="relative border-b border-white/10 scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div>
              <SectionHeading
                eyebrow="Get started"
                title="Request Audit Review"
                description="Submit your business details for async review, or book a call if you prefer to walk through it live."
              />
              <a
                href={calendlyRevenueLeakAuditUrl}
                {...externalBookingLinkProps}
                data-cta="book-ai-revenue-leak-audit"
                onClick={() => trackAuditCtaClick('audit_landing_form_column')}
                className="si-secondary-cta mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-6 py-3 text-sm font-semibold !text-cyan-50 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:!text-white"
              >
                Book AI Revenue Leak Audit Call
                <ArrowRight size={16} />
              </a>
            </div>
            <RevenueLeakAuditForm sourcePage={auditSourcePage} />
          </div>
        </div>
      </section>

      {/* After the audit */}
      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Optional next step"
            title="After the Audit"
            description={afterAuditIntro}
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {afterAuditOptions.map((option) => (
              <article
                key={option.name}
                className="si-section-glass rounded-2xl border border-white/[0.14] p-5 sm:p-6"
              >
                <h3 className="font-display text-lg font-semibold text-white">{option.name}</h3>
                <p className="mt-2 text-sm font-medium text-cyan-200/90">{option.price}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{option.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / boundaries */}
      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Trust & scope"
            title="Honest boundaries"
            description="Stone Industries keeps recommendations human-reviewed and scope-bounded."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {auditTrustBoundaries.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="si-section-glass rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/[0.04] p-8 text-center sm:p-10">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Ready to Find the Leaks?
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={calendlyRevenueLeakAuditUrl}
                {...externalBookingLinkProps}
                data-cta="book-ai-revenue-leak-audit"
                onClick={() => trackAuditCtaClick('audit_landing_final')}
                className="si-primary-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 hover:!text-slate-950 [&_svg]:!stroke-slate-950"
              >
                Book AI Revenue Leak Audit Call
                <ArrowRight size={16} />
              </a>
              <button
                type="button"
                data-cta="request-audit-review"
                onClick={scrollToForm}
                className="si-secondary-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white"
              >
                Request Audit Review
                <ArrowRight size={16} />
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              <a href={import.meta.env.BASE_URL} className="underline hover:text-slate-300">
                Stone Industries homepage
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
