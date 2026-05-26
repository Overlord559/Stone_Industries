/** Plain-English add-on education — merged into pricingCatalog add-ons at build time. */

export type AddOnDetail = {
  shortDescription?: string
  whatThisIs: string
  includes: string[]
  notIncluded?: string[]
  bestFor?: string
}

export const basicSeoIncludedNote =
  'Basic SEO/meta (where listed) means page titles, meta descriptions, basic headings, local business wording, and share/social preview basics — not ongoing marketing campaigns.'

export const advancedSeoNotIncludedNote =
  'Google/Meta ad setup guidance can be quoted separately, but ad spend management, ongoing optimization, full campaign strategy, and monthly marketing retainers are custom or partner-level services — no guaranteed rankings, leads, conversions, or ROI.'

export const advancedSeoPublicLine =
  'Basic SEO/meta is included where listed. Google/Meta ad setup guidance can be quoted separately, but ongoing ad management, advanced SEO campaigns, and monthly marketing retainers are custom or partner-level services.'

export const aiWorkflowScopeNote =
  'Stone Industries builds practical AI automation and AI-agent-style workflows using AI models, APIs, and tools like n8n where appropriate — forms, email/process automation, and human approval for important actions. Not a full enterprise AI agency, not employee replacement, not guaranteed AI accuracy, and no unsupervised payment, legal, medical, or financial decisions.'

export const techCleanupPlatformScopeNote =
  'Currently focused on Windows computers. No phones or Linux support right now. macOS may be considered case-by-case depending on the issue.'

export const pcBuildServiceScopeNote =
  'Windows desktop tower PCs only — mini, mid, or full tower. Hands-on PC assembly, upgrade, and component-planning experience. No laptops, phones, consoles, Linux builds, or custom open-loop liquid cooling right now.'

export const pcBuildPartsPricingNote =
  'Service fees cover planning, assembly, upgrade labor, setup, and handoff — not component cost. Parts are quoted separately; customer may purchase from an approved list. If Stone orders parts, component cost is invoiced upfront before assembly begins.'

export const pcBuildCompetitorNote =
  'Prebuilt online systems may be cheaper for simple plug-and-play needs. Stone Industries focuses on local guidance, compatible parts planning, desktop tower upgrades, assembly, Windows setup when scoped, and personal handoff — not national builder warranty scale or guaranteed benchmark performance.'

