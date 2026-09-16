import { Search, X } from 'lucide-react'

function NotesSearch({
  searchTerm,
  onSearchChange,
  onClearSearch,
}) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search notes..."
        className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={onClearSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          title="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default NotesSearch