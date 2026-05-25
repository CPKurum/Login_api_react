// const API_BASE = import.meta.env.VITE_API_URL ?? '' // http://127.0.0.1:5330

// async function request(endpoint, method = 'GET', data = null, withAuth = false) {
//   const options = { method, headers: {} }

//   if (withAuth) {
//     const token = localStorage.getItem('token')
//     if (token) {
//       options.headers.Authorization = `Bearer ${token}`
//     }
//   }

//   if (data !== null) {
//     options.headers['Content-Type'] = 'application/json'
//     options.body = JSON.stringify(data)
//   }
//   console.log("apiCli...🛰️ REQUEST HEADERS:", options.headers)
//   const res = await fetch(`${API_BASE}${endpoint}`, options)
//   console.log("res-fetch:", res)
//   let result = null
//   try {
//     result = await res.json()
//     console.log(result)
//   } catch {
//     result = null
//   }

//   if (!res.ok) {
//     const error = new Error(result?.error || 'API Error')
//     error.status = res.status
//     throw error
//   }
//   // console.log("📡 REQUEST DEBUG:", {
//   //   endpoint,
//   //   withAuth,
//   //   token: localStorage.getItem('token'),
//   //   headers: options.headers
//   // })
//   return result
// }

// export function apiRequest(endpoint, method = 'GET', data = null) {
//   return request(endpoint, method, data, false)
// }

// export function apiAuthRequest(endpoint, method = 'GET', data = null) {
//   return request(endpoint, method, data, true)
// }