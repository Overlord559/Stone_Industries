(function () {
  var TOKEN_KEY = 'stone_admin_token'
  var STATUSES = ['new', 'contacted', 'quoted', 'booked', 'won', 'lost']

  var gateEl = document.getElementById('si-admin-gate')
  var appEl = document.getElementById('si-admin-app')
  var tokenInput = document.getElementById('si-admin-token-input')
  var tokenSaveBtn = document.getElementById('si-admin-token-save')
  var logoutBtn = document.getElementById('si-admin-logout')
  var refreshBtn = document.getElementById('si-admin-refresh')
  var listEl = document.getElementById('si-leads-list')
  var detailEl = document.getElementById('si-lead-detail')
  var layoutEl = document.getElementById('si-admin-layout')
  var statusEl = document.getElementById('si-admin-status')
  var countEl = document.getElementById('si-leads-count')

  var filters = {
    search: document.getElementById('filter-search'),
    status: document.getElementById('filter-status'),
    source_page: document.getElementById('filter-source'),
    customer_type: document.getElementById('filter-customer-type'),
    urgency: document.getElementById('filter-urgency'),
  }

  var selectedLead = null

  function getToken() {
    return sessionStorage.getItem(TOKEN_KEY) || ''
  }

  function setToken(value) {
    if (value) sessionStorage.setItem(TOKEN_KEY, value)
    else sessionStorage.removeItem(TOKEN_KEY)
  }

  function showApp(show) {
    gateEl.classList.toggle('si-hidden', show)
    appEl.classList.toggle('si-hidden', !show)
  }

  function apiBase() {
    return '/.netlify/functions'
  }

  function formatDate(value) {
    if (!value) return '—'
    try {
      return new Date(value).toLocaleString()
    } catch (_e) {
      return value
    }
  }

  function badge(status) {
    var safe = (status || 'new').toLowerCase()
    return '<span class="si-badge si-badge--' + safe + '">' + safe + '</span>'
  }

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function buildQuery() {
    var params = new URLSearchParams()
    params.set('limit', '100')
    if (filters.search.value.trim()) params.set('search', filters.search.value.trim())
    if (filters.status.value) params.set('status', filters.status.value)
    if (filters.source_page.value.trim()) params.set('source_page', filters.source_page.value.trim())
    if (filters.customer_type.value) params.set('customer_type', filters.customer_type.value)
    if (filters.urgency.value) params.set('urgency', filters.urgency.value)
    return params.toString()
  }

  async function fetchLeads() {
    statusEl.textContent = 'Loading leads…'
    statusEl.className = 'si-loading'
    listEl.innerHTML = ''

    var response = await fetch(apiBase() + '/admin-leads?' + buildQuery(), {
      headers: { 'X-Stone-Admin-Token': getToken() },
    })

    var data = await response.json().catch(function () {
      return { error: 'Invalid response' }
    })

    if (!response.ok) {
      statusEl.textContent = data.error || 'Failed to load leads'
      statusEl.className = 'si-error'
      if (response.status === 401) {
        setToken('')
        showApp(false)
      }
      return
    }

    var leads = data.leads || []
    countEl.textContent = String(leads.length)
    statusEl.textContent = leads.length ? '' : 'No leads match these filters.'
    statusEl.className = leads.length ? 'si-hidden' : 'si-empty'

    if (!leads.length) {
      detailEl.innerHTML = '<p class="si-empty">Select a lead to view details.</p>'
      layoutEl.classList.remove('has-detail')
      return
    }

    listEl.innerHTML = leads
      .map(function (lead) {
        var title = lead.selected_package || lead.service_requested || 'Inquiry'
        return (
          '<button type="button" class="si-lead-card" data-lead-id="' +
          escapeHtml(lead.id) +
          '">' +
          '<h3>' +
          escapeHtml(lead.name) +
          ' · ' +
          escapeHtml(title) +
          '</h3>' +
          '<div class="si-lead-meta">' +
          badge(lead.status) +
          '<span>' +
          escapeHtml(formatDate(lead.created_at)) +
          '</span>' +
          (lead.city ? '<span>' + escapeHtml(lead.city) + '</span>' : '') +
          (lead.urgency ? '<span>' + escapeHtml(lead.urgency) + '</span>' : '') +
          '</div></button>'
        )
      })
      .join('')

    listEl.querySelectorAll('[data-lead-id]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-lead-id')
        var lead = leads.find(function (item) {
          return item.id === id
        })
        if (lead) renderDetail(lead)
        listEl.querySelectorAll('.si-lead-card').forEach(function (card) {
          card.classList.toggle('is-active', card === btn)
        })
      })
    })

    if (selectedLead) {
      var still = leads.find(function (item) {
        return item.id === selectedLead.id
      })
      if (still) renderDetail(still)
    }
  }

  function renderDetail(lead) {
    selectedLead = lead
    layoutEl.classList.add('has-detail')

    var statusOptions = STATUSES.map(function (s) {
      return (
        '<option value="' +
        s +
        '"' +
        (lead.status === s ? ' selected' : '') +
        '>' +
        s +
        '</option>'
      )
    }).join('')

    detailEl.innerHTML =
      '<h2>' +
      escapeHtml(lead.name) +
      '</h2>' +
      '<div class="si-copy-row">' +
      (lead.email
        ? '<button type="button" class="si-btn si-btn-secondary" data-copy="' +
          escapeHtml(lead.email) +
          '">Copy email</button>'
        : '') +
      (lead.phone
        ? '<button type="button" class="si-btn si-btn-secondary" data-copy="' +
          escapeHtml(lead.phone) +
          '">Copy phone</button>'
        : '') +
      '</div>' +
      '<dl>' +
      row('Status', badge(lead.status)) +
      row('Created', escapeHtml(formatDate(lead.created_at))) +
      row('Email', escapeHtml(lead.email)) +
      row('Phone', escapeHtml(lead.phone)) +
      row('City', escapeHtml(lead.city)) +
      row('Customer type', escapeHtml(lead.customer_type)) +
      row('Business', escapeHtml(lead.business_name)) +
      row('Service', escapeHtml(lead.service_requested)) +
      row('Package', escapeHtml(lead.selected_package)) +
      row('Price / estimate', escapeHtml(lead.package_price_or_estimate)) +
      row('Urgency', escapeHtml(lead.urgency)) +
      row('Preferred contact', escapeHtml(lead.preferred_contact)) +
      row('Address / area', escapeHtml(lead.service_address_or_area)) +
      row('Best time', escapeHtml(lead.best_time_to_contact)) +
      row('Source page', escapeHtml(lead.source_page)) +
      row('Deposit link wanted', lead.wants_deposit_link ? 'Yes' : 'No') +
      '</dl>' +
      '<h3>Message</h3><pre>' +
      escapeHtml(lead.message) +
      '</pre>' +
      '<div class="si-status-row">' +
      '<label for="si-detail-status">Update status</label>' +
      '<select id="si-detail-status">' +
      statusOptions +
      '</select>' +
      '<button type="button" class="si-btn" id="si-save-status">Save status</button>' +
      '<span id="si-save-status-msg" class="si-muted"></span>' +
      '</div>'

    detailEl.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-copy')
        navigator.clipboard.writeText(value).then(function () {
          btn.textContent = 'Copied!'
          setTimeout(function () {
            btn.textContent = value.indexOf('@') !== -1 ? 'Copy email' : 'Copy phone'
          }, 1200)
        })
      })
    })

    document.getElementById('si-save-status').addEventListener('click', function () {
      updateStatus(lead.id, document.getElementById('si-detail-status').value)
    })
  }

  function row(label, value) {
    return '<dt>' + label + '</dt><dd>' + (value || '—') + '</dd>'
  }

  async function updateStatus(id, status) {
    var msg = document.getElementById('si-save-status-msg')
    msg.textContent = 'Saving…'

    var response = await fetch(apiBase() + '/admin-lead-update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Stone-Admin-Token': getToken(),
      },
      body: JSON.stringify({ id: id, status: status }),
    })

    var data = await response.json().catch(function () {
      return { error: 'Invalid response' }
    })

    if (!response.ok) {
      msg.textContent = data.error || 'Update failed'
      return
    }

    msg.textContent = 'Saved'
    await fetchLeads()
    setTimeout(function () {
      msg.textContent = ''
    }, 1500)
  }

  tokenSaveBtn.addEventListener('click', function () {
    var value = (tokenInput.value || '').trim()
    if (!value) return
    setToken(value)
    showApp(true)
    fetchLeads()
  })

  logoutBtn.addEventListener('click', function () {
    setToken('')
    tokenInput.value = ''
    showApp(false)
  })

  refreshBtn.addEventListener('click', fetchLeads)

  Object.keys(filters).forEach(function (key) {
    filters[key].addEventListener('change', fetchLeads)
    if (filters[key].tagName === 'INPUT') {
      filters[key].addEventListener('input', debounce(fetchLeads, 350))
    }
  })

  function debounce(fn, ms) {
    var timer
    return function () {
      clearTimeout(timer)
      timer = setTimeout(fn, ms)
    }
  }

  if (getToken()) {
    showApp(true)
    fetchLeads()
  } else {
    showApp(false)
  }
})()
