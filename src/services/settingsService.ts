import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { PageSettings } from '../types'
import { DEFAULT_PAGE_SETTINGS } from '../types'

const SETTINGS_COLLECTION = 'pageSettings'

function getUserSettingsRef(userId: string) {
  return doc(db, SETTINGS_COLLECTION, userId)
}

export async function getPageSettings(userId: string): Promise<PageSettings> {
  const snap = await getDoc(getUserSettingsRef(userId))
  if (snap.exists()) {
    return { ...DEFAULT_PAGE_SETTINGS, ...snap.data() } as PageSettings
  }
  return DEFAULT_PAGE_SETTINGS
}

export async function savePageSettings(userId: string, settings: PageSettings): Promise<void> {
  await setDoc(getUserSettingsRef(userId), settings, { merge: true })
}

export function subscribeToPageSettings(
  userId: string,
  cb: (settings: PageSettings) => void
): () => void {
  try {
    return onSnapshot(
      getUserSettingsRef(userId),
      (snap) => {
        if (snap.exists()) {
          cb({ ...DEFAULT_PAGE_SETTINGS, ...snap.data() } as PageSettings)
        } else {
          cb(DEFAULT_PAGE_SETTINGS)
        }
      },
      () => {
        // On permission error or any error, return defaults
        cb(DEFAULT_PAGE_SETTINGS)
      }
    )
  } catch {
    cb(DEFAULT_PAGE_SETTINGS)
    return () => {}
  }
}
