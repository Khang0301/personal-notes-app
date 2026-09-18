import { useCallback, useEffect, useState } from 'react'
import * as noteService from '../services/noteService'
import { useToast } from '../context/ToastContext'

function useTrash() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const fetchTrash = useCallback(() => {
    setIsLoading(true)
    setError(null)

    noteService
      .getTrash()
      .then((res) => setNotes(res.data))
      .catch(() => setError('Could not load trash. Please try again.'))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    fetchTrash()
  }, [fetchTrash])

  async function restoreNote(id) {
    await noteService.restoreNote(id)
    showToast('Note restored')
    fetchTrash()
  }

  async function permanentlyDelete(id) {
    await noteService.permanentlyDeleteNote(id)
    showToast('Note permanently deleted')
    fetchTrash()
  }

  return { notes, isLoading, error, restoreNote, permanentlyDelete, refetch: fetchTrash }
}

export default useTrash
