/**
 * Static-page inquiry form — Supabase capture first; email drafts are manual fallback only.
 */
(function () {
  var EMAIL = 'edward@stoneindustriesusa.com'
  var PHONE = '559-579-9376'
  var PHONE_HREF = 'tel:+15595799376'
  var CALENDLY_URL =
    'https://calendly.com/edward-stoneindustriesusa/general-business-tech-consultation'
  var SOURCE_LINE = 'stoneindustriesusa.com inquiry form'

  var RECEIVED_MESSAGE =
    'Stone Industries received your inquiry and will review it. You can book a call now, call/text if urgent, or wait for a follow-up.'
  var FAILED_MESSAGE =
    'The automatic submit did not complete. Please copy the inquiry details or email them to edward@stoneindustriesusa.com.'
  var EMAIL_FALLBACK_HINT =
    'If you open an email draft, click Send to deliver your inquiry — Stone does not receive it until you send.'

  var SERVICE_OPTIONS = [
    'Free Remote Revenue Leak Review',
    'AI Revenue Leak Audit (paid)',
    'AI Customer Engine Sprint',
    'Remote Quick Fix',
    'Remote Business Tech Session',
    'Managed AI Ops',
    'Custom PC Builds & Upgrades',
    'Tier 1 IT Support & Tech Cleanup',
    'Wi-Fi, Printer & POS Support',
    'Business Websites & 3D Interactive Websites',
    'AI Receptionist & Workflow Automation',
    'Mobile App / MVP Prototyping',
    'Operations & Technology Project Coordination',
    'General Inquiry',
    'Subcontracting / Capability Brief',
  ]

  var SERVICE_SLUG_TO_TITLE = {
    'custom-pc-builds': 'Custom PC Builds & Upgrades',
    'tech-cleanup': 'Tier 1 IT Support & Tech Cleanup',
    'business-websites': 'Business Websites & 3D Interactive Websites',
    'wifi-printer-pos': 'Wi-Fi, Printer & POS Support',
    'logistics-coordination': 'Operations & Technology Project Coordination',
    'ai-workflow-automation': 'AI Receptionist & Workflow Automation',
    'mobile-app-mvp': 'Mobile App / MVP Prototyping',
  }

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function isConfigured() {
    if (typeof window.SI_inquirySubmitConfigured === 'function') {
      return window.SI_inquirySubmitConfigured()
    }
    var cfg = window.__SI_INQUIRY_CONFIG__ || {}
    return Boolean(cfg.url && cfg.anonKey)
  }

  function validateInput(input) {
    if (input.honeypot && input.honeypot.trim()) {
      return { ok: false, error: 'Unable to submit inquiry. Please call or email instead.' }
    }

    var name = (input.name || '').trim()
    var email = (input.email || '').trim()
    var phone = (input.phone || '').trim()
    var service_requested = (input.service_requested || '').trim()
    var city = (input.city || '').trim()
    var message = (input.message || '').trim()
    var source_page = (input.source_page || '').trim()

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

    var payload = { name: name, service_requested: service_requested, message: message }
    if (email) payload.email = email
    if (phone) payload.phone = phone
    if (city) payload.city = city
    if (source_page) payload.source_page = source_page.slice(0, 500)
    return { ok: true, payload: payload }
  }

  function buildSubject(payload) {
    return 'Stone Industries inquiry — ' + payload.service_requested + ' — ' + payload.name
  }

  function buildBody(payload) {
    return [
      'New Stone Industries inquiry',
      '',
      'Name: ' + payload.name,
      'Email: ' + (payload.email || ''),
      'Phone: ' + (payload.phone || ''),
      'City / Area: ' + (payload.city || ''),
      'Service: ' + payload.service_requested,
      'Message:',
      payload.message,
      '',
      'Source:',
      payload.source_page || SOURCE_LINE,
    ].join('\n')
  }

  function buildMailto(payload) {
    var params = new URLSearchParams()
    params.set('subject', buildSubject(payload))
    params.set('body', buildBody(payload))
    return 'mailto:' + EMAIL + '?' + params.toString().replace(/\+/g, '%20')
  }

  function buildGmailUrl(payload) {
    var params = new URLSearchParams()
    params.set('view', 'cm')
    params.set('fs', '1')
    params.set('to', EMAIL)
    params.set('su', buildSubject(payload))
    params.set('body', buildBody(payload))
    return 'https://mail.google.com/mail/?' + params.toString()
  }

  async function submitInquiry(payload) {
    if (typeof window.SI_submitInquiryWithFallback !== 'function') {
      throw new Error('submit_unavailable')
    }
    if (!isConfigured()) {
      throw new Error('not_configured')
    }
    await window.SI_submitInquiryWithFallback(payload, null)
  }

  function copyText(text, onSuccess) {
    function legacyCopy() {
      try {
        var ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', 'true')
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        var ok = document.execCommand('copy')
        document.body.removeChild(ta)
        if (ok && onSuccess) onSuccess()
      } catch (_e) {
        /* no-op */
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(legacyCopy)
    } else {
      legacyCopy()
    }
  }

  function optionTags(selected) {
    return (
      '<option value="">Choose a service</option>' +
      SERVICE_OPTIONS.map(function (option) {
        var sel = option === selected ? ' selected' : ''
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

  function renderOutcome(container, payload, mode, onReset) {
    var isSuccess = mode === 'success'
    var title = isSuccess ? 'Inquiry received' : 'Inquiry was not sent automatically'
    var body = isSuccess ? RECEIVED_MESSAGE : FAILED_MESSAGE
    var emailHref = isSuccess ? buildGmailUrl(payload) : buildMailto(payload)
    var emailLabel = isSuccess ? 'Email instead' : 'Open email draft'
    var emailTarget = isSuccess ? ' target="_blank" rel="noopener noreferrer"' : ''

    container.innerHTML =
      '<section class="page-section si-inquiry-section ' +
      (isSuccess ? 'si-inquiry-success' : 'si-inquiry-failure') +
      '">' +
      '<h2><span class="label">Inquiry</span> ' +
      title +
      '</h2>' +
      '<p class="page-lead">' +
      body +
      '</p>' +
      (isSuccess
        ? ''
        : '<p class="note-muted">' + EMAIL_FALLBACK_HINT + '</p>') +
      '<div class="cta-band">' +
      (isSuccess
        ? '<a class="cta cta-primary" href="' +
          CALENDLY_URL +
          '" target="_blank" rel="noopener noreferrer">Book free consultation</a>'
        : '') +
      '<a class="cta cta-secondary" href="' +
      PHONE_HREF +
      '">Call / text ' +
      PHONE +
      '</a>' +
      '<button type="button" class="cta cta-secondary" data-si-copy-inquiry>Copy inquiry details</button>' +
      '<a class="cta cta-secondary" data-si-email-fallback href="' +
      emailHref +
      '"' +
      emailTarget +
      '>' +
      emailLabel +
      '</a>' +
      '</div>' +
      '<p class="si-copy-status" data-si-copy-status hidden aria-live="polite"></p>' +
      (isSuccess
        ? '<button type="button" class="cta cta-secondary" data-si-inquiry-reset>Send another inquiry</button>'
        : '<button type="button" class="cta cta-secondary" data-si-copy-email>Copy email</button>') +
      '</section>'

    container.querySelector('[data-si-copy-inquiry]').addEventListener('click', function () {
      var status = container.querySelector('[data-si-copy-status]')
      copyText(buildBody(payload), function () {
        if (status) {
          status.hidden = false
          status.textContent = 'Inquiry details copied.'
        }
      })
    })

    var copyEmailBtn = container.querySelector('[data-si-copy-email]')
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', function () {
        var status = container.querySelector('[data-si-copy-status]')
        copyText(EMAIL, function () {
          if (status) {
            status.hidden = false
            status.textContent = 'Email copied.'
          }
        })
      })
    }

    var resetBtn = container.querySelector('[data-si-inquiry-reset]')
    if (resetBtn) {
      resetBtn.addEventListener('click', onReset)
    }
  }

  function renderForm(container) {
    var defaultService = defaultServiceFromQuery(container.dataset.defaultService || '')
    var sourcePage = container.dataset.sourcePage || ''
    var configured = isConfigured()

    container.innerHTML =
      '<section class="page-section si-inquiry-section">' +
      '<h2><span class="label">Inquiry</span> Send a service inquiry</h2>' +
      '<p class="page-lead">' +
      (configured
        ? 'Submit sends your inquiry to Stone Industries. We review every message and follow up by email or phone.'
        : 'Submit will try to save your inquiry. If automatic delivery is unavailable, use copy or email fallback below.') +
      '</p>' +
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
      '<button type="submit" class="cta cta-primary">Submit inquiry</button>' +
      '</div>' +
      '<div class="si-email-actions">' +
      '<p class="si-email-line">Email: <a href="mailto:edward@stoneindustriesusa.com?subject=Stone%20Industries%20Inquiry">edward@stoneindustriesusa.com</a></p>' +
      '<div class="si-email-buttons">' +
      '<button type="button" class="cta cta-secondary" data-si-copy-email>Copy email</button>' +
      '<a class="cta cta-secondary" href="https://mail.google.com/mail/?view=cm&fs=1&to=edward@stoneindustriesusa.com&su=Stone%20Industries%20Inquiry" target="_blank" rel="noopener noreferrer">Open Gmail</a>' +
      '</div>' +
      '<p class="si-copy-status" data-si-copy-status hidden aria-live="polite">Email copied.</p>' +
      '<p class="note-muted">Prefer phone? <a href="' +
      PHONE_HREF +
      '">' +
      PHONE +
      '</a></p>' +
      '</div>' +
      '</form></section>'

    var form = container.querySelector('[data-si-inquiry-form]')
    var statusEl = container.querySelector('[data-si-inquiry-status]')

    form.querySelector('[data-si-copy-email]').addEventListener('click', function () {
      var status = container.querySelector('[data-si-copy-status]')
      copyText(EMAIL, function () {
        if (status) {
          status.hidden = false
          status.textContent = 'Email copied.'
        }
      })
    })

    form.addEventListener('submit', async function (event) {
      event.preventDefault()

      var data = new FormData(form)
      var validation = validateInput({
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        service_requested: data.get('service_requested'),
        city: data.get('city'),
        message: data.get('message'),
        honeypot: data.get('website'),
        source_page: sourcePage,
      })

      statusEl.hidden = false
      statusEl.classList.remove('is-success', 'is-error')

      if (!validation.ok) {
        statusEl.textContent = validation.error
        statusEl.classList.add('is-error')
        return
      }

      var submitButton = form.querySelector('button[type="submit"]')
      submitButton.disabled = true
      submitButton.textContent = 'Sending…'
      statusEl.textContent = ''
      statusEl.hidden = true

      try {
        await submitInquiry(validation.payload)
        renderOutcome(container, validation.payload, 'success', function () {
          renderForm(container)
        })
      } catch (_error) {
        renderOutcome(container, validation.payload, 'failure', function () {
          renderForm(container)
        })
      }
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-si-inquiry]').forEach(renderForm)
  })
})()
