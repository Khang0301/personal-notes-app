import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

// `initialNote` is null when creating a new note, or an existing note object when editing.
function NoteFormModal({ open, initialNote, categories, onSave, onClose }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState({})

  const isEditing = Boolean(initialNote)

  // Re-populate the form whenever a different note is opened for editing,
  // or reset it when opening in "create" mode.
  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title)
      setContent(initialNote.content || '')
      setCategoryId(initialNote.category ? String(initialNote.category.id) : '')
      setTagsInput((initialNote.tags || []).join(', '))
    } else {
      setTitle('')
      setContent('')
      setCategoryId('')
      setTagsInput('')
    }
    setErrors({})
  }, [initialNote, open])

  if (!open) return null

  function validate() {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setIsSaving(true)
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        categoryId: categoryId ? Number(categoryId) : null,
        tags: tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      })
      onClose()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {isEditing ? 'Edit note' : 'New note'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              rows={5}
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Uncategorized</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Tags <span className="text-slate-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="react, study, project"
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : isEditing ? 'Save changes' : 'Create note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoteFormModal
