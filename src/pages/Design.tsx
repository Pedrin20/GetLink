import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useBlocks, usePageSettings } from '../hooks/useBlocks'
import { BlockRenderer } from '../components/blocks/BlockRenderer'
import { MainLayout } from '../layouts/MainLayout'
import { Save } from 'lucide-react'
import toast from 'react-hot-toast'
import type { PageSettings, DesignPreset, TitleFont, BlockStyle, Density, CornerStyle } from '../types'

const PRESETS: { id: DesignPreset; name: string; description: string; colors: string[] }[] = [
  { id: 'neon', name: 'Neon', description: 'Escuro, vibrante, vidro', colors: ['#1a1a2e', '#16213e', '#0f3460'] },
  { id: 'editorial', name: 'Editorial', description: 'Claro, serifado, revista', colors: ['#f5f5f5', '#e0e0e0', '#bdbdbd'] },
  { id: 'minimal-mono', name: 'Minimal Mono', description: 'Branco, monoespaco, seco', colors: ['#ffffff', '#f5f5f5', '#e0e0e0'] },
  { id: 'sunset', name: 'Sunset', description: 'Gradiente quente, cheio', colors: ['#ff6b6b', '#ffa500', '#ff4757'] },
  { id: 'brutalist', name: 'Brutalist', description: 'Duro, contrastado, ousado', colors: ['#000000', '#333333', '#666666'] },
]

const ACCENT_COLORS = ['#8B5CF6', '#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#1F2937', '#DC2626']

const FONTS: { id: TitleFont; name: string }[] = [
  { id: 'grotesk', name: 'Grotesk' },
  { id: 'sans', name: 'Sans' },
  { id: 'serifada', name: 'Serifada' },
  { id: 'mono', name: 'Mono' },
]

const BLOCK_STYLES: { id: BlockStyle; name: string }[] = [
  { id: 'filled', name: 'Cheio' },
  { id: 'outline', name: 'Contorno' },
  { id: 'glass', name: 'Vidro' },
]

const DENSITIES: { id: Density; name: string }[] = [
  { id: 'compact', name: 'Compacto' },
  { id: 'standard', name: 'Padrao' },
  { id: 'spaced', name: 'Espacado' },
]

const CORNERS: { id: CornerStyle; name: string }[] = [
  { id: 'sharp', name: 'Reto' },
  { id: 'soft', name: 'Suave' },
  { id: 'medium', name: 'Medio' },
  { id: 'round', name: 'Redondo' },
]

function SectionToggle<T extends string>({
  label,
  options,
  value,
  onChange,
  variant = 'button',
}: {
  label: string
  options: { id: T; name: string }[]
  value: T
  onChange: (id: T) => void
  variant?: 'button' | 'pill'
}) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">{label}</h2>
      {variant === 'pill' ? (
        <div className="flex gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                value === opt.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                value === opt.id
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
                  : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export function Design() {
  const { user } = useAuth()
  const { settings, loading, saveSettings } = usePageSettings(user?.uid)
  const { blocks } = useBlocks(user?.uid)
  const [hasChanges, setHasChanges] = useState(false)
  const [localSettings, setLocalSettings] = useState<PageSettings | null>(null)

  const current = localSettings || settings

  if (loading || !current) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-primary)] border-t-transparent" />
        </div>
      </MainLayout>
    )
  }

  const update = (partial: Partial<PageSettings>) => {
    setHasChanges(true)
    setLocalSettings({ ...current, ...partial })
  }

  const handleSave = async () => {
    try {
      const toSave = localSettings || current
      await saveSettings(toSave)
      setHasChanges(false)
      setLocalSettings(null)
      toast.success('Tema salvo!')
    } catch {
      toast.error('Erro ao salvar tema')
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Design</h1>
            <p className="text-[var(--color-text-muted)] text-sm">
              Escolha um tema e ajuste cada detalhe da sua pagina publica
            </p>
          </div>
          <button onClick={handleSave} disabled={!hasChanges} className="btn btn-primary btn-md">
            <Save size={16} /> Salvar tema
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <section>
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">PRESETS</h2>
              <div className="grid grid-cols-2 gap-3">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => update({ preset: preset.id })}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      current.preset === preset.id
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
                    }`}
                  >
                    <div className="flex gap-1 mb-2">
                      {preset.colors.map((color, i) => (
                        <div key={i} className="w-8 h-6 rounded" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">{preset.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{preset.description}</p>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">COR DE DESTAQUE</h2>
              <div className="flex gap-3">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => update({ accentColor: color })}
                    className={`w-10 h-10 rounded-full transition-all ${
                      current.accentColor === color ? 'ring-2 ring-offset-2 ring-[var(--color-primary)] scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </section>

            <SectionToggle label="FONTE DOS TITULOS" options={FONTS} value={current.titleFont} onChange={(id) => update({ titleFont: id })} />
            <SectionToggle label="ESTILO DOS BLOCOS" options={BLOCK_STYLES} value={current.blockStyle} onChange={(id) => update({ blockStyle: id })} variant="pill" />
            <SectionToggle label="DENSIDADE" options={DENSITIES} value={current.density} onChange={(id) => update({ density: id })} variant="pill" />
            <SectionToggle label="CANTOS" options={CORNERS} value={current.corners} onChange={(id) => update({ corners: id })} variant="pill" />
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Previa da pagina publica</h4>
              <div className="mx-auto w-[375px] max-w-full">
                <div className="rounded-[2rem] border-4 border-gray-800 bg-gray-800 p-2 shadow-xl">
                  <div className="flex justify-center mb-1">
                    <div className="w-32 h-5 bg-gray-800 rounded-b-2xl" />
                  </div>
                  <div className="rounded-[1.5rem] overflow-hidden bg-gray-900 min-h-[600px] max-h-[700px] overflow-y-auto">
                    {blocks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <p className="text-xs">Nenhum bloco para preview</p>
                      </div>
                    ) : (
                      <div className="p-3 space-y-3">
                        {blocks.map((block) => (
                          <div key={block.id} className="text-sm">
                            <BlockRenderer block={block} isEditing />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center mt-1">
                    <div className="w-24 h-1 bg-gray-600 rounded-full" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-center text-[var(--color-text-muted)] mt-3">
                Feito com GetLink
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
