import api from './api'

export function getTags() {
  return api.get('/tags')
}
