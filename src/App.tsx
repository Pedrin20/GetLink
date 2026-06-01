import './App.css'
import { useLinks } from './hooks/useLinks'
import { LinkForm } from './components/LinkForm'
import { LinkList } from './components/LinkList'

function App() {
  const { links, add, remove } = useLinks()

  return (
    <main className="app">
      <section className="card">
        <p className="eyebrow">Base de teste</p>
        <h1>Primeiro teste de TypeScript</h1>
        <p className="subtitle">Aqui você pode usar o site para acessar diversos links</p>

        <LinkForm onAdd={add} />
      </section>

      <section className="list">
        <h2>Links salvos!</h2>
        <LinkList links={links} onRemove={remove} />
      </section>
    </main>
  )
}

export default App