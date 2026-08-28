import { BLOCK_LIBRARY, type BlockTypeDef } from '../../types'
import {
  UserCircle,
  Link2,
  ShoppingBag,
  CalendarClock,
  Images,
  Video,
  Type,
  Mail,
  Share2,
  Plus,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  header: UserCircle,
  link: Link2,
  product: ShoppingBag,
  service: CalendarClock,
  gallery: Images,
  video: Video,
  text: Type,
  newsletter: Mail,
  socials: Share2,
}

export function BlockLibrary({ onAdd }: { onAdd: (def: BlockTypeDef) => void }) {
  return (
    <aside className="flex h-full w-full flex-col gap-4 overflow-y-auto p-4">
      <div>
        <h2 className="text-sm font-semibold text-white">Adicionar bloco</h2>
        <p className="mt-0.5 text-xs text-gray-400">Clique para inserir na sua página</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {BLOCK_LIBRARY.map((def) => {
          const Icon = ICONS[def.type]
          return (
            <button
              key={def.type}
              type="button"
              onClick={() => onAdd(def)}
              className="group relative flex flex-col gap-2 rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5"
              style={{
                borderColor: 'oklch(1 0 0 / 12%)',
                background: 'oklch(0.21 0.018 285)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'oklch(0.58 0.24 285 / 50%)'
                e.currentTarget.style.background = 'oklch(0.26 0.02 285)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'oklch(1 0 0 / 12%)'
                e.currentTarget.style.background = 'oklch(0.21 0.018 285)'
              }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors group-hover:text-white"
                style={{ background: 'oklch(0.26 0.02 285)' }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-white">{def.label}</span>
              <span className="text-[11px] leading-tight text-gray-400">
                {def.description}
              </span>
              <span className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Plus className="h-3.5 w-3.5" style={{ color: 'oklch(0.58 0.24 285)' }} />
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
