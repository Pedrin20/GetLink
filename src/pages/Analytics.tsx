import { useAuth } from '../hooks/useAuth'
import { useBlocks } from '../hooks/useBlocks'
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
import { TrendingUp, LayoutGrid, MousePointer, Calendar } from 'lucide-react'

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#1F2937', '#06B6D4']

const BLOCK_TYPE_LABELS: Record<string, string> = {
  header: 'Cabecalho',
  link: 'Link',
  product: 'Produto',
  service: 'Servico',
  gallery: 'Galeria',
  video: 'Video',
  text: 'Texto',
  newsletter: 'Newsletter',
  socials: 'Redes Sociais',
}

export function Analytics() {
  const { user } = useAuth()
  const { blocks, loading } = useBlocks(user?.uid)

  const typeCounts = blocks.reduce((acc: Record<string, number>, b) => {
    acc[b.type] = (acc[b.type] || 0) + 1
    return acc
  }, {})

  const topTypes = Object.entries(typeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([type, count]) => ({
      name: BLOCK_TYPE_LABELS[type] || type,
      count,
    }))

  const pieData = Object.entries(typeCounts).map(([type, count]) => ({
    name: BLOCK_TYPE_LABELS[type] || type,
    value: count,
  }))

  const totalBlocks = blocks.length
  const uniqueTypes = Object.keys(typeCounts).length

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
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)]">Analytics</h1>
          <p className="text-[var(--color-muted)] text-sm">
            Acompanhe o desempenho dos seus blocos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-accent-light)] rounded-xl text-[var(--color-accent)]">
                <LayoutGrid size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-ink)]">{totalBlocks}</p>
                <p className="text-sm text-[var(--color-muted)]">Total de blocos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-accent-light)] rounded-xl text-[var(--color-accent)]">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-ink)]">{uniqueTypes}</p>
                <p className="text-sm text-[var(--color-muted)]">Tipos utilizados</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-accent-light)] rounded-xl text-[var(--color-accent)]">
                <MousePointer size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-ink)]">{typeCounts.link || 0}</p>
                <p className="text-sm text-[var(--color-muted)]">Links ativos</p>
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
                  {totalBlocks > 0 ? 'Ativa' : 'Vazia'}
                </p>
                <p className="text-sm text-[var(--color-muted)]">Status da pagina</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--color-ink)] mb-4">Blocos mais usados</h2>
            {topTypes.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)] py-8 text-center">
                Nenhum bloco adicionado ainda.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topTypes} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value} blocos`, 'Quantidade']} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {topTypes.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--color-ink)] mb-4">Distribuicao de tipos</h2>
            {pieData.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)] py-8 text-center">
                Nenhum bloco cadastrado.
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
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[var(--color-ink)]">Todos os blocos</h2>
            <span className="text-sm text-[var(--color-muted)]">{totalBlocks} blocos</span>
          </div>

          {blocks.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)] py-8 text-center">
              Nenhum bloco cadastrado ainda.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-3 px-2 font-medium text-[var(--color-muted)]">Tipo</th>
                    <th className="text-left py-3 px-2 font-medium text-[var(--color-muted)]">Conteudo</th>
                    <th className="text-right py-3 px-2 font-medium text-[var(--color-muted)]">Ordem</th>
                  </tr>
                </thead>
                <tbody>
                  {blocks.map((block) => (
                    <tr key={block.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-accent-light)] transition">
                      <td className="py-3 px-2 font-medium text-[var(--color-ink)] capitalize">
                        {BLOCK_TYPE_LABELS[block.type] || block.type}
                      </td>
                      <td className="py-3 px-2 text-[var(--color-muted)] truncate max-w-[200px]">
                        {(block.data as any).title || (block.data as any).displayName || (block.data as any).content?.slice(0, 50) || '—'}
                      </td>
                      <td className="py-3 px-2 text-right font-medium text-[var(--color-ink)]">
                        {block.order + 1}
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
