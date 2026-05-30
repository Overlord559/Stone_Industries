import type { LucideIcon } from 'lucide-react'
import { Bot, Boxes, Globe, Map, Smartphone, Wifi, Wrench } from 'lucide-react'

import {
  lowestPackagePrice,
  pricingCatalog,
  type CatalogPackage,
  type CatalogService,
} from './pricingCatalog'
import type { Service, ServiceTier } from './serviceTypes'

type ServiceMeta = {
  packageName: string
  description: string
  tag: string
  whoFor: string
  scope: string[]
  securityIncluded: string[]
  icon: LucideIcon
  detailPath: string
  pricingPageLabel: string
  displayTier?: 'primary' | 'secondary'
}

const metaBySlug: Record<string, ServiceMeta> = {
  'custom-pc-builds': {
    packageName: 'Desktop Tower Build & Upgrade',
    description:
      'Windows desktop tower builds and upgrades from compatible parts — planning, assembly, setup, and local handoff. Parts quoted separately; Stone charges a clear service fee.',
    tag: 'First-money priority — local help choosing parts, upgrading a tower, or getting a desktop assembled.',
    whoFor:
      'Gamers, creators, and home-office users with desktop towers who want local planning, upgrades, assembly, and handoff — not laptop or phone repair.',
    scope: [
      'New tower desktop builds and existing Windows desktop tower upgrades',
      'GPU, RAM, SSD, CPU, motherboard, PSU, Wi-Fi card, and fan upgrades when compatible',
      'Parts list / upgrade planning, assembly, BIOS/boot check, and optional Windows setup',
      'Mini, mid, and full tower cases — Windows only',
    ],
    securityIncluded: [],
    icon: Boxes,
    detailPath: 'services/custom-pc-builds.html',
    pricingPageLabel: 'Compare PC Build Packages',
    displayTier: 'secondary',
  },
  'tech-cleanup': {
    packageName: 'Tech Cleanup Sprint',
    description:
      'Tier 1 IT support and Windows cleanup — virus and pop-up troubleshooting, and practical same-day help when scheduling allows. No phones or Linux; macOS case-by-case only.',
    tag: 'First-money priority — urgent Windows PC fixes for home offices and small teams.',
    whoFor:
      'Windows PC users with urgent pop-ups, slow devices, or basic cleanup needs — not phone repair or Linux support.',
    scope: [
      'Windows computers only — no phones or Linux; macOS case-by-case depending on issue',
      'Fixed-scope cleanup packages with clear deliverables',
      'Virus, pop-up, and unwanted browser behavior cleanup',
      'Same-day or next-available support when scheduling allows',
    ],
    securityIncluded: [],
    icon: Wrench,
    detailPath: 'services/tech-cleanup.html',
    pricingPageLabel: 'Compare Tier 1 IT Packages',
    displayTier: 'secondary',
  },
  'wifi-printer-pos': {
    packageName: 'Small Business Tech Support',
    description:
      'Practical Wi-Fi, printer, and POS support — quick fixes and setup visits, not a full managed IT or help-desk contract.',
    tag: 'For shops and offices that need working tech — not enterprise MSP coverage.',
    whoFor: 'Shops, offices, and operators who need working Wi-Fi, printers, or basic POS environments.',
    scope: [
      'Quick fix through small-office setup tiers',
      'Wi-Fi, printer, and POS safety guidance — not PCI certification',
      'On-site in Fresno / Central Valley when scheduling allows',
    ],
    securityIncluded: [],
    icon: Wifi,
    detailPath: 'services/wifi-printer-pos.html',
    pricingPageLabel: 'Compare Wi-Fi / POS Packages',
    displayTier: 'secondary',
  },
  'business-websites': {
    packageName: '24-Hour Website Launch',
    description:
      'Transparent page-count website packages for local businesses — fast launch, optional 3D/interactive sections (safe CSS/L3 patterns before heavy WebGL), secure lead capture, and clear scope.',
    tag: 'When the prospect has a weak or missing site — not a full marketing or SEO agency replacement.',
    whoFor:
      'Local vendors and service businesses that want fixed website packages instead of open-ended agency retainers.',
    scope: [
      'Page-count packages (1 / 5 / 7 pages) with basic SEO/meta',
      'Optional interactive/3D sections quoted when the business needs more than flat layout',
      'Secure lead capture and cybersecurity layers where scoped',
    ],
    securityIncluded: [],
    icon: Globe,
    detailPath: 'services/business-websites.html',
    pricingPageLabel: 'Compare Website Packages',
    displayTier: 'secondary',
  },
  'ai-workflow-automation': {
    packageName: 'AI Receptionist Setup',
    description:
      'Stone Industries helps small businesses set up AI receptionist and lead follow-up workflows using third-party AI voice/workflow tools, configured with human handoff boundaries.',
    tag: 'Managed monthly service possible where tool costs vary — quoted separately.',
    whoFor:
      'Small businesses that miss calls or slow-follow leads — not employee replacement or guaranteed bookings.',
    scope: [
      'AI receptionist and lead follow-up workflow setup',
      'Third-party AI voice/workflow tools configured with human escalation',
      'Starter packages from one guarded workflow upward',
      'Not emergency handling, legal/medical/financial advice, or compliance certification',
    ],
    securityIncluded: [],
    icon: Bot,
    detailPath: 'services/ai-workflow-automation.html',
    pricingPageLabel: 'Compare AI Receptionist Packages',
    displayTier: 'secondary',
  },
  'mobile-app-mvp': {
    packageName: 'Mobile MVP Prototype',
    description:
      'Clickable mobile app concepts and MVP prototypes for business owners who want to test an app idea before paying for full custom development.',
    tag: 'Prototype-first — full production apps quoted separately after validation.',
    whoFor:
      'Business owners with an app idea who need a clickable concept before committing to full custom development.',
    scope: [
      'Clickable prototype with core screens and navigation',
      'Shareable preview for stakeholder feedback',
      'Written next-step quote outline for production build',
      'Not guaranteed App Store approval or enterprise backend',
    ],
    securityIncluded: [],
    icon: Smartphone,
    detailPath: 'services/mobile-app-mvp.html',
    pricingPageLabel: 'Compare Mobile MVP Packages',
    displayTier: 'primary',
  },
  'logistics-coordination': {
    packageName: 'Operations & Technology Project Coordination',
    description:
      'Simple operations and technology project coordination: scheduling, vendor follow-up, rollout tracking, checklists, documentation, and tech project organization.',
    tag: 'Secondary capability — narrow coordination help, not freight or regulated logistics.',
    whoFor:
      'Small teams that need rollout tracking and vendor follow-through — not a freight broker, carrier, or 3PL.',
    scope: [
      'Scheduling, checklists, documentation, and tech project organization',
      'Vendor follow-up and rollout tracking sheets',
      'Not freight brokerage, 3PL, carrier/dispatch, warehousing, or fleet operations',
    ],
    securityIncluded: [],
    icon: Map,
    detailPath: 'services/logistics-coordination.html',
    pricingPageLabel: 'Compare Operations Packages',
    displayTier: 'secondary',
  },
}

