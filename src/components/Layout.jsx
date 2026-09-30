import { NavLink, Outlet } from 'react-router-dom'

const navigation = [
  { label: 'Inicio', path: '/' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Contacto', path: '/contacto' },
]

function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" end>
          <span className="brand-mark">LM</span>
          <span>
            <strong>Lenguajes IV</strong>
            <small>Trabajo práctico N°2</small>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              to={item.path}
              end={item.path === '/'}
              key={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <span>React + Vite</span>
        <span>Lenguajes IV · 2026</span>
      </footer>
    </div>
  )
}

export default Layout
