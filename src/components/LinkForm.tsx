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
      <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)] sm:col-span-1">
        Título
        <input
          className="w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent-light)]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)] sm:col-span-1">
        URL
        <input
          className="w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent-light)]"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)] sm:col-span-2">
        Descrição
        <input
          className="w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent-light)]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição (opcional)"
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--color-accent)] px-4 py-3 font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-light)] sm:col-span-2 sm:w-auto"
      >
        Adicionar link
      </button>
    </form>
  )
}


