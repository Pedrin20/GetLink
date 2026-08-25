import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useUserProfile } from '../hooks/useUserProfile'
import { fetchUserBlocks } from '../services/blockService'
import type { Block } from '../types'
import { BlockRenderer } from '../components/blocks/BlockRenderer'

/** Returns perceived brightness (0–255) of a hex color */
function luminance(hex: string): number {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function getBlockVars(themeColor: string) {
  const isDark = luminance(themeColor) < 140
  if (isDark) {
    return {
      className: 'public-blocks-dark',
      vars: {
        '--profile-accent': themeColor,
        '--block-bg': 'rgba(255,255,255,0.08)',
        '--block-border': 'rgba(255,255,255,0.12)',
        '--block-text': 'rgba(255,255,255,0.95)',
        '--block-text-secondary': 'rgba(255,255,255,0.7)',
        '--block-text-muted': 'rgba(255,255,255,0.45)',
      } as React.CSSProperties,
    }
  }
  return {
    className: 'public-blocks-light',
    vars: {
      '--profile-accent': themeColor,
      '--block-bg': 'rgba(255,255,255,0.92)',
      '--block-border': 'rgba(0,0,0,0.06)',
      '--block-text': '#1a1a1a',
      '--block-text-secondary': '#555555',
      '--block-text-muted': '#888888',
    } as React.CSSProperties,
  }
}

export function PublicProfile() {
  const { username } = useParams<{ username: string }>()
  const { profile, loading: profileLoading, error } = useUserProfile(undefined, username)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [blocksLoading, setBlocksLoading] = useState(true)

  useEffect(() => {
    if (!profile?.id) return
    setBlocksLoading(true)
    fetchUserBlocks(profile.id).then((items) => {
      setBlocks(items)
      setBlocksLoading(false)
    }).catch(() => setBlocksLoading(false))
  }, [profile?.id])

  if (profileLoading || blocksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-primary)] border-t-transparent" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] text-[var(--color-text-muted)]">
        <div className="text-center">
          <p className="text-2xl mb-2">😕</p>
          <p>Perfil não encontrado</p>
        </div>
      </div>
    )
  }

  const siteUrl = window.location.origin
  const profileUrl = `${siteUrl}/${profile.username}`
  const profileBlock = blocks.find((b) => b.type === 'profile')
  const profileData = profileBlock?.data as any
  const title = profileData?.displayName
    ? `${profileData.displayName} | GetLink`
    : `${profile.displayName} | GetLink`
  const description = profileData?.bio || profile.bio || `${profile.displayName} está no GetLink!`
  const imageUrl = profileData?.avatarUrl || profile.avatarUrl || `${siteUrl}/default-og-image.png`
  const themeColor = profileData?.themeColor || profile.themeColor || '#F97316'
  const blockTheme = useMemo(() => getBlockVars(themeColor), [themeColor])

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={profileUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={profileUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <link rel="canonical" href={profileUrl} />
      </Helmet>

      <div
        className={`min-h-screen py-10 px-4 transition-colors duration-300 ${blockTheme.className}`}
        style={{ backgroundColor: themeColor, ...blockTheme.vars }}
      >
        <div className="max-w-lg mx-auto space-y-4">
          {blocks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>Nenhum conteúdo disponível.</p>
            </div>
          ) : (
            blocks.map((block) => (
              <div key={block.id}>
                <BlockRenderer block={block} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
