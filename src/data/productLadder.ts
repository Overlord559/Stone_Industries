/** Public product ladder — SSOT aligned with Operator Brain REMOTE_SERVICE_PRODUCT_LADDER.md */

export type ProductTier = {
  id: string
  name: string
  price: string
  delivery: string
  includes: string[]
  ctaLabel?: string
  highlight?: boolean
}

export const positioningHeadline =
  'California Remote AI Systems, Websites, Automation, and IT Support'

export const positioningSubheadline =
  'Stone Industries helps California businesses stop losing leads through better websites, booking systems, CRM setup, follow-up workflows, AI automation, dashboards, and remote business tech support.'

export const proofLedgerCopy =
  'After implementation, we can compare before/after signals over 30 days: calls, forms, bookings, reviews, follow-up completion, and website conversion paths. No revenue guarantees — just clearer signals.'

export const marketIntelScanCopy =
  'We run a simple public scan of your website, Google profile, booking flow, and follow-up path. No logins, no scraping, no fake data. If a signal is missing, we say so.'

export const phasedScopeCopy =
  'If the full sprint is too much right now, we can phase it. Start with the highest-leak fix first, then expand after results.'

export const aiReceptionistCopy =
  'We install an AI lead intake and follow-up system. If voice calls are part of the leak, we can use tools like Ulio, Retell, Vapi, or GoHighLevel as the receptionist layer and connect it into CRM, booking, and follow-up.'

export const productLadder: ProductTier[] = [
  {
    id: 'free_review',
    name: 'Free Remote Revenue Leak Review',
    price: '$0',
    delivery: '15–20 minutes · remote',
    includes: [
      'Public scan only — website, Google profile, booking, follow-up path',
      '2–3 obvious leaks (verbal walkthrough)',
      'No full written report or implementation plan',
      'Designed to show whether a real issue is worth fixing',
    ],
    ctaLabel: 'Book Free Remote Review',
    highlight: true,
  },
  {
    id: 'remote_quick_fix',
    name: 'Remote Quick Fix',
    price: '$49–$99',
    delivery: 'Remote session',
    includes: [
      'Email setup, printer/software troubleshooting',
      'Browser/computer cleanup, Google Workspace basics',
      'Simple website edits, basic app/software setup',
    ],
  },
  {
    id: 'remote_business_tech',
    name: 'Remote Business Tech Session',
    price: '$149–$299',
    delivery: '1–2 remote sessions',
    includes: [
      'HubSpot, Calendly, Wave, Google Workspace setup',
      'Forms/intake setup, website edits, CRM cleanup',
      'AI tool setup, basic automation support',
    ],
  },
  {
    id: 'paid_audit',
    name: 'AI Revenue Leak Audit',
    price: '$497 standard · $297 launch (first 5–10 customers)',
    delivery: '48-hour written report',
    includes: [
      'Full written report with lead-loss score',
      'Website, Google profile, booking, follow-up review',
      'Top 5 leaks, fix plan, recommended package',
      '30-day proof check',
      '100% credit toward sprint if started within 7 days',
    ],
    ctaLabel: 'Request Paid Audit',
  },
  {
    id: 'website_sprint',
    name: 'Remote Website / Lead Capture Sprint',
    price: '$750–$2,500',
    delivery: 'Remote + async',
    includes: [
      'Landing page or website fixes',
      '3D/premium website option',
      'Lead capture forms, booking CTA, CRM handoff',
      'Conversion improvements',
    ],
  },
  {
    id: 'starter_fix',
    name: 'Starter Fix Sprint',
    price: '$750–$1,500',
    delivery: 'Remote + async',
    includes: [
      'Website CTA, quote/contact form, booking link',
      'Basic CRM, basic follow-up',
    ],
  },
  {
    id: 'customer_engine',
    name: 'AI Customer Engine Sprint',
    price: '$1,500–$2,500',
    delivery: 'Remote + async',
    includes: [
      'Website/lead capture, CRM setup/cleanup',
      'Booking flow, follow-up workflow, owner brief',
      'Review flow, simple dashboard, automation setup',
    ],
  },
  {
    id: 'receptionist_sprint',
    name: 'AI Receptionist / Automation Sprint',
    price: '$2,500–$3,500+',
    delivery: 'Remote · usage/subscriptions separate or capped',
    includes: [
      'AI receptionist or missed-call workflow',
      'Call summaries, CRM routing, appointment request flow',
      'Follow-up, owner alerts',
      aiReceptionistCopy,
    ],
  },
  {
    id: 'managed_ops',
    name: 'Managed AI Ops',
    price: '$299–$997/mo',
    delivery: 'Ongoing remote',
    includes: [
      'Workflow monitoring, dashboard/reporting',
      'Small workflow edits, monthly optimization',
      'Follow-up tuning, lead system improvements',
    ],
  },
]

export const TIER_PUBLIC_LABELS: Record<string, { name: string; range: string; why: string }> = {
  free_audit_booking: {
    name: 'Free Remote Revenue Leak Review',
    range: '$0',
    why: 'Best starting point — see 2–3 obvious leaks before any paid work.',
  },
  paid_audit_497: {
    name: 'AI Revenue Leak Audit',
    range: '$297 launch · $497 standard',
    why: 'You want a full written report, scoring, and fix plan within 48 hours.',
  },
  custom_phased_deal: {
    name: 'Starter Fix Sprint (phased)',
    range: '$750–$1,500',
    why: 'Real pain with partial budget — we phase the highest-leak fix first.',
  },
  starter_fix_sprint: {
    name: 'Starter Fix Sprint',
    range: '$750–$1,500',
    why: 'You need CTA, forms, booking, and basic follow-up wired up.',
  },
  website_lead_capture_sprint: {
    name: 'Remote Website / Lead Capture Sprint',
    range: '$750–$2,500',
    why: 'Website and lead capture are the main bottleneck.',
  },
  customer_engine_sprint: {
    name: 'AI Customer Engine Sprint',
    range: '$1,500–$2,500',
    why: 'You need CRM, booking, follow-up, and capture working together.',
  },
  receptionist_sprint: {
    name: 'AI Receptionist / Automation Sprint',
    range: '$2,500–$3,500+',
    why: 'Missed calls and slow follow-up are costing you leads.',
  },
  managed_ai_ops: {
    name: 'Managed AI Ops',
    range: '$299–$997/mo',
    why: 'You want ongoing monitoring and monthly optimization after setup.',
  },
  remote_quick_fix: {
    name: 'Remote Quick Fix',
    range: '$49–$99',
    why: 'A tactical software, email, or device fix — not a full sprint.',
  },
  remote_business_tech_session: {
    name: 'Remote Business Tech Session',
    range: '$149–$299',
    why: 'CRM, booking, or workspace setup without a full sprint.',
  },
}
