import { useState } from 'react'

type Props = {
  onLogin: (email: string, pass: string) => Promise<unknown>
  onRegister: (email: string, pass: string) => Promise<unknown>
}

export function AuthForm({ onLogin, onRegister }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="senha"
      />
      <div className="flex gap-2">
        <button type="button" onClick={() => onLogin(email, password)}>
          Entrar
        </button>
        <button type="button" onClick={() => onRegister(email, password)}>
          Registrar
        </button>
      </div>
    </form>
  )
}