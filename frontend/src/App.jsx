import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import ProtectedRoute from './routes/ProtectedRoute'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import NotesPage from './pages/notes/NotesPage'
import FavoritesPage from './pages/notes/FavoritesPage'
import PinnedPage from './pages/notes/PinnedPage'
import ArchivePage from './pages/notes/ArchivePage'
import TrashPage from './pages/notes/TrashPage'
import CategoriesPage from './pages/categories/CategoriesPage'
import ProfilePage from './pages/profile/ProfilePage'
import SettingsPage from './pages/settings/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

// Small helper so every protected route doesn't repeat
// <ProtectedRoute><MainLayout>...</MainLayout></ProtectedRoute> by hand.
function Protected({ children }) {
  return (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — no sidebar/header */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes — require a valid session, wrapped in MainLayout */}
        <Route path="/" element={<Protected><DashboardPage /></Protected>} />
        <Route path="/notes" element={<Protected><NotesPage /></Protected>} />
        <Route path="/favorites" element={<Protected><FavoritesPage /></Protected>} />
        <Route path="/pinned" element={<Protected><PinnedPage /></Protected>} />
        <Route path="/archive" element={<Protected><ArchivePage /></Protected>} />
        <Route path="/trash" element={<Protected><TrashPage /></Protected>} />
        <Route path="/categories" element={<Protected><CategoriesPage /></Protected>} />
        <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
        <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
