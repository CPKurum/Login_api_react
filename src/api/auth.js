import { apiAuthRequest, apiRequest } from './apiClient'

export function registerUser(data) {
  return apiRequest('/register', 'POST', data)
}

export function loginUser(data) {
  return apiRequest('/login', 'POST', data)
}

export function getCurrentUser() {
  return apiAuthRequest('/user', 'GET')
} 

export function getPublicUserByUsername(username) {
  return apiRequest(`/usuario/${encodeURIComponent(username)}`, 'GET')
}