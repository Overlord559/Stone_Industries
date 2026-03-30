import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Boxes,
  BriefcaseBusiness,
  Cpu,
  Globe,
  Headset,
  Map,
  Radar,
  ShieldCheck,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
}

export type Service = {
  title: string
  description: string
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
    title: 'IT Help Desk',
    description:
      'Responsive operational support for users, devices, and everyday technical issues, with clear escalation, dependable follow-through, and communication suitable for support environments.',
    icon: Headset,
  },
  {
    title: 'Web Development',
    description:
      'Practical web systems, internal tools, and client-facing sites built for maintainability, clear requirements, and dependable delivery rather than design novelty.',
    icon: Globe,
  },
  {
    title: 'Logistics Planning & Coordination',
    description:
      'Structured planning and coordination support for teams that depend on timing, accountability, documentation, and reliable movement across multiple operational inputs.',
    icon: Map,
  },
]

export const credibilitySignals: Capability[] = [
  {
    title: 'Execution over theory',
    description:
      'Stone Industries is built around practical execution, disciplined follow-through, and the kind of consistency that helps clients move work forward with confidence.',
    icon: ShieldCheck,
  },
  {
    title: 'Veteran-led discipline',
    description:
      'Our operating posture reflects veteran-led discipline: direct communication, respect for responsibility, and a preference for dependable results over inflated claims.',
    icon: Cpu,
  },
  {
    title: 'Long-range capability building',
    description:
      'We focus on support, infrastructure, and planning work that is useful now while steadily building technical maturity for more advanced autonomous and resilient systems later.',
    icon: BriefcaseBusiness,
  },
]

export const futureVision: Capability[] = [
  {
    title: 'DALRM',
    description:
      'A future roadmap area focused on resilient decision support, logistics awareness, and coordinated mission workflows.',
    icon: Radar,
  },
  {
    title: 'AI-assisted operations',
    description:
      'Applied intelligence intended to support analysis, operator workflows, and faster decision-making while keeping human oversight central.',
    icon: Bot,
  },
  {
    title: 'Autonomous logistics',
    description:
      'Long-range capability development around movement, sustainment, and infrastructure systems designed to reduce friction in operational logistics.',
    icon: Boxes,
  },
]
