import { useState, useEffect } from 'react'
import { Plus, GripVertical, User, Link2, ShoppingBag, Calendar, Images, Video, Type, Mail, Share2 } from 'lucide-react'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import toast from 'react-hot-toast'
import type { Block, BlockType } from '../types'
import { useBlocks } from '../hooks/useBlocks'
import { migrateLinksToBlocks, hasMigratedLinks } from '../services/blockService'
import { SortableBlock } from './SortableBlock'
import { AddBlockPanel } from './AddBlockPanel'
import { BlockEditForm } from './BlockEditForm'

type BlockEditorProps = {
  userId: string
  onBlocksChange?: (blocks: Block[]) => void
}

const TYPE_ICONS: Record<BlockType, typeof User> = {
  header: User,
  link: Link2,
  product: ShoppingBag,
  service: Calendar,
  gallery: Images,
  video: Video,
  text: Type,
  newsletter: Mail,
  socials: Share2,
}

function vibrate(pattern: number | number[]) {
  try { navigator.vibrate?.(pattern) } catch { /* no-op */ }
}

export function BlockEditor({ userId, onBlocksChange }: BlockEditorProps) {
  const { blocks, loading, addBlock, removeBlock, updateBlock, reorder } = useBlocks(userId)
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [editingBlock, setEditingBlock] = useState<Block | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!userId || hasMigratedLinks(userId) || blocks.length > 0) return
    migrateLinksToBlocks(userId).then((count) => {
      if (count > 0) {
        toast.success(`Links antigos migrados para blocos! (${count} links)`)
      }
    }).catch(() => { /* silent */ })
  }, [userId, blocks.length])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const headerBlock = blocks.find((b) => b.type === 'header')
  const nonHeaderBlocks = blocks.filter((b) => b.type !== 'header')

  const activeBlock = activeId
    ? blocks.find((b) => b.id === activeId) ?? null
    : null

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
    vibrate(30)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over || active.id === over.id) {
      vibrate([10, 20, 10])
      return
    }

    vibrate(50)

    const oldIndex = nonHeaderBlocks.findIndex((b) => b.id === active.id)
    const newIndex = nonHeaderBlocks.findIndex((b) => b.id === over.id)
    const newBlocks = arrayMove(nonHeaderBlocks, oldIndex, newIndex)

    const reordered = headerBlock
      ? [headerBlock, ...newBlocks]
      : newBlocks

    reorder(reordered)
    onBlocksChange?.(reordered)
  }

  const handleAddBlock = async (type: BlockType) => {
    const defaults: Record<BlockType, any> = {
      header: { displayName: '', bio: '', avatarUrl: '' },
      link: { title: '', url: '', description: '' },
      product: { title: '', description: '', imageUrl: '', price: '', linkUrl: '' },
      service: { title: '', description: '', actionLabel: '', actionUrl: '' },
      gallery: { images: [] },
      video: { title: '', embedUrl: '' },
      text: { content: '' },
      newsletter: { title: '', description: '', placeholder: 'seu@email.com', buttonText: 'Assinar' },
      socials: { items: [{ platform: 'instagram', url: '' }] },
    }
    try {
      await addBlock(type, defaults[type])
      vibrate(30)
      toast.success('Bloco adicionado!')
    } catch {
      toast.error('Erro ao adicionar bloco')
    }
  }

  const handleRemoveBlock = async (id: string) => {
    try {
      await removeBlock(id)
      vibrate(30)
      toast.success('Bloco removido!')
    } catch {
      toast.error('Erro ao remover bloco')
    }
  }

  const handleSaveEdit = async (block: Block, data: any) => {
    try {
      await updateBlock(block.id, data)
      vibrate(30)
      toast.success('Bloco atualizado!')
      setEditingBlock(null)
    } catch {
      toast.error('Erro ao atualizar bloco')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[var(--color-primary)] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {headerBlock && (
        <SortableBlock
          block={headerBlock}
          onEdit={setEditingBlock}
          onRemove={handleRemoveBlock}
          isHeader
          position={0}
          total={blocks.length}
        />
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={nonHeaderBlocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {nonHeaderBlocks.map((block, index) => (
              <SortableBlock
                key={block.id}
                block={block}
                onEdit={setEditingBlock}
                onRemove={handleRemoveBlock}
                position={headerBlock ? index + 1 : index}
                total={blocks.length}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {activeBlock ? (
            <div className="flex items-center gap-2 p-3 rounded-xl border-2 border-[var(--color-primary)] bg-white shadow-xl opacity-90">
              <div className="p-1">
                <GripVertical size={18} className="text-[var(--color-primary)]" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-soft)] flex items-center justify-center">
                {(() => {
                  const Icon = TYPE_ICONS[activeBlock.type] || Link2
                  return <Icon size={16} className="text-[var(--color-primary)]" />
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {(activeBlock.data as any).title || (activeBlock.data as any).displayName || 'Bloco'}
                </p>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {blocks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-[var(--color-text-muted)]">
            Nenhum bloco ainda. Adicione o primeiro!
          </p>
        </div>
      )}

      {editingBlock && (
        <BlockEditForm
          block={editingBlock}
          onSave={(data) => handleSaveEdit(editingBlock, data)}
          onClose={() => setEditingBlock(null)}
        />
      )}

      {showAddPanel ? (
        <AddBlockPanel onSelect={handleAddBlock} onClose={() => setShowAddPanel(false)} />
      ) : (
        <button
          onClick={() => setShowAddPanel(true)}
          className="btn btn-outline btn-md w-full"
        >
          <Plus size={18} />
          Adicionar bloco
        </button>
      )}
    </div>
  )
}
