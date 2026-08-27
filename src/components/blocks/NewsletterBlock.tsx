import { Mail } from 'lucide-react'
import type { NewsletterBlockData } from '../../types'

export function NewsletterBlock({ data, isEditing }: { data: NewsletterBlockData; isEditing?: boolean }) {
  return (
    <div className="p-5 rounded-2xl public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Mail size={18} style={{ color: 'var(--profile-accent)' }} />
        <h3 className="text-lg font-bold" style={{ color: 'var(--block-text)' }}>
          {data.title || 'Receba novidades'}
        </h3>
      </div>
      {data.description && (
        <p className="text-sm mb-4" style={{ color: 'var(--block-text-secondary)' }}>{data.description}</p>
      )}
      <div className="flex gap-2">
        <input
          type="email"
          placeholder={data.placeholder || 'seu@email.com'}
          className="flex-1 px-4 py-2 rounded-xl text-sm border-0 outline-none"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--block-text)' }}
          disabled={isEditing}
        />
        <button
          className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--profile-accent)' }}
          disabled={isEditing}
        >
          {data.buttonText || 'Assinar'}
        </button>
      </div>
    </div>
  )
}
