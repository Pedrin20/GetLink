import { useState } from 'react'
import type { FaqBlockData } from '../../types'
import { ChevronDown } from 'lucide-react'

export function FaqBlock({ data }: { data: FaqBlockData; isEditing?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items = data.items?.length ? data.items : []

  if (items.length === 0) {
    return (
      <div className="rounded-2xl p-6 text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>
          Adicione perguntas frequentes
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <div className="p-5">
        <h3 className="mb-4 font-bold" style={{ color: 'var(--block-text)' }}>
          {data.title || 'Perguntas frequentes'}
        </h3>
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <div key={i} className="rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--block-border)' }}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium transition-colors"
                style={{ color: 'var(--block-text)' }}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  style={{ color: 'var(--block-text-muted)' }}
                />
              </button>
              {openIndex === i && (
                <div className="px-4 pb-3">
                  <p className="text-sm leading-relaxed"
                    style={{ color: 'var(--block-text-muted)' }}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
