import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './HotelProfile.css'

function HotelProfile() {
  const navigate = useNavigate()

  const [hotel, setHotel] = useState({
    name: 'Wisteria In',
    tagline: 'Hospitality Beyond Stay',
    email: 'info@wisteriain.com',
    phone: '+91 98765 43210',
    address: 'Lucknow, Uttar Pradesh, India',
    rooms: '50',
    description:
      'Wisteria In is a modern hospitality management system designed to provide efficient hotel operations and better guest experiences.'
  })

  const handleChange = (e) => {
    setHotel({
      ...hotel,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    alert('Hotel profile updated successfully.')
  }

  return (
    <MainLayout>
      <div className="hotel-profile-page">

        <Breadcrumb
          items={['Settings', 'Hotel Profile']}
        />

        <div className="hotel-profile-header">
          <PageHeader
            title="Hotel Profile"
            subtitle="Manage hotel information and contact details"
          />

          <button
            type="button"
            className="hotel-profile-back-btn"
            onClick={() => navigate('/settings')}
          >
            <i className="bi bi-arrow-left"></i>
            Settings
          </button>
        </div>

        <form
          className="hotel-profile-card"
          onSubmit={handleSave}
        >

          <div className="hotel-profile-title">

            <div className="hotel-profile-icon">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <h2>Hotel Information</h2>
              <p>
                Update your hotel's basic information
              </p>
            </div>

          </div>

          <div className="hotel-profile-grid">

            <div className="hotel-profile-group">
              <label>Hotel Name</label>

              <input
                type="text"
                name="name"
                value={hotel.name}
                onChange={handleChange}
              />
            </div>

            <div className="hotel-profile-group">
              <label>Tagline</label>

              <input
                type="text"
                name="tagline"
                value={hotel.tagline}
                onChange={handleChange}
              />
            </div>

            <div className="hotel-profile-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={hotel.email}
                onChange={handleChange}
              />
            </div>

            <div className="hotel-profile-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                value={hotel.phone}
                onChange={handleChange}
              />
            </div>

            <div className="hotel-profile-group">
              <label>Total Rooms</label>

              <input
                type="number"
                name="rooms"
                min="0"
                value={hotel.rooms}
                onChange={handleChange}
              />
            </div>

            <div className="hotel-profile-group full-width">
              <label>Address</label>

              <input
                type="text"
                name="address"
                value={hotel.address}
                onChange={handleChange}
              />
            </div>

            <div className="hotel-profile-group full-width">
              <label>Hotel Description</label>

              <textarea
                name="description"
                value={hotel.description}
                onChange={handleChange}
                rows="5"
              ></textarea>
            </div>

          </div>

          <div className="hotel-profile-actions">

            <button
              type="button"
              className="hotel-profile-cancel-btn"
              onClick={() => navigate('/settings')}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="hotel-profile-save-btn"
            >
              <i className="bi bi-check-lg"></i>
              Save Changes
            </button>

          </div>

        </form>

      </div>
    </MainLayout>
  )
}

export default HotelProfile