import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-slate-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFoundPage