import { useMemo, useState } from 'react'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'

import { useHotel } from '../../context/HotelContext'

import './RoomInspection.css'

const initialInspections = [
  {
    id: 1,
    hotelId: 'HOTEL-001',
    room: '101',
    inspector: 'Anjali',
    condition: 'Excellent',
    cleanliness: 95,
    checklist: {
      bed: true,
      bathroom: true,
      floor: true,
      towels: true,
      amenities: true,
      lights: true,
    },
    remarks: 'Room is clean and ready for guest.',
    status: 'Pass',
    date: '2026-09-14',
  },
  {
    id: 2,
    hotelId: 'HOTEL-001',
    room: '205',
    inspector: 'Neha',
    condition: 'Good',
    cleanliness: 86,
    checklist: {
      bed: true,
      bathroom: true,
      floor: true,
      towels: false,
      amenities: true,
      lights: true,
    },
    remarks: 'Towels need replacement.',
    status: 'Pass',
    date: '2026-09-14',
  },
  {
    id: 3,
    hotelId: 'HOTEL-001',
    room: '302',
    inspector: 'Riya',
    condition: 'Needs Attention',
    cleanliness: 62,
    checklist: {
      bed: true,
      bathroom: false,
      floor: false,
      towels: true,
      amenities: false,
      lights: true,
    },
    remarks:
      'Bathroom requires cleaning and amenities need restocking.',
    status: 'Fail',
    date: '2026-09-14',
  },
  {
    id: 4,
    hotelId: 'HOTEL-002',
    room: '201',
    inspector: 'Pooja',
    condition: 'Good',
    cleanliness: 88,
    checklist: {
      bed: true,
      bathroom: true,
      floor: true,
      towels: true,
      amenities: true,
      lights: false,
    },
    remarks: 'Minor light issue reported.',
    status: 'Pass',
    date: '2026-09-15',
  },
]

const emptyInspection = {
  room: '',
  inspector: '',
  condition: 'Excellent',
  bed: false,
  bathroom: false,
  floor: false,
  towels: false,
  amenities: false,
  lights: false,
  remarks: '',
}

