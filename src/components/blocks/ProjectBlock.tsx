import { ExternalLink, FolderOpen } from 'lucide-react'
import type { ProjectBlockData } from '../../types'

export function ProjectBlock({ data, isEditing }: { data: ProjectBlockData; isEditing?: boolean }) {
  const href = data.linkUrl?.startsWith('http') ? data.linkUrl : data.linkUrl ? `https://${data.linkUrl}` : ''

  if (isEditing) {
    return (
      <div className="rounded-2xl overflow-hidden border shadow-md public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        {data.imageUrl && <img src={data.imageUrl} alt={data.title} className="w-full h-36 object-cover" />}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <FolderOpen size={16} style={{ color: 'var(--profile-accent, #F97316)' }} />
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--profile-accent, #F97316)' }}>Projeto</span>
          </div>
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--block-text)' }}>{data.title || 'Sem título'}</h3>
          {data.description && <p className="text-sm" style={{ color: 'var(--block-text-secondary)' }}>{data.description}</p>}
        </div>
      </div>
    )
  }

  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 public-block group"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}
    >
      {data.imageUrl && (
        <img src={data.imageUrl} alt={data.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
      )}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-2">
            <FolderOpen size={16} style={{ color: 'var(--profile-accent, #F97316)' }} />
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--profile-accent, #F97316)' }}>Projeto</span>
          </div>
          {href && <ExternalLink size={18} className="transition-colors" style={{ color: 'var(--block-text-muted)' }} />}
        </div>
        <h3 className="text-lg font-bold mb-1 transition-colors" style={{ color: 'var(--block-text)' }}>{data.title}</h3>
        {data.description && <p className="text-sm" style={{ color: 'var(--block-text-secondary)' }}>{data.description}</p>}
      </div>
    </a>
  )
}
