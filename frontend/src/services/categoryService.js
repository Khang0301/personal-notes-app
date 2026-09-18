import api from './api'

export function getCategories() {
  return api.get('/categories')
}

export function createCategory(name) {
  return api.post('/categories', { name })
}

export function updateCategory(id, name) {
  return api.put(`/categories/${id}`, { name })
}

export function deleteCategory(id) {
  return api.delete(`/categories/${id}`)
}
