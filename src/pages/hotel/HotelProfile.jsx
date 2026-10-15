import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './HotelProfile.css'

function HotelProfile() {
  const navigate = useNavigate()

  const [hotel, setHotel] = useState({
    hotelId: 'HOTEL-001',
    hotelName: 'Grand Palace Hotel',
    ownerName: 'Rajesh Kumar',
    email: 'admin@grandpalace.com',
    phone: '+91 98765 43210',
    address: 'Hazratganj, Lucknow',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    totalRooms: '50',
    website: 'www.grandpalacehotel.com',
    description:
      'Grand Palace Hotel is a premium hospitality property providing comfortable accommodation, dining and guest services.'
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setHotel((previous) => ({
      ...previous,
      [name]: value
    }))

    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <MainLayout>
      <div className="hotel-profile-page">

        <Breadcrumb
          items={['Hotel', 'Hotel Profile']}
        />

        {/* Header */}
        <div className="hotel-profile-header">

          <PageHeader
            title="Hotel Profile"
            subtitle="Manage your hotel's identity and basic information"
          />

          <button
            type="button"
            className="hotel-profile-dashboard-btn"
            onClick={() => navigate('/dashboard')}
          >
            <i className="bi bi-speedometer2"></i>
            Dashboard
          </button>

        </div>

        {/* Hotel Identity */}
        <div className="hotel-profile-identity">

          <div className="hotel-profile-identity-left">

            <div className="hotel-profile-logo">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <h2>{hotel.hotelName}</h2>

              <span className="hotel-profile-id">
                {hotel.hotelId}
              </span>

              <p>
                <i className="bi bi-geo-alt"></i>
                {hotel.city}, {hotel.state}
              </p>
            </div>

          </div>

          <div className="hotel-profile-active">
            <i className="bi bi-check-circle-fill"></i>
            Active Hotel
          </div>

        </div>

        {/* Form */}
        <form
          className="hotel-profile-form"
          onSubmit={handleSave}
        >

          {/* Basic Information */}
          <div className="hotel-profile-card">

            <div className="hotel-profile-card-header">

              <div className="hotel-profile-card-icon">
                <i className="bi bi-building"></i>
              </div>

              <div>
                <h2>Hotel Information</h2>
                <p>Basic identity details of your hotel</p>
              </div>

            </div>

            <div className="hotel-profile-grid">

              <div className="hotel-profile-field">

                <label>Hotel ID</label>

                <div className="hotel-profile-input disabled">
                  <i className="bi bi-hash"></i>

                  <input
                    type="text"
                    value={hotel.hotelId}
                    disabled
                  />
                </div>

                <small>System generated hotel ID</small>

              </div>

              <div className="hotel-profile-field">

                <label>Hotel Name</label>

                <div className="hotel-profile-input">

                  <i className="bi bi-building"></i>

                  <input
                    type="text"
                    name="hotelName"
                    value={hotel.hotelName}
                    onChange={handleChange}
                    placeholder="Enter hotel name"
                  />

                </div>

              </div>

              <div className="hotel-profile-field">

                <label>Owner / Manager</label>

                <div className="hotel-profile-input">

                  <i className="bi bi-person"></i>

                  <input
                    type="text"
                    name="ownerName"
                    value={hotel.ownerName}
                    onChange={handleChange}
                    placeholder="Enter owner name"
                  />

                </div>

              </div>

              <div className="hotel-profile-field">

                <label>Total Rooms</label>

                <div className="hotel-profile-input">

                  <i className="bi bi-door-open"></i>

                  <input
                    type="number"
                    name="totalRooms"
                    min="1"
                    value={hotel.totalRooms}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="hotel-profile-field">

                <label>Website</label>

                <div className="hotel-profile-input">

                  <i className="bi bi-globe2"></i>

                  <input
                    type="text"
                    name="website"
                    value={hotel.website}
                    onChange={handleChange}
                    placeholder="www.example.com"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Contact Information */}
          <div className="hotel-profile-card">

            <div className="hotel-profile-card-header">

              <div className="hotel-profile-card-icon">
                <i className="bi bi-telephone"></i>
              </div>

              <div>
                <h2>Contact Information</h2>
                <p>Hotel contact and location details</p>
              </div>

            </div>

            <div className="hotel-profile-grid">

              <div className="hotel-profile-field">

                <label>Email Address</label>

                <div className="hotel-profile-input">

                  <i className="bi bi-envelope"></i>

                  <input
                    type="email"
                    name="email"
                    value={hotel.email}
                    onChange={handleChange}
                    placeholder="hotel@example.com"
                  />

                </div>

              </div>

              <div className="hotel-profile-field">

                <label>Phone Number</label>

                <div className="hotel-profile-input">

                  <i className="bi bi-telephone"></i>

                  <input
                    type="text"
                    name="phone"
                    value={hotel.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />

                </div>

              </div>

              <div className="hotel-profile-field full-width">

                <label>Address</label>

                <div className="hotel-profile-input">

                  <i className="bi bi-geo-alt"></i>

                  <input
                    type="text"
                    name="address"
                    value={hotel.address}
                    onChange={handleChange}
                    placeholder="Enter complete address"
                  />

                </div>

              </div>

              <div className="hotel-profile-field">

                <label>City</label>

                <div className="hotel-profile-input">

                  <i className="bi bi-buildings"></i>

                  <input
                    type="text"
                    name="city"
                    value={hotel.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />

                </div>

              </div>

              <div className="hotel-profile-field">

                <label>State</label>

                <div className="hotel-profile-input">

                  <i className="bi bi-map"></i>

                  <input
                    type="text"
                    name="state"
                    value={hotel.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />

                </div>

              </div>

              <div className="hotel-profile-field">

                <label>Country</label>

                <div className="hotel-profile-input">

                  <i className="bi bi-globe"></i>

                  <input
                    type="text"
                    name="country"
                    value={hotel.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Description */}
          <div className="hotel-profile-card">

            <div className="hotel-profile-card-header">

              <div className="hotel-profile-card-icon">
                <i className="bi bi-file-text"></i>
              </div>

              <div>
                <h2>Hotel Description</h2>
                <p>Describe your property and hospitality services</p>
              </div>

            </div>

            <div className="hotel-profile-description">

              <textarea
                name="description"
                rows="5"
                value={hotel.description}
                onChange={handleChange}
                placeholder="Enter hotel description..."
              ></textarea>

            </div>

          </div>

          {/* Save */}
          <div className="hotel-profile-actions">

            {saved && (
              <div className="hotel-profile-success">
                <i className="bi bi-check-circle-fill"></i>
                Hotel profile updated successfully
              </div>
            )}

            <button
              type="button"
              className="hotel-profile-cancel"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="hotel-profile-save"
            >
              <i className="bi bi-check-lg"></i>
              Save Hotel Profile
            </button>

          </div>

        </form>

      </div>
    </MainLayout>
  )
}

export default HotelProfile