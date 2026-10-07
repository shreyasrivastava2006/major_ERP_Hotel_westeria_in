// src/pages/rooms/RoomDetails.jsx

import { useEffect, useState } from "react";
import { useHotelData } from "../../context/HotelDataContext";

function RoomDetails({ room, onClose }) {
  const {
    updateRoom,
    updateRoomStatus,
    deleteRoom,
  } = useHotelData();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    number: "",
    type: "",
    floor: "",
    price: "",
    status: "Available",
  });

  useEffect(() => {
    if (room) {
      setFormData({
        number: room.number || "",
        type: room.type || "Deluxe Room",
        floor: room.floor || "",
        price: room.price || "",
        status: room.status || "Available",
      });
    }
  }, [room]);

  if (!room) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (
      !formData.number ||
      !formData.floor ||
      !formData.price
    ) {
      alert("Please fill all required fields.");
      return;
    }

    updateRoom(room.id, {
      number: formData.number,
      type: formData.type,
      floor: formData.floor,
      price: Number(formData.price),
      status: formData.status,
    });

    setIsEditing(false);
    alert("Room updated successfully.");
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;

    updateRoomStatus(room.id, newStatus);

    setFormData((prev) => ({
      ...prev,
      status: newStatus,
    }));
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete Room ${room.number}?`
    );

    if (!confirmed) return;

    deleteRoom(room.id);
    onClose();
  };

  const displayPrice =
    typeof formData.price === "number"
      ? `₹${formData.price.toLocaleString("en-IN")}`
      : `₹${Number(formData.price || 0).toLocaleString(
          "en-IN"
        )}`;

  return (
    <div
      className="room-details-overlay"
      onClick={onClose}
    >
      <div
        className="room-details"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="room-details-header">
          <div>
            <span>
              {isEditing
                ? "EDIT ROOM"
                : "ROOM DETAILS"}
            </span>

            <h2>
              Room{" "}
              {isEditing
                ? formData.number
                : room.number}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* ICON */}
        <div className="room-details-icon">
          <i className="bi bi-door-open"></i>
        </div>

        {/* EDIT MODE */}
        {isEditing ? (
          <div className="room-edit-form">

            <div className="room-edit-group">
              <label>
                Room Number <span>*</span>
              </label>

              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>

            <div className="room-edit-group">
              <label>Room Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Deluxe Room">
                  Deluxe Room
                </option>

                <option value="Executive Room">
                  Executive Room
                </option>

                <option value="Suite Room">
                  Suite Room
                </option>
              </select>
            </div>

            <div className="room-edit-group">
              <label>
                Floor <span>*</span>
              </label>

              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
              />
            </div>

            <div className="room-edit-group">
              <label>
                Price Per Night <span>*</span>
              </label>

              <div className="room-edit-price">
                <span>₹</span>

                <input
                  type="number"
                  name="price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="room-edit-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Available">
                  Available
                </option>

                <option value="Occupied">
                  Occupied
                </option>

                <option value="Maintenance">
                  Maintenance
                </option>
              </select>
            </div>

            {/* EDIT ACTIONS */}
            <div className="room-edit-actions">

              <button
                type="button"
                className="room-cancel-edit-btn"
                onClick={() => setIsEditing(false)}
              >
                <i className="bi bi-x-circle"></i>
                Cancel
              </button>

              <button
                type="button"
                className="room-save-btn"
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
            <div className="room-details-body">

              <div className="detail-item">
                <span>Room Type</span>
                <strong>{room.type}</strong>
              </div>

              <div className="detail-item">
                <span>Floor</span>
                <strong>{room.floor}</strong>
              </div>

              <div className="detail-item">
                <span>Price Per Night</span>
                <strong>{displayPrice}</strong>
              </div>

              <div className="detail-item">
                <span>Status</span>

                <span
                  className={`room-status ${String(
                    room.status
                  ).toLowerCase()}`}
                >
                  <span></span>
                  {room.status}
                </span>
              </div>

              {/* CHANGE STATUS */}
              <div className="detail-item room-status-change">
                <span>Change Status</span>

                <select
                  value={room.status}
                  onChange={handleStatusChange}
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Occupied">
                    Occupied
                  </option>

                  <option value="Maintenance">
                    Maintenance
                  </option>
                </select>
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="room-details-actions">

              <button
                type="button"
                className="room-edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <i className="bi bi-pencil"></i>
                Edit Room
              </button>

              <button
                type="button"
                className="room-delete-btn"
                onClick={handleDelete}
              >
                <i className="bi bi-trash"></i>
                Delete Room
              </button>

            </div>

            <button
              type="button"
              className="room-details-close-btn"
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

export default RoomDetails;