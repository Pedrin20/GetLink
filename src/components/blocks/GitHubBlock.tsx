import type { GitHubBlockData } from '../../types'

export function GitHubBlock({ data }: { data: GitHubBlockData; isEditing?: boolean }) {
  if (!data.username) {
    return (
      <div className="rounded-2xl p-6 text-center public-block"
        style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
        <p className="text-sm" style={{ color: 'var(--block-text-muted)' }}>
          Adicione um usuário do GitHub
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden public-block"
      style={{ backgroundColor: 'var(--block-bg)', borderColor: 'var(--block-border)' }}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={`https://github.com/${data.username}.png?size=80`}
            alt={data.username}
            className="h-12 w-12 rounded-full"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div>
            <h3 className="font-bold" style={{ color: 'var(--block-text)' }}>
              {data.username}
            </h3>
            <p className="text-xs" style={{ color: 'var(--block-text-muted)' }}>
              @{data.username} on GitHub
            </p>
          </div>
        </div>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--block-border)' }}
        >
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${data.username}&show_icons=true&theme=transparent&hide_border=true&text_color=${encodeURIComponent('var(--block-text)')}&icon_color=${encodeURIComponent('var(--block-accent, #8B5CF6)')}`}
            alt={`${data.username} GitHub stats`}
            className="w-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ghchart.rshah.org/${data.username}`
            }}
          />
        </div>
        {data.showPinned && (
          <div className="mt-3 rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--block-border)' }}>
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${data.username}&layout=compact&theme=transparent&hide_border=true&text_color=${encodeURIComponent('var(--block-text)')}`}
              alt="Top languages"
              className="w-full"
            />
          </div>
        )}
      </div>
      <a
        href={`https://github.com/${data.username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-5 py-3 text-center text-sm font-semibold transition-opacity hover:opacity-80"
        style={{
          borderTop: '1px solid var(--block-border)',
          color: 'var(--block-accent, #8B5CF6)',
        }}
      >
        Ver perfil →
      </a>
    </div>
  )
}
