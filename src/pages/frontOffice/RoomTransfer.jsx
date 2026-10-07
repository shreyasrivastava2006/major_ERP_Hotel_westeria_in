import { useState } from 'react'

import MainLayout from '../../layouts/MainLayout'
import PageHeader from '../../components/layout/PageHeader'
import Breadcrumb from '../../components/layout/Breadcrumb'

import reservationsData from '../../data/reservations'
import roomsData from '../../data/rooms'

import { useHotel } from '../../context/HotelContext'

import './RoomTransfer.css'

const STORAGE_KEY = 'frontOfficeReservations'
const TRANSFER_KEY = 'roomTransfers'

function getReservations() {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved) {
    return JSON.parse(saved)
  }

  return reservationsData
}

function getTransfers() {
  const saved = localStorage.getItem(TRANSFER_KEY)

  if (saved) {
    return JSON.parse(saved)
  }

  return []
}

function RoomTransfer() {
  const { selectedHotel } = useHotel()

  const [reservations, setReservations] =
    useState(getReservations)

  const [transfers, setTransfers] =
    useState(getTransfers)

  const [formData, setFormData] = useState({
    reservationId: '',
    newRoomId: '',
    reason: '',
  })

  const [message, setMessage] = useState('')

  const hotelReservations = selectedHotel
    ? reservations.some(
        (reservation) => reservation.hotelId
      )
      ? reservations.filter(
          (reservation) =>
            reservation.hotelId === selectedHotel.id
        )
      : reservations
    : reservations

  const checkedInGuests =
    hotelReservations.filter(
      (reservation) =>
        reservation.status === 'Checked In'
    )

  const selectedReservation =
    reservations.find(
      (reservation) =>
        reservation.id ===
        Number(formData.reservationId)
    )

  const currentRoom = roomsData.find(
    (room) =>
      room.id === selectedReservation?.roomId
  )

  const availableRooms = roomsData.filter(
    (room) =>
      room.status === 'Available' &&
      room.id !== selectedReservation?.roomId
  )

  const newRoom = roomsData.find(
    (room) =>
      room.id === Number(formData.newRoomId)
  )

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setMessage('')

    if (name === 'reservationId') {
      setFormData((prev) => ({
        ...prev,
        reservationId: value,
        newRoomId: '',
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.reservationId ||
      !formData.newRoomId
    ) {
      setMessage(
        'Please select a guest and a new room.'
      )
      return
    }

    if (
      selectedReservation?.roomId ===
      Number(formData.newRoomId)
    ) {
      setMessage(
        'New room must be different from the current room.'
      )
      return
    }

    if (!selectedReservation || !newRoom) {
      setMessage(
        'Please select a valid guest and available room.'
      )
      return
    }

    const oldRoomNumber =
      currentRoom?.roomNumber ||
      selectedReservation.roomNumber ||
      '-'

    const newRoomNumber =
      newRoom.roomNumber || '-'

    const transferRecord = {
      id: Date.now(),
      reservationNo:
        selectedReservation.reservationNo,
      guestName:
        selectedReservation.guestName,
      oldRoom: oldRoomNumber,
      newRoom: newRoomNumber,
      reason:
        formData.reason ||
        'Room transfer requested',
      date: new Date()
        .toISOString()
        .split('T')[0],
      status: 'Completed',
      hotelId:
        selectedHotel?.id ||
        selectedReservation.hotelId ||
        null,
      hotelName:
        selectedHotel?.name || '',
    }

    const updatedTransfers = [
      transferRecord,
      ...transfers,
    ]

    setTransfers(updatedTransfers)

    localStorage.setItem(
      TRANSFER_KEY,
      JSON.stringify(updatedTransfers)
    )

    const updatedReservations =
      reservations.map((reservation) =>
        reservation.id ===
        Number(formData.reservationId)
          ? {
              ...reservation,
              roomId: Number(
                formData.newRoomId
              ),
              roomNumber: newRoomNumber,
            }
          : reservation
      )

    setReservations(updatedReservations)

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedReservations)
    )

    setMessage(
      `${selectedReservation.guestName} has been transferred from Room ${oldRoomNumber} to Room ${newRoomNumber}.`
    )

    setFormData({
      reservationId: '',
      newRoomId: '',
      reason: '',
    })
  }

  const handleClear = () => {
    setFormData({
      reservationId: '',
      newRoomId: '',
      reason: '',
    })

    setMessage('')
  }

  const hotelTransfers = selectedHotel
    ? transfers.some(
        (transfer) => transfer.hotelId
      )
      ? transfers.filter(
          (transfer) =>
            transfer.hotelId === selectedHotel.id
        )
      : transfers
    : transfers

  return (
    <MainLayout>

      <Breadcrumb
        items={['Front Office', 'Room Transfer']}
      />

      <PageHeader
        title="Room Transfer"
        subtitle={
          selectedHotel
            ? `Transfer guests between rooms at ${selectedHotel.name}`
            : 'Transfer checked-in guests to another available room'
        }
      />

      <div className="room-transfer-page">

        {selectedHotel && (
          <div className="room-transfer-hotel-bar">

            <div className="room-transfer-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="room-transfer-hotel-info">

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

        {message && (
          <div className="transfer-message">

            <i className="bi bi-check-circle"></i>

            <span>{message}</span>

            <button
              type="button"
              onClick={() => setMessage('')}
            >
              <i className="bi bi-x"></i>
            </button>

          </div>
        )}

        <div className="transfer-card">

          <div className="transfer-card-header">

            <div>
              <h2>Transfer Guest</h2>

              <p>
                Select a checked-in guest and assign
                another available room
              </p>
            </div>

            <div className="transfer-icon">
              <i className="bi bi-arrow-left-right"></i>
            </div>

          </div>

          <form
            className="transfer-form"
            onSubmit={handleSubmit}
          >

            <div className="form-section">

              <div className="section-title">

                <i className="bi bi-person"></i>

                <h3>Guest Information</h3>

              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Checked-In Guest <span>*</span>
                  </label>

                  <select
                    name="reservationId"
                    value={formData.reservationId}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Guest
                    </option>

                    {checkedInGuests.map(
                      (reservation) => (
                        <option
                          key={reservation.id}
                          value={reservation.id}
                        >
                          {reservation.reservationNo}
                          {' - '}
                          {reservation.guestName}
                        </option>
                      )
                    )}

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Reservation Number
                  </label>

                  <input
                    type="text"
                    value={
                      selectedReservation?.reservationNo ||
                      ''
                    }
                    placeholder="Reservation number"
                    readOnly
                  />

                </div>

              </div>

            </div>

            <div className="transfer-room-section">

              <div className="room-box current-room">

                <div className="room-box-icon">
                  <i className="bi bi-door-closed"></i>
                </div>

                <div className="room-box-content">

                  <span>Current Room</span>

                  <strong>
                    {currentRoom
                      ? `Room ${currentRoom.roomNumber}`
                      : selectedReservation?.roomNumber
                        ? `Room ${selectedReservation.roomNumber}`
                        : '--'}
                  </strong>

                  <small>
                    {currentRoom?.roomType ||
                      'Assigned Room'}
                  </small>

                </div>

              </div>

              <div className="transfer-arrow">

                <i className="bi bi-arrow-right"></i>

              </div>

              <div className="room-box new-room">

                <div className="room-box-icon">
                  <i className="bi bi-door-open"></i>
                </div>

                <div className="room-box-content">

                  <span>New Room</span>

                  <strong>
                    {newRoom
                      ? `Room ${newRoom.roomNumber}`
                      : '--'}
                  </strong>

                  <small>
                    {newRoom?.roomType ||
                      'Select available room'}
                  </small>

                </div>

              </div>

            </div>

            <div className="form-section">

              <div className="section-title">

                <i className="bi bi-building"></i>

                <h3>New Room Selection</h3>

              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Available Room <span>*</span>
                  </label>

                  <select
                    name="newRoomId"
                    value={formData.newRoomId}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select New Room
                    </option>

                    {availableRooms.map((room) => (
                      <option
                        key={room.id}
                        value={room.id}
                      >
                        Room {room.roomNumber}
                        {' - '}
                        {room.roomType}
                        {' - ₹'}
                        {Number(
                          room.price || 0
                        ).toLocaleString('en-IN')}
                      </option>
                    ))}

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Room Capacity
                  </label>

                  <input
                    type="text"
                    value={
                      newRoom?.capacity
                        ? `${newRoom.capacity} Guests`
                        : ''
                    }
                    placeholder="Room capacity"
                    readOnly
                  />

                </div>

              </div>

            </div>

            <div className="form-section">

              <div className="section-title">

                <i className="bi bi-chat-left-text"></i>

                <h3>Transfer Reason</h3>

              </div>

              <div className="form-group full-width">

                <label>
                  Reason
                </label>

                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Enter reason for room transfer..."
                  rows="4"
                ></textarea>

              </div>

            </div>

            <div className="transfer-actions">

              <button
                type="button"
                className="clear-transfer-btn"
                onClick={handleClear}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                Clear
              </button>

              <button
                type="submit"
                className="transfer-btn"
              >
                <i className="bi bi-arrow-left-right"></i>
                Confirm Transfer
              </button>

            </div>

          </form>

        </div>

        {hotelTransfers.length > 0 && (
          <div className="transfer-history-card">

            <div className="history-header">

              <div>
                <h2>Transfer History</h2>

                <p>
                  Recently completed room transfers
                </p>
              </div>

              <span>
                {hotelTransfers.length}
              </span>

            </div>

            <div className="transfer-history-list">

              {hotelTransfers.map((transfer) => (
                <div
                  className="transfer-history-item"
                  key={transfer.id}
                >

                  <div className="history-avatar">
                    <i className="bi bi-arrow-left-right"></i>
                  </div>

                  <div className="history-info">

                    <h4>
                      {transfer.guestName}
                    </h4>

                    <p>
                      {transfer.reservationNo}
                      {' • '}
                      Room {transfer.oldRoom}
                      {' → '}
                      Room {transfer.newRoom}
                    </p>

                    <small>
                      {transfer.reason}
                    </small>

                  </div>

                  <div className="transfer-completed">
                    Completed
                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

    </MainLayout>
  )
}

export default RoomTransfer