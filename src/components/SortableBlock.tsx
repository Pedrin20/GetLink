import { GripVertical, Pencil, Trash2, Link2, Star, Share2, FolderOpen, Image } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Block, BlockType } from '../types'

const TYPE_LABELS: Record<BlockType, { label: string; icon: typeof Link2 }> = {
  profile: { label: 'Perfil', icon: Share2 },
  link: { label: 'Link', icon: Link2 },
  'link-featured': { label: 'Destaque', icon: Star },
  socials: { label: 'Social', icon: Share2 },
  project: { label: 'Projeto', icon: FolderOpen },
  image: { label: 'Imagem', icon: Image },
}

type SortableBlockProps = {
  block: Block
  onEdit: (block: Block) => void
  onRemove: (id: string) => void
  isProfile?: boolean
  position?: number
  total?: number
}

export function SortableBlock({ block, onEdit, onRemove, isProfile, position, total }: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 50 : 'auto' as const,
  }

  const typeInfo = TYPE_LABELS[block.type] || TYPE_LABELS.link
  const TypeIcon = typeInfo.icon

  const getDataSummary = () => {
    const d = block.data as any
    if (block.type === 'profile') return d.displayName || 'Sem nome'
    if (block.type === 'link' || block.type === 'link-featured') return d.title || d.url || 'Sem título'
    if (block.type === 'socials') return `${d.items?.length || 0} redes`
    if (block.type === 'project') return d.title || 'Sem título'
    if (block.type === 'image') return d.caption || 'Sem legenda'
    return 'Bloco'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-3 rounded-xl border transition-all touch-manipulation select-none ${
        isDragging
          ? 'border-[var(--color-primary)] shadow-lg bg-[var(--color-surface-elevated)] scale-[1.02]'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:shadow-sm'
      } ${isProfile ? 'border-l-4 border-l-[var(--color-primary)]' : ''}`}
    >
      {!isProfile ? (
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors rounded-lg hover:bg-[var(--color-surface-hover)] touch-none min-w-[36px] min-h-[36px] flex items-center justify-center"
          aria-label="Arrastar para reordenar"
        >
          <GripVertical size={18} />
        </button>
      ) : (
        <div className="w-9" />
      )}

      {/* Position badge */}
      {position !== undefined && (
        <div className="w-6 h-6 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-[var(--color-primary)]">
            {position + 1}
          </span>
        </div>
      )}

      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-soft)] flex items-center justify-center flex-shrink-0">
        <TypeIcon size={16} className="text-[var(--color-primary)]" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{typeInfo.label}</p>
        <p className="text-xs text-[var(--color-text-muted)] truncate">{getDataSummary()}</p>
      </div>

      {/* Total counter */}
      {total !== undefined && !isProfile && (
        <span className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-surface-hover)] px-1.5 py-0.5 rounded-full flex-shrink-0">
          {position !== undefined ? `${position + 1}/${total}` : ''}
        </span>
      )}

      <div className="flex items-center gap-1 flex-shrink-0">
        <button onClick={() => onEdit(block)} className="btn btn-ghost btn-sm p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center" title="Editar">
          <Pencil size={14} />
        </button>
        {!isProfile && (
          <button
            onClick={() => {
              if (window.confirm('Remover este bloco?')) onRemove(block.id)
            }}
            className="btn btn-ghost btn-sm p-1.5 hover:text-[var(--color-error)] hover:bg-[var(--color-error-soft)] min-w-[32px] min-h-[32px] flex items-center justify-center"
            title="Remover"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
