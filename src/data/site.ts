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
  { label: 'Pricing', href: '#pricing' },
  { label: 'Why Stone', href: '#about' },
  { label: 'Future Vision', href: '#vision' },
  { label: 'Contact', href: '#contact' },
]

export const services: Service[] = [
  {
    title: 'Same-Day Tech Cleanup',
    description:
      'Virus pop-ups, slow laptops, Android cleanup, browser hijacks, updates, basic security hardening, and general troubleshooting for people who need their device usable again.',
    icon: Headset,
  },
  {
    title: '24-Hour Business Websites',
    description:
      'Fast one-page websites for local vendors, barbers, food trucks, mobile detailers, restaurants, creators, contractors, and service businesses that need a real link to send customers.',
    icon: Globe,
  },
  {
    title: 'Wi-Fi, Printer & POS Support',
    description:
      'Practical help for home offices and small businesses, including Wi-Fi checks, printer issues, basic POS support, documentation, and setup cleanup.',
    icon: Map,
  },
]

export const credibilitySignals: Capability[] = [
  {
    title: 'IT support background',
    description:
      'Stone Industries is led by Edward Stone, an IT support professional with hands-on experience across user support, Windows troubleshooting, Microsoft 365, device management, and documentation.',
    icon: ShieldCheck,
  },
  {
    title: 'Veteran-led discipline',
    description:
      'The operating style is direct: show up, define the problem, fix what can be fixed, document the next step, and avoid inflated promises.',
    icon: Cpu,
  },
  {
    title: 'Built for small business speed',
    description:
      'The current focus is not enterprise consulting theater. It is fast, practical service work for local businesses that need a cleaner website, working tech, and a better customer path now.',
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
