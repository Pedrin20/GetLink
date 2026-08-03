import type { Link } from "../types"
import { useState } from 'react'
import { Edit2, Trash2, Eye, EyeOff, BarChart2 } from 'lucide-react'

type Props = {
    item: Link
    onRemove: (id: string) => void
    onEdit?: (link: Link) => void
}

export function LinkItem({ link, onRemove, onEdit }: Props) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleRemove = async () => {
    if (window.confirm('Remover este link?')) {
      setIsDeleting(true)
      await onRemove(link.id)
      setIsDeleting(false)
    }
  }

    return (
    <div className="group bg-white rounded-xl border border-[var(--color-border)] p-4 hover:shadow-md hover:border-[var(--color-accent)]/30 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-medium text-[var(--color-ink)] truncate">
              {link.title || 'Sem título'}
            </h3>
            {!link.isActive && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                Inativo
              </span>
            )}
          </div>
          <a
            href={`/r/${link.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] truncate block"
            onClick={(e) => {
            }}
          >
            {link.url}
          </a>
          {link.description && (
            <p className="text-sm text-[var(--color-muted)]/70 truncate mt-0.5">
              {link.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 text-xs text-[var(--color-muted)] bg-[var(--color-paper)] px-2 py-1 rounded-full">
            <BarChart2 size={14} />
            <span>{link.clicks || 0}</span>
          </div>

          {onEdit && (
            <button
              onClick={() => onEdit(link)}
              className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition rounded-lg hover:bg-[var(--color-accent-light)]"
            >
              <Edit2 size={16} />
            </button>
          )}

          <button
            onClick={handleRemove}
            disabled={isDeleting}
            className="p-1.5 text-[var(--color-muted)] hover:text-red-500 transition rounded-lg hover:bg-red-50"
          >
            {isDeleting ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}