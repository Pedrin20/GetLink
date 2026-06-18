import { useState } from 'react'

type Props = {
  onLogin: (email: string, pass: string) => Promise<unknown>
  onRegister: (email: string, pass: string) => Promise<unknown>
}

export function AuthForm({ onLogin, onRegister }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async (action: 'login' | 'register') => {
    setError(null)
    setIsLoading(true)
    try {
      if (action === 'login') {
        await onLogin(email, password)
      } else {
        await onRegister(email, password)
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[var(--color-paper)] via-white to-[var(--color-accent-light)]">
      <div className="w-full max-w-md relative">
        {/* Elemento decorativo de fundo */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl" />

        <div className="relative bg-white/80 backdrop-blur-sm border border-white/30 shadow-2xl rounded-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-[var(--color-accent)]/20 hover:shadow-2xl">
          {/* Cabeçalho com ícone */}
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="font-serif text-3xl text-[var(--color-ink)] tracking-tight">
              Olá, <span className="text-[var(--color-accent)]">seja bem vindo!</span>
            </h2>
            <p className="text-[var(--color-muted)] text-sm mt-1 max-w-xs">
              Entre ou crie sua conta para organizar seus links com estilo.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-lg">
                  ✉
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  className="w-full pl-10 pr-4 py-3 bg-[var(--color-paper)] border-2 border-[var(--color-border)] rounded-xl text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/20 transition-all duration-200"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
                Senha
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-lg">
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[var(--color-paper)] border-2 border-[var(--color-border)] rounded-xl text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/20 transition-all duration-200"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-700 bg-red-100/80 backdrop-blur-sm p-3 rounded-xl border border-red-200 flex items-center gap-2">
                <span className="text-red-500 text-lg">⚠</span>
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleAction('login')}
                disabled={isLoading}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 text-white font-semibold rounded-xl shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <span>→</span> Entrar
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleAction('register')}
                disabled={isLoading}
                className="flex-1 py-3.5 px-6 bg-white border-2 border-[var(--color-border)] text-[var(--color-ink)] font-semibold rounded-xl hover:bg-[var(--color-accent-light)] hover:border-[var(--color-accent)]/40 hover:shadow-md hover:shadow-[var(--color-accent)]/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-[var(--color-accent)] border-t-transparent rounded-full" />
                    Registrando...
                  </>
                ) : (
                  <>
                    <span>+</span> Registrar
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-center text-[var(--color-muted)]/70 pt-2">
              Ao continuar, você concorda com nossos termos.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}