import { useState } from 'react'
import NoteCard from '../../components/notes/NoteCard/NoteCard'
import NotesHeader from '../../components/notes/NotesHeader/NotesHeader'
import NotesEmptyState from '../../components/notes/NotesEmptyState/NotesEmptyState'
import NoteFormModal from '../../components/notes/NoteFormModal/NoteFormModal'
import useNotes from '../../hooks/useNotes'
import NotesSearch from '../../components/notes/NotesSearch/NotesSearch'
import NoSearchResults from '../../components/notes/NoSearchResults/NoSearchResults'
import NotesFilter from '../../components/notes/NotesFilter/NotesFilter'

function NotesPage() {
    const { notes, addNote, updateNote, deleteNote, toggleFavorite, togglePin, } = useNotes()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingNote, setEditingNote] = useState(null)

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
    })

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    function handleChange(event) {
        const { name, value } = event.target

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    function handleEdit(note) {
        setEditingNote(note)

        setFormData({
            title: note.title,
            content: note.content,
            category: note.category === 'Uncategorized' ? '' : note.category,
        })
        
        setIsModalOpen(true)
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (!formData.title.trim()) {
        return
        }

        const noteData = {
            title: formData.title.trim(),
            content: formData.content.trim(),
            category: formData.category || 'Uncategorized',
        }

        if (editingNote) {
            updateNote(editingNote.id, noteData)
        } else {
            addNote(noteData)
        }

        setFormData({
        title: '',
        content: '',
        category: '',
        })
        
        setEditingNote(null)
        setIsModalOpen(false)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
        setEditingNote(null)

        setFormData({
        title: '',
        content: '',
        category: '',
        })
    }

    function handleDelete(noteId) {
        const isConfirmed = window.confirm(
            'Are you sure you want to delete this note?'
        )

        if (!isConfirmed) {
            return
        }

        deleteNote(noteId)
    }

    const filteredNotes = notes.filter((note) => {
        const keyword = searchTerm.trim().toLowerCase()

        const matchesSearch =
            !keyword ||
            note.title.toLowerCase().includes(keyword) ||
            note.content.toLowerCase().includes(keyword)

        const matchesCategory =
            selectedCategory === 'all' ||
            note.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <div className="space-y-6">
        {/* Header */}
        <NotesHeader
            onCreateNote={() => {
                setEditingNote(null)

                setFormData({
                title: '',
                content: '',
                category: '',
                })

                setIsModalOpen(true)
            }}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <NotesSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onClearSearch={() => setSearchTerm('')}
            />

            <NotesFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
        </div>

        {/* Empty state */}
        {notes.length === 0 && (
            <NotesEmptyState
                onCreateNote={() => setIsModalOpen(true)}
            />
        )}
        {notes.length > 0 &&
            filteredNotes.length === 0 && (
            <NoSearchResults
                searchTerm={searchTerm || selectedCategory}
                onClearSearch={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                }}
            />
        )}

        {/* Notes grid */}
        {filteredNotes.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredNotes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleFavorite={toggleFavorite}
                    onTogglePin={togglePin}
                />
            ))}
            </div>
        )}

        {/* Create note modal */}
        {isModalOpen && (
            <NoteFormModal
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onClose={handleCloseModal}
                isEditing={Boolean(editingNote)}
            />
        )}
        </div>
    )
}

export default NotesPage