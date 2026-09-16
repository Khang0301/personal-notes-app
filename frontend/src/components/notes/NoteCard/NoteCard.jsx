import { Heart, Pencil, Pin, Trash2 } from 'lucide-react'

function NoteCard({
  note,
  onEdit,
  onDelete,
  onToggleFavorite,
  onTogglePin,
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="line-clamp-2 font-semibold text-slate-900">
          {note.title}
        </h2>

        <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
          {note.category}
        </span>
      </div>

      <p className="line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">
        {note.content || 'No content'}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
        <p className="text-xs text-slate-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </p>

        <div className="flex items-center gap-1">
          <button
              type="button"
              onClick={() => onEdit(note)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              title="Edit note"
            >
              <Pencil size={17} />
          </button>
          <button
            type="button"
            onClick={() => onTogglePin(note.id)}
            className={`rounded-lg p-2 transition ${
              note.isPinned
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-400 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
            title={note.isPinned ? 'Unpin note' : 'Pin note'}
          >
            <Pin
              size={17}
              fill={note.isPinned ? 'currentColor' : 'none'}
            />
          </button>

          <button
            type="button"
            onClick={() => onToggleFavorite(note.id)}
            className={`rounded-lg p-2 transition ${
              note.isFavorite
                ? 'bg-red-50 text-red-500'
                : 'text-slate-400 hover:bg-red-50 hover:text-red-500'
            }`}
            title={
              note.isFavorite
                ? 'Remove from favorites'
                : 'Add to favorites'
            }
          >
            <Heart
              size={17}
              fill={note.isFavorite ? 'currentColor' : 'none'}
            />
          </button>

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            title="Delete note"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default NoteCard