function tierFromPackage(pkg: CatalogPackage): ServiceTier {
  return {
    name: pkg.name,
    startingAt: pkg.isFrom ? pkg.priceLabel : pkg.priceLabel,
    summary: pkg.summary,
    includes: pkg.includes,
    notIncluded: pkg.notIncluded,
  }
}

function buildService(cat: CatalogService): Service {
  const meta = metaBySlug[cat.slug]
  const low = lowestPackagePrice(cat)

  return {
    slug: cat.slug,
    displayTier: meta.displayTier ?? 'secondary',
    packageName: meta.packageName,
    title: cat.title,
    description: meta.description,
    tag: meta.tag,
    scope: meta.scope,
    securityIncluded: cat.secureBullets,
    whoFor: meta.whoFor,
    startingAtLabel: low ? `Packages from $${low}` : 'Quote-based',
    pricingNote:
      'Fixed package prices apply to listed scope. Final quote confirmed in writing before work begins.',
    pricingTiers: cat.packages.map(tierFromPackage),
    detailPath: meta.detailPath,
    detailPagePath: `${import.meta.env.BASE_URL}${meta.detailPath}`,
    pricingPageLabel: meta.pricingPageLabel,
    inquiryLabel: 'Request This Package',
    inquirySubject: cat.inquirySubject,
    icon: meta.icon,
  }
}

export const builtServices: Service[] = pricingCatalog.map(buildService)
