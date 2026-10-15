import { useMemo, useState } from 'react'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'

import { useHotel } from '../../context/HotelContext'
import { useHotelData } from '../../context/HotelDataContext'

import './RoomInspection.css'

const DEFAULT_INSPECTIONS = [
  {
    id: 'RI-001',
    hotelId: 'HOTEL-001',
    room: '101',
    inspector: 'Anita Sharma',
    condition: 'Excellent',
    cleanliness: 'Excellent',
    score: 95,
    status: 'Pass',
    remarks: 'Room is ready for guest.',
    checklist: {
      bed: true,
      bathroom: true,
      floor: true,
      linen: true,
      amenities: true,
      overall: true,
    },
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'RI-002',
    hotelId: 'HOTEL-001',
    room: '205',
    inspector: 'Neha Singh',
    condition: 'Good',
    cleanliness: 'Good',
    score: 86,
    status: 'Pass',
    remarks: 'Minor maintenance required.',
    checklist: {
      bed: true,
      bathroom: true,
      floor: true,
      linen: true,
      amenities: false,
      overall: true,
    },
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'RI-003',
    hotelId: 'HOTEL-001',
    room: '302',
    inspector: 'Riya Sharma',
    condition: 'Needs Attention',
    cleanliness: 'Needs Attention',
    score: 62,
    status: 'Fail',
    remarks: 'Bathroom and linen need attention.',
    checklist: {
      bed: true,
      bathroom: false,
      floor: true,
      linen: false,
      amenities: false,
      overall: true,
    },
    date: new Date().toISOString().split('T')[0],
  },
]

const initialForm = {
  room: '',
  inspector: '',
  condition: 'Good',
  cleanliness: 'Good',
  remarks: '',
  checklist: {
    bed: true,
    bathroom: true,
    floor: true,
    linen: true,
    amenities: true,
    overall: true,
  },
}

