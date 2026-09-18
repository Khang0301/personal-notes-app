import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  // While we're still verifying the token against the backend (on page
  // refresh), don't redirect yet — that would bounce a logged-in user
  // to /login for a split second every time they reload the page.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-400 text-sm">
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
