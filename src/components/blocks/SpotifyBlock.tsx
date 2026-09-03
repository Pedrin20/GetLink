import type { SpotifyBlockData } from '../../types'

function extractSpotifyId(uriOrUrl: string): string | null {
  if (!uriOrUrl) return null
  // Handle spotify:track:xxx format
  const uriMatch = uriOrUrl.match(/spotify:(track|playlist|album):([a-zA-Z0-9]+)/)
  if (uriMatch) return `${uriMatch[1]}/${uriMatch[2]}`
  // Handle https://open.spotify.com/track/xxx format
  const urlMatch = uriOrUrl.match(/open\.spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/)
  if (urlMatch) return `${urlMatch[1]}/${urlMatch[2]}`
  return null
}

export function SpotifyBlock({ data }: { data: SpotifyBlockData; isEditing?: boolean }) {
  const embedId = extractSpotifyId(data.uri)

  if (!embedId) {
    return (
      <div className="rounded-2xl p-6 text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>
          Cole o link de uma música ou playlist do Spotify
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <iframe
        src={`https://open.spotify.com/embed/${embedId}?utm_source=generator&theme=0`}
        width="100%"
        height={data.variant === 'track' ? '80' : '152'}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: '1rem' }}
        title="Spotify embed"
      />
    </div>
  )
}
