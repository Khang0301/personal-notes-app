import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import * as noteService from '../../services/noteService'
import { useAuth } from '../../context/AuthContext'

function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [allNotes, setAllNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    noteService
      .getNotes({})
      .then((res) => setAllNotes(res.data))
      .finally(() => setIsLoading(false))
  }, [])

  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const stats = [
    { label: 'Total Notes', value: allNotes.length },
    { label: 'Favorites', value: allNotes.filter((n) => n.isFavorite).length },
    { label: 'Pinned', value: allNotes.filter((n) => n.isPinned).length },
    {
      label: 'Created this week',
      value: allNotes.filter((n) => new Date(n.createdAt) >= oneWeekAgo).length,
    },
  ]

  const recentNotes = [...allNotes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Welcome back, {user.fullName.split(' ')[0]}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Here's what's happening with your notes.</p>
        </div>
        <button
          onClick={() => navigate('/notes')}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
        >
          <Plus size={16} /> New Note
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {isLoading ? '-' : stat.value}
            </p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Notes</h2>
          <Link to="/notes" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View all
          </Link>
        </div>

        {isLoading ? (
          <div className="h-24 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        ) : recentNotes.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-slate-500 dark:text-slate-400 text-center">
            No notes yet. Create your first note.
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800">
            {recentNotes.map((note) => (
              <Link
                key={note.id}
                to="/notes"
                className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{note.title}</p>
                  <p className="text-xs text-slate-400 truncate">{note.content || 'No content'}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0 ml-4">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
