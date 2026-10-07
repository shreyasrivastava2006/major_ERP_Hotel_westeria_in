import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import { useHotel } from '../../context/HotelContext'
import './CleaningSchedule.css'

function CleaningSchedule() {
  const { selectedHotel } = useHotel()

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      room: '101',
      guest: 'Rahul Sharma',
      cleaningType: 'Regular Cleaning',
      staff: 'Anjali',
      date: '2026-09-14',
      time: '09:00 AM',
      status: 'Pending',
    },
    {
      id: 2,
      room: '205',
      guest: 'Priya Singh',
      cleaningType: 'Deep Cleaning',
      staff: 'Neha',
      date: '2026-09-14',
      time: '10:30 AM',
      status: 'In Progress',
    },
    {
      id: 3,
      room: '302',
      guest: 'Aman Verma',
      cleaningType: 'Checkout Cleaning',
      staff: 'Riya',
      date: '2026-09-14',
      time: '12:00 PM',
      status: 'Completed',
    },
    {
      id: 4,
      room: '405',
      guest: 'Sneha Kapoor',
      cleaningType: 'Regular Cleaning',
      staff: 'Pooja',
      date: '2026-09-15',
      time: '09:30 AM',
      status: 'Pending',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All Status')

  const [newSchedule, setNewSchedule] = useState({
    room: '',
    guest: '',
    cleaningType: 'Regular Cleaning',
    staff: '',
    date: '',
    time: '',
    status: 'Pending',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setNewSchedule((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const addSchedule = (e) => {
    e.preventDefault()

    if (
      !newSchedule.room ||
      !newSchedule.staff ||
      !newSchedule.date ||
      !newSchedule.time
    ) {
      alert('Please fill all required fields.')
      return
    }

    const schedule = {
      id: Date.now(),
      ...newSchedule,
    }

    setSchedules((previous) => [...previous, schedule])

    setNewSchedule({
      room: '',
      guest: '',
      cleaningType: 'Regular Cleaning',
      staff: '',
      date: '',
      time: '',
      status: 'Pending',
    })

    setShowForm(false)
  }

  const updateStatus = (id, status) => {
    setSchedules((previous) =>
      previous.map((schedule) =>
        schedule.id === id
          ? { ...schedule, status }
          : schedule
      )
    )
  }

  const deleteSchedule = (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this schedule?'
      )
    ) {
      setSchedules((previous) =>
        previous.filter((schedule) => schedule.id !== id)
      )
    }
  }

  const pendingCount = schedules.filter(
    (item) => item.status === 'Pending'
  ).length

  const progressCount = schedules.filter(
    (item) => item.status === 'In Progress'
  ).length

  const completedCount = schedules.filter(
    (item) => item.status === 'Completed'
  ).length

  const filteredSchedules =
    statusFilter === 'All Status'
      ? schedules
      : schedules.filter(
          (schedule) => schedule.status === statusFilter
        )

  return (
    <MainLayout>
      <div className="cleaning-schedule-page">
        <Breadcrumb
          items={['Housekeeping', 'Cleaning Schedule']}
        />

        <div className="schedule-page-header">
          <PageHeader
            title="Cleaning Schedule"
            subtitle={
              selectedHotel
                ? `Schedule and manage cleaning activities for ${selectedHotel.name}`
                : 'Schedule and manage room cleaning activities.'
            }
          />

          <button
            type="button"
            className="add-schedule-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <i className="bi bi-plus-lg"></i>
            {showForm ? 'Close Form' : 'Add Schedule'}
          </button>
        </div>

        {selectedHotel && (
          <div className="schedule-hotel-bar">
            <div className="schedule-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="schedule-hotel-info">
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

        <div className="schedule-stats">
          <div className="schedule-stat">
            <div className="schedule-stat-icon">
              <i className="bi bi-calendar-check"></i>
            </div>

            <div>
              <span>Total Schedule</span>
              <h2>{schedules.length}</h2>
            </div>
          </div>

          <div className="schedule-stat">
            <div className="schedule-stat-icon pending">
              <i className="bi bi-clock"></i>
            </div>

            <div>
              <span>Pending</span>
              <h2>{pendingCount}</h2>
            </div>
          </div>

          <div className="schedule-stat">
            <div className="schedule-stat-icon progress">
              <i className="bi bi-arrow-repeat"></i>
            </div>

            <div>
              <span>In Progress</span>
              <h2>{progressCount}</h2>
            </div>
          </div>

          <div className="schedule-stat">
            <div className="schedule-stat-icon completed">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Completed</span>
              <h2>{completedCount}</h2>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="schedule-form-card">
            <div className="form-title">
              <div>
                <h2>Add Cleaning Schedule</h2>
                <p>Create a new housekeeping task.</p>
              </div>

              <button
                type="button"
                className="close-form-btn"
                onClick={() => setShowForm(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={addSchedule}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Room Number *</label>

                  <input
                    type="text"
                    name="room"
                    placeholder="e.g. 101"
                    value={newSchedule.room}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Guest Name</label>

                  <input
                    type="text"
                    name="guest"
                    placeholder="Guest name"
                    value={newSchedule.guest}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Cleaning Type *</label>

                  <select
                    name="cleaningType"
                    value={newSchedule.cleaningType}
                    onChange={handleChange}
                  >
                    <option>Regular Cleaning</option>
                    <option>Deep Cleaning</option>
                    <option>Checkout Cleaning</option>
                    <option>Room Refresh</option>
                    <option>Maintenance Cleaning</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Assigned Staff *</label>

                  <select
                    name="staff"
                    value={newSchedule.staff}
                    onChange={handleChange}
                  >
                    <option value="">Select Staff</option>
                    <option>Anjali</option>
                    <option>Neha</option>
                    <option>Riya</option>
                    <option>Pooja</option>
                    <option>Priya</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date *</label>

                  <input
                    type="date"
                    name="date"
                    value={newSchedule.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Time *</label>

                  <input
                    type="time"
                    name="time"
                    value={newSchedule.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-schedule-btn"
                >
                  <i className="bi bi-check-lg"></i>
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="schedule-table-card">
          <div className="table-heading">
            <div>
              <h2>Scheduled Cleaning</h2>
              <p>
                All housekeeping cleaning schedules for this property.
              </p>
            </div>

            <div className="table-filter">
              <i className="bi bi-funnel"></i>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="schedule-results">
            Showing <strong>{filteredSchedules.length}</strong> of{' '}
            <strong>{schedules.length}</strong> schedules
          </div>

          <div className="schedule-table-wrapper">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Guest</th>
                  <th>Cleaning Type</th>
                  <th>Staff</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <tr key={schedule.id}>
                      <td>
                        <div className="room-cell">
                          <i className="bi bi-door-closed"></i>
                          <strong>{schedule.room}</strong>
                        </div>
                      </td>

                      <td>
                        {schedule.guest || '—'}
                      </td>

                      <td>
                        {schedule.cleaningType}
                      </td>

                      <td>
                        <div className="staff-cell">
                          <div className="staff-circle">
                            {schedule.staff.charAt(0)}
                          </div>

                          {schedule.staff}
                        </div>
                      </td>

                      <td>{schedule.date}</td>

                      <td>{schedule.time}</td>

                      <td>
                        <select
                          className={`schedule-status ${schedule.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                          value={schedule.status}
                          onChange={(e) =>
                            updateStatus(
                              schedule.id,
                              e.target.value
                            )
                          }
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            deleteSchedule(schedule.id)
                          }
                          title="Delete Schedule"
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
                      className="schedule-empty"
                    >
                      <i className="bi bi-calendar-x"></i>
                      <strong>No schedules found</strong>
                      <span>
                        Try changing the status filter.
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

export default CleaningSchedule