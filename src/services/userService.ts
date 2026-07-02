import { doc, setDoc, getDoc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import type { UserProfile } from '../types';

export async function createUserProfile(uid: string, username: string, displayName?: string) {
  await setDoc(doc(db, 'users', uid), {
    username,
    displayName: displayName || username,
    bio: '',
    avatarUrl: '',
    themeColor: '#B85C38',
    createdAt: new Date(),
  });
}

export async function getUserProfileByUid(uid: string) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } as UserProfile : null;
}

export async function getUserProfileByUsername(username: string) {
  const q = query(collection(db, 'users'), where('username', '==', username));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as UserProfile;
}

export async function updateUserProfile(uid: string, data: Partial<Omit<UserProfile, 'id' | 'username' | 'createdAt'>>) {
  await updateDoc(doc(db, 'users', uid), data);
}