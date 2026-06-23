// src/pages/Home.tsx
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLinks } from '../hooks/useLinks'
import { LinkForm } from '../components/LinkForm'
import { LinkList } from '../components/LinkList'
import type { Link } from '../types'

export function Home() {
  const { user } = useAuth()
  const { links, loading, addLink, removeLink } = useLinks(user?.uid)
  const [showAddForm, setShowAddForm] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[var(--color-ink)]">
            Seus Links
          </h1>
          <p className="text-[var(--color-muted)] text-sm">
            {links.length} {links.length === 1 ? 'link' : 'links'} cadastrados
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-200"
        >
          <span>+</span> Novo Link
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-sm">
          <LinkForm
            onAdd={(newLink: Omit<Link, 'id'>) => {
              addLink({ ...newLink, userId: user!.uid })
              setShowAddForm(false)
            }}
          />
        </div>
      )}

      {links.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-[var(--color-border)] border-dashed">
          <div className="text-4xl mb-3">📎</div>
          <p className="text-[var(--color-muted)]">Nenhum link ainda. Que tal criar um?</p>
        </div>
      ) : (
        <LinkList links={links} onRemove={removeLink} />
      )}
    </div>
  )
}