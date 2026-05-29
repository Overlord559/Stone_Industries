/**
 * Stone Industries — admin lead status update (Cloudflare Pages Functions).
 * Route: PATCH /admin/lead-update
 * No deletes. Requires X-Stone-Admin-Token header.
 */

const ALLOWED_STATUSES = ['new', 'contacted', 'quoted', 'booked', 'won', 'lost']

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Stone-Admin-Token',
    'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
  }
}

function jsonResponse(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  })
}

function requireAdmin(request, env) {
  const expected = env.STONE_ADMIN_TOKEN
  if (!expected) {
    return { ok: false, status: 503, error: 'Admin API not configured' }
  }
  const token = request.headers.get('x-stone-admin-token')
  if (!token || token !== expected) {
    return { ok: false, status: 401, error: 'Unauthorized' }
  }
  const url = env.SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return { ok: false, status: 503, error: 'Supabase admin env not configured' }
  }
  return { ok: true, url: url.replace(/\/$/, ''), key }
}

export async function onRequest(context) {
  const { request, env } = context
  const origin = request.headers.get('Origin') || ''
  const headers = corsHeaders(origin)

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers })
  }

  if (request.method !== 'PATCH') {
    return jsonResponse(405, { error: 'Method not allowed' }, headers)
  }

  const auth = requireAdmin(request, env)
  if (!auth.ok) {
    return jsonResponse(auth.status, { error: auth.error }, headers)
  }

  let body
  try {
    body = await request.json()
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
      return jsonResponse(
        response.status,
        { error: 'Supabase update failed', detail: text.slice(0, 500) },
        headers,
      )
    }

    const rows = JSON.parse(text)
    return jsonResponse(200, { lead: rows[0] || null, status }, headers)
  } catch (_error) {
    return jsonResponse(500, { error: 'Server error' }, headers)
  }
}
