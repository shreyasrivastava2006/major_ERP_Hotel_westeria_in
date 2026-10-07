import { useState } from 'react'

import MainLayout from '../../layouts/MainLayout'
import PageHeader from '../../components/layout/PageHeader'
import Breadcrumb from '../../components/layout/Breadcrumb'

import { useHotel } from '../../context/HotelContext'
import { useHotelData } from '../../context/HotelDataContext'

import './GuestRequests.css'

const DEFAULT_REQUESTS = [
  {
    id: 'REQ-1',
    guestId: null,
    guest: 'Rahul Sharma',
    room: '101',
    requestType: 'Room Service',
    request: 'Extra towels required',
    priority: 'Normal',
    status: 'Pending',
    date: '2026-09-28',
    hotelId: null,
  },
  {
    id: 'REQ-2',
    guestId: null,
    guest: 'Priya Verma',
    room: '201',
    requestType: 'Housekeeping',
    request: 'Room cleaning required',
    priority: 'High',
    status: 'In Progress',
    date: '2026-09-28',
    hotelId: null,
  },
]

function GuestRequests() {
  const { selectedHotel } = useHotel()

  const {
    guests,
    reservations,
    rooms,
  } = useHotelData()

  const [requests, setRequests] =
    useState(DEFAULT_REQUESTS)

  const [showForm, setShowForm] =
    useState(false)

  const [formData, setFormData] = useState({
    guestId: '',
    roomId: '',
    requestType: '',
    request: '',
    priority: 'Normal',
  })

  const [message, setMessage] =
    useState('')

  /* =========================================
     HOTEL GUESTS
  ========================================= */

  const hotelGuests = selectedHotel
    ? guests.some(
        (guest) => guest.hotelId
      )
      ? guests.filter(
          (guest) =>
            String(guest.hotelId) ===
            String(selectedHotel.id)
        )
      : guests
    : guests

  /* =========================================
     HOTEL RESERVATIONS
  ========================================= */

  const hotelReservations = selectedHotel
    ? reservations.some(
        (reservation) =>
          reservation.hotelId
      )
      ? reservations.filter(
          (reservation) =>
            String(reservation.hotelId) ===
            String(selectedHotel.id)
        )
      : reservations
    : reservations

  /* =========================================
     HOTEL ROOMS
  ========================================= */

  const hotelRooms = selectedHotel
    ? rooms.some(
        (room) => room.hotelId
      )
      ? rooms.filter(
          (room) =>
            String(room.hotelId) ===
            String(selectedHotel.id)
        )
      : rooms
    : rooms

  /* =========================================
     HOTEL REQUESTS
  ========================================= */

  const hotelRequests = selectedHotel
    ? requests.some(
        (request) => request.hotelId
      )
      ? requests.filter(
          (request) =>
            String(request.hotelId) ===
            String(selectedHotel.id)
        )
      : requests
    : requests

  /* =========================================
     FORM CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target

    setMessage('')

    if (name === 'guestId') {
      const guestReservations =
        hotelReservations.filter(
          (reservation) =>
            String(reservation.guestId) ===
              String(value) &&
            reservation.status === 'Checked In'
        )

      const activeReservation =
        guestReservations[0]

      setFormData((prev) => ({
        ...prev,
        guestId: value,
        roomId:
          activeReservation?.roomId
            ? String(
                activeReservation.roomId
              )
            : '',
      }))

      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* =========================================
     SELECTED GUEST
  ========================================= */

  const selectedGuest = hotelGuests.find(
    (guest) =>
      String(guest.id) ===
      String(formData.guestId)
  )

  /* =========================================
     SELECTED ROOM
  ========================================= */

  const selectedRoom = hotelRooms.find(
    (room) =>
      String(room.id) ===
      String(formData.roomId)
  )

  /* =========================================
     ADD REQUEST
  ========================================= */

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.guestId ||
      !formData.requestType ||
      !formData.request
    ) {
      setMessage(
        'Please fill all required fields.'
      )
      return
    }

    const newRequest = {
      id: `REQ-${Date.now()}`,

      guestId:
        selectedGuest?.id || null,

      guest:
        selectedGuest?.name || '',

      room:
        selectedRoom?.roomNumber || '-',

      roomId:
        selectedRoom?.id || null,

      requestType:
        formData.requestType,

      request:
        formData.request,

      priority:
        formData.priority,

      status: 'Pending',

      date: new Date()
        .toISOString()
        .split('T')[0],

      hotelId:
        selectedHotel?.id || null,

      hotelName:
        selectedHotel?.name || '',
    }

    setRequests((prev) => [
      newRequest,
      ...prev,
    ])

    setMessage(
      'Guest request added successfully.'
    )

    setFormData({
      guestId: '',
      roomId: '',
      requestType: '',
      request: '',
      priority: 'Normal',
    })

    setShowForm(false)
  }

  /* =========================================
     UPDATE REQUEST STATUS
  ========================================= */

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((request) =>
        String(request.id) ===
        String(id)
          ? {
              ...request,
              status,
            }
          : request
      )
    )
  }

  /* =========================================
     DELETE REQUEST
  ========================================= */

  const deleteRequest = (id) => {
    setRequests((prev) =>
      prev.filter(
        (request) =>
          String(request.id) !==
          String(id)
      )
    )
  }

  /* =========================================
     SUMMARY COUNTS
  ========================================= */

  const pendingCount =
    hotelRequests.filter(
      (request) =>
        request.status === 'Pending'
    ).length

  const progressCount =
    hotelRequests.filter(
      (request) =>
        request.status === 'In Progress'
    ).length

  const completedCount =
    hotelRequests.filter(
      (request) =>
        request.status === 'Completed'
    ).length

  /* =========================================
     RENDER
  ========================================= */

  return (
    <MainLayout>

      <Breadcrumb
        items={[
          'Front Office',
          'Guest Requests',
        ]}
      />

      <PageHeader
        title="Guest Requests"
        subtitle={
          selectedHotel
            ? `Manage guest requests for ${selectedHotel.name}`
            : 'Manage guest requests and service requirements'
        }
      />

      <div className="guest-requests-page">

        {/* SELECTED HOTEL */}

        {selectedHotel && (
          <div className="guest-request-hotel-bar">

            <div className="guest-request-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="guest-request-hotel-info">

              <span>
                SELECTED PROPERTY
              </span>

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

        {/* MESSAGE */}

        {message && (
          <div className="request-message">

            <i className="bi bi-check-circle"></i>

            <span>
              {message}
            </span>

            <button
              type="button"
              onClick={() =>
                setMessage('')
              }
            >
              <i className="bi bi-x"></i>
            </button>

          </div>
        )}

        {/* TOP */}

        <div className="request-top">

          <div className="request-summary">

            <div className="summary-card">

              <div className="summary-icon pending">
                <i className="bi bi-clock"></i>
              </div>

              <div>
                <span>Pending</span>
                <strong>
                  {pendingCount}
                </strong>
              </div>

            </div>

            <div className="summary-card">

              <div className="summary-icon progress">
                <i className="bi bi-arrow-repeat"></i>
              </div>

              <div>
                <span>In Progress</span>
                <strong>
                  {progressCount}
                </strong>
              </div>

            </div>

            <div className="summary-card">

              <div className="summary-icon completed">
                <i className="bi bi-check-circle"></i>
              </div>

              <div>
                <span>Completed</span>
                <strong>
                  {completedCount}
                </strong>
              </div>

            </div>

          </div>

          <button
            type="button"
            className="new-request-btn"
            onClick={() => {
              setShowForm(!showForm)
              setMessage('')
            }}
          >
            <i className="bi bi-plus-lg"></i>

            {showForm
              ? 'Close Form'
              : 'New Request'}
          </button>

        </div>

        {/* NEW REQUEST FORM */}

        {showForm && (
          <div className="request-form-card">

            <div className="form-card-header">

              <div>

                <h2>
                  New Guest Request
                </h2>

                <p>
                  Add a service or special
                  request for a guest
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form
              className="request-form"
              onSubmit={handleSubmit}
            >

              <div className="form-grid">

                {/* GUEST */}

                <div className="form-group">

                  <label>
                    Guest <span>*</span>
                  </label>

                  <select
                    name="guestId"
                    value={
                      formData.guestId
                    }
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Guest
                    </option>

                    {hotelGuests.map(
                      (guest) => (
                        <option
                          key={guest.id}
                          value={guest.id}
                        >
                          {guest.name}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* ROOM */}

                <div className="form-group">

                  <label>
                    Room Number
                  </label>

                  <input
                    type="text"
                    value={
                      selectedRoom
                        ? `Room ${selectedRoom.roomNumber}`
                        : ''
                    }
                    placeholder="Room number"
                    readOnly
                  />

                </div>

                {/* REQUEST TYPE */}

                <div className="form-group">

                  <label>
                    Request Type{' '}
                    <span>*</span>
                  </label>

                  <select
                    name="requestType"
                    value={
                      formData.requestType
                    }
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Request Type
                    </option>

                    <option value="Room Service">
                      Room Service
                    </option>

                    <option value="Housekeeping">
                      Housekeeping
                    </option>

                    <option value="Laundry">
                      Laundry
                    </option>

                    <option value="Maintenance">
                      Maintenance
                    </option>

                    <option value="Food & Beverage">
                      Food & Beverage
                    </option>

                    <option value="Transport">
                      Transport
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* PRIORITY */}

                <div className="form-group">

                  <label>
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={
                      formData.priority
                    }
                    onChange={handleChange}
                  >

                    <option value="Normal">
                      Normal
                    </option>

                    <option value="High">
                      High
                    </option>

                    <option value="Urgent">
                      Urgent
                    </option>

                  </select>

                </div>

              </div>

              {/* REQUEST DETAILS */}

              <div className="form-group full-width">

                <label>
                  Request Details{' '}
                  <span>*</span>
                </label>

                <textarea
                  name="request"
                  value={
                    formData.request
                  }
                  onChange={handleChange}
                  placeholder="Describe the guest request..."
                  rows="4"
                  required
                ></textarea>

              </div>

              {/* BUTTONS */}

              <div className="request-form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-request-btn"
                >
                  <i className="bi bi-check-lg"></i>
                  Add Request
                </button>

              </div>

            </form>

          </div>
        )}

        {/* REQUEST LIST */}

        <div className="requests-card">

          <div className="requests-card-header">

            <div>

              <h2>
                Guest Request List
              </h2>

              <p>
                View and manage all guest
                requests
              </p>

            </div>

            <span className="request-count">
              {hotelRequests.length}{' '}
              Requests
            </span>

          </div>

          {hotelRequests.length === 0 ? (

            <div className="empty-requests">

              <i className="bi bi-inbox"></i>

              <h3>
                No Guest Requests
              </h3>

              <p>
                There are currently no
                guest requests.
              </p>

            </div>

          ) : (

            <div className="requests-table-wrapper">

              <table className="requests-table">

                <thead>

                  <tr>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Request Type</th>
                    <th>Request</th>
                    <th>Priority</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {hotelRequests.map(
                    (request) => (
                      <tr
                        key={request.id}
                      >

                        <td>

                          <div className="guest-cell">

                            <div className="guest-avatar">
                              <i className="bi bi-person"></i>
                            </div>

                            <strong>
                              {request.guest}
                            </strong>

                          </div>

                        </td>

                        <td>

                          <span className="room-number">
                            Room {request.room}
                          </span>

                        </td>

                        <td>
                          {request.requestType}
                        </td>

                        <td>

                          <span className="request-text">
                            {request.request}
                          </span>

                        </td>

                        <td>

                          <span
                            className={`priority-badge ${request.priority.toLowerCase()}`}
                          >
                            {request.priority}
                          </span>

                        </td>

                        <td>
                          {request.date}
                        </td>

                        <td>

                          <select
                            className={`status-select ${request.status
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                '-'
                              )}`}
                            value={
                              request.status
                            }
                            onChange={(e) =>
                              updateStatus(
                                request.id,
                                e.target.value
                              )
                            }
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Completed">
                              Completed
                            </option>

                          </select>

                        </td>

                        <td>

                          <button
                            type="button"
                            className="delete-request-btn"
                            onClick={() =>
                              deleteRequest(
                                request.id
                              )
                            }
                            title="Delete Request"
                          >
                            <i className="bi bi-trash3"></i>
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </MainLayout>
  )
}

export default GuestRequests