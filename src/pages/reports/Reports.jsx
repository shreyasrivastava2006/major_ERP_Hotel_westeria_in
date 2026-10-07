import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import { useHotel } from '../../context/HotelContext'
import './Reports.css'

function Reports() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const reports = [
    {
      title: 'Booking Report',
      description: 'View all hotel bookings and reservation details.',
      icon: 'bi-calendar-check',
      path: '/reports/booking',
    },
    {
      title: 'Occupancy Report',
      description: 'Check room occupancy and availability.',
      icon: 'bi-building',
      path: '/reports/occupancy',
    },
    {
      title: 'Revenue Report',
      description: 'View hotel revenue and income details.',
      icon: 'bi-currency-rupee',
      path: '/reports/revenue',
    },
  ]

  return (
    <MainLayout>
      <div className="reports-page">

        <Breadcrumb items={['Reports']} />

        <div className="reports-page-header">
          <PageHeader
            title="Reports"
            subtitle={
              selectedHotel
                ? `${selectedHotel.name} performance and management reports`
                : 'Hotel performance and management reports'
            }
          />

          <button
            type="button"
            className="reports-back-btn"
            onClick={() => navigate('/dashboard')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Dashboard
          </button>
        </div>

        {selectedHotel && (
          <div className="reports-hotel-bar">
            <div className="reports-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="reports-hotel-info">
              <span>SELECTED PROPERTY</span>
              <strong>{selectedHotel.name}</strong>

              <small>
                {selectedHotel.code} • {selectedHotel.category} •{' '}
                {selectedHotel.address?.city}, {selectedHotel.address?.state}
              </small>
            </div>
          </div>
        )}

        <div className="reports-stats">

          <div className="report-stat-card">
            <i className="bi bi-calendar-check"></i>
            <div>
              <h3>128</h3>
              <p>Total Bookings</p>
            </div>
          </div>

          <div className="report-stat-card">
            <i className="bi bi-bar-chart"></i>
            <div>
              <h3>78%</h3>
              <p>Occupancy Rate</p>
            </div>
          </div>

          <div className="report-stat-card">
            <i className="bi bi-currency-rupee"></i>
            <div>
              <h3>₹4.85L</h3>
              <p>Total Revenue</p>
            </div>
          </div>

          <div className="report-stat-card">
            <i className="bi bi-people"></i>
            <div>
              <h3>96</h3>
              <p>Total Guests</p>
            </div>
          </div>

        </div>

        <div className="reports-grid">

          {reports.map((report) => (
            <div className="report-card" key={report.title}>

              <div className="report-icon">
                <i className={`bi ${report.icon}`}></i>
              </div>

              <h2>{report.title}</h2>

              <p>{report.description}</p>

              <button
                type="button"
                onClick={() => navigate(report.path)}
              >
                View Report
                <i className="bi bi-arrow-right"></i>
              </button>

            </div>
          ))}

        </div>

      </div>
    </MainLayout>
  )
}

export default Reports