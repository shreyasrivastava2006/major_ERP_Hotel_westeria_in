// src/pages/rooms/RoomCard.jsx

import { useState } from "react";
import { useHotelData } from "../../context/HotelDataContext";

function RoomCard({ room, onViewDetails }) {
  const {
    updateRoomStatus,
    deleteRoom,
  } = useHotelData();

  const [showActions, setShowActions] = useState(false);

  const handleStatusChange = (e) => {
    e.stopPropagation();

    updateRoomStatus(room.id, e.target.value);
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete Room ${room.number}?`
    );

    if (confirmed) {
      deleteRoom(room.id);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(room);
    }
  };

  const formattedPrice =
    typeof room.price === "number"
      ? `₹${room.price.toLocaleString("en-IN")}`
      : room.price;

  return (
    <div
      className="room-card"
      onClick={handleViewDetails}
    >
      {/* HEADER */}
      <div className="room-card-header">
        <span className="room-number">
          Room {room.number}
        </span>

        <span
          className={`room-status ${String(
            room.status
          ).toLowerCase()}`}
        >
          <span></span>
          {room.status}
        </span>
      </div>

      {/* ICON */}
      <div className="room-icon">
        <i className="bi bi-door-open"></i>
      </div>

      {/* ROOM INFO */}
      <h3>{room.type}</h3>

      <p>
        <i className="bi bi-building"></i>
        {room.floor}
      </p>

      {/* FOOTER */}
      <div className="room-card-footer">
        <div>
          <strong>{formattedPrice}</strong>
          <span>per night</span>
        </div>

        <i className="bi bi-arrow-right"></i>
      </div>

      {/* ACTION TOGGLE */}
      <button
        type="button"
        className="room-actions-toggle"
        onClick={(e) => {
          e.stopPropagation();
          setShowActions((prev) => !prev);
        }}
      >
        <i className="bi bi-three-dots"></i>
        Actions
      </button>

      {/* ACTIONS */}
      {showActions && (
        <div
          className="room-card-actions"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleViewDetails}
          >
            <i className="bi bi-eye"></i>
            View Details
          </button>

          <label className="room-status-action">
            <i className="bi bi-arrow-repeat"></i>
            Change Status

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
          </label>

          <button
            type="button"
            className="delete-room-action"
            onClick={handleDelete}
          >
            <i className="bi bi-trash"></i>
            Delete Room
          </button>
        </div>
      )}
    </div>
  );
}

export default RoomCard;