import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'

import { useHotel } from '../../context/HotelContext'

import './Housekeeping.css'

function Housekeeping() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const [tasks, setTasks] = useState([
    {
      id: 1,
      room: '101',
      guest: 'Rahul Sharma',
      staff: 'Anita Sharma',
      task: 'Room Cleaning',
      priority: 'High',
      status: 'In Progress',
      time: '10:00 AM',
    },
    {
      id: 2,
      room: '205',
      guest: 'Priya Singh',
      staff: 'Pooja Verma',
      task: 'Bathroom Cleaning',
      priority: 'Medium',
      status: 'Pending',
      time: '11:00 AM',
    },
    {
      id: 3,
      room: '302',
      guest: 'Aman Verma',
      staff: 'Neha Singh',
      task: 'Room Cleaning',
      priority: 'Low',
      status: 'Completed',
      time: '09:30 AM',
    },
    {
      id: 4,
      room: '405',
      guest: 'Sneha Gupta',
      staff: 'Ravi Kumar',
      task: 'Deep Cleaning',
      priority: 'High',
      status: 'Pending',
      time: '12:00 PM',
    },
  ])

  const updateStatus = (id, status) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    )
  }

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.status === 'Completed'
  ).length

  const pendingTasks = tasks.filter(
    (task) => task.status === 'Pending'
  ).length

  const progressTasks = tasks.filter(
    (task) => task.status === 'In Progress'
  ).length

  return (
    <MainLayout>
      <div className="housekeeping-page">
        <Breadcrumb items={['Housekeeping']} />

        <div className="housekeeping-heading-row">
          <PageHeader
            title="Housekeeping"
            subtitle={
              selectedHotel
                ? `Manage housekeeping operations for ${selectedHotel.name}`
                : 'Manage room cleaning, inspections and housekeeping staff'
            }
          />

          <div className="housekeeping-header-icon">
            <i className="bi bi-stars"></i>
          </div>
        </div>

        {selectedHotel && (
          <div className="housekeeping-hotel-bar">
            <div className="housekeeping-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="housekeeping-hotel-info">
              <span>SELECTED PROPERTY</span>

              <strong>{selectedHotel.name}</strong>

              <small>
                {selectedHotel.code} • {selectedHotel.category} •{' '}
                {selectedHotel.address.city},{' '}
                {selectedHotel.address.state}
              </small>
            </div>
          </div>
        )}

        {/* =====================================
            STATISTICS
        ===================================== */}

        <div className="housekeeping-stats">
          <div className="housekeeping-stat-card">
            <div className="housekeeping-stat-icon">
              <i className="bi bi-list-check"></i>
            </div>

            <div>
              <span>Total Tasks</span>
              <h2>{totalTasks}</h2>
            </div>
          </div>

          <div className="housekeeping-stat-card">
            <div className="housekeeping-stat-icon pending">
              <i className="bi bi-clock"></i>
            </div>

            <div>
              <span>Pending</span>
              <h2>{pendingTasks}</h2>
            </div>
          </div>

          <div className="housekeeping-stat-card">
            <div className="housekeeping-stat-icon progress">
              <i className="bi bi-arrow-repeat"></i>
            </div>

            <div>
              <span>In Progress</span>
              <h2>{progressTasks}</h2>
            </div>
          </div>

          <div className="housekeeping-stat-card">
            <div className="housekeeping-stat-icon completed">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Completed</span>
              <h2>{completedTasks}</h2>
            </div>
          </div>
        </div>

        {/* =====================================
            MANAGEMENT SECTION
        ===================================== */}

        <div className="housekeeping-section">
          <div className="housekeeping-section-title">
            <div>
              <h2>Housekeeping Management</h2>
              <p>
                Quick access to housekeeping operations
              </p>
            </div>
          </div>

          <div className="housekeeping-actions">
            <button
              type="button"
              className="housekeeping-action-card"
              onClick={() =>
                navigate('/housekeeping/cleaning-schedule')
              }
            >
              <div className="action-icon cleaning-icon">
                <i className="bi bi-calendar-check-fill"></i>
              </div>

              <div className="action-content">
                <h3>Cleaning Schedule</h3>
                <p>
                  Create and manage daily room cleaning schedules.
                </p>
              </div>

              <i className="bi bi-chevron-right action-arrow"></i>
            </button>

            <button
              type="button"
              className="housekeeping-action-card"
              onClick={() =>
                navigate('/housekeeping/room-inspection')
              }
            >
              <div className="action-icon inspection-icon">
                <i className="bi bi-clipboard-check-fill"></i>
              </div>

              <div className="action-content">
                <h3>Room Inspection</h3>
                <p>
                  Inspect rooms and check cleanliness standards.
                </p>
              </div>

              <i className="bi bi-chevron-right action-arrow"></i>
            </button>

            <button
              type="button"
              className="housekeeping-action-card"
              onClick={() =>
                navigate('/housekeeping/staff-management')
              }
            >
              <div className="action-icon staff-icon">
                <i className="bi bi-people-fill"></i>
              </div>

              <div className="action-content">
                <h3>Staff Management</h3>
                <p>
                  Manage housekeeping staff, shifts and assignments.
                </p>
              </div>

              <i className="bi bi-chevron-right action-arrow"></i>
            </button>
          </div>
        </div>

        {/* =====================================
            TASK TABLE
        ===================================== */}

        <div className="housekeeping-table-card">
          <div className="housekeeping-table-header">
            <div>
              <h2>Today's Housekeeping Tasks</h2>
              <p>
                Monitor room cleaning and housekeeping activities.
              </p>
            </div>

            <span className="housekeeping-count">
              {tasks.length} Tasks
            </span>
          </div>

          <div className="housekeeping-table-wrapper">
            <table className="housekeeping-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Guest</th>
                  <th>Task</th>
                  <th>Staff</th>
                  <th>Priority</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <div className="housekeeping-room">
                          <i className="bi bi-door-closed"></i>
                          <strong>{task.room}</strong>
                        </div>
                      </td>

                      <td>{task.guest}</td>

                      <td>{task.task}</td>

                      <td>
                        <div className="housekeeping-staff">
                          <div className="staff-avatar">
                            {task.staff.charAt(0)}
                          </div>

                          <span>{task.staff}</span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`priority-badge ${task.priority
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td>{task.time}</td>

                      <td>
                        <select
                          className={`task-status ${task.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                          value={task.status}
                          onChange={(e) =>
                            updateStatus(
                              task.id,
                              e.target.value
                            )
                          }
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="housekeeping-empty"
                    >
                      <i className="bi bi-clipboard-x"></i>

                      <strong>No housekeeping tasks</strong>

                      <span>
                        There are currently no housekeeping tasks.
                      </span>
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

export default Housekeeping