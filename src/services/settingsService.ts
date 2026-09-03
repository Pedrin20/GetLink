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
  try {
    const snap = await getDoc(getUserSettingsRef(userId))
    if (snap.exists()) {
      return { ...DEFAULT_PAGE_SETTINGS, ...snap.data() } as PageSettings
    }
  } catch {
    // Firestore failed, try localStorage
  }
  try {
    const cached = localStorage.getItem(`getlink-settings-${userId}`)
    if (cached) {
      return { ...DEFAULT_PAGE_SETTINGS, ...JSON.parse(cached) } as PageSettings
    }
  } catch {}
  return DEFAULT_PAGE_SETTINGS
}

export async function savePageSettings(userId: string, settings: PageSettings): Promise<void> {
  try {
    await setDoc(getUserSettingsRef(userId), settings, { merge: true })
  } catch (err: any) {
    console.error('[SettingsService] Failed to save page settings:', err?.code || err?.message || err)
    // If Firestore fails (e.g. security rules), save to localStorage as fallback
    try {
      localStorage.setItem(`getlink-settings-${userId}`, JSON.stringify(settings))
    } catch {}
    throw err
  }
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
          // No Firestore doc — try localStorage fallback
          try {
            const cached = localStorage.getItem(`getlink-settings-${userId}`)
            if (cached) {
              cb({ ...DEFAULT_PAGE_SETTINGS, ...JSON.parse(cached) } as PageSettings)
            } else {
              cb(DEFAULT_PAGE_SETTINGS)
            }
          } catch {
            cb(DEFAULT_PAGE_SETTINGS)
          }
        }
      },
      (err) => {
        console.warn('[SettingsService] onSnapshot error, trying localStorage:', err?.code || err?.message)
        try {
          const cached = localStorage.getItem(`getlink-settings-${userId}`)
          if (cached) {
            cb({ ...DEFAULT_PAGE_SETTINGS, ...JSON.parse(cached) } as PageSettings)
          } else {
            cb(DEFAULT_PAGE_SETTINGS)
          }
        } catch {
          cb(DEFAULT_PAGE_SETTINGS)
        }
      }
    )
  } catch {
    cb(DEFAULT_PAGE_SETTINGS)
    return () => {}
  }
}
