function DashboardPage() {
  const stats = [
    { label: 'Total Notes', value: 12 },
    { label: 'Favorites', value: 3 },
    { label: 'Pinned', value: 2 },
    { label: 'Archived', value: 1 },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          + New Note
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent notes placeholder */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Recent Notes</h2>
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-500 text-center">
          No notes yet. Create your first note.
        </div>
      </div>
    </div>
  )
}

export default DashboardPage