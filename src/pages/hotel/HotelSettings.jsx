import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './HotelSettings.css'

function HotelSettings() {
  const navigate = useNavigate()

  const [settings, setSettings] = useState({
    checkInTime: '02:00 PM',
    checkOutTime: '12:00 PM',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    language: 'English',
    dateFormat: 'DD/MM/YYYY',
    bookingApproval: 'Automatic',
    reservationCancellation: 'Allowed',
    emailNotifications: true,
    smsNotifications: true,
    bookingNotifications: true,
    paymentNotifications: true,
    maintenanceNotifications: true,
    housekeepingNotifications: true
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setSettings((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value
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
      <div className="hotel-settings-page">

        <Breadcrumb
          items={['Hotel', 'Hotel Settings']}
        />

        {/* Header */}
        <div className="hotel-settings-header">

          <PageHeader
            title="Hotel Settings"
            subtitle="Configure operational settings and preferences for your hotel"
          />

          <button
            type="button"
            className="hotel-settings-back-btn"
            onClick={() => navigate('/hotel/profile')}
          >
            <i className="bi bi-arrow-left"></i>
            Hotel Profile
          </button>

        </div>

        <form
          className="hotel-settings-form"
          onSubmit={handleSave}
        >

          {/* General Settings */}
          <div className="hotel-settings-card">

            <div className="hotel-settings-card-header">

              <div className="hotel-settings-card-icon">
                <i className="bi bi-sliders"></i>
              </div>

              <div>
                <h2>General Settings</h2>
                <p>Configure basic hotel operating preferences</p>
              </div>

            </div>

            <div className="hotel-settings-grid">

              <div className="hotel-settings-field">

                <label>Check-In Time</label>

                <div className="hotel-settings-input">
                  <i className="bi bi-box-arrow-in-right"></i>

                  <select
                    name="checkInTime"
                    value={settings.checkInTime}
                    onChange={handleChange}
                  >
                    <option>12:00 PM</option>
                    <option>01:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>

              </div>

              <div className="hotel-settings-field">

                <label>Check-Out Time</label>

                <div className="hotel-settings-input">
                  <i className="bi bi-box-arrow-right"></i>

                  <select
                    name="checkOutTime"
                    value={settings.checkOutTime}
                    onChange={handleChange}
                  >
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>01:00 PM</option>
                    <option>02:00 PM</option>
                  </select>
                </div>

              </div>

              <div className="hotel-settings-field">

                <label>Currency</label>

                <div className="hotel-settings-input">
                  <i className="bi bi-currency-rupee"></i>

                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                  >
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>

              </div>

              <div className="hotel-settings-field">

                <label>Timezone</label>

                <div className="hotel-settings-input">
                  <i className="bi bi-clock"></i>

                  <select
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleChange}
                  >
                    <option value="Asia/Kolkata">
                      Asia/Kolkata (IST)
                    </option>
                    <option value="Asia/Dubai">
                      Asia/Dubai
                    </option>
                    <option value="Europe/London">
                      Europe/London
                    </option>
                    <option value="America/New_York">
                      America/New York
                    </option>
                  </select>
                </div>

              </div>

              <div className="hotel-settings-field">

                <label>Language</label>

                <div className="hotel-settings-input">
                  <i className="bi bi-translate"></i>

                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                  >
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                </div>

              </div>

              <div className="hotel-settings-field">

                <label>Date Format</label>

                <div className="hotel-settings-input">
                  <i className="bi bi-calendar3"></i>

                  <select
                    name="dateFormat"
                    value={settings.dateFormat}
                    onChange={handleChange}
                  >
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

              </div>

            </div>

          </div>

          {/* Reservation Settings */}
          <div className="hotel-settings-card">

            <div className="hotel-settings-card-header">

              <div className="hotel-settings-card-icon">
                <i className="bi bi-calendar-check"></i>
              </div>

              <div>
                <h2>Reservation Settings</h2>
                <p>Configure how hotel reservations are handled</p>
              </div>

            </div>

            <div className="hotel-settings-option-grid">

              <div className="hotel-settings-option">

                <div className="hotel-settings-option-icon">
                  <i className="bi bi-calendar-plus"></i>
                </div>

                <div className="hotel-settings-option-content">
                  <strong>Booking Approval</strong>
                  <span>
                    Choose how new reservations are approved
                  </span>
                </div>

                <select
                  name="bookingApproval"
                  value={settings.bookingApproval}
                  onChange={handleChange}
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>

              </div>

              <div className="hotel-settings-option">

                <div className="hotel-settings-option-icon">
                  <i className="bi bi-calendar-x"></i>
                </div>

                <div className="hotel-settings-option-content">
                  <strong>Cancellation Policy</strong>
                  <span>
                    Manage guest reservation cancellation
                  </span>
                </div>

                <select
                  name="reservationCancellation"
                  value={settings.reservationCancellation}
                  onChange={handleChange}
                >
                  <option>Allowed</option>
                  <option>Not Allowed</option>
                  <option>With Charges</option>
                </select>

              </div>

            </div>

          </div>

          {/* Notifications */}
          <div className="hotel-settings-card">

            <div className="hotel-settings-card-header">

              <div className="hotel-settings-card-icon">
                <i className="bi bi-bell"></i>
              </div>

              <div>
                <h2>Notification Settings</h2>
                <p>Control notifications for hotel activities</p>
              </div>

            </div>

            <div className="hotel-settings-notification-list">

              <label className="hotel-settings-toggle-row">

                <div className="hotel-settings-toggle-icon">
                  <i className="bi bi-envelope"></i>
                </div>

                <div className="hotel-settings-toggle-content">
                  <strong>Email Notifications</strong>
                  <span>
                    Receive important hotel notifications through email
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                />

                <span className="hotel-settings-switch"></span>

              </label>

              <label className="hotel-settings-toggle-row">

                <div className="hotel-settings-toggle-icon">
                  <i className="bi bi-chat-dots"></i>
                </div>

                <div className="hotel-settings-toggle-content">
                  <strong>SMS Notifications</strong>
                  <span>
                    Send important updates through SMS
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={settings.smsNotifications}
                  onChange={handleChange}
                />

                <span className="hotel-settings-switch"></span>

              </label>

              <label className="hotel-settings-toggle-row">

                <div className="hotel-settings-toggle-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>

                <div className="hotel-settings-toggle-content">
                  <strong>Booking Notifications</strong>
                  <span>
                    Notify staff when a new booking is created
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="bookingNotifications"
                  checked={settings.bookingNotifications}
                  onChange={handleChange}
                />

                <span className="hotel-settings-switch"></span>

              </label>

              <label className="hotel-settings-toggle-row">

                <div className="hotel-settings-toggle-icon">
                  <i className="bi bi-credit-card"></i>
                </div>

                <div className="hotel-settings-toggle-content">
                  <strong>Payment Notifications</strong>
                  <span>
                    Notify staff about payment activities
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="paymentNotifications"
                  checked={settings.paymentNotifications}
                  onChange={handleChange}
                />

                <span className="hotel-settings-switch"></span>

              </label>

              <label className="hotel-settings-toggle-row">

                <div className="hotel-settings-toggle-icon">
                  <i className="bi bi-tools"></i>
                </div>

                <div className="hotel-settings-toggle-content">
                  <strong>Maintenance Notifications</strong>
                  <span>
                    Receive alerts for maintenance requests
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="maintenanceNotifications"
                  checked={settings.maintenanceNotifications}
                  onChange={handleChange}
                />

                <span className="hotel-settings-switch"></span>

              </label>

              <label className="hotel-settings-toggle-row">

                <div className="hotel-settings-toggle-icon">
                  <i className="bi bi-stars"></i>
                </div>

                <div className="hotel-settings-toggle-content">
                  <strong>Housekeeping Notifications</strong>
                  <span>
                    Receive room cleaning and housekeeping alerts
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="housekeepingNotifications"
                  checked={settings.housekeepingNotifications}
                  onChange={handleChange}
                />

                <span className="hotel-settings-switch"></span>

              </label>

            </div>

          </div>

          {/* Actions */}
          <div className="hotel-settings-actions">

            {saved && (
              <div className="hotel-settings-success">
                <i className="bi bi-check-circle-fill"></i>
                Settings saved successfully
              </div>
            )}

            <button
              type="button"
              className="hotel-settings-cancel"
              onClick={() => navigate('/hotel/profile')}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="hotel-settings-save"
            >
              <i className="bi bi-check-lg"></i>
              Save Settings
            </button>

          </div>

        </form>

      </div>
    </MainLayout>
  )
}

export default HotelSettings