import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export interface Profile {
  uid: string
  displayName: string
  bio: string
  photoURL?: string
  themeColor?: string
  username?: string
}

export async function getProfile(uid: string): Promise<Profile | null> {
  const ref = doc(db, 'profiles', uid)
  const snap = await getDoc(ref)
  return snap.exists() ? (snap.data() as Profile) : null
}

export async function updateProfile(uid: string, data: Partial<Profile>) {
  const ref = doc(db, 'profiles', uid)
  await setDoc(ref, data, { merge: true })
}