// src/routes/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { PublicProfile } from '../pages/PublicProfile';
import { ProfileEdit } from '../pages/ProfileEdit';
import { MainLayout } from '../layouts/MainLayout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent" /></div>;
  return user ? children : <Navigate to="/login" replace />;
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
      <Route path="/" element={
        <PrivateRoute>
          <MainLayout>
            <Home />
          </MainLayout>
        </PrivateRoute>
      } />
      <Route path="/:username" element={<PublicProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}