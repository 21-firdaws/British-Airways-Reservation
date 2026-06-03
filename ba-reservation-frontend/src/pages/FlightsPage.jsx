import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:8080/api'

function FlightsPage() {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [bookingData, setBookingData] = useState(null)
  const [userId, setUserId] = useState('')
  const [seats, setSeats] = useState(1)
  const [bookingMsg, setBookingMsg] = useState('')
  const [bookingError, setBookingError] = useState('')

  // Load all flights on page load
  useEffect(() => {
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API}/flights`)
      setFlights(res.data)
      setError('')
    } catch (err) {
      setError('Could not load flights. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const searchFlights = async () => {
    if (!origin || !destination) {
      fetchFlights()
      return
    }
    try {
      setLoading(true)
      const res = await axios.get(
        `${API}/flights/search?origin=${origin}&destination=${destination}`)
      setFlights(res.data)
      setError(res.data.length === 0 ? 'No flights found for that route.' : '')
    } catch (err) {
      setError('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBook = (flight) => {
    setBookingData(flight)
    setBookingMsg('')
    setBookingError('')
    setUserId('')
    setSeats(1)
  }

  const confirmBooking = async () => {
    if (!userId) {
      setBookingError('Please enter your User ID.')
      return
    }
    try {
      const res = await axios.post(
        `${API}/bookings?userId=${userId}&flightId=${bookingData.id}&numberOfSeats=${seats}`)
      setBookingMsg(`Booking confirmed! Your PNR: ${res.data.pnrCode}`)
      setBookingError('')
      fetchFlights()
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Booking failed.')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED': return 'success'
      case 'DELAYED': return 'warning'
      case 'CANCELLED': return 'danger'
      case 'COMPLETED': return 'secondary'
      default: return 'primary'
    }
  }

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(0,33,87,0.82),
          rgba(7,90,170,0.82)),
          url('https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=1400&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '5rem 5%',
        color: 'white',
        textAlign: 'center'
      }}>
        <p style={{ letterSpacing: '4px', fontSize: '12px',
          color: '#C8A951', textTransform: 'uppercase',
          fontWeight: '600' }}>
          Find Your Flight
        </p>
        <h1 className="fw-bold" style={{ fontSize: '3rem' }}>
          Search Flights
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>
          Search from our available routes worldwide
        </p>

        {/* Search Box */}
        <div className="mt-4 p-4 rounded-4 mx-auto"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)',
            maxWidth: '650px'
          }}>
          <div className="row g-2">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control form-control-lg border-0"
                placeholder="From (e.g. Nairobi)"
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control form-control-lg border-0"
                placeholder="To (e.g. London)"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-gold btn-lg w-100 fw-bold"
                style={{ borderRadius: '8px' }}
                onClick={searchFlights}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FLIGHTS LIST ── */}
      <div style={{ padding: '3rem 5%', background: '#f0f4f8' }}>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border"
              style={{ color: 'var(--ba-blue)', width: '3rem',
                height: '3rem' }}>
            </div>
            <p className="mt-3 text-muted">Loading flights...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-warning text-center rounded-3">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-bold mb-0"
                  style={{ color: 'var(--ba-dark)' }}>
                  Available Flights
                </h4>
                <small className="text-muted">
                  {flights.length} flight{flights.length !== 1 ? 's' : ''} found
                </small>
              </div>
              <button className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                onClick={fetchFlights}>
                Refresh
              </button>
            </div>

            {flights.length === 0 ? (
              <div className="text-center py-5">
                <div style={{ fontSize: '4rem' }}>✈️</div>
                <h5 className="mt-3 text-muted">No flights found</h5>
              </div>
            ) : (
              <div className="row g-3">
                {flights.map(flight => (
                  <div className="col-12" key={flight.id}>
                    <div className="card border-0 shadow-sm rounded-4 card-hover">
                      <div className="card-body p-4">
                        <div className="row align-items-center">

                          {/* Flight Number */}
                          <div className="col-md-2 text-center mb-3 mb-md-0">
                            <div className="fw-bold fs-5"
                              style={{ color: 'var(--ba-blue)' }}>
                              {flight.flightNumber}
                            </div>
                            <small className="text-muted">British Airways</small>
                          </div>

                          {/* Route */}
                          <div className="col-md-4 mb-3 mb-md-0">
                            <div className="d-flex align-items-center gap-2">
                              <div className="text-center">
                                <div className="fw-bold fs-5">
                                  {flight.origin}
                                </div>
                                <small className="text-muted">
                                  {new Date(flight.departureTime)
                                    .toLocaleTimeString([], {
                                      hour: '2-digit', minute: '2-digit'
                                    })}
                                </small>
                              </div>
                              <div className="flex-grow-1 text-center px-2">
                                <div style={{ color: '#C8A951',
                                  fontSize: '1.2rem' }}>
                                  ✈
                                </div>
                                <div style={{ height: '1px',
                                  background: '#dee2e6' }}>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="fw-bold fs-5">
                                  {flight.destination}
                                </div>
                                <small className="text-muted">
                                  {new Date(flight.arrivalTime)
                                    .toLocaleTimeString([], {
                                      hour: '2-digit', minute: '2-digit'
                                    })}
                                </small>
                              </div>
                            </div>
                          </div>

                          {/* Date */}
                          <div className="col-md-2 text-center mb-3 mb-md-0">
                            <div className="fw-bold">
                              {new Date(flight.departureTime)
                                .toLocaleDateString([], {
                                  day: 'numeric', month: 'short',
                                  year: 'numeric'
                                })}
                            </div>
                            <small className="text-muted">
                              {flight.availableSeats} seats left
                            </small>
                          </div>

                          {/* Status */}
                          <div className="col-md-2 text-center mb-3 mb-md-0">
                            <span className={`badge bg-${getStatusColor(flight.status)} rounded-pill px-3 py-2`}>
                              {flight.status}
                            </span>
                          </div>

                          {/* Price + Book */}
                          <div className="col-md-2 text-center">
                            <div className="fw-bold fs-5"
                              style={{ color: 'var(--ba-dark)' }}>
                              ${flight.price}
                            </div>
                            <button
                              className="btn btn-ba btn-sm rounded-pill px-3 mt-1"
                              onClick={() => handleBook(flight)}
                              disabled={flight.availableSeats === 0 ||
                                flight.status !== 'SCHEDULED'}>
                              {flight.availableSeats === 0
                                ? 'Full' : 'Book Now'}
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── BOOKING MODAL ── */}
      {bookingData && (
        <div className="modal d-block"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={e => e.target === e.currentTarget && setBookingData(null)}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">

              <div className="modal-header border-0 pb-0 px-4 pt-4"
                style={{ background: 'var(--ba-dark)',
                  borderRadius: '16px 16px 0 0' }}>
                <div className="text-white">
                  <h5 className="fw-bold mb-0">Confirm Booking</h5>
                  <small style={{ color: '#C8A951' }}>
                    Flight {bookingData.flightNumber}
                  </small>
                </div>
                <button className="btn-close btn-close-white"
                  onClick={() => setBookingData(null)}>
                </button>
              </div>

              <div className="modal-body p-4">

                {/* Flight Summary */}
                <div className="rounded-3 p-3 mb-4 text-center"
                  style={{ background: '#f0f4f8' }}>
                  <div className="d-flex justify-content-around align-items-center">
                    <div>
                      <div className="fw-bold fs-4">
                        {bookingData.origin}
                      </div>
                      <small className="text-muted">Origin</small>
                    </div>
                    <div style={{ color: '#C8A951', fontSize: '1.5rem' }}>
                      ✈
                    </div>
                    <div>
                      <div className="fw-bold fs-4">
                        {bookingData.destination}
                      </div>
                      <small className="text-muted">Destination</small>
                    </div>
                  </div>
                  <div className="mt-2 text-muted" style={{ fontSize: '13px' }}>
                    {new Date(bookingData.departureTime).toLocaleString()}
                  </div>
                </div>

                {/* User ID Input */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-muted"
                    style={{ fontSize: '13px', letterSpacing: '1px',
                      textTransform: 'uppercase' }}>
                    Your User ID
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Enter your user ID"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </div>

                {/* Seats Input */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-muted"
                    style={{ fontSize: '13px', letterSpacing: '1px',
                      textTransform: 'uppercase' }}>
                    Number of Seats
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    min="1"
                    max={bookingData.availableSeats}
                    value={seats}
                    onChange={e => setSeats(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </div>

                {/* Price Calculation */}
                <div className="rounded-3 p-3 mb-3"
                  style={{ background: '#f0f4f8' }}>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">
                      ${bookingData.price} × {seats} seat(s)
                    </span>
                    <span className="fw-bold fs-5"
                      style={{ color: 'var(--ba-dark)' }}>
                      ${(bookingData.price * seats).toFixed(2)}
                    </span>
                  </div>
                </div>

                {bookingMsg && (
                  <div className="alert alert-success rounded-3">
                    <strong>{bookingMsg}</strong>
                  </div>
                )}
                {bookingError && (
                  <div className="alert alert-danger rounded-3">
                    {bookingError}
                  </div>
                )}
              </div>

              <div className="modal-footer border-0 px-4 pb-4 pt-0">
                <button className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => setBookingData(null)}>
                  Cancel
                </button>
                {!bookingMsg && (
                  <button className="btn btn-ba rounded-pill px-5 fw-bold"
                    onClick={confirmBooking}>
                    Confirm Booking
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlightsPage