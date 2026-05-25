import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Boxes,
  BriefcaseBusiness,
  Cpu,
  Globe,
  Map,
  Radar,
  ShieldCheck,
  Wifi,
  Wrench,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
}

export type Service = {
  title: string
  description: string
  tag: string
  icon: LucideIcon
}

export type Capability = {
  title: string
  description: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Vision', href: '#vision' },
  { label: 'Contact', href: '#contact' },
]

export const services: Service[] = [
  {
    title: 'Same-Day Tech Cleanup',
    description:
      'Device cleanup, virus and pop-up troubleshooting, and practical same-day support for users who need problems handled—not escalated into a ticket maze.',
    tag: 'For home offices, small teams, and urgent fix requests.',
    icon: Wrench,
  },
  {
    title: '24-Hour Business Websites',
    description:
      'Focused one-page sites for local vendors, contractors, and service businesses that need a credible web presence launched quickly with clear scope and maintainable delivery.',
    tag: 'For local businesses that need to look professional fast.',
    icon: Globe,
  },
  {
    title: 'Wi-Fi, Printer & POS Support',
    description:
      'Setup, cleanup, and basic troubleshooting for small-business networks, printers, and point-of-sale environments where downtime directly affects revenue.',
    tag: 'For shops, offices, and operators who depend on working tech daily.',
    icon: Wifi,
  },
  {
    title: 'Logistics Coordination',
    description:
      'Planning support, coordination, documentation, and operational follow-through for teams that need timing, accountability, and reliable movement across multiple inputs.',
    tag: 'For teams and partners that need structured coordination support.',
    icon: Map,
  },
]

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

export const futureVision: Capability[] = [
  {
    title: 'DALRM',
    description:
      'A future roadmap area focused on resilient decision support, logistics awareness, and coordinated mission workflows—development direction, not a current offering.',
    icon: Radar,
  },
  {
    title: 'AI-assisted operations',
    description:
      'Applied intelligence intended to support analysis, operator workflows, and faster decision-making while keeping human oversight central—planned capability, not deployed product.',
    icon: Bot,
  },
  {
    title: 'Autonomous logistics',
    description:
      'Long-range capability development around movement, sustainment, and infrastructure systems designed to reduce friction in operational logistics—future research direction.',
    icon: Boxes,
  },
]

export const trustChips = [
  'Veteran-led discipline',
  'Direct small-business support',
  'Subcontracting inquiries welcome',
  'No inflated claims',
] as const
