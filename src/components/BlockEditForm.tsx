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
      case 'header':
        return { displayName: d.displayName || '', bio: d.bio || '', avatarUrl: d.avatarUrl || '' }
      case 'link':
        return { title: d.title || '', url: d.url || '', description: d.description || '' }
      case 'product':
        return { title: d.title || '', description: d.description || '', imageUrl: d.imageUrl || '', price: d.price || '', linkUrl: d.linkUrl || '' }
      case 'service':
        return { title: d.title || '', description: d.description || '', actionLabel: d.actionLabel || '', actionUrl: d.actionUrl || '' }
      case 'gallery':
        return { images: d.images?.length ? [...d.images] : [] }
      case 'video':
        return { title: d.title || '', embedUrl: d.embedUrl || '' }
      case 'text':
        return { content: d.content || '' }
      case 'newsletter':
        return { title: d.title || '', description: d.description || '', placeholder: d.placeholder || 'seu@email.com', buttonText: d.buttonText || 'Assinar' }
      case 'socials':
        return { items: d.items?.length ? [...d.items] : [{ platform: 'instagram', url: '' }] }
      default:
        return { ...d }
    }
  })

  const update = (field: string, value: any) => setData((prev: Record<string, any>) => ({ ...prev, [field]: value }))
  const SOCIAL_PLATFORMS = ['instagram', 'twitter', 'github', 'linkedin', 'youtube', 'tiktok', 'spotify', 'website']

  return (
    <div className="card p-5 animate-slide-up border-[var(--color-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Editar: <span className="text-[var(--color-primary)]">{block.type}</span>
        </h3>
        <button onClick={onClose} className="btn btn-ghost btn-sm p-1.5"><X size={16} /></button>
      </div>
      <div className="space-y-4">
        {/* HEADER */}
        {block.type === 'header' && (
          <>
            <div><label className="label">Nome</label><input className="input" value={data.displayName} onChange={(e) => update('displayName', e.target.value)} placeholder="Seu nome" /></div>
            <div><label className="label">Bio</label><textarea className="input min-h-[80px] resize-y" value={data.bio} onChange={(e) => update('bio', e.target.value)} placeholder="Sua biografia..." rows={2} /></div>
            <ImageUpload value={data.avatarUrl} onChange={(url) => update('avatarUrl', url)} label="Foto de perfil" />
          </>
        )}

        {/* LINK */}
        {block.type === 'link' && (
          <>
            <div><label className="label">Titulo</label><input className="input" value={data.title} onChange={(e) => update('title', e.target.value)} placeholder="Meu Link" /></div>
            <div><label className="label">URL</label><input className="input" value={data.url} onChange={(e) => update('url', e.target.value)} placeholder="https://..." /></div>
            <div><label className="label">Descricao</label><input className="input" value={data.description} onChange={(e) => update('description', e.target.value)} placeholder="Descricao (opcional)" /></div>
          </>
        )}

        {/* PRODUCT */}
        {block.type === 'product' && (
          <>
            <div><label className="label">Titulo</label><input className="input" value={data.title} onChange={(e) => update('title', e.target.value)} placeholder="Nome do produto" /></div>
            <div><label className="label">Descricao</label><textarea className="input min-h-[60px] resize-y" value={data.description} onChange={(e) => update('description', e.target.value)} placeholder="Descreva seu produto..." rows={2} /></div>
            <ImageUpload value={data.imageUrl} onChange={(url) => update('imageUrl', url)} label="Imagem do produto" />
            <div><label className="label">Preco</label><input className="input" value={data.price} onChange={(e) => update('price', e.target.value)} placeholder="Ex: 297" /></div>
            <div><label className="label">Link de compra</label><input className="input" value={data.linkUrl} onChange={(e) => update('linkUrl', e.target.value)} placeholder="https://..." /></div>
          </>
        )}

        {/* SERVICE */}
        {block.type === 'service' && (
          <>
            <div><label className="label">Titulo</label><input className="input" value={data.title} onChange={(e) => update('title', e.target.value)} placeholder="Nome do servico" /></div>
            <div><label className="label">Descricao</label><textarea className="input min-h-[60px] resize-y" value={data.description} onChange={(e) => update('description', e.target.value)} placeholder="Descreva seu servico..." rows={2} /></div>
            <div><label className="label">Texto do botao</label><input className="input" value={data.actionLabel} onChange={(e) => update('actionLabel', e.target.value)} placeholder="Agendar" /></div>
            <div><label className="label">URL do botao</label><input className="input" value={data.actionUrl} onChange={(e) => update('actionUrl', e.target.value)} placeholder="https://..." /></div>
          </>
        )}

        {/* GALLERY */}
        {block.type === 'gallery' && (
          <div className="space-y-3">
            <label className="label">Imagens da galeria</label>
            {data.images.map((img: { url: string; caption?: string }, i: number) => (
              <div key={i} className="space-y-2 p-3 rounded-xl border border-[var(--color-border)]">
                <ImageUpload value={img.url} onChange={(url) => { const n = [...data.images]; n[i] = { ...n[i], url }; update('images', n) }} label={'Imagem ' + (i + 1)} />
                <input className="input text-sm" value={img.caption || ''} onChange={(e) => { const n = [...data.images]; n[i] = { ...n[i], caption: e.target.value }; update('images', n) }} placeholder="Legenda" />
                {data.images.length > 1 && <button type="button" onClick={() => update('images', data.images.filter((_: any, j: number) => j !== i))} className="btn btn-ghost btn-sm text-[var(--color-error)]"><Trash2 size={14} /> Remover</button>}
              </div>
            ))}
            <button type="button" onClick={() => update('images', [...data.images, { url: '', caption: '' }])} className="btn btn-ghost btn-sm text-[var(--color-primary)]"><Plus size={14} /> Adicionar imagem</button>
          </div>
        )}

        {/* VIDEO */}
        {block.type === 'video' && (
          <>
            <div><label className="label">Titulo</label><input className="input" value={data.title} onChange={(e) => update('title', e.target.value)} placeholder="Titulo do video" /></div>
            <div><label className="label">URL de embed</label><input className="input" value={data.embedUrl} onChange={(e) => update('embedUrl', e.target.value)} placeholder="https://www.youtube.com/embed/..." /></div>
            <p className="text-xs text-[var(--color-text-muted)]">Use o link de embed do YouTube/Vimeo</p>
          </>
        )}

        {/* TEXT */}
        {block.type === 'text' && (
          <div><label className="label">Conteudo</label><textarea className="input min-h-[120px] resize-y" value={data.content} onChange={(e) => update('content', e.target.value)} placeholder="Escreva seu texto aqui..." rows={4} /></div>
        )}

        {/* NEWSLETTER */}
        {block.type === 'newsletter' && (
          <>
            <div><label className="label">Titulo</label><input className="input" value={data.title} onChange={(e) => update('title', e.target.value)} placeholder="Receba dicas semanais" /></div>
            <div><label className="label">Descricao</label><input className="input" value={data.description} onChange={(e) => update('description', e.target.value)} placeholder="Design e negocios criativos" /></div>
            <div><label className="label">Placeholder do email</label><input className="input" value={data.placeholder} onChange={(e) => update('placeholder', e.target.value)} placeholder="seu@email.com" /></div>
            <div><label className="label">Texto do botao</label><input className="input" value={data.buttonText} onChange={(e) => update('buttonText', e.target.value)} placeholder="Assinar" /></div>
          </>
        )}

        {/* SOCIALS */}
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
      </div>
      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className="btn btn-secondary btn-md flex-1">Cancelar</button>
        <button onClick={() => onSave(data)} className="btn btn-primary btn-md flex-1">Salvar</button>
      </div>
    </div>
  )
}
