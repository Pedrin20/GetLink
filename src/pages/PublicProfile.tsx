import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useUserProfile } from '../hooks/useUserProfile';
import { useLinks } from '../hooks/useLinks';
import { MainLayout } from '../layouts/MainLayout';

export function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const { profile, loading: profileLoading, error } = useUserProfile(undefined, username);
  const { links, loading: linksLoading } = useLinks(profile?.id);

  if (profileLoading || linksLoading) {
    return (
      <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent" />
      </div>
      </MainLayout>
    );
  }

  if (error || !profile) {
    return (
      <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)] text-[var(--color-muted)]">
        <div className="text-center">
          <p className="text-2xl mb-2">😕</p>
          <p>Perfil não encontrado</p>
        </div>
      </div>
      </MainLayout>
    );
  }

  const siteUrl = window.location.origin
  const profileUrl = `${siteUrl}/${profile.username}`
  const title = `${profile.displayName} | GetLink`
  const description = profile.bio || `${profile.displayName} está no GetLink!`
  const imageUrl = profile.avatarUrl || `${siteUrl}/default-og-image.png`

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="profile" />
        <meta property="og:url" content={profileUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={profileUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        <link rel="canonical" href={profileUrl} />
      </Helmet>

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
    </>
  )
}