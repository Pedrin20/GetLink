import { useState } from 'react'
import { TEMPLATES, type Template } from '../../lib/templates'
import { Search } from 'lucide-react'

const CATEGORIES = [
  { id: 'objective' as const, label: 'Por objetivo', emoji: '🎯' },
  { id: 'profession' as const, label: 'Por profissão', emoji: '💼' },
]

interface Props {
  onSelect: (template: Template) => void
  onSkip: () => void
}

export function TemplatePicker({ onSelect, onSkip }: Props) {
  const [category, setCategory] = useState<'objective' | 'profession'>('objective')
  const [search, setSearch] = useState('')

  const templates = TEMPLATES.filter((t) => t.category === category)
  const filtered = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div
      className="flex h-full flex-col items-center justify-center p-6"
      style={{
        background:
          'radial-gradient(circle at 1px 1px, oklch(1 0 0 / 10%) 1px, transparent 0)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Como quer começar?
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Escolha um template ou comece do zero. Você pode editar tudo depois.
          </p>
        </div>

        {/* Category tabs */}
        <div className="mb-4 flex justify-center">
          <div
            className="flex gap-1 rounded-xl p-1"
            style={{
              border: '1px solid oklch(1 0 0 / 12%)',
              background: 'oklch(0.21 0.018 285)',
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  background:
                    category === cat.id
                      ? 'oklch(0.58 0.24 285)'
                      : 'transparent',
                  color: category === cat.id ? 'white' : 'oklch(0.68 0.02 285)',
                }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-5 mx-auto max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar template..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[oklch(0.58_0.24_285)]"
            style={{
              borderColor: 'oklch(1 0 0 / 12%)',
              background: 'oklch(0.19 0.016 285)',
            }}
          />
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {filtered.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template)}
              className="group overflow-hidden rounded-xl border p-4 text-left transition-all hover:border-[oklch(0.58_0.24_285)] hover:shadow-lg"
              style={{
                borderColor: 'oklch(1 0 0 / 12%)',
                background: 'oklch(0.19 0.016 285)',
              }}
            >
              <span className="mb-2 block text-2xl">{template.emoji}</span>
              <span className="mb-1 block text-sm font-semibold text-white">
                {template.name}
              </span>
              <span className="block text-xs text-gray-400">
                {template.description}
              </span>
              <span className="mt-2 block text-[11px] text-gray-500">
                {template.blocks.length} blocos
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">
            Nenhum template encontrado.
          </p>
        )}

        {/* Skip */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onSkip}
            className="text-sm text-gray-400 underline-offset-4 hover:text-white hover:underline"
          >
            Começar do zero
          </button>
        </div>
      </div>
    </div>
  )
}
