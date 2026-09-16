import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import NotFoundPage from './pages/NotFoundPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import NotesPage from './pages/notes/NotesPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — no sidebar/header */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes — wrapped in MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          }
        />
        <Route
          path="/notes"
          element={
            <MainLayout>
              <NotesPage />
            </MainLayout>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App