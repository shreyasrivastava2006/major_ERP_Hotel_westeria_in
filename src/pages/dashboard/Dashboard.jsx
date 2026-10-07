import MainLayout from '../../layouts/MainLayout'
import PageHeader from '../../components/layout/PageHeader'
import Breadcrumb from '../../components/layout/Breadcrumb'

import StatCard from '../../components/dashboard/StatCard'
import RevenueChart from '../../components/dashboard/RevenueChart'
import OccupancyChart from '../../components/dashboard/OccupancyChart'
import BookingOverview from '../../components/dashboard/BookingOverview'
import RecentReservations from '../../components/dashboard/RecentReservations'

import { useHotel } from '../../context/HotelContext'

import rooms from '../../data/rooms'
import reservations from '../../data/reservations'

import './Dashboard.css'

function Dashboard() {
  const { selectedHotel } = useHotel()

  const totalRooms = selectedHotel?.rooms?.total || rooms.length

  const availableRooms =
    selectedHotel?.rooms?.available ??
    rooms.filter((room) => room.status === 'Available').length

  const currentGuests = reservations
    .filter((reservation) => reservation.status === 'Confirmed')
    .reduce(
      (total, reservation) =>
        total + reservation.adults + reservation.children,
      0
    )

  const today = new Date().toISOString().split('T')[0]

  const todayRevenue = reservations
    .filter(
      (reservation) =>
        reservation.checkIn === today ||
        (reservation.checkIn < today &&
          reservation.checkOut > today)
    )
    .reduce(
      (total, reservation) => total + reservation.totalAmount,
      0
    )

  return (
    <MainLayout>
      <div className="dashboard-page">

        <Breadcrumb items={['Dashboard']} />

        <PageHeader
          title={selectedHotel?.name || 'Dashboard'}
          subtitle={
            selectedHotel
              ? `${selectedHotel.propertyType} • ${selectedHotel.address.city}, ${selectedHotel.address.state}`
              : 'Welcome to Wisteria In Hotel Management ERP'
          }
        />

        {/* SELECTED HOTEL INFO */}

        {selectedHotel && (
          <div className="selected-hotel-bar">
            <div className="selected-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="selected-hotel-info">
              <span>SELECTED PROPERTY</span>

              <strong>{selectedHotel.name}</strong>

              <small>
                {selectedHotel.code} • {selectedHotel.category}
              </small>
            </div>

            <div className="selected-hotel-location">
              <i className="bi bi-geo-alt"></i>
              {selectedHotel.address.city},{' '}
              {selectedHotel.address.state}
            </div>
          </div>
        )}

        {/* STATISTICS */}

        <div className="stats-grid">

          <StatCard
            icon="bi-door-open"
            title="Total Rooms"
            value={totalRooms}
            subtitle="Hotel Rooms"
          />

          <StatCard
            icon="bi-check-circle"
            title="Available Rooms"
            value={availableRooms}
            subtitle="Ready for booking"
          />

          <StatCard
            icon="bi-people"
            title="Current Guests"
            value={currentGuests}
            subtitle="Currently staying"
          />

          <StatCard
            icon="bi-currency-rupee"
            title="Today's Revenue"
            value={`₹${todayRevenue.toLocaleString('en-IN')}`}
            subtitle="Today's earnings"
          />

        </div>

        {/* CHARTS */}

        <div className="charts-grid">

          <RevenueChart />

          <OccupancyChart />

        </div>

        {/* BOOKING OVERVIEW */}

        <BookingOverview />

        {/* RECENT RESERVATIONS */}

        <RecentReservations />

      </div>
    </MainLayout>
  )
}

export default Dashboard

