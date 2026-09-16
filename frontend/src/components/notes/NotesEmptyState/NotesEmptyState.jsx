import { Plus } from 'lucide-react'

function NotesEmptyState({ onCreateNote }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-slate-800">
        No notes yet
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Create your first note to get started.
      </p>

      <button
        type="button"
        onClick={onCreateNote}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        <Plus size={18} />
        Create Note
      </button>
    </div>
  )
}

export default NotesEmptyState