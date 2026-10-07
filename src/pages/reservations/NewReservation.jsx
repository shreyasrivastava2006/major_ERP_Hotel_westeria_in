import { useState } from "react";

import { useHotelData } from "../../context/HotelDataContext";

function NewReservation({ onAdd }) {

  const {
    guests,
    rooms,
    updateRoomStatus,
  } = useHotelData();

  const [reservation, setReservation] = useState({
    guestId: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    status: "Pending",
    paymentStatus: "Pending",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !reservation.guestId ||
      !reservation.roomId ||
      !reservation.checkIn ||
      !reservation.checkOut
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (
      reservation.checkOut <=
      reservation.checkIn
    ) {
      alert(
        "Check-out date must be after check-in date."
      );
      return;
    }

    const selectedGuest = guests.find(
      (guest) =>
        String(guest.id) ===
        String(reservation.guestId)
    );

    const selectedRoom = rooms.find(
      (room) =>
        String(room.id) ===
        String(reservation.roomId)
    );

    if (!selectedGuest) {
      alert("Please select a valid guest.");
      return;
    }

    if (!selectedRoom) {
      alert("Please select a valid room.");
      return;
    }

    if (selectedRoom.status !== "Available") {
      alert(
        "This room is no longer available."
      );
      return;
    }

    const checkInDate =
      new Date(reservation.checkIn);

    const checkOutDate =
      new Date(reservation.checkOut);

    const nights = Math.ceil(
      (checkOutDate - checkInDate) /
        (1000 * 60 * 60 * 24)
    );

    const totalAmount =
      Number(selectedRoom.price || 0) *
      nights;

    const newReservation = {

      reservationNo:
        `RES-${Date.now()
          .toString()
          .slice(-6)}`,

      guestId: selectedGuest.id,

      guestName:
        selectedGuest.name,

      roomId: selectedRoom.id,

      roomNumber:
        selectedRoom.roomNumber,

      checkIn:
        reservation.checkIn,

      checkOut:
        reservation.checkOut,

      adults:
        Number(reservation.adults),

      children:
        Number(reservation.children),

      status:
        reservation.status,

      paymentStatus:
        reservation.paymentStatus,

      nights,

      roomPrice:
        Number(selectedRoom.price || 0),

      totalAmount,

      guest:
        selectedGuest.name,

      room:
        selectedRoom.roomNumber,

      guests:
        Number(reservation.adults) +
        Number(reservation.children),
    };

    /*
      Add reservation to central context
    */

    onAdd(newReservation);

    /*
      If reservation is not cancelled,
      mark room as occupied/reserved.
    */

    if (
      reservation.status !== "Cancelled"
    ) {
      updateRoomStatus(
        selectedRoom.id,
        "Occupied"
      );
    }

    /*
      Reset form
    */

    setReservation({
      guestId: "",
      roomId: "",
      checkIn: "",
      checkOut: "",
      adults: 1,
      children: 0,
      status: "Pending",
      paymentStatus: "Pending",
    });

    alert(
      "Reservation created successfully."
    );
  };

  return (
    <div className="new-reservation-card">

      {/* HEADER */}

      <div className="new-reservation-header">

        <div>

          <h2>
            New Reservation
          </h2>

          <p>
            Enter guest and stay details to create a booking
          </p>

        </div>

        <i className="bi bi-calendar-plus"></i>

      </div>

      {/* FORM */}

      <form onSubmit={handleSubmit}>

        <div className="reservation-form-grid">

          {/* GUEST */}

          <div className="form-group">

            <label>
              Guest *
            </label>

            <select
              name="guestId"
              value={reservation.guestId}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Guest
              </option>

              {guests.map((guest) => (

                <option
                  key={guest.id}
                  value={guest.id}
                >
                  {guest.name}
                </option>

              ))}

            </select>

          </div>

          {/* ROOM */}

          <div className="form-group">

            <label>
              Room *
            </label>

            <select
              name="roomId"
              value={reservation.roomId}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Available Room
              </option>

              {rooms
                .filter(
                  (room) =>
                    room.status ===
                    "Available"
                )
                .map((room) => (

                  <option
                    key={room.id}
                    value={room.id}
                  >
                    Room{" "}
                    {room.roomNumber} -{" "}
                    {room.roomType} - ₹
                    {Number(
                      room.price || 0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </option>

                ))}

            </select>

          </div>

          {/* CHECK IN */}

          <div className="form-group">

            <label>
              Check In *
            </label>

            <input
              type="date"
              name="checkIn"
              value={reservation.checkIn}
              onChange={handleChange}
              required
            />

          </div>

          {/* CHECK OUT */}

          <div className="form-group">

            <label>
              Check Out *
            </label>

            <input
              type="date"
              name="checkOut"
              value={reservation.checkOut}
              onChange={handleChange}
              required
            />

          </div>

          {/* ADULTS */}

          <div className="form-group">

            <label>
              Adults *
            </label>

            <input
              type="number"
              name="adults"
              min="1"
              value={reservation.adults}
              onChange={handleChange}
              required
            />

          </div>

          {/* CHILDREN */}

          <div className="form-group">

            <label>
              Children
            </label>

            <input
              type="number"
              name="children"
              min="0"
              value={reservation.children}
              onChange={handleChange}
            />

          </div>

          {/* STATUS */}

          <div className="form-group">

            <label>
              Status
            </label>

            <select
              name="status"
              value={reservation.status}
              onChange={handleChange}
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

          {/* PAYMENT STATUS */}

          <div className="form-group">

            <label>
              Payment Status
            </label>

            <select
              name="paymentStatus"
              value={
                reservation.paymentStatus
              }
              onChange={handleChange}
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Partial">
                Partial
              </option>

            </select>

          </div>

        </div>

        {/* FOOTER */}

        <div className="reservation-form-footer">

          <div className="reservation-note">

            <i className="bi bi-info-circle"></i>

            <span>
              Room charges are calculated automatically based on the selected dates.
            </span>

          </div>

          <button
            type="submit"
            className="save-reservation-btn"
          >

            <i className="bi bi-check-circle"></i>

            Save Reservation

          </button>

        </div>

      </form>

    </div>
  );
}

export default NewReservation;