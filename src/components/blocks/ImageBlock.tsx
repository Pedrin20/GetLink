import type { ImageBlockData } from '../../types'

export function ImageBlock({ data }: { data: ImageBlockData }) {
  if (!data.imageUrl) {
    return (
      <div className="rounded-xl p-6 border shadow-md text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>Adicione uma imagem</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden border shadow-md public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <img src={data.imageUrl} alt={data.caption || 'Imagem'} className="w-full object-cover max-h-[500px]" />
      {data.caption && (
        <div className="px-5 py-3">
          <p className="text-sm text-center" style={{ color: 'var(--block-text-secondary)' }}>{data.caption}</p>
        </div>
      )}
    </div>
  )
}
