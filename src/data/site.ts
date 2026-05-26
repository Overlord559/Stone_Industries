import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Boxes,
  BriefcaseBusiness,
  Cpu,
  Globe,
  Map,
  Radar,
  Server,
  ShieldCheck,
  Wifi,
  Wrench,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
}

export type ServiceTier = {
  name: string
  startingAt: string
  summary: string
  includes: string[]
  notIncluded: string[]
}

export type Service = {
  slug: string
  packageName: string
  title: string
  description: string
  tag: string
  scope: string[]
  /** Practical secure-by-default deliverables — no compliance or hacker-proof claims. */
  securityIncluded: string[]
  whoFor: string
  startingAtLabel: string
  pricingNote: string
  pricingTiers: ServiceTier[]
  detailPath: string
  detailPagePath: string
  pricingPageLabel: string
  inquiryLabel: string
  inquirySubject: string
  icon: LucideIcon
}

export type Capability = {
  title: string
  description: string
  icon: LucideIcon
}

export type RoadmapCapability = Capability & {
  status: string
}

export type InquiryType = {
  label: string
  subject: string
}

export const contactEmail = 'stoneindustries0.llc@gmail.com'
export const contactPhone = '559-579-9376'
export const contactPhoneHref = 'tel:+15595799376'

export const serviceAreaPrimary = 'Fresno & Central Valley, California'
export const serviceAreaShort = 'Fresno / Central Valley'
export const serviceAreaContactLabel = 'Fresno & Central Valley, CA'
export const serviceAreaOnSite =
  'On-site support in the Fresno area and greater Central Valley when scheduling allows.'
export const serviceAreaRemote =
  'Remote support available for websites, AI workflow setup, and logistics coordination.'
export const serviceAreaSeoPhrase = 'Fresno and Central Valley, California'

export const navItems: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: `${import.meta.env.BASE_URL}pricing.html` },
  { label: 'About', href: '#about' },
  { label: 'Vision', href: '#vision' },
  { label: 'Contact', href: '#contact' },
]

export const pricingPagePath = `${import.meta.env.BASE_URL}pricing.html`
export const servicesPagePath = `${import.meta.env.BASE_URL}services.html`

export const pricingDisclaimer =
  'Starting prices are guides only—not fixed guarantees. Final quote depends on scope, timeline, tools, location (on-site vs remote), and complexity.'

export const paymentNote =
  'No online checkout on this site. Payment details confirmed after quote. An online payment link can be provided when available.'

/** Shown on service/pricing pages — honest scope, no compliance or hacker-proof claims. */
export const securityPackageDisclaimer =
  'Security-conscious setup is included where applicable, but no website or system can be guaranteed hacker-proof. Stone Industries does not claim PCI, HIPAA, SOC 2, or government compliance unless separately contracted and documented.'

