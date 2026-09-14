import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="p-8 text-2xl font-bold">Dashboard (placeholder)</h1>} />
        <Route path="/login" element={<h1 className="p-8 text-2xl font-bold">Login (placeholder)</h1>} />
        <Route path="*" element={<h1 className="p-8 text-2xl font-bold">404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App