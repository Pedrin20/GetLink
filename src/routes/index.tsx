import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Eagerly loaded (critical path - seen before auth)
import { Login } from '../pages/Login';
import { Redirect } from '../pages/Redirect';

// Lazy-loaded dashboard pages (code-split into separate chunks)
const Dashboard = lazy(() => import('../pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Links = lazy(() => import('../pages/Links').then(m => ({ default: m.Links })));
const Analytics = lazy(() => import('../pages/Analytics').then(m => ({ default: m.Analytics })));
const Settings = lazy(() => import('../pages/Settings').then(m => ({ default: m.Settings })));
const ProfileEdit = lazy(() => import('../pages/ProfileEdit').then(m => ({ default: m.ProfileEdit })));
const PublicProfile = lazy(() => import('../pages/PublicProfile').then(m => ({ default: m.PublicProfile })));

// Loading fallback for lazy routes
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)]">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[var(--color-accent)] border-t-transparent" />
        <p className="text-sm text-[var(--color-muted)] animate-pulse">Carregando...</p>
      </div>
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }
  return user ? children : <Navigate to="/login" replace />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/r/:linkId" element={<Redirect />} />
        <Route path="/profile/edit" element={
          <PrivateRoute>
            <ProfileEdit />
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
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/:username" element={<PublicProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
