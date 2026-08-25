import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useUserProfile } from '../hooks/useUserProfile'
import { useBlocks } from '../hooks/useBlocks'
import { useNavigate } from 'react-router-dom'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Block } from '../types'
import { BlockEditor } from '../components/BlockEditor'
import { MobilePreview } from '../components/MobilePreview'

export function ProfileEdit() {
  const { user } = useAuth()
  const { profile, loading: profileLoading } = useUserProfile(user?.uid)
  const { blocks, loading: blocksLoading } = useBlocks(user?.uid)
  const [previewBlocks, setPreviewBlocks] = useState<Block[]>([])
  const navigate = useNavigate()

  // Sync blocks for preview
  useEffect(() => {
    setPreviewBlocks(blocks)
  }, [blocks])

  if (profileLoading || blocksLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-primary)] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm mb-4">← Voltar</button>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Editar Perfil</h1>
        <span className="badge badge-primary">Personalize sua página</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Editor column */}
        <div className="lg:col-span-3 space-y-6">
          {user && (
            <BlockEditor
              userId={user.uid}
              onBlocksChange={setPreviewBlocks}
            />
          )}
        </div>

        {/* Preview column */}
        <div className="lg:col-span-2">
          <MobilePreview blocks={previewBlocks} />

          {/* Public link */}
          {profile?.username && (
            <div className="mt-6 p-4 bg-[var(--color-primary-soft)] rounded-xl border border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-text-primary)] font-medium mb-2">
                🔗 Seu link público
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/${profile.username}`}
                  className="flex-1 input text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/${profile.username}`)
                    toast.success('Link copiado! 📋')
                  }}
                  className="btn btn-primary btn-md"
                >
                  <Copy size={16} />
                  Copiar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
