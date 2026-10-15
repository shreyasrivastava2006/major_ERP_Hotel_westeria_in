import { useMemo, useState } from 'react'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'

import { useHotel } from '../../context/HotelContext'
import { useHotelData } from '../../context/HotelDataContext'

import './CleaningSchedule.css'

const DEFAULT_SCHEDULE = [
  {
    id: 'CS-001',
    hotelId: 'HOTEL-001',
    room: '101',
    roomId: '101',
    assignedTo: 'Anita Sharma',
    task: 'Room Cleaning',
    date: new Date().toISOString().split('T')[0],
    shift: 'Morning',
    status: 'Pending',
    priority: 'Normal',
  },
  {
    id: 'CS-002',
    hotelId: 'HOTEL-001',
    room: '102',
    roomId: '102',
    assignedTo: 'Pooja Verma',
    task: 'Deep Cleaning',
    date: new Date().toISOString().split('T')[0],
    shift: 'Morning',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 'CS-003',
    hotelId: 'HOTEL-001',
    room: '205',
    roomId: '205',
    assignedTo: 'Neha Singh',
    task: 'Room Cleaning',
    date: new Date().toISOString().split('T')[0],
    shift: 'Evening',
    status: 'Completed',
    priority: 'Normal',
  },
]

const initialForm = {
  room: '',
  assignedTo: '',
  task: 'Room Cleaning',
  date: new Date().toISOString().split('T')[0],
  shift: 'Morning',
  status: 'Pending',
  priority: 'Normal',
}

