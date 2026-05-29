/**
 * Stone Industries — admin lead list (Cloudflare Pages Functions).
 * Route: GET /admin/leads
 * Requires X-Stone-Admin-Token header. Uses Supabase service role — never expose to browser.
 */

const ALLOWED_STATUSES = ['new', 'contacted', 'quoted', 'booked', 'won', 'lost']

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Stone-Admin-Token',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

function buildQuery(searchParams) {
  const select =
    'id,name,email,phone,city,service_requested,message,source_page,status,created_at,' +
    'customer_type,business_name,selected_package,package_price_or_estimate,urgency,' +
    'preferred_contact,service_address_or_area,best_time_to_contact,wants_deposit_link,' +
    'estimator_selections,request_metadata'

  const query = new URLSearchParams()
  query.set('select', select)
  query.set('order', 'created_at.desc')
  query.set('limit', String(Math.min(Number(searchParams.get('limit')) || 100, 200)))

  const status = searchParams.get('status')
  if (status && ALLOWED_STATUSES.includes(status)) {
    query.set('status', 'eq.' + status)
  }
  const sourcePage = searchParams.get('source_page')
  if (sourcePage) {
    query.set('source_page', 'ilike.*' + sourcePage.trim() + '*')
  }
  const customerType = searchParams.get('customer_type')
  if (customerType) {
    query.set('customer_type', 'eq.' + customerType)
  }
  const urgency = searchParams.get('urgency')
  if (urgency) {
    query.set('urgency', 'eq.' + urgency)
  }
  const search = searchParams.get('search')
  if (search) {
    const term = search.trim().slice(0, 80)
    if (term) {
      query.set(
        'or',
        `(name.ilike.*${term}*,email.ilike.*${term}*,phone.ilike.*${term}*,selected_package.ilike.*${term}*)`,
      )
    }
  }

  return query.toString()
}

export async function onRequest(context) {
  const { request, env } = context
  const origin = request.headers.get('Origin') || ''
  const headers = corsHeaders(origin)

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers })
  }

  if (request.method !== 'GET') {
    return jsonResponse(405, { error: 'Method not allowed' }, headers)
  }

  const auth = requireAdmin(request, env)
  if (!auth.ok) {
    return jsonResponse(auth.status, { error: auth.error }, headers)
  }

  try {
    const searchParams = new URL(request.url).searchParams
    const qs = buildQuery(searchParams)
    const response = await fetch(`${auth.url}/rest/v1/inquiries?${qs}`, {
      headers: {
        apikey: auth.key,
        Authorization: 'Bearer ' + auth.key,
        'Content-Type': 'application/json',
      },
    })

    const text = await response.text()
    if (!response.ok) {
      return jsonResponse(
        response.status,
        { error: 'Supabase query failed', detail: text.slice(0, 500) },
        headers,
      )
    }

    const leads = JSON.parse(text)
    return jsonResponse(200, { leads, count: leads.length }, headers)
  } catch (_error) {
    return jsonResponse(500, { error: 'Server error' }, headers)
  }
}
