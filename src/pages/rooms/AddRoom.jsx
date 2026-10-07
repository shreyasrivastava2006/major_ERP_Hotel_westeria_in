import { useState } from "react";

function AddRoom({ onAdd }) {
  const [room, setRoom] = useState({
    number: "",
    type: "Deluxe Room",
    floor: "",
    price: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!room.number || !room.floor || !room.price) {
      alert("Please fill all required fields.");
      return;
    }

    onAdd({
      ...room,
      price: Number(room.price),
    });

    setRoom({
      number: "",
      type: "Deluxe Room",
      floor: "",
      price: "",
      status: "Available",
    });
  };

  return (
    <div className="add-room-card">

      <div className="add-room-header">
        <div>
          <h2>Add New Room</h2>
          <p>Enter room details to add a new hotel room</p>
        </div>

        <div className="add-room-icon">
          <i className="bi bi-door-open"></i>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="add-room-form-grid">

          <div className="form-group">
            <label>
              Room Number <span>*</span>
            </label>

            <input
              type="text"
              name="number"
              placeholder="e.g. 101"
              value={room.number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Room Type</label>

            <select
              name="type"
              value={room.type}
              onChange={handleChange}
            >
              <option>Deluxe Room</option>
              <option>Executive Room</option>
              <option>Suite Room</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Floor <span>*</span>
            </label>

            <input
              type="text"
              name="floor"
              placeholder="e.g. 1st Floor"
              value={room.floor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Price Per Night <span>*</span>
            </label>

            <div className="price-input">
              <span>₹</span>

              <input
                type="number"
                name="price"
                placeholder="4500"
                min="0"
                value={room.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={room.status}
              onChange={handleChange}
            >
              <option>Available</option>
              <option>Occupied</option>
              <option>Maintenance</option>
            </select>
          </div>

        </div>

        <div className="add-room-form-actions">

          <button
            type="submit"
            className="add-room-submit"
          >
            <i className="bi bi-check-circle"></i>
            Add Room
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddRoom;