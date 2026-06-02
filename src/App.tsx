import { useLinks } from './hooks/useLinks'
import { LinkForm } from './components/LinkForm'
import { LinkList } from './components/LinkList'

function App() {
  const { links, add, remove } = useLinks()

  return (
    <main className="min-h-screen px-4 py-8 text-[var(--color-ink)] sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-white/80 p-6 shadow-[0_12px_30px_rgba(28,27,26,0.05)] backdrop-blur-sm sm:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            Base de teste
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Primeiro teste de TypeScript
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)] sm:text-base">
            Aqui você pode usar o site para acessar diversos links
          </p>

          <LinkForm onAdd={add} />
        </section>

        <section className="rounded-[2rem] border border-[var(--color-border)] bg-white/80 p-6 shadow-[0_12px_30px_rgba(28,27,26,0.05)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
                Links salvos
              </h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Sua lista cresce aqui conforme você adiciona novos itens.
              </p>
            </div>
            <span className="hidden rounded-full bg-[var(--color-accent-light)] px-3 py-1 text-xs font-medium text-[var(--color-accent)] sm:inline-flex">
              {links.length} itens
            </span>
          </div>

          <div className="mt-6">
            <LinkList links={links} onRemove={remove} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App