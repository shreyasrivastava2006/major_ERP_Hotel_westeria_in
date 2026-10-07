import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

import rooms from '../../data/rooms'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

function OccupancyChart() {
  const occupied = rooms.filter(
    (room) => room.status === 'Occupied'
  ).length

  const available = rooms.filter(
    (room) => room.status === 'Available'
  ).length

  const maintenance = rooms.filter(
    (room) => room.status === 'Maintenance'
  ).length

  const cleaning = rooms.filter(
    (room) => room.status === 'Cleaning'
  ).length

  const data = {
    labels: ['Occupied', 'Available', 'Maintenance', 'Cleaning'],
    datasets: [
      {
        data: [
          occupied,
          available,
          maintenance,
          cleaning,
        ],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="chart-card">
      <h3>Room Occupancy</h3>

      <div className="chart-container">
        <Doughnut
          data={data}
          options={options}
        />
      </div>
    </div>
  )
}

export default OccupancyChart