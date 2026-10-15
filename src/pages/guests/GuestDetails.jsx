import { useEffect, useState } from "react";
import { useHotelData } from "../../context/HotelDataContext";

function GuestDetails({
  guest,
  onClose,
}) {

  const {
    updateGuest,
    deleteGuest,
  } = useHotelData();

  const [isEditing, setIsEditing] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    room: "",
    status: "Reserved",
  });

  useEffect(() => {

    if (!guest) return;

    setFormData({
      name: guest.name || "",
      email: guest.email || "",
      phone: guest.phone || "",
      room: guest.room || "",
      status: guest.status || "Reserved",
    });

  }, [guest]);

  if (!guest) return null;

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.room.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    updateGuest(guest.id, {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      room: formData.room.trim(),
      status: formData.status,
    });

    setIsEditing(false);

    alert("Guest updated successfully.");
  };

  const handleDelete = () => {

    const confirmed = window.confirm(
      `Are you sure you want to delete ${guest.name}?`
    );

    if (!confirmed) return;

    deleteGuest(guest.id);

    onClose();
  };

  const avatarLetter =
    guest.name?.charAt(0)?.toUpperCase() || "G";

  const statusClass = String(
    guest.status || ""
  )
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <div
      className="guest-details-overlay"
      onClick={onClose}
    >

      <div
        className="guest-details"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="guest-details-header">

          <div>

            <div className="guest-details-profile">

              <div className="guest-avatar large">
                {avatarLetter}
              </div>

              <div>

                <span className="guest-details-label">
                  {isEditing
                    ? "EDIT GUEST"
                    : "GUEST PROFILE"}
                </span>

                <h2>
                  {isEditing
                    ? formData.name
                    : guest.name}
                </h2>

              </div>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="bi bi-x-lg"></i>
          </button>

        </div>

        {/* EDIT FORM */}

        {isEditing ? (

          <div className="guest-edit-form">

            <div className="guest-edit-group">

              <label>
                Guest Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            <div className="guest-edit-group">

              <label>
                Email <span>*</span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            <div className="guest-edit-group">

              <label>
                Phone <span>*</span>
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            <div className="guest-edit-group">

              <label>
                Room Number <span>*</span>
              </label>

              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
              />

            </div>

            <div className="guest-edit-group">

              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
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

            </div>

            <div className="guest-edit-actions">

              <button
                type="button"
                className="guest-cancel-edit-btn"
                onClick={() =>
                  setIsEditing(false)
                }
              >
                <i className="bi bi-x-circle"></i>
                Cancel
              </button>

              <button
                type="button"
                className="guest-save-btn"
                onClick={handleSave}
              >
                <i className="bi bi-check-circle"></i>
                Save Changes
              </button>

            </div>

          </div>

        ) : (

          <>
            {/* DETAILS */}

            <div className="guest-details-body">

              <div className="guest-detail-item">

                <span>
                  <i className="bi bi-envelope"></i>
                  Email
                </span>

                <strong>
                  {guest.email}
                </strong>

              </div>

              <div className="guest-detail-item">

                <span>
                  <i className="bi bi-telephone"></i>
                  Phone
                </span>

                <strong>
                  {guest.phone}
                </strong>

              </div>

              <div className="guest-detail-item">

                <span>
                  <i className="bi bi-door-open"></i>
                  Room
                </span>

                <strong>
                  Room {guest.room || "Not Assigned"}
                </strong>

              </div>

              <div className="guest-detail-item">

                <span>
                  <i className="bi bi-person-check"></i>
                  Status
                </span>

                <span
                  className={`guest-status ${statusClass}`}
                >
                  <span className="guest-status-dot"></span>
                  {guest.status}
                </span>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="guest-details-actions">

              <button
                type="button"
                className="guest-edit-btn"
                onClick={() =>
                  setIsEditing(true)
                }
              >
                <i className="bi bi-pencil"></i>
                Edit Guest
              </button>

              <button
                type="button"
                className="guest-delete-action-btn"
                onClick={handleDelete}
              >
                <i className="bi bi-trash"></i>
                Delete Guest
              </button>

            </div>

            <button
              type="button"
              className="guest-details-close-btn"
              onClick={onClose}
            >
              Close
            </button>

          </>

        )}

      </div>

    </div>
  );
}

export default GuestDetails;