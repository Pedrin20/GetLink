import { ExternalLink } from 'lucide-react'
import type { LinkBlockData } from '../../types'

export function LinkBlock({ data, isEditing }: { data: LinkBlockData; isEditing?: boolean }) {
  const href = data.url.startsWith('http') ? data.url : `https://${data.url}`

  if (isEditing) {
    return (
      <div className="rounded-xl p-5 border shadow-md public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--block-text)' }}>{data.title || 'Sem título'}</h3>
        {data.description && <p className="text-sm" style={{ color: 'var(--block-text-secondary)' }}>{data.description}</p>}
        <p className="text-xs mt-2 truncate" style={{ color: 'var(--block-text-muted)' }}>{data.url}</p>
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 public-block group"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-1 transition-colors"
            style={{ color: 'var(--block-text)' }}>
            {data.title}
          </h3>
          {data.description && <p className="text-sm" style={{ color: 'var(--block-text-secondary)' }}>{data.description}</p>}
        </div>
        <ExternalLink size={18} className="transition-colors ml-3 flex-shrink-0" style={{ color: 'var(--block-text-muted)' }} />
      </div>
    </a>
  )
}