function RoomInspection() {
  const { selectedHotel } = useHotel()

  const [inspections, setInspections] = useState(initialInspections)

  const [showForm, setShowForm] = useState(false)

  const [filter, setFilter] = useState('All Results')

  const [newInspection, setNewInspection] =
    useState(emptyInspection)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setNewInspection((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const calculateScore = () => {
    const items = [
      newInspection.bed,
      newInspection.bathroom,
      newInspection.floor,
      newInspection.towels,
      newInspection.amenities,
      newInspection.lights,
    ]

    const completed = items.filter(Boolean).length

    return Math.round((completed / items.length) * 100)
  }

  const hotelInspections = useMemo(() => {
    if (!selectedHotel) {
      return inspections
    }

    const hasHotelData = inspections.some(
      (inspection) => inspection.hotelId
    )

    if (!hasHotelData) {
      return inspections
    }

    return inspections.filter(
      (inspection) =>
        inspection.hotelId === selectedHotel.id
    )
  }, [inspections, selectedHotel])

  const filteredInspections =
    filter === 'All Results'
      ? hotelInspections
      : hotelInspections.filter(
          (inspection) =>
            inspection.status === filter
        )

  const addInspection = (e) => {
    e.preventDefault()

    if (!newInspection.room || !newInspection.inspector) {
      alert(
        'Please enter room number and inspector name.'
      )
      return
    }

    const score = calculateScore()

    const inspection = {
      id: Date.now(),
      ...(selectedHotel
        ? { hotelId: selectedHotel.id }
        : {}),
      room: newInspection.room,
      inspector: newInspection.inspector,
      condition: newInspection.condition,
      cleanliness: score,
      checklist: {
        bed: newInspection.bed,
        bathroom: newInspection.bathroom,
        floor: newInspection.floor,
        towels: newInspection.towels,
        amenities: newInspection.amenities,
        lights: newInspection.lights,
      },
      remarks: newInspection.remarks,
      status: score >= 70 ? 'Pass' : 'Fail',
      date: new Date()
        .toISOString()
        .split('T')[0],
    }

    setInspections((previous) => [
      ...previous,
      inspection,
    ])

    setNewInspection({
      ...emptyInspection,
    })

    setShowForm(false)
  }

  const deleteInspection = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this inspection?'
    )

    if (!confirmDelete) return

    setInspections((previous) =>
      previous.filter(
        (inspection) => inspection.id !== id
      )
    )
  }

  const passed = hotelInspections.filter(
    (inspection) => inspection.status === 'Pass'
  ).length

  const failed = hotelInspections.filter(
    (inspection) => inspection.status === 'Fail'
  ).length

  const averageScore =
    hotelInspections.length > 0
      ? Math.round(
          hotelInspections.reduce(
            (total, inspection) =>
              total + inspection.cleanliness,
            0
          ) / hotelInspections.length
        )
      : 0

  return (
    <MainLayout>
      <div className="room-inspection-page">

        <Breadcrumb
          items={['Housekeeping', 'Room Inspection']}
        />

        {/* PAGE HEADER */}

        <div className="inspection-heading-row">

          <PageHeader
            title="Room Inspection"
            subtitle={
              selectedHotel
                ? `Inspect rooms and housekeeping standards for ${selectedHotel.name}`
                : 'Inspect room cleanliness, condition and housekeeping standards.'
            }
          />

          <button
            type="button"
            className="add-inspection-btn"
            onClick={() =>
              setShowForm(!showForm)
            }
          >
            <i className="bi bi-plus-lg"></i>

            {showForm
              ? 'Close Form'
              : 'New Inspection'}
          </button>

        </div>

        {/* SELECTED HOTEL */}

        {selectedHotel && (
          <div className="inspection-hotel-bar">

            <div className="inspection-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="inspection-hotel-info">

              <span>SELECTED PROPERTY</span>

              <strong>
                {selectedHotel.name}
              </strong>

              <small>
                {selectedHotel.code} •{' '}
                {selectedHotel.category} •{' '}
                {selectedHotel.address.city},{' '}
                {selectedHotel.address.state}
              </small>

            </div>

          </div>
        )}

        {/* STATISTICS */}

        <div className="inspection-stats">

          <div className="inspection-stat-card">

            <div className="inspection-stat-icon">
              <i className="bi bi-clipboard-check"></i>
            </div>

            <div>
              <span>Total Inspections</span>
              <h2>{hotelInspections.length}</h2>
            </div>

          </div>

          <div className="inspection-stat-card">

            <div className="inspection-stat-icon pass-icon">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Passed</span>
              <h2>{passed}</h2>
            </div>

          </div>

          <div className="inspection-stat-card">

            <div className="inspection-stat-icon fail-icon">
              <i className="bi bi-x-circle"></i>
            </div>

            <div>
              <span>Failed</span>
              <h2>{failed}</h2>
            </div>

          </div>

          <div className="inspection-stat-card">

            <div className="inspection-stat-icon score-icon">
              <i className="bi bi-stars"></i>
            </div>

            <div>
              <span>Average Score</span>
              <h2>{averageScore}%</h2>
            </div>

          </div>

        </div>

        {/* NEW INSPECTION FORM */}

        {showForm && (
          <div className="inspection-form-card">

            <div className="inspection-form-header">

              <div>
                <h2>New Room Inspection</h2>

                <p>
                  Complete the inspection checklist
                  for the selected room.
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

              {/* INFORMATION */}

              <div className="form-section">

                <h3>Inspection Information</h3>

                <div className="inspection-form-grid">

                  <div className="inspection-form-group">

                    <label>
                      Room Number *
                    </label>

                    <input
                      type="text"
                      name="room"
                      placeholder="e.g. 101"
                      value={newInspection.room}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="inspection-form-group">

                    <label>
                      Inspector *
                    </label>

                    <select
                      name="inspector"
                      value={
                        newInspection.inspector
                      }
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Inspector
                      </option>
                      <option>Anjali</option>
                      <option>Neha</option>
                      <option>Riya</option>
                      <option>Pooja</option>
                      <option>Priya</option>
                    </select>

                  </div>

                  <div className="inspection-form-group">

                    <label>
                      Room Condition
                    </label>

                    <select
                      name="condition"
                      value={
                        newInspection.condition
                      }
                      onChange={handleChange}
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

              {/* CHECKLIST */}

              <div className="form-section">

                <h3>
                  Inspection Checklist
                </h3>

                <div className="inspection-checklist">

                  <label className="check-item">
                    <input
                      type="checkbox"
                      name="bed"
                      checked={
                        newInspection.bed
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <i className="bi bi-house-heart"></i>
                      Bed & Linen
                    </span>
                  </label>

                  <label className="check-item">
                    <input
                      type="checkbox"
                      name="bathroom"
                      checked={
                        newInspection.bathroom
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <i className="bi bi-droplet"></i>
                      Bathroom
                    </span>
                  </label>

                  <label className="check-item">
                    <input
                      type="checkbox"
                      name="floor"
                      checked={
                        newInspection.floor
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <i className="bi bi-grid"></i>
                      Floor & Carpet
                    </span>
                  </label>

                  <label className="check-item">
                    <input
                      type="checkbox"
                      name="towels"
                      checked={
                        newInspection.towels
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <i className="bi bi-stack"></i>
                      Towels
                    </span>
                  </label>

                  <label className="check-item">
                    <input
                      type="checkbox"
                      name="amenities"
                      checked={
                        newInspection.amenities
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <i className="bi bi-box-seam"></i>
                      Amenities
                    </span>
                  </label>

                  <label className="check-item">
                    <input
                      type="checkbox"
                      name="lights"
                      checked={
                        newInspection.lights
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <i className="bi bi-lightbulb"></i>
                      Lights & Electronics
                    </span>
                  </label>

                </div>

              </div>

              {/* SCORE */}

              <div className="form-section">

                <h3>
                  Cleanliness Score
                </h3>

                <div className="score-preview">

                  <div className="score-preview-header">

                    <span>
                      Current Score
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

              {/* REMARKS */}

              <div className="form-section">

                <h3>Remarks</h3>

                <textarea
                  name="remarks"
                  rows="4"
                  placeholder="Enter inspection remarks..."
                  value={
                    newInspection.remarks
                  }
                  onChange={handleChange}
                ></textarea>

              </div>

              {/* BUTTONS */}

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
                  <i className="bi bi-check-lg"></i>
                  Save Inspection
                </button>

              </div>

            </form>

          </div>
        )}

        {/* TABLE */}

        <div className="inspection-table-card">

          <div className="inspection-table-header">

            <div>
              <h2>
                Inspection Records
              </h2>

              <p>
                Recent room inspection results
                for this property.
              </p>
            </div>

            <div className="inspection-filter">

              <i className="bi bi-funnel"></i>

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
              >
                <option>
                  All Results
                </option>
                <option>Pass</option>
                <option>Fail</option>
              </select>

            </div>

          </div>

          <div className="inspection-results">
            Showing{' '}
            <strong>
              {filteredInspections.length}
            </strong>{' '}
            of{' '}
            <strong>
              {hotelInspections.length}
            </strong>{' '}
            inspections
          </div>

          <div className="inspection-table-wrapper">

            <table className="inspection-table">

              <thead>
                <tr>
                  <th>Room</th>
                  <th>Inspector</th>
                  <th>Condition</th>
                  <th>Cleanliness</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredInspections.length > 0 ? (

                  filteredInspections.map(
                    (inspection) => (

                      <tr
                        key={inspection.id}
                      >

                        <td>
                          <div className="inspection-room">
                            <i className="bi bi-door-closed"></i>
                            <strong>
                              Room {inspection.room}
                            </strong>
                          </div>
                        </td>

                        <td>

                          <div className="inspector-cell">

                            <div className="inspector-avatar">
                              {inspection.inspector.charAt(
                                0
                              )}
                            </div>

                            {inspection.inspector}

                          </div>

                        </td>

                        <td>

                          <span
                            className={`condition-badge ${inspection.condition
                              .toLowerCase()
                              .replaceAll(
                                ' ',
                                '-'
                              )}`}
                          >
                            {inspection.condition}
                          </span>

                        </td>

                        <td>

                          <div className="cleanliness-score">

                            <div className="mini-score-bar">

                              <div
                                style={{
                                  width: `${inspection.cleanliness}%`,
                                }}
                              ></div>

                            </div>

                            <strong>
                              {inspection.cleanliness}%
                            </strong>

                          </div>

                        </td>

                        <td>

                          <span className="remarks-text">
                            {inspection.remarks ||
                              'No remarks'}
                          </span>

                        </td>

                        <td>

                          <span
                            className={`inspection-status ${inspection.status.toLowerCase()}`}
                          >

                            <i
                              className={
                                inspection.status ===
                                'Pass'
                                  ? 'bi bi-check-circle'
                                  : 'bi bi-x-circle'
                              }
                            ></i>

                            {inspection.status}

                          </span>

                        </td>

                        <td>
                          {inspection.date}
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

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="inspection-empty"
                    >

                      <i className="bi bi-clipboard-x"></i>

                      <strong>
                        No inspection records found
                      </strong>

                      <span>
                        Try changing the inspection
                        filter.
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

export default RoomInspection