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

export type Service = {
  packageName: string
  title: string
  description: string
  tag: string
  scope: string[]
  pricingNote: string
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

export const navItems: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Vision', href: '#vision' },
  { label: 'Contact', href: '#contact' },
]

export const services: Service[] = [
  {
    packageName: 'Tech Cleanup Sprint',
    title: 'Same-Day Tech Cleanup',
    description:
      'Device cleanup, virus and pop-up troubleshooting, and practical same-day support for users who need problems handled—not escalated into a ticket maze.',
    tag: 'For home offices, small teams, and urgent fix requests.',
    scope: [
      'Virus, pop-up, and unwanted browser behavior cleanup',
      'Slow-device triage and basic troubleshooting',
      'Same-day or next-available support when scheduling allows',
    ],
    pricingNote: 'Quote-based. Scope confirmed before work begins.',
    inquiryLabel: 'Start Tech Cleanup Inquiry',
    inquirySubject: 'Tech Cleanup Inquiry — Stone Industries',
    icon: Wrench,
  },
  {
    packageName: '24-Hour Website Launch',
    title: '24-Hour Business Websites',
    description:
      'Focused one-page sites for local vendors, contractors, and service businesses that need a credible web presence launched quickly with clear scope and maintainable delivery.',
    tag: 'For local businesses that need to look professional fast.',
    scope: [
      'One-page business site with clear contact path',
      'Local vendors, contractors, and service businesses',
      'Fast launch with defined content and revision boundaries',
    ],
    pricingNote: 'Quote-based. Final scope and timeline confirmed before build.',
    inquiryLabel: 'Start Website Inquiry',
    inquirySubject: 'Website Launch Inquiry — Stone Industries',
    icon: Globe,
  },
  {
    packageName: 'Small Business Tech Support',
    title: 'Wi-Fi, Printer & POS Support',
    description:
      'Setup, cleanup, and basic troubleshooting for small-business networks, printers, and point-of-sale environments where downtime directly affects revenue.',
    tag: 'For shops, offices, and operators who depend on working tech daily.',
    scope: [
      'Wi-Fi setup, cleanup, and basic troubleshooting',
      'Printer setup and recurring issue triage',
      'Basic POS environment support and cleanup',
    ],
    pricingNote: 'Quote-based. On-site vs remote confirmed up front.',
    inquiryLabel: 'Start Tech Support Inquiry',
    inquirySubject: 'Tech Support Inquiry — Stone Industries',
    icon: Wifi,
  },
  {
    packageName: 'Logistics Coordination Support',
    title: 'Logistics Coordination',
    description:
      'Planning support, coordination, documentation, and operational follow-through for teams that need timing, accountability, and reliable movement across multiple inputs.',
    tag: 'For teams and partners that need structured coordination support.',
    scope: [
      'Planning support and vendor coordination',
      'Documentation and operational follow-through',
      'Subcontracting or scoped coordination inquiries',
    ],
    pricingNote: 'Quote-based. Deliverables and timeline defined before engagement.',
    inquiryLabel: 'Start Logistics Inquiry',
    inquirySubject: 'Logistics Coordination Inquiry — Stone Industries',
    icon: Map,
  },
  {
    packageName: 'AI Workflow Setup',
    title: 'AI Workflow Automation',
    description:
      'Practical AI automation for small businesses—intake helpers, document drafts, and repeatable workflow steps with human review, not unsupervised “autonomous agents.”',
    tag: 'For operators who want guarded automation with clear approval steps.',
    scope: [
      'Connect email, forms, spreadsheets, and website contact paths into simple automated workflows',
      'Set up guarded AI assistants for intake, FAQs, and internal checklists with clear human handoff',
      'Document what runs automatically, what needs approval, and how to maintain it',
    ],
    pricingNote: 'Quote-based. Scope, tools, and privacy boundaries confirmed before setup.',
    inquiryLabel: 'Start AI Workflow Inquiry',
    inquirySubject: 'AI Workflow Inquiry — Stone Industries',
    icon: Bot,
  },
]

export const inquiryTypes: InquiryType[] = [
  { label: 'Tech Cleanup', subject: 'Tech Cleanup Inquiry — Stone Industries' },
  { label: 'Website Launch', subject: 'Website Launch Inquiry — Stone Industries' },
  { label: 'Wi-Fi / Printer / POS', subject: 'Tech Support Inquiry — Stone Industries' },
  { label: 'Logistics Coordination', subject: 'Logistics Coordination Inquiry — Stone Industries' },
  { label: 'AI Workflow', subject: 'AI Workflow Inquiry — Stone Industries' },
  {
    label: 'Subcontracting / Capability Brief',
    subject: 'Subcontracting / Capability Brief Inquiry — Stone Industries',
  },
]

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
  'Veteran-led discipline',
  'Direct small-business support',
  'Subcontracting inquiries welcome',
  'No inflated claims',
] as const

export const inquiryBodyTemplate = `What I need:
Location (on-site or remote):
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
