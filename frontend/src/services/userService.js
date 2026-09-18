import api from './api'

export function getMe() {
  return api.get('/users/me')
}

export function updateProfile(fullName) {
  return api.put('/users/me', { fullName })
}

export function changePassword(currentPassword, newPassword) {
  return api.put('/users/me/password', { currentPassword, newPassword })
}
