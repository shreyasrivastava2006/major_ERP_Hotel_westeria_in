import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './MaintenanceRequests.css'

function MaintenanceRequests() {
  const navigate = useNavigate()

  const [requests, setRequests] = useState([
    {
      id: 'REQ-M1001',
      guest: 'Rahul Sharma',
      room: 'Room 101',
      issue: 'AC not cooling',
      priority: 'High',
      date: '14 Sep 2026',
      status: 'Pending',
    },
    {
      id: 'REQ-M1002',
      guest: 'Priya Singh',
      room: 'Room 205',
      issue: 'Water leakage',
      priority: 'High',
      date: '14 Sep 2026',
      status: 'In Progress',
    },
    {
      id: 'REQ-M1003',
      guest: 'Aman Verma',
      room: 'Room 302',
      issue: 'TV issue',
      priority: 'Low',
      date: '13 Sep 2026',
      status: 'Completed',
    },
    {
      id: 'REQ-M1004',
      guest: 'Housekeeping',
      room: 'Room 204',
      issue: 'Broken light',
      priority: 'Medium',
      date: '13 Sep 2026',
      status: 'Pending',
    },
  ])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredRequests = requests.filter((request) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      request.id.toLowerCase().includes(searchText) ||
      request.guest.toLowerCase().includes(searchText) ||
      request.room.toLowerCase().includes(searchText) ||
      request.issue.toLowerCase().includes(searchText)

    const matchesStatus =
      statusFilter === 'All' ||
      request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const updateStatus = (id, newStatus) => {
    setRequests((previous) =>
      previous.map((request) =>
        request.id === id
          ? { ...request, status: newStatus }
          : request
      )
    )
  }

  return (
    <MainLayout>
      <div className="maintenance-requests-page">

        <Breadcrumb
          items={['Maintenance', 'Requests']}
        />

        <div className="maintenance-requests-header">

          <PageHeader
            title="Maintenance Requests"
            subtitle="Manage guest and hotel maintenance requests"
          />

          <button
            type="button"
            className="back-maintenance-btn"
            onClick={() => navigate('/maintenance')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Maintenance
          </button>

        </div>

        <div className="maintenance-requests-card">

          {/* CARD HEADER */}
          <div className="maintenance-requests-card-header">

            <div>
              <h2>Maintenance Requests</h2>
              <p>
                Track repair requests, priorities and completion status
              </p>
            </div>

            <span className="maintenance-requests-count">
              {filteredRequests.length} Requests
            </span>

          </div>

          {/* TOOLBAR */}
          <div className="maintenance-requests-toolbar">

            <div className="maintenance-requests-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search requests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

          </div>

          {/* TABLE */}
          <div className="maintenance-requests-table-wrapper">

            <table className="maintenance-requests-table">

              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Guest / Department</th>
                  <th>Room</th>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="maintenance-request-empty"
                    >
                      <i className="bi bi-search"></i>
                      <span>No maintenance requests found.</span>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <tr key={request.id}>

                      <td>
                        <strong>{request.id}</strong>
                      </td>

                      <td>
                        <div className="maintenance-request-guest">
                          <div className="maintenance-request-icon">
                            <i className="bi bi-person"></i>
                          </div>

                          <span>{request.guest}</span>
                        </div>
                      </td>

                      <td>
                        <span className="maintenance-request-room">
                          <i className="bi bi-door-open"></i>
                          {request.room}
                        </span>
                      </td>

                      <td>{request.issue}</td>

                      <td>
                        <span
                          className={`maintenance-request-priority ${request.priority.toLowerCase()}`}
                        >
                          {request.priority}
                        </span>
                      </td>

                      <td>{request.date}</td>

                      <td>
                        <span
                          className={`maintenance-request-status ${request.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td>

                        {request.status === 'Pending' && (
                          <button
                            type="button"
                            className="maintenance-request-action start"
                            onClick={() =>
                              updateStatus(
                                request.id,
                                'In Progress'
                              )
                            }
                          >
                            <i className="bi bi-play-fill"></i>
                            Start
                          </button>
                        )}

                        {request.status === 'In Progress' && (
                          <button
                            type="button"
                            className="maintenance-request-action complete"
                            onClick={() =>
                              updateStatus(
                                request.id,
                                'Completed'
                              )
                            }
                          >
                            <i className="bi bi-check-lg"></i>
                            Complete
                          </button>
                        )}

                        {request.status === 'Completed' && (
                          <span className="maintenance-request-done">
                            <i className="bi bi-check-circle-fill"></i>
                            Done
                          </span>
                        )}

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  )
}

export default MaintenanceRequests