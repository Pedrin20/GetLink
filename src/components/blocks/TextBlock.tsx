import type { TextBlockData } from '../../types'

export function TextBlock({ data }: { data: TextBlockData; isEditing?: boolean }) {
  if (!data.content) {
    return (
      <div className="rounded-2xl p-6 text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>Escreva algo...</p>
      </div>
    )
  }

  return (
    <div className="p-5 rounded-2xl public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--block-text)' }}>
        {data.content}
      </p>
    </div>
  )
}
