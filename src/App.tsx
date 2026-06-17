import type { Link } from './types'
import { useAuth } from "./hooks/useAuth"
import { useLinksFirestore } from "./hooks/useLinks"
import { LinkForm } from './components/LinkForm'
import { LinkList } from './components/LinkList'
import { AuthForm } from './components/AuthForm'

function App() {
  const { user, loading, login, register, logout } = useAuth()
  const { links, add, remove } = useLinksFirestore(user?.uid)

  if(loading) return <div>Carregando...</div>

  if (!user) {
    return <AuthForm onLogin={login} onRegister={register} />
  }

  return (
    <main>
      <button onClick={() => logout()}>Sair</button>

      <LinkForm
        onAdd={(l: Omit<Link, 'id'>) => add({ ...l, userId: user.uid })}
      />

      <LinkList
        links={links}
        onRemove={(id: string) => remove(id)}
        />
    </main>
  )
}

export default App