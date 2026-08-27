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
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-[var(--color-accent-light)] rounded-xl text-[var(--color-accent)]">
          <Icon size={20} />
        </div>
        {trend && (
          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-[var(--color-ink)]">{value}</p>
      <p className="text-sm text-[var(--color-muted)]">{label}</p>
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
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent" />
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
            <h1 className="text-3xl font-bold text-[var(--color-ink)]">Dashboard</h1>
            <p className="text-[var(--color-muted)] text-sm">
              Bem-vindo de volta! Aqui esta um resumo da sua pagina.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/my-page')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white font-medium rounded-xl hover:brightness-110 transition"
          >
            <LayoutGrid size={18} />
            Editar pagina
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={LayoutGrid} label="Total de blocos" value={totalBlocks} />
          <StatCard icon={TrendingUp} label="Tipos de blocos" value={blockTypes} />
          <StatCard icon={Eye} label="Pagina publica" value={currentProfile?.username ? 'Ativa' : 'Inativa'} />
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--color-ink)] mb-3">Acoes rapidas</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/dashboard/my-page')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white font-medium rounded-xl hover:brightness-110 transition"
            >
              <LayoutGrid size={18} />
              Minha Pagina
            </button>
            <button
              onClick={() => navigate('/dashboard/design')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] text-[var(--color-ink)] font-medium rounded-xl hover:bg-[var(--color-accent-light)] transition"
            >
              <Palette size={18} />
              Design
            </button>

            {currentProfile?.username && (
              <button
                onClick={() => navigate('/' + currentProfile.username)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] text-[var(--color-ink)] font-medium rounded-xl hover:bg-[var(--color-accent-light)] transition"
              >
                <Eye size={18} />
                Ver perfil publico
              </button>
            )}

            <button
              onClick={() => navigate('/dashboard/analytics')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] text-[var(--color-ink)] font-medium rounded-xl hover:bg-[var(--color-accent-light)] transition"
            >
              <TrendingUp size={18} />
              Ver analytics
            </button>
          </div>
        </div>

        {/* Recent blocks */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[var(--color-ink)]">Seus blocos</h2>
            <button
              onClick={() => navigate('/dashboard/my-page')}
              className="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              Ver todos <ArrowRight size={16} />
            </button>
          </div>

          {blocks.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)] py-8 text-center">
              Nenhum bloco cadastrado ainda. Comece adicionando blocos na sua pagina!
            </p>
          ) : (
            <div className="space-y-2">
              {blocks.slice(0, 5).map((block) => (
                <div key={block.id} className="flex items-center justify-between p-3 bg-[var(--color-paper)] rounded-xl border border-[var(--color-border)]">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-ink)] truncate capitalize">
                      {block.type}
                    </p>
                    <p className="text-xs text-[var(--color-muted)] truncate">
                      {(block.data as any).title || (block.data as any).displayName || (block.data as any).content?.slice(0, 50) || 'Bloco'}
                    </p>
                  </div>
                  <span className="text-xs bg-[var(--color-accent-light)] px-2 py-0.5 rounded-full text-[var(--color-accent)] capitalize">
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
