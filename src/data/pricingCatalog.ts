/**
 * Productized packages + add-ons — source of truth for site.ts and static pricing-catalog.js (build).
 */

import {
  addOnDetailsById,
  advancedSeoPublicLine,
  aiWorkflowScopeNote,
  detailForAddOn,
  techCleanupPlatformScopeNote,
} from './addOnExplanations'

export type CatalogAddOnKind = 'one-time' | 'hourly' | 'monthly' | 'per-unit'

export type AddOnDetailBlock = {
  shortDescription?: string
  whatThisIs: string
  includes: string[]
  notIncluded?: string[]
  bestFor?: string
}

export type CatalogAddOn = {
  id: string
  name: string
  priceLabel: string
  kind: CatalogAddOnKind
  estimateAdd: number | null
  estimateNote?: string
  /** If set, add-on checkbox only appears for these package IDs */
  showForPackages?: string[]
  helpText?: string
  detail?: AddOnDetailBlock
  /** Per-unit add-on (e.g. extra pages on Starter) */
  unitLabel?: string
  maxUnits?: number
}

export type CatalogPackage = {
  id: string
  name: string
  priceLabel: string
  baseEstimate: number | null
  isFrom: boolean
  summary: string
  includes: string[]
  notIncluded: string[]
  includedAddOnIds?: string[]
  /** Pages included in fixed package price */
  pagesIncluded?: number
  pagesIncludedLabel?: string
  /** Shown in estimator when package selected */
  pageLimitNote?: string
}

export type CatalogService = {
  slug: string
  title: string
  inquirySubject: string
  packages: CatalogPackage[]
  addOns: CatalogAddOn[]
  serviceDisclaimer?: string
  secureBullets: string[]
}

export const outOfScopeHourlyNote =
  'Extra out-of-scope work is often billed at $85–$125/hr or quoted separately in writing.'

export const competitorPositioningNote =
  'Fast fixed-scope tech, website, AI workflow, and operations setup for Fresno and Central Valley small businesses — without forcing every customer into a full agency, MSP, or 3PL contract.'

/** Public “Where Stone fits” bullets — no competitor names */
export const whereStoneFits = [
  'Not a full marketing agency — fast, clear websites with page-count packages and secure lead capture. ' + advancedSeoPublicLine,
  'Not a full MSP — fixed-scope tech cleanup, Wi-Fi/printer/POS help, and security-conscious setup. Ongoing retainers available by scope, not a full managed IT or compliance contract.',
  'Not a full AI agency — ' +
    aiWorkflowScopeNote +
    ' Start with one workflow, then expand.',
  'Not a freight broker or 3PL — operations workflow setup, intake forms, handoffs, tracking sheets, and SOPs. Freight movement and regulated transportation require properly authorized providers.',
] as const

export const logisticsFreightDisclaimer =
  'Stone Industries does not operate as a freight broker, carrier, or 3PL. Freight movement, carrier selection, and regulated transportation services require properly authorized providers.'

const leadCaptureDetail = addOnDetailsById['lead-capture']
const cyberTier1Detail = addOnDetailsById['cyber-tier-1']
const cyberTier2Detail = addOnDetailsById['cyber-tier-2']

/** Shown near secure lead capture add-on / package lines */
export const secureLeadCaptureHelp = {
  title: 'Secure lead capture setup',
  whatThisIs: leadCaptureDetail.whatThisIs,
  includes: leadCaptureDetail.includes,
  notIncluded: leadCaptureDetail.notIncluded ?? [],
  is: leadCaptureDetail.whatThisIs,
  isNot: (leadCaptureDetail.notIncluded ?? []).join('; '),
}

export const cyberTier1Help = {
  title: 'Tier 1 Cybersecurity Layer',
  whatThisIs: cyberTier1Detail.whatThisIs,
  includes: cyberTier1Detail.includes,
  notIncluded: cyberTier1Detail.notIncluded ?? [],
  bullets: cyberTier1Detail.includes,
  disclaimer: 'Practical launch hardening only — not formal compliance or managed security.',
}

