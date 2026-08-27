import type { ProductBlockData } from '../../types'

export function ProductBlock({ data, isEditing }: { data: ProductBlockData; isEditing?: boolean }) {
  const href = data.linkUrl?.startsWith('http') ? data.linkUrl : data.linkUrl ? `https://${data.linkUrl}` : ''

  if (isEditing) {
    return (
      <div className="rounded-2xl overflow-hidden public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        {data.imageUrl && <img src={data.imageUrl} alt={data.title} className="w-full h-44 object-cover" />}
        <div className="p-5">
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--block-text)' }}>{data.title || 'Sem título'}</h3>
          {data.description && <p className="text-sm mb-3" style={{ color: 'var(--block-text-secondary)' }}>{data.description}</p>}
          {data.price && (
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: 'var(--profile-accent)' }}>
              R$ {data.price}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden public-block group transition-all duration-200"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}
    >
      {data.imageUrl && (
        <img src={data.imageUrl} alt={data.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      )}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--block-text)' }}>{data.title}</h3>
            {data.description && <p className="text-sm" style={{ color: 'var(--block-text-secondary)' }}>{data.description}</p>}
          </div>
          {data.price && (
            <span className="ml-3 px-4 py-1.5 rounded-full text-sm font-bold text-white flex-shrink-0"
              style={{ backgroundColor: 'var(--profile-accent)' }}>
              R$ {data.price}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
