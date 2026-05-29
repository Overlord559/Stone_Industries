/**
 * Pricing page package request modal — captures contact + package details via Supabase inquiries.
 * Reuses inquiry-config.js (same insert path as inquiry-form.js). No fake success.
 */
(function () {
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  var SOURCE_PAGE = '/pricing.html#package-estimator'

  function config() {
    return window.__SI_INQUIRY_CONFIG__ || {}
  }

  function isConfigured() {
    var cfg = config()
    return Boolean(cfg.url && cfg.anonKey)
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function buildEstimatorSummary(prefill) {
    if (prefill.estimatorSummary) return prefill.estimatorSummary
    var lines = []
    if (prefill.serviceCategory) lines.push('Service: ' + prefill.serviceCategory)
    if (prefill.selectedPackage) lines.push('Package: ' + prefill.selectedPackage)
    if (prefill.packagePriceOrEstimate) lines.push('Estimated price: ' + prefill.packagePriceOrEstimate)
    return lines.join('\n')
  }

  function buildMessage(input, prefill) {
    var lines = [
      'Package request (pricing page)',
      '',
      'Customer type: ' + input.customerType,
      'Service category: ' + (prefill.serviceCategory || input.serviceCategory || ''),
      'Selected package: ' + (prefill.selectedPackage || input.selectedPackage || ''),
      'Package price / estimate: ' + (prefill.packagePriceOrEstimate || input.packagePriceOrEstimate || ''),
      'Urgency: ' + input.urgency,
      'Preferred contact: ' + input.preferredContact,
      'City: ' + input.city,
      'Service address / area: ' + input.serviceAddressOrArea,
    ]

    if (input.businessName) lines.push('Business name: ' + input.businessName)
    if (input.bestTimeToContact) lines.push('Best time to contact: ' + input.bestTimeToContact)
    if (input.budgetRange) lines.push('Budget range: ' + input.budgetRange)
    if (input.wantsDepositLink === 'yes') {
      lines.push('Wants deposit link after quote: Yes (no payment on site today)')
    }

    lines.push('', 'Service need / description:', input.description, '', 'Estimator selections:', buildEstimatorSummary(prefill))

    if (prefill.packageIncludes && prefill.packageIncludes.length) {
      lines.push('', 'Package includes:', prefill.packageIncludes.join(' · '))
    }

    lines.push('', 'Submitted at: ' + new Date().toISOString())
    return lines.join('\n').slice(0, 2000)
  }

  function buildMailtoHref(input, prefill) {
    var body = buildMessage(input, prefill)
    var subject =
      'Package Request — ' +
      (prefill.selectedPackage || 'Stone Industries') +
      ' — Stone Industries'
    var params = new URLSearchParams()
    params.set('subject', subject)
    params.set('body', body)
    return 'mailto:stoneindustries0.llc@gmail.com?' + params.toString()
  }

  function validateInput(input, prefill) {
    if (input.honeypot && input.honeypot.trim()) {
      return { ok: false, error: 'Unable to submit request. Please call or email instead.' }
    }

    var name = (input.name || '').trim()
    var email = (input.email || '').trim()
    var phone = (input.phone || '').trim()
    var customerType = (input.customerType || '').trim()
    var urgency = (input.urgency || '').trim()
    var city = (input.city || '').trim()
    var serviceAddressOrArea = (input.serviceAddressOrArea || '').trim()
    var preferredContact = (input.preferredContact || '').trim()
    var description = (input.description || '').trim()
    var businessName = (input.businessName || '').trim()
    var selectedPackage = (prefill.selectedPackage || input.selectedPackage || '').trim()
    var serviceCategory = (prefill.serviceCategory || input.serviceCategory || '').trim()

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
    if (customerType !== 'residential' && customerType !== 'business') {
      return { ok: false, error: 'Please choose residential or business.' }
    }
    if (customerType === 'business' && businessName.length < 2) {
      return { ok: false, error: 'Please enter your business name.' }
    }
    if (!selectedPackage) {
      return { ok: false, error: 'Package details are missing. Choose a package in the estimator first.' }
    }
    if (!serviceCategory) {
      return { ok: false, error: 'Service details are missing. Choose a service in the estimator first.' }
    }
    if (!urgency) {
      return { ok: false, error: 'Please choose how soon you need help.' }
    }
    if (city.length < 2 || city.length > 100) {
      return { ok: false, error: 'Please enter your city or service area.' }
    }
    if (serviceAddressOrArea.length < 3 || serviceAddressOrArea.length > 200) {
      return { ok: false, error: 'Please enter your address or service area (3–200 characters).' }
    }
    if (!preferredContact) {
      return { ok: false, error: 'Please choose a preferred contact method.' }
    }
    if (description.length < 10 || description.length > 1500) {
      return { ok: false, error: 'Please describe what you need (10–1500 characters).' }
    }

    var payload = {
      name: name,
      service_requested: serviceCategory.slice(0, 120),
      message: buildMessage(
        {
          customerType: customerType,
          urgency: urgency,
          city: city,
          serviceAddressOrArea: serviceAddressOrArea,
          preferredContact: preferredContact,
          description: description,
          businessName: businessName,
          bestTimeToContact: (input.bestTimeToContact || '').trim(),
          budgetRange: (input.budgetRange || '').trim(),
          wantsDepositLink: input.wantsDepositLink ? 'yes' : 'no',
        },
        prefill,
      ),
      source_page: SOURCE_PAGE,
    }

    if (email) payload.email = email
    if (phone) payload.phone = phone
    if (city) payload.city = city

    return { ok: true, payload: payload, enhanced: buildEnhancedFields(input, prefill) }
  }

  function buildEnhancedFields(input, prefill) {
    return {
      customer_type: input.customerType,
      business_name: input.businessName ? input.businessName.slice(0, 120) : null,
      selected_package: (prefill.selectedPackage || '').slice(0, 200),
      package_price_or_estimate: (prefill.packagePriceOrEstimate || '').slice(0, 120),
      urgency: input.urgency,
      preferred_contact: input.preferredContact,
      service_address_or_area: input.serviceAddressOrArea.slice(0, 200),
      best_time_to_contact: input.bestTimeToContact
        ? input.bestTimeToContact.slice(0, 120)
        : null,
      wants_deposit_link: input.wantsDepositLink === 'yes',
      estimator_selections: {
        serviceSlug: prefill.serviceSlug || null,
        packageId: prefill.packageId || null,
        selectedPackage: prefill.selectedPackage || null,
        packagePriceOrEstimate: prefill.packagePriceOrEstimate || null,
        packageIncludes: prefill.packageIncludes || [],
        summary: buildEstimatorSummary(prefill),
      },
      request_metadata: {
        sourcePage: SOURCE_PAGE,
        submittedAt: new Date().toISOString(),
        customerType: input.customerType,
        serviceCategory: prefill.serviceCategory || null,
        descriptionPreview: input.description.slice(0, 200),
      },
    }
  }

  function trackPricingEvent(eventName, detail) {
    if (typeof window.__SI_trackEvent === 'function') {
      window.__SI_trackEvent(eventName, detail || {})
    }
  }

  async function submitPayload(basePayload, enhancedFields) {
    if (typeof window.SI_submitInquiryWithFallback !== 'function') {
      throw new Error('submit_unavailable')
    }
    return window.SI_submitInquiryWithFallback(basePayload, enhancedFields)
  }

  var modalEl
  var formEl
  var statusEl
  var summaryEl
  var businessWrap
  var currentPrefill = {}

  function setBodyScrollLocked(locked) {
    document.documentElement.classList.toggle('si-package-modal-open', locked)
    document.body.classList.toggle('si-package-modal-open', locked)
  }

  function closeModal() {
    if (!modalEl) return
    modalEl.hidden = true
    setBodyScrollLocked(false)
  }

  function renderSummary(prefill) {
    if (!summaryEl) return
    var parts = []
    if (prefill.serviceCategory) {
      parts.push('<p><strong>Service:</strong> ' + escapeHtml(prefill.serviceCategory) + '</p>')
    }
    if (prefill.selectedPackage) {
      parts.push('<p><strong>Package:</strong> ' + escapeHtml(prefill.selectedPackage) + '</p>')
    }
    if (prefill.packagePriceOrEstimate) {
      parts.push(
        '<p><strong>Estimated price:</strong> ' + escapeHtml(prefill.packagePriceOrEstimate) + '</p>',
      )
    }
    if (prefill.packageIncludes && prefill.packageIncludes.length) {
      parts.push(
        '<p class="note-muted"><strong>Includes:</strong> ' +
          escapeHtml(prefill.packageIncludes.join(' · ')) +
          '</p>',
      )
    }
    summaryEl.innerHTML = parts.join('') || '<p class="note-muted">Choose a service and package above first.</p>'
  }

  function openModal(prefill) {
    if (!modalEl || !formEl) return
    currentPrefill = prefill || {}
    renderSummary(currentPrefill)
    formEl.reset()
    statusEl.hidden = true
    statusEl.textContent = ''
    statusEl.classList.remove('is-success', 'is-error')
    if (businessWrap) businessWrap.hidden = true
    modalEl.hidden = false
    setBodyScrollLocked(true)
    trackPricingEvent('pricing_request_open', {
      context: prefill.selectedPackage || prefill.serviceCategory || 'pricing',
      cta_location: 'package_modal',
    })
    var firstField = formEl.querySelector('input[name="name"]')
    if (firstField) firstField.focus()
  }

  function mountModal() {
    modalEl = document.createElement('div')
    modalEl.className = 'si-package-modal'
    modalEl.hidden = true
    modalEl.innerHTML =
      '<div class="si-package-modal__backdrop" data-si-package-close tabindex="-1" aria-hidden="true"></div>' +
      '<div class="si-package-modal__panel" role="dialog" aria-modal="true" aria-labelledby="si-package-modal-title">' +
      '<button type="button" class="si-package-modal__close" data-si-package-close aria-label="Close request form">&times;</button>' +
      '<p class="eyebrow">Package request</p>' +
      '<h2 id="si-package-modal-title">Request This Package</h2>' +
      '<p class="page-lead si-package-modal__lead">Works for Fresno/Clovis homes and small businesses. Final quote confirmed in writing before work begins — no payment on this site today.</p>' +
      '<h3 class="si-package-section-title">Package summary</h3>' +
      '<div class="si-package-summary" data-si-package-summary></div>' +
      '<form class="si-inquiry-form si-package-request-form" data-si-package-form novalidate>' +
      '<h3 class="si-package-section-title si-package-section-title--contact">Tell us where to send the quote</h3>' +
      '<div class="si-inquiry-honeypot" aria-hidden="true"><label>Website<input name="website" type="text" tabindex="-1" autocomplete="off"></label></div>' +
      '<div class="si-inquiry-grid">' +
      '<label>Name *<input name="name" required autocomplete="name"></label>' +
      '<label>Customer type *<select name="customer_type" required><option value="">Choose one</option><option value="residential">Home / residential</option><option value="business">Business</option></select></label>' +
      '<label>Email<input name="email" type="email" autocomplete="email"></label>' +
      '<label>Phone<input name="phone" type="tel" autocomplete="tel"></label>' +
      '</div>' +
      '<p class="si-inquiry-note">Provide at least one: email or phone.</p>' +
      '<div data-si-business-wrap hidden><label>Business name *<input name="business_name" autocomplete="organization"></label></div>' +
      '<div class="si-inquiry-grid">' +
      '<label>City *<input name="city" required autocomplete="address-level2" placeholder="Fresno, Clovis, etc."></label>' +
      '<label>Address / service area *<input name="service_area" required autocomplete="street-address" placeholder="Street, neighborhood, or on-site area"></label>' +
      '</div>' +
      '<div class="si-inquiry-grid">' +
      '<label>How soon do you need help? *<select name="urgency" required><option value="">Choose urgency</option><option value="today">Today / ASAP</option><option value="this_week">This week</option><option value="this_month">This month</option><option value="planning">Planning / flexible</option></select></label>' +
      '<label>Preferred contact *<select name="preferred_contact" required><option value="">Choose method</option><option value="phone">Phone call</option><option value="email">Email</option><option value="text">Text message</option></select></label>' +
      '</div>' +
      '<label>Best time to contact (optional)<input name="best_time" placeholder="Weekday mornings, after 5pm, etc."></label>' +
      '<label>What do you need help with? *<textarea name="description" required rows="4" placeholder="Example: home Wi-Fi drops in the back rooms, or business POS printer stopped working after update."></textarea></label>' +
      '<label class="si-package-checkbox"><input type="checkbox" name="wants_deposit_link" value="yes"> After quote confirmation, I may want a deposit link to lock scheduling (no payment on this site today).</label>' +
      '<p class="si-inquiry-status" data-si-package-status role="alert" aria-live="polite" hidden></p>' +
      '<div class="cta-band si-package-modal__actions">' +
      '<button type="submit" class="cta cta-primary" data-analytics-event="pricing_request_submit">Submit package request</button>' +
      '<button type="button" class="cta cta-secondary" data-si-package-close>Cancel</button>' +
      '</div>' +
      '<div class="si-email-actions">' +
      '<p class="si-email-line">Fallback: <a href="mailto:stoneindustries0.llc@gmail.com?subject=Stone%20Industries%20Package%20Request">stoneindustries0.llc@gmail.com</a> · <a href="tel:+15595799376">559-579-9376</a></p>' +
      '<a class="cta cta-secondary" data-si-package-mailto href="#" hidden>Send this request via email app</a>' +
      '</div>' +
      '</form>' +
      '</div>'

    document.body.appendChild(modalEl)

    formEl = modalEl.querySelector('[data-si-package-form]')
    statusEl = modalEl.querySelector('[data-si-package-status]')
    summaryEl = modalEl.querySelector('[data-si-package-summary]')
    businessWrap = modalEl.querySelector('[data-si-business-wrap]')
    var mailtoFallback = modalEl.querySelector('[data-si-package-mailto]')

    modalEl.querySelectorAll('[data-si-package-close]').forEach(function (el) {
      el.addEventListener('click', closeModal)
    })

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modalEl && !modalEl.hidden) closeModal()
    })

    formEl.querySelector('[name="customer_type"]').addEventListener('change', function (event) {
      if (businessWrap) businessWrap.hidden = event.target.value !== 'business'
    })

    formEl.addEventListener('submit', async function (event) {
      event.preventDefault()
      var configured = isConfigured()
      var data = new FormData(formEl)
      var validation = validateInput(
        {
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          customerType: data.get('customer_type'),
          businessName: data.get('business_name'),
          urgency: data.get('urgency'),
          city: data.get('city'),
          serviceAddressOrArea: data.get('service_area'),
          preferredContact: data.get('preferred_contact'),
          description: data.get('description'),
          bestTimeToContact: data.get('best_time'),
          wantsDepositLink: data.get('wants_deposit_link') === 'yes',
          honeypot: data.get('website'),
        },
        currentPrefill,
      )

      statusEl.hidden = false
      statusEl.classList.remove('is-success', 'is-error')

      if (!validation.ok) {
        statusEl.textContent = validation.error
        statusEl.classList.add('is-error')
        trackPricingEvent('pricing_request_error', { context: 'validation' })
        if (mailtoFallback) mailtoFallback.hidden = true
        return
      }

      if (!configured) {
        statusEl.textContent =
          'Online capture is not configured in this environment. Use “Send this request via email app” or call 559-579-9376.'
        statusEl.classList.add('is-error')
        trackPricingEvent('pricing_request_error', { context: 'not_configured' })
        if (mailtoFallback) {
          mailtoFallback.hidden = false
          mailtoFallback.href = buildMailtoHref(
            {
              customerType: data.get('customer_type'),
              urgency: data.get('urgency'),
              city: data.get('city'),
              serviceAddressOrArea: data.get('service_area'),
              preferredContact: data.get('preferred_contact'),
              description: data.get('description'),
              businessName: data.get('business_name'),
              bestTimeToContact: data.get('best_time'),
              wantsDepositLink: data.get('wants_deposit_link') === 'yes',
            },
            currentPrefill,
          )
        }
        return
      }

      var submitButton = formEl.querySelector('button[type="submit"]')
      submitButton.disabled = true
      submitButton.textContent = 'Sending…'
      statusEl.textContent = ''
      if (mailtoFallback) mailtoFallback.hidden = true

      try {
        await submitPayload(validation.payload, validation.enhanced)
        trackPricingEvent('pricing_request_success', {
          context: currentPrefill.selectedPackage || 'package',
          cta_location: currentPrefill.serviceCategory || 'pricing',
        })
        statusEl.textContent =
          'Package request received. Stone Industries will follow up by your preferred contact method. For urgent help, call 559-579-9376.'
        statusEl.classList.add('is-success')
        formEl.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(function (el) {
          el.disabled = true
        })
      } catch (_error) {
        trackPricingEvent('pricing_request_error', { context: 'submit' })
        statusEl.textContent =
          'We could not save your request right now. Use email or call 559-579-9376 — your details are still in the form.'
        statusEl.classList.add('is-error')
        if (mailtoFallback) {
          mailtoFallback.hidden = false
          mailtoFallback.href = buildMailtoHref(
            {
              customerType: data.get('customer_type'),
              urgency: data.get('urgency'),
              city: data.get('city'),
              serviceAddressOrArea: data.get('service_area'),
              preferredContact: data.get('preferred_contact'),
              description: data.get('description'),
              businessName: data.get('business_name'),
              bestTimeToContact: data.get('best_time'),
              wantsDepositLink: data.get('wants_deposit_link') === 'yes',
            },
            currentPrefill,
          )
        }
      } finally {
        submitButton.disabled = false
        submitButton.textContent = 'Submit package request'
      }
    })
  }

  window.SI_openPackageRequest = openModal

  document.addEventListener('DOMContentLoaded', mountModal)
})()
