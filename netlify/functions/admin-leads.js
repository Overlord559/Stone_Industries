/**
 * Stone Industries — admin lead list (server-side only).
 * Requires STONE_ADMIN_TOKEN header. Uses Supabase service role — never expose to browser.
 */

const ALLOWED_STATUSES = ['new', 'contacted', 'quoted', 'booked', 'won', 'lost']

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Stone-Admin-Token',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

function buildQuery(params) {
  const select =
    'id,name,email,phone,city,service_requested,message,source_page,status,created_at,' +
    'customer_type,business_name,selected_package,package_price_or_estimate,urgency,' +
    'preferred_contact,service_address_or_area,best_time_to_contact,wants_deposit_link,' +
    'estimator_selections,request_metadata'

  const query = new URLSearchParams()
  query.set('select', select)
  query.set('order', 'created_at.desc')
  query.set('limit', String(Math.min(Number(params.limit) || 100, 200)))

  if (params.status && ALLOWED_STATUSES.includes(params.status)) {
    query.set('status', 'eq.' + params.status)
  }
  if (params.source_page) {
    query.set('source_page', 'ilike.*' + params.source_page.trim() + '*')
  }
  if (params.customer_type) {
    query.set('customer_type', 'eq.' + params.customer_type)
  }
  if (params.urgency) {
    query.set('urgency', 'eq.' + params.urgency)
  }
  if (params.search) {
    const term = params.search.trim().slice(0, 80)
    if (term) {
      query.set('or', `(name.ilike.*${term}*,email.ilike.*${term}*,phone.ilike.*${term}*,selected_package.ilike.*${term}*)`)
    }
  }

  return query.toString()
}

exports.handler = async function handler(event) {
  const origin = event.headers.origin || event.headers.Origin || ''
  const headers = corsHeaders(origin)

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { error: 'Method not allowed' }, headers)
  }

  const auth = requireAdmin(event)
  if (!auth.ok) {
    return jsonResponse(auth.status, { error: auth.error }, headers)
  }

  try {
    const params = event.queryStringParameters || {}
    const qs = buildQuery(params)
    const response = await fetch(`${auth.url}/rest/v1/inquiries?${qs}`, {
      headers: {
        apikey: auth.key,
        Authorization: 'Bearer ' + auth.key,
        'Content-Type': 'application/json',
      },
    })

    const text = await response.text()
    if (!response.ok) {
      return jsonResponse(response.status, { error: 'Supabase query failed', detail: text.slice(0, 500) }, headers)
    }

    const leads = JSON.parse(text)
    return jsonResponse(200, { leads, count: leads.length }, headers)
  } catch (error) {
    return jsonResponse(500, { error: 'Server error' }, headers)
  }
}
