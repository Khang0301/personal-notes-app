import { useState } from 'react'
import { Sun, Moon, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../context/ToastContext'
import * as userService from '../../services/userService'

function SettingsPage() {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  async function handleChangePassword(e) {
    e.preventDefault()
    const newErrors = {}

    if (!currentPassword) newErrors.currentPassword = 'Required'
    if (newPassword.length < 6) newErrors.newPassword = 'Must be at least 6 characters'
    if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsSaving(true)
    try {
      await userService.changePassword(currentPassword, newPassword)
      showToast('Password changed successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      const message = err.response?.data?.message || 'Could not change password'
      showToast(message, 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Settings</h1>

      {/* Appearance */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Appearance</h2>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
      </div>

      {/* Change password */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Change password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Current password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.currentPassword && <p className="text-xs text-red-500 mt-1">{errors.currentPassword}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.newPassword && <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Change password'}
          </button>
        </form>
      </div>

      {/* Logout */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900 text-red-600 rounded-lg text-sm hover:bg-red-50 dark:hover:bg-red-950"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </div>
  )
}

export default SettingsPage
