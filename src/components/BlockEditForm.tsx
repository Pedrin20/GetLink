import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import type { Block } from '../types'
import { ImageUpload } from './ImageUpload'

type BlockEditFormProps = {
  block: Block
  onSave: (data: any) => void
  onClose: () => void
}

export function BlockEditForm({ block, onSave, onClose }: BlockEditFormProps) {
  const [data, setData] = useState(() => {
    const d = block.data as any
    switch (block.type) {
      case 'profile':
        return { displayName: d.displayName || '', bio: d.bio || '', avatarUrl: d.avatarUrl || '', themeColor: d.themeColor || '#F97316' }
      case 'link':
        return { title: d.title || '', url: d.url || '', description: d.description || '' }
      case 'link-featured':
        return { title: d.title || '', url: d.url || '', description: d.description || '', imageUrl: d.imageUrl || '' }
      case 'socials':
        return { items: d.items?.length ? [...d.items] : [{ platform: 'github', url: '' }] }
      case 'project':
        return { title: d.title || '', description: d.description || '', imageUrl: d.imageUrl || '', linkUrl: d.linkUrl || '' }
      case 'image':
        return { imageUrl: d.imageUrl || '', caption: d.caption || '' }
      default:
        return { ...d }
    }
  })

  const update = (field: string, value: any) => setData((prev: Record<string, any>) => ({ ...prev, [field]: value }))
  const SOCIAL_PLATFORMS = ['github', 'twitter', 'instagram', 'linkedin', 'youtube', 'website']

  return (
    <div className="card p-5 animate-slide-up border-[var(--color-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Editar bloco: <span className="text-[var(--color-primary)] capitalize">{block.type}</span>
        </h3>
        <button onClick={onClose} className="btn btn-ghost btn-sm p-1.5"><X size={16} /></button>
      </div>
      <div className="space-y-4">
        {block.type === 'profile' && (<>
          <div><label className="label">Nome</label><input className="input" value={data.displayName} onChange={(e) => update('displayName', e.target.value)} placeholder="Seu nome" /></div>
          <div><label className="label">Bio</label><textarea className="input min-h-[80px] resize-y" value={data.bio} onChange={(e) => update('bio', e.target.value)} placeholder="Sua biografia..." rows={2} /></div>
          <ImageUpload value={data.avatarUrl} onChange={(url) => update('avatarUrl', url)} label="Foto de perfil" />
          <div><label className="label">Cor do tema</label><div className="flex items-center gap-2"><input type="color" value={data.themeColor} onChange={(e) => update('themeColor', e.target.value)} className="w-10 h-10 rounded-full border-0 cursor-pointer p-0" /><span className="text-sm text-[var(--color-text-muted)]">{data.themeColor}</span></div></div>
        </>)}
        {block.type === 'link' && (<>
          <div><label className="label">Titulo</label><input className="input" value={data.title} onChange={(e) => update('title', e.target.value)} placeholder="Meu Link" /></div>
          <div><label className="label">URL</label><input className="input" value={data.url} onChange={(e) => update('url', e.target.value)} placeholder="https://..." /></div>
          <div><label className="label">Descricao</label><input className="input" value={data.description} onChange={(e) => update('description', e.target.value)} placeholder="Descricao (opcional)" /></div>
        </>)}
        {block.type === 'link-featured' && (<>
          <div><label className="label">Titulo</label><input className="input" value={data.title} onChange={(e) => update('title', e.target.value)} placeholder="Titulo do destaque" /></div>
          <div><label className="label">URL</label><input className="input" value={data.url} onChange={(e) => update('url', e.target.value)} placeholder="https://..." /></div>
          <div><label className="label">Descricao</label><textarea className="input min-h-[60px] resize-y" value={data.description} onChange={(e) => update('description', e.target.value)} placeholder="Descricao..." rows={2} /></div>
          <ImageUpload value={data.imageUrl} onChange={(url) => update('imageUrl', url)} label="Imagem do destaque" />
        </>)}
        {block.type === 'socials' && (
          <div className="space-y-3">
            <label className="label">Redes sociais</label>
            {data.items.map((item: { platform: string; url: string }, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <select className="input w-32" value={item.platform} onChange={(e) => { const n = [...data.items]; n[i] = { ...n[i], platform: e.target.value }; update('items', n) }}>
                  {SOCIAL_PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <input className="input flex-1" value={item.url} onChange={(e) => { const n = [...data.items]; n[i] = { ...n[i], url: e.target.value }; update('items', n) }} placeholder="https://..." />
                {data.items.length > 1 && <button type="button" onClick={() => update('items', data.items.filter((_: any, j: number) => j !== i))} className="btn btn-ghost btn-sm p-1.5 hover:text-[var(--color-error)]"><Trash2 size={14} /></button>}
              </div>
            ))}
            <button type="button" onClick={() => update('items', [...data.items, { platform: 'website', url: '' }])} className="btn btn-ghost btn-sm text-[var(--color-primary)]"><Plus size={14} /> Adicionar rede</button>
          </div>
        )}
        {block.type === 'project' && (<>
          <div><label className="label">Titulo</label><input className="input" value={data.title} onChange={(e) => update('title', e.target.value)} placeholder="Nome do projeto" /></div>
          <div><label className="label">Descricao</label><textarea className="input min-h-[60px] resize-y" value={data.description} onChange={(e) => update('description', e.target.value)} placeholder="Descreva seu projeto..." rows={2} /></div>
          <ImageUpload value={data.imageUrl} onChange={(url) => update('imageUrl', url)} label="Imagem do projeto" />
          <div><label className="label">Link do projeto</label><input className="input" value={data.linkUrl} onChange={(e) => update('linkUrl', e.target.value)} placeholder="https://..." /></div>
        </>)}
        {block.type === 'image' && (<>
          <ImageUpload value={data.imageUrl} onChange={(url) => update('imageUrl', url)} label="Imagem" />
          <div><label className="label">Legenda</label><input className="input" value={data.caption} onChange={(e) => update('caption', e.target.value)} placeholder="Legenda (opcional)" /></div>
        </>)}
      </div>
      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className="btn btn-secondary btn-md flex-1">Cancelar</button>
        <button onClick={() => onSave(data)} className="btn btn-primary btn-md flex-1">Salvar</button>
      </div>
    </div>
  )
}
