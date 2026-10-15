import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import PageHeader from '../../components/layout/PageHeader'
import Breadcrumb from '../../components/layout/Breadcrumb'

import { useHotel } from '../../context/HotelContext'
import { useHotelData } from '../../context/HotelDataContext'

import './FrontOffice.css'

function FrontOffice() {
  const { selectedHotel } = useHotel()

  const {
    rooms,
    guests,
    reservations,
  } = useHotelData()

  const today = new Date().toISOString().split('T')[0]

  // ================================
  // TODAY'S CHECK-IN
  // ================================

  const todayCheckIns = useMemo(() => {
    return reservations.filter(
      (reservation) =>
        reservation.checkIn === today &&
        reservation.status !== 'Cancelled'
    )
  }, [reservations, today])

  // ================================
  // TODAY'S CHECK-OUT
  // ================================

  const todayCheckOuts = useMemo(() => {
    return reservations.filter(
      (reservation) =>
        reservation.checkOut === today &&
        reservation.status !== 'Cancelled'
    )
  }, [reservations, today])

  // ================================
  // ACTIVE GUESTS
  // ================================

  const activeGuests = useMemo(() => {
    return reservations.filter(
      (reservation) =>
        reservation.status === 'Confirmed' ||
        reservation.status === 'Checked In'
    )
  }, [reservations])

  // ================================
  // ROOM STATUS
  // ================================

  const availableRooms = rooms.filter(
    (room) => room.status === 'Available'
  )

  const occupiedRooms = rooms.filter(
    (room) => room.status === 'Occupied'
  )

  const cleaningRooms = rooms.filter(
    (room) => room.status === 'Cleaning'
  )

  const maintenanceRooms = rooms.filter(
    (room) => room.status === 'Maintenance'
  )

  // ================================
  // QUICK ACTIONS
  // ================================

  const quickActions = [
    {
      title: 'Check-In',
      description:
        'Register arriving guests and assign rooms',
      icon: 'bi-box-arrow-in-right',
      path: '/front-office/checkin',
    },
    {
      title: 'Check-Out',
      description:
        'Process departures and complete billing',
      icon: 'bi-box-arrow-right',
      path: '/front-office/checkout',
    },
    {
      title: 'Guest Requests',
      description:
        'Manage guest service requests',
      icon: 'bi-chat-left-text',
      path: '/front-office/guest-requests',
    },
    {
      title: 'Room Transfer',
      description:
        'Transfer guests to another room',
      icon: 'bi-arrow-left-right',
      path: '/front-office/room-transfer',
    },
  ]

  return (
    <MainLayout>
      <Breadcrumb items={['Front Office']} />

      <PageHeader
        title="Front Office"
        subtitle={
          selectedHotel
            ? `Manage front office operations for ${selectedHotel.name}`
            : 'Manage guest arrivals, departures, room assignments and guest services'
        }
      />

      <div className="front-office-page">

        {/* ========================================
            SELECTED HOTEL
        ======================================== */}

        {selectedHotel && (
          <div className="front-office-hotel-bar">

            <div className="front-office-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="front-office-hotel-info">
              <span>SELECTED PROPERTY</span>

              <strong>
                {selectedHotel.name}
              </strong>

              <small>
                {selectedHotel.code} •{' '}
                {selectedHotel.category} •{' '}
                {selectedHotel.address?.city},{' '}
                {selectedHotel.address?.state}
              </small>
            </div>

          </div>
        )}

        {/* ========================================
            SUMMARY STATS
        ======================================== */}

        <div className="front-office-stats">

          <div className="front-office-stat">

            <div className="front-office-stat-icon purple">
              <i className="bi bi-person-check"></i>
            </div>

            <div>
              <span>Active Guests</span>

              <strong>
                {activeGuests.length}
              </strong>

              <small>
                Current reservations
              </small>
            </div>

          </div>

          <div className="front-office-stat">

            <div className="front-office-stat-icon gold">
              <i className="bi bi-box-arrow-in-right"></i>
            </div>

            <div>
              <span>Today's Check-Ins</span>

              <strong>
                {todayCheckIns.length}
              </strong>

              <small>
                Expected arrivals
              </small>
            </div>

          </div>

          <div className="front-office-stat">

            <div className="front-office-stat-icon blue">
              <i className="bi bi-box-arrow-right"></i>
            </div>

            <div>
              <span>Today's Check-Outs</span>

              <strong>
                {todayCheckOuts.length}
              </strong>

              <small>
                Expected departures
              </small>
            </div>

          </div>

          <div className="front-office-stat">

            <div className="front-office-stat-icon green">
              <i className="bi bi-door-open"></i>
            </div>

            <div>
              <span>Available Rooms</span>

              <strong>
                {availableRooms.length}
              </strong>

              <small>
                Ready for guests
              </small>
            </div>

          </div>

        </div>

        {/* ========================================
            QUICK ACTIONS
        ======================================== */}

        <section className="front-office-section">

          <div className="front-office-section-header">

            <div>
              <h2>
                Front Office Operations
              </h2>

              <p>
                Quickly access daily guest management operations
              </p>
            </div>

          </div>

          <div className="front-office-actions">

            {quickActions.map((action) => (

              <Link
                to={action.path}
                className="front-office-action-card"
                key={action.title}
              >

                <div className="front-office-action-icon">
                  <i
                    className={`bi ${action.icon}`}
                  ></i>
                </div>

                <div className="front-office-action-content">

                  <h3>
                    {action.title}
                  </h3>

                  <p>
                    {action.description}
                  </p>

                  <span>
                    Open
                    <i className="bi bi-arrow-right"></i>
                  </span>

                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* ========================================
            TODAY'S ACTIVITY
        ======================================== */}

        <div className="front-office-columns">

          {/* CHECK-IN */}

          <section className="front-office-panel">

            <div className="front-office-panel-header">

              <div>
                <h2>
                  Today's Check-Ins
                </h2>

                <p>
                  Guests expected to arrive today
                </p>
              </div>

              <span className="panel-count">
                {todayCheckIns.length}
              </span>

            </div>

            <div className="front-office-list">

              {todayCheckIns.length === 0 ? (

                <div className="front-office-empty">

                  <i className="bi bi-calendar-check"></i>

                  <p>
                    No check-ins scheduled for today.
                  </p>

                </div>

              ) : (

                todayCheckIns.map((reservation) => (

                  <div
                    className="front-office-list-item"
                    key={reservation.id}
                  >

                    <div className="guest-avatar">
                      {(
                        reservation.guestName ||
                        reservation.guest ||
                        'G'
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="guest-info">

                      <strong>
                        {reservation.guestName ||
                          reservation.guest ||
                          'Unknown Guest'}
                      </strong>

                      <span>
                        Room{' '}
                        {reservation.roomNumber ||
                          reservation.room ||
                          'Not Assigned'}
                      </span>

                      <small>
                        {reservation.reservationNo ||
                          `RES-${reservation.id}`}
                      </small>

                    </div>

                    <div className="activity-status confirmed">
                      {reservation.status}
                    </div>

                  </div>

                ))

              )}

            </div>

          </section>

          {/* CHECK-OUT */}

          <section className="front-office-panel">

            <div className="front-office-panel-header">

              <div>
                <h2>
                  Today's Check-Outs
                </h2>

                <p>
                  Guests expected to depart today
                </p>
              </div>

              <span className="panel-count">
                {todayCheckOuts.length}
              </span>

            </div>

            <div className="front-office-list">

              {todayCheckOuts.length === 0 ? (

                <div className="front-office-empty">

                  <i className="bi bi-calendar-x"></i>

                  <p>
                    No check-outs scheduled for today.
                  </p>

                </div>

              ) : (

                todayCheckOuts.map((reservation) => (

                  <div
                    className="front-office-list-item"
                    key={reservation.id}
                  >

                    <div className="guest-avatar checkout">
                      {(
                        reservation.guestName ||
                        reservation.guest ||
                        'G'
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="guest-info">

                      <strong>
                        {reservation.guestName ||
                          reservation.guest ||
                          'Unknown Guest'}
                      </strong>

                      <span>
                        Room{' '}
                        {reservation.roomNumber ||
                          reservation.room ||
                          'Not Assigned'}
                      </span>

                      <small>
                        {reservation.reservationNo ||
                          `RES-${reservation.id}`}
                      </small>

                    </div>

                    <div className="activity-status checkout-status">
                      Departure
                    </div>

                  </div>

                ))

              )}

            </div>

          </section>

        </div>

        {/* ========================================
            ROOM STATUS
        ======================================== */}

        <section className="front-office-section">

          <div className="front-office-section-header">

            <div>
              <h2>
                Room Status
              </h2>

              <p>
                Current room availability overview
              </p>
            </div>

            <div className="room-status-total">
              {rooms.length} Total Rooms
            </div>

          </div>

          <div className="room-status-grid">

            <div className="room-status-card available">

              <div className="room-status-icon">
                <i className="bi bi-door-open"></i>
              </div>

              <div>
                <span>Available</span>
                <strong>
                  {availableRooms.length}
                </strong>
              </div>

            </div>

            <div className="room-status-card occupied">

              <div className="room-status-icon">
                <i className="bi bi-person-fill"></i>
              </div>

              <div>
                <span>Occupied</span>
                <strong>
                  {occupiedRooms.length}
                </strong>
              </div>

            </div>

            <div className="room-status-card cleaning">

              <div className="room-status-icon">
                <i className="bi bi-stars"></i>
              </div>

              <div>
                <span>Cleaning</span>
                <strong>
                  {cleaningRooms.length}
                </strong>
              </div>

            </div>

            <div className="room-status-card maintenance">

              <div className="room-status-icon">
                <i className="bi bi-tools"></i>
              </div>

              <div>
                <span>Maintenance</span>
                <strong>
                  {maintenanceRooms.length}
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================
            GUEST OVERVIEW
        ======================================== */}

        <section className="front-office-section">

          <div className="front-office-section-header">

            <div>
              <h2>
                Guest Overview
              </h2>

              <p>
                Registered guests in the hotel system
              </p>
            </div>

            <div className="guest-total">
              {guests.length} Guests
            </div>

          </div>

          {guests.length === 0 ? (

            <div className="front-office-empty">
              <i className="bi bi-people"></i>
              <p>
                No guests registered yet.
              </p>
            </div>

          ) : (

            <div className="guest-overview-grid">

              {guests.map((guest) => (

                <div
                  className="guest-overview-card"
                  key={guest.id}
                >

                  <div className="guest-avatar large">
                    {(guest.name || 'G')
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="guest-overview-info">

                    <h3>
                      {guest.name || 'Guest'}
                    </h3>

                    <p>
                      <i className="bi bi-envelope"></i>
                      {guest.email || 'No email'}
                    </p>

                    <p>
                      <i className="bi bi-telephone"></i>
                      {guest.phone || 'No phone'}
                    </p>

                  </div>

                  <span className="guest-active">
                    {guest.status || 'Active'}
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>
    </MainLayout>
  )
}

export default FrontOffice