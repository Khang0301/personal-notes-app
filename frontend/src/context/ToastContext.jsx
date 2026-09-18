import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])

    // Auto-dismiss after 3 seconds so toasts don't pile up forever.
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  function dismissToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast stack, fixed to the bottom-right of the viewport */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg text-sm font-medium text-white ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-slate-900'
            }`}
          >
            {toast.type === 'error' ? (
              <XCircle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            <span>{toast.message}</span>
            <button onClick={() => dismissToast(toast.id)} className="ml-2 opacity-70 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used inside a <ToastProvider>')
  }
  return context
}
