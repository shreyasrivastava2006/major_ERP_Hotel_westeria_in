import { useMemo, useState } from 'react'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'

import { useHotel } from '../../context/HotelContext'
import { useHotelData } from '../../context/HotelDataContext'

import './StaffManagement.css'

const initialForm = {
  name: '',
  employeeId: '',
  designation: 'Room Attendant',
  shift: 'Morning',
  rooms: '',
  availability: 'Available',
  taskStatus: 'Available',
}

function StaffManagement() {
  const { selectedHotel } = useHotel()

  const {
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
  } = useHotelData()

  const [showForm, setShowForm] =
    useState(false)

  const [formData, setFormData] =
    useState(initialForm)

  const hotelStaff = useMemo(() => {
    if (!selectedHotel) {
      return staff
    }

    const hasHotelData = staff.some(
      (member) => member.hotelId
    )

    if (!hasHotelData) {
      return staff
    }

    return staff.filter(
      (member) =>
        String(member.hotelId) ===
        String(selectedHotel.id)
    )
  }, [staff, selectedHotel])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleAddStaff = (e) => {
    e.preventDefault()

    if (
      !formData.name.trim() ||
      !formData.employeeId.trim()
    ) {
      alert(
        'Please enter staff name and employee ID.'
      )
      return
    }

    const employeeExists =
      staff.some(
        (member) =>
          String(
            member.employeeId
          ).toLowerCase() ===
          formData.employeeId
            .trim()
            .toLowerCase()
      )

    if (employeeExists) {
      alert(
        'This employee ID already exists.'
      )
      return
    }

    const newStaff = {
      id: `STAFF-${Date.now()}`,

      ...(selectedHotel
        ? {
            hotelId:
              selectedHotel.id,
            hotelName:
              selectedHotel.name,
          }
        : {}),

      name: formData.name.trim(),

      employeeId:
        formData.employeeId
          .trim()
          .toUpperCase(),

      designation:
        formData.designation,

      shift: formData.shift,

      rooms: formData.rooms.trim(),

      availability:
        formData.availability,

      taskStatus:
        formData.taskStatus,
    }

    addStaff(newStaff)

    setFormData({
      ...initialForm,
    })

    setShowForm(false)
  }

  const handleDeleteStaff = (id) => {
    const confirmDelete =
      window.confirm(
        'Are you sure you want to remove this staff member?'
      )

    if (!confirmDelete) return

    deleteStaff(id)
  }

  const updateAvailability = (
    id,
    value
  ) => {
    updateStaff(id, {
      availability: value,
    })
  }

  const updateTaskStatus = (
    id,
    value
  ) => {
    updateStaff(id, {
      taskStatus: value,
    })
  }

  const totalStaff =
    hotelStaff.length

  const availableStaff =
    hotelStaff.filter(
      (member) =>
        member.availability ===
        'Available'
    ).length

  const busyStaff =
    hotelStaff.filter(
      (member) =>
        member.availability ===
        'Busy'
    ).length

  const onDutyStaff =
    hotelStaff.filter(
      (member) =>
        member.taskStatus ===
        'On Duty'
    ).length

  return (
    <MainLayout>

      <div className="staff-management-page">

        <Breadcrumb
          items={[
            'Housekeeping',
            'Staff Management',
          ]}
        />

        <div className="staff-page-header">

          <PageHeader
            title="Staff Management"
            subtitle={
              selectedHotel
                ? `Manage housekeeping staff for ${selectedHotel.name}`
                : 'Manage housekeeping staff, shifts and room assignments'
            }
          />

          <button
            type="button"
            className="add-staff-btn"
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            <i className="bi bi-person-plus-fill"></i>

            {showForm
              ? 'Close Form'
              : 'Add Staff'}
          </button>

        </div>

        {selectedHotel && (
          <div className="staff-hotel-bar">

            <div className="staff-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="staff-hotel-info">

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

        <div className="staff-stats">

          <div className="staff-stat-card">

            <div className="staff-stat-icon">
              <i className="bi bi-people-fill"></i>
            </div>

            <div>
              <span>Total Staff</span>
              <h2>{totalStaff}</h2>
            </div>

          </div>

          <div className="staff-stat-card">

            <div className="staff-stat-icon available-icon">
              <i className="bi bi-person-check-fill"></i>
            </div>

            <div>
              <span>Available</span>
              <h2>
                {availableStaff}
              </h2>
            </div>

          </div>

          <div className="staff-stat-card">

            <div className="staff-stat-icon busy-icon">
              <i className="bi bi-person-workspace"></i>
            </div>

            <div>
              <span>Busy</span>
              <h2>{busyStaff}</h2>
            </div>

          </div>

          <div className="staff-stat-card">

            <div className="staff-stat-icon duty-icon">
              <i className="bi bi-clipboard-check-fill"></i>
            </div>

            <div>
              <span>On Duty</span>
              <h2>{onDutyStaff}</h2>
            </div>

          </div>

        </div>

        {showForm && (
          <div className="staff-form-card">

            <div className="form-card-header">

              <div>
                <h2>
                  Add Housekeeping Staff
                </h2>

                <p>
                  Create a new staff member
                  and assign housekeeping
                  duties.
                </p>
              </div>

              <i className="bi bi-person-badge-fill"></i>

            </div>

            <form
              onSubmit={
                handleAddStaff
              }
            >

              <div className="staff-form-grid">

                <div className="staff-form-group">

                  <label>
                    Staff Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter staff name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="staff-form-group">

                  <label>
                    Employee ID
                  </label>

                  <input
                    type="text"
                    name="employeeId"
                    placeholder="Example: HK005"
                    value={
                      formData.employeeId
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="staff-form-group">

                  <label>
                    Designation
                  </label>

                  <select
                    name="designation"
                    value={
                      formData.designation
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option>
                      Housekeeping Supervisor
                    </option>

                    <option>
                      Room Attendant
                    </option>

                    <option>
                      Laundry Staff
                    </option>

                    <option>
                      Public Area Attendant
                    </option>

                    <option>
                      Housekeeping Manager
                    </option>

                  </select>

                </div>

                <div className="staff-form-group">

                  <label>
                    Shift
                  </label>

                  <select
                    name="shift"
                    value={
                      formData.shift
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option>
                      Morning
                    </option>

                    <option>
                      Afternoon
                    </option>

                    <option>
                      Evening
                    </option>

                    <option>
                      Night
                    </option>

                  </select>

                </div>

                <div className="staff-form-group">

                  <label>
                    Assigned Rooms / Area
                  </label>

                  <input
                    type="text"
                    name="rooms"
                    placeholder="Example: 201, 202, 205"
                    value={
                      formData.rooms
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                <div className="staff-form-group">

                  <label>
                    Availability
                  </label>

                  <select
                    name="availability"
                    value={
                      formData.availability
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option>
                      Available
                    </option>

                    <option>
                      Busy
                    </option>

                    <option>
                      On Leave
                    </option>

                  </select>

                </div>

                <div className="staff-form-group">

                  <label>
                    Task Status
                  </label>

                  <select
                    name="taskStatus"
                    value={
                      formData.taskStatus
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option>
                      Available
                    </option>

                    <option>
                      On Duty
                    </option>

                    <option>
                      Cleaning
                    </option>

                    <option>
                      Inspection
                    </option>

                    <option>
                      Completed
                    </option>

                  </select>

                </div>

              </div>

              <div className="staff-form-actions">

                <button
                  type="button"
                  className="cancel-staff-btn"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-staff-btn"
                >
                  <i className="bi bi-check-circle-fill"></i>
                  Add Staff
                </button>

              </div>

            </form>

          </div>
        )}

        <div className="staff-table-card">

          <div className="staff-table-header">

            <div>

              <h2>
                Housekeeping Staff
              </h2>

              <p>
                View and manage all
                housekeeping team members.
              </p>

            </div>

            <div className="staff-count">
              {hotelStaff.length}{' '}
              Members
            </div>

          </div>

          <div className="staff-table-wrapper">

            <table className="staff-table">

              <thead>

                <tr>
                  <th>Staff</th>
                  <th>Designation</th>
                  <th>Shift</th>
                  <th>Assigned Rooms</th>
                  <th>Availability</th>
                  <th>Task Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {hotelStaff.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="no-staff"
                    >

                      <i className="bi bi-people"></i>

                      <p>
                        No staff members
                        found.
                      </p>

                    </td>

                  </tr>

                ) : (

                  hotelStaff.map(
                    (member) => (

                      <tr
                        key={
                          member.id
                        }
                      >

                        <td>

                          <div className="staff-person">

                            <div className="staff-avatar">
                              {member.name?.charAt(
                                0
                              )}
                            </div>

                            <div>

                              <strong>
                                {
                                  member.name
                                }
                              </strong>

                              <span>
                                {
                                  member.employeeId
                                }
                              </span>

                            </div>

                          </div>

                        </td>

                        <td>

                          <span className="designation-text">
                            {
                              member.designation
                            }
                          </span>

                        </td>

                        <td>

                          <span className="shift-badge">

                            <i className="bi bi-clock"></i>

                            {
                              member.shift
                            }

                          </span>

                        </td>

                        <td>

                          <div className="room-assignment">

                            <i className="bi bi-door-open"></i>

                            <span>
                              {member.rooms ||
                                'Not Assigned'}
                            </span>

                          </div>

                        </td>

                        <td>

                          <select
                            className={`availability-select ${(
                              member.availability ||
                              ''
                            )
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                '-'
                              )}`}
                            value={
                              member.availability ||
                              'Available'
                            }
                            onChange={(e) =>
                              updateAvailability(
                                member.id,
                                e.target.value
                              )
                            }
                          >

                            <option>
                              Available
                            </option>

                            <option>
                              Busy
                            </option>

                            <option>
                              On Leave
                            </option>

                          </select>

                        </td>

                        <td>

                          <select
                            className={`task-status-select ${(
                              member.taskStatus ||
                              ''
                            )
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                '-'
                              )}`}
                            value={
                              member.taskStatus ||
                              'Available'
                            }
                            onChange={(e) =>
                              updateTaskStatus(
                                member.id,
                                e.target.value
                              )
                            }
                          >

                            <option>
                              Available
                            </option>

                            <option>
                              On Duty
                            </option>

                            <option>
                              Cleaning
                            </option>

                            <option>
                              Inspection
                            </option>

                            <option>
                              Completed
                            </option>

                          </select>

                        </td>

                        <td>

                          <button
                            type="button"
                            className="delete-staff-btn"
                            onClick={() =>
                              handleDeleteStaff(
                                member.id
                              )
                            }
                            title="Delete Staff"
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

export default StaffManagement