import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './BookingReport.css'

function BookingReport() {
  const navigate = useNavigate()

  const bookings = [
    {
      id: 'RES-1001',
      guest: 'Rahul Sharma',
      room: '101',
      type: 'Deluxe',
      checkIn: '01 Sep 2026',
      checkOut: '03 Sep 2026',
      amount: '₹8,500',
      status: 'Confirmed',
    },
    {
      id: 'RES-1002',
      guest: 'Priya Singh',
      room: '205',
      type: 'Executive',
      checkIn: '02 Sep 2026',
      checkOut: '05 Sep 2026',
      amount: '₹12,400',
      status: 'Checked In',
    },
    {
      id: 'RES-1003',
      guest: 'Aman Verma',
      room: '302',
      type: 'Suite',
      checkIn: '04 Sep 2026',
      checkOut: '08 Sep 2026',
      amount: '₹15,800',
      status: 'Checked Out',
    },
    {
      id: 'RES-1004',
      guest: 'Neha Kapoor',
      room: '204',
      type: 'Deluxe',
      checkIn: '07 Sep 2026',
      checkOut: '09 Sep 2026',
      amount: '₹6,200',
      status: 'Confirmed',
    },
    {
      id: 'RES-1005',
      guest: 'Vikash Yadav',
      room: '110',
      type: 'Standard',
      checkIn: '10 Sep 2026',
      checkOut: '12 Sep 2026',
      amount: '₹4,800',
      status: 'Cancelled',
    },
  ]

  const confirmed = bookings.filter(
    (item) => item.status === 'Confirmed'
  ).length

  const checkedIn = bookings.filter(
    (item) => item.status === 'Checked In'
  ).length

  const cancelled = bookings.filter(
    (item) => item.status === 'Cancelled'
  ).length

  return (
    <MainLayout>
      <div className="booking-report-page">

        <Breadcrumb
          items={['Reports', 'Booking Report']}
        />

        <div className="booking-report-header">

          <PageHeader
            title="Booking Report"
            subtitle="Complete reservation and booking details"
          />

          <button
            type="button"
            className="booking-back-btn"
            onClick={() => navigate('/reports')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Reports
          </button>

        </div>

        {/* SUMMARY */}
        <div className="booking-summary">

          <div>
            <span>Total Bookings</span>
            <strong>{bookings.length}</strong>
          </div>

          <div>
            <span>Confirmed</span>
            <strong>{confirmed}</strong>
          </div>

          <div>
            <span>Checked In</span>
            <strong>{checkedIn}</strong>
          </div>

          <div>
            <span>Cancelled</span>
            <strong>{cancelled}</strong>
          </div>

        </div>

        {/* TABLE */}
        <div className="booking-table-card">

          <div className="booking-table-header">
            <div>
              <h2>Booking Details</h2>
              <p>Complete reservation records</p>
            </div>

            <span className="booking-count">
              {bookings.length} Bookings
            </span>
          </div>

          <div className="booking-table-wrapper">

            <table className="booking-table">

              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Room Type</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {bookings.map((booking) => (
                  <tr key={booking.id}>

                    <td>
                      <strong>{booking.id}</strong>
                    </td>

                    <td>{booking.guest}</td>

                    <td>{booking.room}</td>

                    <td>{booking.type}</td>

                    <td>{booking.checkIn}</td>

                    <td>{booking.checkOut}</td>

                    <td className="booking-amount">
                      {booking.amount}
                    </td>

                    <td>
                      <span
                        className={`booking-status ${booking.status
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  )
}

export default BookingReport