function RoomInspection() {
  const { selectedHotel } = useHotel()

  const {
    rooms,
    staff,
    updateRoomStatus,
  } = useHotelData()

  const [inspections, setInspections] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            'wisteriaRoomInspections'
          )

        return saved
          ? JSON.parse(saved)
          : DEFAULT_INSPECTIONS
      } catch {
        return DEFAULT_INSPECTIONS
      }
    })

  const [showForm, setShowForm] =
    useState(false)

  const [filter, setFilter] =
    useState('All')

  const [formData, setFormData] =
    useState(initialForm)

  const saveInspections = (updated) => {
    setInspections(updated)

    localStorage.setItem(
      'wisteriaRoomInspections',
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

  const hotelInspections =
    useMemo(() => {
      if (!selectedHotel) {
        return inspections
      }

      const hasHotelData =
        inspections.some(
          (item) => item.hotelId
        )

      if (!hasHotelData) {
        return inspections
      }

      return inspections.filter(
        (item) =>
          String(item.hotelId) ===
          String(selectedHotel.id)
      )
    }, [
      inspections,
      selectedHotel,
    ])

  const filteredInspections =
    useMemo(() => {
      if (filter === 'All') {
        return hotelInspections
      }

      return hotelInspections.filter(
        (item) =>
          item.status === filter
      )
    }, [
      hotelInspections,
      filter,
    ])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleChecklistChange = (
    name
  ) => {
    setFormData((previous) => ({
      ...previous,
      checklist: {
        ...previous.checklist,
        [name]:
          !previous.checklist[name],
      },
    }))
  }

  const calculateScore = () => {
    const values = Object.values(
      formData.checklist
    )

    const passed = values.filter(
      Boolean
    ).length

    return Math.round(
      (passed / values.length) * 100
    )
  }

  const addInspection = (e) => {
    e.preventDefault()

    if (!formData.room) {
      alert('Please select a room.')
      return
    }

    if (!formData.inspector) {
      alert('Please select an inspector.')
      return
    }

    const selectedRoom =
      hotelRooms.find(
        (room) =>
          String(
            room.roomNumber ??
              room.number ??
              room.id
          ) ===
          String(formData.room)
      )

    const score =
      calculateScore()

    const newInspection = {
      id: `RI-${Date.now()}`,
      ...(selectedHotel
        ? {
            hotelId:
              selectedHotel.id,
            hotelName:
              selectedHotel.name,
          }
        : {}),
      room: formData.room,
      roomId:
        selectedRoom?.id ?? '',
      inspector:
        formData.inspector,
      condition:
        formData.condition,
      cleanliness:
        formData.cleanliness,
      checklist:
        formData.checklist,
      remarks:
        formData.remarks.trim(),
      score,
      status:
        score >= 70
          ? 'Pass'
          : 'Fail',
      date: new Date()
        .toISOString()
        .split('T')[0],
    }

    saveInspections([
      newInspection,
      ...inspections,
    ])

    if (selectedRoom?.id) {
      if (score >= 70) {
        updateRoomStatus(
          selectedRoom.id,
          'Available'
        )
      } else {
        updateRoomStatus(
          selectedRoom.id,
          'Maintenance'
        )
      }
    }

    setFormData({
      ...initialForm,
    })

    setShowForm(false)
  }

  const deleteInspection = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this inspection?'
    )

    if (!confirmed) return

    saveInspections(
      inspections.filter(
        (item) =>
          String(item.id) !==
          String(id)
      )
    )
  }

  const passed =
    hotelInspections.filter(
      (item) =>
        item.status === 'Pass'
    ).length

  const failed =
    hotelInspections.filter(
      (item) =>
        item.status === 'Fail'
    ).length

  const averageScore =
    hotelInspections.length
      ? Math.round(
          hotelInspections.reduce(
            (sum, item) =>
              sum +
              Number(item.score || 0),
            0
          ) /
            hotelInspections.length
        )
      : 0

  return (
    <MainLayout>

      <div className="room-inspection-page">

        <Breadcrumb
          items={[
            'Housekeeping',
            'Room Inspection',
          ]}
        />

        <div className="inspection-heading-row">

          <PageHeader
            title="Room Inspection"
            subtitle={
              selectedHotel
                ? `Inspect and monitor rooms for ${selectedHotel.name}`
                : 'Inspect rooms and monitor cleanliness standards'
            }
          />

          <button
            type="button"
            className="add-inspection-btn"
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            <i className="bi bi-clipboard-plus-fill"></i>

            {showForm
              ? 'Close Form'
              : 'New Inspection'}
          </button>

        </div>

        {selectedHotel && (
          <div className="inspection-hotel-bar">

            <div className="inspection-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="inspection-hotel-info">

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

        <div className="inspection-stats">

          <div className="inspection-stat-card">

            <div className="inspection-stat-icon">
              <i className="bi bi-clipboard-check-fill"></i>
            </div>

            <div>
              <span>Total Inspections</span>
              <h2>
                {hotelInspections.length}
              </h2>
            </div>

          </div>

          <div className="inspection-stat-card">

            <div className="inspection-stat-icon pass-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div>
              <span>Passed</span>
              <h2>{passed}</h2>
            </div>

          </div>

          <div className="inspection-stat-card">

            <div className="inspection-stat-icon fail-icon">
              <i className="bi bi-x-circle-fill"></i>
            </div>

            <div>
              <span>Failed</span>
              <h2>{failed}</h2>
            </div>

          </div>

          <div className="inspection-stat-card">

            <div className="inspection-stat-icon score-icon">
              <i className="bi bi-star-fill"></i>
            </div>

            <div>
              <span>Average Score</span>
              <h2>{averageScore}%</h2>
            </div>

          </div>

        </div>

        {showForm && (
          <div className="inspection-form-card">

            <div className="inspection-form-header">

              <div>
                <h2>
                  New Room Inspection
                </h2>

                <p>
                  Complete the room quality
                  checklist.
                </p>
              </div>

              <button
                type="button"
                className="close-inspection-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form onSubmit={addInspection}>

              <div className="form-section">

                <div className="inspection-form-grid">

                  <div className="inspection-form-group">
                    <label>Room</label>

                    <select
                      name="room"
                      value={formData.room}
                      onChange={
                        handleChange
                      }
                    >
                      <option value="">
                        Select Room
                      </option>

                      {hotelRooms.map(
                        (room) => (
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
                        )
                      )}
                    </select>
                  </div>

                  <div className="inspection-form-group">
                    <label>Inspector</label>

                    <select
                      name="inspector"
                      value={
                        formData.inspector
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="">
                        Select Inspector
                      </option>

                      {hotelStaff.map(
                        (member) => (
                          <option
                            key={member.id}
                            value={
                              member.name
                            }
                          >
                            {member.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="inspection-form-group">
                    <label>
                      Room Condition
                    </label>

                    <select
                      name="condition"
                      value={
                        formData.condition
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option>
                        Excellent
                      </option>
                      <option>
                        Good
                      </option>
                      <option>
                        Needs Attention
                      </option>
                      <option>
                        Poor
                      </option>
                    </select>
                  </div>

                  <div className="inspection-form-group">
                    <label>
                      Cleanliness
                    </label>

                    <select
                      name="cleanliness"
                      value={
                        formData.cleanliness
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option>
                        Excellent
                      </option>
                      <option>
                        Good
                      </option>
                      <option>
                        Needs Attention
                      </option>
                      <option>
                        Poor
                      </option>
                    </select>
                  </div>

                </div>

              </div>

              <div className="form-section">

                <h3>
                  Inspection Checklist
                </h3>

                <div className="inspection-checklist">

                  <label className="check-item">
                    <input
                      type="checkbox"
                      checked={
                        formData.checklist
                          .bed
                      }
                      onChange={() =>
                        handleChecklistChange(
                          'bed'
                        )
                      }
                    />

                    <span>
                      Bed & Bedding
                    </span>
                  </label>

                  <label className="check-item">
                    <input
                      type="checkbox"
                      checked={
                        formData.checklist
                          .bathroom
                      }
                      onChange={() =>
                        handleChecklistChange(
                          'bathroom'
                        )
                      }
                    />

                    <span>
                      Bathroom
                    </span>
                  </label>

                  <label className="check-item">
                    <input
                      type="checkbox"
                      checked={
                        formData.checklist
                          .floor
                      }
                      onChange={() =>
                        handleChecklistChange(
                          'floor'
                        )
                      }
                    />

                    <span>
                      Floor & Carpet
                    </span>
                  </label>

                  <label className="check-item">
                    <input
                      type="checkbox"
                      checked={
                        formData.checklist
                          .linen
                      }
                      onChange={() =>
                        handleChecklistChange(
                          'linen'
                        )
                      }
                    />

                    <span>
                      Linen & Towels
                    </span>
                  </label>

                  <label className="check-item">
                    <input
                      type="checkbox"
                      checked={
                        formData.checklist
                          .amenities
                      }
                      onChange={() =>
                        handleChecklistChange(
                          'amenities'
                        )
                      }
                    />

                    <span>
                      Amenities
                    </span>
                  </label>

                  <label className="check-item">
                    <input
                      type="checkbox"
                      checked={
                        formData.checklist
                          .overall
                      }
                      onChange={() =>
                        handleChecklistChange(
                          'overall'
                        )
                      }
                    />

                    <span>
                      Overall Condition
                    </span>
                  </label>

                </div>

                <div className="score-preview">

                  <div className="score-preview-header">
                    <span>
                      Inspection Score
                    </span>

                    <strong>
                      {calculateScore()}%
                    </strong>
                  </div>

                  <div className="score-bar">
                    <div
                      className="score-progress"
                      style={{
                        width: `${calculateScore()}%`,
                      }}
                    ></div>
                  </div>

                </div>

              </div>

              <div className="inspection-form-group">

                <label>Remarks</label>

                <textarea
                  name="remarks"
                  rows="4"
                  placeholder="Enter inspection remarks..."
                  value={
                    formData.remarks
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div className="inspection-form-buttons">

                <button
                  type="button"
                  className="inspection-cancel-btn"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-inspection-btn"
                >
                  <i className="bi bi-check-circle-fill"></i>
                  Save Inspection
                </button>

              </div>

            </form>

          </div>
        )}

        <div className="inspection-table-card">

          <div className="inspection-table-header">

            <div>
              <h2>
                Inspection Records
              </h2>

              <p>
                Review room inspection
                results and scores.
              </p>
            </div>

            <select
              className="inspection-filter"
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Inspections
              </option>
              <option value="Pass">
                Passed
              </option>
              <option value="Fail">
                Failed
              </option>
            </select>

          </div>

          <div className="inspection-results">
            {filteredInspections.length}{' '}
            Results
          </div>

          <div className="inspection-table-wrapper">

            <table className="inspection-table">

              <thead>
                <tr>
                  <th>Room</th>
                  <th>Inspector</th>
                  <th>Condition</th>
                  <th>Cleanliness</th>
                  <th>Score</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredInspections.length ===
                0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="inspection-empty"
                    >
                      <i className="bi bi-clipboard-x"></i>

                      <p>
                        No inspection records
                        found.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredInspections.map(
                    (inspection) => (
                      <tr
                        key={
                          inspection.id
                        }
                      >

                        <td>
                          <div className="inspection-room">
                            <i className="bi bi-door-open"></i>

                            <strong>
                              Room{' '}
                              {
                                inspection.room
                              }
                            </strong>
                          </div>
                        </td>

                        <td>
                          <div className="inspector-cell">

                            <div className="inspector-avatar">
                              {inspection.inspector?.charAt(
                                0
                              )}
                            </div>

                            <span>
                              {
                                inspection.inspector
                              }
                            </span>

                          </div>
                        </td>

                        <td>
                          <span className="condition-badge">
                            {
                              inspection.condition
                            }
                          </span>
                        </td>

                        <td>
                          {
                            inspection.cleanliness
                          }
                        </td>

                        <td>
                          <div className="cleanliness-score">

                            <strong>
                              {
                                inspection.score
                              }%
                            </strong>

                            <div className="mini-score-bar">
                              <span
                                style={{
                                  width: `${inspection.score}%`,
                                }}
                              ></span>
                            </div>

                          </div>
                        </td>

                        <td>
                          {
                            inspection.date
                          }
                        </td>

                        <td>
                          <span
                            className={`inspection-status ${inspection.status
                              .toLowerCase()}`}
                          >
                            {
                              inspection.status
                            }
                          </span>
                        </td>

                        <td>
                          <span className="remarks-text">
                            {
                              inspection.remarks ||
                                '—'
                            }
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="inspection-delete-btn"
                            onClick={() =>
                              deleteInspection(
                                inspection.id
                              )
                            }
                            title="Delete Inspection"
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

export default RoomInspection