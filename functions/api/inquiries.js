/**
 * Stone Industries — server-side lead router (Cloudflare Pages Functions).
 * Route: POST /api/inquiries
 *
 * Order: validate → Supabase save → Resend notify → HubSpot sync.
 * Customer success requires Supabase save only; email/HubSpot failures are logged, not fatal.
 */

const DEFAULT_NOTIFY_EMAIL = 'edward@stoneindustriesusa.com'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ENHANCED_FIELD_KEYS = [
  'customer_type',
  'business_name',
  'selected_package',
  'package_price_or_estimate',
  'urgency',
  'preferred_contact',
  'service_address_or_area',
  'best_time_to_contact',
  'wants_deposit_link',
  'estimator_selections',
  'request_metadata',
]

function jsonResponse(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  })
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

function trim(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function splitName(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return { firstname: '', lastname: '' }
  if (parts.length === 1) return { firstname: parts[0], lastname: '' }
  return { firstname: parts[0], lastname: parts.slice(1).join(' ') }
}

function validateInquiry(body) {
  const honeypot = trim(body.website) || trim(body.honeypot)
  if (honeypot) {
    return { ok: false, errorCode: 'spam_detected' }
  }

  const name = trim(body.name)
  const email = trim(body.email)
  const phone = trim(body.phone)
  const service_requested = trim(body.service_requested)
  const city = trim(body.city)
  const message = trim(body.message)
  const source_page = trim(body.source_page)

  if (name.length < 2 || name.length > 100) {
    return { ok: false, errorCode: 'invalid_name' }
  }
  if (!email && !phone) {
    return { ok: false, errorCode: 'contact_required' }
  }
  if (email && (email.length > 254 || !EMAIL_PATTERN.test(email))) {
    return { ok: false, errorCode: 'invalid_email' }
  }
  if (phone && phone.length > 40) {
    return { ok: false, errorCode: 'invalid_phone' }
  }
  if (service_requested.length < 2 || service_requested.length > 120) {
    return { ok: false, errorCode: 'invalid_service' }
  }
  if (city.length > 100) {
    return { ok: false, errorCode: 'invalid_city' }
  }
  if (message.length < 10 || message.length > 2000) {
    return { ok: false, errorCode: 'invalid_message' }
  }

  const payload = {
    name,
    service_requested,
    message,
    status: 'new',
  }
  if (email) payload.email = email
  if (phone) payload.phone = phone
  if (city) payload.city = city
  if (source_page) payload.source_page = source_page.slice(0, 500)

  for (const key of ENHANCED_FIELD_KEYS) {
    if (body[key] !== undefined && body[key] !== null && body[key] !== '') {
      payload[key] = body[key]
    }
  }

  return { ok: true, payload }
}

async function saveToSupabase(env, payload) {
  const url = env.SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return { saved: false, errorCode: 'supabase_not_configured' }
  }

  const base = url.replace(/\/$/, '')
  const response = await fetch(`${base}/rest/v1/inquiries`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  })

  const text = await response.text()
  if (!response.ok) {
    console.warn('[Stone] Supabase insert failed:', response.status, text.slice(0, 300))
    return { saved: false, errorCode: 'supabase_insert_failed' }
  }

  let row = null
  try {
    const rows = JSON.parse(text)
    row = Array.isArray(rows) ? rows[0] : rows
  } catch (_error) {
    row = null
  }

  return { saved: true, inquiryId: row?.id || null, createdAt: row?.created_at || null }
}

function buildNotificationEmail(inquiry, inquiryId, createdAt) {
  const timestamp = createdAt || new Date().toISOString()
  const subject = `New Stone inquiry — ${inquiry.service_requested} — ${inquiry.name}`
  const text = [
    'New Stone Industries inquiry',
    '',
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email || ''}`,
    `Phone: ${inquiry.phone || ''}`,
    `City: ${inquiry.city || ''}`,
    `Service requested: ${inquiry.service_requested}`,
    '',
    'Message:',
    inquiry.message,
    '',
    `Source page: ${inquiry.source_page || 'stoneindustriesusa.com inquiry form'}`,
    `Timestamp: ${timestamp}`,
    inquiryId ? `Supabase inquiry id: ${inquiryId}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  return { subject, text }
}

