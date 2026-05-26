export type InquiryPayload = {
  name: string
  email?: string
  phone?: string
  service_requested: string
  city?: string
  message: string
  source_page?: string
}

export type InquiryValidationResult =
  | { ok: true; payload: InquiryPayload }
  | { ok: false; error: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateInquiryInput(input: {
  name: string
  email: string
  phone: string
  service_requested: string
  city: string
  message: string
  source_page?: string
  honeypot?: string
}): InquiryValidationResult {
  if (input.honeypot?.trim()) {
    return { ok: false, error: 'Unable to submit inquiry. Please call or email instead.' }
  }

  const name = input.name.trim()
  const email = input.email.trim()
  const phone = input.phone.trim()
  const service_requested = input.service_requested.trim()
  const city = input.city.trim()
  const message = input.message.trim()
  const source_page = input.source_page?.trim()

  if (name.length < 2 || name.length > 100) {
    return { ok: false, error: 'Please enter your name (2–100 characters).' }
  }

  if (!email && !phone) {
    return { ok: false, error: 'Please enter an email address or phone number.' }
  }

  if (email && (email.length > 254 || !EMAIL_PATTERN.test(email))) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  if (phone && phone.length > 40) {
    return { ok: false, error: 'Phone number is too long.' }
  }

  if (service_requested.length < 2 || service_requested.length > 120) {
    return { ok: false, error: 'Please choose a service.' }
  }

  if (city.length > 100) {
    return { ok: false, error: 'City / area is too long.' }
  }

  if (message.length < 10 || message.length > 2000) {
    return { ok: false, error: 'Please enter a message (10–2000 characters).' }
  }

  const payload: InquiryPayload = {
    name,
    service_requested,
    message,
  }

  if (email) payload.email = email
  if (phone) payload.phone = phone
  if (city) payload.city = city
  if (source_page) payload.source_page = source_page.slice(0, 500)

  return { ok: true, payload }
}

export function isInquiryConfigured(): boolean {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  return Boolean(url && anonKey)
}
