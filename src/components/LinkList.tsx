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
import { GripVertical } from 'lucide-react'

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
        className="cursor-grab active:cursor-grabbing p-1 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition"
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
      <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-accent-light)] px-4 py-10 text-center text-sm text-[var(--color-muted)] sm:px-6">
        Nenhum link cadastrado ainda.
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