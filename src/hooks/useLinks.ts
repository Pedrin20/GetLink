import { useState } from "react";
import type { Link } from '../types'


export function useLinks(initial: Link[] = []) {
    const [links, setLinks] = useState<Link[]>(initial)

    function add(link: Omit<Link, 'id'>) {
        setLinks((prev) => [{ ...link, id: Date.now() }, ...prev])
    }

    function remove(id: number) {
        setLinks((prev) => prev.filter((l) => l.id !== id))
    }

    return{ links, add, remove, setLinks }
}