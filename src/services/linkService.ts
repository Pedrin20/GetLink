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
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Link, LinkWithId } from '../types'

const linksCol = collection(db, 'links')

export async function createLink(link: Omit<Link, 'createdAt'> & { userId: string }) {
  const docRef = await addDoc(linksCol, {
    ...link,
    userId: link.userId,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateLink(id: string, data: Partial<Link>) {
  const ref = doc(db, 'links', id)
  await updateDoc(ref, data)
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
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, (snap) => {
    const items: LinkWithId[] = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as LinkWithId[]
    cb(items)
  })
}

export async function fetchUserLinks(userId: string): Promise<LinkWithId[]> {
  const q = query(
    linksCol,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as LinkWithId[]
}