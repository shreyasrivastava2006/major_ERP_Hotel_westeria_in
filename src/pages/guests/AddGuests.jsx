import { useState } from 'react'

function AddGuest({ onAdd }) {
  const [guest, setGuest] = useState({
    name: '',
    email: '',
    phone: '',
    room: '',
    status: 'Reserved',
  })

  const handleChange = (e) => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (onAdd) {
      onAdd(guest)
    }

    setGuest({
      name: '',
      email: '',
      phone: '',
      room: '',
      status: 'Reserved',
    })
  }

  return (
    <div className="add-guest-card">
      <h2>Add New Guest</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Guest Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter guest name"
            value={guest.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={guest.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={guest.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Room Number</label>
          <input
            type="text"
            name="room"
            placeholder="e.g. 101"
            value={guest.room}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={guest.status}
            onChange={handleChange}
          >
            <option>Reserved</option>
            <option>Checked In</option>
            <option>Checked Out</option>
          </select>
        </div>

        <button type="submit" className="add-guest-btn">
          <i className="bi bi-person-plus"></i>
          Add Guest
        </button>

      </form>
    </div>
  )
}

export default AddGuest