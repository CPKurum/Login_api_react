import { authRequest } from '../authClient'
import { publicRequest } from '../publicClient'

export function getMyBooks() {
  return authRequest('/me/libros')
}

export function getBookById(id) {
  return publicRequest(`/libro/${id}`)
}

export function createBook(data) {
  return authRequest('/me/libros', 'POST', data)
}