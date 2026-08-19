import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { MainLayout } from '../layouts/MainLayout'
import { Shield, Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
} from 'firebase/auth'
import toast from 'react-hot-toast'

export function Settings() {
  const { user, logout } = useAuth()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const [deletePassword, setDeletePassword] = useState('')
  const [showDeletePassword, setShowDeletePassword] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.email) return

    if (newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('As senhas nao coincidem.')
      return
    }
    if (currentPassword === newPassword) {
      toast.error('A nova senha deve ser diferente da atual.')
      return
    }

    setIsChangingPassword(true)
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPassword)
      toast.success('Senha alterada com sucesso!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        toast.error('Senha atual incorreta.')
      } else if (err.code === 'auth/weak-password') {
        toast.error('A nova senha e muito fraca.')
      } else {
        toast.error('Erro ao alterar senha. Tente novamente.')
      }
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.email) return

    if (!deletePassword) {
      toast.error('Digite sua senha para confirmar.')
      return
    }

    setIsDeleting(true)
    try {
      const credential = EmailAuthProvider.credential(user.email, deletePassword)
      await reauthenticateWithCredential(user, credential)
      await deleteUser(user)
      toast.success('Conta deletada com sucesso.')
      await logout()
    } catch (err: any) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        toast.error('Senha incorreta.')
      } else {
        toast.error('Erro ao deletar conta. Tente novamente.')
      }
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-serif text-[var(--color-ink)]">Configuracoes</h1>
          <p className="text-[var(--color-muted)] text-sm mt-1">
            Gerencie sua senha e conta.
          </p>
        </div>

        {/* Alterar Senha */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
              <Shield size={20} className="text-[var(--color-accent)]" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-[var(--color-ink)]">Alterar senha</h2>
              <p className="text-xs text-[var(--color-muted)]">Atualize sua senha de acesso</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Senha atual
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
                  placeholder="Digite sua senha atual"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Nova senha
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
                  placeholder="Digite a nova senha"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-[var(--color-muted)] mt-1">Minimo de 6 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Confirmar nova senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
                placeholder="Confirme a nova senha"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isChangingPassword}
              className="w-full py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isChangingPassword ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Alterando...
                </>
              ) : (
                'Alterar senha'
              )}
            </button>
          </form>
        </div>

        {/* Zona de Perigo */}
        <div className="bg-white rounded-2xl border border-red-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
          
            <div>
              <h2 className="text-lg font-medium text-red-600">Zona de perigo</h2>
              <p className="text-xs text-[var(--color-muted)]">Ações irreversíveis para sua conta</p>
            </div>
          </div>

          {!showDeleteConfirm ? (
            <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2.5 border border-red-300 text-red-600 font-medium rounded-xl hover:bg-red-50 transition flex items-center gap-2">
              <Trash2 size={16} />
              Deletar minha conta
            </button>
          ) : (
            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-red-700 font-medium mb-1">⚠️ Esta ação é irreversível!</p>
                <p className="text-xs text-red-600">Todos os seus dados, links e perfil serão permanentemente deletados.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Confirme com sua senha</label>
                <div className="relative">
                  <input type={showDeletePassword ? 'text' : 'password'} value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} className="w-full border border-red-200 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-red-400 transition" placeholder="••••••••" required />
                  <button type="button" onClick={() => setShowDeletePassword(!showDeletePassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition">
                    {showDeletePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => { setShowDeleteConfirm(false); setDeletePassword('') }} className="flex-1 py-2.5 border border-[var(--color-border)] text-[var(--color-ink)] font-medium rounded-xl hover:bg-[var(--color-paper)] transition">
                  Cancelar
                </button>
                <button type="submit" disabled={isDeleting} className="flex-1 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isDeleting ? (<><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Deletando...</>) : (<><Trash2 size={16} /> Deletar conta</>)}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
