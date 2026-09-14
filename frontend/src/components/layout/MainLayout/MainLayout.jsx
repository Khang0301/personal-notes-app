function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <div className="p-6 font-bold text-xl text-indigo-600">
          Personal Notes
        </div>
        <nav className="px-4 space-y-1">
          <a href="/" className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100">
            Dashboard
          </a>
          <a href="/notes" className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100">
            Notes
          </a>
        </nav>
      </aside>

      {/* Right side: header + main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
          <span className="font-semibold text-slate-800">Dashboard</span>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout