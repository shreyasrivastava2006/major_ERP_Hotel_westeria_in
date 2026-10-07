import { useState } from 'react'

function ReservationCalendar({
  reservations,
  onSelect,
}) {
  const [currentDate, setCurrentDate] = useState(
    new Date()
  )

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthName = currentDate.toLocaleDateString(
    'en-IN',
    {
      month: 'long',
      year: 'numeric',
    }
  )

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay()

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate()

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    )
  }

  const getReservationsForDate = (day) => {
    const date = `${year}-${String(
      month + 1
    ).padStart(2, '0')}-${String(day).padStart(
      2,
      '0'
    )}`

    return reservations.filter(
      (reservation) =>
        reservation.checkIn <= date &&
        reservation.checkOut >= date
    )
  }

  const calendarDays = []

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(
      <div
        key={`empty-${i}`}
        className="calendar-empty"
      />
    )
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    const dayReservations =
      getReservationsForDate(day)

    calendarDays.push(
      <div
        key={day}
        className="calendar-date"
      >
        <span className="date-number">
          {day}
        </span>

        {dayReservations.map((reservation) => (
          <button
            type="button"
            key={reservation.id}
            className={`calendar-reservation ${
              reservation.status
                ? reservation.status
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                : ''
            }`}
            onClick={() =>
              onSelect(reservation)
            }
          >
            {reservation.guestName ||
              reservation.guest}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="reservation-calendar">

      <div className="calendar-header">

        <div>
          <h2>Reservation Calendar</h2>
          <p>View bookings by date</p>
        </div>

        <div className="calendar-month">

          <button
            type="button"
            onClick={previousMonth}
            aria-label="Previous month"
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <span>{monthName}</span>

          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next month"
          >
            <i className="bi bi-chevron-right"></i>
          </button>

        </div>

      </div>

      <div className="calendar-grid">

        {[
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat',
        ].map((day) => (
          <div
            key={day}
            className="calendar-day-name"
          >
            {day}
          </div>
        ))}

        {calendarDays}

      </div>

    </div>
  )
}

export default ReservationCalendar