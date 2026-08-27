import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useBlocks } from '../hooks/useBlocks'
import { useUserProfile } from '../hooks/useUserProfile'
import { BlockEditor } from '../components/BlockEditor'
import { MobilePreview } from '../components/MobilePreview'
import { BlockRenderer } from '../components/blocks/BlockRenderer'
import { MainLayout } from '../layouts/MainLayout'
import { Eye, Monitor, Smartphone } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Block } from '../types'

export function MyPage() {
  const { user } = useAuth()
  const { profile, loading: profileLoading } = useUserProfile(user?.uid)
  const { blocks, loading: blocksLoading } = useBlocks(user?.uid)
  const [previewBlocks, setPreviewBlocks] = useState<Block[]>([])
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('mobile')

  if (profileLoading || blocksLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-primary)] border-t-transparent" />
        </div>
      </MainLayout>
    )
  }

  const displayBlocks = previewBlocks.length > 0 ? previewBlocks : blocks

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Minha Pagina</h1>
            {profile?.username && (
              <p className="text-[var(--color-text-muted)] text-sm">
                getlink.to/{profile.username}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode(previewMode === 'mobile' ? 'desktop' : 'mobile')}
              className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors"
              title={previewMode === 'mobile' ? 'Preview desktop' : 'Preview mobile'}
            >
              {previewMode === 'mobile' ? <Monitor size={20} /> : <Smartphone size={20} />}
            </button>
            {profile?.username && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + '/' + profile.username)
                  toast.success('Link copiado!')
                }}
                className="btn btn-primary btn-sm"
              >
                <Eye size={16} /> Previa
              </button>
            )}
          </div>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Block list + add */}
          <div className="lg:col-span-2">
            {user && (
              <BlockEditor
                userId={user.uid}
                onBlocksChange={setPreviewBlocks}
              />
            )}
          </div>

          {/* Right: Preview */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3 flex items-center gap-2">
                {previewMode === 'mobile' ? <Smartphone size={16} /> : <Monitor size={16} />}
                Previa ao vivo — arraste os blocos para reordenar
              </h4>
              {previewMode === 'mobile' ? (
                <MobilePreview blocks={displayBlocks} />
              ) : (
                <div className="rounded-2xl border border-[var(--color-border)] bg-gray-900 p-6 max-w-lg mx-auto">
                  {displayBlocks.length > 0 ? (
                    <div className="space-y-4">
                      {displayBlocks.map((block) => (
                        <div key={block.id} className="text-sm">
                          <BlockRenderer block={block} isEditing />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <p>Adicione blocos para ver a previa</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
