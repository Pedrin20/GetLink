import type { Timestamp } from "firebase/firestore"

export type Link = {
  id: string
  title: string
  url: string
  description: string
  userId?:string
  createdAt?: Timestamp
}

export type LinkWithId = Link & { id: string }