export const services: Service[] = [
  {
    slug: 'tech-cleanup',
    packageName: 'Tech Cleanup Sprint',
    title: 'Same-Day Tech Cleanup',
    description:
      'Device cleanup, virus and pop-up troubleshooting, and practical same-day support for users who need problems handled—not escalated into a ticket maze.',
    tag: 'For home offices, small teams, and urgent fix requests.',
    whoFor: 'Home offices, small teams, and anyone with urgent pop-ups, slow devices, or basic cleanup needs.',
    scope: [
      'Virus, pop-up, and unwanted browser behavior cleanup',
      'Slow-device triage and basic troubleshooting',
      'Same-day or next-available support when scheduling allows',
      'Browser/account safety review and scam-prevention basics where applicable',
    ],
    securityIncluded: [
      'Browser and account safety review',
      'Suspicious extension and unwanted app cleanup',
      'Update and checkup guidance',
      'Backup and recovery recommendations',
      'Phishing and scam-prevention basics',
    ],
    startingAtLabel: 'Packages from $49',
    pricingNote: pricingDisclaimer,
    pricingTiers: [
      {
        name: 'Quick Cleanup',
        startingAt: 'Starting at $49',
        summary: 'Remote triage and focused cleanup for one device.',
        includes: [
          'Pop-up / unwanted software review',
          'Browser cleanup guidance',
          'Basic slow-device triage',
          'Account safety and scam-prevention basics',
        ],
        notIncluded: ['Hardware repair', 'Full network redesign', 'Guaranteed same-hour response'],
      },
      {
        name: 'Deep Cleanup',
        startingAt: 'Starting at $99',
        summary: 'More thorough cleanup with follow-up notes.',
        includes: ['Deeper device cleanup session', 'Startup item / nuisance software review', 'Written recap of what changed'],
        notIncluded: ['New hardware', 'Enterprise security contracts', 'Ongoing unlimited support'],
      },
      {
        name: 'Urgent / On-site',
        startingAt: 'Starting at $149 · quote-based',
        summary: 'Priority help in the Fresno / Central Valley area when scheduling allows.',
        includes: ['On-site visit when available', 'Hands-on troubleshooting', 'Scope confirmed before work begins'],
        notIncluded: ['24/7 guaranteed availability', 'After-hours without prior agreement'],
      },
    ],
    detailPath: 'services/tech-cleanup.html',
    detailPagePath: `${import.meta.env.BASE_URL}services/tech-cleanup.html`,
    pricingPageLabel: 'View Tech Cleanup Pricing',
    inquiryLabel: 'Email Tech Cleanup Inquiry',
    inquirySubject: 'Tech Cleanup Inquiry — Stone Industries',
    icon: Wrench,
  },
  {
    slug: 'business-websites',
    packageName: '24-Hour Website Launch',
    title: '24-Hour Business Websites',
    description:
      'Focused one-page sites for local vendors, contractors, and service businesses that need a credible web presence launched quickly with clear scope and maintainable delivery.',
    tag: 'For local businesses that need to look professional fast.',
    whoFor: 'Local vendors, contractors, and service businesses that need a credible one-page presence fast.',
    scope: [
      'One-page business site with clear contact path',
      'Local vendors, contractors, and service businesses',
      'Fast launch with defined content and revision boundaries',
      'Privacy, terms, secure inquiry path, and baseline hosting headers where applicable',
    ],
    securityIncluded: [
      'Privacy and terms pages',
      'Secure inquiry form with protected lead capture (no admin keys in the site)',
      'Netlify baseline security headers on launch',
      'Stripe-hosted payment readiness (Payment Link after quote — no card data on your site)',
      'Post-launch QA checklist for forms and contact paths',
    ],
    startingAtLabel: 'Packages from $199',
    pricingNote: pricingDisclaimer,
    pricingTiers: [
      {
        name: 'One-Page Launch',
        startingAt: 'Starting at $199',
        summary: 'Simple one-page site with contact path and mobile-friendly layout.',
        includes: [
          'One-page layout',
          'Contact / inquiry path with privacy + terms',
          'Secure lead capture baseline and launch checklist',
        ],
        notIncluded: ['Unlimited revisions', 'Custom ecommerce', 'Copywriting for every section unless scoped'],
      },
      {
        name: 'Local Business Site',
        startingAt: 'Starting at $399',
        summary: 'Stronger one-page site with clearer service positioning.',
        includes: ['Expanded one-page sections', 'Service / offer clarity', 'Launch + handoff notes'],
        notIncluded: ['Multi-page CMS', 'Booking backend', 'Ongoing monthly edits without agreement'],
      },
      {
        name: 'Premium / Fast Custom',
        startingAt: 'Starting at $699+',
        summary: 'Higher-touch launch when timeline and scope need more flexibility.',
        includes: ['Custom section planning', 'Priority launch window when available', 'Defined revision rounds'],
        notIncluded: ['Enterprise portal builds', 'Unlimited future changes'],
      },
    ],
    detailPath: 'services/business-websites.html',
    detailPagePath: `${import.meta.env.BASE_URL}services/business-websites.html`,
    pricingPageLabel: 'View Website Packages',
    inquiryLabel: 'Email Website Inquiry',
    inquirySubject: 'Website Launch Inquiry — Stone Industries',
    icon: Globe,
  },
  {
    slug: 'wifi-printer-pos',
    packageName: 'Small Business Tech Support',
    title: 'Wi-Fi, Printer & POS Support',
    description:
      'Setup, cleanup, and basic troubleshooting for small-business networks, printers, and point-of-sale environments where downtime directly affects revenue.',
    tag: 'For shops, offices, and operators who depend on working tech daily.',
    whoFor: 'Shops, offices, and operators who need working Wi-Fi, printers, or basic POS environments.',
    scope: [
      'Wi-Fi setup, cleanup, and basic troubleshooting',
      'Printer setup and recurring issue triage',
      'Basic POS environment support and cleanup',
      'Wi-Fi password, guest network, and POS safety guidance — not formal PCI compliance',
    ],
    securityIncluded: [
      'Wi-Fi password and security settings review',
      'Guest network recommendation when appropriate',
      'Printer access and sharing review',
      'POS environment safety guidance',
      'Practical hardening notes — not PCI compliance certification',
    ],
    startingAtLabel: 'Packages from $49',
    pricingNote: pricingDisclaimer,
    pricingTiers: [
      {
        name: 'Remote / Basic Setup',
        startingAt: 'Starting at $49',
        summary: 'Remote guidance or light cleanup for one issue area.',
        includes: ['Remote triage', 'Basic setup guidance', 'Next-step recommendations'],
        notIncluded: ['New hardware purchase', 'ISP contract negotiation', 'Full cabling project'],
      },
      {
        name: 'On-site Setup',
        startingAt: 'Starting at $99',
        summary: 'Hands-on setup in the Fresno / Central Valley when scheduling allows.',
        includes: ['On-site Wi-Fi or printer setup', 'Basic verification testing', 'Operator walkthrough'],
        notIncluded: ['Enterprise network design', 'After-hours emergency SLA'],
      },
      {
        name: 'Small Business Tech Visit',
        startingAt: 'Starting at $149+',
        summary: 'Broader visit for mixed Wi-Fi, printer, and POS cleanup needs.',
        includes: ['Multi-issue triage visit', 'Documented findings', 'Quote for follow-up if needed'],
        notIncluded: ['Full POS vendor contract work without scope review'],
      },
    ],
    detailPath: 'services/wifi-printer-pos.html',
    detailPagePath: `${import.meta.env.BASE_URL}services/wifi-printer-pos.html`,
    pricingPageLabel: 'View Wi-Fi / POS Support',
    inquiryLabel: 'Email Tech Support Inquiry',
    inquirySubject: 'Tech Support Inquiry — Stone Industries',
    icon: Wifi,
  },
  {
    slug: 'logistics-coordination',
    packageName: 'Logistics Coordination Support',
    title: 'Logistics Coordination',
    description:
      'Planning support, coordination, documentation, and operational follow-through for teams that need timing, accountability, and reliable movement across multiple inputs.',
    tag: 'For teams and partners that need structured coordination support.',
    whoFor: 'Teams, vendors, and partners that need planning, documentation, and follow-through—not autonomous logistics software.',
    scope: [
      'Planning support and vendor coordination',
      'Documentation and operational follow-through',
      'Subcontracting or scoped coordination inquiries',
      'Minimal data collection and secure handoff checklists where applicable',
    ],
    securityIncluded: [
      'Minimal data collection for coordination tasks',
      'Shared-access cleanup guidance',
      'Secure handoff checklist for vendors and contacts',
      'Vendor and contact organization',
      'Simple operations security notes — not compliance certification',
    ],
    startingAtLabel: 'Packages from $150',
    pricingNote: pricingDisclaimer,
    pricingTiers: [
      {
        name: 'Coordination Sprint',
        startingAt: 'Starting at $150',
        summary: 'Short coordination push with clear deliverables.',
        includes: ['Planning session / checklist', 'Vendor or task coordination', 'Status recap'],
        notIncluded: ['Autonomous logistics platform', 'Guaranteed contract outcomes'],
      },
      {
        name: 'Documentation / Follow-up Package',
        startingAt: 'Starting at $250',
        summary: 'Structured documentation and follow-through over a defined window.',
        includes: ['Documentation templates', 'Follow-up tracking', 'Handoff summary'],
        notIncluded: ['Full program management retainer unless scoped'],
      },
      {
        name: 'Subcontractor Support',
        startingAt: 'Quote-based',
        summary: 'Scoped support for prime/subcontracting coordination inquiries.',
        includes: ['Scope-defined coordination tasks', 'Written deliverables', 'Honest capability boundaries'],
        notIncluded: ['Implied contract wins', 'Past performance claims not documented'],
      },
    ],
    detailPath: 'services/logistics-coordination.html',
    detailPagePath: `${import.meta.env.BASE_URL}services/logistics-coordination.html`,
    pricingPageLabel: 'View Logistics Support',
    inquiryLabel: 'Email Logistics Inquiry',
    inquirySubject: 'Logistics Coordination Inquiry — Stone Industries',
    icon: Map,
  },
  {
    slug: 'ai-workflow-automation',
    packageName: 'Digital Assistant Setup',
    title: 'AI Automation & Digital Assistant Systems',
    description:
      'Guarded agentic-style workflows for small businesses—AI intake assistants, FAQ response helpers, internal task routing, and document/email automation with human approval at every customer-facing step.',
    tag: 'For operators who want practical digital assistants—not unsupervised autonomous agents.',
    whoFor:
      'Operators who want AI intake, FAQ, and workflow assistants with clear human review—digital secretary-style routing without replacing staff.',
    scope: [
      'AI intake assistant for website, email, and form inquiries with human handoff',
      'FAQ and customer-response assistant with approval before send',
      'Internal workflow automation across spreadsheets, checklists, and task routing',
      'Document and email process automation with documented approval gates',
      'Human approval for important actions; API keys and sensitive data kept server-side',
    ],
    securityIncluded: [
      'Human approval for important customer-facing actions',
      'No sensitive data collection unless scoped and necessary',
      'No payment or card handling by AI workflows',
      'API keys and integrations documented for server-side use only',
      'Prompt boundaries and privacy/workflow documentation',
    ],
    startingAtLabel: 'Packages from $99',
    pricingNote: pricingDisclaimer,
    pricingTiers: [
      {
        name: 'Workflow Audit',
        startingAt: 'Starting at $99',
        summary: 'Review current tools and map realistic AI assistant opportunities.',
        includes: ['Tool / workflow review', 'Human-in-loop recommendations', 'Priority list you can act on'],
        notIncluded: ['Unsupervised autonomous agents', 'Enterprise RAG build', 'Guaranteed ROI'],
      },
      {
        name: 'AI Intake / FAQ Assistant',
        startingAt: 'Starting at $250',
        summary: 'Guarded intake or FAQ digital assistant with approval steps documented.',
        includes: ['Intake or FAQ assistant setup', 'Human review checkpoints', 'Maintenance notes'],
        notIncluded: ['24/7 unsupervised AI ops', 'Compliance certifications not in scope'],
      },
      {
        name: 'Custom Digital Assistant Setup',
        startingAt: 'Starting at $500+',
        summary: 'Custom agentic-style workflow connections across tools you already use.',
        includes: ['Multi-step workflow mapping', 'Setup with approval gates', 'Operator handoff documentation'],
        notIncluded: ['Autonomous logistics or defense-grade autonomy claims'],
      },
    ],
    detailPath: 'services/ai-workflow-automation.html',
    detailPagePath: `${import.meta.env.BASE_URL}services/ai-workflow-automation.html`,
    pricingPageLabel: 'View AI Assistant Packages',
    inquiryLabel: 'Email AI Assistant Inquiry',
    inquirySubject: 'AI Assistant Inquiry — Stone Industries',
    icon: Bot,
  },
]

