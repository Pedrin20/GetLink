import type { YouTubeBlockData } from '../../types'

function extractYouTubeId(url: string): string | null {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

export function YouTubeBlock({ data }: { data: YouTubeBlockData; isEditing?: boolean }) {
  const videoId = extractYouTubeId(data.videoUrl)

  if (!videoId) {
    return (
      <div className="rounded-2xl p-6 text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>
          Cole o link de um vídeo do YouTube
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      {data.title && (
        <div className="px-5 pt-4">
          <h3 className="text-lg font-bold" style={{ color: 'var(--block-text)' }}>
            {data.title}
          </h3>
        </div>
      )}
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={data.title || 'Vídeo do YouTube'}
        />
      </div>
    </div>
  )
}
