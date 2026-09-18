import { useState } from 'react'
import { RotateCcw, Trash2 } from 'lucide-react'
import useTrash from '../../hooks/useTrash'
import ConfirmModal from '../../components/common/ConfirmModal'

function TrashPage() {
  const { notes, isLoading, error, restoreNote, permanentlyDelete } = useTrash()
  const [deleteTargetId, setDeleteTargetId] = useState(null)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Trash</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Notes here can be restored, or permanently deleted. Permanent deletion cannot be undone.
        </p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
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
          Trash is empty.
        </div>
      )}

      {!isLoading && !error && notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <article
              key={note.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
            >
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                {note.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
                {note.content || 'No content'}
              </p>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                <p className="text-xs text-slate-400">
                  Deleted {new Date(note.updatedAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => restoreNote(note.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600"
                    title="Restore note"
                  >
                    <RotateCcw size={17} />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(note.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600"
                    title="Delete permanently"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <ConfirmModal
        open={deleteTargetId !== null}
        title="Delete permanently?"
        message="This note will be permanently deleted and cannot be recovered."
        confirmLabel="Delete forever"
        danger
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={async () => {
          await permanentlyDelete(deleteTargetId)
          setDeleteTargetId(null)
        }}
      />
    </div>
  )
}

export default TrashPage
