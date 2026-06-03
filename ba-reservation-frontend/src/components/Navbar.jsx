import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background: 'linear-gradient(90deg, #002157, #075AAA)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
        padding: '0.8rem 0'
      }}>
      <div className="container-fluid px-4">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=40&h=40&fit=crop"
            alt="BA"
            style={{ width: '36px', height: '36px',
              borderRadius: '50%', objectFit: 'cover',
              border: '2px solid #C8A951' }}
          />
          <div>
            <div className="fw-bold fs-5 lh-1">British Airways</div>
            <div style={{ fontSize: '10px', color: '#C8A951',
              letterSpacing: '2px' }}>TO FLY. TO SERVE.</div>
          </div>
        </Link>

        <button className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/flights', label: 'Flights' },
              { path: '/my-bookings', label: 'My Bookings' },
            ].map(item => (
              <li className="nav-item" key={item.path}>
                <Link
                  className="nav-link px-3 py-2 rounded"
                  to={item.path}
                  style={{
                    color: location.pathname === item.path
                      ? '#C8A951' : 'rgba(255,255,255,0.85)',
                    borderBottom: location.pathname === item.path
                      ? '2px solid #C8A951' : '2px solid transparent',
                    fontWeight: location.pathname === item.path
                      ? '600' : '400'
                  }}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="nav-item ms-2">
              <Link to="/register"
                className="btn btn-gold px-4 py-2 rounded-pill fw-bold">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar