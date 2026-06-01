import type { Link } from "../types"

type Props = { 
    item: Link; 
    onRemove: (id: number) => void }

export function LinkItem({ item, onRemove }: Props) {
    return(
        <li>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
            <a href={item.url.startsWith('http') ? item.url : `https://${item.url}`} target="_blank" rel="noreferrer">Abrir</a>
            <button onClick={() => onRemove(item.id)}>Remove</button>
        </li>
    )
}