export const inquiryTypes: InquiryType[] = [
  { label: 'Tech Cleanup', subject: 'Tech Cleanup Inquiry — Stone Industries' },
  { label: 'Website Launch', subject: 'Website Launch Inquiry — Stone Industries' },
  { label: 'Wi-Fi / Printer / POS', subject: 'Tech Support Inquiry — Stone Industries' },
  { label: 'Logistics Coordination', subject: 'Logistics Coordination Inquiry — Stone Industries' },
  { label: 'AI Digital Assistant', subject: 'AI Assistant Inquiry — Stone Industries' },
  {
    label: 'Subcontracting / Capability Brief',
    subject: 'Subcontracting / Capability Brief Inquiry — Stone Industries',
  },
]

export const inquiryServiceOptions = [
  ...services.map((service) => service.title),
  'General Inquiry',
  'Subcontracting / Capability Brief',
] as const

export const whoWeWorkWith = [
  {
    title: 'Local small businesses',
    description: 'Shops, vendors, and operators who need practical tech or web help without enterprise overhead.',
  },
  {
    title: 'Contractors and solo operators',
    description: 'Fast website launches, cleanup support, and quote-based project inquiries.',
  },
  {
    title: 'Home office users',
    description: 'One-off device cleanup, Wi-Fi issues, and basic troubleshooting.',
  },
  {
    title: 'Prime and subcontracting partners',
    description: 'Operational support, documentation, and scoped coordination—not implied contract wins.',
  },
  {
    title: 'Early operational teams',
    description: 'Small teams that need dependable follow-through on support and coordination work.',
  },
] as const

