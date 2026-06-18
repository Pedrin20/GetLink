import { ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
    children: ReactNode
}

export function MainLayout({ children }: Props) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
         <div className="min-h-screen bg-[var(--color-paper)]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif text-[var(--color-accent)]">✦</span>
            <span className="text-lg font-serif font-semibold text-[var(--color-ink)]">LinkTree</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] flex items-center justify-center text-white font-medium">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm text-[var(--color-ink)] font-medium">
                {user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition flex items-center gap-1"
            >
              <span>Sair</span>
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
    )
}