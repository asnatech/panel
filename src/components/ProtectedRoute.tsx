import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loading } from '../components/Loading'
import { PANEL_CONFIG } from '../utils/panels'
import type { PanelId } from '../types'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return <Loading message="Loading panel..." />
  }

  return <Outlet />
}

export function PanelGuard({ panel }: { panel: PanelId }) {
  const { panels } = useAuth()

  if (!panels.includes(panel)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export function HomeRedirect() {
  const { panels } = useAuth()
  const firstPanel = panels[0]

  if (!firstPanel) {
    return (
      <div className="page">
        <div className="card">
          <div className="card-body text-muted">No panels available for your account.</div>
        </div>
      </div>
    )
  }

  return <Navigate to={PANEL_CONFIG[firstPanel].path} replace />
}
