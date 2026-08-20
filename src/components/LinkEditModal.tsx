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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-[var(--radius-2xl)] p-6 max-w-md w-full shadow-[var(--shadow-xl)] relative animate-slide-up">
        <button
          onClick={onClose}
          className="btn btn-ghost btn-sm absolute top-4 right-4 p-2"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Editar Link</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Descrição (opcional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 accent-[var(--color-primary)]"
              />
              Link ativo
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-md flex-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-md flex-1"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}