export const cyberTier2Help = {
  title: 'Tier 2 Cybersecurity Layer',
  whatThisIs: cyberTier2Detail.whatThisIs,
  includes: cyberTier2Detail.includes,
  notIncluded: cyberTier2Detail.notIncluded ?? [],
  bullets: cyberTier2Detail.includes,
  disclaimer:
    'No hacker-proof claim, no PCI/HIPAA/SOC 2 certification, and no incident response or managed security service.',
}

const pricingCatalogRaw: CatalogService[] = [
  {
    slug: 'tech-cleanup',
    title: 'Same-Day Tech Cleanup',
    inquirySubject: 'Tech Cleanup Inquiry — Stone Industries',
    serviceDisclaimer: techCleanupPlatformScopeNote,
    packages: [
      {
        id: 'starter',
        name: 'Starter Cleanup',
        priceLabel: '$99',
        baseEstimate: 99,
        isFrom: false,
        summary: 'Focused Windows PC cleanup — pop-ups, browser clutter, and basic triage.',
        includes: [
          'One Windows computer remote or on-site session (when available)',
          'Pop-up / unwanted software review',
          'Browser cleanup and basic triage',
          'Written recap of what changed',
        ],
        notIncluded: [
          'Phones or mobile devices',
          'Linux computers',
          'macOS (case-by-case only — ask first)',
          'Hardware repair',
          'Full network redesign',
          'Guaranteed same-hour response',
        ],
      },
      {
        id: 'deep',
        name: 'Deep Cleanup',
        priceLabel: '$179',
        baseEstimate: 179,
        isFrom: false,
        summary: 'Thorough Windows cleanup with extensions, startup items, and backup guidance.',
        includes: [
          'Deeper Windows device cleanup session',
          'Suspicious extension and unwanted app review',
          'Startup / nuisance software review',
          'Backup and recovery recommendations',
          'Scam-prevention basics',
        ],
        notIncluded: [
          'Phones or mobile devices',
          'Linux computers',
          'macOS (case-by-case only — ask first)',
          'New hardware',
          'Enterprise security contracts',
          'Unlimited ongoing support',
        ],
      },
      {
        id: 'business',
        name: 'Business Cleanup',
        priceLabel: '$299+',
        baseEstimate: 299,
        isFrom: true,
        summary: 'Multi-device Windows cleanup with account safety and workflow notes.',
        includes: [
          'Scope-defined multi-device or small-office Windows cleanup',
          'Account safety review and workflow organization notes',
          'Priority scheduling when available',
          'Documented findings and next steps',
        ],
        notIncluded: [
          'Phones or mobile devices',
          'Linux computers',
          'macOS (case-by-case only — ask first)',
          'After-hours SLA',
          'Full office network redesign',
          'Guaranteed malware removal',
        ],
        includedAddOnIds: ['2fa', 'device-security'],
      },
    ],
    addOns: [
      {
        id: 'device-security',
        name: 'Device Security Setup',
        priceLabel: '+$79',
        kind: 'one-time',
        estimateAdd: 79,
        helpText:
          'Windows Security / antivirus check, suspicious app/extension review, update check, basic malware-symptom review, password/2FA recommendations. Not guaranteed malware removal or forensic cleanup.',
        showForPackages: ['starter', 'deep'],
      },
      {
        id: 'pw-manager',
        name: 'Password manager setup guidance',
        priceLabel: '+$49',
        kind: 'one-time',
        estimateAdd: 49,
      },
      {
        id: '2fa',
        name: '2FA / account recovery setup',
        priceLabel: '+$49',
        kind: 'one-time',
        estimateAdd: 49,
        showForPackages: ['starter', 'deep'],
      },
      {
        id: 'wifi-sec',
        name: 'Wi-Fi / router basic security check',
        priceLabel: '+$79',
        kind: 'one-time',
        estimateAdd: 79,
      },
      {
        id: 'extra-hour',
        name: 'Extra on-site hour',
        priceLabel: '+$85/hr',
        kind: 'hourly',
        estimateAdd: null,
        estimateNote: 'Billed at $85/hr when added to scope',
      },
    ],
    secureBullets: [
      'Browser and account safety review',
      'Suspicious extension and unwanted app cleanup',
      'Update and checkup guidance',
      'Backup and recovery recommendations',
      'Phishing and scam-prevention basics',
    ],
  },
  {
    slug: 'business-websites',
    title: '24-Hour Business Websites',
    inquirySubject: 'Website Launch Inquiry — Stone Industries',
    serviceDisclaimer:
      'Final price depends on scope, content readiness, and timeline. ' +
      advancedSeoPublicLine +
      ' Security layers are practical hardening — not formal compliance or managed security.',
    packages: [
      {
        id: 'starter-landing',
        name: 'Starter Landing Page',
        priceLabel: '$399',
        baseEstimate: 399,
        isFrom: false,
        pagesIncluded: 1,
        pagesIncludedLabel: '1 page',
        summary: 'Single-page local business site — mobile-ready with clear phone/email CTA.',
        includes: [
          '1-page website (mobile-ready)',
          'Basic service / offer layout',
          'Phone and email CTA',
          'Privacy + terms baseline',
          'Netlify deployment',
          '1 revision round',
        ],
        notIncluded: ['Secure Supabase lead capture (optional add-on)', 'More than 1 page without add-on or quote'],
        pageLimitNote: 'Use the page-count control on the estimator — 1 page included; extra pages +$125/page each.',
      },
      {
        id: 'business-site',
        name: 'Business Website',
        priceLabel: '$799',
        baseEstimate: 799,
        isFrom: false,
        pagesIncluded: 5,
        pagesIncludedLabel: 'Up to 5 pages',
        summary: 'Multi-page site for local businesses — home, services, pricing, contact, and legal pages.',
        includes: [
          'Up to 5 pages (e.g. home, services, pricing, contact, privacy/terms)',
          'Mobile-ready layout',
          'Basic SEO / meta titles',
          'Inquiry form + phone/email CTA (basic lead path)',
          'Netlify deployment',
          '2 revision rounds',
        ],
        notIncluded: [
          'Complex multi-section layouts beyond simple extra pages (custom quote)',
          'Formal compliance certification',
          'Unlimited future edits',
        ],
        pageLimitNote: 'Extra pages beyond 5: +$125/page on estimator, or custom quote if scope is complex.',
      },
      {
        id: 'premium',
        name: 'Premium Website',
        priceLabel: '$1,199+',
        baseEstimate: 1199,
        isFrom: true,
        pagesIncluded: 7,
        pagesIncludedLabel: 'Up to 7 pages',
        summary: 'Full Business scope plus secure lead capture, cybersecurity layers, Stripe readiness, and launch-ready handoff.',
        includes: [
          'Up to 7 pages — everything in Business Website',
          'Secure lead capture setup (Supabase + RLS pattern)',
          'Tier 1 + Tier 2 cybersecurity layers',
          'Stripe Payment Link readiness (hosted — no card data on your site)',
          'Copywriting help baseline',
          'Launch-ready handoff + stronger conversion layout',
          '3 revision rounds',
        ],
        notIncluded: [
          'Complex large sites beyond simple extra pages (custom quote)',
          'Monthly website care (optional add-on)',
          'Formal compliance certification',
        ],
        pageLimitNote: 'Extra pages beyond 7: +$125/page on estimator, or custom quote if scope is complex.',
        includedAddOnIds: [
          'lead-capture',
          'cyber-tier-1',
          'cyber-tier-2',
          'stripe-link',
          'copy',
        ],
      },
    ],
    addOns: [
      {
        id: 'lead-capture',
        name: 'Secure lead capture setup',
        priceLabel: '+$199',
        kind: 'one-time',
        estimateAdd: 199,
        helpText: secureLeadCaptureHelp.is + ' Not: ' + secureLeadCaptureHelp.isNot,
        showForPackages: ['starter-landing', 'business-site'],
      },
      {
        id: 'cyber-tier-1',
        name: 'Tier 1 Cybersecurity Layer',
        priceLabel: '+$149',
        kind: 'one-time',
        estimateAdd: 149,
        helpText: cyberTier1Help.bullets.join('; '),
        showForPackages: ['starter-landing', 'business-site'],
      },
      {
        id: 'cyber-tier-2',
        name: 'Tier 2 Cybersecurity Layer',
        priceLabel: '+$299',
        kind: 'one-time',
        estimateAdd: 299,
        helpText: cyberTier2Help.bullets.join('; '),
        showForPackages: ['starter-landing', 'business-site'],
      },
      {
        id: 'stripe-link',
        name: 'Stripe Payment Link setup',
        priceLabel: '+$150',
        kind: 'one-time',
        estimateAdd: 150,
        showForPackages: ['starter-landing', 'business-site'],
      },
      {
        id: 'copy',
        name: 'Copywriting help',
        priceLabel: '+$200+',
        kind: 'one-time',
        estimateAdd: 200,
        estimateNote: 'From $200 depending on scope',
        showForPackages: ['starter-landing', 'business-site'],
      },
      {
        id: 'rush',
        name: 'Rush 24-hour delivery',
        priceLabel: '+$250+',
        kind: 'one-time',
        estimateAdd: 250,
        estimateNote: 'When scheduling allows',
        showForPackages: ['starter-landing', 'business-site'],
      },
      {
        id: 'monthly-care',
        name: 'Monthly website care',
        priceLabel: '$99–$299/mo',
        kind: 'monthly',
        estimateAdd: null,
        estimateNote: 'Billed monthly upfront — separate from one-time project total',
      },
    ],
    secureBullets: [
      'Privacy and terms pages',
      'Secure lead capture available (protected inquiry + Supabase RLS when scoped)',
      'Optional Tier 1 / Tier 2 cybersecurity layers — distinct from lead capture',
      'Hosted payment link readiness after quote — no card data on your site',
    ],
  },
  {
    slug: 'wifi-printer-pos',
    title: 'Wi-Fi, Printer & POS Support',
    inquirySubject: 'Tech Support Inquiry — Stone Industries',
    serviceDisclaimer:
      'Payment-system safety guidance only — not formal PCI compliance or certification. For full managed IT or compliance programs, request a custom quote.',
    packages: [
      {
        id: 'quick-fix',
        name: 'Quick Fix',
        priceLabel: '$99',
        baseEstimate: 99,
        isFrom: false,
        summary: 'Basic remote or light on-site troubleshooting for one issue area.',
        includes: ['Remote or short on-site triage', 'Basic setup guidance', 'Next-step recommendations'],
        notIncluded: ['New hardware', 'Full cabling project'],
      },
      {
        id: 'business-visit',
        name: 'Business Support Visit',
        priceLabel: '$199',
        baseEstimate: 199,
        isFrom: false,
        summary: 'Broader hands-on support with documented notes for Wi-Fi, printer, or POS.',
        includes: [
          'On-site Wi-Fi or printer setup',
          'Broader support notes and verification',
          'Operator walkthrough',
        ],
        notIncluded: ['Enterprise network design', 'Emergency SLA'],
      },
      {
        id: 'office-setup',
        name: 'Small Office Tech Setup',
        priceLabel: '$399+',
        baseEstimate: 399,
        isFrom: true,
        summary: 'Office setup with guest network, printer access review, and simple tech checklist.',
        includes: [
          'Multi-area triage visit',
          'Guest network recommendation when appropriate',
          'Printer access and sharing review',
          'Simple office tech checklist and documented findings',
        ],
        notIncluded: ['Full POS vendor contract work without scope review'],
        includedAddOnIds: ['guest-wifi', 'office-security-review'],
      },
    ],
    addOns: [
      {
        id: 'extra-hour',
        name: 'Extra on-site hour',
        priceLabel: '+$95/hr',
        kind: 'hourly',
        estimateAdd: null,
        estimateNote: 'Billed at $95/hr',
      },
      {
        id: 'guest-wifi',
        name: 'Guest Wi-Fi review',
        priceLabel: '+$79',
        kind: 'one-time',
        estimateAdd: 79,
      },
      {
        id: 'office-security-review',
        name: 'Small office security review',
        priceLabel: '+$99',
        kind: 'one-time',
        estimateAdd: 99,
      },
      {
        id: 'printer',
        name: 'Printer setup',
        priceLabel: '+$75/device',
        kind: 'one-time',
        estimateAdd: 75,
        estimateNote: 'Per additional device in scope',
      },
      {
        id: 'pos-support',
        name: 'POS vendor call support',
        priceLabel: '+$95/hr',
        kind: 'hourly',
        estimateAdd: null,
        estimateNote: 'Billed at $95/hr',
      },
      {
        id: 'retainer',
        name: 'Monthly support retainer',
        priceLabel: '$149–$399/mo',
        kind: 'monthly',
        estimateAdd: null,
        estimateNote: 'Billed monthly upfront — separate from one-time visit total',
      },
    ],
    secureBullets: [
      'Wi-Fi password and security settings review',
      'Guest network recommendation when appropriate',
      'Printer access and sharing review',
      'POS environment safety guidance — not PCI certification',
    ],
  },
  {
    slug: 'logistics-coordination',
    title: 'Operations & Logistics Coordination Setup',
    inquirySubject: 'Operations Coordination Inquiry — Stone Industries',
    serviceDisclaimer: logisticsFreightDisclaimer,
    packages: [
      {
        id: 'basic',
        name: 'Basic Coordination Setup',
        priceLabel: '$249',
        baseEstimate: 249,
        isFrom: false,
        summary: 'Vendor/contact organization and simple process setup with checklist and recap.',
        includes: [
          'Planning session / checklist',
          'Vendor or contact organization',
          'Status recap',
        ],
        notIncluded: [
          'Freight brokerage or carrier booking',
          '3PL or regulated transportation',
          'Guaranteed contract outcomes',
        ],
      },
      {
        id: 'workflow',
        name: 'Operations Workflow Setup',
        priceLabel: '$599',
        baseEstimate: 599,
        isFrom: false,
        summary: 'Intake forms, tracking sheets, and workflow cleanup over a defined window.',
        includes: [
          'Intake form / tracking sheet setup',
          'Documentation templates and follow-up tracking',
          'Basic shared-access cleanup guidance',
          'Handoff summary',
        ],
        notIncluded: ['Freight movement arrangement', 'Full PM retainer unless scoped'],
        includedAddOnIds: ['handoff', 'access-cleanup'],
      },
      {
        id: 'ops-system',
        name: 'Business Operations System',
        priceLabel: '$999+',
        baseEstimate: 999,
        isFrom: true,
        summary: 'Operations coordination system — SOPs, boards, handoffs, and automation recommendations.',
        includes: [
          'Scope-defined coordination tasks and written deliverables',
          'Docs organization, SOPs, and secure handoff checklists',
          'Workflow cleanup and AI/automation planning recommendations',
        ],
        notIncluded: [
          'Freight broker, carrier, or 3PL services',
          'Implied contract wins',
          'Undocumented past performance claims',
        ],
        includedAddOnIds: ['handoff', 'access-cleanup', 'auto-plan'],
      },
    ],
    addOns: [
      { id: 'handoff', name: 'Secure handoff checklist', priceLabel: '+$99', kind: 'one-time', estimateAdd: 99 },
      { id: 'access-cleanup', name: 'Shared access cleanup', priceLabel: '+$149', kind: 'one-time', estimateAdd: 149 },
      { id: 'auto-plan', name: 'Automation planning', priceLabel: '+$199', kind: 'one-time', estimateAdd: 199 },
      {
        id: 'monthly-ops',
        name: 'Monthly operations support',
        priceLabel: '$299+/mo',
        kind: 'monthly',
        estimateAdd: null,
        estimateNote: 'Billed monthly upfront — separate from project total',
      },
    ],
    secureBullets: [
      'Minimal data collection for coordination tasks',
      'Shared-access cleanup guidance',
      'Secure handoff checklist for vendors and contacts',
      'Simple operations security notes — not compliance certification',
    ],
  },
  {
    slug: 'ai-workflow-automation',
    title: 'AI Automation & Digital Assistant Systems',
    inquirySubject: 'AI Assistant Inquiry — Stone Industries',
    serviceDisclaimer:
      aiWorkflowScopeNote +
      ' Not a full AI agency or enterprise RAG program. Larger multi-workflow builds are quoted after scope review.',
    packages: [
      {
        id: 'ai-starter',
        name: 'AI Starter Automation',
        priceLabel: '$499',
        baseEstimate: 499,
        isFrom: false,
        summary: 'One simple guarded workflow with a documented human approval step.',
        includes: [
          'Workflow review',
          'One automation or intake path',
          'Human-in-loop checkpoints',
          'Handoff notes',
        ],
        notIncluded: ['Unsupervised 24/7 agents', 'Enterprise RAG'],
      },
      {
        id: 'ai-business',
        name: 'AI Business Assistant',
        priceLabel: '$999',
        baseEstimate: 999,
        isFrom: false,
        summary: 'Intake/FAQ plus email/process automation with safety boundaries.',
        includes: [
          'Intake or FAQ assistant setup',
          'Email / process automation with approval gates',
          'Secure prompt boundaries and safety documentation',
          'Maintenance notes',
        ],
        notIncluded: ['Compliance certifications', 'Payment handling by AI'],
        includedAddOnIds: ['prompt-bounds'],
      },
      {
        id: 'ai-ops',
        name: 'AI Operations System',
        priceLabel: '$1,999+',
        baseEstimate: 1999,
        isFrom: true,
        summary: 'Multiple workflows with approval gates, testing, and operator documentation.',
        includes: [
          'Multi-step workflow mapping',
          'Human approval gates and testing notes',
          'Private API / env setup guidance in scope',
          'Operator documentation',
        ],
        notIncluded: ['Autonomous logistics or defense-grade claims'],
        includedAddOnIds: ['prompt-bounds', 'api-setup'],
      },
    ],
    addOns: [
      {
        id: 'extra-flow',
        name: 'Extra workflow',
        priceLabel: '+$300+',
        kind: 'one-time',
        estimateAdd: 300,
        estimateNote: 'From $300 per workflow',
      },
      {
        id: 'prompt-bounds',
        name: 'Secure prompt boundaries',
        priceLabel: '+$150',
        kind: 'one-time',
        estimateAdd: 150,
        showForPackages: ['ai-starter'],
      },
      {
        id: 'api-setup',
        name: 'Private API / env setup',
        priceLabel: '+$200+',
        kind: 'one-time',
        estimateAdd: 200,
        estimateNote: 'From $200',
        showForPackages: ['ai-starter', 'ai-business'],
      },
      {
        id: 'monthly-ai',
        name: 'Monthly AI workflow support',
        priceLabel: '$299–$750+/mo',
        kind: 'monthly',
        estimateAdd: null,
        estimateNote: 'Billed monthly upfront — separate from project total',
      },
    ],
    secureBullets: [
      'Human approval for important customer-facing actions',
      'No sensitive data collection unless scoped and necessary',
      'No payment or card handling by AI workflows',
      'API keys documented for server-side use only',
      'Prompt boundaries and privacy/workflow documentation',
    ],
  },
]

function attachAddOnDetails(addon: CatalogAddOn): CatalogAddOn {
  const detail = detailForAddOn(addon.id)
  return detail ? { ...addon, detail } : addon
}

export const pricingCatalog: CatalogService[] = pricingCatalogRaw.map((service) => ({
  ...service,
  addOns: service.addOns.map(attachAddOnDetails),
}))

export function catalogBySlug(slug: string) {
  return pricingCatalog.find((s) => s.slug === slug)
}

export function lowestPackagePrice(service: CatalogService): number | null {
  const bases = service.packages.map((p) => p.baseEstimate).filter((n): n is number => n !== null)
  return bases.length ? Math.min(...bases) : null
}

export function packageIncludesAddOn(pkg: CatalogPackage, addOnId: string): boolean {
  return (pkg.includedAddOnIds ?? []).includes(addOnId)
}

export function isAddOnVisibleForPackage(addon: CatalogAddOn, packageId: string): boolean {
  if (addon.showForPackages && addon.showForPackages.length > 0) {
    return addon.showForPackages.includes(packageId)
  }
  return true
}
