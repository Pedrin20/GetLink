import { useParams } from 'react-router-dom';
import { useUserProfile } from '../hooks/useUserProfile';
import { useLinks } from '../hooks/useLinks';
import { LinkList } from '../components/LinkList';
import { MainLayout } from '../layouts/MainLayout';

export function PublicProfile() {
  const { username } = useParams<{ username: string }>(); // captura /@username
  const { profile, loading: profileLoading, error } = useUserProfile(undefined, username);
  const { links, loading: linksLoading } = useLinks(profile?.id); // profile.id é o uid

  if (profileLoading || linksLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent" />
        </div>
      </MainLayout>
    );
  }

  if (error || !profile) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-[var(--color-muted)]">
          <p className="text-2xl mb-2">😕</p>
          <p>Perfil não encontrado</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <div 
      className="min-h-screen py-10 px-4 transition-colors duration-300"
      style={{ backgroundColor: profile.themeColor || 'var(--color-paper)' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {profile.avatarUrl && (
          <img 
            src={profile.avatarUrl} 
            alt={profile.displayName} 
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-white shadow-lg"
          />
        )}
        <h1 className="text-3xl font-serif text-[var(--color-ink)]">{profile.displayName}</h1>
        <p className="text-[var(--color-muted)] mt-1">{profile.bio}</p>
      </div>

      <div className="max-w-2xl mx-auto mt-8 space-y-3">
        {links.length === 0 ? (
          <p className="text-center text-[var(--color-muted)]">Nenhum link disponível.</p>
        ) : (
          // Usamos LinkList sem função de remover (perfil público)
          links.map((link) => (
            <a
              key={link.id}
              href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-xl p-4 shadow-md hover:shadow-lg border border-white/30"
            >
              <h3 className="text-lg font-medium text-[var(--color-ink)]">{link.title}</h3>
              {link.description && (
                <p className="text-sm text-[var(--color-muted)]">{link.description}</p>
              )}
            </a>
          ))
        )}
      </div>
    </div>
  );
}