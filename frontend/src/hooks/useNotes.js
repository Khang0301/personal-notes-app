import { useState, useEffect } from 'react'

const STORAGE_KEY = 'notes-app-data'

function useNotes() {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    }, [notes])

    function addNote({ title, content, category }) {
        const newNote = {
        id: crypto.randomUUID(),
        title,
        content,
        category: category || 'Uncategorized',
        isFavorite: false,
        isPinned: false,
        isArchived: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        }

    setNotes((prevNotes) => [newNote, ...prevNotes])
    }

    function updateNote(noteId, updatedData) {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
            note.id === noteId
                ? {
                    ...note,
                    ...updatedData,
                    updatedAt: new Date().toISOString(),
                }
                : note
            )
        )
    }
    
    function deleteNote(noteId) {
        setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== noteId)
        )
    }

    function toggleFavorite(noteId) {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
            note.id === noteId
                ? {
                    ...note,
                    isFavorite: !note.isFavorite,
                    updatedAt: new Date().toISOString(),
                }
                : note
            )
        )
    }

    function togglePin(noteId) {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
            note.id === noteId
                ? {
                    ...note,
                    isPinned: !note.isPinned,
                    updatedAt: new Date().toISOString(),
                }
                : note
            )
        )
    }

  return { notes, addNote, updateNote, deleteNote, toggleFavorite,togglePin, }
}

export default useNotes