import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { createUserProfile, generateUniqueUsername } from '../services/userService'
import toast from 'react-hot-toast'

export function AuthForm() {
  const { login, register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async (action: 'login' | 'register') => {
    setError(null)
    setIsLoading(true)
    try {
      if (action === 'login') {
        await login(email, password)
        toast.success('Login realizado com sucesso!')
      } else {
        const userCredential = await register(email, password)
        const uid = userCredential.user.uid
        const baseUsername = email.split('@')[0]
        const username = await generateUniqueUsername(baseUsername)
        await createUserProfile(uid, username)
        toast.success('Conta criada com sucesso! 🎉')
      }
    } catch (err: any) {
      const message = err.message || 'Ocorreu um erro. Tente novamente.'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--gradient-hero)]">
      <div className="w-full max-w-md relative">
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--color-primary)] opacity-[0.07] rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-[var(--color-primary)] opacity-[0.07] rounded-full blur-3xl" />

        <div className="relative bg-white/90 backdrop-blur-sm border border-[var(--color-border)] shadow-[var(--shadow-xl)] rounded-[var(--radius-2xl)] p-8 md:p-10 transition-all duration-300">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] flex items-center justify-center text-white text-3xl shadow-[var(--shadow-primary)] mb-4">
              ✦
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
              Olá, <span className="text-[var(--color-primary)]">seja bem vindo!</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-sm mt-2 max-w-xs">
              Entre ou crie sua conta para organizar seus links com estilo.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label htmlFor="email" className="label">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">✉</span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  className="input pl-11"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label">
                Senha
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">🔒</span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-11"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="alert alert-error">
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleAction('login')}
                disabled={isLoading}
                className="btn btn-primary btn-lg flex-1"
              >
                {isLoading ? (
                  <>
                    <span className="spinner spinner-white" />
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
                className="btn btn-secondary btn-lg flex-1"
              >
                {isLoading ? (
                  <>
                    <span className="spinner" />
                    Registrando...
                  </>
                ) : (
                  <>
                    <span>+</span> Registrar
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-center text-[var(--color-text-muted)] pt-2">
              Ao continuar, você concorda com nossos termos.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}