export const addOnDetailsById: Record<string, AddOnDetail> = {
  'device-security': {
    shortDescription: 'Basic device and browser security check during a cleanup visit.',
    whatThisIs: 'A basic device/browser security setup for tech cleanup jobs.',
    includes: [
      'Windows Security / antivirus check',
      'Suspicious app and browser extension review',
      'Update check',
      'Basic malware-symptom review',
      'Password and 2FA recommendations',
    ],
    notIncluded: [
      'Phone repair or mobile device support',
      'Linux support',
      'macOS support unless accepted case-by-case',
      'Forensic malware removal',
      'Guaranteed malware cleanup',
      'Enterprise endpoint security',
    ],
    bestFor: 'Pop-ups, slow devices, or “is this safe?” questions during cleanup.',
  },
  'pw-manager': {
    shortDescription: 'Guidance to set up a password manager safely.',
    whatThisIs: 'Hands-on guidance to choose and set up a password manager for everyday accounts.',
    includes: [
      'Password manager recommendation for your setup',
      'Install and login guidance',
      'Saving and organizing key accounts',
      'Recovery/export basics',
    ],
    notIncluded: ['Enterprise identity management', 'Full account migration for large teams'],
    bestFor: 'Operators using reused or weak passwords across business accounts.',
  },
  '2fa': {
    shortDescription: 'Two-factor authentication and account recovery setup help.',
    whatThisIs: 'Help turning on 2FA and setting up account recovery options for important logins.',
    includes: [
      '2FA setup on priority accounts',
      'Authenticator app or SMS guidance where appropriate',
      'Backup codes and recovery path notes',
    ],
    notIncluded: ['Enterprise SSO', 'Guaranteed account recovery if credentials are lost'],
    bestFor: 'Email, banking, and business accounts that need stronger login protection.',
  },
  'wifi-sec': {
    shortDescription: 'Basic Wi-Fi and router security settings review.',
    whatThisIs: 'A practical review of home or small-office Wi-Fi/router security settings.',
    includes: [
      'Router admin password review',
      'Wi-Fi encryption and password check',
      'Firmware/update guidance when accessible',
      'Guest network recommendation when appropriate',
    ],
    notIncluded: ['Full network redesign', 'Enterprise firewall management'],
    bestFor: 'Shared passwords, old routers, or unsure guest-network setup.',
  },
  'extra-hour': {
    shortDescription: 'Additional on-site time beyond the package scope.',
    whatThisIs: 'Extra hands-on time billed hourly when the job needs more work than the package includes.',
    includes: ['Additional triage, cleanup, or setup time in scope', 'Written note of what changed'],
    notIncluded: ['Unlimited support', 'Emergency SLA unless agreed in writing'],
    bestFor: 'Jobs that need more devices, rooms, or issues than the base package covers.',
  },
  'lead-capture': {
    shortDescription: 'Protected inquiry form with Supabase lead storage — separate from cybersecurity tiers.',
    whatThisIs:
      'A protected website inquiry form that stores leads in a Supabase database using RLS so public visitors can submit inquiries but cannot read customer leads.',
    includes: [
      'Inquiry form setup',
      'Supabase lead table setup guidance',
      'RLS public INSERT-only pattern',
      'No public lead reads',
      'Privacy-aligned form copy',
      'Netlify env setup guidance',
      'Test inquiry verification',
      'Phone/email fallback',
    ],
    notIncluded: [
      'Antivirus',
      'Managed cybersecurity',
      'Compliance certification',
      'Guaranteed protection from hacking',
    ],
    bestFor: 'Local businesses that want website inquiries stored securely instead of only email.',
  },
  'cyber-tier-1': {
    shortDescription: 'Basic security-conscious website launch review.',
    whatThisIs: 'A basic security-conscious website setup review for small business websites.',
    includes: [
      'Security headers check',
      'Privacy and data-collection review',
      'No exposed admin or service-role keys',
      'Safe environment-variable guidance',
      'Basic form validation and spam-resistance review',
      'Post-deploy security checklist',
    ],
    notIncluded: [
      'Managed security',
      'Incident response',
      'Formal compliance certification',
      'Guaranteed hack prevention',
    ],
    bestFor: 'New business sites that need practical launch hardening without enterprise security contracts.',
  },
  'cyber-tier-2': {
    shortDescription: 'Deeper review for sites with lead capture, payment links, or automation.',
    whatThisIs:
      'A deeper website and data safety review for sites using lead capture, payment links, or automation.',
    includes: [
      'Everything in Tier 1',
      'Supabase RLS verification if lead capture is used',
      'Public database read/write safety review',
      'Payment-link safety review',
      'Form-abuse review',
      'Recommendations for CSP, Turnstile, rate limiting, or proxy if needed',
    ],
    notIncluded: [
      '24/7 monitoring',
      'SOC 2 / HIPAA / PCI certification',
      'Enterprise incident response',
      'Guaranteed protection',
    ],
    bestFor: 'Sites collecting inquiries or using hosted payment links that need a deeper pre-launch review.',
  },
  'stripe-link': {
    shortDescription: 'Hosted Stripe payment link setup — no card data on your website.',
    whatThisIs:
      'A hosted payment-link setup so customers can pay through Stripe-hosted tools instead of entering card data on the website.',
    includes: [
      'Payment link or invoice guidance',
      'No on-site card collection',
      'Payment CTA copy',
      'Basic payment handoff notes',
    ],
    notIncluded: [
      'Custom checkout',
      'Customer portal',
      'Automated fulfillment',
      'Tax, legal, or accounting advice',
    ],
    bestFor: 'Businesses ready to collect deposits or invoices after a written quote.',
  },
  copy: {
    shortDescription: 'Help writing clear local-business website copy.',
    whatThisIs: 'Copywriting help for service pages, headlines, and CTAs within agreed scope.',
    includes: [
      'Headline and section draft help',
      'Local business wording polish',
      'CTA and contact copy',
      'One revision pass within scope',
    ],
    notIncluded: [
      'Full brand strategy',
      'Blog/content marketing plans',
      'Guaranteed conversion results',
    ],
    bestFor: 'Owners who have the facts but need help wording pages clearly.',
  },
  rush: {
    shortDescription: 'Priority scheduling for 24-hour delivery when calendar allows.',
    whatThisIs: 'Rush scheduling to prioritize your website launch when Stone Industries has availability.',
    includes: ['Priority slot when scheduling allows', 'Clear timeline confirmation in writing'],
    notIncluded: ['Guaranteed same-day delivery without confirmation', 'Unlimited revision cycles'],
    bestFor: 'Time-sensitive launches with content ready to go.',
  },
  'monthly-care': {
    shortDescription: 'Ongoing small website support after launch — billed monthly.',
    whatThisIs: 'Ongoing small website support after launch.',
    includes: [
      'Minor text updates',
      'Link and form checks',
      'Basic health check',
      'Small fixes by scope',
    ],
    notIncluded: [
      'Unlimited redesigns',
      'Ad campaigns',
      'Advanced SEO campaigns',
      '24/7 support unless separately contracted',
    ],
    bestFor: 'Businesses that want occasional updates without a full agency retainer.',
  },
  'guest-wifi': {
    shortDescription: 'Guest Wi-Fi separation and password review.',
    whatThisIs: 'A focused review of guest Wi-Fi setup so customer traffic stays separate from business devices.',
    includes: [
      'Guest network recommendation',
      'Password and access review',
      'Basic sharing settings check',
    ],
    notIncluded: ['Full network redesign', 'Enterprise Wi-Fi management'],
    bestFor: 'Shops and offices offering public Wi-Fi to customers.',
  },
  'office-security-review': {
    shortDescription: 'Simple small-office tech and access hygiene review.',
    whatThisIs: 'A lightweight review of shared passwords, device access, and basic office tech hygiene.',
    includes: [
      'Shared account/password hygiene notes',
      'Device access basics',
      'Simple checklist for follow-up',
    ],
    notIncluded: ['Formal compliance audit', 'Managed security services'],
    bestFor: 'Small offices with shared logins or unclear device access.',
  },
  printer: {
    shortDescription: 'Hands-on printer setup or sharing fix per device.',
    whatThisIs: 'Setup or troubleshooting for one additional printer in scope.',
    includes: ['Driver/install guidance', 'Sharing or network connection check', 'Test print verification'],
    notIncluded: ['Hardware repair', 'Enterprise print server setup'],
    bestFor: 'New printers or devices that will not print reliably.',
  },
  'pos-support': {
    shortDescription: 'Hourly help on POS vendor calls or configuration.',
    whatThisIs: 'On-site or remote support while working with your POS vendor — billed hourly.',
    includes: ['Call coordination', 'Configuration notes', 'Operator walkthrough'],
    notIncluded: ['PCI certification', 'Becoming your POS merchant of record'],
    bestFor: 'Shops stuck on vendor phone trees or basic POS environment issues.',
  },
  retainer: {
    shortDescription: 'Monthly on-call tech support retainer for small offices.',
    whatThisIs: 'A monthly retainer for prioritized small-office tech support within agreed scope.',
    includes: [
      'Priority scheduling when available',
      'Remote triage and light on-site visits by scope',
      'Documented recommendations',
    ],
    notIncluded: ['Full MSP/help desk', '24/7 SLA unless contracted', 'Compliance programs'],
    bestFor: 'Offices that want a familiar tech contact without enterprise IT contracts.',
  },
  handoff: {
    shortDescription: 'Checklist for secure vendor and contact handoffs.',
    whatThisIs: 'A secure handoff checklist for vendors, contacts, and shared operational access.',
    includes: [
      'Handoff checklist template',
      'Access and credential notes structure',
      'Follow-up tracking guidance',
    ],
    notIncluded: ['Freight booking', 'Legal contract drafting'],
    bestFor: 'Teams onboarding vendors or changing who owns a process.',
  },
  'access-cleanup': {
    shortDescription: 'Shared folder, login, and access hygiene cleanup.',
    whatThisIs: 'Guidance to clean up shared drives, logins, and who-has-access lists for small teams.',
    includes: [
      'Shared access inventory guidance',
      'Remove/rotate recommendations where appropriate',
      'Simple documentation template',
    ],
    notIncluded: ['Enterprise IAM rollout', 'Guaranteed breach remediation'],
    bestFor: 'Teams with old shared passwords or unclear folder permissions.',
  },
  'auto-plan': {
    shortDescription: 'Planning recommendations for safe workflow automation next steps.',
    whatThisIs: 'A planning session for practical automation opportunities with human approval boundaries.',
    includes: [
      'Workflow opportunity map',
      'Tool fit notes (forms, sheets, n8n-style automation where appropriate)',
      'Human approval recommendations',
    ],
    notIncluded: ['Full automation build unless scoped', 'Unsupervised agent deployment'],
    bestFor: 'Operations teams ready to automate repetitive coordination work safely.',
  },
  'monthly-ops': {
    shortDescription: 'Monthly operations coordination support — billed upfront monthly.',
    whatThisIs: 'Ongoing light operations coordination support after initial setup.',
    includes: [
      'Status check-ins by scope',
      'Template and tracking upkeep',
      'Follow-up documentation',
    ],
    notIncluded: ['Freight brokerage', 'Full project management retainer unless scoped'],
    bestFor: 'Small teams that want help keeping workflows current after setup.',
  },
  'extra-flow': {
    shortDescription: 'One additional guarded AI workflow or AI-agent-style path.',
    whatThisIs:
      'An additional practical AI automation or AI-agent-style workflow using models, APIs, and n8n-style tools where appropriate.',
    includes: [
      'One extra workflow mapping session',
      'Human approval checkpoint',
      'Handoff and maintenance notes',
    ],
    notIncluded: ['Unsupervised 24/7 agents', 'Guaranteed AI accuracy'],
    bestFor: 'Teams ready to expand after the first workflow is working.',
  },
  'prompt-bounds': {
    shortDescription: 'Safety limits and human approval rules for AI workflows and agents.',
    whatThisIs:
      'A safety layer for AI workflows and AI-agent-style automations so important actions require human approval.',
    includes: [
      'Approved use cases',
      'Refusal and boundary rules',
      'Human approval steps',
      'Safe fallback wording',
    ],
    notIncluded: [
      'Unsupervised legal, payment, medical, or financial decisions',
      'Employee replacement',
      'Guaranteed AI accuracy',
    ],
    bestFor: 'Any customer-facing or sensitive AI workflow.',
  },
  'api-setup': {
    shortDescription: 'Keep private API keys out of public website code.',
    whatThisIs:
      'Organizing API keys and environment variables so private keys are not exposed in public frontend code.',
    includes: [
      'Public vs private key guidance',
      'Environment variable setup checklist',
      'Deployment notes for Netlify or similar hosts',
    ],
    notIncluded: ['Full backend security audit', 'Secret rotation service', 'Enterprise key management'],
    bestFor: 'Workflows connecting to AI models, forms, or automation tools.',
  },
  'monthly-ai': {
    shortDescription: 'Monthly support for AI workflows — billed upfront monthly.',
    whatThisIs: 'Ongoing light support for AI workflows after initial setup.',
    includes: [
      'Prompt/workflow tune-ups by scope',
      'Break/fix guidance for scoped automations',
      'Operator check-in notes',
    ],
    notIncluded: ['Unlimited new workflows', '24/7 agent monitoring', 'Guaranteed accuracy'],
    bestFor: 'Businesses running one or more approved workflows that need occasional adjustments.',
  },
  'pc-extra-storage': {
    shortDescription: 'Install an additional internal storage drive in a desktop tower.',
    whatThisIs: 'Hands-on install of an extra SSD or HDD the customer provides or approves.',
    includes: ['Drive mount and connection', 'Basic boot/disk visibility check', 'Simple handoff note'],
    notIncluded: [
      'Drive hardware cost',
      'Data recovery if drive fails',
      'Laptop storage upgrades',
      'Guaranteed data transfer success',
    ],
    bestFor: 'Tower owners adding storage after the main upgrade or build scope.',
  },
  'pc-wifi-bt': {
    shortDescription: 'Install a Wi-Fi or Bluetooth card in a compatible desktop tower.',
    whatThisIs: 'Install and basic driver check for a customer-provided Wi-Fi/Bluetooth card.',
    includes: ['Card install', 'Basic connectivity check', 'Driver-ready handoff note'],
    notIncluded: ['Card hardware cost', 'Laptop wireless upgrades', 'Enterprise Wi-Fi design'],
    bestFor: 'Desktops without built-in Wi-Fi or with weak wireless.',
  },
  'pc-aio-cooler': {
    shortDescription: 'Install a compatible AIO liquid cooler — closed-loop only.',
    whatThisIs: 'Install of a customer-approved all-in-one (AIO) cooler when case and board are compatible.',
    includes: ['AIO mount and fan routing', 'Basic boot/temp sanity check', 'Handoff notes'],
    notIncluded: [
      'Custom open-loop liquid cooling',
      'Cooler hardware cost',
      'Guaranteed thermal or FPS results',
      'Laptop cooling work',
    ],
    bestFor: 'Performance towers that need a compatible AIO install.',
  },
  'pc-rgb-setup': {
    shortDescription: 'Basic RGB and fan control software setup after hardware install.',
    whatThisIs: 'Help configuring RGB/fan software that came with approved parts — not full custom lighting design.',
    includes: ['Software install guidance', 'Basic profile setup', 'Operator walkthrough'],
    notIncluded: ['Guaranteed sync across all brands', 'Complex custom lighting programming'],
    bestFor: 'RGB-heavy builds after assembly is complete.',
  },
  'pc-windows-drivers': {
    shortDescription: 'Windows install and driver setup when not already in the package.',
    whatThisIs: 'Windows installation and basic driver setup when customer has valid license/media or purchases license separately.',
    includes: ['Windows install when media/license is provided', 'Basic driver setup', 'Boot and device check'],
    notIncluded: [
      'Windows license cost unless separately purchased',
      'Guaranteed FPS or benchmark results',
      'Data recovery',
      'Linux installs',
    ],
    bestFor: 'Assembly-only packages that still need a fresh Windows setup.',
  },
  'pc-data-transfer': {
    shortDescription: 'Move files from an old Windows PC to the new or upgraded tower.',
    whatThisIs: 'Basic file transfer from an old Windows desktop when drives and access allow.',
    includes: ['Scope-defined file/folder transfer', 'Simple verification checklist', 'Handoff notes'],
    notIncluded: [
      'Guaranteed data recovery',
      'Forensic recovery',
      'Laptop transfers',
      'Transfer from failed or encrypted drives without backup',
    ],
    bestFor: 'Customers replacing a tower who want common files moved over.',
  },
  'pc-local-delivery': {
    shortDescription: 'Local delivery and basic setup at customer location when scheduling allows.',
    whatThisIs: 'Local drop-off or pickup plus basic desk setup in Fresno / Central Valley when scheduled.',
    includes: ['Local delivery or pickup coordination', 'Basic desk placement and power-on check'],
    notIncluded: ['Shipping logistics', 'Guaranteed shipping speed', 'Nationwide courier service'],
    bestFor: 'Local customers who want hand delivery instead of shop pickup.',
  },
  'pc-failed-build-diagnostic': {
    shortDescription: 'Diagnose a customer-built or partial upgrade that will not boot.',
    whatThisIs: 'Diagnostic visit for a tower the customer started or upgraded — quoted repair beyond diagnostic if needed.',
    includes: ['No-post / boot triage', 'Compatibility and power/cable checks', 'Written next-step quote'],
    notIncluded: [
      'Free unlimited rework',
      'Guaranteed fix without parts changes',
      'Laptop or console repair',
    ],
    bestFor: 'DIY builds that need a second pair of hands to find the issue.',
  },
  'pc-cable-mgmt': {
    shortDescription: 'Clean up cabling after assembly or upgrade work.',
    whatThisIs: 'Extra cable routing and tidying beyond the basic management included in the package.',
    includes: ['Additional routing and strap work', 'Airflow-friendly layout where possible'],
    notIncluded: ['Custom sleeved cable mods', 'Guaranteed temperature or noise outcomes'],
    bestFor: 'Showcase builds or cramped cases that need extra tidying.',
  },
  'pc-dust-cleanup': {
    shortDescription: 'Dust cleanup while the case is open for upgrade work.',
    whatThisIs: 'Basic internal dust blow-out or wipe-down during an upgrade visit.',
    includes: ['Internal dust removal where accessible', 'Simple cleanliness note'],
    notIncluded: ['Liquid damage repair', 'Guaranteed hardware longevity'],
    bestFor: 'Older towers opened for RAM, GPU, or storage upgrades.',
  },
}

export function detailForAddOn(id: string): AddOnDetail | undefined {
  return addOnDetailsById[id]
}
