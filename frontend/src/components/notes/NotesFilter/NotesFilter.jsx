import { Filter } from 'lucide-react'
import { DEFAULT_CATEGORIES } from '../../../constants/categories'

function NotesFilter({
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="relative w-full sm:w-56">
      <Filter
        size={17}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="all">
          All Categories
        </option>

        {DEFAULT_CATEGORIES.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}

        <option value="Uncategorized">
          Uncategorized
        </option>
      </select>
    </div>
  )
}

export default NotesFilter