import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type ThemeId =
  | 'light'
  | 'dark'
  | 'glass'
  | 'cyberpunk'
  | 'minimalista'
  | 'neon'
  | 'terminal'

export interface ThemeMeta {
  id: ThemeId
  label: string
  description: string
  accent: string
  icon: string
}

export const THEMES: ThemeMeta[] = [
  { id: 'light', label: 'Light', description: 'Claro e limpo', accent: '#F97316', icon: '' },
  { id: 'dark', label: 'Dark', description: 'Escuro, alto contraste', accent: '#F97316', icon: '' },
  { id: 'glass', label: 'Purple', description: 'Glassmorphism', accent: '#818CF8', icon: '' },
  { id: 'cyberpunk', label: 'Cyberpunk', description: 'Neon futurista', accent: '#F0ABFC', icon: '' },
  { id: 'minimalista', label: 'Minimalista', description: 'Paleta reduzida', accent: '#71717A', icon: '◻' },
  { id: 'neon', label: 'Neon', description: 'Cores vibrantes', accent: '#22D3EE', icon: '' },
  { id: 'terminal', label: 'Terminal', description: 'Estética CLI', accent: '#4ADE80', icon: '' },
]

const STORAGE_KEY = 'getlink-theme'

function getStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && THEMES.some((t) => t.id === stored)) {
      return stored as ThemeId
    }
  } catch {
    // localStorage unavailable
  }
  return 'light'
}

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (id: ThemeId) => void
  themes: ThemeMeta[]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(getStoredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  // Apply on first render
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  const setTheme = (id: ThemeId) => {
    setThemeState(id)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
