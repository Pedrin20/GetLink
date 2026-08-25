import { useState } from 'react'
import { useTheme, type ThemeId } from '../contexts/ThemeContext'
import { Check, ChevronDown } from 'lucide-react'

const THEME_COLORS: Record<ThemeId, { bg: string; surface: string; primary: string; text: string }> = {
  light:       { bg: '#FAFAF9', surface: '#FFFFFF', primary: '#F97316', text: '#1C1917' },
  dark:        { bg: '#0C0A09', surface: '#1C1917', primary: '#F97316', text: '#FAFAF9' },
  glass:       { bg: '#F0F0FF', surface: 'rgba(255,255,255,0.6)', primary: '#818CF8', text: '#1E1B4B' },
  cyberpunk:   { bg: '#0A0A0F', surface: '#12121A', primary: '#F0ABFC', text: '#F5F3FF' },
  minimalista: { bg: '#FFFFFF', surface: '#FFFFFF', primary: '#71717A', text: '#18181B' },
  neon:        { bg: '#030712', surface: '#0F172A', primary: '#22D3EE', text: '#F1F5F9' },
  terminal:    { bg: '#0A0A0A', surface: '#111111', primary: '#4ADE80', text: '#D4D4D4' },
}

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const current = themes.find((t) => t.id === theme)!

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-sm w-full justify-between gap-2"
        aria-label="Mudar tema"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-5 h-5 rounded-md border border-[var(--color-border)] flex-shrink-0"
            style={{ background: THEME_COLORS[theme].bg }}
          >
            <div
              className="w-2 h-2 rounded-full m-auto mt-[5px]"
              style={{ background: THEME_COLORS[theme].primary }}
            />
          </div>
          <span className="truncate text-[var(--color-text-primary)]">{current.label}</span>
        </div>
        <ChevronDown
          size={14}
          className={`text-[var(--color-text-muted)] transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[49]" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-[var(--shadow-lg)] overflow-hidden z-50 animate-slide-down">
            <div className="p-1.5">
              {themes.map((t) => {
                const colors = THEME_COLORS[t.id]
                const isActive = t.id === theme

                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-[var(--color-primary-soft)]'
                        : 'hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    {/* Theme mini preview */}
                    <div className="relative w-10 h-7 rounded-md overflow-hidden flex-shrink-0 border border-[var(--color-border)]">
                      <div className="absolute inset-0" style={{ background: colors.bg }} />
                      <div
                        className="absolute top-1 left-1 w-2.5 h-2.5 rounded-sm"
                        style={{ background: colors.surface, border: `1px solid ${colors.primary}40` }}
                      />
                      <div
                        className="absolute bottom-1 right-1 w-5 h-1 rounded-full"
                        style={{ background: colors.primary }}
                      />
                    </div>

                    {/* Label and description */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                        {t.icon} {t.label}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] truncate">
                        {t.description}
                      </p>
                    </div>

                    {/* Active check */}
                    {isActive && (
                      <Check size={16} className="text-[var(--color-primary)] flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
