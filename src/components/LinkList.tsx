import type { Link } from '../types'
import { LinkItem } from './LinkItem'

type Props = { 
    links: Link[]; 
    onRemove: (id: number) => void }

export function LinkList({ links, onRemove }: Props) {
  if (links.length === 0) return <p>Nenhum link cadastrado ainda.</p>

  return (
    <ul>
      {links.map(link => (
        <LinkItem key={link.id} item={link} onRemove={onRemove} />
      ))}
    </ul>
  )
}