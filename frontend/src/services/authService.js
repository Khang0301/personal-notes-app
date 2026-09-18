import api from './api'

export function register({ fullName, email, password, confirmPassword }) {
  return api.post('/auth/register', { fullName, email, password, confirmPassword })
}

export function login({ email, password }) {
  return api.post('/auth/login', { email, password })
}

export function getCurrentUser() {
  return api.get('/auth/me')
}
