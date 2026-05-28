export const revenueLeakAuditSectionId = 'revenue-leak-audit'

export const auditServiceLabel = 'Free Revenue Leak Audit'

export const auditBiggestProblemOptions = [
  'Calls',
  'Bookings',
  'Reviews',
  'Follow-up',
  'Website',
  'Ads',
] as const

export type AuditBiggestProblem = (typeof auditBiggestProblemOptions)[number]

export const secondShiftPackages = [
  {
    name: 'Starter',
    setup: '$199',
    monthly: '$99/mo',
    features: [
      'Nightly or weekly audit',
      'Follow-up drafts',
      'Review replies',
      'Weekly report',
    ],
  },
  {
    name: 'Growth',
    setup: '$499',
    monthly: '$249/mo',
    features: [
      'Everything in Starter',
      'Landing page improvements',
      'Google Business Profile posts',
      'Lead recovery sequences',
      'Monthly revenue audit',
    ],
  },
  {
    name: 'Operator',
    setup: '$999',
    monthly: '$499/mo',
    features: [
      'Managed AI operator (human-reviewed)',
      'Weekly optimization',
      'Email and follow-up automation',
      'Service page creation',
      'CRM and booking cleanup',
    ],
  },
] as const

export const auditOfferCopy =
  'Send us your website, Google Business Profile, and business type. Our team sends back a revenue leak report and fix plan.'

export const auditPositioningCopy =
  'Most small businesses do not lose customers because their service is bad. They lose customers because they reply too late, forget follow-ups, ignore old leads, miss reviews, and have weak offers. Stone Industries reviews your website, Google Business Profile, and follow-up path, then our team delivers a fix plan.'
