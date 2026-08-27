import type { HeaderBlockData } from '../../types'

export function HeaderBlock({ data }: { data: HeaderBlockData; isEditing?: boolean }) {
  return (
    <div className="flex items-center gap-5 p-6 rounded-2xl public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      {data.avatarUrl ? (
        <img
          src={data.avatarUrl}
          alt={data.displayName}
          className="w-20 h-20 rounded-full object-cover border-2 flex-shrink-0"
          style={{ borderColor: 'var(--block-border)' }}
        />
      ) : (
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0"
          style={{ backgroundColor: 'var(--profile-accent)', color: 'white' }}>
          {data.displayName?.[0]?.toUpperCase() || '?'}
        </div>
      )}
      <div className="min-w-0">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--block-text)' }}>
          {data.displayName || 'Seu nome'}
        </h1>
        {data.bio && (
          <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--block-text-secondary)' }}>
            {data.bio}
          </p>
        )}
      </div>
    </div>
  )
}
