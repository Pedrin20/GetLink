import { useState } from "react";
import type { LinkItem } from "../App";

export function useLinks(initial: LinkItem[] = []) {
    const [links, setLinks] = useState<LinkItem[]>(initial)

    function add(link: Omit<LinkItem, 'id'>) {
        setLinks((prev) => [{ ...link, id: Date.now() }, ...prev])
    }

    function remove(id: number) {
        setLinks((prev) => prev.filter((l) => l.id !== id))
    }

    return{ links, add, remove, setLinks }
}