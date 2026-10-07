import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './HotelDetails.css'

function HotelDetails() {
  const navigate = useNavigate()

  const [hotel, setHotel] = useState({
    id: 'HOTEL-001',
    name: 'Grand Palace Hotel',
    owner: 'Rajesh Kumar',
    email: 'admin@grandpalace.com',
    phone: '+91 98765 43210',
    address: 'Hazratganj, Lucknow, Uttar Pradesh, India',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    rooms: 50,
    users: 12,
    status: 'Active',
    registeredOn: '20 Sep 2026',
    website: 'www.grandpalacehotel.com',
    description:
      'Grand Palace Hotel is a premium hospitality property providing comfortable accommodation, dining and guest services.'
  })

  const [status, setStatus] = useState(hotel.status)

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)

    setHotel((previousHotel) => ({
      ...previousHotel,
      status: newStatus
    }))
  }

  const handleEdit = () => {
    navigate('/super-admin/hotels/add')
  }

  return (
    <MainLayout>
      <div className="hotel-details-page">

        <Breadcrumb
          items={['Super Admin', 'Hotels', 'Hotel Details']}
        />

        {/* Header */}
        <div className="hotel-details-header">

          <PageHeader
            title="Hotel Details"
            subtitle="View and manage complete hotel information"
          />

          <div className="hotel-details-header-actions">

            <button
              type="button"
              className="hotel-details-back-btn"
              onClick={() => navigate('/super-admin/hotels')}
            >
              <i className="bi bi-arrow-left"></i>
              Back to Hotels
            </button>

            <button
              type="button"
              className="hotel-details-edit-btn"
              onClick={handleEdit}
            >
              <i className="bi bi-pencil"></i>
              Edit Hotel
            </button>

          </div>

        </div>

        {/* Hotel Profile */}
        <div className="hotel-details-profile-card">

          <div className="hotel-details-profile-left">

            <div className="hotel-details-logo">
              <i className="bi bi-building"></i>
            </div>

            <div className="hotel-details-profile-info">

              <div className="hotel-details-title-row">

                <h2>{hotel.name}</h2>

                <span
                  className={`hotel-details-status ${status.toLowerCase()}`}
                >
                  <i
                    className={
                      status === 'Active'
                        ? 'bi bi-check-circle-fill'
                        : status === 'Pending'
                          ? 'bi bi-clock-fill'
                          : 'bi bi-pause-circle-fill'
                    }
                  ></i>

                  {status}
                </span>

              </div>

              <span className="hotel-details-id">
                {hotel.id}
              </span>

              <p>
                <i className="bi bi-geo-alt"></i>
                {hotel.address}
              </p>

            </div>

          </div>

          <div className="hotel-details-profile-actions">

            {status === 'Active' && (
              <button
                type="button"
                className="hotel-status-action deactivate"
                onClick={() => handleStatusChange('Inactive')}
              >
                <i className="bi bi-pause-circle"></i>
                Deactivate
              </button>
            )}

            {status === 'Inactive' && (
              <button
                type="button"
                className="hotel-status-action activate"
                onClick={() => handleStatusChange('Active')}
              >
                <i className="bi bi-check-circle"></i>
                Activate
              </button>
            )}

            {status === 'Pending' && (
              <button
                type="button"
                className="hotel-status-action activate"
                onClick={() => handleStatusChange('Active')}
              >
                <i className="bi bi-check-circle"></i>
                Approve Hotel
              </button>
            )}

          </div>

        </div>

        {/* Summary Stats */}
        <div className="hotel-details-stats">

          <div className="hotel-details-stat-card">

            <div className="hotel-details-stat-icon rooms">
              <i className="bi bi-door-open"></i>
            </div>

            <div>
              <span>Total Rooms</span>
              <strong>{hotel.rooms}</strong>
              <small>Hotel rooms</small>
            </div>

          </div>

          <div className="hotel-details-stat-card">

            <div className="hotel-details-stat-icon users">
              <i className="bi bi-people"></i>
            </div>

            <div>
              <span>Total Users</span>
              <strong>{hotel.users}</strong>
              <small>Registered users</small>
            </div>

          </div>

          <div className="hotel-details-stat-card">

            <div className="hotel-details-stat-icon status">
              <i className="bi bi-shield-check"></i>
            </div>

            <div>
              <span>Hotel Status</span>
              <strong>{status}</strong>
              <small>Current platform status</small>
            </div>

          </div>

          <div className="hotel-details-stat-card">

            <div className="hotel-details-stat-icon date">
              <i className="bi bi-calendar-check"></i>
            </div>

            <div>
              <span>Registered On</span>
              <strong>{hotel.registeredOn}</strong>
              <small>Registration date</small>
            </div>

          </div>

        </div>

        {/* Main Content */}
        <div className="hotel-details-grid">

          {/* Basic Information */}
          <div className="hotel-details-card">

            <div className="hotel-details-card-header">

              <div className="hotel-details-card-icon">
                <i className="bi bi-building"></i>
              </div>

              <div>
                <h2>Hotel Information</h2>
                <p>Basic information about the property</p>
              </div>

            </div>

            <div className="hotel-details-info-grid">

              <div className="hotel-details-info-item">
                <span>Hotel Name</span>
                <strong>{hotel.name}</strong>
              </div>

              <div className="hotel-details-info-item">
                <span>Hotel ID</span>
                <strong className="gold-text">{hotel.id}</strong>
              </div>

              <div className="hotel-details-info-item">
                <span>Website</span>
                <strong>{hotel.website}</strong>
              </div>

              <div className="hotel-details-info-item">
                <span>Total Rooms</span>
                <strong>{hotel.rooms} Rooms</strong>
              </div>

              <div className="hotel-details-info-item full-width">
                <span>Address</span>
                <strong>{hotel.address}</strong>
              </div>

            </div>

          </div>

          {/* Admin Information */}
          <div className="hotel-details-card">

            <div className="hotel-details-card-header">

              <div className="hotel-details-card-icon">
                <i className="bi bi-person-badge"></i>
              </div>

              <div>
                <h2>Hotel Admin</h2>
                <p>Primary administrator information</p>
              </div>

            </div>

            <div className="hotel-details-info-grid">

              <div className="hotel-details-info-item">
                <span>Admin / Owner</span>
                <strong>{hotel.owner}</strong>
              </div>

              <div className="hotel-details-info-item">
                <span>Users</span>
                <strong>{hotel.users} Users</strong>
              </div>

              <div className="hotel-details-info-item">
                <span>Email Address</span>
                <strong>{hotel.email}</strong>
              </div>

              <div className="hotel-details-info-item">
                <span>Phone Number</span>
                <strong>{hotel.phone}</strong>
              </div>

            </div>

          </div>

          {/* Contact Information */}
          <div className="hotel-details-card">

            <div className="hotel-details-card-header">

              <div className="hotel-details-card-icon">
                <i className="bi bi-telephone"></i>
              </div>

              <div>
                <h2>Contact Information</h2>
                <p>Hotel contact and location details</p>
              </div>

            </div>

            <div className="hotel-details-contact-list">

              <div className="hotel-contact-item">

                <div className="hotel-contact-icon">
                  <i className="bi bi-envelope"></i>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{hotel.email}</strong>
                </div>

              </div>

              <div className="hotel-contact-item">

                <div className="hotel-contact-icon">
                  <i className="bi bi-telephone"></i>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{hotel.phone}</strong>
                </div>

              </div>

              <div className="hotel-contact-item">

                <div className="hotel-contact-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {hotel.city}, {hotel.state}
                  </strong>
                </div>

              </div>

            </div>

          </div>

          {/* Description */}
          <div className="hotel-details-card">

            <div className="hotel-details-card-header">

              <div className="hotel-details-card-icon">
                <i className="bi bi-file-text"></i>
              </div>

              <div>
                <h2>About Hotel</h2>
                <p>Property description</p>
              </div>

            </div>

            <div className="hotel-description">
              <p>{hotel.description}</p>
            </div>

          </div>

        </div>

        {/* Bottom Actions */}
        <div className="hotel-details-footer">

          <button
            type="button"
            className="hotel-details-footer-back"
            onClick={() => navigate('/super-admin/hotels')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Hotels
          </button>

          <button
            type="button"
            className="hotel-details-footer-edit"
            onClick={handleEdit}
          >
            <i className="bi bi-pencil"></i>
            Edit Hotel
          </button>

        </div>

      </div>
    </MainLayout>
  )
}

export default HotelDetails