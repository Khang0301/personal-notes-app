import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<h1 className="text-2xl font-bold">Dashboard (placeholder)</h1>} />
          <Route path="/notes" element={<h1 className="text-2xl font-bold">Notes (placeholder)</h1>} />
          <Route path="/login" element={<h1 className="text-2xl font-bold">Login (placeholder)</h1>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App