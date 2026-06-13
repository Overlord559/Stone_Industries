// Future: HubSpot sync runs server-side via POST /api/inquiries when token is configured.
import { isInquiryConfigured, type InquiryPayload } from './inquiryTypes'

export class InquirySubmitError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InquirySubmitError'
  }
}

export type InquirySubmitResult = {
  saved: boolean
  emailNotified?: boolean
  hubspotSynced?: boolean
  inquiryId?: string
  errorCode?: string
}

const API_PATH = '/api/inquiries'

async function submitViaApi(payload: InquiryPayload): Promise<InquirySubmitResult | null> {
  try {
    const response = await fetch(API_PATH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.status === 404 || response.status === 405) {
      return null
    }

    let result: InquirySubmitResult
    try {
      result = (await response.json()) as InquirySubmitResult
    } catch {
      return null
    }

    if (result.saved) {
      return result
    }

    if (response.ok) {
      throw new InquirySubmitError(
        'We could not save your inquiry right now. Please call or email Stone Industries directly.',
      )
    }

    return null
  } catch (error) {
    if (error instanceof InquirySubmitError) throw error
    return null
  }
}

async function submitViaSupabaseDirect(payload: InquiryPayload): Promise<void> {
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

export async function submitInquiry(payload: InquiryPayload): Promise<InquirySubmitResult> {
  const apiResult = await submitViaApi(payload)
  if (apiResult?.saved) {
    return apiResult
  }

  await submitViaSupabaseDirect(payload)
  return { saved: true, emailNotified: false, hubspotSynced: false }
}

export function inquiryFormAvailable(): boolean {
  return isInquiryConfigured()
}
