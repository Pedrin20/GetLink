import { useState } from 'react'
import type { Link } from '../types'

type Props = {
    onAdd: (link: Omit<Link, 'id'>) => void
}

export function LinkForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() || !url.trim()) return

    onAdd({
      title: title.trim(),
      url: url.trim(),
      description: description.trim(),
    })

    setTitle('')
    setUrl('')
    setDescription('')
  }

  return (
    <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
      <label className="grid gap-2 sm:col-span-1">
        <span className="label">Título</span>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />
      </label>

      <label className="grid gap-2 sm:col-span-1">
        <span className="label">URL</span>
        <input
          className="input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </label>

      <label className="grid gap-2 sm:col-span-2">
        <span className="label">Descrição</span>
        <input
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição (opcional)"
        />
      </label>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="btn btn-primary btn-md w-full sm:w-auto"
        >
          Adicionar link
        </button>
      </div>
    </form>
  )
}


