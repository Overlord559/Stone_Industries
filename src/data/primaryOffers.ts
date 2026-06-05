import { Bot, Crosshair, Radar, Wrench, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import {
  ctaBookFreeRemoteReview,
  ctaFindBestFitPackage,
  priceFitCalculatorPath,
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
    title: 'Free Remote Revenue Leak Review',
    description:
      '15–20 minute public scan of your website, Google profile, booking flow, and follow-up path. We show 2–3 obvious leaks — no full report, no pressure.',
    ctaLabel: ctaBookFreeRemoteReview,
    href: auditPagePath,
    icon: Radar,
  },
  {
    title: 'AI Revenue Leak Audit',
    description:
      'Full written report in 48 hours: lead-loss score, top 5 leaks, fix plan, recommended package, 30-day proof check. $297 launch for first customers · $497 standard. 100% sprint credit within 7 days.',
    ctaLabel: 'See Paid Audit Details',
    href: `${auditPagePath}#paid-audit`,
    icon: Crosshair,
  },
  {
    title: 'AI Customer Engine Sprint',
    description:
      'Scoped sprint to wire lead capture, CRM, booking, follow-up workflows, and a simple dashboard — with human handoff, not a black-box autopilot.',
    ctaLabel: 'Request Customer Engine Sprint',
    href: `${import.meta.env.BASE_URL}pricing.html#customer-engine`,
    icon: Bot,
  },
  {
    title: 'Remote Business Tech Support',
    description:
      'Remote Quick Fix ($49–$99) and Business Tech Sessions ($149–$299) for email, CRM, Calendly, Workspace, and tactical software setup across California.',
    ctaLabel: 'View Remote Support',
    href: `${import.meta.env.BASE_URL}remote-support`,
    icon: Wrench,
  },
  {
    title: 'Managed AI Ops',
    description:
      'Ongoing human-reviewed workflow monitoring, dashboard reporting, and monthly optimization after your audit or sprint — $299–$997/mo.',
    ctaLabel: 'Discuss Managed AI Ops',
    href: `${import.meta.env.BASE_URL}pricing.html#managed-ops`,
    icon: Workflow,
  },
]

export const primaryOffersIntro =
  'California remote-first: start with a free revenue leak review, then move to paid audit or a scoped sprint when the leaks are real. Use the calculator to find your best-fit starting point.'

export const primaryOffersSecondaryCta = {
  label: ctaFindBestFitPackage,
  href: priceFitCalculatorPath,
}
