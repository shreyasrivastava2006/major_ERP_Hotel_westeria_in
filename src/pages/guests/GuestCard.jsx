function GuestCard({ guest }) {
  return (
    <div className="guest-card">

      <div className="guest-card-header">

        <div className="guest-avatar">
          {guest.name.charAt(0)}
        </div>

        <span className={`guest-status ${guest.status.toLowerCase().replace(' ', '-')}`}>
          {guest.status}
        </span>

      </div>

      <h3>{guest.name}</h3>

      <p>
        <i className="bi bi-envelope"></i>
        {guest.email}
      </p>

      <p>
        <i className="bi bi-telephone"></i>
        {guest.phone}
      </p>

      <div className="guest-room">

        <span>
          <i className="bi bi-door-open"></i>
          Room {guest.room}
        </span>

      </div>

    </div>
  )
}

export default GuestCard