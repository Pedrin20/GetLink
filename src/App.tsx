// src/App.tsx
import { useAuth } from './hooks/useAuth'
import { AuthForm } from './components/AuthForm'
import { Home } from './pages/Home'

function App() {
  const { user, loading, login, register } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm onLogin={login} onRegister={register} />
  }

  return <Home />
}

export default App