import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './ServicesRequest.css'

function ServicesRequest() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      requestNo: '#SR-1001',
      guest: 'Rahul Sharma',
      room: 'Room 101',
      service: 'Airport Transfer',
      priority: 'High',
      date: '14 Sep 2026',
      status: 'Pending'
    },
    {
      id: 2,
      requestNo: '#SR-1002',
      guest: 'Priya Singh',
      room: 'Room 205',
      service: 'Spa & Massage',
      priority: 'Normal',
      date: '14 Sep 2026',
      status: 'Processing'
    },
    {
      id: 3,
      requestNo: '#SR-1003',
      guest: 'Aman Verma',
      room: 'Room 302',
      service: 'Room Decoration',
      priority: 'High',
      date: '15 Sep 2026',
      status: 'Completed'
    },
    {
      id: 4,
      requestNo: '#SR-1004',
      guest: 'Sneha Gupta',
      room: 'Room 208',
      service: 'Car Rental',
      priority: 'Normal',
      date: '15 Sep 2026',
      status: 'Pending'
    }
  ])

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    guest: '',
    room: '',
    service: 'Airport Transfer',
    priority: 'Normal',
    date: '',
    status: 'Pending'
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const addRequest = (e) => {
    e.preventDefault()

    if (
      !formData.guest.trim() ||
      !formData.room.trim() ||
      !formData.date
    ) {
      return
    }

    const newRequest = {
      id: Date.now(),
      requestNo: `#SR-${1000 + requests.length + 1}`,
      guest: formData.guest.trim(),
      room: formData.room.trim(),
      service: formData.service,
      priority: formData.priority,
      date: formData.date,
      status: formData.status
    }

    setRequests((prev) => [...prev, newRequest])

    setFormData({
      guest: '',
      room: '',
      service: 'Airport Transfer',
      priority: 'Normal',
      date: '',
      status: 'Pending'
    })

    setShowForm(false)
  }

  const updateStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? {
              ...request,
              status: newStatus
            }
          : request
      )
    )
  }

  const deleteRequest = (id) => {
    setRequests((prev) =>
      prev.filter((request) => request.id !== id)
    )
  }

  const totalRequests = requests.length

  const pendingRequests = requests.filter(
    (request) => request.status === 'Pending'
  ).length

  const processingRequests = requests.filter(
    (request) => request.status === 'Processing'
  ).length

  const completedRequests = requests.filter(
    (request) => request.status === 'Completed'
  ).length

  const highPriority = requests.filter(
    (request) =>
      request.priority === 'High' ||
      request.priority === 'Urgent'
  ).length

  return (
    <MainLayout>
      <div className="service-request-page">

        <Breadcrumb
          items={['Services', 'Service Requests']}
        />

        <div className="service-request-header">

          <PageHeader
            title="Service Requests"
            subtitle="Manage and track special requests from hotel guests"
          />

          <button
            type="button"
            className="add-service-request-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <i className="bi bi-plus-lg"></i>
            {showForm
              ? 'Close Form'
              : 'New Service Request'}
          </button>

        </div>

        {/* STATS */}

        <div className="service-request-stats">

          <div className="service-request-stat-card">
            <div className="service-request-stat-icon">
              <i className="bi bi-list-check"></i>
            </div>

            <div>
              <span>Total Requests</span>
              <h2>{totalRequests}</h2>
            </div>
          </div>

          <div className="service-request-stat-card">
            <div className="service-request-stat-icon pending">
              <i className="bi bi-clock-fill"></i>
            </div>

            <div>
              <span>Pending</span>
              <h2>{pendingRequests}</h2>
            </div>
          </div>

          <div className="service-request-stat-card">
            <div className="service-request-stat-icon processing">
              <i className="bi bi-arrow-repeat"></i>
            </div>

            <div>
              <span>Processing</span>
              <h2>{processingRequests}</h2>
            </div>
          </div>

          <div className="service-request-stat-card">
            <div className="service-request-stat-icon completed">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div>
              <span>Completed</span>
              <h2>{completedRequests}</h2>
            </div>
          </div>

        </div>

        {/* PRIORITY */}

        <div className="service-request-priority-card">

          <div className="service-request-priority-icon">
            <i className="bi bi-exclamation-triangle-fill"></i>
          </div>

          <div>
            <span>High Priority Requests</span>
            <h2>{highPriority}</h2>
          </div>

        </div>

        {/* FORM */}

        {showForm && (
          <div className="service-request-form-card">

            <div className="service-request-form-header">

              <div>
                <h2>New Service Request</h2>
                <p>
                  Enter guest service request details
                </p>
              </div>

              <button
                type="button"
                className="close-service-request-btn"
                onClick={() => setShowForm(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form onSubmit={addRequest}>

              <div className="service-request-form-grid">

                <div className="service-request-input-group">
                  <label>Guest Name</label>

                  <input
                    type="text"
                    name="guest"
                    placeholder="Enter guest name"
                    value={formData.guest}
                    onChange={handleChange}
                  />
                </div>

                <div className="service-request-input-group">
                  <label>Room Number</label>

                  <input
                    type="text"
                    name="room"
                    placeholder="e.g. Room 205"
                    value={formData.room}
                    onChange={handleChange}
                  />
                </div>

                <div className="service-request-input-group">
                  <label>Service</label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option>Airport Transfer</option>
                    <option>Spa & Massage</option>
                    <option>Room Decoration</option>
                    <option>Car Rental</option>
                    <option>Restaurant Reservation</option>
                    <option>Wake Up Call</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="service-request-input-group">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>

                <div className="service-request-input-group">
                  <label>Required Date</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="service-request-input-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Completed</option>
                  </select>
                </div>

              </div>

              <div className="service-request-form-actions">

                <button
                  type="button"
                  className="cancel-service-request-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-service-request-btn"
                >
                  <i className="bi bi-check-lg"></i>
                  Save Request
                </button>

              </div>

            </form>
          </div>
        )}

        {/* TABLE */}

        <div className="service-request-table-card">

          <div className="service-request-table-header">

            <div>
              <h2>Guest Service Requests</h2>
              <p>
                Track all special service requests
              </p>
            </div>

          </div>

          <div className="service-request-table-wrapper">

            <table className="service-request-table">

              <thead>
                <tr>
                  <th>Request</th>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Service</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {requests.length > 0 ? (
                  requests.map((request) => (
                    <tr key={request.id}>

                      <td>
                        <span className="service-request-number">
                          {request.requestNo}
                        </span>
                      </td>

                      <td>
                        <strong>{request.guest}</strong>
                      </td>

                      <td>
                        <span className="service-request-room">
                          {request.room}
                        </span>
                      </td>

                      <td>
                        <span className="service-request-name">
                          {request.service}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`service-request-priority ${request.priority.toLowerCase()}`}
                        >
                          {request.priority}
                        </span>
                      </td>

                      <td>{request.date}</td>

                      <td>
                        <select
                          className={`service-request-status ${request.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                          value={request.status}
                          onChange={(e) =>
                            updateStatus(
                              request.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Completed">
                            Completed
                          </option>
                        </select>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="delete-service-request-btn"
                          onClick={() =>
                            deleteRequest(request.id)
                          }
                          title="Delete Request"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="service-request-empty"
                    >
                      <i className="bi bi-inbox"></i>
                      <span>No service requests available</span>
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>
        </div>

      </div>
    </MainLayout>
  )
}

export default ServicesRequest