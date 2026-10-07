import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './RevenueReport.css'

function RevenueReport() {
  const navigate = useNavigate()

  const monthlyRevenue = [
    { month: 'Apr', amount: 412000 },
    { month: 'May', amount: 457000 },
    { month: 'Jun', amount: 482000 },
    { month: 'Jul', amount: 506000 },
    { month: 'Aug', amount: 532000 },
    { month: 'Sep', amount: 485000 },
  ]

  const maxRevenue = Math.max(
    ...monthlyRevenue.map((item) => item.amount)
  )

  return (
    <MainLayout>

      <div className="revenue-report-page">

        <Breadcrumb items={['Reports', 'Revenue Report']} />

        <div className="revenue-report-page-header">

          <PageHeader
            title="Revenue Report"
            subtitle="Hotel revenue and income analysis"
          />

          <button
            type="button"
            className="revenue-back-btn"
            onClick={() => navigate('/reports')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Reports
          </button>

        </div>

        {/* SUMMARY */}

        <div className="revenue-summary">

          <div className="revenue-summary-card">
            <span>Total Revenue</span>
            <strong>₹4.85L</strong>
          </div>

          <div className="revenue-summary-card">
            <span>Room Revenue</span>
            <strong>₹3.25L</strong>
          </div>

          <div className="revenue-summary-card">
            <span>Restaurant</span>
            <strong>₹98K</strong>
          </div>

          <div className="revenue-summary-card">
            <span>Other Services</span>
            <strong>₹62K</strong>
          </div>

        </div>

        {/* CHART */}

        <div className="revenue-chart-card">

          <div className="revenue-card-header">
            <div>
              <h2>Monthly Revenue</h2>
              <p>Revenue from April to September 2026</p>
            </div>
          </div>

          <div className="revenue-chart">

            {monthlyRevenue.map((item) => {

              const height = (item.amount / maxRevenue) * 100

              return (
                <div
                  className="revenue-column"
                  key={item.month}
                >

                  <div className="revenue-amount">
                    ₹{(item.amount / 1000).toFixed(0)}K
                  </div>

                  <div className="revenue-bar-container">
                    <div
                      className="revenue-bar"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>

                  <span className="revenue-month">
                    {item.month}
                  </span>

                </div>
              )
            })}

          </div>

        </div>

        {/* BREAKDOWN */}

        <div className="revenue-breakdown-card">

          <div className="revenue-breakdown-header">
            <div>
              <h2>September Revenue Breakdown</h2>
              <p>Revenue distribution by department</p>
            </div>
          </div>

          <div className="revenue-breakdown">

            <div>
              <span>Room Revenue</span>
              <strong>₹3,25,000</strong>
            </div>

            <div>
              <span>Restaurant Revenue</span>
              <strong>₹98,000</strong>
            </div>

            <div>
              <span>Services Revenue</span>
              <strong>₹62,000</strong>
            </div>

            <div className="revenue-total">
              <span>Total</span>
              <strong>₹4,85,000</strong>
            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default RevenueReport