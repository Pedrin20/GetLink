import type { GalleryBlockData } from '../../types'

export function GalleryBlock({ data }: { data: GalleryBlockData; isEditing?: boolean }) {
  const images = data.images || []

  if (images.length === 0) {
    return (
      <div className="rounded-2xl p-6 text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>Adicione imagens à galeria</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <div className={`grid gap-1 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
        {images.slice(0, 4).map((img, i) => (
          <div key={i} className="relative overflow-hidden">
            <img
              src={img.url}
              alt={img.caption || `Imagem ${i + 1}`}
              className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
