import { useRef, useState, type FormEvent, type MouseEvent } from 'react'

import { auditBiggestProblemOptions } from '../data/revenueLeakAudit'
import { trackEvent, trackMailtoFallbackClick } from '../lib/analytics'
import { contactPhone, contactPhoneHref } from '../data/site'
import {
  buildAuditMailtoHref,
  validateAuditInput,
} from '../lib/auditTypes'
import { inquiryFormAvailable, submitInquiry } from '../lib/submitInquiry'
import { EmailContactActions } from './ui/EmailContactActions'

type RevenueLeakAuditFormProps = {
  sourcePage: string
  className?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 text-white outline-none ring-cyan-400/40 focus:border-cyan-400/40 focus:ring-2'

const labelClass =
  'mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'

export function RevenueLeakAuditForm({ sourcePage, className = '' }: RevenueLeakAuditFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const formStartedRef = useRef(false)
  const configured = inquiryFormAvailable()

  function handleFormStart() {
    if (formStartedRef.current) return
    formStartedRef.current = true
    trackEvent('audit_form_start')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const data = new FormData(form)
    const validation = validateAuditInput({
      businessName: String(data.get('business_name') ?? ''),
      website: String(data.get('website') ?? ''),
      googleBusinessProfile: String(data.get('google_business_profile') ?? ''),
      phone: String(data.get('phone') ?? ''),
      services: String(data.get('services') ?? ''),
      city: String(data.get('city') ?? ''),
      biggestProblem: String(data.get('biggest_problem') ?? ''),
      email: String(data.get('email') ?? ''),
      permissionGranted: data.get('permission') === 'on',
      honeypot: String(data.get('bot_check') ?? ''),
      sourcePage,
    })

    if (!validation.ok) {
      setStatus('error')
      setErrorMessage(validation.error)
      trackEvent('audit_form_submit_error', { error_type: 'validation' })
      return
    }

    if (!configured) {
      setStatus('error')
      setErrorMessage(
        'Prefer email? Use “Send audit request via email” below or call Stone Industries directly.',
      )
      trackEvent('audit_form_submit_error', { error_type: 'not_configured' })
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      await submitInquiry(validation.payload)
      trackEvent('audit_form_submit_success')
      setStatus('success')
      form.reset()
      formStartedRef.current = false
    } catch (error) {
      setStatus('error')
      trackEvent('audit_form_submit_error', { error_type: 'submit' })
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'We could not save your audit request. Use email or phone below.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        className={`si-section-glass rounded-[1.75rem] border border-emerald-400/25 bg-emerald-400/10 p-6 ${className}`}
        role="status"
      >
        <p className="text-sm font-semibold text-emerald-100">Audit request received</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">
          Thank you. Stone Industries will review your business details and send a revenue leak report and fix
          plan by email. For urgent help, call{' '}
          <a className="font-medium text-white underline" href={contactPhoneHref}>
            {contactPhone}
          </a>
          .
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-medium text-cyan-200 underline"
          onClick={() => setStatus('idle')}
        >
          Submit another audit request
        </button>
      </div>
    )
  }


  return (
    <form
      className={`relative si-section-glass space-y-4 rounded-[1.75rem] border border-white/[0.14] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.14)] sm:p-6 ${className}`}
      onSubmit={handleSubmit}
      onFocusCapture={handleFormStart}
      noValidate
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">
          Request your audit
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {configured
            ? 'Submit the form below. Stone Industries will send a human-reviewed revenue leak report and recommended fix plan by email.'
            : 'Fill out the form, then use Send audit request via email or Open Gmail below.'}
        </p>
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Bot check
          <input name="bot_check" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="block text-sm text-slate-200">
        <span className={labelClass}>Business name *</span>
        <input name="business_name" required autoComplete="organization" className={fieldClass} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-200">
          <span className={labelClass}>Website *</span>
          <input
            name="website"
            required
            type="text"
            inputMode="url"
            placeholder="https://yourbusiness.com"
            autoComplete="url"
            className={fieldClass}
          />
        </label>

        <label className="block text-sm text-slate-200">
          <span className={labelClass}>Google Business Profile link *</span>
          <input
            name="google_business_profile"
            required
            type="text"
            inputMode="url"
            placeholder="Google Maps or Business Profile link"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-200">
          <span className={labelClass}>Phone *</span>
          <input name="phone" required type="tel" autoComplete="tel" className={fieldClass} />
        </label>

        <label className="block text-sm text-slate-200">
          <span className={labelClass}>Email *</span>
          <input name="email" required type="email" autoComplete="email" className={fieldClass} />
        </label>
      </div>

      <label className="block text-sm text-slate-200">
        <span className={labelClass}>Services *</span>
        <input
          name="services"
          required
          placeholder="e.g. Auto detailing, mobile mechanic, barber shop"
          className={fieldClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-200">
          <span className={labelClass}>City *</span>
          <input name="city" required autoComplete="address-level2" className={fieldClass} />
        </label>

        <label className="block text-sm text-slate-200">
          <span className={labelClass}>Biggest problem *</span>
          <select name="biggest_problem" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose one
            </option>
            {auditBiggestProblemOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
        <input
          name="permission"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950/50 text-cyan-400 focus:ring-cyan-400/40"
        />
        <span>
          I give Stone Industries permission to review my public business details and send a revenue leak
          audit report to the email above. *
        </span>
      </label>

      {status === 'error' && errorMessage ? (
        <p
          className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3">
        {configured ? (
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="si-primary-cta inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Request free audit'}
          </button>
        ) : (
          <p className="text-sm text-slate-300">
            Fill out the form, then send your request via email or Open Gmail — fields are included in the message body.
          </p>
        )}

        <AuditMailtoButton
          sourcePage={sourcePage}
          onError={(message) => {
            setStatus('error')
            setErrorMessage(message)
          }}
        />

        <EmailContactActions
          subject="AI Revenue Leak Audit Request — Stone Industries"
          compact
          className="mt-1"
          trackMailtoFallback="audit"
        />
      </div>

      <p className="text-xs leading-5 text-slate-400">
        Managed service with human-reviewed drafts and an approval queue — not fully autonomous software. No
        revenue guarantees.
      </p>
    </form>
  )
}

function AuditMailtoButton({
  sourcePage,
  onError,
}: {
  sourcePage: string
  onError: (message: string) => void
}) {
  function handleMailtoClick(event: MouseEvent<HTMLAnchorElement>) {
    const form = event.currentTarget.closest('form')
    if (!form) return

    const data = new FormData(form)
    const validation = validateAuditInput({
      businessName: String(data.get('business_name') ?? ''),
      website: String(data.get('website') ?? ''),
      googleBusinessProfile: String(data.get('google_business_profile') ?? ''),
      phone: String(data.get('phone') ?? ''),
      services: String(data.get('services') ?? ''),
      city: String(data.get('city') ?? ''),
      biggestProblem: String(data.get('biggest_problem') ?? ''),
      email: String(data.get('email') ?? ''),
      permissionGranted: data.get('permission') === 'on',
      sourcePage,
    })

    if (!validation.ok) {
      event.preventDefault()
      onError(validation.error)
      return
    }

    event.currentTarget.href = buildAuditMailtoHref(validation.mailtoBody)
    trackMailtoFallbackClick('audit')
  }

  return (
    <a
      href={buildAuditMailtoHref('')}
      onClick={handleMailtoClick}
      className="si-secondary-cta inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-white/10 hover:!text-white"
    >
      Send audit request via email
    </a>
  )
}
