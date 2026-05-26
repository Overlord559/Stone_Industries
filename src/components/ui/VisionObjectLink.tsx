import type { LucideIcon } from 'lucide-react'

import { visionPagePath } from '../../data/site'

type VisionObjectLinkProps = {
  anchor: string
  title: string
  icon: LucideIcon
}

export function VisionObjectLink({ anchor, title, icon: Icon }: VisionObjectLinkProps) {
  return (
    <a
      href={`${visionPagePath}#${anchor}`}
      className={`si-vision-object si-vision-object--${anchor}`}
      aria-label={`Read ${title} on vision page`}
    >
      <span className="si-vision-object__halo" aria-hidden="true" />
      <span className="si-vision-object__orbit" aria-hidden="true" />
      <span className="si-vision-object__plate" aria-hidden="true" />
      <Icon className="si-vision-object__icon" size={22} strokeWidth={1.75} aria-hidden="true" />
    </a>
  )
}
