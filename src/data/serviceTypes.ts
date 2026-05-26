import type { LucideIcon } from 'lucide-react'

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
