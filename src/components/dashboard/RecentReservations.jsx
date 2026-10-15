import reservations from '../../data/reservations'

function RecentReservations() {
  const recentReservations = [...reservations]
    .sort(
      (a, b) =>
        new Date(b.checkIn) - new Date(a.checkIn)
    )
    .slice(0, 5)

  return (
    <div className="recent-reservations">

      <div className="reservation-header">
        <h3>Recent Reservations</h3>
        <button>View All</button>
      </div>

      <div className="reservation-table">
        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentReservations.map((reservation) => (
              <tr key={reservation.id}>

                <td>
                  #{reservation.reservationNo}
                </td>

                <td>
                  {reservation.guestName}
                </td>

                <td>
                  Room {reservation.roomNumber}
                </td>

                <td>
                  {reservation.checkIn}
                </td>

                <td>
                  <span className="status-badge">
                    {reservation.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default RecentReservations   