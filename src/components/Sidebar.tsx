import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BarChart3, 
  Link2, 
  Palette, 
  Settings, 
  LogOut,
  User,
  Share2
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/links', icon: Link2, label: 'Links' },
  { to: '/profile/edit', icon: Palette, label: 'Aparência' },
  { to: '/dashboard/settings', icon: Settings, label: 'Configurações' },
]

export function Sidebar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-[var(--color-border)] flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 h-16 border-b border-[var(--color-border)]">
        <Link2 className="text-[var(--color-accent)]" size={28} />
        <span className="font-serif text-xl text-[var(--color-ink)]">GetLink</span>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]'
                  : 'text-[var(--color-muted)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]'
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Perfil e logout */}
      <div className="border-t border-[var(--color-border)] p-4 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)] font-medium">
            {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--color-ink)] truncate">
              {user?.displayName || user?.email?.split('@')[0] || 'Usuário'}
            </p>
            <p className="text-xs text-[var(--color-muted)] truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-[var(--color-muted)] hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  )
}