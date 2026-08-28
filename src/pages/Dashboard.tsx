import { useAuth } from '../hooks/useAuth'
import { useBlocks } from '../hooks/useBlocks'
import { useUserProfile } from '../hooks/useUserProfile'
import { MainLayout } from '../layouts/MainLayout'
import {
  LayoutGrid,
  Eye,
  TrendingUp,
  ArrowRight,
  Palette,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function StatCard({ icon: Icon, label, value, trend }: { icon: any; label: string; value: number | string; trend?: string }) {
  return (
    <div className="rounded-2xl border p-5 transition" style={{ borderColor: 'oklch(1 0 0 / 10%)', background: 'oklch(0.21 0.018 285)' }}>
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-xl" style={{ background: 'oklch(0.26 0.02 285)', color: 'oklch(0.58 0.24 285)' }}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: '#4ADE80', background: 'rgba(74, 222, 128, 0.15)' }}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  )
}

export function Dashboard() {
  const { user } = useAuth()
  const { blocks, loading } = useBlocks(user?.uid)
  const { profile: currentProfile, loading: profileLoading } = useUserProfile(user?.uid)
  const navigate = useNavigate()

  const totalBlocks = blocks.length
  const blockTypes = [...new Set(blocks.map(b => b.type))].length

  if (loading || profileLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[oklch(0.58_0.24_285)] border-t-transparent" />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Olá, {user?.displayName || 'usuário'}</h1>
            <p className="text-sm text-gray-400">
              Aqui está o desempenho da sua página nos últimos 30 dias.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/my-page')}
            className="inline-flex items-center gap-2 px-4 py-2 text-white font-medium rounded-lg transition hover:opacity-90"
            style={{ background: 'oklch(0.58 0.24 285)' }}
          >
            <LayoutGrid size={18} />
            Editar página
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={LayoutGrid} label="Total de blocos" value={totalBlocks} />
          <StatCard icon={TrendingUp} label="Tipos de blocos" value={blockTypes} />
          <StatCard icon={Eye} label="Pagina publica" value={currentProfile?.username ? 'Ativa' : 'Inativa'} />
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border p-5" style={{ borderColor: 'oklch(1 0 0 / 10%)', background: 'oklch(0.21 0.018 285)' }}>
          <h2 className="text-lg font-bold text-white mb-3">Ações rápidas</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/dashboard/my-page')}
              className="inline-flex items-center gap-2 px-4 py-2 text-white font-medium rounded-lg transition hover:opacity-90"
              style={{ background: 'oklch(0.58 0.24 285)' }}
            >
              <LayoutGrid size={18} />
              Minha Página
            </button>
            <button
              onClick={() => navigate('/dashboard/design')}
              className="inline-flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition"
              style={{ border: '1px solid oklch(1 0 0 / 12%)', color: 'white' }}
            >
              <Palette size={18} />
              Design
            </button>

            {currentProfile?.username && (
              <button
                onClick={() => navigate('/' + currentProfile.username)}
                className="inline-flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition"
                style={{ border: '1px solid oklch(1 0 0 / 12%)', color: 'white' }}
              >
                <Eye size={18} />
                Ver perfil público
              </button>
            )}

            <button
              onClick={() => navigate('/dashboard/analytics')}
              className="inline-flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition"
              style={{ border: '1px solid oklch(1 0 0 / 12%)', color: 'white' }}
            >
              <TrendingUp size={18} />
              Ver analytics
            </button>
          </div>
        </div>

        {/* Recent blocks */}
        <div className="rounded-2xl border p-5" style={{ borderColor: 'oklch(1 0 0 / 10%)', background: 'oklch(0.21 0.018 285)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Seus blocos</h2>
            <button
              onClick={() => navigate('/dashboard/my-page')}
              className="text-sm hover:underline flex items-center gap-1" style={{ color: 'oklch(0.58 0.24 285)' }}
            >
              Ver todos <ArrowRight size={16} />
            </button>
          </div>

          {blocks.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">
              Nenhum bloco cadastrado ainda. Comece adicionando blocos na sua página!
            </p>
          ) : (
            <div className="space-y-2">
              {blocks.slice(0, 5).map((block) => (
                <div key={block.id} className="flex items-center justify-between p-3 rounded-xl" style={{ border: '1px solid oklch(1 0 0 / 10%)' }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate capitalize">
                      {block.type}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {(block.data as any).title || (block.data as any).displayName || (block.data as any).content?.slice(0, 50) || 'Bloco'}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: 'oklch(0.58 0.24 285 / 15%)', color: 'oklch(0.58 0.24 285)' }}>
                    {block.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
