import { Bot, Crosshair, Radar, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import {
  buildMailto,
  ctaBookRevenueLeakAudit,
  ctaRequestCustomerEngineSprint,
} from './site'
import { auditPagePath } from './revenueLeakAudit'

export type PrimaryOffer = {
  title: string
  description: string
  ctaLabel: string
  href: string
  icon: LucideIcon
}

export const primaryOffers: PrimaryOffer[] = [
  {
    title: 'AI Revenue Leak Audit',
    description:
      'Human-reviewed audit of your website, Google Business Profile, follow-up, and offer clarity — with a practical fix plan for Fresno and Central Valley operators.',
    ctaLabel: ctaBookRevenueLeakAudit,
    href: auditPagePath,
    icon: Radar,
  },
  {
    title: 'AI Customer Engine',
    description:
      'Scoped sprint to wire lead capture, follow-up, and receptionist-style workflows with human handoff — not a black-box autopilot.',
    ctaLabel: ctaRequestCustomerEngineSprint,
    href: buildMailto('AI Customer Engine Sprint Request — Stone Industries'),
    icon: Bot,
  },
  {
    title: 'Managed AI Ops',
    description:
      'Ongoing human-reviewed AI operator support: follow-up drafts, review replies, landing improvements, and weekly optimization after your audit.',
    ctaLabel: 'Discuss Managed AI Ops',
    href: buildMailto('Managed AI Ops Inquiry — Stone Industries'),
    icon: Workflow,
  },
  {
    title: 'BidSignal First Award Sprint',
    description:
      'GovCon-focused sprint to sharpen discovery, fit, and first-bid path decisions using BidSignal-style discipline — separate from generic IT cleanup.',
    ctaLabel: 'Request BidSignal Sprint',
    href: buildMailto('BidSignal First Award Sprint Inquiry — Stone Industries'),
    icon: Crosshair,
  },
]

export const primaryOffersIntro =
  'Current launch focus: AI revenue and customer systems for local operators, plus a GovCon sprint lane. Supporting IT and website packages remain available when scoped.'
