import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Boxes,
  BriefcaseBusiness,
  Cpu,
  Crosshair,
  Layers,
  MapPin,
  Radar,
  Rocket,
  Server,
  ShieldCheck,
} from 'lucide-react'

import { builtServices } from './buildServices'
import { auditPagePath } from './revenueLeakAudit'

export type NavItem = {
  label: string
  href: string
}

export type { Service, ServiceTier } from './serviceTypes'

export type Capability = {
  title: string
  description: string
  icon: LucideIcon
}

export type RoadmapCapability = Capability & {
  status: string
  visionAnchor: string
}

export type InquiryType = {
  label: string
  subject: string
}

export const contactEmail = 'edward@stoneindustriesusa.com'
/** SSOT email address — alias of contactEmail for new imports. */
export const emailAddress = contactEmail
export const contactPhone = '559-579-9376'
export const contactPhoneHref = 'tel:+15595799376'
/** SSOT phone tel: href — alias of contactPhoneHref for new imports. */
export const phoneHref = contactPhoneHref

/** Standard subject-only mailto (no body) — semantic fallback for visible email links. */
export const emailMailto =
  'mailto:edward@stoneindustriesusa.com?subject=Stone%20Industries%20Inquiry'

/** Primary browser-based email action — Gmail web compose. */
export const gmailComposeUrl =
  'https://mail.google.com/mail/?view=cm&fs=1&to=edward@stoneindustriesusa.com&su=Stone%20Industries%20Inquiry'

export const siteLastUpdated = 'May 30, 2026'
export const siteContactBlurb =
  'Stone Industries accepts project inquiries by email, phone, and scheduled consultation.'
/** @deprecated Use siteContactBlurb — kept for import compatibility during cleanup */
export const siteLaunchStatus = siteContactBlurb

export const ctaBookRevenueLeakAudit = 'Book an AI Revenue Leak Audit'
export const ctaRequestCustomerEngineSprint = 'Request an AI Customer Engine Sprint'
export const ctaScheduleGeneralConsultation = 'Schedule a General Consultation'
export const ctaContactCompany = 'Contact Stone Industries'
export const defaultInquiryMailtoSubject = 'Stone Industries Inquiry'

/** Official Calendly booking URLs (May 2026). */
export const calendlyRevenueLeakAuditUrl =
  'https://calendly.com/edward-stoneindustriesusa/30min'
export const calendlyGeneralConsultationUrl =
  'https://calendly.com/edward-stoneindustriesusa/general-business-tech-consultation'

/** Safe defaults for off-site booking links (Calendly). */
export const externalBookingLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const

export function isCalendlyBookingUrl(href: string): boolean {
  return (
    href === calendlyRevenueLeakAuditUrl || href === calendlyGeneralConsultationUrl
  )
}

export const serviceAreaPrimary = 'Fresno & Central Valley, California'
export const serviceAreaShort = 'Fresno / Central Valley'
export const serviceAreaContactLabel = 'Fresno & Central Valley, CA'
export const serviceAreaOnSite =
  'On-site support in the Fresno area and greater Central Valley when scheduling allows.'
export const serviceAreaRemote =
  'Remote support available for websites, AI receptionist setup, mobile MVP prototypes, and operations coordination.'
export const serviceAreaSeoPhrase = 'Fresno and Central Valley, California'

export const pricingPagePath = `${import.meta.env.BASE_URL}pricing.html`
export const servicesPagePath = `${import.meta.env.BASE_URL}services.html`
export const visionPagePath = `${import.meta.env.BASE_URL}vision.html`

export const navItems: NavItem[] = [
  { label: 'Services', href: servicesPagePath },
  { label: 'Pricing', href: pricingPagePath },
  { label: 'Audit', href: auditPagePath },
  { label: 'About', href: '#about' },
  { label: 'Vision', href: visionPagePath },
  { label: 'Contact', href: '#contact' },
]

export const businessEntityLabel = 'Stone Industries LLC — certified LLC'

