import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLinks } from '../hooks/useLinks'
import { useUserProfile } from '../hooks/useUserProfile'
import { LinkForm } from '../components/LinkForm'
import { LinkList } from '../components/LinkList'
import { QRCodeModal } from '../components/QRCodeModal'
import { MainLayout } from '../layouts/MainLayout'
import { 
  Link2, 
  Users, 
  Eye, 
  TrendingUp,
  Plus,
  Share2,
  BarChart3,
  ArrowRight,
  Clock
} from 'lucide-react'
import type { Link } from '../types'
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
    const { links, loading, addLink, removeLink, updateLink } = useLinks(user?.uid)
    const { profile: currentProfile, loading: profileLoading } = useUserProfile(user?.uid)
    const [showAddForm, setShowAddForm] = useState(false)
    const [isQRModalOpen, setIsQRModalOpen] = useState(false)
    const navigate = useNavigate()

    const totalLinks = links.length
    const activeLinks = links.filter(l => l.isActive !== false).length
    const totalClicks = links.reduce((sum, l) => sum + (l.clicks || 0), 0)

    const recentLinks = [...links].sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0)
        const dateB = b.createdAt?.toDate?.() || new Date(0)
        return dateB.getTime() - dateA.getTime()
    }).slice(0, 5)

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
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif text-[var(--color-ink)]">Dashboard</h1>
            <p className="text-[var(--color-muted)] text-sm">
              Bem-vindo de volta! Aqui está um resumo dos seus links.
            </p>
          </div>
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] text-[var(--color-ink)] font-medium rounded-xl hover:bg-[var(--color-accent-light)] transition"
          >
            <Share2 size={18} />
            Compartilhar
          </button>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard 
            icon={Link2} 
            label="Total de links" 
            value={totalLinks} 
          />
          <StatCard 
            icon={Eye} 
            label="Links ativos" 
            value={activeLinks} 
          />
          <StatCard 
            icon={TrendingUp} 
            label="Cliques totais" 
            value={totalClicks} 
            trend={totalClicks > 0 ? '+12%' : undefined}
          />
        </div>

        {/* Ações rápidas */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
          <h2 className="text-lg font-serif text-[var(--color-ink)] mb-3">Ações rápidas</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white font-medium rounded-xl hover:brightness-110 transition"
            >
              <Plus size={18} />
              Novo link
            </button>
            <button
              onClick={() => navigate('/profile/edit')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] text-[var(--color-ink)] font-medium rounded-xl hover:bg-[var(--color-accent-light)] transition"
            >
              <BarChart3 size={18} />
              Personalizar perfil
            </button>

            {currentProfile?.username && (
              <button
                onClick={() => navigate('/' + currentProfile.username)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] text-[var(--color-ink)] font-medium rounded-xl hover:bg-[var(--color-accent-light)] transition"
              >
                Ver perfil público
              </button>
            )}
          </div>
        </div>

        {/* Formulário de adição (se aberto) */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-sm">
            <LinkForm
              onAdd={(newLink: Omit<Link, 'id'>) => {
                addLink({ ...newLink, userId: user!.uid })
                setShowAddForm(false)
              }}
            />
          </div>
        )}

        {/* Últimos links adicionados */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif text-[var(--color-ink)]">Últimos links</h2>
            <button
              onClick={() => navigate('/dashboard/links')}
              className="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              Ver todos <ArrowRight size={16} />
            </button>
          </div>
          
          {recentLinks.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)] py-8 text-center">
              Nenhum link cadastrado ainda.
            </p>
          ) : (
            <div className="space-y-2">
              {recentLinks.map((link) => (
                <div key={link.id} className="flex items-center justify-between p-3 bg-[var(--color-paper)] rounded-xl border border-[var(--color-border)]">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-ink)] truncate">
                      {link.title}
                    </p>
                    <p className="text-xs text-[var(--color-muted)] truncate">
                      {link.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <span className="text-xs bg-white px-2 py-0.5 rounded-full text-[var(--color-muted)]">
                      {link.clicks || 0} cliques
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${link.isActive !== false ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {link.isActive !== false ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal QR Code */}
        <QRCodeModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          url={`${window.location.origin}/${currentProfile?.username || ''}`}
          username={currentProfile?.username || ''}
        />
      </div>
    </MainLayout>
  )
}