import { Heart, Pin, Trash2, Pencil, Archive, ArchiveRestore } from 'lucide-react'

function NoteCard({
  note,
  onEdit,
  onDelete,
  onToggleFavorite,
  onTogglePin,
  onToggleArchive,
}) {
  return (
    <article className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:shadow-md flex flex-col">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="line-clamp-2 font-semibold text-slate-900 dark:text-slate-100">
          {note.title}
        </h2>

        <span className="shrink-0 rounded-full bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
          {note.category ? note.category.name : 'Uncategorized'}
        </span>
      </div>

      <p className="line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-400 flex-1">
        {note.content || 'No content'}
      </p>

      {note.tags && note.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
        <p className="text-xs text-slate-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(note)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
            title="Edit note"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() => onTogglePin(note.id)}
            className={`rounded-lg p-2 transition ${
              note.isPinned
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600'
            }`}
            title={note.isPinned ? 'Unpin note' : 'Pin note'}
          >
            <Pin size={17} fill={note.isPinned ? 'currentColor' : 'none'} />
          </button>

          <button
            type="button"
            onClick={() => onToggleFavorite(note.id)}
            className={`rounded-lg p-2 transition ${
              note.isFavorite
                ? 'bg-red-50 dark:bg-red-950 text-red-500'
                : 'text-slate-400 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-500'
            }`}
            title={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={17} fill={note.isFavorite ? 'currentColor' : 'none'} />
          </button>

          {onToggleArchive && (
            <button
              type="button"
              onClick={() => onToggleArchive(note.id)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
              title={note.isArchived ? 'Unarchive note' : 'Archive note'}
            >
              {note.isArchived ? <ArchiveRestore size={17} /> : <Archive size={17} />}
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600"
            title="Move to trash"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default NoteCard
