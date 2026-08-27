import type { ServiceBlockData } from '../../types'

export function ServiceBlock({ data, isEditing }: { data: ServiceBlockData; isEditing?: boolean }) {
  const href = data.actionUrl?.startsWith('http') ? data.actionUrl : data.actionUrl ? `https://${data.actionUrl}` : ''

  return (
    <div className="p-5 rounded-2xl public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--block-text)' }}>
        {data.title || 'Serviço'}
      </h3>
      {data.description && (
        <p className="text-sm mb-3" style={{ color: 'var(--block-text-secondary)' }}>{data.description}</p>
      )}
      {data.actionLabel && (
        isEditing ? (
          <span className="inline-block px-4 py-2 rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: 'var(--profile-accent)' }}>
            {data.actionLabel}
          </span>
        ) : (
          <a
            href={href || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--profile-accent)' }}
          >
            {data.actionLabel}
          </a>
        )
      )}
    </div>
  )
}
