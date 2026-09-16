import { Plus } from 'lucide-react'

function NotesHeader({ onCreateNote }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Notes
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create and organize your personal notes.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreateNote}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        <Plus size={18} />
        New Note
      </button>
    </div>
  )
}

export default NotesHeader