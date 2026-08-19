import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { PublicProfile } from '../pages/PublicProfile';
import { ProfileEdit } from '../pages/ProfileEdit';
import { MainLayout } from '../layouts/MainLayout';
import { Redirect } from '../pages/Redirect'
import { Dashboard } from '../pages/Dashboard'
import { Links } from '../pages/Links'
import { Analytics } from '../pages/Analytics';
import { Settings } from '../pages/Settings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent" />
      </div>
    )
  }
  return user ? children : <Navigate to="/login" replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profile/edit" element={
        <PrivateRoute>
          <MainLayout>
            <ProfileEdit />
          </MainLayout>
        </PrivateRoute>
      } />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/dashboard/links" element={
        <PrivateRoute>
          <Links />
        </PrivateRoute>
      } />
      <Route path="/dashboard/analytics" element={
        <PrivateRoute>
          <Analytics />
        </PrivateRoute>
      } />
      <Route path="/dashboard/settings" element={
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      } />
      <Route path="/r/:linkId" element={<Redirect />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/:username" element={<PublicProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
