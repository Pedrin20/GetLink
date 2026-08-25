import type { Link } from "../types"
import { Edit2, Trash2, BarChart2, Link2 } from 'lucide-react'
import toast from 'react-hot-toast'

type Props = {
    link: Link
    onRemove: (id: string) => void
    onEdit?: (link: Link) => void
}

export function LinkItem({ link, onRemove, onEdit }: Props) {
  const handleRemove = async () => {
    if (window.confirm('Remover este link?')) {
      await onRemove(link.id)
    }
  }

    return (
    <div className="card card-hover p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-medium text-[var(--color-text-primary)] truncate">
              {link.title || 'Sem título'}
            </h3>
            {!link.isActive && (
              <span className="badge badge-info">
                Inativo
              </span>
            )}
          </div>
          <a
            href={`/r/${link.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors truncate block"
            onClick={() => {}}
          >
            {link.url}
          </a>
          {link.description && (
            <p className="text-sm text-[var(--color-text-muted)] truncate mt-0.5">
              {link.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="badge badge-primary">
            <BarChart2 size={14} />
            <span>{link.clicks || 0}</span>
          </div>

          {onEdit && (
      <button onClick={() => onEdit(link)} className="btn btn-ghost btn-sm p-2">
        <Edit2 size={14} />
      </button>
    )}
    <button
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.origin}/r/${link.id}`)
          toast.success('Link copiado para a área de transferência! 📋')
        }}
        className="btn btn-ghost btn-sm p-2"
        title="Copiar link"
      >
        <Link2 size={14} />
      </button>
    <button onClick={handleRemove} className="btn btn-ghost btn-sm p-2 hover:text-[var(--color-error)] hover:bg-[var(--color-error-soft)]">
      <Trash2 size={14} />
    </button>
        </div>
      </div>
    </div>
  )
}