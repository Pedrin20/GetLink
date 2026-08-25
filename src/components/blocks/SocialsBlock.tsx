import type { SocialsBlockData } from '../../types'

const PLATFORM_ICONS: Record<string, string> = {
  github: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z',
  twitter: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
  instagram: 'M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm4.5 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.25-3.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  youtube: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  website: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
}

function getSocialIcon(platform: string) {
  return PLATFORM_ICONS[platform.toLowerCase()] || PLATFORM_ICONS.website
}

function getSocialColor(platform: string): string {
  const colors: Record<string, string> = {
    github: '#333', twitter: '#1DA1F2', instagram: '#E4405F',
    linkedin: '#0A66C2', youtube: '#FF0000', website: '#6B7280',
  }
  return colors[platform.toLowerCase()] || '#6B7280'
}

export function SocialsBlock({ data, isEditing }: { data: SocialsBlockData; isEditing?: boolean }) {
  const items = data.items?.filter((item) => item.platform && item.url) || []

  if (items.length === 0) {
    return (
      <div className="rounded-xl p-6 border shadow-md text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>Adicione suas redes sociais</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl p-6 border shadow-md public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <div className="flex flex-wrap justify-center gap-4">
        {items.map((item, i) => {
          const href = item.url.startsWith('http') ? item.url : `https://${item.url}`
          const Wrapper = isEditing ? 'div' : 'a'
          return (
            <Wrapper
              key={i}
              {...(!isEditing ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex flex-col items-center gap-2 p-3 rounded-xl transition-colors min-w-[80px]"
              style={{ color: 'var(--block-text-secondary)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-110"
                style={{ backgroundColor: getSocialColor(item.platform) }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d={getSocialIcon(item.platform)} />
                </svg>
              </div>
              <span className="text-xs font-medium capitalize">{item.platform}</span>
            </Wrapper>
          )
        })}
      </div>
    </div>
  )
}
