import reservations from '../../data/reservations'

function BookingOverview() {
  const today = new Date().toISOString().split('T')[0]

  const checkIns = reservations.filter(
    (reservation) => reservation.checkIn === today
  ).length

  const checkOuts = reservations.filter(
    (reservation) => reservation.checkOut === today
  ).length

  const newBookings = reservations.filter(
    (reservation) => reservation.checkIn === today
  ).length

  const cancelled = reservations.filter(
    (reservation) => reservation.status === 'Cancelled'
  ).length

  return (
    <div className="booking-overview">

      <div className="overview-header">
        <h3>Booking Overview</h3>
        <span>Today</span>
      </div>

      <div className="booking-stats">

        <div className="booking-item">
          <i className="bi bi-box-arrow-in-right"></i>
          <div>
            <h4>{checkIns}</h4>
            <p>Check-ins</p>
          </div>
        </div>

        <div className="booking-item">
          <i className="bi bi-box-arrow-right"></i>
          <div>
            <h4>{checkOuts}</h4>
            <p>Check-outs</p>
          </div>
        </div>

        <div className="booking-item">
          <i className="bi bi-calendar-check"></i>
          <div>
            <h4>{newBookings}</h4>
            <p>New Bookings</p>
          </div>
        </div>

        <div className="booking-item">
          <i className="bi bi-x-circle"></i>
          <div>
            <h4>{cancelled}</h4>
            <p>Cancelled</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default BookingOverview