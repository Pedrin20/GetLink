// src/types.ts
export interface Link {
  id: string
  title: string
  url: string
  description?: string
  userId: string
  createdAt?: any
}

export type LinkInput = Omit<Link, 'id' | 'createdAt'>