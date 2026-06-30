// src/routes/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { MainLayout } from '../layouts/MainLayout'
import { PublicProfile } from '../pages/PublicProfile'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
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
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/profile" element={
  <PrivateRoute>
    <MainLayout>
      <PublicProfile />
    </MainLayout>
  </PrivateRoute>
} />
<Route path="/profile/:userId" element={
  <MainLayout>
    <PublicProfile />
  </MainLayout>
} />
    </Routes>
  )
}