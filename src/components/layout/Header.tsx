import { useAuth } from '../../context/AuthContext'

export function Header() {
  const { logout } = useAuth()

  return (
    <header className="main-header">
      <div className="header-title">Dashboard</div>
      <button type="button" className="btn btn-outline-light btn-sm" onClick={logout}>
        Logout
      </button>
    </header>
  )
}
