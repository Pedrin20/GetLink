import type { ProfileBlockData } from '../../types'

export function ProfileBlock({ data }: { data: ProfileBlockData }) {
  return (
    <div
      className="rounded-2xl p-8 text-center text-white"
      style={{ backgroundColor: data.themeColor || '#F97316' }}
    >
      {data.avatarUrl ? (
        <img
          src={data.avatarUrl}
          alt={data.displayName}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white/30 shadow-lg"
        />
      ) : (
        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-white/20 flex items-center justify-center text-4xl font-bold border-4 border-white/30">
          {data.displayName?.[0]?.toUpperCase() || '?'}
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2">{data.displayName}</h1>
      {data.bio && (
        <p className="text-white/80 text-sm max-w-md mx-auto leading-relaxed">{data.bio}</p>
      )}
    </div>
  )
}