/** Factual certifications — do not imply awarded contracts or agency endorsement. */
export const businessCertifications = [
  {
    label: 'Certified VOSB',
    short: 'Certified Veteran-Owned Small Business',
  },
  {
    label: 'Certified SDVOSB',
    short: 'Certified Service-Disabled Veteran-Owned Small Business',
  },
  {
    label: 'SAM.gov-registered contractor',
    short: 'Active SAM.gov registration for contractor, subcontractor, and teaming visibility',
  },
] as const

export const govContractingTrustDisclaimer =
  'Certifications and registrations are provided for qualification context only and do not imply agency endorsement, contract award, or past performance.'

/** One-line footer / static-page trust signal — factual only. */
export const footerCertificationsCompact = `${businessCertifications.map((cert) => cert.label).join(' · ')} · ${serviceAreaShort}`

/** Hero micro-row — factual only; full disclaimer lives in About/Footer (STONE-034). */
export const heroCertificationsMicro =
  'Certified VOSB · Certified SDVOSB · SAM.gov Registered'

export const heroEntityMicro = 'Stone Industries LLC'

export const qualityTrustPoints = [
  'Written scope before work begins',
  'Clear quotes and service boundaries',
  'Secure inquiry capture and no card storage on this site',
  'Professional handoff, documentation, and follow-up',
] as const

export type RecurringCarePath = {
  name: string
  detail: string
  pricingHref: string
}

export const recurringCarePaths: RecurringCarePath[] = [
  {
    name: 'Website Care',
    detail: 'Monthly website updates and small support after launch — optional add-on on website packages.',
    pricingHref: `${import.meta.env.BASE_URL}pricing.html?service=business-websites#package-estimator`,
  },
  {
    name: 'Tech Support Retainer',
    detail: 'Monthly on-call support for small offices — scoped, not full MSP.',
    pricingHref: `${import.meta.env.BASE_URL}pricing.html?service=wifi-printer-pos#package-estimator`,
  },
  {
    name: 'AI Receptionist Management',
    detail: 'Monthly workflow tuning and support — third-party tool costs quoted separately.',
    pricingHref: `${import.meta.env.BASE_URL}pricing.html?service=ai-workflow-automation#package-estimator`,
  },
  {
    name: 'Operations / Automation Care',
    detail: 'Monthly coordination support for tracking, vendors, and workflow follow-through.',
    pricingHref: `${import.meta.env.BASE_URL}pricing.html?service=logistics-coordination#package-estimator`,
  },
]

export const pricingDisclaimer =
  'Fixed package prices apply to listed scope. Final quote confirmed in writing before work begins.'

export const paymentNote =
  'No online checkout on this site. Fixed packages for defined scope; custom quote when unclear. Hosted invoice or payment link after written quote. Deposits on larger jobs; final balance before handoff. No card data collected here.'

/** Shown on service/pricing pages — honest scope, no compliance or hacker-proof claims. */
export const securityPackageDisclaimer =
  'Security-conscious setup is included where applicable, but no website or system can be guaranteed hacker-proof. Stone Industries does not claim PCI, HIPAA, SOC 2, or government compliance unless separately contracted and documented.'

export const services = builtServices

/** Map catalog slug → inquiry dropdown title (matches Supabase + static forms). */
export const serviceSlugToTitle: Record<string, string> = Object.fromEntries(
  services.map((service) => [service.slug, service.title]),
)

export function resolveServiceTitleFromSlug(slug: string): string | undefined {
  return serviceSlugToTitle[slug]
}

export function resolveServiceFromQuery(): string {
  if (typeof window === 'undefined') return ''
  const slug = new URLSearchParams(window.location.search).get('service')
  if (!slug) return ''
  return resolveServiceTitleFromSlug(slug) ?? ''
}

export function buildPricingServiceHref(slug: string): string {
  return `${pricingPagePath}?service=${encodeURIComponent(slug)}`
}

/** Homepage inquiry deep link — preselects service in Contact form via ?service= slug. */
export function buildContactInquiryHref(slug: string): string {
  return `${import.meta.env.BASE_URL}?service=${encodeURIComponent(slug)}#contact`
}

