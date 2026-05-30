export const revenueLeakAuditSectionId = 'revenue-leak-audit'

export const auditPagePath = `${import.meta.env.BASE_URL}ai-revenue-leak-audit`

export const auditChecklistSectionId = 'audit-checklist'

export const auditFormSectionId = 'request-audit'

export const auditServiceLabel = 'AI Revenue Leak Audit'

export const auditPrice = '$497'

export const auditBiggestProblemOptions = [
  'Calls',
  'Bookings',
  'Reviews',
  'Follow-up',
  'Website',
  'Ads',
] as const

export type AuditBiggestProblem = (typeof auditBiggestProblemOptions)[number]

export const auditHeroHeadline = 'Find Where Your Business Is Losing Customers'

export const auditHeroSubheadline =
  'Stone Industries reviews your website, Google Business Profile, booking flow, missed-call capture, and follow-up process to find the leaks costing you leads.'

export const auditHeroTrustLine =
  'Veteran-owned technology services company serving Fresno & the Central Valley.'

export const auditOfferTitle = `AI Revenue Leak Audit — ${auditPrice}`

export const auditOfferCopy =
  'A founder-led review of your customer acquisition flow. We identify where prospects are dropping off, where follow-up is slow, where booking/contact flow is unclear, and where simple AI or CRM systems can recover lost opportunities.'

export const auditChecklistItems = [
  'Website conversion review',
  'Google Business Profile review',
  'Missed-call/contact-path review',
  'Booking flow review',
  'CRM/follow-up leak review',
  'Review/testimonial flow review',
  '30-day fix plan',
] as const

export const auditDeliverables = [
  'Revenue Leak Map',
  'Priority Fix List',
  '30-Day Action Plan',
  'Optional Implementation Recommendation',
  'Founder-led walkthrough',
] as const

export const auditAudienceSegments = [
  'Contractors',
  'Med spas',
  'Dental offices',
  'Gyms',
  'Restaurants and catering businesses',
  'Property managers',
  'Small professional services',
  'Veteran-owned businesses',
] as const

export const auditProcessSteps = [
  'Submit your business or book a call',
  'Stone reviews your public customer journey',
  'We identify leaks across website, booking, calls, CRM, and follow-up',
  'You receive a clear report and fix plan',
  'If it makes sense, Stone can install the fixes',
] as const

export const afterAuditOptions = [
  {
    name: 'Fix Sprint',
    price: '$1,500–$2,500 one-time',
    detail: 'Website, booking, CRM, follow-up, and conversion cleanup.',
  },
  {
    name: 'Managed AI Ops',
    price: '$299–$997/mo',
    detail: 'Ongoing improvement, reporting, and support.',
  },
  {
    name: 'Custom Website / CRM / Automation Build',
    price: 'Quoted after audit',
    detail: 'Larger systems quoted based on scope.',
  },
] as const

export const auditTrustBoundaries = [
  'Veteran-owned',
  'Fresno & Central Valley service area',
  'Human-reviewed recommendations',
  'No revenue guarantees',
  'No fully autonomous outreach or customer messaging without approval',
] as const

export const auditTeaserTitle = 'AI Revenue Leak Audit'

export const auditTeaserHeadline = 'Find Where Customers Are Dropping Off'

export const auditTeaserCopy =
  'Stone Industries reviews your website, Google Business Profile, booking flow, missed-call capture, CRM, and follow-up process to find where leads are leaking.'

export const afterAuditIntro =
  'If the audit shows clear revenue leaks, Stone Industries can help install the fixes. Implementation is optional.'

/** @deprecated Removed from ad funnel — kept empty for grep-safe migration */
export const secondShiftPackages = [] as const

export const auditPositioningCopy = auditOfferCopy
