import { emailAddress } from '../data/site'
import {
  auditBiggestProblemOptions,
  auditServiceLabel,
  type AuditBiggestProblem,
} from '../data/revenueLeakAudit'
import type { InquiryPayload } from './inquiryTypes'

export type AuditFormInput = {
  businessName: string
  website: string
  googleBusinessProfile: string
  contactName: string
  phone: string
  city?: string
  biggestProblem: string
  email: string
  notes?: string
  permissionGranted: boolean
  honeypot?: string
  sourcePage?: string
}

export type AuditValidationResult =
  | { ok: true; payload: InquiryPayload; mailtoBody: string }
  | { ok: false; error: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidProblem(value: string): value is AuditBiggestProblem {
  return auditBiggestProblemOptions.includes(value as AuditBiggestProblem)
}

export function buildAuditMailtoBody(
  input: Omit<AuditFormInput, 'honeypot' | 'permissionGranted'>,
): string {
  const lines = [
    'AI Revenue Leak Audit Request',
    '',
    `Business name: ${input.businessName.trim()}`,
    `Website: ${input.website.trim()}`,
    `Google Business Profile: ${input.googleBusinessProfile.trim()}`,
    `Contact name: ${input.contactName.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Email: ${input.email.trim()}`,
    `Biggest problem: ${input.biggestProblem.trim()}`,
  ]

  const city = input.city?.trim()
  if (city) lines.push(`City: ${city}`)

  const notes = input.notes?.trim()
  if (notes) {
    lines.push('', 'Notes:', notes)
  }

  lines.push('', 'Permission to send audit: Yes')
  return lines.join('\n')
}

export function buildAuditMailtoHref(body: string): string {
  const params = new URLSearchParams()
  params.set('subject', 'AI Revenue Leak Audit Request — Stone Industries')
  params.set('body', body)
  return `mailto:${emailAddress}?${params.toString().replace(/\+/g, '%20')}`
}

export function validateAuditInput(input: AuditFormInput): AuditValidationResult {
  if (input.honeypot?.trim()) {
    return { ok: false, error: 'Unable to submit request. Please call or email instead.' }
  }

  const businessName = input.businessName.trim()
  const website = input.website.trim()
  const googleBusinessProfile = input.googleBusinessProfile.trim()
  const contactName = input.contactName.trim()
  const phone = input.phone.trim()
  const city = input.city?.trim() ?? ''
  const biggestProblem = input.biggestProblem.trim()
  const email = input.email.trim()
  const notes = input.notes?.trim() ?? ''
  const sourcePage = input.sourcePage?.trim()

  if (businessName.length < 2 || businessName.length > 120) {
    return { ok: false, error: 'Please enter your business name (2–120 characters).' }
  }

  if (website.length < 4 || website.length > 500) {
    return { ok: false, error: 'Please enter your website URL.' }
  }

  if (googleBusinessProfile.length < 4 || googleBusinessProfile.length > 500) {
    return { ok: false, error: 'Please enter your Google Business Profile link.' }
  }

  if (contactName.length < 2 || contactName.length > 100) {
    return { ok: false, error: 'Please enter your contact name (2–100 characters).' }
  }

  if (phone.length < 7 || phone.length > 40) {
    return { ok: false, error: 'Please enter a valid phone number.' }
  }

  if (city.length > 100) {
    return { ok: false, error: 'City is too long (max 100 characters).' }
  }

  if (!isValidProblem(biggestProblem)) {
    return { ok: false, error: 'Please choose your biggest problem.' }
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  if (notes.length > 2000) {
    return { ok: false, error: 'Notes are too long (max 2000 characters).' }
  }

  if (!input.permissionGranted) {
    return { ok: false, error: 'Please confirm permission to send your audit report.' }
  }

  const mailtoBody = buildAuditMailtoBody({
    businessName,
    website,
    googleBusinessProfile,
    contactName,
    phone,
    city: city || undefined,
    biggestProblem,
    email,
    notes: notes || undefined,
    sourcePage,
  })

  const messageParts = [
    'AI Revenue Leak Audit request',
    '',
    `Business: ${businessName}`,
    `Website: ${website}`,
    `Google Business Profile: ${googleBusinessProfile}`,
    `Biggest problem: ${biggestProblem}`,
  ]

  if (city) messageParts.push(`City: ${city}`)
  if (notes) {
    messageParts.push('', 'Notes:', notes)
  }

  messageParts.push('', 'Permission to send audit: Yes')

  const payload: InquiryPayload = {
    name: contactName,
    email,
    phone,
    city: city || undefined,
    service_requested: auditServiceLabel,
    message: messageParts.join('\n'),
  }

  if (sourcePage) payload.source_page = sourcePage.slice(0, 500)

  return { ok: true, payload, mailtoBody }
}
