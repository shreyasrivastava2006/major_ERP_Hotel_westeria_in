import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import PageHeader from '../../components/layout/PageHeader'
import Breadcrumb from '../../components/layout/Breadcrumb'

import reservationsData from '../../data/reservations'
import roomsData from '../../data/rooms'

import { useHotel } from '../../context/HotelContext'

import './CheckIn.css'

const STORAGE_KEY = 'frontOfficeReservations'

function getReservations() {
  const savedReservations = localStorage.getItem(STORAGE_KEY)

  if (savedReservations) {
    return JSON.parse(savedReservations)
  }

  return reservationsData.map((reservation) => ({
    ...reservation,
    status:
      reservation.status === 'Checked In'
        ? 'Checked In'
        : 'Pending',
  }))
}

function CheckIn() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [checkIns, setCheckIns] = useState(getReservations)

  const handleCheckIn = (id) => {
    const updatedReservations = checkIns.map((item) =>
      item.id === id
        ? {
            ...item,
            status: 'Checked In',
          }
        : item
    )

    setCheckIns(updatedReservations)

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedReservations)
    )
  }

  const hotelReservations = useMemo(() => {
    if (!selectedHotel) {
      return checkIns
    }

    const hasHotelData = checkIns.some(
      (reservation) => reservation.hotelId
    )

    if (!hasHotelData) {
      return checkIns
    }

    return checkIns.filter(
      (reservation) =>
        reservation.hotelId === selectedHotel.id
    )
  }, [checkIns, selectedHotel])

  const filteredCheckIns = useMemo(() => {
    return hotelReservations.filter((item) => {
      const searchValue = search.toLowerCase()

      const guestName =
        item.guestName?.toLowerCase() || ''

      const reservationNo =
        item.reservationNo?.toLowerCase() || ''

      const roomNumber =
        String(item.roomNumber || '').toLowerCase()

      const matchesSearch =
        guestName.includes(searchValue) ||
        reservationNo.includes(searchValue) ||
        roomNumber.includes(searchValue)

      const matchesStatus =
        statusFilter === 'All' ||
        item.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [
    hotelReservations,
    search,
    statusFilter,
  ])

  const pendingCount = hotelReservations.filter(
    (item) => item.status === 'Pending'
  ).length

  const checkedInCount = hotelReservations.filter(
    (item) => item.status === 'Checked In'
  ).length

  const availableRooms =
    selectedHotel?.rooms?.available ??
    roomsData.filter(
      (room) => room.status === 'Available'
    ).length

  return (
    <MainLayout>

      <Breadcrumb
        items={['Front Office', 'Check-In']}
      />

      <PageHeader
        title="Guest Check-In"
        subtitle={
          selectedHotel
            ? `Manage guest arrivals for ${selectedHotel.name}`
            : 'Manage guest arrivals and hotel check-in process'
        }
      />

      <div className="checkin-page">

        {selectedHotel && (
          <div className="checkin-hotel-bar">

            <div className="checkin-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="checkin-hotel-info">
              <span>SELECTED PROPERTY</span>

              <strong>
                {selectedHotel.name}
              </strong>

              <small>
                {selectedHotel.code} •{' '}
                {selectedHotel.category} •{' '}
                {selectedHotel.address.city},{' '}
                {selectedHotel.address.state}
              </small>
            </div>

          </div>
        )}

        <div className="checkin-stats">

          <div className="checkin-stat-card">

            <div className="stat-icon">
              <i className="bi bi-calendar-check"></i>
            </div>

            <div>
              <span>Total Arrivals</span>
              <h2>{hotelReservations.length}</h2>
            </div>

          </div>

          <div className="checkin-stat-card">

            <div className="stat-icon pending">
              <i className="bi bi-clock"></i>
            </div>

            <div>
              <span>Pending</span>
              <h2>{pendingCount}</h2>
            </div>

          </div>

          <div className="checkin-stat-card">

            <div className="stat-icon success">
              <i className="bi bi-person-check"></i>
            </div>

            <div>
              <span>Checked In</span>
              <h2>{checkedInCount}</h2>
            </div>

          </div>

        </div>

        <div className="checkin-toolbar">

          <div className="checkin-search">

            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search guest, booking or room..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Checked In">
              Checked In
            </option>
          </select>

        </div>

        <div className="checkin-table-card">

          <div className="table-title">

            <div>
              <h2>Guest Arrivals</h2>

              <p>
                Reservations ready for hotel check-in
              </p>
            </div>

            <span className="available-room-info">
              <i className="bi bi-door-open"></i>
              {availableRooms} rooms available
            </span>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Booking No.</th>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredCheckIns.length === 0 ? (

                  <tr>
                    <td
                      colSpan="7"
                      className="empty-row"
                    >
                      <i className="bi bi-search"></i>

                      <span>
                        No check-in records found
                      </span>
                    </td>
                  </tr>

                ) : (

                  filteredCheckIns.map((item) => (

                    <tr key={item.id}>

                      <td>
                        <strong>
                          {item.reservationNo}
                        </strong>
                      </td>

                      <td>

                        <div className="guest-cell">

                          <div className="guest-avatar">
                            {item.guestName
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {item.guestName}
                            </strong>

                            <small>
                              {item.adults || 0} Adults
                              {item.children > 0 &&
                                ` • ${item.children} Children`}
                            </small>
                          </div>

                        </div>

                      </td>

                      <td>

                        <span className="room-number">
                          Room {item.roomNumber}
                        </span>

                      </td>

                      <td>
                        <strong>
                          {item.checkIn}
                        </strong>
                      </td>

                      <td>

                        <span
                          className={
                            item.paymentStatus === 'Paid'
                              ? 'payment paid'
                              : 'payment pending-payment'
                          }
                        >
                          {item.paymentStatus ||
                            'Pending'}
                        </span>

                      </td>

                      <td>

                        <span
                          className={
                            item.status === 'Checked In'
                              ? 'status checked'
                              : 'status pending-status'
                          }
                        >
                          {item.status}
                        </span>

                      </td>

                      <td>

                        {item.status === 'Pending' ? (

                          <button
                            type="button"
                            className="checkin-action"
                            onClick={() =>
                              handleCheckIn(item.id)
                            }
                          >
                            <i className="bi bi-box-arrow-in-right"></i>
                            Check In
                          </button>

                        ) : (

                          <span className="completed-action">
                            <i className="bi bi-check-circle"></i>
                            Completed
                          </span>

                        )}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default CheckIn