export const messageChecklist = [
  'What you need and desired outcome',
  'Location (on-site) or remote support need',
  'Timeline or deadline',
  'Photos or screenshots if relevant',
  'Best callback time',
] as const

export const credibilitySignals: Capability[] = [
  {
    title: 'Veteran-led discipline',
    description:
      'Stone Industries operates with direct communication, respect for responsibility, and a preference for dependable results over inflated claims—grounded in an IT support and operational background.',
    icon: ShieldCheck,
  },
  {
    title: 'Direct support and subcontracting',
    description:
      'Available for local small-business support today and for subcontracting or teaming discussions where practical execution, documentation, and follow-through matter.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Services today, roadmap tomorrow',
    description:
      'Current work centers on support, delivery, and coordination clients can use now. Long-range areas such as DALRM and autonomous logistics remain future-direction efforts—not products for sale today.',
    icon: Cpu,
  },
]

export const futureVision: RoadmapCapability[] = [
  {
    title: 'DALRM',
    description:
      'Future research around resilient decision support, logistics awareness, and coordinated mission workflows.',
    status: 'Research direction — not sold today',
    icon: Radar,
  },
  {
    title: 'AI-assisted operations',
    description:
      'Planned capability to support analysis and operator workflows with human oversight—not a deployed product.',
    status: 'Planned capability — not deployed',
    icon: Bot,
  },
  {
    title: 'Autonomous logistics',
    description:
      'Long-range development for movement, sustainment, and infrastructure systems that reduce logistics friction.',
    status: 'Future capability — not available now',
    icon: Boxes,
  },
  {
    title: 'Resilient infrastructure',
    description:
      'Future-direction work on dependable systems and operational continuity under stress.',
    status: 'Research roadmap — not for purchase',
    icon: Server,
  },
]

export const trustChips = [
  'Fresno & Central Valley service area',
  'Veteran-led discipline',
  'Direct small-business support',
  'Subcontracting inquiries welcome',
  'No inflated claims',
] as const

export const inquiryBodyTemplate = `What I need:
Location (city/area — on-site or remote):
Timeline/deadline:
Photos/screenshots (if relevant):
Best callback time:
`

export function buildMailto(subject: string, body: string = inquiryBodyTemplate) {
  const params = new URLSearchParams()
  params.set('subject', subject)
  params.set('body', body)
  return `mailto:${contactEmail}?${params.toString()}`
}

export const capabilityBriefPath = `${import.meta.env.BASE_URL}capability-brief.html`
