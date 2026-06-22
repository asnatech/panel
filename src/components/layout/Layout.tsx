import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function Layout() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
