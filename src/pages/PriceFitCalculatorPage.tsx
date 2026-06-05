import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { SectionHeading } from '../components/ui/SectionHeading'
import { phasedScopeCopy } from '../data/productLadder'
import {
  auditPagePath,
  auditTeaserCopy,
} from '../data/revenueLeakAudit'
import {
  calendlyFreeRemoteReviewUrl,
  ctaBookFreeRemoteReview,
  externalBookingLinkProps,
} from '../data/site'
import {
  type CalculatorAnswers,
  getPublicTierDisplay,
  recommendTier,
} from '../lib/priceFitCalculator'
import { trackAuditCtaClick, trackPageView } from '../lib/analytics'

const PAGE_TITLE = 'Price / Fit Calculator | Stone Industries'
const PAGE_DESCRIPTION =
  'Find your best-fit Stone Industries package — free remote review, paid audit, or scoped sprint for California businesses.'

const defaultAnswers: CalculatorAnswers = {
  business_type: 'trade',
  monthly_lead_volume: '11_30',
  average_customer_value: '800_2500',
  missed_calls: 'not_sure',
  online_booking: 'no',
  crm: 'no',
  biggest_problem: 'website',
  budget_comfort: '1500_3000',
}

export function PriceFitCalculatorPage() {
  const [answers, setAnswers] = useState<CalculatorAnswers>(defaultAnswers)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = PAGE_TITLE
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', PAGE_DESCRIPTION)
    trackPageView()
    window.scrollTo(0, 0)
  }, [])

  const result = submitted ? recommendTier(answers) : null
  const tier = result ? getPublicTierDisplay(result.recommended_offer) : null

  function update<K extends keyof CalculatorAnswers>(key: K, value: CalculatorAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    setSubmitted(false)
  }

  return (
    <div data-page="price-fit-calculator" className="relative isolate">
      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Price / fit calculator"
            title="Find Your Best-Fit Package"
            description="Eight quick questions to recommend a starting point. No auto-send, no stored data — results stay in your browser until you book a review."
          />
          <p className="mt-4 text-sm leading-6 text-slate-400">{auditTeaserCopy}</p>
        </div>
      </section>

      <section className="relative border-b border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-10">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Business type</span>
              <select
                className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-white"
                value={answers.business_type}
                onChange={(e) => update('business_type', e.target.value)}
              >
                <option value="trade">Trade (HVAC, plumbing, contractor)</option>
                <option value="auto_restaurant">Auto, restaurant, wellness</option>
                <option value="professional">Professional services</option>
                <option value="retail_other">Retail / other</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Monthly lead volume</span>
              <select
                className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-white"
                value={answers.monthly_lead_volume}
                onChange={(e) => update('monthly_lead_volume', e.target.value)}
              >
                <option value="0_10">0–10</option>
                <option value="11_30">11–30</option>
                <option value="31_75">31–75</option>
                <option value="76_plus">76+</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Average customer value</span>
              <select
                className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-white"
                value={answers.average_customer_value}
                onChange={(e) => update('average_customer_value', e.target.value)}
              >
                <option value="under_200">Under $200</option>
                <option value="200_800">$200–$800</option>
                <option value="800_2500">$800–$2,500</option>
                <option value="2500_plus">$2,500+</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Missed calls a problem?</span>
              <select
                className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-white"
                value={answers.missed_calls}
                onChange={(e) => update('missed_calls', e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="not_sure">Not sure</option>
                <option value="no">No</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Online booking set up?</span>
              <select
                className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-white"
                value={answers.online_booking}
                onChange={(e) => update('online_booking', e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">CRM in use?</span>
              <select
                className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-white"
                value={answers.crm}
                onChange={(e) => update('crm', e.target.value)}
              >
                <option value="no">No CRM</option>
                <option value="HubSpot">HubSpot</option>
                <option value="GoHighLevel">GoHighLevel</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Biggest problem</span>
              <select
                className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-white"
                value={answers.biggest_problem}
                onChange={(e) => update('biggest_problem', e.target.value)}
              >
                <option value="website">Website / lead capture</option>
                <option value="calls">Missed calls</option>
                <option value="follow_up">Slow follow-up</option>
                <option value="booking">Booking / scheduling</option>
                <option value="reviews">Reviews / reputation</option>
                <option value="automation">Automation / workflows</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Budget comfort</span>
              <select
                className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-white"
                value={answers.budget_comfort}
                onChange={(e) => update('budget_comfort', e.target.value)}
              >
                <option value="under_500">Under $500</option>
                <option value="500_1500">$500–$1,500</option>
                <option value="1500_3000">$1,500–$3,000</option>
                <option value="3000_plus">$3,000+</option>
              </select>
            </label>

            <button
              type="submit"
              className="si-primary-cta inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200"
            >
              See recommended starting point
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      {submitted && result && tier ? (
        <section className="relative border-b border-white/10">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-10">
            <div className="si-section-glass rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/[0.04] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">
                Recommended starting point
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">{tier.name}</h2>
              <p className="mt-2 text-sm font-medium text-cyan-200/90">Estimated range: {tier.range}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{tier.why}</p>
              <p className="mt-3 text-sm leading-7 text-slate-400">{result.tier_rationale}</p>
              {result.custom_deal_needed ? (
                <p className="mt-4 text-sm leading-7 text-slate-300">{phasedScopeCopy}</p>
              ) : null}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={calendlyFreeRemoteReviewUrl}
                  {...externalBookingLinkProps}
                  data-cta="book-free-remote-review"
                  onClick={() => trackAuditCtaClick('calculator_result')}
                  className="si-primary-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200"
                >
                  {ctaBookFreeRemoteReview}
                  <ArrowRight size={16} />
                </a>
                <a
                  href={auditPagePath}
                  className="si-secondary-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10"
                >
                  Compare free review vs paid audit
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
