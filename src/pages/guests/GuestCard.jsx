import { useHotelData } from "../../context/HotelDataContext";

function GuestCard({
  guest,
  onViewDetails,
}) {

  const {
    deleteGuest,
    updateGuest,
  } = useHotelData();

  const handleDelete = (e) => {

    e.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete ${guest.name}?`
    );

    if (!confirmed) return;

    deleteGuest(guest.id);
  };

  const handleStatusChange = (e) => {

    e.stopPropagation();

    updateGuest(guest.id, {
      status: e.target.value,
    });
  };

  const handleViewDetails = (e) => {

    e.stopPropagation();

    if (onViewDetails) {
      onViewDetails(guest);
    }
  };

  const statusClass = String(
    guest.status || ""
  )
    .toLowerCase()
    .replace(/\s+/g, "-");

  const avatarLetter =
    guest.name?.charAt(0)?.toUpperCase() || "G";

  return (
    <div
      className="guest-card"
      onClick={() => {
        if (onViewDetails) {
          onViewDetails(guest);
        }
      }}
    >

      <div className="guest-card-header">

        <div className="guest-avatar">
          {avatarLetter}
        </div>

        <span
          className={`guest-status ${statusClass}`}
        >
          <span className="guest-status-dot"></span>
          {guest.status}
        </span>

      </div>

      <h3>
        {guest.name}
      </h3>

      <p>
        <i className="bi bi-envelope"></i>
        <span>{guest.email}</span>
      </p>

      <p>
        <i className="bi bi-telephone"></i>
        <span>{guest.phone}</span>
      </p>

      <div className="guest-room">

        <span>
          <i className="bi bi-door-open"></i>
          Room {guest.room || "Not Assigned"}
        </span>

      </div>

      {/* ACTIONS */}

      <div
        className="guest-card-actions"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <button
          type="button"
          className="guest-view-btn"
          onClick={handleViewDetails}
        >
          <i className="bi bi-eye"></i>
          View
        </button>

        <select
          className="guest-status-select"
          value={guest.status}
          onChange={handleStatusChange}
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          <option value="Reserved">
            Reserved
          </option>

          <option value="Checked In">
            Checked In
          </option>

          <option value="Checked Out">
            Checked Out
          </option>

        </select>

        <button
          type="button"
          className="guest-delete-btn"
          onClick={handleDelete}
          title="Delete Guest"
        >
          <i className="bi bi-trash"></i>
        </button>

      </div>

    </div>
  );
}

export default GuestCard;