import { useState } from 'react'

import { buildMailto, contactEmail } from '../../data/site'
import { copyContactEmail } from '../../lib/emailContact'

type EmailContactActionsProps = {
  subject?: string
  className?: string
  compact?: boolean
}

export function EmailContactActions({
  subject = 'Stone Industries Inquiry',
  className = '',
  compact = false,
}: EmailContactActionsProps) {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const mailtoHref = buildMailto(subject)

  async function handleCopyEmail() {
    setCopyFailed(false)
    const ok = await copyContactEmail()
    if (ok) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
      return
    }
    setCopyFailed(true)
  }

  return (
    <div className={`si-email-actions ${compact ? 'si-email-actions--compact' : ''} ${className}`.trim()}>
      <p className="si-email-actions__line text-sm text-slate-300">
        Email:{' '}
        <a
          className="font-medium text-slate-100 underline hover:text-white"
          href={mailtoHref}
        >
          {contactEmail}
        </a>
      </p>
      <div className="si-email-actions__buttons mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          className="si-secondary-cta inline-flex min-h-10 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold !text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          onClick={() => void handleCopyEmail()}
        >
          Copy email
        </button>
        <a
          href={mailtoHref}
          className="si-secondary-cta inline-flex min-h-10 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold !text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Open email app
        </a>
      </div>
      {copied ? (
        <p className="mt-2 text-xs font-medium text-emerald-200/90" role="status" aria-live="polite">
          Email copied.
        </p>
      ) : null}
      {copyFailed ? (
        <p className="mt-2 text-xs text-slate-400" role="status">
          Copy unavailable — use the email link above or Open email app.
        </p>
      ) : null}
    </div>
  )
}
