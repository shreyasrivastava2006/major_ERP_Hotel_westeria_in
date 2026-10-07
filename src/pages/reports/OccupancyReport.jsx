import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './OccupancyReport.css'

function OccupancyReport() {
  const navigate = useNavigate()

  const rooms = [
    {
      type: 'Standard',
      total: 20,
      occupied: 14,
      available: 5,
      maintenance: 1,
      occupancy: 70,
    },
    {
      type: 'Deluxe',
      total: 25,
      occupied: 21,
      available: 3,
      maintenance: 1,
      occupancy: 84,
    },
    {
      type: 'Executive',
      total: 15,
      occupied: 12,
      available: 3,
      maintenance: 0,
      occupancy: 80,
    },
    {
      type: 'Suite',
      total: 10,
      occupied: 8,
      available: 2,
      maintenance: 0,
      occupancy: 80,
    },
  ]

  const totalRooms = rooms.reduce(
    (total, room) => total + room.total,
    0
  )

  const occupiedRooms = rooms.reduce(
    (total, room) => total + room.occupied,
    0
  )

  const availableRooms = rooms.reduce(
    (total, room) => total + room.available,
    0
  )

  const overallOccupancy = Math.round(
    (occupiedRooms / totalRooms) * 100
  )

  return (
    <MainLayout>
      <div className="occupancy-report-page">

        <Breadcrumb
          items={['Reports', 'Occupancy Report']}
        />

        <div className="occupancy-report-header">

          <PageHeader
            title="Occupancy Report"
            subtitle="Room occupancy and availability details"
          />

          <button
            type="button"
            className="occupancy-back-btn"
            onClick={() => navigate('/reports')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Reports
          </button>

        </div>

        {/* SUMMARY */}
        <div className="occupancy-summary">

          <div className="occupancy-summary-card">
            <span>Total Rooms</span>
            <strong>{totalRooms}</strong>
          </div>

          <div className="occupancy-summary-card">
            <span>Occupied</span>
            <strong>{occupiedRooms}</strong>
          </div>

          <div className="occupancy-summary-card">
            <span>Available</span>
            <strong>{availableRooms}</strong>
          </div>

          <div className="occupancy-summary-card">
            <span>Overall Occupancy</span>
            <strong>{overallOccupancy}%</strong>
          </div>

        </div>

        {/* TABLE */}
        <div className="occupancy-table-card">

          <div className="occupancy-table-header">
            <div>
              <h2>Room Occupancy</h2>
              <p>Occupancy and availability by room type</p>
            </div>

            <span className="occupancy-count">
              {rooms.length} Room Types
            </span>
          </div>

          <div className="occupancy-table-wrapper">

            <table className="occupancy-table">

              <thead>
                <tr>
                  <th>Room Type</th>
                  <th>Total Rooms</th>
                  <th>Occupied</th>
                  <th>Available</th>
                  <th>Maintenance</th>
                  <th>Occupancy</th>
                </tr>
              </thead>

              <tbody>

                {rooms.map((room) => (
                  <tr key={room.type}>

                    <td>
                      <strong>{room.type}</strong>
                    </td>

                    <td>{room.total}</td>

                    <td>{room.occupied}</td>

                    <td>{room.available}</td>

                    <td>{room.maintenance}</td>

                    <td>
                      <div className="occupancy-value">

                        <span>
                          {room.occupancy}%
                        </span>

                        <div className="occupancy-bar">
                          <div
                            className="occupancy-fill"
                            style={{
                              width: `${room.occupancy}%`,
                            }}
                          ></div>
                        </div>

                      </div>
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

export default OccupancyReport