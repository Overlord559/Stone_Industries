/**
 * Shared Supabase inquiry submit with enhanced-field fallback.
 * Tries full payload first; on schema/column errors retries legacy columns only.
 */
(function () {
  function config() {
    return window.__SI_INQUIRY_CONFIG__ || {}
  }

  function isConfigured() {
    var cfg = config()
    return Boolean(cfg.url && cfg.anonKey)
  }

  function legacyPayload(payload) {
    var legacy = {
      name: payload.name,
      service_requested: payload.service_requested,
      message: payload.message,
    }
    if (payload.email) legacy.email = payload.email
    if (payload.phone) legacy.phone = payload.phone
    if (payload.city) legacy.city = payload.city
    if (payload.source_page) legacy.source_page = payload.source_page
    return legacy
  }

  function isSchemaColumnError(status, bodyText) {
    if (status !== 400 && status !== 406 && status !== 422) return false
    var text = String(bodyText || '').toLowerCase()
    return (
      text.indexOf('column') !== -1 ||
      text.indexOf('pgrst204') !== -1 ||
      text.indexOf('schema cache') !== -1 ||
      text.indexOf('could not find') !== -1
    )
  }

  async function postPayload(payload) {
    var cfg = config()
    var response = await fetch(cfg.url.replace(/\/$/, '') + '/rest/v1/inquiries', {
      method: 'POST',
      headers: {
        apikey: cfg.anonKey,
        Authorization: 'Bearer ' + cfg.anonKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    })

    var bodyText = ''
    try {
      bodyText = await response.text()
    } catch (_error) {
      bodyText = ''
    }

    return { ok: response.ok, status: response.status, bodyText: bodyText }
  }

  /**
   * @param {object} basePayload Legacy-safe columns (required).
   * @param {object|null} enhancedFields Optional structured package fields.
   * @returns {Promise<{mode: 'enhanced'|'legacy', ok: true}>}
   */
  async function submitInquiryWithFallback(basePayload, enhancedFields) {
    if (!isConfigured()) throw new Error('not_configured')

    var legacy = legacyPayload(basePayload)

    if (enhancedFields && Object.keys(enhancedFields).length) {
      var enhanced = Object.assign({}, legacy, enhancedFields)
      var enhancedResult = await postPayload(enhanced)

      if (enhancedResult.ok) {
        return { mode: 'enhanced', ok: true }
      }

      if (isSchemaColumnError(enhancedResult.status, enhancedResult.bodyText)) {
        var legacyResult = await postPayload(legacy)
        if (legacyResult.ok) {
          if (typeof console !== 'undefined' && console.info) {
            console.info('[Stone] Inquiry saved via legacy columns — apply extended-fields SQL migration for structured package columns.')
          }
          return { mode: 'legacy', ok: true }
        }
      }

      throw new Error('submit_failed')
    }

    var result = await postPayload(legacy)
    if (result.ok) return { mode: 'legacy', ok: true }
    throw new Error('submit_failed')
  }

  window.SI_submitInquiryWithFallback = submitInquiryWithFallback
  window.SI_inquirySubmitConfigured = isConfigured
})()
