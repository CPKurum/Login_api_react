const API_BASE = import.meta.env.VITE_API_URL ?? '' // http://127.0.0.1:5330

async function request(endpoint, method = 'GET', data = null, withAuth = false) {
  const options = { method, headers: {} }

  if (withAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      options.headers.Authorization = `Bearer ${token}`
    }
  }

  if (data !== null) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(data)
  }

  const res = await fetch(`${API_BASE}${endpoint}`, options)

  let result = null
  try {
    result = await res.json()
  } catch {
    result = null
  }

  if (!res.ok) {
    const error = new Error(result?.error || 'API Error')
    error.status = res.status
    throw error
  }

  return result
}

export function apiRequest(endpoint, method = 'GET', data = null) {
  return request(endpoint, method, data, false)
}

export function apiAuthRequest(endpoint, method = 'GET', data = null) {
  return request(endpoint, method, data, true)
}