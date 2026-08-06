import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLinks } from '../hooks/useLinks'
import { LinkList } from '../components/LinkList'
import { LinkForm } from '../components/LinkForm'
import { LinkEditModal } from '../components/LinkEditModal'
import { MainLayout } from '../layouts/MainLayout'
import { Plus, Search } from 'lucide-react'
import type { Link } from '../types'
import { reorderLinks } from '../services/linkService'

export function Links() {
  const { user } = useAuth()
  const { links, loading, addLink, removeLink, updateLink } = useLinks(user?.uid)
  const [showAddForm, setShowAddForm] = useState(false)
  const [search, setSearch] = useState('')
  const [editingLink, setEditingLink] = useState<Link | null>(null)

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(search.toLowerCase()) ||
    link.url.toLowerCase().includes(search.toLowerCase())
  )

  const handleReorder = async (newLinks: Link[]) => {
    const updates = newLinks.map((link, index) => ({
      id: link.id,
      order: index,
    }))
    await reorderLinks(updates)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif text-[var(--color-ink)]">Todos os links</h1>
            <p className="text-[var(--color-muted)] text-sm">
              Gerencie todos os seus links em um só lugar.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white font-medium rounded-xl hover:brightness-110 transition"
          >
            <Plus size={18} />
            Novo link
          </button>
        </div>

        {/* Barra de pesquisa */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={18} />
          <input
            type="text"
            placeholder="Buscar links por título ou URL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
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

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent" />
          </div>
        ) : (
          <LinkList
            links={filteredLinks}
            onRemove={removeLink}
            onEdit={setEditingLink}
            onReorder={handleReorder}
          />
        )}

        {/* Modal de edição */}
        {editingLink && (
          <LinkEditModal
            link={editingLink}
            onSave={(updatedLink) => {
              if (editingLink) {
                updateLink(editingLink.id, updatedLink)
                setEditingLink(null)
              }
            }}
            onClose={() => setEditingLink(null)}
          />
        )}
      </div>
    </MainLayout>
  )
}