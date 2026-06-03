import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <div style={{
        backgroundImage: `linear-gradient(
          135deg,
          rgba(0,33,87,0.85) 0%,
          rgba(7,90,170,0.6) 60%,
          rgba(200,169,81,0.4) 100%),
          url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        padding: '2rem'
      }}>
        <div>
          <p style={{
            letterSpacing: '6px', fontSize: '12px',
            color: '#C8A951', textTransform: 'uppercase',
            fontWeight: '600', marginBottom: '1rem'
          }}>
            Welcome to British Airways
          </p>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '800', lineHeight: '1.1',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)'
          }}>
            The World is<br />
            <span style={{ color: '#C8A951' }}>Waiting For You</span>
          </h1>
          <p style={{
            fontSize: '1.2rem', marginTop: '1.2rem',
            color: 'rgba(255,255,255,0.85)', maxWidth: '550px',
            margin: '1.2rem auto 0'
          }}>
            Discover over 200 destinations with world-class
            comfort and service since 1974.
          </p>

          {/* Search Bar */}
          <div className="mt-5 p-4 rounded-4"
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.2)',
              maxWidth: '700px',
              margin: '2.5rem auto 0'
            }}>
            <div className="row g-2">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-lg border-0"
                  placeholder="From (e.g. Nairobi)"
                  style={{ borderRadius: '8px', background: 'rgba(255,255,255,0.9)' }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-lg border-0"
                  placeholder="To (e.g. London)"
                  style={{ borderRadius: '8px', background: 'rgba(255,255,255,0.9)' }}
                />
              </div>
              <div className="col-md-4">
                <Link to="/flights"
                  className="btn btn-gold btn-lg w-100 fw-bold"
                  style={{ borderRadius: '8px' }}>
                  Search Flights
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ background: 'var(--ba-dark)', padding: '2.5rem 0' }}>
        <div className="container-fluid px-5">
          <div className="row text-white text-center">
            {[
              { number: '200+', label: 'Destinations' },
              { number: '50M+', label: 'Passengers Yearly' },
              { number: '300+', label: 'Aircraft Fleet' },
              { number: '100+', label: 'Years of Service' },
            ].map((stat, i) => (
              <div className="col-6 col-md-3 py-2" key={i}>
                <h3 className="fw-bold mb-0"
                  style={{ color: '#C8A951', fontSize: '2rem' }}>
                  {stat.number}
                </h3>
                <small style={{ color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '1px' }}>
                  {stat.label}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY FLY WITH US ── */}
      <div style={{ padding: '5rem 5%', background: '#f0f4f8' }}>
        <div className="text-center mb-5">
          <p style={{ color: 'var(--ba-blue)', letterSpacing: '3px',
            fontSize: '12px', fontWeight: '600',
            textTransform: 'uppercase' }}>
            Our Promise
          </p>
          <h2 className="fw-bold" style={{ color: 'var(--ba-dark)',
            fontSize: '2.2rem' }}>
            Why Fly With Us?
          </h2>
          <div className="section-divider mt-3"></div>
        </div>

        <div className="row g-4">
          {[
            {
              img: 'https://images.unsplash.com/photo-1507812984078-917a274065be?w=600&auto=format&fit=crop',
              title: '200+ Destinations',
              text: 'From London Heathrow to the world — explore our global network of routes across 6 continents.',
              link: '/flights',
              cta: 'Explore Routes'
            },
            {
              img: 'https://images.unsplash.com/photo-1540339832862-474599807836?w=600&auto=format&fit=crop',
              title: 'Premium Comfort',
              text: 'World class service in every cabin — from Economy to First Class with exceptional hospitality.',
              link: '/flights',
              cta: 'View Cabins'
            },
            {
              img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop',
              title: 'Easy Booking',
              text: 'Book your flight in minutes — manage your trips anytime, anywhere with our simple system.',
              link: '/register',
              cta: 'Book Now'
            }
          ].map((card, i) => (
            <div className="col-md-4" key={i}>
              <div className="card card-hover h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div style={{ overflow: 'hidden', height: '220px' }}>
                  <img
                    src={card.img}
                    className="w-100 h-100"
                    alt={card.title}
                    style={{ objectFit: 'cover', transition: '0.4s' }}
                  />
                </div>
                <div className="card-body text-center p-4">
                  <h5 className="fw-bold" style={{ color: 'var(--ba-dark)' }}>
                    {card.title}
                  </h5>
                  <p className="text-muted">{card.text}</p>
                  <Link to={card.link}
                    className="btn btn-ba px-4 rounded-pill mt-1">
                    {card.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESTINATIONS STRIP ── */}
      <div style={{ padding: '5rem 5%', background: 'white' }}>
        <div className="text-center mb-5">
          <p style={{ color: 'var(--ba-blue)', letterSpacing: '3px',
            fontSize: '12px', fontWeight: '600',
            textTransform: 'uppercase' }}>
            Popular Routes
          </p>
          <h2 className="fw-bold" style={{ color: 'var(--ba-dark)',
            fontSize: '2.2rem' }}>
            Top Destinations
          </h2>
          <div className="section-divider mt-3"></div>
        </div>

        <div className="row g-3">
          {[
            {
              city: 'London', code: 'LHR',
              img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&auto=format&fit=crop'
            },
            {
              city: 'New York', code: 'JFK',
              img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&auto=format&fit=crop'
            },
            {
              city: 'Dubai', code: 'DXB',
              img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&auto=format&fit=crop'
            },
            {
              city: 'Nairobi', code: 'NBO',
              img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&auto=format&fit=crop'
            },
          ].map((dest, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="card-hover rounded-4 overflow-hidden position-relative"
                style={{ height: '200px', cursor: 'pointer' }}>
                <img
                  src={dest.img}
                  alt={dest.city}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(0,33,87,0.85))',
                  padding: '1.5rem 1rem 1rem',
                  color: 'white'
                }}>
                  <div className="fw-bold">{dest.city}</div>
                  <small style={{ color: '#C8A951' }}>{dest.code}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(0,33,87,0.88), rgba(0,33,87,0.88)),
          url('https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1400&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '6rem 5%',
        textAlign: 'center',
        color: 'white'
      }}>
        <p style={{ color: '#C8A951', letterSpacing: '4px',
          fontSize: '12px', textTransform: 'uppercase',
          fontWeight: '600' }}>
          Limited Time Offer
        </p>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>
          Ready to Take Off?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)',
          maxWidth: '500px', margin: '1rem auto',
          fontSize: '1.1rem' }}>
          Register today and get access to exclusive deals
          and member-only fares.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/register"
            className="btn btn-gold btn-lg px-5 rounded-pill fw-bold">
            Get Started
          </Link>
          <Link to="/flights"
            className="btn btn-outline-light btn-lg px-5 rounded-pill">
            Browse Flights
          </Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        background: '#001440',
        padding: '2rem 5%',
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center'
      }}>
        <p className="mb-0">
          © 2026 British Airways | All Rights Reserved |
          <span style={{ color: '#C8A951' }}> To Fly. To Serve.</span>
        </p>
      </div>

    </div>
  )
}

export default HomePage