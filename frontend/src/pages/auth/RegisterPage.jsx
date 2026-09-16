import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left branding panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.25), transparent 45%)',
          }}
        />
        <div className="relative">
          <span className="text-white font-semibold text-lg tracking-tight">
            Personal Notes
          </span>
        </div>

        <div className="relative">
          <p className="text-white text-3xl leading-snug font-medium max-w-md">
            Start with a blank page. See where your notes take you.
          </p>
          <p className="text-slate-400 mt-4 text-sm">
            Free, personal, and yours to organize.
          </p>
        </div>

        <div className="relative text-slate-500 text-xs">
          © {new Date().getFullYear()} Personal Notes App
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">
            Create your account
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Takes less than a minute.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full name
              </label>
              <input
                type="text"
                placeholder="Khang Tran"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Create account
            </button>
          </form>

          <p className="text-sm text-slate-500 text-center mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage