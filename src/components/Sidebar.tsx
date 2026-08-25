import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BarChart3, 
  Link2, 
  Palette, 
  Settings, 
  LogOut,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'
import { ThemeSwitcher } from './ThemeSwitcher'

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
    toast.success('Logout realizado com sucesso!')
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-[var(--color-border)] flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] flex items-center justify-center shadow-[var(--shadow-primary)]">
          <Link2 className="text-white" size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">GetLink</span>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Tema + Perfil + logout */}
      <div className="border-t border-[var(--color-border)] p-4 space-y-3">
        <ThemeSwitcher />
        <div className="flex items-center gap-3 px-2">
          <div className="avatar avatar-sm">
            {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
              {user?.displayName || user?.email?.split('@')[0] || 'Usuário'}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-sm w-full justify-start text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-soft)]"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  )
}