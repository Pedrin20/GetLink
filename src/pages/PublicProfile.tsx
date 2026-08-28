import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useUserProfile } from '../hooks/useUserProfile'
import { fetchUserBlocks, fetchPageSettings } from '../services/blockService'
import type { Block, PageSettings } from '../types'
import { DEFAULT_PAGE_SETTINGS } from '../types'
import { PublicProfile as PublicProfileComponent } from '../components/public/PublicProfile'

const FONT_MAP: Record<string, string> = {
  grotesk: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
  sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
  serifada: "Georgia, 'Times New Roman', serif",
  mono: "ui-monospace, 'SF Mono', monospace",
}

const RADIUS_MAP: Record<string, string> = {
  sharp: '0rem',
  soft: '0.5rem',
  medium: '1.1rem',
  round: '1.6rem',
}

const PRESET_VARS: Record<string, Record<string, string>> = {
  neon: {
    bg: 'linear-gradient(160deg, #1a1533 0%, #14111f 55%, #0f0d18 100%)',
    surface: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.12)',
    text: '#f5f3ff',
    muted: 'rgba(245,243,255,0.6)',
    accentText: '#ffffff',
  },
  editorial: {
    bg: '#f7f4ee',
    surface: '#fffdf9',
    border: '#e4ddcf',
    text: '#1c1a17',
    muted: '#6b6459',
    accentText: '#fffdf9',
  },
  'minimal-mono': {
    bg: '#ffffff',
    surface: '#ffffff',
    border: '#e2e2e2',
    text: '#111111',
    muted: '#7a7a7a',
    accentText: '#ffffff',
  },
  sunset: {
    bg: 'linear-gradient(165deg, #ff8a3d 0%, #ff5e7e 55%, #b5468f 100%)',
    surface: 'rgba(255,255,255,0.16)',
    border: 'rgba(255,255,255,0.28)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.82)',
    accentText: '#c0396f',
  },
  brutalist: {
    bg: '#ffdd33',
    surface: '#ffffff',
    border: '#111111',
    text: '#111111',
    muted: '#444444',
    accentText: '#ffdd33',
  },
}

export function PublicProfile() {
  const { username } = useParams<{ username: string }>()
  const { profile, loading: profileLoading, error } = useUserProfile(undefined, username)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [pageSettings, setPageSettings] = useState<PageSettings>(DEFAULT_PAGE_SETTINGS)
  const [blocksLoading, setBlocksLoading] = useState(false)

  useEffect(() => {
    if (!profile?.id) {
      setBlocksLoading(false)
      return
    }
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0d18' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400" style={{ background: '#0f0d18' }}>
        <div className="text-center">
          <p className="text-2xl mb-2">:(</p>
          <p>Perfil não encontrado</p>
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
  const description = headerData?.bio || profile.bio || `${profile.displayName} está no GetLink!`
  const imageUrl = headerData?.avatarUrl || profile.avatarUrl || `${siteUrl}/default-og-image.png`

  const presetVars = PRESET_VARS[pageSettings.preset] || PRESET_VARS.neon
  const themeVars = {
    ...presetVars,
    accent: pageSettings.accentColor,
    fontDisplay: FONT_MAP[pageSettings.titleFont] || FONT_MAP.grotesk,
  }

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

      <PublicProfileComponent
        blocks={blocks}
        theme={{
          vars: themeVars,
          blockStyle: pageSettings.blockStyle,
          density: pageSettings.density,
          radius: RADIUS_MAP[pageSettings.corners] || RADIUS_MAP.medium,
          fontDisplay: FONT_MAP[pageSettings.titleFont] || FONT_MAP.grotesk,
        }}
      />
    </>
  )
}
