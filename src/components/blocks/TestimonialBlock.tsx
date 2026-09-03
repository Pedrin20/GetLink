import type { TestimonialBlockData } from '../../types'
import { Star } from 'lucide-react'

export function TestimonialBlock({ data }: { data: TestimonialBlockData; isEditing?: boolean }) {
  const items = data.items?.length ? data.items : []

  if (items.length === 0) {
    return (
      <div className="rounded-2xl p-6 text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>
          Adicione depoimentos de clientes
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <div className="p-5">
        <h3 className="mb-4 font-bold" style={{ color: 'var(--block-text)' }}>
          {data.title || 'O que dizem sobre mim'}
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
          {items.map((item, i) => (
            <div
              key={i}
              className="min-w-[220px] shrink-0 snap-start rounded-xl p-4"
              style={{ border: '1px solid var(--block-border)' }}
            >
              <div className="mb-2 flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-current"
                    style={{ color: 'var(--block-accent, #F59E0B)' }} />
                ))}
              </div>
              <p className="mb-3 text-sm leading-relaxed italic"
                style={{ color: 'var(--block-text-muted)' }}>
                "{item.text}"
              </p>
              <div className="flex items-center gap-2">
                {item.avatarUrl ? (
                  <img src={item.avatarUrl} alt={item.name}
                    className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: 'var(--block-accent, #8B5CF6)' }}>
                    {item.name?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--block-text)' }}>
                    {item.name}
                  </p>
                  {item.role && (
                    <p className="text-xs" style={{ color: 'var(--block-text-muted)' }}>
                      {item.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
