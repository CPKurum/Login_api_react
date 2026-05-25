import { baseRequest } from './baseClient'

export function publicRequest(
  endpoint,
  method = 'GET',
  data = null
) {
  const options = {
    method,
    headers: {}
  }

  if (data !== null) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(data)
  }

  return baseRequest(endpoint, options)
} // publicClient.js