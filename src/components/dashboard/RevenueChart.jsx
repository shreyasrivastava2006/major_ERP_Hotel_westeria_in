import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

import reservations from '../../data/reservations'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

function RevenueChart() {
  const revenueByDay = {}

  reservations.forEach((reservation) => {
    const date = reservation.checkIn

    if (!revenueByDay[date]) {
      revenueByDay[date] = 0
    }

    revenueByDay[date] += reservation.totalAmount
  })

  const sortedDates = Object.keys(revenueByDay).sort()

  const labels = sortedDates.map((date) => {
    const dateObject = new Date(date)

    return dateObject.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    })
  })

  const revenueData = sortedDates.map(
    (date) => revenueByDay[date]
  )

  const data = {
    labels,
    datasets: [
      {
        label: 'Revenue (₹)',
        data: revenueData,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="chart-card">

      <h3>Revenue Overview</h3>

      <div className="chart-container">
        <Line
          data={data}
          options={options}
        />
      </div>

    </div>
  )
}

export default RevenueChart