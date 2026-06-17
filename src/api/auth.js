// import { apiAuthRequest, apiRequest } from './apiClient'

// export function registerUser(data) {
//   return apiRequest('/register', 'POST', data)
// }

// export function loginUser(data) {
//   return apiRequest('/login', 'POST', data)
// }

// export function getCurrentUser() {
//   return apiAuthRequest('/me', 'GET')
// } 

// export function getPublicUserByUsername(username) {
//   return apiRequest(`/users/${encodeURIComponent(username)}`, 'GET')
// }

// -------------
import { publicRequest } from './publicClient'
import { authRequest } from './authClient'

export function registerUser(data) {
  return publicRequest('/register', 'POST', data)
}

export function loginUser(data) {
  return publicRequest('/login', 'POST', data)
}

export function getCurrentUser() {
  return authRequest('/me')
}

export function getPublicUserByUsername(username) {
  return publicRequest(
    `/user/${encodeURIComponent(username)}`
  )
} // auth.js