async function sendNotificationEmail(env, inquiry, inquiryId, createdAt) {
  const apiKey = env.RESEND_API_KEY
  const from = env.RESEND_FROM || env.STONE_FROM_EMAIL
  const to = env.STONE_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL

  if (!apiKey) {
    console.warn('[Stone] RESEND_API_KEY not configured — skipping email notification')
    return { emailNotified: false }
  }
  if (!from) {
    console.warn('[Stone] RESEND_FROM not configured — skipping email notification')
    return { emailNotified: false }
  }

  const { subject, text } = buildNotificationEmail(inquiry, inquiryId, createdAt)

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.warn('[Stone] Resend failed:', response.status, detail.slice(0, 300))
      return { emailNotified: false }
    }

    return { emailNotified: true }
  } catch (error) {
    console.warn('[Stone] Resend error:', error?.message || 'unknown')
    return { emailNotified: false }
  }
}

async function createHubSpotNote(token, contactId, noteBody) {
  const response = await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: noteBody,
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
        },
      ],
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    console.warn('[Stone] HubSpot note failed:', response.status, detail.slice(0, 300))
  }
}

async function syncHubSpot(env, inquiry, inquiryId) {
  const token = env.HUBSPOT_PRIVATE_APP_TOKEN
  if (!token) {
    return { hubspotSynced: false }
  }
  if (!inquiry.email) {
    console.warn('[Stone] HubSpot sync skipped — no email on inquiry')
    return { hubspotSynced: false }
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const { firstname, lastname } = splitName(inquiry.name)
  const properties = {
    email: inquiry.email,
    firstname,
    lastname,
  }
  if (inquiry.phone) properties.phone = inquiry.phone
  if (inquiry.city) properties.city = inquiry.city

  let contactId = null

  try {
    const searchResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [{ propertyName: 'email', operator: 'EQ', value: inquiry.email }],
          },
        ],
        properties: ['email'],
        limit: 1,
      }),
    })

    if (searchResponse.ok) {
      const searchData = await searchResponse.json()
      if (searchData.results?.length) {
        contactId = searchData.results[0].id
        const updateResponse = await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
          {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ properties }),
          },
        )
        if (!updateResponse.ok) {
          console.warn('[Stone] HubSpot contact update failed:', updateResponse.status)
        }
      }
    }

    if (!contactId) {
      const createResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers,
        body: JSON.stringify({ properties }),
      })

      if (createResponse.ok) {
        const created = await createResponse.json()
        contactId = created.id
      } else if (createResponse.status === 409) {
        console.warn('[Stone] HubSpot contact duplicate conflict — skipping sync')
        return { hubspotSynced: false }
      } else {
        const detail = await createResponse.text()
        console.warn('[Stone] HubSpot contact create failed:', createResponse.status, detail.slice(0, 300))
        return { hubspotSynced: false }
      }
    }

    const noteBody = [
      `New inquiry via stoneindustriesusa.com`,
      `Service: ${inquiry.service_requested}`,
      '',
      inquiry.message,
      '',
      inquiry.source_page ? `Source page: ${inquiry.source_page}` : '',
      inquiryId ? `Supabase inquiry id: ${inquiryId}` : '',
      `Submitted: ${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join('\n')

    await createHubSpotNote(token, contactId, noteBody)
    return { hubspotSynced: true }
  } catch (error) {
    console.warn('[Stone] HubSpot sync error:', error?.message || 'unknown')
    return { hubspotSynced: false }
  }
}

export async function onRequest(context) {
  const { request, env } = context
  const origin = request.headers.get('Origin') || ''
  const headers = corsHeaders(origin)

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers })
  }

  if (request.method !== 'POST') {
    return jsonResponse(405, { saved: false, errorCode: 'method_not_allowed' }, headers)
  }

  let body
  try {
    body = await request.json()
  } catch (_error) {
    return jsonResponse(400, { saved: false, errorCode: 'invalid_json' }, headers)
  }

  const validation = validateInquiry(body)
  if (!validation.ok) {
    return jsonResponse(400, { saved: false, errorCode: validation.errorCode }, headers)
  }

  const saveResult = await saveToSupabase(env, validation.payload)
  if (!saveResult.saved) {
    return jsonResponse(
      503,
      { saved: false, emailNotified: false, hubspotSynced: false, errorCode: saveResult.errorCode },
      headers,
    )
  }

  const emailResult = await sendNotificationEmail(
    env,
    validation.payload,
    saveResult.inquiryId,
    saveResult.createdAt,
  )
  const hubspotResult = await syncHubSpot(env, validation.payload, saveResult.inquiryId)

  return jsonResponse(
    200,
    {
      saved: true,
      inquiryId: saveResult.inquiryId || undefined,
      emailNotified: emailResult.emailNotified === true,
      hubspotSynced: hubspotResult.hubspotSynced === true,
    },
    headers,
  )
}
