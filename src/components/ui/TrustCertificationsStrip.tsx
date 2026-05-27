import {
  businessCertifications,
  businessEntityLabel,
  govContractingTrustDisclaimer,
  qualityTrustPoints,
} from '../../data/site'

type TrustCertificationsStripProps = {
  variant?: 'hero' | 'section'
  showQualityPoints?: boolean
}

export function TrustCertificationsStrip({
  variant = 'section',
  showQualityPoints = false,
}: TrustCertificationsStripProps) {
  const isHero = variant === 'hero'

  return (
    <div
      className={
        isHero
          ? 'mt-5 max-w-3xl rounded-xl border border-cyan-400/20 bg-slate-900/32 px-4 py-3.5 backdrop-blur-sm si-section-glass'
          : 'rounded-[1.25rem] border border-white/[0.14] bg-slate-900/28 p-6 si-section-glass'
      }
    >
      <p
        className={
          isHero
            ? 'text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-cyan-300/80'
            : 'text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80'
        }
      >
        Verified business credentials
      </p>

      <p className={`${isHero ? 'mt-2' : 'mt-3'} text-sm font-medium text-slate-200`}>
        {businessEntityLabel}
      </p>

      <div className={`${isHero ? 'mt-3' : 'mt-4'} flex flex-wrap gap-2`}>
        {businessCertifications.map((cert) => (
          <span
            key={cert.label}
            title={cert.short}
            className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100"
          >
            {cert.label}
          </span>
        ))}
      </div>

      <p className={`${isHero ? 'mt-3' : 'mt-4'} text-sm leading-6 text-slate-400`}>
        {govContractingTrustDisclaimer}
      </p>

      {showQualityPoints ? (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {qualityTrustPoints.map((point) => (
            <li key={point} className="text-sm leading-6 text-slate-300">
              {point}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}