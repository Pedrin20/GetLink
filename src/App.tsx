import { AppRoutes } from './routes'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1C1B1A',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
            border: '1px solid #E6E4E0',
          },
          success: {
            style: {
              borderLeft: '4px solid #22c55e',
            },
          },
          error: {
            style: {
              borderLeft: '4px solid #ef4444',
            },
          },
        }}
      />
      <AppRoutes />
    </>
  )
}

export default App