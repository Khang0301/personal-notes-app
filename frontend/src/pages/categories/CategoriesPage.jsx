import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import useCategories from '../../hooks/useCategories'
import ConfirmModal from '../../components/common/ConfirmModal'

function CategoriesPage() {
  const { categories, isLoading, addCategory, editCategory, removeCategory } = useCategories()
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  async function handleCreate(e) {
    e.preventDefault()
    if (!newName.trim()) return
    await addCategory(newName.trim())
    setNewName('')
  }

  function startEditing(category) {
    setEditingId(category.id)
    setEditingName(category.name)
  }

  async function saveEdit(id) {
    if (!editingName.trim()) return
    await editCategory(id, editingName.trim())
    setEditingId(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Categories</h1>

      <form onSubmit={handleCreate} className="flex gap-3 mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          className="flex-1 px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
        >
          <Plus size={16} /> Add
        </button>
      </form>

      {isLoading ? (
        <div className="h-32 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between px-5 py-3">
              {editingId === category.id ? (
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  autoFocus
                  className="flex-1 mr-3 px-2 py-1 border border-indigo-300 dark:border-indigo-700 dark:bg-slate-800 dark:text-slate-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="text-slate-700 dark:text-slate-200 text-sm">{category.name}</span>
              )}

              <div className="flex items-center gap-1">
                {editingId === category.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(category.id)}
                      className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(category)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(category)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-slate-400">No categories yet.</p>
          )}
        </div>
      )}

      <ConfirmModal
        open={deleteTarget !== null}
        title="Delete category?"
        message={`"${deleteTarget?.name}" will be removed. Notes in this category will become Uncategorized — they will NOT be deleted.`}
        confirmLabel="Delete category"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          await removeCategory(deleteTarget.id)
          setDeleteTarget(null)
        }}
      />
    </div>
  )
}

export default CategoriesPage
