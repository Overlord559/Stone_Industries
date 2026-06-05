/** California remote-first service areas */

export const remoteServiceAreas = [
  'All California',
  'Fresno',
  'Clovis',
  'Fowler',
  'Sanger',
  'Madera',
  'Visalia',
  'Bakersfield',
  'Sacramento',
  'Bay Area',
  'Los Angeles',
  'San Diego',
  'Inland Empire',
  'Central Coast',
] as const

export const onSiteServiceAreas = [
  'Fresno / Clovis / Fowler / Central Valley — by appointment or custom quote only',
] as const

export const onSiteServices = [
  'Custom PC builds',
  'Physical hardware repair',
  'POS hardware installs',
  'Networking requiring on-site work',
] as const

export const remoteFirstSummary =
  'Remote by default across California. Central Valley on-site only for hardware, POS, networking, or custom quote.'

export const remoteSupportSafetyRules = [
  'No password collection — you type passwords yourself',
  'No unattended remote access unless you approve it in writing',
  'Hardware repair and POS installs become local/on-site — custom quote in Central Valley',
  'Scope confirmed before paid sessions begin',
] as const
