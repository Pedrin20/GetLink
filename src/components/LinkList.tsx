import type { Link } from '../types'
import { LinkItem } from './LinkItem'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Link2 } from 'lucide-react'

function SortableItem({ link, onRemove, onEdit }: { link: Link; onRemove: (id: string) => void; onEdit?: (link: Link) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,                                                              
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2">
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors rounded-lg hover:bg-[var(--color-surface-hover)]"
        aria-label="Arrastar para reordenar"
      >
        <GripVertical size={20} />
      </button>
      <div className="flex-1">
        <LinkItem link={link} onRemove={onRemove} onEdit={onEdit} />
      </div>
    </div>
  )
}

type Props = {
  links: Link[]
  onRemove: (id: string) => void
  onEdit?: (link: Link) => void
  onReorder?: (links: Link[]) => void
}

export function LinkList({ links, onRemove, onEdit, onReorder }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id && onReorder) {
      const oldIndex = links.findIndex((item) => item.id === active.id)
      const newIndex = links.findIndex((item) => item.id === over?.id)
      const newLinks = arrayMove(links, oldIndex, newIndex)
      onReorder(newLinks)
    }
  }

  if (links.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Link2 size={24} className="text-[var(--color-primary)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">Nenhum link cadastrado</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">Crie seu primeiro link para começar a gerenciar.</p>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
        <ul className="grid gap-2">
          {links.map((link) => (
            <li key={link.id} className="list-none">
              <SortableItem link={link} onRemove={onRemove} onEdit={onEdit} />
            </li>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}