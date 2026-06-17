import type { Link } from "../types"

type Props = {
    item: Link
    onRemove: (id: string) => void
}

export function LinkItem({ item, onRemove }: Props) {
    return (
        <li className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold text-[var(--color-ink)] sm:text-lg">
                    {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-[var(--color-muted)]">
                    {item.description}
                </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <a
                    className="inline-flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-light)] px-4 py-2 text-sm font-medium text-[var(--color-accent)] transition hover:border-[var(--color-accent)] hover:bg-white"
                    href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Abrir
                </a>
                <button
                    className="inline-flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-accent-light)]"
                    onClick={() => onRemove(item.id)}
                >
                    Remover
                </button>
            </div>
        </li>
    )
}