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
import type { Link } from '../types'

const linksCol = collection(db, 'links')

export async function createLink(link: Omit<Link, 'id'> & { userId: string }) {
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

export function subscribeToUserLinks(userId: string, cb: (links: any[]) => void) {
  const q = query(linksCol, where('userId', '==', userId), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    cb(items)
  })
}

export async function fetchUserLinks(userId: string) {
  const q = query(linksCol, where('userId', '==', userId), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}