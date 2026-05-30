import { isInquiryConfigured, type InquiryPayload } from './inquiryTypes'

export class InquirySubmitError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InquirySubmitError'
  }
}

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new InquirySubmitError(
      'We could not save your inquiry right now. Please call or email Stone Industries directly.',
    )
  }

  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/inquiries`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new InquirySubmitError(
      'We could not save your inquiry right now. Please call or email Stone Industries directly.',
    )
  }
}

export function inquiryFormAvailable(): boolean {
  return isInquiryConfigured()
}
