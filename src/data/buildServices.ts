import type { LucideIcon } from 'lucide-react'
import { Bot, Globe, Map, Wifi, Wrench } from 'lucide-react'

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
}

const metaBySlug: Record<string, ServiceMeta> = {
  'tech-cleanup': {
    packageName: 'Tech Cleanup Sprint',
    description:
      'Windows computer cleanup — virus and pop-up troubleshooting, and practical same-day support when scheduling allows. No phones or Linux; macOS case-by-case only.',
    tag: 'Windows PCs · home offices and small teams · urgent fix requests.',
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
    pricingPageLabel: 'Compare Tech Cleanup Packages',
  },
  'business-websites': {
    packageName: '24-Hour Website Launch',
    description:
      'Transparent page-count website packages for local businesses — fast launch, secure lead capture options, and clear scope. Not a full marketing or SEO agency replacement.',
    tag: 'For local businesses that need a credible site fast — not a full agency contract.',
    whoFor:
      'Local vendors and service businesses that want fixed website packages instead of open-ended agency retainers.',
    scope: [
      'Page-count packages (1 / 5 / 7 pages) with basic SEO/meta — ad setup guidance or deeper campaigns quoted separately',
      'Secure lead capture and cybersecurity layers where scoped',
    ],
    securityIncluded: [],
    icon: Globe,
    detailPath: 'services/business-websites.html',
    pricingPageLabel: 'Compare Website Packages',
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
  },
  'logistics-coordination': {
    packageName: 'Operations & Logistics Coordination',
    description:
      'Operations coordination systems — intake forms, vendor organization, tracking sheets, handoffs, and SOPs. Not freight brokerage, carrier service, or 3PL.',
    tag: 'For teams that need workflow structure — not regulated freight movement.',
    whoFor:
      'Small teams that need operations setup and follow-through — not a freight broker, carrier, or 3PL.',
    scope: [
      'Intake forms, tracking, handoff checklists, and workflow cleanup',
      'Vendor/contact organization and documentation',
      'Not freight movement, carrier selection, or 3PL services',
    ],
    securityIncluded: [],
    icon: Map,
    detailPath: 'services/logistics-coordination.html',
    pricingPageLabel: 'Compare Operations Packages',
  },
  'ai-workflow-automation': {
    packageName: 'Digital Assistant Setup',
    description:
      'Practical AI automation and AI-agent-style workflows using AI models, APIs, and n8n-style tools — human approval required. Not a full AI agency or unsupervised agent platform.',
    tag: 'Start with one workflow — expand when ready. Human approval required.',
    whoFor:
      'Operators who want a practical first AI workflow, intake assistant, or AI-agent-style automation — not employee replacement.',
    scope: [
      'AI models, APIs, and n8n-style workflow automation where appropriate',
      'Starter packages from one guarded workflow upward',
      'Human approval for important customer-facing actions',
    ],
    securityIncluded: [],
    icon: Bot,
    detailPath: 'services/ai-workflow-automation.html',
    pricingPageLabel: 'Compare AI Assistant Packages',
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
