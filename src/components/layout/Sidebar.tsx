import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { PANEL_CONFIG } from '../../utils/panels'
import type { PanelId } from '../../types'

export function Sidebar() {
  const { panels } = useAuth()

  return (
    <aside className="main-sidebar">
      <div className="brand-link">
        <span className="brand-text">Asnatech Panel</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {panels.map((panelId: PanelId) => {
            const config = PANEL_CONFIG[panelId]
            if (!config) return null
            return (
              <li key={panelId}>
                <NavLink
                  to={config.path}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  <span className="nav-icon">{config.icon}</span>
                  <span>{config.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
