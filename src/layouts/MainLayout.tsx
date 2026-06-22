import { ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'

type Props = {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  const { logout } = useAuth()
  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <header className="border-b border-[var(--color-border)] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="font-serif text-xl text-[var(--color-ink)]">GetLink</h1>
          <button
            onClick={logout}
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}