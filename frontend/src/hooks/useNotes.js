import { useCallback, useEffect, useState } from 'react'
import * as noteService from '../services/noteService'
import { useToast } from '../context/ToastContext'

/**
 * Centralizes all note data + CRUD logic for a single "view" (Notes,
 * Favorites, Pinned, Archive). `filters` decides which notes come back
 * from the backend; everything else (loading state, error handling,
 * refresh after each action) lives here so pages only have to render.
 */
function useNotes(filters = {}) {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const fetchNotes = useCallback(() => {
    setIsLoading(true)
    setError(null)

    noteService
      .getNotes(filters)
      .then((res) => setNotes(res.data))
      .catch(() => setError('Could not load notes. Please try again.'))
      .finally(() => setIsLoading(false))
    // Re-run whenever any filter value changes (search text, category, sort...).
    // JSON.stringify keeps the dependency array stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  async function addNote(data) {
    await noteService.createNote(data)
    showToast('Note created')
    fetchNotes()
  }

  async function editNote(id, data) {
    await noteService.updateNote(id, data)
    showToast('Note updated')
    fetchNotes()
  }

  async function removeNote(id) {
    await noteService.deleteNote(id)
    showToast('Note moved to trash')
    fetchNotes()
  }

  async function toggleFavorite(id) {
    await noteService.toggleFavorite(id)
    fetchNotes()
  }

  async function togglePin(id) {
    await noteService.togglePin(id)
    fetchNotes()
  }

  async function toggleArchive(id) {
    await noteService.toggleArchive(id)
    showToast('Note archive status updated')
    fetchNotes()
  }

  return {
    notes,
    isLoading,
    error,
    addNote,
    editNote,
    removeNote,
    toggleFavorite,
    togglePin,
    toggleArchive,
    refetch: fetchNotes,
  }
}

export default useNotes
