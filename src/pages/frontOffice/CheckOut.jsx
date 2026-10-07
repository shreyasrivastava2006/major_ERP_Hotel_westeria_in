import { useState } from 'react'

import MainLayout from '../../layouts/MainLayout'
import PageHeader from '../../components/layout/PageHeader'
import Breadcrumb from '../../components/layout/Breadcrumb'

import { useHotel } from '../../context/HotelContext'
import { useHotelData } from '../../context/HotelDataContext'

import './CheckOut.css'

function CheckOut() {
  const { selectedHotel } = useHotel()

  const {
    reservations,
    guests,
    rooms,
    updateReservation,
    updateRoomStatus,
  } = useHotelData()

  const [formData, setFormData] = useState({
    reservationId: '',
    checkOutDate: new Date()
      .toISOString()
      .split('T')[0],
    paymentMethod: 'Cash',
    remarks: '',
  })

  const [checkedOutGuests, setCheckedOutGuests] =
    useState([])

  const [message, setMessage] = useState('')

  /* =========================================
     HOTEL RESERVATIONS
  ========================================= */

  const hotelReservations = selectedHotel
    ? reservations.some(
        (reservation) => reservation.hotelId
      )
      ? reservations.filter(
          (reservation) =>
            String(reservation.hotelId) ===
            String(selectedHotel.id)
        )
      : reservations
    : reservations

  /* =========================================
     CHECKED-IN GUESTS
  ========================================= */

  const checkedInReservations =
    hotelReservations.filter(
      (reservation) =>
        reservation.status === 'Checked In'
    )

  /* =========================================
     SELECTED RESERVATION
  ========================================= */

  const selectedReservation =
    reservations.find(
      (reservation) =>
        String(reservation.id) ===
        String(formData.reservationId)
    )

  /* =========================================
     SELECTED GUEST
  ========================================= */

  const selectedGuest = guests.find(
    (guest) =>
      String(guest.id) ===
      String(selectedReservation?.guestId)
  )

  /* =========================================
     SELECTED ROOM
  ========================================= */

  const selectedRoom = rooms.find(
    (room) =>
      String(room.id) ===
      String(selectedReservation?.roomId)
  )

  /* =========================================
     FORM CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setMessage('')
  }

  /* =========================================
     CALCULATE NIGHTS
  ========================================= */

  const calculateNights = () => {
    if (
      !selectedReservation?.checkIn ||
      !formData.checkOutDate
    ) {
      return 0
    }

    const checkIn = new Date(
      selectedReservation.checkIn
    )

    const checkOut = new Date(
      formData.checkOutDate
    )

    const difference =
      checkOut.getTime() -
      checkIn.getTime()

    return Math.max(
      1,
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      )
    )
  }

  const nights = calculateNights()

  /* =========================================
     ROOM PRICE
  ========================================= */

  const roomPrice = Number(
    selectedRoom?.price || 0
  )

  const roomAmount =
    roomPrice > 0
      ? roomPrice * nights
      : Number(
          selectedReservation?.totalAmount || 0
        )

  /* =========================================
     CHECK-OUT
  ========================================= */

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.reservationId) {
      setMessage(
        'Please select a checked-in guest.'
      )
      return
    }

    if (!selectedReservation) {
      setMessage(
        'Selected reservation could not be found.'
      )
      return
    }

    const checkInDate = new Date(
      selectedReservation.checkIn
    )

    const checkOutDate = new Date(
      formData.checkOutDate
    )

    if (checkOutDate < checkInDate) {
      setMessage(
        'Check-out date cannot be before the check-in date.'
      )
      return
    }

    if (
      selectedRoom &&
      selectedRoom.status !== 'Occupied'
    ) {
      setMessage(
        'This room is not currently marked as Occupied.'
      )
      return
    }

    const guestName =
      selectedGuest?.name ||
      selectedReservation.guestName ||
      'Guest'

    const roomNumber =
      selectedRoom?.roomNumber ||
      selectedReservation.roomNumber ||
      '-'

    /* =========================================
       UPDATE RESERVATION
    ========================================= */

    updateReservation(
      selectedReservation.id,
      {
        status: 'Checked Out',
        paymentStatus: 'Paid',
        checkOut: formData.checkOutDate,
        totalAmount: roomAmount,
        paymentMethod:
          formData.paymentMethod,
        remarks: formData.remarks,
      }
    )

    /* =========================================
       MAKE ROOM AVAILABLE
    ========================================= */

    if (selectedRoom) {
      updateRoomStatus(
        selectedRoom.id,
        'Available'
      )
    }

    /* =========================================
       RECENT CHECK-OUT RECORD
    ========================================= */

    const checkoutRecord = {
      id: Date.now(),
      reservationId:
        selectedReservation.id,
      reservationNo:
        selectedReservation.reservationNo ||
        '-',
      guestName,
      roomNumber,
      checkIn:
        selectedReservation.checkIn || '',
      checkOut:
        formData.checkOutDate,
      nights,
      amount: roomAmount,
      paymentMethod:
        formData.paymentMethod,
      remarks: formData.remarks,
      status: 'Checked Out',
      hotelId:
        selectedHotel?.id ||
        selectedReservation.hotelId ||
        null,
      hotelName:
        selectedHotel?.name || '',
    }

    setCheckedOutGuests((prev) => [
      checkoutRecord,
      ...prev,
    ])

    setMessage(
      `${guestName} has been successfully checked out. Room ${roomNumber} is now Available.`
    )

    /* =========================================
       RESET FORM
    ========================================= */

    setFormData({
      reservationId: '',
      checkOutDate: new Date()
        .toISOString()
        .split('T')[0],
      paymentMethod: 'Cash',
      remarks: '',
    })
  }

  /* =========================================
     CLEAR FORM
  ========================================= */

  const handleClear = () => {
    setFormData({
      reservationId: '',
      checkOutDate: new Date()
        .toISOString()
        .split('T')[0],
      paymentMethod: 'Cash',
      remarks: '',
    })

    setMessage('')
  }

  return (
    <MainLayout>

      <Breadcrumb
        items={[
          'Front Office',
          'Check-Out',
        ]}
      />

      <PageHeader
        title="Guest Check-Out"
        subtitle={
          selectedHotel
            ? `Complete guest departures for ${selectedHotel.name}`
            : 'Check out guests and complete their stay'
        }
      />

      <div className="checkout-page">

        {/* SELECTED HOTEL */}

        {selectedHotel && (
          <div className="checkout-hotel-bar">

            <div className="checkout-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="checkout-hotel-info">

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

        {/* MAIN CARD */}

        <div className="checkout-card">

          <div className="checkout-card-header">

            <div>
              <h2>
                Check-Out Guest
              </h2>

              <p>
                Select a checked-in guest and complete
                the checkout process
              </p>
            </div>

            <div className="checkout-icon">
              <i className="bi bi-box-arrow-right"></i>
            </div>

          </div>

          {/* MESSAGE */}

          {message && (
            <div className="checkout-message">

              <i className="bi bi-info-circle"></i>

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

          {/* FORM */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            {/* GUEST & RESERVATION */}

            <div className="form-section">

              <div className="section-title">

                <i className="bi bi-person-check"></i>

                <h3>
                  Guest & Reservation
                </h3>

              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Checked-In Guest{' '}
                    <span>*</span>
                  </label>

                  <select
                    name="reservationId"
                    value={
                      formData.reservationId
                    }
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Guest
                    </option>

                    {checkedInReservations.map(
                      (reservation) => (
                        <option
                          key={reservation.id}
                          value={reservation.id}
                        >
                          {reservation.reservationNo ||
                            'Reservation'}
                          {' - '}
                          {reservation.guestName ||
                            'Guest'}
                        </option>
                      )
                    )}

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Check-Out Date{' '}
                    <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="checkOutDate"
                    value={
                      formData.checkOutDate
                    }
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Guest Name
                  </label>

                  <input
                    type="text"
                    value={
                      selectedGuest?.name ||
                      selectedReservation?.guestName ||
                      ''
                    }
                    placeholder="Guest name"
                    readOnly
                  />

                </div>

                <div className="form-group">

                  <label>
                    Room Number
                  </label>

                  <input
                    type="text"
                    value={
                      selectedRoom
                        ? `Room ${selectedRoom.roomNumber}`
                        : selectedReservation
                          ? `Room ${
                              selectedReservation.roomNumber ||
                              ''
                            }`
                          : ''
                    }
                    placeholder="Room number"
                    readOnly
                  />

                </div>

              </div>

            </div>

            {/* BILLING */}

            <div className="form-section">

              <div className="section-title">

                <i className="bi bi-receipt"></i>

                <h3>
                  Stay & Billing Details
                </h3>

              </div>

              <div className="billing-summary">

                <div className="billing-item">

                  <span>
                    Check-In
                  </span>

                  <strong>
                    {selectedReservation?.checkIn ||
                      '--'}
                  </strong>

                </div>

                <div className="billing-item">

                  <span>
                    Check-Out
                  </span>

                  <strong>
                    {formData.checkOutDate}
                  </strong>

                </div>

                <div className="billing-item">

                  <span>
                    Total Nights
                  </span>

                  <strong>
                    {selectedReservation
                      ? nights
                      : '--'}
                  </strong>

                </div>

                <div className="billing-item total">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    {selectedReservation
                      ? `₹${roomAmount.toLocaleString(
                          'en-IN'
                        )}`
                      : '₹0'}
                  </strong>

                </div>

              </div>

            </div>

            {/* PAYMENT */}

            <div className="form-section">

              <div className="section-title">

                <i className="bi bi-credit-card"></i>

                <h3>
                  Payment Information
                </h3>

              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Payment Method
                  </label>

                  <select
                    name="paymentMethod"
                    value={
                      formData.paymentMethod
                    }
                    onChange={handleChange}
                  >

                    <option value="Cash">
                      Cash
                    </option>

                    <option value="Card">
                      Card
                    </option>

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Payment Status
                  </label>

                  <input
                    type="text"
                    value={
                      selectedReservation
                        ? 'Paid'
                        : 'Pending'
                    }
                    readOnly
                  />

                </div>

              </div>

            </div>

            {/* REMARKS */}

            <div className="form-section">

              <div className="section-title">

                <i className="bi bi-chat-left-text"></i>

                <h3>
                  Additional Information
                </h3>

              </div>

              <div className="form-group full-width">

                <label>
                  Remarks
                </label>

                <textarea
                  name="remarks"
                  value={
                    formData.remarks
                  }
                  onChange={handleChange}
                  placeholder="Enter checkout remarks..."
                  rows="4"
                ></textarea>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="checkout-actions">

              <button
                type="button"
                className="clear-btn"
                onClick={handleClear}
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                Clear
              </button>

              <button
                type="submit"
                className="checkout-btn"
                disabled={
                  checkedInReservations.length ===
                  0
                }
              >
                <i className="bi bi-box-arrow-right"></i>
                Confirm Check-Out
              </button>

            </div>

          </form>

        </div>

        {/* RECENT CHECK-OUTS */}

        {checkedOutGuests.length > 0 && (
          <div className="checkedout-card">

            <div className="checkedout-header">

              <div>
                <h2>
                  Recent Check-Outs
                </h2>

                <p>
                  Guests who have completed their stay
                </p>
              </div>

              <span>
                {checkedOutGuests.length}
              </span>

            </div>

            <div className="checkedout-list">

              {checkedOutGuests.map(
                (guest) => (
                  <div
                    className="checkedout-item"
                    key={guest.id}
                  >

                    <div className="guest-avatar">
                      {guest.guestName
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="guest-info">

                      <h4>
                        {guest.guestName}
                      </h4>

                      <p>
                        {guest.reservationNo}
                        {' • '}
                        Room {guest.roomNumber}
                        {' • '}
                        {guest.nights} night
                        {guest.nights !== 1
                          ? 's'
                          : ''}
                      </p>

                    </div>

                    <div className="checkout-status">
                      Checked Out
                    </div>

                  </div>
                )
              )}

            </div>

          </div>
        )}

      </div>

    </MainLayout>
  )
}

export default CheckOut