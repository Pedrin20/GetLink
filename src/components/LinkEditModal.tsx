import { useState } from 'react'
import type { Link } from '../types'
import { X } from 'lucide-react'

type Props = {
  link: Link
  onSave: (data: Partial<Link>) => void
  onClose: () => void
}

export function LinkEditModal({ link, onSave, onClose }: Props) {
  const [title, setTitle] = useState(link.title)
  const [url, setUrl] = useState(link.url)
  const [description, setDescription] = useState(link.description || '')
  const [isActive, setIsActive] = useState(link.isActive ?? true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ title, url, description, isActive })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition"
        >
          <X size={24} />
        </button>

        <h3 className="text-xl font-serif text-[var(--color-ink)] mb-4">Editar Link</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">
              Descrição (opcional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-ink)]">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 accent-[var(--color-accent)]"
              />
              Link ativo
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[var(--color-accent)] text-white font-medium rounded-xl hover:brightness-110 transition"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  )
}