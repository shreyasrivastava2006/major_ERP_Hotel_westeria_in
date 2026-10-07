function GuestDetails({ guest, onClose }) {
  if (!guest) return null

  return (
    <div className="guest-details-overlay">

      <div className="guest-details">

        <div className="guest-details-header">
          <div>
            <span className="guest-avatar large">
              {guest.name.charAt(0)}
            </span>

            <h2>{guest.name}</h2>
          </div>

          <button onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="guest-details-body">

          <p>
            <strong>Email:</strong>
            <span>{guest.email}</span>
          </p>

          <p>
            <strong>Phone:</strong>
            <span>{guest.phone}</span>
          </p>

          <p>
            <strong>Room:</strong>
            <span>Room {guest.room}</span>
          </p>

          <p>
            <strong>Status:</strong>
            <span>{guest.status}</span>
          </p>

        </div>

      </div>

    </div>
  )
}

export default GuestDetails