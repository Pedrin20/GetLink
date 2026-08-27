import { useEffect, useState, useCallback } from 'react'
import type { Block, BlockType, BlockDataMap, PageSettings } from '../types'
import {
  createBlock,
  deleteBlock,
  subscribeToUserBlocks,
  updateBlockData,
  reorderBlocks as reorderBlocksService,
} from '../services/blockService'
import {
  subscribeToPageSettings,
  savePageSettings as savePageSettingsService,
} from '../services/settingsService'

export function useBlocks(userId?: string) {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setBlocks([])
      setLoading(false)
      return
    }

    setLoading(true)
    const unsub = subscribeToUserBlocks(userId, (items) => {
      setBlocks(items)
      setLoading(false)
    })

    return () => unsub()
  }, [userId])

  const addBlock = useCallback(async <T extends BlockType>(type: T, data: BlockDataMap[T]) => {
    if (!userId) return
    const maxOrder = blocks.reduce((max, b) => Math.max(max, b.order), -1)
    await createBlock(userId, type, data, maxOrder + 1)
  }, [userId, blocks])

  const removeBlock = useCallback(async (id: string) => {
    await deleteBlock(id)
  }, [])

  const updateBlock = useCallback(async <T extends BlockType>(id: string, data: Partial<BlockDataMap[T]>) => {
    await updateBlockData(id, data)
  }, [])

  const reorder = useCallback(async (newBlocks: Block[]) => {
    setBlocks(newBlocks)
    const updates = newBlocks.map((b, i) => ({ id: b.id, order: i }))
    await reorderBlocksService(updates)
  }, [])

  return { blocks, loading, addBlock, removeBlock, updateBlock, reorder }
}

export function usePageSettings(userId?: string) {
  const [settings, setSettings] = useState<PageSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setSettings(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const unsub = subscribeToPageSettings(userId, (s) => {
      setSettings(s)
      setLoading(false)
    })

    return () => unsub()
  }, [userId])

  const saveSettings = useCallback(async (newSettings: PageSettings) => {
    if (!userId) return
    await savePageSettingsService(userId, newSettings)
  }, [userId])

  return { settings, loading, saveSettings }
}
