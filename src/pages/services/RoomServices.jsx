import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './RoomServices.css'

function RoomServices() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      requestNo: '#RS-1001',
      guest: 'Rahul Sharma',
      room: 'Room 101',
      service: 'Extra Towels',
      quantity: 3,
      amount: 150,
      status: 'Pending'
    },
    {
      id: 2,
      requestNo: '#RS-1002',
      guest: 'Priya Singh',
      room: 'Room 205',
      service: 'Extra Bed',
      quantity: 1,
      amount: 1200,
      status: 'Delivered'
    },
    {
      id: 3,
      requestNo: '#RS-1003',
      guest: 'Aman Verma',
      room: 'Room 302',
      service: 'Toiletries',
      quantity: 2,
      amount: 300,
      status: 'Processing'
    },
    {
      id: 4,
      requestNo: '#RS-1004',
      guest: 'Sneha Gupta',
      room: 'Room 208',
      service: 'Water Bottles',
      quantity: 4,
      amount: 200,
      status: 'Completed'
    }
  ])

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    guest: '',
    room: '',
    service: 'Extra Towels',
    quantity: '',
    amount: '',
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
      !formData.quantity ||
      !formData.amount
    ) {
      return
    }

    const newRequest = {
      id: Date.now(),
      requestNo: `#RS-${1000 + requests.length + 1}`,
      guest: formData.guest,
      room: formData.room,
      service: formData.service,
      quantity: Number(formData.quantity),
      amount: Number(formData.amount),
      status: formData.status
    }

    setRequests((prev) => [...prev, newRequest])

    setFormData({
      guest: '',
      room: '',
      service: 'Extra Towels',
      quantity: '',
      amount: '',
      status: 'Pending'
    })

    setShowForm(false)
  }

  const updateStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: newStatus }
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
    (request) =>
      request.status === 'Completed' ||
      request.status === 'Delivered'
  ).length

  const totalRevenue = requests.reduce(
    (total, request) => total + request.amount,
    0
  )

  return (
    <MainLayout>

      <Breadcrumb items={['Services', 'Room Services']} />

      <div className="room-services-page">

        <div className="room-services-topbar">

          <PageHeader
            title="Room Services"
            subtitle="Manage guest requests and room service requirements"
          />

          <button
            type="button"
            className="add-room-service-btn"
            onClick={() => setShowForm((prev) => !prev)}
          >
            <i className="bi bi-plus-lg"></i>
            New Service Request
          </button>

        </div>

        <div className="room-services-stats">

          <div className="room-service-stat-card">
            <div className="room-service-stat-icon">
              <i className="bi bi-bell-fill"></i>
            </div>

            <div>
              <span>Total Requests</span>
              <h2>{totalRequests}</h2>
            </div>
          </div>

          <div className="room-service-stat-card">
            <div className="room-service-stat-icon pending">
              <i className="bi bi-clock-fill"></i>
            </div>

            <div>
              <span>Pending</span>
              <h2>{pendingRequests}</h2>
            </div>
          </div>

          <div className="room-service-stat-card">
            <div className="room-service-stat-icon processing">
              <i className="bi bi-arrow-repeat"></i>
            </div>

            <div>
              <span>Processing</span>
              <h2>{processingRequests}</h2>
            </div>
          </div>

          <div className="room-service-stat-card">
            <div className="room-service-stat-icon completed">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div>
              <span>Completed</span>
              <h2>{completedRequests}</h2>
            </div>
          </div>

        </div>

        <div className="room-service-revenue-card">

          <div className="room-service-revenue-icon">
            <i className="bi bi-currency-rupee"></i>
          </div>

          <div>
            <span>Total Service Revenue</span>
            <h2>₹{totalRevenue.toLocaleString('en-IN')}</h2>
          </div>

        </div>

        {showForm && (
          <div className="room-service-form-card">

            <div className="room-service-form-header">

              <div>
                <h2>New Room Service Request</h2>
                <p>Enter guest service request details</p>
              </div>

              <button
                type="button"
                className="close-room-service-btn"
                onClick={() => setShowForm(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form onSubmit={addRequest}>

              <div className="room-service-form-grid">

                <div className="room-service-input-group">
                  <label>Guest Name</label>

                  <input
                    type="text"
                    name="guest"
                    placeholder="Enter guest name"
                    value={formData.guest}
                    onChange={handleChange}
                  />
                </div>

                <div className="room-service-input-group">
                  <label>Room Number</label>

                  <input
                    type="text"
                    name="room"
                    placeholder="e.g. Room 205"
                    value={formData.room}
                    onChange={handleChange}
                  />
                </div>

                <div className="room-service-input-group">
                  <label>Service</label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option>Extra Towels</option>
                    <option>Extra Bed</option>
                    <option>Toiletries</option>
                    <option>Water Bottles</option>
                    <option>Room Cleaning</option>
                    <option>Extra Pillows</option>
                    <option>Extra Blanket</option>
                  </select>
                </div>

                <div className="room-service-input-group">
                  <label>Quantity</label>

                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="room-service-input-group">
                  <label>Amount (₹)</label>

                  <input
                    type="number"
                    name="amount"
                    min="0"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>

                <div className="room-service-input-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Delivered</option>
                    <option>Completed</option>
                  </select>
                </div>

              </div>

              <div className="room-service-form-actions">

                <button
                  type="button"
                  className="cancel-room-service-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-room-service-btn"
                >
                  <i className="bi bi-check-lg"></i>
                  Save Request
                </button>

              </div>

            </form>

          </div>
        )}

        <div className="room-service-table-card">

          <div className="room-service-table-header">
            <div>
              <h2>Room Service Requests</h2>
              <p>
                Monitor and manage guest room service requests
              </p>
            </div>
          </div>

          <div className="room-service-table-wrapper">

            <table className="room-service-table">

              <thead>
                <tr>
                  <th>Request</th>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Service</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {requests.map((request) => (
                  <tr key={request.id}>

                    <td>
                      <span className="room-service-request-number">
                        {request.requestNo}
                      </span>
                    </td>

                    <td>
                      <strong>{request.guest}</strong>
                    </td>

                    <td>
                      <span className="room-service-room">
                        {request.room}
                      </span>
                    </td>

                    <td>
                      <span className="room-service-name">
                        {request.service}
                      </span>
                    </td>

                    <td>{request.quantity}</td>

                    <td>
                      <strong className="room-service-price">
                        ₹{request.amount.toLocaleString('en-IN')}
                      </strong>
                    </td>

                    <td>
                      <select
                        className={`room-service-status ${request.status
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
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Delivered</option>
                        <option>Completed</option>
                      </select>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="delete-room-service-btn"
                        onClick={() =>
                          deleteRequest(request.id)
                        }
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default RoomServices