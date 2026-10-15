import { useState } from "react";

function AddGuest({ onAdd }) {

  const initialState = {
    name: "",
    email: "",
    phone: "",
    room: "",
    status: "Reserved",
  };

  const [guest, setGuest] =
    useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGuest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !guest.name.trim() ||
      !guest.email.trim() ||
      !guest.phone.trim() ||
      !guest.room.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (guest.phone.trim().length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (onAdd) {
      onAdd({
        ...guest,
        name: guest.name.trim(),
        email: guest.email.trim(),
        phone: guest.phone.trim(),
        room: guest.room.trim(),
      });
    }

    setGuest(initialState);
  };

  return (
    <div className="add-guest-card">

      <div className="add-guest-header">

        <div>
          <span className="add-guest-label">
            GUEST MANAGEMENT
          </span>

          <h2>Add New Guest</h2>

          <p>
            Enter guest details to create a new guest profile
          </p>
        </div>

        <div className="add-guest-icon">
          <i className="bi bi-person-plus"></i>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="add-guest-form-grid">

          {/* NAME */}

          <div className="form-group">

            <label>
              Guest Name <span>*</span>
            </label>

            <div className="input-with-icon">

              <i className="bi bi-person"></i>

              <input
                type="text"
                name="name"
                placeholder="Enter guest name"
                value={guest.name}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email Address <span>*</span>
            </label>

            <div className="input-with-icon">

              <i className="bi bi-envelope"></i>

              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={guest.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* PHONE */}

          <div className="form-group">

            <label>
              Phone Number <span>*</span>
            </label>

            <div className="input-with-icon">

              <i className="bi bi-telephone"></i>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={guest.phone}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* ROOM */}

          <div className="form-group">

            <label>
              Room Number <span>*</span>
            </label>

            <div className="input-with-icon">

              <i className="bi bi-door-open"></i>

              <input
                type="text"
                name="room"
                placeholder="e.g. 101"
                value={guest.room}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* STATUS */}

          <div className="form-group">

            <label>
              Guest Status
            </label>

            <div className="input-with-icon select-wrapper">

              <i className="bi bi-person-check"></i>

              <select
                name="status"
                value={guest.status}
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

          </div>

        </div>

        <div className="add-guest-form-actions">

          <button
            type="submit"
            className="add-guest-submit"
          >

            <i className="bi bi-person-plus"></i>

            Add Guest

          </button>

        </div>

      </form>

    </div>
  );
}

export default AddGuest;