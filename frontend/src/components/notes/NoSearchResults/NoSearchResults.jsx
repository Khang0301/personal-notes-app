import { SearchX } from 'lucide-react'

function NoSearchResults({ searchTerm, onClearSearch }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <SearchX size={22} />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-slate-800">
        No matching notes found
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        No notes match "{searchTerm}". Try another keyword.
      </p>

      <button
        type="button"
        onClick={onClearSearch}
        className="mt-5 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Clear Search
      </button>
    </div>
  )
}

export default NoSearchResults