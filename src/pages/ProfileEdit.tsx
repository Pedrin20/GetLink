// src/pages/ProfileEdit.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import { updateUserProfile } from '../services/userService';
import { useNavigate } from 'react-router-dom';

export function ProfileEdit() {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile(user?.uid);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [themeColor, setThemeColor] = useState('#B85C38');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setBio(profile.bio || '');
      setThemeColor(profile.themeColor || '#B85C38');
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await updateUserProfile(user.uid, { displayName, bio, themeColor });
      setMessage('✅ Perfil atualizado com sucesso!');
    } catch (err) {
      setMessage('❌ Erro ao atualizar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10">Carregando perfil...</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <button className='text-2xl font-serif mb-6' onClick={() => navigate(-1)}>
        Voltar
      </button>
      <h1 className="text-2xl font-serif mb-6">Editar Perfil</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)]">Nome de exibição</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)]">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            rows={3}
            placeholder="Fale sobre você..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)]">Cor de fundo do perfil</label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="w-full h-12 border border-[var(--color-border)] rounded-xl cursor-pointer"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:brightness-110 transition disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </button>
        {message && (
          <p className={`text-sm text-center ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}