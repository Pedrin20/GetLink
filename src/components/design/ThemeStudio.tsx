import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useBlocks, usePageSettings } from '../../hooks/useBlocks'
import { PublicProfile } from '../public/PublicProfile'
import { Check, Type, SquareStack, Droplets, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import type { PageSettings, DesignPreset, TitleFont, BlockStyle, Density, CornerStyle } from '../../types'

const THEME_PRESETS: { id: DesignPreset; name: string; description: string; vars: Record<string, string> }[] = [
  {
    id: 'neon',
    name: 'Neon',
    description: 'Escuro, vibrante, vidro',
    vars: {
      bg: 'linear-gradient(160deg, #1a1533 0%, #14111f 55%, #0f0d18 100%)',
      surface: 'rgba(255,255,255,0.06)',
      border: 'rgba(255,255,255,0.12)',
      text: '#f5f3ff',
      muted: 'rgba(245,243,255,0.6)',
      accent: '#7c5cff',
      accentText: '#ffffff',
    },
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Claro, serifado, revista',
    vars: {
      bg: '#f7f4ee',
      surface: '#fffdf9',
      border: '#e4ddcf',
      text: '#1c1a17',
      muted: '#6b6459',
      accent: '#b23a2e',
      accentText: '#fffdf9',
    },
  },
  {
    id: 'minimal-mono',
    name: 'Minimal Mono',
    description: 'Branco, monoespaçado, seco',
    vars: {
      bg: '#ffffff',
      surface: '#ffffff',
      border: '#e2e2e2',
      text: '#111111',
      muted: '#7a7a7a',
      accent: '#111111',
      accentText: '#ffffff',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Gradiente quente, cheio',
    vars: {
      bg: 'linear-gradient(165deg, #ff8a3d 0%, #ff5e7e 55%, #b5468f 100%)',
      surface: 'rgba(255,255,255,0.16)',
      border: 'rgba(255,255,255,0.28)',
      text: '#ffffff',
      muted: 'rgba(255,255,255,0.82)',
      accent: '#ffffff',
      accentText: '#c0396f',
    },
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    description: 'Duro, contrastado, ousado',
    vars: {
      bg: '#ffdd33',
      surface: '#ffffff',
      border: '#111111',
      text: '#111111',
      muted: '#444444',
      accent: '#111111',
      accentText: '#ffdd33',
    },
  },
]

const ACCENT_SWATCHES = [
  '#7c5cff', '#ff6b4a', '#0ea5e9', '#22c55e',
  '#eab308', '#ec4899', '#111111', '#b23a2e',
]

const FONT_OPTIONS: { id: TitleFont; label: string; value: string }[] = [
  { id: 'grotesk', label: 'Grotesk', value: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" },
  { id: 'sans', label: 'Sans', value: "'Inter', ui-sans-serif, system-ui, sans-serif" },
  { id: 'serifada', label: 'Serifada', value: "Georgia, 'Times New Roman', serif" },
  { id: 'mono', label: 'Mono', value: "ui-monospace, 'SF Mono', monospace" },
]

const BLOCK_STYLES: { id: BlockStyle; label: string }[] = [
  { id: 'filled', label: 'Cheio' },
  { id: 'outline', label: 'Contorno' },
  { id: 'glass', label: 'Vidro' },
]

const DENSITIES: { id: Density; label: string }[] = [
  { id: 'compact', label: 'Compacto' },
  { id: 'standard', label: 'Padrão' },
  { id: 'spaced', label: 'Espaçado' },
]

const CORNERS: { id: CornerStyle; label: string }[] = [
  { id: 'sharp', label: 'Reto' },
  { id: 'soft', label: 'Suave' },
  { id: 'medium', label: 'Médio' },
  { id: 'round', label: 'Redondo' },
]

const RADIUS_MAP: Record<CornerStyle, string> = {
  sharp: '0rem',
  soft: '0.5rem',
  medium: '1.1rem',
  round: '1.6rem',
}

function getPresetVars(presetId: DesignPreset, accentColor: string): Record<string, string> {
  const preset = THEME_PRESETS.find((p) => p.id === presetId) || THEME_PRESETS[0]
  return { ...preset.vars, accent: accentColor }
}

export function ThemeStudio() {
  const { user } = useAuth()
  const { settings, loading, saveSettings } = usePageSettings(user?.uid)
  const { blocks } = useBlocks(user?.uid)
  const navigate = useNavigate()
  const [localSettings, setLocalSettings] = useState<PageSettings | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  const current = localSettings || settings

  if (loading || !current) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[oklch(0.58_0.24_285)] border-t-transparent" />
      </div>
    )
  }

  function update(partial: Partial<PageSettings>) {
    setHasChanges(true)
    setLocalSettings({ ...current!, ...partial })
  }

  async function handleSave() {
    const settingsToSave = (localSettings || current)!
    try {
      // Always save to localStorage as immediate fallback
      try {
        if (user?.uid) {
          localStorage.setItem(`getlink-settings-${user.uid}`, JSON.stringify(settingsToSave))
        }
      } catch {}
      
      // Try Firestore save
      await saveSettings(settingsToSave)
      setHasChanges(false)
      setLocalSettings(null)
      toast.success('Tema salvo!')
    } catch (err: any) {
      console.error('[ThemeStudio] Save error:', err)
      // Even if Firestore fails, localStorage saved — still show partial success
      setHasChanges(false)
      setLocalSettings(null)
      toast.success('Tema salvo localmente!')
    }
  }

  const themeVars = getPresetVars(current.preset, current.accentColor)
  const radius = RADIUS_MAP[current.corners]
  const fontDisplay = FONT_OPTIONS.find((f) => f.id === current.titleFont)?.value || FONT_OPTIONS[0].value

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header
        className="flex items-center justify-between gap-4 border-b px-4 py-3 md:px-6"
        style={{ borderColor: 'oklch(1 0 0 / 10%)' }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:text-white hover:bg-white/5"
            title="Voltar"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Design</h1>
          <p className="hidden text-xs text-gray-400 sm:block">
            Escolha um tema e ajuste cada detalhe da sua página pública
          </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasChanges}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50"
          style={{ background: 'oklch(0.58 0.24 285)' }}
        >
          Salvar tema
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Controls */}
        <div
          className="w-full shrink-0 overflow-y-auto p-4 md:w-80 lg:w-96"
          style={{ borderRight: '1px solid oklch(1 0 0 / 10%)' }}
        >
          {/* Presets */}
          <Section title="Presets">
            <div className="grid grid-cols-2 gap-2">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => update({ preset: preset.id })}
                  className="group relative overflow-hidden rounded-xl border p-3 text-left transition-all"
                  style={{
                    borderColor: current.preset === preset.id ? 'oklch(0.58 0.24 285)' : 'oklch(1 0 0 / 12%)',
                    boxShadow: current.preset === preset.id ? '0 0 0 2px oklch(0.58 0.24 285 / 50%)' : 'none',
                  }}
                >
                  <span
                    className="mb-2 flex h-10 w-full items-center gap-1 overflow-hidden rounded-md p-1.5"
                    style={{ background: preset.vars.bg }}
                  >
                    <span
                      className="h-full w-8 rounded"
                      style={{ background: preset.vars.surface, border: `1px solid ${preset.vars.border}` }}
                    />
                    <span className="h-3 w-3 rounded-full" style={{ background: preset.vars.accent }} />
                  </span>
                  <span className="block text-sm font-semibold text-white">{preset.name}</span>
                  <span className="block text-[11px] text-gray-400">{preset.description}</span>
                  {current.preset === preset.id ? (
                    <Check className="absolute right-2 top-2 h-4 w-4" style={{ color: 'oklch(0.58 0.24 285)' }} />
                  ) : null}
                </button>
              ))}
            </div>
          </Section>

          {/* Accent color */}
          <Section title="Cor de destaque" icon={<Droplets className="h-3.5 w-3.5" />}>
            <div className="flex flex-wrap gap-2">
              {ACCENT_SWATCHES.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => update({ accentColor: color })}
                  aria-label={`Destaque ${color}`}
                  className="h-8 w-8 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    background: color,
                    borderColor: current.accentColor.toLowerCase() === color.toLowerCase() ? 'white' : 'transparent',
                  }}
                />
              ))}
            </div>
          </Section>

          {/* Font */}
          <Section title="Fonte dos títulos" icon={<Type className="h-3.5 w-3.5" />}>
            <div className="grid grid-cols-2 gap-2">
              {FONT_OPTIONS.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => update({ titleFont: font.id })}
                  className="rounded-lg border px-3 py-2 text-sm font-semibold transition-colors"
                  style={{
                    fontFamily: font.value,
                    borderColor: current.titleFont === font.id ? 'oklch(0.58 0.24 285)' : 'oklch(1 0 0 / 12%)',
                    background: current.titleFont === font.id ? 'oklch(0.58 0.24 285 / 10%)' : 'transparent',
                    color: 'white',
                  } as React.CSSProperties}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </Section>

          {/* Block style */}
          <Section title="Estilo dos blocos" icon={<SquareStack className="h-3.5 w-3.5" />}>
            <Segmented options={BLOCK_STYLES} value={current.blockStyle} onChange={(v) => update({ blockStyle: v })} />
          </Section>

          {/* Density */}
          <Section title="Densidade">
            <Segmented options={DENSITIES} value={current.density} onChange={(v) => update({ density: v })} />
          </Section>

          {/* Corners */}
          <Section title="Cantos">
            <Segmented options={CORNERS} value={current.corners} onChange={(v) => update({ corners: v })} />
          </Section>
        </div>

        {/* Live preview */}
        <div
          className="hidden flex-1 items-start justify-center overflow-y-auto p-6 md:flex"
          style={{
            background: 'radial-gradient(circle at 1px 1px, oklch(1 0 0 / 10%) 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        >
          <div className="w-full max-w-sm">
            <p className="mb-3 text-center text-xs text-gray-400">Prévia da página pública</p>
            <div
              className="overflow-hidden shadow-2xl w-[500px]"
              style={{
                borderRadius: '2.2rem',
                border: '8px solid oklch(0.97 0.005 285 / 90%)',
                boxShadow: '0 25px 50px -12px oklch(0.58 0.24 285 / 20%)',
              }}
            >
              <div className="h-[650px] overflow-y-auto">
                <PublicProfile
                  blocks={blocks}
                  theme={{
                    vars: themeVars,
                    blockStyle: current.blockStyle,
                    density: current.density,
                    radius,
                    fontDisplay,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  )
}

function Segmented<T extends string>({ options, value, onChange }: { options: { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div
      className="flex flex-wrap gap-1 rounded-lg border p-1"
      style={{ borderColor: 'oklch(1 0 0 / 12%)', background: 'oklch(0.21 0.018 285)' }}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className="flex-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
          style={{
            background: value === opt.id ? 'oklch(0.58 0.24 285)' : 'transparent',
            color: value === opt.id ? 'white' : 'oklch(0.68 0.02 285)',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
