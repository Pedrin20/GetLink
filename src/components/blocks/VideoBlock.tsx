import type { VideoBlockData } from '../../types'

export function VideoBlock({ data }: { data: VideoBlockData; isEditing?: boolean }) {
  if (!data.embedUrl) {
    return (
      <div className="rounded-2xl p-6 text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>Adicione um vídeo</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      {data.title && (
        <div className="px-5 pt-4">
          <h3 className="text-lg font-bold" style={{ color: 'var(--block-text)' }}>{data.title}</h3>
        </div>
      )}
      <div className="aspect-video">
        <iframe
          src={data.embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={data.title || 'Vídeo'}
        />
      </div>
    </div>
  )
}
