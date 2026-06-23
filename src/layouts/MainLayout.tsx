import { ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'

type Props = {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <header className="bg-white border-b border-[var(--color-border)] px-4 py-3 sm:px-6 flex items-center justify-between">
        <h1 className="font-serif text-xl text-[var(--color-ink)]">GetLink</h1>
        <button
          onClick={() => logout()}
          className="px-4 py-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-accent)] transition"
        >
          Sair
        </button>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  )
}