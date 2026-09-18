import api from './api'

// `params` may contain: search, category, tag, favorite, pinned, archived, sort
export function getNotes(params = {}) {
  return api.get('/notes', { params })
}

export function getTrash() {
  return api.get('/notes/trash')
}

export function getNoteById(id) {
  return api.get(`/notes/${id}`)
}

export function createNote(data) {
  return api.post('/notes', data)
}

export function updateNote(id, data) {
  return api.put(`/notes/${id}`, data)
}

// Soft delete -> moves the note to Trash
export function deleteNote(id) {
  return api.delete(`/notes/${id}`)
}

export function toggleFavorite(id) {
  return api.patch(`/notes/${id}/favorite`)
}

export function togglePin(id) {
  return api.patch(`/notes/${id}/pin`)
}

export function toggleArchive(id) {
  return api.patch(`/notes/${id}/archive`)
}

export function restoreNote(id) {
  return api.patch(`/notes/${id}/restore`)
}

export function permanentlyDeleteNote(id) {
  return api.delete(`/notes/${id}/permanent`)
}
