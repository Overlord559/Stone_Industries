import type { LucideIcon } from 'lucide-react'

import { buildPricingServiceHref } from '../../data/site'

type ServiceObjectLinkProps = {
  slug: string
  title: string
  icon: LucideIcon
}

export function ServiceObjectLink({ slug, title, icon: Icon }: ServiceObjectLinkProps) {
  return (
    <a
      href={buildPricingServiceHref(slug)}
      className={`si-service-object si-service-object--${slug}`}
      aria-label={`Estimate ${title} package`}
    >
      <span className="si-service-object__halo" aria-hidden="true" />
      <span className="si-service-object__orbit" aria-hidden="true" />
      <span className="si-service-object__plate" aria-hidden="true" />
      <Icon className="si-service-object__icon" size={24} strokeWidth={1.75} aria-hidden="true" />
    </a>
  )
}
