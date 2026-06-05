import { marketIntelScanCopy, proofLedgerCopy } from './productLadder'

export const revenueLeakAuditSectionId = 'revenue-leak-audit'

export const auditPagePath = `${import.meta.env.BASE_URL}ai-revenue-leak-audit`

export const auditChecklistSectionId = 'audit-checklist'

export const auditFormSectionId = 'request-audit'

export const auditServiceLabel = 'AI Revenue Leak Review / Audit'

export const auditPriceStandard = '$497'
export const auditPriceLaunch = '$297'
export const auditPrice = `${auditPriceLaunch} launch · ${auditPriceStandard} standard`

export const auditBiggestProblemOptions = [
  'Calls',
  'Bookings',
  'Reviews',
  'Follow-up',
  'Website',
  'Ads',
] as const

export type AuditBiggestProblem = (typeof auditBiggestProblemOptions)[number]

export const auditHeroHeadline = 'Find Where Leads May Be Slipping Through'

export const auditHeroSubheadline =
  'Book a free remote review and we will show 2–3 places where leads may be slipping through — or request a paid audit for a full written report in 48 hours.'

export const auditHeroTrustLine =
  'Veteran-owned California remote-first technology services. Public scan only for free review — no logins, no scraping, no fake data.'

export const freeReviewTitle = 'Free Remote Revenue Leak Review'

export const freeReviewCopy =
  '15–20 minutes. Public scan of your website, Google profile, booking flow, and follow-up path. We show 2–3 obvious leaks verbally — no full written report, no implementation plan. Designed to show whether there is a real issue worth fixing.'

export const paidAuditTitle = `AI Revenue Leak Audit — ${auditPrice}`

export const paidAuditCopy =
  'Full written report delivered in 48 hours. Includes website review, Google Business Profile review, booking/quote flow review, follow-up path review, lead-loss score, top 5 leaks, fix plan, recommended package, 30-day proof check, and 100% credit toward a sprint if started within 7 days.'

export const auditOfferTitle = 'Free Review vs Paid Audit'

export const auditOfferCopy = marketIntelScanCopy

export const auditChecklistItems = [
  'Website conversion path (public view)',
  'Google Business Profile signals',
  'Missed-call and contact-path review',
  'Booking and quote flow review',
  'CRM and follow-up leak review',
  'Review and testimonial flow review',
] as const

export const freeReviewDeliverables = [
  '15–20 minute remote walkthrough',
  '2–3 obvious leaks (verbal)',
  'Quick sense of whether paid audit or sprint makes sense',
  'No full written report',
] as const

export const auditDeliverables = [
  'Full written Revenue Leak Report',
  'Lead-loss score',
  'Top 5 prioritized leaks',
  '30-day fix plan and recommended package',
  '30-day proof check after implementation',
  '100% audit credit toward sprint within 7 days',
] as const

export const auditAudienceSegments = [
  'Contractors and trades',
  'Med spas and wellness',
  'Dental and medical offices',
  'Gyms and fitness',
  'Restaurants and catering',
  'Property managers',
  'Professional services',
  'California small businesses',
] as const

export const auditProcessSteps = [
  'Book a free remote review or request a paid audit',
  'Stone runs a public scan of your customer journey',
  'We identify leaks across website, booking, calls, CRM, and follow-up',
  'Free review: verbal walkthrough of 2–3 leaks. Paid audit: full written report in 48 hours.',
  'If it makes sense, Stone can install fixes via a scoped sprint',
] as const

export const afterAuditOptions = [
  {
    name: 'Starter Fix Sprint',
    price: '$750–$1,500',
    detail: 'Website CTA, forms, booking link, basic CRM, and follow-up.',
  },
  {
    name: 'AI Customer Engine Sprint',
    price: '$1,500–$2,500',
    detail: 'Lead capture, CRM, booking, follow-up workflow, and simple dashboard.',
  },
  {
    name: 'Managed AI Ops',
    price: '$299–$997/mo',
    detail: 'Ongoing monitoring, optimization, and monthly improvements.',
  },
] as const

export const auditTrustBoundaries = [
  'Veteran-owned',
  'California remote-first',
  'Human-reviewed recommendations',
  'No revenue guarantees',
  'No fully autonomous customer messaging without approval',
  proofLedgerCopy,
] as const

export const auditTeaserTitle = 'Revenue Leak Review'

export const auditTeaserHeadline = 'See Where Leads May Be Slipping Through'

export const auditTeaserCopy = marketIntelScanCopy

export const afterAuditIntro =
  'If the review or audit shows clear leaks, Stone Industries can help install fixes through a scoped sprint. Implementation is optional — we scope down before discounting.'

/** @deprecated Removed from ad funnel — kept empty for grep-safe migration */
export const secondShiftPackages = [] as const

export const auditPositioningCopy = auditOfferCopy