function CleaningSchedule() {
  const { selectedHotel } = useHotel()

  const {
    rooms,
    staff,
    updateRoomStatus,
  } = useHotelData()

  const [schedule, setSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem(
        'wisteriaCleaningSchedule'
      )

      return saved
        ? JSON.parse(saved)
        : DEFAULT_SCHEDULE
    } catch {
      return DEFAULT_SCHEDULE
    }
  })

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] =
    useState(initialForm)

  const saveSchedule = (updated) => {
    setSchedule(updated)

    localStorage.setItem(
      'wisteriaCleaningSchedule',
      JSON.stringify(updated)
    )
  }

  const hotelRooms = useMemo(() => {
    if (!selectedHotel) return rooms

    const hasHotelData = rooms.some(
      (room) => room.hotelId
    )

    if (!hasHotelData) return rooms

    return rooms.filter(
      (room) =>
        String(room.hotelId) ===
        String(selectedHotel.id)
    )
  }, [rooms, selectedHotel])

  const hotelStaff = useMemo(() => {
    if (!selectedHotel) return staff

    const hasHotelData = staff.some(
      (member) => member.hotelId
    )

    if (!hasHotelData) return staff

    return staff.filter(
      (member) =>
        String(member.hotelId) ===
        String(selectedHotel.id)
    )
  }, [staff, selectedHotel])

  const hotelSchedule = useMemo(() => {
    if (!selectedHotel) return schedule

    const hasHotelData = schedule.some(
      (item) => item.hotelId
    )

    if (!hasHotelData) return schedule

    return schedule.filter(
      (item) =>
        String(item.hotelId) ===
        String(selectedHotel.id)
    )
  }, [schedule, selectedHotel])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const addSchedule = (e) => {
    e.preventDefault()

    if (!formData.room) {
      alert('Please select a room.')
      return
    }

    const room = hotelRooms.find(
      (item) =>
        String(
          item.roomNumber ??
            item.number ??
            item.id
        ) === String(formData.room)
    )

    const staffMember = hotelStaff.find(
      (member) =>
        String(member.name) ===
        String(formData.assignedTo)
    )

    const newSchedule = {
      id: `CS-${Date.now()}`,
      ...(selectedHotel
        ? {
            hotelId: selectedHotel.id,
            hotelName: selectedHotel.name,
          }
        : {}),
      room: formData.room,
      roomId: room?.id ?? '',
      assignedTo:
        staffMember?.name ||
        formData.assignedTo ||
        'Unassigned',
      task: formData.task,
      date: formData.date,
      shift: formData.shift,
      status: formData.status,
      priority: formData.priority,
    }

    saveSchedule([
      newSchedule,
      ...schedule,
    ])

    setFormData({
      ...initialForm,
      date: new Date()
        .toISOString()
        .split('T')[0],
    })

    setShowForm(false)
  }

  const updateStatus = (
    id,
    newStatus
  ) => {
    const selectedItem =
      schedule.find(
        (item) =>
          String(item.id) ===
          String(id)
      )

    const updated = schedule.map(
      (item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              status: newStatus,
            }
          : item
    )

    saveSchedule(updated)

    if (selectedItem?.roomId) {
      if (newStatus === 'Completed') {
        updateRoomStatus(
          selectedItem.roomId,
          'Available'
        )
      }

      if (
        newStatus === 'In Progress' ||
        newStatus === 'Pending'
      ) {
        updateRoomStatus(
          selectedItem.roomId,
          'Maintenance'
        )
      }
    }
  }

  const deleteSchedule = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this cleaning schedule?'
    )

    if (!confirmed) return

    saveSchedule(
      schedule.filter(
        (item) =>
          String(item.id) !==
          String(id)
      )
    )
  }

  const pendingCount =
    hotelSchedule.filter(
      (item) =>
        item.status === 'Pending'
    ).length

  const progressCount =
    hotelSchedule.filter(
      (item) =>
        item.status === 'In Progress'
    ).length

  const completedCount =
    hotelSchedule.filter(
      (item) =>
        item.status === 'Completed'
    ).length

  return (
    <MainLayout>

      <div className="cleaning-schedule-page">

        <Breadcrumb
          items={[
            'Housekeeping',
            'Cleaning Schedule',
          ]}
        />

        <div className="cleaning-page-header">

          <PageHeader
            title="Cleaning Schedule"
            subtitle={
              selectedHotel
                ? `Manage cleaning schedules for ${selectedHotel.name}`
                : 'Manage daily room cleaning schedules'
            }
          />

          <button
            type="button"
            className="add-schedule-btn"
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            <i className="bi bi-calendar-plus-fill"></i>

            {showForm
              ? 'Close Form'
              : 'Add Schedule'}
          </button>

        </div>

        {selectedHotel && (
          <div className="cleaning-hotel-bar">

            <div className="cleaning-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <span>
                SELECTED PROPERTY
              </span>

              <strong>
                {selectedHotel.name}
              </strong>

              <small>
                {selectedHotel.code} •{' '}
                {selectedHotel.category} •{' '}
                {selectedHotel.address?.city},{' '}
                {selectedHotel.address?.state}
              </small>
            </div>

          </div>
        )}

        <div className="cleaning-stats">

          <div className="cleaning-stat-card">
            <div className="cleaning-stat-icon">
              <i className="bi bi-hourglass-split"></i>
            </div>

            <div>
              <span>Pending</span>
              <h2>{pendingCount}</h2>
            </div>
          </div>

          <div className="cleaning-stat-card">
            <div className="cleaning-stat-icon progress-icon">
              <i className="bi bi-arrow-repeat"></i>
            </div>

            <div>
              <span>In Progress</span>
              <h2>{progressCount}</h2>
            </div>
          </div>

          <div className="cleaning-stat-card">
            <div className="cleaning-stat-icon completed-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div>
              <span>Completed</span>
              <h2>{completedCount}</h2>
            </div>
          </div>

          <div className="cleaning-stat-card">
            <div className="cleaning-stat-icon total-icon">
              <i className="bi bi-calendar-check"></i>
            </div>

            <div>
              <span>Total</span>
              <h2>{hotelSchedule.length}</h2>
            </div>
          </div>

        </div>

        {showForm && (
          <div className="cleaning-form-card">

            <div className="cleaning-form-header">

              <div>
                <h2>
                  Add Cleaning Schedule
                </h2>

                <p>
                  Assign a room and housekeeping
                  staff for cleaning.
                </p>
              </div>

              <i className="bi bi-calendar2-check-fill"></i>

            </div>

            <form onSubmit={addSchedule}>

              <div className="cleaning-form-grid">

                <div className="cleaning-form-group">
                  <label>Room</label>

                  <select
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Room
                    </option>

                    {hotelRooms.map((room) => (
                      <option
                        key={room.id}
                        value={
                          room.roomNumber ??
                          room.number ??
                          room.id
                        }
                      >
                        Room{' '}
                        {room.roomNumber ??
                          room.number ??
                          room.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="cleaning-form-group">
                  <label>Staff</label>

                  <select
                    name="assignedTo"
                    value={
                      formData.assignedTo
                    }
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Staff
                    </option>

                    {hotelStaff.map(
                      (member) => (
                        <option
                          key={member.id}
                          value={member.name}
                        >
                          {member.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="cleaning-form-group">
                  <label>Task</label>

                  <select
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                  >
                    <option>
                      Room Cleaning
                    </option>
                    <option>
                      Deep Cleaning
                    </option>
                    <option>
                      Bathroom Cleaning
                    </option>
                    <option>
                      Linen Change
                    </option>
                    <option>
                      Inspection
                    </option>
                  </select>
                </div>

                <div className="cleaning-form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="cleaning-form-group">
                  <label>Shift</label>

                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                  >
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Night</option>
                  </select>
                </div>

                <div className="cleaning-form-group">
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

              </div>

              <div className="cleaning-form-actions">

                <button
                  type="button"
                  className="cancel-schedule-btn"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-schedule-btn"
                >
                  <i className="bi bi-check-circle-fill"></i>
                  Add Schedule
                </button>

              </div>

            </form>
          </div>
        )}

        <div className="cleaning-table-card">

          <div className="cleaning-table-header">

            <div>
              <h2>Daily Cleaning Schedule</h2>

              <p>
                Manage assigned cleaning tasks
                and their progress.
              </p>
            </div>

            <span>
              {hotelSchedule.length} Schedules
            </span>

          </div>

          <div className="cleaning-table-wrapper">

            <table className="cleaning-table">

              <thead>
                <tr>
                  <th>Room</th>
                  <th>Task</th>
                  <th>Staff</th>
                  <th>Date</th>
                  <th>Shift</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {hotelSchedule.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="cleaning-empty"
                    >
                      <i className="bi bi-calendar-x"></i>

                      <p>
                        No cleaning schedules
                        found.
                      </p>
                    </td>
                  </tr>
                ) : (
                  hotelSchedule.map(
                    (item) => (
                      <tr key={item.id}>

                        <td>
                          <strong>
                            Room {item.room}
                          </strong>
                        </td>

                        <td>
                          {item.task}
                        </td>

                        <td>
                          {item.assignedTo ||
                            'Unassigned'}
                        </td>

                        <td>
                          {item.date}
                        </td>

                        <td>
                          {item.shift}
                        </td>

                        <td>
                          {item.priority}
                        </td>

                        <td>
                          <select
                            value={
                              item.status
                            }
                            onChange={(e) =>
                              updateStatus(
                                item.id,
                                e.target.value
                              )
                            }
                            className={`cleaning-status-select ${item.status
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                '-'
                              )}`}
                          >
                            <option>
                              Pending
                            </option>
                            <option>
                              In Progress
                            </option>
                            <option>
                              Completed
                            </option>
                          </select>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="delete-schedule-btn"
                            onClick={() =>
                              deleteSchedule(
                                item.id
                              )
                            }
                            title="Delete Schedule"
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </td>

                      </tr>
                    )
                  )
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