export function isValidUrl(value: string) {
    try {
        const normalized = value.startsWith('http') ? value : `https://${value}`
        const url = new URL(normalized)
        return Boolean(url.hostname)
    } catch {
        return false
    }
}