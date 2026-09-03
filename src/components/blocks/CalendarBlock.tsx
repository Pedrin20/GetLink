import type { CalendarBlockData } from '../../types'
import { Calendar, Clock } from 'lucide-react'

export function CalendarBlock({ data }: { data: CalendarBlockData; isEditing?: boolean }) {
  if (!data.calUrl && !data.title) {
    return (
      <div className="rounded-2xl p-6 text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>
          Configure seu link de agendamento
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'var(--block-accent, #8B5CF6)', color: 'white' }}>
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold" style={{ color: 'var(--block-text)' }}>
              {data.title || 'Agendar horário'}
            </h3>
            {data.description && (
              <p className="text-xs" style={{ color: 'var(--block-text-muted)' }}>
                {data.description}
              </p>
            )}
          </div>
        </div>
        {data.availableHours && (
          <div className="flex items-center gap-2 text-xs mb-3"
            style={{ color: 'var(--block-text-muted)' }}>
            <Clock className="h-3.5 w-3.5" />
            <span>{data.availableHours}</span>
          </div>
        )}
      </div>
      <a
        href={data.calUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-5 py-3 text-center text-sm font-semibold transition-opacity hover:opacity-80"
        style={{
          borderTop: '1px solid var(--block-border)',
          background: 'var(--block-accent, #8B5CF6)',
          color: 'white',
        }}
      >
        Agendar agora
      </a>
    </div>
  )
}
