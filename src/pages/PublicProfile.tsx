import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useUserProfile } from '../hooks/useUserProfile'
import { fetchUserBlocks, fetchPageSettings } from '../services/blockService'
import type { Block, PageSettings } from '../types'
import { DEFAULT_PAGE_SETTINGS } from '../types'
import { BlockRenderer } from '../components/blocks/BlockRenderer'

function getBlockVars(accentColor: string) {
  return {
    className: 'public-blocks-dark',
    vars: {
      '--profile-accent': accentColor,
      '--block-bg': 'rgba(255,255,255,0.08)',
      '--block-border': 'rgba(255,255,255,0.12)',
      '--block-text': 'rgba(255,255,255,0.95)',
      '--block-text-secondary': 'rgba(255,255,255,0.7)',
      '--block-text-muted': 'rgba(255,255,255,0.45)',
    } as React.CSSProperties,
  }
}

export function PublicProfile() {
  const { username } = useParams<{ username: string }>()
  const { profile, loading: profileLoading, error } = useUserProfile(undefined, username)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [pageSettings, setPageSettings] = useState<PageSettings>(DEFAULT_PAGE_SETTINGS)
  const [blocksLoading, setBlocksLoading] = useState(true)

  useEffect(() => {
    if (!profile?.id) return
    setBlocksLoading(true)
    Promise.all([
      fetchUserBlocks(profile.id),
      fetchPageSettings(profile.id),
    ]).then(([blocksData, settings]) => {
      setBlocks(blocksData)
      setPageSettings(settings)
      setBlocksLoading(false)
    }).catch(() => setBlocksLoading(false))
  }, [profile?.id])

  if (profileLoading || blocksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        <div className="text-center">
          <p className="text-2xl mb-2">:(</p>
          <p>Perfil nao encontrado</p>
        </div>
      </div>
    )
  }

  const siteUrl = window.location.origin
  const profileUrl = `${siteUrl}/${profile.username}`
  const headerBlock = blocks.find((b) => b.type === 'header')
  const headerData = headerBlock?.data as any
  const title = headerData?.displayName
    ? `${headerData.displayName} | GetLink`
    : `${profile.displayName} | GetLink`
  const description = headerData?.bio || profile.bio || `${profile.displayName} esta no GetLink!`
  const imageUrl = headerData?.avatarUrl || profile.avatarUrl || `${siteUrl}/default-og-image.png`
  const accentColor = pageSettings.accentColor
  const blockTheme = useMemo(() => getBlockVars(accentColor), [accentColor])

  // Build grid layout: header spans full width, other blocks in 2 columns
  const headerBlocks = blocks.filter(b => b.type === 'header')
  const otherBlocks = blocks.filter(b => b.type !== 'header')

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
        className={`min-h-screen py-10 px-4 transition-colors duration-300 bg-gray-900 ${blockTheme.className}`}
        style={blockTheme.vars}
      >
        <div className="max-w-2xl mx-auto space-y-4">
          {blocks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-400">Nenhum conteudo disponivel.</p>
            </div>
          ) : (
            <>
              {/* Header block - full width */}
              {headerBlocks.map(block => (
                <div key={block.id}>
                  <BlockRenderer block={block} />
                </div>
              ))}

              {/* Other blocks - grid layout */}
              <div className="grid grid-cols-2 gap-4">
                {otherBlocks.map((block) => (
                  <div
                    key={block.id}
                    className={block.type === 'product' || block.type === 'gallery' || block.type === 'video' || block.type === 'newsletter' || block.type === 'text' ? 'col-span-2' : ''}
                  >
                    <BlockRenderer block={block} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Footer */}
          <div className="text-center pt-8 pb-4">
            <p className="text-xs text-gray-500">Feito com GetLink</p>
          </div>
        </div>
      </div>
    </>
  )
}
