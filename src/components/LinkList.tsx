import type { Link } from '../types'
import { LinkItem } from './LinkItem'

type Props = {
  links: Link[]
  onRemove: (id: number) => void
}

export function LinkList({ links, onRemove }: Props) {
  if (links.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-accent-light)] px-4 py-10 text-center text-sm text-[var(--color-muted)] sm:px-6">
        Nenhum link cadastrado ainda.
      </div>
    )
  }

  return (
    <ul className="grid gap-4">
      {links.map((link) => (
        <LinkItem key={link.id} item={link} onRemove={onRemove} />
      ))}
    </ul>
  )
}