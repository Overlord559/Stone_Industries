import { contactEmail } from '../data/site'
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
  phone: string
  services: string
  city: string
  biggestProblem: string
  email: string
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

export function buildAuditMailtoBody(input: Omit<AuditFormInput, 'honeypot' | 'permissionGranted'>): string {
  return [
    'Free Revenue Leak Audit Request',
    '',
    `Business name: ${input.businessName.trim()}`,
    `Website: ${input.website.trim()}`,
    `Google Business Profile: ${input.googleBusinessProfile.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Services: ${input.services.trim()}`,
    `City: ${input.city.trim()}`,
    `Biggest problem: ${input.biggestProblem.trim()}`,
    `Email: ${input.email.trim()}`,
    '',
    'Permission to send audit: Yes',
  ].join('\n')
}

export function buildAuditMailtoHref(body: string): string {
  const params = new URLSearchParams()
  params.set('subject', 'Free Revenue Leak Audit Request — Stone Industries')
  params.set('body', body)
  return `mailto:${contactEmail}?${params.toString()}`
}

export function validateAuditInput(input: AuditFormInput): AuditValidationResult {
  if (input.honeypot?.trim()) {
    return { ok: false, error: 'Unable to submit request. Please call or email instead.' }
  }

  const businessName = input.businessName.trim()
  const website = input.website.trim()
  const googleBusinessProfile = input.googleBusinessProfile.trim()
  const phone = input.phone.trim()
  const services = input.services.trim()
  const city = input.city.trim()
  const biggestProblem = input.biggestProblem.trim()
  const email = input.email.trim()
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

  if (phone.length < 7 || phone.length > 40) {
    return { ok: false, error: 'Please enter a valid phone number.' }
  }

  if (services.length < 2 || services.length > 500) {
    return { ok: false, error: 'Please describe your services.' }
  }

  if (city.length < 2 || city.length > 100) {
    return { ok: false, error: 'Please enter your city.' }
  }

  if (!isValidProblem(biggestProblem)) {
    return { ok: false, error: 'Please choose your biggest problem.' }
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  if (!input.permissionGranted) {
    return { ok: false, error: 'Please confirm permission to send your audit report.' }
  }

  const mailtoBody = buildAuditMailtoBody({
    businessName,
    website,
    googleBusinessProfile,
    phone,
    services,
    city,
    biggestProblem,
    email,
    sourcePage,
  })

  const message = [
    'Free Revenue Leak Audit request',
    '',
    `Website: ${website}`,
    `Google Business Profile: ${googleBusinessProfile}`,
    `Services: ${services}`,
    `Biggest problem: ${biggestProblem}`,
    'Permission to send audit: Yes',
  ].join('\n')

  const payload: InquiryPayload = {
    name: businessName,
    email,
    phone,
    city,
    service_requested: auditServiceLabel,
    message,
  }

  if (sourcePage) payload.source_page = sourcePage.slice(0, 500)

  return { ok: true, payload, mailtoBody }
}
