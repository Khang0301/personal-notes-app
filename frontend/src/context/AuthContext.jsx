import { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [isLoading, setIsLoading] = useState(true)

  // On first load, if we have a token but the page was just refreshed,
  // re-verify it against the backend (GET /api/auth/me) instead of trusting
  // whatever is sitting in localStorage — the token could be expired.
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setIsLoading(false)
      return
    }

    authService
      .getCurrentUser()
      .then((res) => {
        setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
      })
      .finally(() => setIsLoading(false))
  }, [])

  async function login(credentials) {
    const res = await authService.login(credentials)
    const { token, user: loggedInUser } = res.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }

  async function register(formData) {
    await authService.register(formData)
    // Registration does not log the user in automatically — matches the
    // two separate endpoints (/register, /login) required by the spec.
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  function updateStoredUser(updatedUser) {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateStoredUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook so components never import useContext + AuthContext separately.
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>')
  }
  return context
}
