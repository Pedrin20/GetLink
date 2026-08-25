import { useEffect, useState } from 'react'
import type { Link } from '../types'
import { createLink, deleteLink, subscribeToUserLinks, updateLink as updateLinkService } from '../services/linkService'

export function useLinks(userId?: string) {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLinks([])
      setLoading(false)
      return
    }

    setLoading(true)
    const unsub = subscribeToUserLinks(userId, (items) => {
      setLinks(items)
      setLoading(false)
    })

    return () => unsub()
  }, [userId])

  async function addLink(link: { title: string; url: string; description: string; userId: string }) {
    await createLink(link)
  }

  async function removeLink(id: string) {
    await deleteLink(id)
  }

  async function updateLink(id: string, data: Partial<Omit<Link, 'id' | 'userId' | 'createdAt'>>) {
    await updateLinkService(id, data)
  }

  return { links, loading, addLink, removeLink, updateLink }
}