import { useEffect, useState, type FormEvent } from 'react'

import {
  buildMailto,
  contactEmail,
  contactPhone,
  contactPhoneHref,
  inquiryServiceOptions,
  resolveServiceFromQuery,
  resolveServiceTitleFromSlug,
} from '../data/site'
import { INQUIRY_SERVICE_EVENT } from '../lib/inquiryNavigation'
import { validateInquiryInput } from '../lib/inquiryTypes'
import { inquiryFormAvailable, submitInquiry } from '../lib/submitInquiry'
import { EmailContactActions } from './ui/EmailContactActions'

type InquiryFormProps = {
  sourcePage: string
  defaultService?: string
  className?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function InquiryForm({ sourcePage, defaultService = '', className = '' }: InquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedService, setSelectedService] = useState(
    () => resolveServiceFromQuery() || defaultService,
  )
  const configured = inquiryFormAvailable()

  useEffect(() => {
    function handleServiceSelect(event: Event) {
      const detail = (event as CustomEvent<{ slug: string; title?: string }>).detail
      const title = detail.title || resolveServiceTitleFromSlug(detail.slug) || ''
      if (title) setSelectedService(title)
    }

    window.addEventListener(INQUIRY_SERVICE_EVENT, handleServiceSelect)
    return () => window.removeEventListener(INQUIRY_SERVICE_EVENT, handleServiceSelect)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const data = new FormData(form)
    const validation = validateInquiryInput({
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      service_requested: String(data.get('service_requested') ?? ''),
      city: String(data.get('city') ?? ''),
      message: String(data.get('message') ?? ''),
      source_page: sourcePage,
      honeypot: String(data.get('website') ?? ''),
    })

    if (!validation.ok) {
      setStatus('error')
      setErrorMessage(validation.error)
      return
    }

    if (!configured) {
      setStatus('error')
      setErrorMessage(
        'Please use email or phone below to reach Stone Industries directly.',
      )
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      await submitInquiry(validation.payload)
      setStatus('success')
      form.reset()
      setSelectedService(defaultService)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'We could not save your inquiry. Please call or email Stone Industries directly.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        className={`si-section-glass rounded-[1.75rem] border border-emerald-400/25 bg-emerald-400/10 p-6 ${className}`}
        role="status"
      >
        <p className="text-sm font-semibold text-emerald-100">Inquiry received</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">
          Thank you. Stone Industries will follow up by email or phone. For urgent help, call{' '}
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
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <form
      className={`relative si-section-glass space-y-4 rounded-[1.75rem] border border-white/[0.14] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.14)] ${className}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/85">
          Send an inquiry
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {configured
            ? 'Submit the form below — inquiry is the fastest path. Prefer phone? Call or text below.'
            : 'Prefer email? Contact Stone Industries using the options below, or call us directly.'}
        </p>
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-200">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Name *
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 text-white outline-none ring-cyan-400/40 focus:border-cyan-400/40 focus:ring-2"
          />
        </label>

        <label className="block text-sm text-slate-200">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Service *
          </span>
          <select
            name="service_requested"
            required
            value={selectedService}
            onChange={(event) => setSelectedService(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 text-white outline-none ring-cyan-400/40 focus:border-cyan-400/40 focus:ring-2"
          >
            <option value="">Choose a service</option>
            {inquiryServiceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-200">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Email
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 text-white outline-none ring-cyan-400/40 focus:border-cyan-400/40 focus:ring-2"
          />
        </label>

        <label className="block text-sm text-slate-200">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 text-white outline-none ring-cyan-400/40 focus:border-cyan-400/40 focus:ring-2"
          />
        </label>
      </div>

      <p className="text-xs text-slate-400">Provide at least one: email or phone.</p>

      <label className="block text-sm text-slate-200">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          City / area
        </span>
        <input
          name="city"
          autoComplete="address-level2"
          className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 text-white outline-none ring-cyan-400/40 focus:border-cyan-400/40 focus:ring-2"
        />
      </label>

      <label className="block text-sm text-slate-200">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Message *
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 text-white outline-none ring-cyan-400/40 focus:border-cyan-400/40 focus:ring-2"
          placeholder="What you need, timeline, and best callback time."
        />
      </label>

      {status === 'error' && errorMessage ? (
        <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="submit"
          disabled={status === 'submitting' || !configured}
          className="si-primary-cta inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold !text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Submit inquiry'}
        </button>
      </div>

      <EmailContactActions subject="Stone Industries Inquiry" compact className="mt-1" />

      <p className="text-sm text-slate-400">
        Prefer phone?{' '}
        <a className="font-medium text-slate-200 underline hover:text-white" href={contactPhoneHref}>
          {contactPhone}
        </a>
      </p>

      {!configured ? (
        <p className="text-xs text-slate-400">
          Fallback:{' '}
          <a className="underline" href={buildMailto('Stone Industries Inquiry')}>
            {contactEmail}
          </a>{' '}
          ·{' '}
          <a className="underline" href={contactPhoneHref}>
            {contactPhone}
          </a>
        </p>
      ) : null}
    </form>
  )
}
