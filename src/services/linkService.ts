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
  getDocs,
  updateDoc,
  writeBatch,
  increment,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Link, LinkWithId } from '../types'

const linksCol = collection(db, 'links')

export async function createLink(link: { title: string; url: string; description?: string; userId: string }) {
  const docRef = await addDoc(linksCol, {
    ...link,
    userId: link.userId,
    createdAt: serverTimestamp(),
    clicks: 0,
    order: 0,
    isActive: true,
  })
  return docRef.id
}

export async function updateLink(id: string, data: Partial<Pick<Link, 'title' | 'url' | 'description' | 'isActive' | 'order'>>) {
  const ref = doc(db, 'links', id)
  await updateDoc(ref, data)
}

export async function incrementClick(id: string) {
  const ref = doc(db, 'links', id)
  await updateDoc(ref, {
    clicks: increment(1),
  })
}

export async function deleteLink(id: string) {
  const ref = doc(db, 'links', id)
  await deleteDoc(ref)
}

export function subscribeToUserLinks(
  userId: string,
  cb: (links: LinkWithId[]) => void
): () => void {
  const q = query(
    linksCol,
    where('userId', '==', userId),
    orderBy('order', 'asc'),
    orderBy('createdAt', 'desc')
  )

  return onSnapshot(q, (snap) => {
    const items: LinkWithId[] = snap.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title || '',
        url: data.url || '',
        userId: data.userId || '',
        description: data.description || '',
        createdAt: data.createdAt || null,
        clicks: data.clicks || 0,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      } as LinkWithId
    })
    cb(items)
  })
}

export async function reorderLinks(links: { id: string; order: number }[]) {
  const batch = writeBatch(db)
  links.forEach(({ id, order }) => {
    const ref = doc(db, 'links', id)
    batch.update(ref, { order })
  })
  await batch.commit()
}

export async function fetchUserLinks(userId: string): Promise<LinkWithId[]> {
  const q = query(
    linksCol,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  
  const snap = await getDocs(q)
  return snap.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      title: data.title || '',
      url: data.url || '',
      userId: data.userId || '',
      description: data.description || '',
      createdAt: data.createdAt || null,
      clicks: data.clicks || 0,
      order: data.order || 0,
      isActive: data.isActive ?? true,
    } as LinkWithId
  })
}