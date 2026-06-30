import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProfile } from '../services/profileService'
import { subscribeToUserLinks } from '../services/linkService'
import type { Link } from '../types'

export function PublicProfile() {
  const { userId } = useParams<{ userId: string }>()
  const [profile, setProfile] = useState<any>(null)
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    getProfile(userId).then((data) => {
      setProfile(data)
    })
    const unsub = subscribeToUserLinks(userId, (items) => {
      setLinks(items)
      setLoading(false)
    })
    return () => unsub()
  }, [userId])

  if (loading) return <div>Carregando...</div>
  if (!profile) return <div>Perfil não encontrado</div>

  return (
    <div className="min-h-screen bg-[var(--color-paper)] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        {profile.photoURL && (
          <img src={profile.photoURL} alt={profile.displayName} className="w-24 h-24 rounded-full mx-auto" />
        )}
        <h1 className="text-3xl font-serif">{profile.displayName}</h1>
        <p className="text-[var(--color-muted)]">{profile.bio}</p>
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white rounded-xl border border-[var(--color-border)] p-4 hover:shadow-md transition"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}