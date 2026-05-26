/**
 * Static-page inquiry form helper for Stone Industries.
 * Loads with inquiry-config.js (build-time env injection). Falls back to mailto/phone when unset.
 */
(function () {
  const SERVICE_OPTIONS = [
    'Same-Day Tech Cleanup',
    '24-Hour Business Websites',
    'Wi-Fi, Printer & POS Support',
    'Operations & Logistics Coordination Setup',
    'AI Automation & Digital Assistant Systems',
    'Custom PC Builds & Upgrades',
    'General Inquiry',
    'Subcontracting / Capability Brief',
  ]

  const SERVICE_SLUG_TO_TITLE = {
    'tech-cleanup': 'Same-Day Tech Cleanup',
    'business-websites': '24-Hour Business Websites',
    'wifi-printer-pos': 'Wi-Fi, Printer & POS Support',
    'logistics-coordination': 'Operations & Logistics Coordination Setup',
    'ai-workflow-automation': 'AI Automation & Digital Assistant Systems',
    'custom-pc-builds': 'Custom PC Builds & Upgrades',
  }

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function config() {
    return window.__SI_INQUIRY_CONFIG__ || {}
  }

  function isConfigured() {
    const cfg = config()
    return Boolean(cfg.url && cfg.anonKey)
  }

  function validateInput(input) {
    if (input.honeypot && input.honeypot.trim()) {
      return { ok: false, error: 'Unable to submit inquiry. Please call or email instead.' }
    }

    const name = (input.name || '').trim()
    const email = (input.email || '').trim()
    const phone = (input.phone || '').trim()
    const service_requested = (input.service_requested || '').trim()
    const city = (input.city || '').trim()
    const message = (input.message || '').trim()
    const source_page = (input.source_page || '').trim()

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

    const payload = { name, service_requested, message }
    if (email) payload.email = email
    if (phone) payload.phone = phone
    if (city) payload.city = city
    if (source_page) payload.source_page = source_page.slice(0, 500)
    return { ok: true, payload }
  }

  async function submitPayload(payload) {
    const cfg = config()
    const response = await fetch(`${cfg.url.replace(/\/$/, '')}/rest/v1/inquiries`, {
      method: 'POST',
      headers: {
        apikey: cfg.anonKey,
        Authorization: 'Bearer ' + cfg.anonKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('submit_failed')
  }

  function optionTags(selected) {
    return (
      '<option value="">Choose a service</option>' +
      SERVICE_OPTIONS.map(function (option) {
        const sel = option === selected ? ' selected' : ''
        return '<option value="' + option + '"' + sel + '>' + option + '</option>'
      }).join('')
    )
  }

  function defaultServiceFromQuery(fallback) {
    var params = new URLSearchParams(window.location.search)
    var slug = params.get('service')
    if (slug && SERVICE_SLUG_TO_TITLE[slug]) return SERVICE_SLUG_TO_TITLE[slug]
    return fallback || ''
  }

  function renderForm(container) {
    const sourcePage = container.dataset.sourcePage || window.location.pathname
    const defaultService = defaultServiceFromQuery(container.dataset.defaultService || '')
    const configured = isConfigured()

    container.innerHTML =
      '<section class="page-section si-inquiry-section">' +
      '<h2><span class="label">Inquiry</span> Send a service inquiry</h2>' +
      '<p class="page-lead">Submit the form below or use email/phone if you prefer. Final quote confirmed before work begins.</p>' +
      '<form class="si-inquiry-form" data-si-inquiry-form novalidate>' +
      '<div class="si-inquiry-honeypot" aria-hidden="true">' +
      '<label>Website<input name="website" type="text" tabindex="-1" autocomplete="off"></label>' +
      '</div>' +
      '<div class="si-inquiry-grid">' +
      '<label>Name *<input name="name" required autocomplete="name"></label>' +
      '<label>Service *<select name="service_requested" required>' +
      optionTags(defaultService) +
      '</select></label>' +
      '<label>Email<input name="email" type="email" autocomplete="email"></label>' +
      '<label>Phone<input name="phone" type="tel" autocomplete="tel"></label>' +
      '</div>' +
      '<p class="si-inquiry-note">Provide at least one: email or phone.</p>' +
      '<label>City / area<input name="city" autocomplete="address-level2"></label>' +
      '<label>Message *<textarea name="message" required rows="5" placeholder="What you need, timeline, and best callback time."></textarea></label>' +
      '<p class="si-inquiry-status" data-si-inquiry-status role="alert" aria-live="polite" hidden></p>' +
      '<div class="cta-band">' +
      '<button type="submit" class="cta cta-primary"' +
      (configured ? '' : ' disabled') +
      '>Submit inquiry</button>' +
      '</div>' +
      '<div class="si-email-actions">' +
      '<p class="si-email-line">Email: <a href="mailto:stoneindustries0.llc@gmail.com?subject=Stone%20Industries%20Inquiry">stoneindustries0.llc@gmail.com</a></p>' +
      '<div class="si-email-buttons">' +
      '<button type="button" class="cta cta-secondary" data-si-copy-email>Copy email</button>' +
      '<a class="cta cta-secondary" data-si-mailto-inquiry href="mailto:stoneindustries0.llc@gmail.com?subject=Stone%20Industries%20Inquiry">Open email app</a>' +
      '</div>' +
      '<p class="si-copy-status" data-si-copy-status hidden aria-live="polite">Email copied.</p>' +
      '<p class="note-muted">Prefer phone? <a href="tel:+15595799376">559-579-9376</a></p>' +
      '</div>' +
      (configured
        ? ''
        : '<p class="si-inquiry-note">Online capture is not configured in this environment. Email or call using the buttons above.</p>') +
      '</form></section>'

    const form = container.querySelector('[data-si-inquiry-form]')
    const statusEl = container.querySelector('[data-si-inquiry-status]')

    form.addEventListener('submit', async function (event) {
      event.preventDefault()
      if (!configured) return

      const data = new FormData(form)
      const validation = validateInput({
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        service_requested: data.get('service_requested'),
        city: data.get('city'),
        message: data.get('message'),
        source_page: sourcePage,
        honeypot: data.get('website'),
      })

      statusEl.hidden = false
      statusEl.classList.remove('is-success', 'is-error')

      if (!validation.ok) {
        statusEl.textContent = validation.error
        statusEl.classList.add('is-error')
        return
      }

      const submitButton = form.querySelector('button[type="submit"]')
      submitButton.disabled = true
      submitButton.textContent = 'Sending…'
      statusEl.textContent = ''

      try {
        await submitPayload(validation.payload)
        form.reset()
        statusEl.textContent =
          'Inquiry received. Stone Industries will follow up by email or phone. For urgent help, call 559-579-9376.'
        statusEl.classList.add('is-success')
      } catch (_error) {
        statusEl.textContent =
          'We could not save your inquiry right now. Please call 559-579-9376 or email stoneindustries0.llc@gmail.com.'
        statusEl.classList.add('is-error')
      } finally {
        submitButton.disabled = false
        submitButton.textContent = 'Submit inquiry'
      }
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-si-inquiry]').forEach(renderForm)
  })
})()
