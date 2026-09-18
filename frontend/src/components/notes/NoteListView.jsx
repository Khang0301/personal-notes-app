import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import useNotes from '../../hooks/useNotes'
import useCategories from '../../hooks/useCategories'
import NoteCard from './NoteCard/NoteCard'
import NoteFormModal from './NoteFormModal'
import ConfirmModal from '../common/ConfirmModal'
import { SORT_OPTIONS } from '../../constants/sortOptions'

/**
 * `baseFilters` pins this view to a slice of notes (e.g. { favorite: true }).
 * Search/category/sort are still adjustable on top of that by the user.
 */
function NoteListView({ title, emptyMessage, baseFilters = {}, showArchiveToggle = false }) {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [sort, setSort] = useState('newest')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [deleteTargetId, setDeleteTargetId] = useState(null)

  const filters = {
    ...baseFilters,
    search: search || undefined,
    category: categoryId || undefined,
    sort,
  }

  const { notes, isLoading, error, addNote, editNote, removeNote, toggleFavorite, togglePin, toggleArchive } =
    useNotes(filters)
  const { categories } = useCategories()

  function openCreateForm() {
    setEditingNote(null)
    setIsFormOpen(true)
  }

  function openEditForm(note) {
    setEditingNote(note)
    setIsFormOpen(true)
  }

  async function handleSave(data) {
    if (editingNote) {
      await editNote(editingNote.id, data)
    } else {
      await addNote(data)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{title}</h1>
        <button
          onClick={openCreateForm}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
        >
          <Plus size={16} /> New Note
        </button>
      </div>

      {/* Search / filter / sort toolbar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, content or tag..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Content states: loading / error / empty / grid */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-xl p-6 text-center text-sm">
          {error}
        </div>
      )}

      {!isLoading && !error && notes.length === 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center text-slate-500 dark:text-slate-400">
          {search || categoryId ? 'No matching notes found.' : emptyMessage}
        </div>
      )}

      {!isLoading && !error && notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={openEditForm}
              onDelete={(id) => setDeleteTargetId(id)}
              onToggleFavorite={toggleFavorite}
              onTogglePin={togglePin}
              onToggleArchive={showArchiveToggle ? toggleArchive : undefined}
            />
          ))}
        </div>
      )}

      <NoteFormModal
        open={isFormOpen}
        initialNote={editingNote}
        categories={categories}
        onSave={handleSave}
        onClose={() => setIsFormOpen(false)}
      />

      <ConfirmModal
        open={deleteTargetId !== null}
        title="Move note to trash?"
        message="You can restore it from Trash later, or delete it permanently from there."
        confirmLabel="Move to trash"
        danger
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={async () => {
          await removeNote(deleteTargetId)
          setDeleteTargetId(null)
        }}
      />
    </div>
  )
}

export default NoteListView
