/**
 * Stone Industries — admin lead status update (server-side only).
 * PATCH only. No deletes. Requires STONE_ADMIN_TOKEN header.
 */

const ALLOWED_STATUSES = ['new', 'contacted', 'quoted', 'booked', 'won', 'lost']

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Stone-Admin-Token',
    'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
  }
}

function jsonResponse(statusCode, body, extraHeaders) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  }
}

function requireAdmin(event) {
  const expected = process.env.STONE_ADMIN_TOKEN
  if (!expected) {
    return { ok: false, status: 503, error: 'Admin API not configured' }
  }
  const token = event.headers['x-stone-admin-token'] || event.headers['X-Stone-Admin-Token']
  if (!token || token !== expected) {
    return { ok: false, status: 401, error: 'Unauthorized' }
  }
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return { ok: false, status: 503, error: 'Supabase admin env not configured' }
  }
  return { ok: true, url: url.replace(/\/$/, ''), key }
}

exports.handler = async function handler(event) {
  const origin = event.headers.origin || event.headers.Origin || ''
  const headers = corsHeaders(origin)

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  if (event.httpMethod !== 'PATCH') {
    return jsonResponse(405, { error: 'Method not allowed' }, headers)
  }

  const auth = requireAdmin(event)
  if (!auth.ok) {
    return jsonResponse(auth.status, { error: auth.error }, headers)
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch (_error) {
    return jsonResponse(400, { error: 'Invalid JSON body' }, headers)
  }

  const id = (body.id || '').trim()
  const status = (body.status || '').trim()

  if (!id) {
    return jsonResponse(400, { error: 'Missing lead id' }, headers)
  }
  if (!ALLOWED_STATUSES.includes(status)) {
    return jsonResponse(400, { error: 'Invalid status', allowed: ALLOWED_STATUSES }, headers)
  }

  try {
    const response = await fetch(`${auth.url}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        apikey: auth.key,
        Authorization: 'Bearer ' + auth.key,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ status }),
    })

    const text = await response.text()
    if (!response.ok) {
      return jsonResponse(response.status, { error: 'Supabase update failed', detail: text.slice(0, 500) }, headers)
    }

    const rows = JSON.parse(text)
    return jsonResponse(200, { lead: rows[0] || null, status }, headers)
  } catch (error) {
    return jsonResponse(500, { error: 'Server error' }, headers)
  }
}
