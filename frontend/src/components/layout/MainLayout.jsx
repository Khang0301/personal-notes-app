import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Heart,
  Pin,
  Archive,
  Trash2,
  FolderOpen,
  User,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/notes', label: 'Notes', icon: FileText },
  { to: '/favorites', label: 'Favorites', icon: Heart },
  { to: '/pinned', label: 'Pinned', icon: Pin },
  { to: '/archive', label: 'Archive', icon: Archive },
  { to: '/trash', label: 'Trash', icon: Trash2 },
  { to: '/categories', label: 'Categories', icon: FolderOpen },
]

function getInitials(fullName) {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

function SidebarContent({ onNavigate }) {
  const location = useLocation()

  return (
    <>
      <div className="p-6 font-bold text-xl text-indigo-600">Personal Notes</div>
      <nav className="px-4 space-y-1 flex-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}

function MainLayout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const currentLabel = [...NAV_ITEMS, { to: '/profile', label: 'Profile' }, { to: '/settings', label: 'Settings' }]
    .find((item) => item.to === location.pathname)?.label || 'Personal Notes'

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Desktop sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex md:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsDrawerOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 flex flex-col">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400">
                <X size={20} />
              </button>
            </div>
            <SidebarContent onNavigate={() => setIsDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* Right side: header + main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDrawerOpen(true)} className="md:hidden text-slate-500">
              <Menu size={22} />
            </button>
            <span className="font-semibold text-slate-800 dark:text-slate-100">{currentLabel}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold"
              >
                {getInitials(user.fullName)}
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-20 py-1">
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <User size={15} /> Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <Settings size={15} /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <LogOut size={15} /> Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
