import { useAuth } from '../hooks/useAuth'
import { useLinks } from '../hooks/useLinks'
import { MainLayout } from '../layouts/MainLayout'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts'
import { TrendingUp, Link2, MousePointer, Calendar } from 'lucide-react'

const COLORS = ['#B85C38', '#D48C6A', '#E6BBA8', '#F2D6C8', '#F9EDE6']

export function Analytics() {
  const { user } = useAuth()
  const { links, loading } = useLinks(user?.uid)

  const topLinks = [...links]
    .filter(link => link.clicks && link.clicks > 0)
    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
    .slice(0, 5)
    .map(link => ({
      name: link.title.length > 20 ? link.title.substring(0, 20) + '...' : link.title,
      clicks: link.clicks || 0,
      fullTitle: link.title,
      url: link.url,
    }))

  const activeCount = links.filter(l => l.isActive !== false).length
  const inactiveCount = links.filter(l => l.isActive === false).length
  const pieData = [
    { name: 'Ativos', value: activeCount },
    { name: 'Inativos', value: inactiveCount },
  ]

  // Estatísticas gerais
  const totalLinks = links.length
  const totalClicks = links.reduce((sum, l) => sum + (l.clicks || 0), 0)
  const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0
  const mostClickedLink = links.reduce((max, l) => (l.clicks || 0) > (max.clicks || 0) ? l : max, links[0] || {})
  if (loading) {
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
        <div>
          <h1 className="text-3xl font-serif text-[var(--color-ink)]">Analytics</h1>
          <p className="text-[var(--color-muted)] text-sm">
            Acompanhe o desempenho dos seus links.
          </p>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-accent-light)] rounded-xl text-[var(--color-accent)]">
                <MousePointer size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-ink)]">{totalClicks}</p>
                <p className="text-sm text-[var(--color-muted)]">Total de cliques</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-accent-light)] rounded-xl text-[var(--color-accent)]">
                <Link2 size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-ink)]">{totalLinks}</p>
                <p className="text-sm text-[var(--color-muted)]">Total de links</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-accent-light)] rounded-xl text-[var(--color-accent)]">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-ink)]">{avgClicks}</p>
                <p className="text-sm text-[var(--color-muted)]">Média por link</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-accent-light)] rounded-xl text-[var(--color-accent)]">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-ink)]">
                  {mostClickedLink?.title ? 
                    (mostClickedLink.title.length > 15 ? mostClickedLink.title.substring(0, 15) + '…' : mostClickedLink.title) 
                    : '—'}
                </p>
                <p className="text-sm text-[var(--color-muted)]">Link mais clicado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos - duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de barras - Top 5 links */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
            <h2 className="text-lg font-serif text-[var(--color-ink)] mb-4">Links mais clicados</h2>
            {topLinks.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)] py-8 text-center">
                Nenhum clique registrado ainda.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={topLinks}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip 
                    formatter={(value) => [`${value} cliques`, 'Cliques']}
                    labelFormatter={(label) => `Link: ${label}`}
                  />
                  <Bar dataKey="clicks" fill="#B85C38" radius={[0, 4, 4, 0]}>
                    {topLinks.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Gráfico de pizza - Status dos links */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
            <h2 className="text-lg font-serif text-[var(--color-ink)] mb-4">Status dos links</h2>
            {totalLinks === 0 ? (
              <p className="text-sm text-[var(--color-muted)] py-8 text-center">
                Nenhum link cadastrado.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={(props: any) => `${props.name || ''}: ${((props.percent || 0) * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#B85C38" />
                    <Cell fill="#E6E4E0" />
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Tabela de todos os links com cliques */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif text-[var(--color-ink)]">Todos os links</h2>
            <span className="text-sm text-[var(--color-muted)]">{totalLinks} links</span>
          </div>
          
          {links.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)] py-8 text-center">
              Nenhum link cadastrado ainda.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-3 px-2 font-medium text-[var(--color-muted)]">Título</th>
                    <th className="text-left py-3 px-2 font-medium text-[var(--color-muted)] hidden sm:table-cell">URL</th>
                    <th className="text-right py-3 px-2 font-medium text-[var(--color-muted)]">Cliques</th>
                    <th className="text-center py-3 px-2 font-medium text-[var(--color-muted)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-accent-light)] transition">
                      <td className="py-3 px-2 font-medium text-[var(--color-ink)] truncate max-w-[150px]">
                        {link.title}
                      </td>
                      <td className="py-3 px-2 text-[var(--color-muted)] truncate max-w-[200px] hidden sm:table-cell">
                        {link.url}
                      </td>
                      <td className="py-3 px-2 text-right font-medium text-[var(--color-ink)]">
                        {link.clicks || 0}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                          link.isActive !== false ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {link.isActive !== false ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}