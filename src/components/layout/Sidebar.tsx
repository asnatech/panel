import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useI18n } from '../../context/I18nContext'
import { PANEL_CONFIG } from '../../utils/panels'
import type { PanelId } from '../../types'

export function Sidebar() {
  const { panels, logout } = useAuth()
  const { t } = useI18n()

  return (
    <aside className="main-sidebar">
      <div className="brand-link">
        <span className="brand-text">{t('app.title')}</span>
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
                  <span>{t(`nav.${panelId}`)}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="sidebar-footer" style={{ padding: '20px' }}>
        <button type="button" className="btn btn-outline btn-sm" onClick={logout} style={{ width: '100%' }}>
          {t('nav.logout')}
        </button>
      </div>
    </aside>
  )
}
