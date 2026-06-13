import { buildGmailComposeUrl, buildMailto, contactEmail } from '../data/site'
import type { InquiryPayload } from './inquiryTypes'

export const INQUIRY_SOURCE_LINE = 'stoneindustriesusa.com inquiry form'

export const inquiryReceivedMessage =
  'Stone Industries received your inquiry and will review it. You can also copy the details, email them manually, or call/text if urgent.'

export const inquirySubmitFailedMessage =
  'The automatic submit did not complete. Please copy the inquiry details or email them to edward@stoneindustriesusa.com.'

export const inquiryEmailFallbackHint =
  'If you open an email draft, click Send to deliver your inquiry — Stone does not receive it until you send.'

export function buildInquirySubject(service: string, name: string): string {
  return `Stone Industries inquiry — ${service} — ${name}`
}

export function buildInquiryBody(payload: InquiryPayload): string {
  return [
    'New Stone Industries inquiry',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email ?? ''}`,
    `Phone: ${payload.phone ?? ''}`,
    `City / Area: ${payload.city ?? ''}`,
    `Service: ${payload.service_requested}`,
    'Message:',
    payload.message,
    '',
    'Source:',
    INQUIRY_SOURCE_LINE,
  ].join('\n')
}

export function formatInquiryDetails(payload: InquiryPayload): string {
  return buildInquiryBody(payload)
}

export function buildInquiryMailto(payload: InquiryPayload): string {
  return buildMailto(
    buildInquirySubject(payload.service_requested, payload.name),
    buildInquiryBody(payload),
  )
}

export function buildInquiryGmailUrl(payload: InquiryPayload): string {
  return buildGmailComposeUrl(
    buildInquirySubject(payload.service_requested, payload.name),
    buildInquiryBody(payload),
  )
}

export function openInquiryMailto(payload: InquiryPayload): void {
  const url = buildInquiryMailto(payload)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}

async function copyText(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      /* fall through */
    }
  }

  if (typeof document === 'undefined') return false

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', 'true')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(textarea)
    return copied
  } catch {
    return false
  }
}

export async function copyInquiryDetails(payload: InquiryPayload): Promise<boolean> {
  return copyText(formatInquiryDetails(payload))
}

export async function copyInquiryContactEmail(): Promise<boolean> {
  return copyText(contactEmail)
}
