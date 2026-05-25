import { baseRequest } from './baseClient'

export function authRequest(
  endpoint,
  method = 'GET',
  data = null
) {
  const token = localStorage.getItem('token')

  const options = {
    method,
    headers: {}
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`
  }

  if (data !== null) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(data)
  }

  return baseRequest(endpoint, options)
} // authClient.js