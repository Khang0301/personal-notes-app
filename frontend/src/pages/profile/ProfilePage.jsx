import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import * as userService from '../../services/userService'

function getInitials(fullName) {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

function ProfilePage() {
  const { user, updateStoredUser } = useAuth()
  const { showToast } = useToast()
  const [fullName, setFullName] = useState(user.fullName)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!fullName.trim()) return

    setIsSaving(true)
    try {
      const res = await userService.updateProfile(fullName.trim())
      updateStoredUser(res.data)
      showToast('Profile updated')
    } catch {
      showToast('Could not update profile', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Profile</h1>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-semibold">
            {getInitials(user.fullName)}
          </div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-100">{user.fullName}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Account created {new Date(user.createdAt).toLocaleDateString()}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3.5 py-2.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-400 rounded-lg text-sm cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
