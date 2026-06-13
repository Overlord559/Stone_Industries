/**
 * Productized packages + add-ons — source of truth for site.ts and static pricing-catalog.js (build).
 */

import {
  addOnDetailsById,
  advancedSeoPublicLine,
  aiReceptionistScopeNote,
  aiWorkflowScopeNote,
  detailForAddOn,
  mobileMvpScopeNote,
  operationsCoordinationScopeNote,
  pcBuildCompetitorNote,
  pcBuildPartsPricingNote,
  pcBuildServiceScopeNote,
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
  /** Customer-facing “best for” line — estimator context panel only, not dropdown labels */
  bestFor?: string
  /** Short “use for” examples — estimator context panel only */
  useFor?: string[]
  /** Parts-cost reminder for hardware/build packages */
  partsNote?: string
  /** Timeline expectation for hardware/build packages */
  timelineNote?: string
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
  'Revenue-first local technology services for Fresno and Central Valley small businesses — PC builds, Tier 1 IT support, Wi-Fi/POS setup, websites, AI receptionist workflows, and mobile MVP prototypes — without forcing every customer into a full agency, MSP, or 3PL contract.'

/** Public display order — PC builds and Tier 1 IT first; operations coordination last/secondary */
export const catalogServiceOrder = [
  'custom-pc-builds',
  'tech-cleanup',
  'wifi-printer-pos',
  'business-websites',
  'ai-workflow-automation',
  'mobile-app-mvp',
  'logistics-coordination',
] as const

/** Public “Where Stone fits” bullets — no competitor names */
export const whereStoneFits = [
  'Not a full marketing agency — fast business websites with page-count packages, optional 3D/interactive sections (CSS/L3 patterns before heavy WebGL), and secure lead capture. ' +
    advancedSeoPublicLine,
  'Not a full MSP — Tier 1 IT cleanup, Wi-Fi/printer/POS help, and security-conscious setup. Ongoing retainers available by scope, not a full managed IT or compliance contract.',
  'Not a full AI agency — ' +
    aiReceptionistScopeNote +
    ' Broader workflow automation quoted separately.',
  'Not an app development studio — ' + mobileMvpScopeNote,
  'Not a freight broker or 3PL — ' + operationsCoordinationScopeNote,
  'Not a national PC builder warranty program — local Windows tower planning, upgrades, assembly, setup, and handoff. ' +
    pcBuildCompetitorNote,
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
    title: 'Tier 1 IT Support & Tech Cleanup',
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
    title: 'Business Websites & 3D Interactive Websites',
    inquirySubject: 'Website Launch Inquiry — Stone Industries',
    serviceDisclaimer:
      'Final price depends on scope, content readiness, and timeline. ' +
      advancedSeoPublicLine +
      ' Optional 3D/interactive sections use safe CSS/L3 patterns before heavy WebGL — quoted when the prospect needs more than a standard layout. Security layers are practical hardening — not formal compliance or managed security. ' +
      'Scoped quick offers (separate from packages): Quick Fix $97–$197 · Contact Flow Cleanup $297–$497 · Cyber Trust Cleanup $197–$497.',
    packages: [
      {
        id: 'starter-landing',
        name: 'Starter Landing Page',
        priceLabel: '$297',
        baseEstimate: 297,
        isFrom: false,
        pagesIncluded: 1,
        pagesIncludedLabel: '1 page',
        summary:
          'Cash-first single-page site for local Fresno and Central Valley businesses — mobile-ready landing with clear phone and email CTA, no full agency contract.',
        includes: [
          '1-page website (mobile-ready)',
          'Basic service / offer layout',
          'Phone and email CTA',
          'Privacy + terms baseline',
          'Netlify deployment',
          '1 revision round',
        ],
        notIncluded: ['Secure Supabase lead capture (optional add-on)', 'More than 1 page without add-on or quote'],
        pageLimitNote: 'Use the page-count control on the estimator — 1 page included; extra pages +$97/page each.',
      },
      {
        id: 'business-site',
        name: 'Business Website',
        priceLabel: '$597',
        baseEstimate: 597,
        isFrom: false,
        pagesIncluded: 5,
        pagesIncludedLabel: 'Up to 5 pages',
        summary:
          'Multi-page site to capture more local leads — home, services, contact, and legal pages with inquiry path and basic SEO/meta for trust.',
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
        pageLimitNote: 'Extra pages beyond 5: +$97/page on estimator, or custom quote if scope is complex.',
      },
      {
        id: 'premium',
        name: 'Premium Website',
        priceLabel: '$997+',
        baseEstimate: 997,
        isFrom: true,
        pagesIncluded: 7,
        pagesIncludedLabel: 'Up to 7 pages',
        summary:
          'Full business scope plus secure lead capture, cybersecurity layers, and launch-ready conversion handoff — reduce places where local leads slip through.',
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
        pageLimitNote: 'Extra pages beyond 7: +$97/page on estimator, or custom quote if scope is complex.',
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
        priceLabel: '$49–$149/mo',
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
    title: 'Operations & Technology Project Coordination',
    inquirySubject: 'Operations Coordination Inquiry — Stone Industries',
    serviceDisclaimer: logisticsFreightDisclaimer + ' ' + operationsCoordinationScopeNote,
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
    title: 'AI Receptionist & Workflow Automation',
    inquirySubject: 'AI Receptionist Inquiry — Stone Industries',
    serviceDisclaimer:
      aiWorkflowScopeNote +
      ' Monthly tool costs vary — quoted separately. Not a full AI agency or enterprise RAG program.',
    packages: [
      {
        id: 'ai-starter',
        name: 'AI Receptionist Starter',
        priceLabel: '$499',
        baseEstimate: 499,
        isFrom: false,
        summary: 'One AI receptionist or lead follow-up workflow with documented human handoff boundaries.',
        includes: [
          'Workflow review and call/intake routing plan',
          'One guarded receptionist or follow-up path using third-party AI voice/workflow tools',
          'Human-in-loop checkpoints and escalation rules',
          'Handoff notes and operator checklist',
        ],
        notIncluded: [
          'Emergency handling',
          'Legal, medical, or financial advice',
          'Guaranteed bookings or response times',
          'Employee replacement',
          'Compliance certification',
          'Unsupervised 24/7 agents',
        ],
      },
      {
        id: 'ai-business',
        name: 'AI Receptionist + Follow-up',
        priceLabel: '$999',
        baseEstimate: 999,
        isFrom: false,
        summary: 'Receptionist plus lead follow-up sequences with approval gates and safety boundaries.',
        includes: [
          'AI receptionist or intake assistant setup',
          'Lead follow-up workflow with human approval gates',
          'Secure prompt boundaries and escalation documentation',
          'Maintenance notes and monthly tool-cost guidance',
        ],
        notIncluded: [
          'Emergency handling',
          'Guaranteed bookings',
          'Compliance certifications',
          'Payment handling by AI',
          'Employee replacement',
        ],
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
      'Human handoff boundaries for receptionist and follow-up workflows',
      'No emergency, legal, medical, or financial advice by AI',
      'No payment or card handling by AI workflows',
      'Third-party tool costs disclosed — managed setup, not proprietary platform claims',
      'Prompt boundaries and privacy/workflow documentation',
    ],
  },
  {
    slug: 'mobile-app-mvp',
    title: 'Mobile App / MVP Prototyping',
    inquirySubject: 'Mobile App MVP Inquiry — Stone Industries',
    serviceDisclaimer: mobileMvpScopeNote,
    packages: [
      {
        id: 'concept-prototype',
        name: 'App Concept Prototype',
        priceLabel: '$699',
        baseEstimate: 699,
        isFrom: false,
        summary: 'Clickable mobile app concept with core screens and simple navigation — test the idea before full development.',
        includes: [
          'Discovery session on app goal and primary user flow',
          'Clickable prototype with core screens (typically 3–5)',
          'Simple navigation and placeholder content',
          'Shareable preview link or export for stakeholder review',
          'Written scope notes for a future build quote',
        ],
        notIncluded: [
          'Guaranteed App Store or Play Store approval',
          'Full custom backend or production database',
          'Regulated app compliance (HIPAA, PCI, etc.)',
          'Custom payment systems unless separately scoped',
          'Ongoing app maintenance',
        ],
      },
      {
        id: 'mvp-prototype',
        name: 'MVP Prototype',
        priceLabel: '$1,499+',
        baseEstimate: 1499,
        isFrom: true,
        summary: 'Broader clickable MVP with more screens, basic forms, and test-on-device handoff when scoped.',
        includes: [
          'Everything in App Concept Prototype',
          'Additional screens and user paths (typically up to 8–12)',
          'Basic form or intake flows in prototype',
          'Device test handoff notes and next-step build roadmap',
          '2 revision rounds on prototype scope',
        ],
        notIncluded: [
          'Production app store submission',
          'Enterprise backend, auth, or billing systems',
          'Regulated industry compliance programs',
          'Guaranteed user acquisition or revenue',
        ],
        includedAddOnIds: ['mvp-extra-screens'],
      },
      {
        id: 'mvp-iteration',
        name: 'Prototype + Iteration Sprint',
        priceLabel: '$2,499+',
        baseEstimate: 2499,
        isFrom: true,
        summary: 'MVP prototype plus one iteration sprint after stakeholder feedback — still pre-production scope.',
        includes: [
          'MVP Prototype deliverables',
          'One structured iteration sprint after feedback',
          'Updated flows and revised clickable prototype',
          'Build-vs-buy and full-development quote outline',
        ],
        notIncluded: [
          'Full native or cross-platform production app build',
          'App Store compliance guarantees',
          'Custom payment checkout unless separately quoted',
        ],
        includedAddOnIds: ['mvp-extra-screens', 'mvp-user-testing'],
      },
    ],
    addOns: [
      {
        id: 'mvp-extra-screens',
        name: 'Extra prototype screens',
        priceLabel: '+$75/screen',
        kind: 'per-unit',
        estimateAdd: 75,
        unitLabel: 'screen',
        maxUnits: 12,
        showForPackages: ['concept-prototype', 'mvp-prototype'],
      },
      {
        id: 'mvp-user-testing',
        name: 'User testing session notes',
        priceLabel: '+$199',
        kind: 'one-time',
        estimateAdd: 199,
        helpText: 'Structured notes from one stakeholder or friend-and-family test session — not formal UX research.',
        showForPackages: ['mvp-prototype', 'mvp-iteration'],
      },
      {
        id: 'monthly-mvp',
        name: 'Monthly prototype support',
        priceLabel: '$199–$499/mo',
        kind: 'monthly',
        estimateAdd: null,
        estimateNote: 'Billed monthly upfront — separate from one-time prototype total',
      },
    ],
    secureBullets: [
      'Prototype-only scope — no production secrets in public previews unless scoped',
      'No regulated compliance claims on MVP deliverables',
      'Clear handoff boundary between prototype and full custom development quote',
    ],
  },
  {
    slug: 'custom-pc-builds',
    title: 'Custom PC Builds & Upgrades',
    inquirySubject: 'Custom PC Build / Upgrade Inquiry — Stone Industries',
    serviceDisclaimer:
      pcBuildServiceScopeNote +
      ' ' +
      pcBuildPartsPricingNote +
      ' ' +
      pcBuildCompetitorNote +
      ' Typical full build timeline is about one week depending on parts shipping; simple upgrades may be faster. Final price depends on parts availability, case access, compatibility, complexity, and requested setup.',
    packages: [
      {
        id: 'parts-plan',
        name: 'Parts List / Upgrade Plan',
        priceLabel: '$49',
        baseEstimate: 49,
        isFrom: false,
        bestFor: 'Choosing compatible parts before you buy',
        partsNote: pcBuildPartsPricingNote,
        timelineNote: 'Usually 1–2 business days for a written parts or upgrade plan.',
        summary: 'Planning only — compatible parts list and upgrade path before you purchase components.',
        includes: [
          'Budget and use-case intake',
          'Compatible build or upgrade parts list',
          'Estimated parts cost range',
          'Upgrade path notes',
          'Planning fee may credit toward full build/upgrade within 14 days if you move forward',
        ],
        notIncluded: [
          'Physical installation or assembly',
          'Windows install or driver setup',
          'Troubleshooting or boot repair',
          'Parts purchase (quoted separately)',
        ],
      },
      {
        id: 'simple-upgrade',
        name: 'Simple Upgrade Install',
        priceLabel: '$79+',
        baseEstimate: 79,
        isFrom: true,
        bestFor: 'Easy drop-in upgrades for an existing Windows tower',
        useFor: [
          'RAM install',
          'SSD/storage install',
          'Wi‑Fi/Bluetooth card install',
          'Simple compatible GPU install when no power-supply, case, or BIOS issue is expected',
        ],
        partsNote: pcBuildPartsPricingNote,
        timelineNote: 'Often same-day or next-available when parts are on hand and case access is straightforward.',
        summary:
          'Simple = drop-in part install. Choose Core Upgrade if the job affects CPU, motherboard, power supply, or cooling.',
        includes: [
          'One simple component install, or a small set of simple drop-in installs if quoted together',
          'Basic boot check',
          'Basic driver check when relevant',
        ],
        notIncluded: [
          'Parts cost',
          'CPU upgrade',
          'Motherboard swap',
          'PSU replacement',
          'Major cooling changes',
          'Windows reinstall',
          'Complex troubleshooting',
          'Data recovery',
        ],
      },
      {
        id: 'core-upgrade',
        name: 'Core Upgrade Install',
        priceLabel: '$149+',
        baseEstimate: 149,
        isFrom: true,
        bestFor:
          'Major internal upgrades that affect the platform, power, cooling, or multiple connected parts',
        useFor: [
          'CPU upgrade',
          'Motherboard swap',
          'Power supply replacement',
          'Cooler/fan changes',
          'Multiple-part upgrade',
          'BIOS/boot compatibility work',
        ],
        partsNote: pcBuildPartsPricingNote,
        timelineNote: 'Timeline depends on parts, case access, and compatibility — often 1–3 days for scoped work.',
        summary:
          'Core = platform, power, cooling, or multi-part internal work. Choose Simple Upgrade for RAM, SSD, Wi‑Fi, or an easy GPU swap.',
        includes: [
          'Major component install',
          'Compatibility/fit check',
          'BIOS/boot check',
          'Basic cable management after install',
        ],
        notIncluded: [
          'Parts cost',
          'Windows reinstall unless needed/quoted',
          'Data recovery',
          'Guaranteed compatibility if customer supplied incompatible parts',
          'Complex troubleshooting beyond scoped install',
        ],
        includedAddOnIds: ['pc-cable-mgmt'],
      },
      {
        id: 'basic-assembly',
        name: 'Basic Tower Assembly',
        priceLabel: '$149',
        baseEstimate: 149,
        isFrom: false,
        bestFor: 'Physical assembly only — you already have approved compatible parts',
        partsNote: pcBuildPartsPricingNote,
        timelineNote: 'Typical assembly handoff in about 2–5 days after approved parts are available.',
        summary: 'Assemble a new tower from customer-approved parts — service fee only.',
        includes: [
          'Assemble provided/approved compatible parts',
          'Basic cable routing',
          'BIOS/boot check',
          'Basic handoff checklist',
        ],
        notIncluded: [
          'Parts cost',
          'Windows install or driver setup',
          'RGB software setup',
          'Data transfer',
          'Local delivery/setup',
          'Troubleshooting defective or incompatible customer parts',
        ],
        includedAddOnIds: ['pc-cable-mgmt'],
      },
      {
        id: 'standard-build',
        name: 'Standard Windows PC Build',
        priceLabel: '$199',
        baseEstimate: 199,
        isFrom: false,
        bestFor: 'Normal full desktop build with Windows and driver handoff',
        partsNote: pcBuildPartsPricingNote,
        timelineNote: 'Typical full build timeline is about one week depending on parts shipping.',
        summary: 'Full tower build plus Windows install and basic drivers when license/media is available.',
        includes: [
          'Tower assembly from approved parts list',
          'BIOS/boot check',
          'Basic cable management',
          'Windows install + basic driver setup when customer has/provides license or license is purchased separately',
          'Basic handoff',
        ],
        notIncluded: [
          'Parts cost or Windows license unless purchased separately',
          'RGB-heavy or showcase cable routing',
          'AIO install unless quoted/added',
          'Data transfer or local delivery/setup',
          'Guaranteed FPS or benchmark results',
        ],
        includedAddOnIds: ['pc-windows-drivers', 'pc-cable-mgmt'],
      },
      {
        id: 'gaming-build',
        name: 'Gaming / Performance Build',
        priceLabel: '$249',
        baseEstimate: 249,
        isFrom: false,
        bestFor: 'Gaming or workstation builds where GPU, airflow, and drivers matter',
        partsNote: pcBuildPartsPricingNote,
        timelineNote: 'Typical timeline is about one week depending on parts shipping; airflow and GPU setup included in service fee.',
        summary: 'Everything in Standard Windows PC Build, plus gaming/workstation-focused layout and airflow.',
        includes: [
          'Everything in Standard Windows PC Build',
          'GPU, storage, and fan setup',
          'Airflow check',
          'Cleaner cable management than Standard',
          'Driver-ready handoff',
        ],
        notIncluded: [
          'Parts cost',
          'Guaranteed FPS or benchmark performance',
          'RGB-heavy showcase layout (see Showcase package)',
          'AIO install unless quoted/added',
          'Data transfer or delivery/setup unless added',
        ],
        includedAddOnIds: ['pc-windows-drivers', 'pc-cable-mgmt'],
      },
      {
        id: 'showcase-build',
        name: 'Showcase / Complex Build',
        priceLabel: '$349+',
        baseEstimate: 349,
        isFrom: true,
        bestFor: 'RGB-heavy, AIO, compact case, or complex visual/cable layout',
        partsNote: pcBuildPartsPricingNote,
        timelineNote: 'Complex builds are quoted after scope review — often about one week+ depending on parts and layout.',
        summary: 'Everything in Gaming / Performance Build, plus visual layout, RGB, and compatible AIO when scoped.',
        includes: [
          'Everything in Gaming / Performance Build',
          'RGB/fan layout planning and baseline software setup',
          'Compatible AIO liquid cooler install when in scoped parts list',
          'Extended cable management and handoff checklist',
        ],
        notIncluded: [
          'Parts cost',
          'Custom open-loop liquid cooling',
          'Guaranteed thermals, FPS, or aesthetic outcomes',
          'Defective-part warranty or data recovery',
          'Delivery/setup unless added',
        ],
        includedAddOnIds: ['pc-windows-drivers', 'pc-aio-cooler', 'pc-rgb-setup', 'pc-cable-mgmt'],
      },
    ],
    addOns: [
      {
        id: 'pc-extra-storage',
        name: 'Extra storage drive install',
        priceLabel: '+$39/drive',
        kind: 'per-unit',
        estimateAdd: 39,
        unitLabel: 'drive',
        maxUnits: 4,
        helpText: 'For extra drives beyond the main scoped build or upgrade — not the primary drive in a simple upgrade job.',
        showForPackages: [
          'simple-upgrade',
          'core-upgrade',
          'basic-assembly',
          'standard-build',
          'gaming-build',
          'showcase-build',
        ],
      },
      {
        id: 'pc-wifi-bt',
        name: 'Wi-Fi/Bluetooth card install',
        priceLabel: '+$39',
        kind: 'one-time',
        estimateAdd: 39,
        showForPackages: ['simple-upgrade'],
        helpText: 'Use when the Wi‑Fi/Bluetooth card is an add-on beyond the one simple install already in the package.',
      },
      {
        id: 'pc-aio-cooler',
        name: 'AIO liquid cooler install',
        priceLabel: '+$79',
        kind: 'one-time',
        estimateAdd: 79,
        helpText: 'Closed-loop AIO only when case, board, and cooler are compatible — not custom open-loop.',
        showForPackages: ['core-upgrade', 'basic-assembly', 'standard-build', 'gaming-build'],
      },
      {
        id: 'pc-rgb-setup',
        name: 'RGB/fan software setup',
        priceLabel: '+$49',
        kind: 'one-time',
        estimateAdd: 49,
        showForPackages: ['core-upgrade', 'basic-assembly', 'standard-build', 'gaming-build'],
      },
      {
        id: 'pc-windows-drivers',
        name: 'Windows install + driver setup',
        priceLabel: '+$79',
        kind: 'one-time',
        estimateAdd: 79,
        helpText:
          'When not already included in the selected package. Customer must provide valid Windows license/media or purchase license separately.',
        showForPackages: ['simple-upgrade', 'core-upgrade', 'basic-assembly'],
      },
      {
        id: 'pc-data-transfer',
        name: 'Data transfer from old Windows PC',
        priceLabel: '+$79+',
        kind: 'one-time',
        estimateAdd: 79,
        estimateNote: 'From $79 depending on data size and drive access — not a data recovery guarantee.',
        showForPackages: [
          'simple-upgrade',
          'core-upgrade',
          'basic-assembly',
          'standard-build',
          'gaming-build',
          'showcase-build',
        ],
      },
      {
        id: 'pc-local-delivery',
        name: 'Local delivery/setup',
        priceLabel: '+$59+',
        kind: 'one-time',
        estimateAdd: 59,
        estimateNote: 'From $59 when scheduling allows in Fresno / Central Valley',
        showForPackages: ['basic-assembly', 'standard-build', 'gaming-build', 'showcase-build'],
      },
      {
        id: 'pc-failed-build-diagnostic',
        name: 'Troubleshoot failed customer build/upgrade',
        priceLabel: '$79 diagnostic',
        kind: 'one-time',
        estimateAdd: 79,
        helpText: 'Diagnostic fee for customer-started builds — repair labor or parts quoted separately in writing.',
        showForPackages: ['simple-upgrade', 'core-upgrade'],
      },
      {
        id: 'pc-cable-mgmt',
        name: 'Cable management cleanup',
        priceLabel: '+$49+',
        kind: 'one-time',
        estimateAdd: 49,
        estimateNote: 'From $49 for enhanced tidying beyond basic cable routing already in Core+ packages',
        showForPackages: ['simple-upgrade'],
      },
      {
        id: 'pc-dust-cleanup',
        name: 'Dust cleanup during upgrade',
        priceLabel: '+$39+',
        kind: 'one-time',
        estimateAdd: 39,
        estimateNote: 'From $39 when added during an open-case upgrade visit',
        showForPackages: ['simple-upgrade', 'core-upgrade'],
      },
    ],
    secureBullets: [
      'Customer-approved parts list before assembly or major install',
      'Compatibility, case-space, and PSU review before work begins',
      'Basic cable management and airflow check where scoped',
      'BIOS/boot verification and written handoff checklist',
      'Windows/driver setup only when scoped — customer license/media required',
    ],
  },
]

function attachAddOnDetails(addon: CatalogAddOn): CatalogAddOn {
  const detail = detailForAddOn(addon.id)
  return detail ? { ...addon, detail } : addon
}

function sortCatalogServices(services: CatalogService[]): CatalogService[] {
  return services.slice().sort((a, b) => {
    const ai = catalogServiceOrder.indexOf(a.slug as (typeof catalogServiceOrder)[number])
    const bi = catalogServiceOrder.indexOf(b.slug as (typeof catalogServiceOrder)[number])
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
  })
}

export const pricingCatalog: CatalogService[] = sortCatalogServices(
  pricingCatalogRaw.map((service) => ({
    ...service,
    addOns: service.addOns.map(attachAddOnDetails),
  })),
)

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