export const inquiryTypes: InquiryType[] = [
  { label: 'Tier 1 IT / Tech Cleanup', subject: 'Tier 1 IT Support Inquiry — Stone Industries' },
  { label: 'Website Launch', subject: 'Website Launch Inquiry — Stone Industries' },
  { label: 'Wi-Fi / Printer / POS', subject: 'Tech Support Inquiry — Stone Industries' },
  { label: 'Custom PC Build / Upgrade', subject: 'Custom PC Build / Upgrade Inquiry — Stone Industries' },
  {
    label: 'AI Receptionist / Workflow',
    subject: 'AI Receptionist Inquiry — Stone Industries',
  },
  { label: 'Mobile App / MVP Prototype', subject: 'Mobile App MVP Inquiry — Stone Industries' },
  {
    label: 'Operations & Technology Coordination',
    subject: 'Operations Coordination Inquiry — Stone Industries',
  },
  {
    label: 'Subcontracting / Capability Brief',
    subject: 'Subcontracting / Capability Brief Inquiry — Stone Industries',
  },
]

export const inquiryServiceOptions = [
  'AI Revenue Leak Audit',
  'AI Customer Engine Sprint',
  'Managed AI Ops',
  'BidSignal First Award Sprint',
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
    title: 'Independent contractors and small operators',
    description: 'Fixed packages for defined scope, plus custom quotes when work is unclear.',
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
    visionAnchor: 'bigger-vision',
    icon: Radar,
  },
  {
    title: 'AI-assisted operations',
    description:
      'Planned capability to support analysis and operator workflows with human oversight—not a deployed product.',
    status: 'Planned capability — not deployed',
    visionAnchor: 'next-phase',
    icon: Bot,
  },
  {
    title: 'Autonomous logistics',
    description:
      'Long-range development for movement, sustainment, and infrastructure systems that reduce logistics friction.',
    status: 'Future capability — not available now',
    visionAnchor: 'bigger-vision',
    icon: Boxes,
  },
  {
    title: 'Resilient infrastructure',
    description:
      'Future-direction work on dependable systems and operational continuity under stress.',
    status: 'Research roadmap — not for purchase',
    visionAnchor: 'bigger-vision',
    icon: Server,
  },
]

export type VisionDirection = {
  anchor: string
  title: string
  summary: string
  icon: LucideIcon
}

export const visionDirections: VisionDirection[] = [
  {
    anchor: 'local-first',
    title: 'Local First',
    summary: 'Earn trust in Fresno and the Central Valley with fixed-scope delivery.',
    icon: MapPin,
  },
  {
    anchor: 'current-focus',
    title: 'Current Focus',
    summary: 'Websites, secure lead capture, Tier 1 IT, AI receptionist workflows, and mobile MVP prototypes.',
    icon: Crosshair,
  },
  {
    anchor: 'next-phase',
    title: 'Next Phase',
    summary: 'Recurring care plans, stronger automation support, and software-style products.',
    icon: Layers,
  },
  {
    anchor: 'bigger-vision',
    title: 'Bigger Vision',
    summary: 'Larger infrastructure, coordination systems, and long-range research — when earned.',
    icon: Rocket,
  },
]

export const trustChips = [
  'Fresno & Central Valley service area',
  'Veteran-led discipline',
  'Direct small-business support',
  'Subcontracting inquiries welcome',
  'No inflated claims',
] as const

export const inquiryBodyTemplate = `Service needed:
Location (city/area — on-site or remote):
Timeline/deadline:
Photos/screenshots (if relevant):
Best callback time:
`

export function buildMailto(subject: string, body?: string) {
  const params = new URLSearchParams()
  params.set('subject', subject)
  if (body) params.set('body', body)
  // Use %20 — some mail clients ignore or break mailto when query uses + for spaces.
  return `mailto:${contactEmail}?${params.toString().replace(/\+/g, '%20')}`
}

export function buildGmailComposeUrl(subject: string): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: contactEmail,
    su: subject,
  })
  return `https://mail.google.com/mail/?${params.toString()}`
}

export const capabilityBriefPath = `${import.meta.env.BASE_URL}capability-brief.html`
