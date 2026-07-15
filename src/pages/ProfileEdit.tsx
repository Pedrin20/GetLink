import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import { updateUserProfile } from '../services/userService';
import { Camera, X, Check, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { uploadAvatar } from '../services/uploadService';

const COLOR_PALETTE = [
  '#B85C38', 
  '#2D3748', 
  '#1A365D', 
  '#2F855A', 
  '#6B46C1', 
  '#C05621', 
  '#B83280', 
  '#0D9488', 
];

export function ProfileEdit() {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile(user?.uid);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [themeColor, setThemeColor] = useState('#B85C38');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

 useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setBio(profile.bio || '');
      setThemeColor(profile.themeColor || '#B85C38');
      setAvatarPreview(profile.avatarUrl || '');
    }
  }, [profile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);

    try {
    let uploadedAvatarUrl = avatarUrl;

  if (avatarFile) {
    uploadedAvatarUrl = await uploadAvatar(avatarFile);
  }

  await updateUserProfile(user.uid, {
    displayName,
    bio,
    themeColor,
    avatarUrl: uploadedAvatarUrl,
  });

  setAvatarPreview(uploadedAvatarUrl);
  setAvatarUrl(uploadedAvatarUrl);
  setAvatarFile(null);

  setMessage({ type: 'success', text: '✅ Perfil atualizado com sucesso!' });
} catch (err: any) {
  setMessage({ type: 'error', text: '❌ Erro ao atualizar: ' + err.message });
}

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent" />
      </div>
    );
  }


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)}>Voltar</button>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-serif text-[var(--color-ink)]">Editar Perfil</h1>
        <span className="text-sm bg-[var(--color-accent-light)] text-[var(--color-accent)] px-3 py-1 rounded-full">
          Personalize sua página
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-sm space-y-6">
            {/* Avatar upload */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Foto de perfil</label>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--color-border)] bg-[var(--color-paper)]">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-[var(--color-muted)]">
                        {displayName?.[0]?.toUpperCase() || '?'}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-[var(--color-accent)] text-white p-1.5 rounded-full shadow-md hover:brightness-110 transition"
                  >
                    <Camera size={16} />
                  </button>
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition"
                    >
                      <X size={14} />
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <div className="text-sm text-[var(--color-muted)]">
                  <p>Clique no ícone da câmera para fazer upload</p>
                  <p className="text-xs">Formato: JPG, PNG (máx. 5MB)</p>
                </div>
              </div>
            </div>


            {/* Nome */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Nome de exibição
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Seu nome"
                className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Biografia
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition min-h-[100px] resize-y"
                rows={3}
                placeholder="Conte um pouco sobre você..."
              />
              <p className="text-xs text-[var(--color-muted)] text-right mt-1">{bio.length}/160</p>
            </div>

            {/* Cor de fundo com paleta */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">
                Cor de fundo do perfil
              </label>
              <div className="flex flex-wrap gap-3 items-center">
                {COLOR_PALETTE.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setThemeColor(color)}
                    className={`w-10 h-10 rounded-full transition-all duration-200 ${
                      themeColor === color ? 'ring-2 ring-offset-2 ring-[var(--color-accent)] scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <div className="flex items-center gap-2 ml-2">
                  <Palette size={18} className="text-[var(--color-muted)]" />
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-10 h-10 rounded-full border-0 cursor-pointer p-0"
                  />
                </div>
              </div>
            </div>

             <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Salvar alterações
                </>
              )}
            </button>

            {message && (
              <div
                className={`p-3 rounded-xl text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}
          </form>
        </div>


        {/* Coluna de preview (2/5 da largura) */}
        <div className="lg:col-span-2">
          <div className="sticky top-8">
            <h4 className="text-sm font-medium text-[var(--color-muted)] mb-3 flex items-center gap-2">
             Prévia ao vivo
            </h4>
            <div
              className="rounded-2xl border border-[var(--color-border)] p-6 transition-colors duration-300 min-h-[400px] shadow-sm"
              style={{ backgroundColor: themeColor || 'var(--color-paper)' }}
            >
              <div className="text-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-white shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-white/40 flex items-center justify-center text-3xl text-white/80 border-2 border-white/30">
                    {displayName?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
                <h4 className="text-xl font-serif text-white drop-shadow-sm">
                  {displayName || 'Seu nome'}
                </h4>
                <p className="text-sm text-white/80 mt-1 line-clamp-2">
                  {bio || 'Sua biografia aqui...'}
                </p>

                {/* Links fictícios para preview */}
                <div className="mt-6 space-y-2">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-[var(--color-ink)] shadow-sm">
                    Link 1
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-[var(--color-ink)] shadow-sm">
                    Link 2
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-center text-[var(--color-muted)] mt-2">
              Esta é uma prévia de como seu perfil público será exibido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}