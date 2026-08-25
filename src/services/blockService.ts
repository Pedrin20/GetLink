import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  where,
  onSnapshot,
  updateDoc,
  writeBatch,
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Block, BlockType, BlockDataMap } from '../types'

const blocksCol = collection(db, 'blocks')

export async function createBlock<T extends BlockType>(
  userId: string,
  type: T,
  data: BlockDataMap[T],
  currentMaxOrder: number = 0
): Promise<string> {
  const docRef = await addDoc(blocksCol, {
    userId,
    type,
    data,
    order: currentMaxOrder,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateBlockData<T extends BlockType>(
  id: string,
  data: Partial<BlockDataMap[T]>
) {
  const ref = doc(db, 'blocks', id)
  await updateDoc(ref, { data })
}

export async function deleteBlock(id: string) {
  const ref = doc(db, 'blocks', id)
  await deleteDoc(ref)
}

export async function reorderBlocks(updates: { id: string; order: number }[]) {
  const batch = writeBatch(db)
  updates.forEach(({ id, order }) => {
    const ref = doc(db, 'blocks', id)
    batch.update(ref, { order })
  })
  await batch.commit()
}

export function subscribeToUserBlocks(
  userId: string,
  cb: (blocks: Block[]) => void
): () => void {
  const q = query(
    blocksCol,
    where('userId', '==', userId),
    orderBy('order', 'asc')
  )

  return onSnapshot(q, (snap) => {
    const items: Block[] = snap.docs.map((d) => {
      const data = d.data()
      return {
        id: d.id,
        type: data.type as BlockType,
        order: data.order ?? 0,
        userId: data.userId || '',
        data: data.data || {},
      } as Block
    })
    cb(items)
  })
}

export async function fetchUserBlocks(userId: string): Promise<Block[]> {
  const q = query(
    blocksCol,
    where('userId', '==', userId),
    orderBy('order', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => {
    const data = d.data()
    return {
      id: d.id,
      type: data.type as BlockType,
      order: data.order ?? 0,
      userId: data.userId || '',
      data: data.data || {},
    } as Block
  })
}

const MIGRATION_KEY = 'getlink-links-migrated'

export function hasMigratedLinks(userId: string): boolean {
  try {
    return localStorage.getItem(`${MIGRATION_KEY}-${userId}`) === 'done'
  } catch {
    return false
  }
}

export async function migrateLinksToBlocks(userId: string): Promise<number> {
  if (hasMigratedLinks(userId)) return 0

  const existingBlocks = await fetchUserBlocks(userId)
  if (existingBlocks.length > 0) {
    markMigrated(userId)
    return 0
  }

  const linksQuery = query(
    collection(db, 'links'),
    where('userId', '==', userId),
    orderBy('order', 'asc')
  )
  const linksSnap = await getDocs(linksQuery)

  if (linksSnap.empty) {
    markMigrated(userId)
    return 0
  }

  const batch = writeBatch(db)
  let order = 0

  linksSnap.docs.forEach((linkDoc) => {
    const linkData = linkDoc.data()
    const blockRef = doc(collection(db, 'blocks'))
    batch.set(blockRef, {
      userId,
      type: 'link',
      data: {
        title: linkData.title || '',
        url: linkData.url || '',
        description: linkData.description || '',
      },
      order: order++,
      createdAt: serverTimestamp(),
      _migratedFrom: linkDoc.id,
    })
  })

  await batch.commit()
  markMigrated(userId)
  return linksSnap.docs.length
}

function markMigrated(userId: string) {
  try {
    localStorage.setItem(`${MIGRATION_KEY}-${userId}`, 'done')
  } catch {
    // ignore
  }
}
