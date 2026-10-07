import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './Laundry.css'

function Laundry() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      requestNo: '#LND-1001',
      guest: 'Rahul Sharma',
      room: 'Room 101',
      items: 8,
      service: 'Wash & Iron',
      amount: 650,
      status: 'Processing'
    },
    {
      id: 2,
      requestNo: '#LND-1002',
      guest: 'Priya Singh',
      room: 'Room 205',
      items: 5,
      service: 'Dry Cleaning',
      amount: 850,
      status: 'Ready'
    },
    {
      id: 3,
      requestNo: '#LND-1003',
      guest: 'Aman Verma',
      room: 'Room 302',
      items: 12,
      service: 'Wash & Fold',
      amount: 720,
      status: 'Pending'
    },
    {
      id: 4,
      requestNo: '#LND-1004',
      guest: 'Sneha Gupta',
      room: 'Room 208',
      items: 6,
      service: 'Express Laundry',
      amount: 900,
      status: 'Completed'
    }
  ])

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    guest: '',
    room: '',
    items: '',
    service: 'Wash & Iron',
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
      !formData.items ||
      !formData.amount
    ) {
      return
    }

    const newRequest = {
      id: Date.now(),
      requestNo: `#LND-${1000 + requests.length + 1}`,
      guest: formData.guest,
      room: formData.room,
      items: Number(formData.items),
      service: formData.service,
      amount: Number(formData.amount),
      status: formData.status
    }

    setRequests((prev) => [...prev, newRequest])

    setFormData({
      guest: '',
      room: '',
      items: '',
      service: 'Wash & Iron',
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
    (request) => request.status === 'Completed'
  ).length

  const totalRevenue = requests.reduce(
    (total, request) => total + request.amount,
    0
  )

  return (
    <MainLayout>

      <Breadcrumb items={['Services', 'Laundry']} />

      <div className="laundry-page">

        <div className="laundry-topbar">
          <PageHeader
            title="Laundry Management"
            subtitle="Manage guest laundry requests and service orders"
          />

          <button
            type="button"
            className="add-laundry-btn"
            onClick={() => setShowForm((prev) => !prev)}
          >
            <i className="bi bi-plus-lg"></i>
            New Laundry Request
          </button>
        </div>

        <div className="laundry-stats">

          <div className="laundry-stat-card">
            <div className="laundry-stat-icon">
              <i className="bi bi-basket-fill"></i>
            </div>

            <div>
              <span>Total Requests</span>
              <h2>{totalRequests}</h2>
            </div>
          </div>

          <div className="laundry-stat-card">
            <div className="laundry-stat-icon pending">
              <i className="bi bi-clock-fill"></i>
            </div>

            <div>
              <span>Pending</span>
              <h2>{pendingRequests}</h2>
            </div>
          </div>

          <div className="laundry-stat-card">
            <div className="laundry-stat-icon processing">
              <i className="bi bi-arrow-repeat"></i>
            </div>

            <div>
              <span>Processing</span>
              <h2>{processingRequests}</h2>
            </div>
          </div>

          <div className="laundry-stat-card">
            <div className="laundry-stat-icon completed">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div>
              <span>Completed</span>
              <h2>{completedRequests}</h2>
            </div>
          </div>

        </div>

        <div className="laundry-revenue-card">
          <div className="laundry-revenue-icon">
            <i className="bi bi-currency-rupee"></i>
          </div>

          <div>
            <span>Total Laundry Revenue</span>
            <h2>₹{totalRevenue.toLocaleString('en-IN')}</h2>
          </div>
        </div>

        {showForm && (
          <div className="laundry-form-card">

            <div className="laundry-form-header">
              <div>
                <h2>New Laundry Request</h2>
                <p>Enter guest laundry service details</p>
              </div>

              <button
                type="button"
                className="close-laundry-btn"
                onClick={() => setShowForm(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={addRequest}>

              <div className="laundry-form-grid">

                <div className="laundry-input-group">
                  <label>Guest Name</label>
                  <input
                    type="text"
                    name="guest"
                    placeholder="Enter guest name"
                    value={formData.guest}
                    onChange={handleChange}
                  />
                </div>

                <div className="laundry-input-group">
                  <label>Room Number</label>
                  <input
                    type="text"
                    name="room"
                    placeholder="e.g. Room 205"
                    value={formData.room}
                    onChange={handleChange}
                  />
                </div>

                <div className="laundry-input-group">
                  <label>Number of Items</label>
                  <input
                    type="number"
                    name="items"
                    min="1"
                    placeholder="Enter number of items"
                    value={formData.items}
                    onChange={handleChange}
                  />
                </div>

                <div className="laundry-input-group">
                  <label>Laundry Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option>Wash & Iron</option>
                    <option>Wash & Fold</option>
                    <option>Dry Cleaning</option>
                    <option>Express Laundry</option>
                  </select>
                </div>

                <div className="laundry-input-group">
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

                <div className="laundry-input-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Ready</option>
                    <option>Completed</option>
                  </select>
                </div>

              </div>

              <div className="laundry-form-actions">

                <button
                  type="button"
                  className="cancel-laundry-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-laundry-btn"
                >
                  <i className="bi bi-check-lg"></i>
                  Save Request
                </button>

              </div>

            </form>
          </div>
        )}

        <div className="laundry-table-card">

          <div className="laundry-table-header">
            <div>
              <h2>Laundry Requests</h2>
              <p>Monitor and manage guest laundry orders</p>
            </div>
          </div>

          <div className="laundry-table-wrapper">

            <table className="laundry-table">

              <thead>
                <tr>
                  <th>Request</th>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Items</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {requests.map((request) => (
                  <tr key={request.id}>

                    <td>
                      <span className="laundry-request-number">
                        {request.requestNo}
                      </span>
                    </td>

                    <td>
                      <strong>{request.guest}</strong>
                    </td>

                    <td>
                      <span className="laundry-room">
                        {request.room}
                      </span>
                    </td>

                    <td>{request.items}</td>

                    <td>
                      <span className="laundry-service">
                        {request.service}
                      </span>
                    </td>

                    <td>
                      <strong className="laundry-price">
                        ₹{request.amount.toLocaleString('en-IN')}
                      </strong>
                    </td>

                    <td>
                      <select
                        className={`laundry-status ${request.status
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
                        <option>Ready</option>
                        <option>Completed</option>
                      </select>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="delete-laundry-btn"
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

export default Laundry