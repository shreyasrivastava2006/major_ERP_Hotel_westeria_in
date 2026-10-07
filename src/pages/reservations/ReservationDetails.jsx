function ReservationDetails({
  reservation,
  onClose,
}) {

  if (!reservation) {
    return null;
  }

  const statusClass =
    reservation.status
      ? reservation.status
          .toLowerCase()
          .replace(/\s+/g, "-")
      : "pending";

  return (
    <div
      className="reservation-details-overlay"
      onClick={onClose}
    >

      <div
        className="reservation-details"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="reservation-details-header">

          <div>

            <span className="details-label">
              RESERVATION
            </span>

            <h2>
              Reservation Details
            </h2>

            <p>
              {reservation.reservationNo ||
                `RES-${reservation.id}`}
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
          >
            <i className="bi bi-x-lg"></i>
          </button>

        </div>

        {/* BODY */}

        <div className="reservation-details-body">

          <div className="detail-row">

            <strong>
              Guest Name
            </strong>

            <span>
              {reservation.guestName ||
                reservation.guest ||
                "Not Available"}
            </span>

          </div>

          <div className="detail-row">

            <strong>
              Room Number
            </strong>

            <span>
              Room{" "}
              {reservation.roomNumber ||
                reservation.room ||
                "Not Assigned"}
            </span>

          </div>

          <div className="detail-row">

            <strong>
              Check In
            </strong>

            <span>
              {reservation.checkIn ||
                "-"}
            </span>

          </div>

          <div className="detail-row">

            <strong>
              Check Out
            </strong>

            <span>
              {reservation.checkOut ||
                "-"}
            </span>

          </div>

          <div className="detail-row">

            <strong>
              Nights
            </strong>

            <span>
              {reservation.nights ||
                0}
            </span>

          </div>

          <div className="detail-row">

            <strong>
              Adults
            </strong>

            <span>
              {reservation.adults ||
                0}
            </span>

          </div>

          <div className="detail-row">

            <strong>
              Children
            </strong>

            <span>
              {reservation.children ||
                0}
            </span>

          </div>

          <div className="detail-row">

            <strong>
              Payment Status
            </strong>

            <span>
              {reservation.paymentStatus ||
                "Pending"}
            </span>

          </div>

          <div className="detail-row">

            <strong>
              Reservation Status
            </strong>

            <span
              className={`details-status ${statusClass}`}
            >
              {reservation.status ||
                "Pending"}
            </span>

          </div>

          <div className="detail-row total-row">

            <strong>
              Total Amount
            </strong>

            <span>
              ₹
              {Number(
                reservation.totalAmount ||
                  0
              ).toLocaleString("en-IN")}
            </span>

          </div>

        </div>

        {/* FOOTER */}

        <div className="reservation-details-footer">

          <button
            type="button"
            className="close-details-btn"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReservationDetails;