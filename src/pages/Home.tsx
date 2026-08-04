import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLinks } from '../hooks/useLinks'
import { useUserProfile } from '../hooks/useUserProfile'
import { LinkForm } from '../components/LinkForm'
import { LinkList } from '../components/LinkList'
import { LinkEditModal } from '../components/LinkEditModal'
import { QRCodeModal } from '../components/QRCodeModal'
import type { Link } from '../types'
import { useNavigate } from 'react-router-dom'
import { reorderLinks } from '../services/linkService'

export function Home() {
  const { user } = useAuth()
  const { links, loading, addLink, removeLink, updateLink } = useLinks(user?.uid)
  const { profile: currentProfile, loading: profileLoading } = useUserProfile(user?.uid)
  const [showAddForm, setShowAddForm] = useState(false)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const navigate = useNavigate()

  if (profileLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent" />
      </div>
    )
  }

  const handleViewProfile = () => {
    if (currentProfile?.username) {
      navigate('/' + currentProfile.username)
    } else {
      navigate('/profile/edit')
    }
  }

  const handleShare = () => {
    if (!currentProfile?.username) {
      navigate('/profile/edit')
      return
    }
    setIsQRModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent" />
      </div>
    )
  }

  const handleReorder = async (newLinks: Link[]) => {
    const updates = newLinks.map((link, index) => ({
      id: link.id,
      order: index,
    }))
    await reorderLinks(updates)
  }

  const handleEditLink = (link: Link) => {
    setEditingLink(link)
  }

  const handleSaveEdit = async (updatedLink: Partial<Link>) => {
    if (editingLink) {
      await updateLink(editingLink.id, updatedLink)
      setEditingLink(null)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <button
                onClick={() => navigate('/profile/edit')}
                className="text-sm text-[var(--color-accent)] hover:underline"
              >
                 Editar perfil
              </button>
              <button
                onClick={handleViewProfile}
                className="text-sm text-[var(--color-accent)] hover:underline"
              >
                 Ver perfil público
              </button>
            </div>
            <h1 className="text-3xl font-serif text-[var(--color-ink)]">
              Seus Links
            </h1>
            <p className="text-[var(--color-muted)] text-sm">
              {links.length} {links.length === 1 ? 'link' : 'links'} cadastrados
            </p>
          </div>

          <div className="flex gap-2">
            {currentProfile?.username && (
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] text-[var(--color-ink)] font-medium rounded-xl hover:bg-[var(--color-accent-light)] transition"
              >
                <span>🔗</span> Compartilhar
              </button>
            )}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition"
            >
              <span>+</span> Novo Link
            </button>
          </div>
        </div>
      </div>

      <LinkList
        links={links}
        onRemove={removeLink}
        onEdit={handleEditLink}
        onReorder={handleReorder}
      />

      {editingLink && (
        <LinkEditModal
          link={editingLink}
          onSave={handleSaveEdit}
          onClose={() => setEditingLink(null)}
        />
      )}

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        url={`${window.location.origin}/${currentProfile?.username || ''}`}
        username={currentProfile?.username || ''}
      />
    </>
  )
}