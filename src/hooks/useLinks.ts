import { useEffect, useState } from 'react'
import type { Link } from '../types'
import { createLink, deleteLink, subscribeToUserLinks } from '../services/linkService'

export function useLinksFirestore(userId?: string) {
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    if (!userId) {
      setLinks([])
      return
    }
    const unsub = subscribeToUserLinks(userId, (items) => {
      setLinks(items as Link[])
    })
    return () => unsub()
  }, [userId])

  async function add(link: Omit<Link, 'id'> & { userId: string }) {
    await createLink(link)
  }

  async function remove(id: string) {
    await deleteLink(id)
  }

  return { links, add, remove }
}