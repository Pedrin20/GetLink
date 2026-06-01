import { useState } from "react"
import type { Link } from '../types'

type Props = {
    onAdd: (link: Omit<Link, 'id'>) => void
}

export function LinkForm({ onAdd }: Props) {

    const [ title, setTitle ] = useState('')
    const [ url, setUrl ] = useState('')
    const [ description, setDescription ] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() || !url.trim()) return

    onAdd({ 
        title: title.trim(), 
        url: url.trim(), 
        description: description.trim() })

    setTitle('')
    setUrl('')
    setDescription('')
  }

  return (
   <form className="form" onSubmit={handleSubmit}>
      <label>
        Título
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      </label>
      <label>
        URL
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
      </label>
      <label>
        Descrição
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição (opcional)" />
      </label>
      <button type="submit">Adicionar link</button>
    </form>
  )
}


  