import { Link2, Star, Share2, FolderOpen, Image, X } from 'lucide-react'
import type { BlockType } from '../types'

type AddBlockPanelProps = {
  onSelect: (type: BlockType) => void
  onClose: () => void
}

const BLOCK_TYPES: { type: BlockType; icon: typeof Link2; name: string; description: string }[] = [
  {
    type: 'link',
    icon: Link2,
    name: 'Link',
    description: 'Adicione um link simples com título e URL',
  },
  {
    type: 'link-featured',
    icon: Star,
    name: 'Link Destacado',
    description: 'Um link com imagem e mais destaque visual',
  },
  {
    type: 'socials',
    icon: Share2,
    name: 'Redes Sociais',
    description: 'Links para suas redes sociais',
  },
  {
    type: 'project',
    icon: FolderOpen,
    name: 'Projeto',
    description: 'Mostre um projeto com imagem e descrição',
  },
  {
    type: 'image',
    icon: Image,
    name: 'Imagem',
    description: 'Exiba uma imagem com legenda',
  },
]

export function AddBlockPanel({ onSelect, onClose }: AddBlockPanelProps) {
  return (
    <div className="card p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Adicionar bloco</h3>
        <button onClick={onClose} className="btn btn-ghost btn-sm p-1.5">
          <X size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BLOCK_TYPES.map(({ type, icon: Icon, name, description }) => (
          <button
            key={type}
            onClick={() => { onSelect(type); onClose() }}
            className="flex items-start gap-3 p-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-soft)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary)] transition-colors">
              <Icon size={18} className="text-[var(--color-primary)] group-hover:text-white transition-colors" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">{name}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-relaxed">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
