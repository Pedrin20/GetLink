import { User, Link2, ShoppingBag, Calendar, Images, Video, Type, Mail, Share2, X } from 'lucide-react'
import type { BlockType } from '../types'

type AddBlockPanelProps = {
  onSelect: (type: BlockType) => void
  onClose: () => void
}

const BLOCK_TYPES: { type: BlockType; icon: typeof User; name: string; description: string }[] = [
  {
    type: 'header',
    icon: User,
    name: 'Cabeçalho',
    description: 'Sua foto, nome e bio',
  },
  {
    type: 'link',
    icon: Link2,
    name: 'Link',
    description: 'Botão para qualquer URL',
  },
  {
    type: 'product',
    icon: ShoppingBag,
    name: 'Produto',
    description: 'Item com preço e imagem',
  },
  {
    type: 'service',
    icon: Calendar,
    name: 'Serviço',
    description: 'Agendamento ou orçamento',
  },
  {
    type: 'gallery',
    icon: Images,
    name: 'Galeria',
    description: 'Grade de imagens',
  },
  {
    type: 'video',
    icon: Video,
    name: 'Vídeo',
    description: 'YouTube, Vimeo, embed',
  },
  {
    type: 'text',
    icon: Type,
    name: 'Texto',
    description: 'Bloco de texto livre',
  },
  {
    type: 'newsletter',
    icon: Mail,
    name: 'Newsletter',
    description: 'Captura de e-mails',
  },
  {
    type: 'socials',
    icon: Share2,
    name: 'Redes sociais',
    description: 'Ícones de perfis',
  },
]

export function AddBlockPanel({ onSelect, onClose }: AddBlockPanelProps) {
  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Adicionar bloco</h3>
          <p className="text-xs text-[var(--color-text-muted)]">Clique para inserir na sua página</p>
        </div>
        <button onClick={onClose} className="btn btn-ghost btn-sm p-1.5">
          <X size={16} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {BLOCK_TYPES.map(({ type, icon: Icon, name, description }) => (
          <button
            key={type}
            onClick={() => { onSelect(type); onClose() }}
            className="flex items-start gap-3 p-4 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-all text-left group bg-[var(--color-surface)]"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-soft)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary)] transition-colors">
              <Icon size={20} className="text-[var(--color-primary)] group-hover:text-white transition-colors" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">{name}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-relaxed">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
