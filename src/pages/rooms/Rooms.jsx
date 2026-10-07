import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import PageHeader from '../../components/layout/PageHeader'
import Breadcrumb from '../../components/layout/Breadcrumb'
import RoomFilter from './RoomFilter'
import RoomCard from './RoomCard'
import AddRoom from './AddRoom'
import RoomDetails from './RoomDetails'
import { useHotel } from '../../context/HotelContext'
import './Rooms.css'

function Rooms() {
  const { selectedHotel } = useHotel()

  const [rooms, setRooms] = useState([
    {
      id: 1,
      number: '101',
      type: 'Deluxe Room',
      floor: '1st Floor',
      price: '₹4,500',
      status: 'Available',
    },
    {
      id: 2,
      number: '102',
      type: 'Deluxe Room',
      floor: '1st Floor',
      price: '₹4,500',
      status: 'Occupied',
    },
    {
      id: 3,
      number: '201',
      type: 'Suite Room',
      floor: '2nd Floor',
      price: '₹7,500',
      status: 'Available',
    },
    {
      id: 4,
      number: '202',
      type: 'Executive Room',
      floor: '2nd Floor',
      price: '₹6,000',
      status: 'Maintenance',
    },
  ])

  const [showAddRoom, setShowAddRoom] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const handleAddRoom = (newRoom) => {
    const room = {
      ...newRoom,
      id: rooms.length + 1,
      price: `₹${Number(newRoom.price).toLocaleString('en-IN')}`,
    }

    setRooms((prev) => [...prev, room])
    setShowAddRoom(false)
  }

  const filteredRooms = rooms.filter((room) => {
    const matchesStatus =
      statusFilter === 'All' || room.status === statusFilter

    const matchesType =
      typeFilter === 'All' || room.type === typeFilter

    return matchesStatus && matchesType
  })

  const clearFilters = () => {
    setStatusFilter('All')
    setTypeFilter('All')
  }

  const totalRooms = selectedHotel?.rooms?.total || rooms.length

  const availableRooms =
    selectedHotel?.rooms?.available ??
    rooms.filter((room) => room.status === 'Available').length

  const occupiedRooms =
    selectedHotel?.rooms?.occupied ??
    rooms.filter((room) => room.status === 'Occupied').length

  const maintenanceRooms =
    selectedHotel?.rooms?.maintenance ??
    rooms.filter((room) => room.status === 'Maintenance').length

  return (
    <MainLayout>

      <Breadcrumb items={['Rooms']} />

      <PageHeader
        title="Rooms"
        subtitle={
          selectedHotel
            ? `Manage rooms for ${selectedHotel.name}`
            : 'Manage hotel rooms, availability and room status'
        }
      />

      <div className="rooms-page">

        {/* SELECTED HOTEL */}

        {selectedHotel && (
          <div className="rooms-hotel-bar">

            <div className="rooms-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <span>SELECTED PROPERTY</span>
              <strong>{selectedHotel.name}</strong>
              <small>
                {selectedHotel.code} • {selectedHotel.address.city},{' '}
                {selectedHotel.address.state}
              </small>
            </div>

          </div>
        )}

        {/* STATS */}

        <div className="rooms-stats">

          <div className="rooms-stat-card">
            <div className="rooms-stat-icon">
              <i className="bi bi-door-open"></i>
            </div>

            <div>
              <span>Total Rooms</span>
              <h3>{totalRooms}</h3>
            </div>
          </div>

          <div className="rooms-stat-card">
            <div className="rooms-stat-icon available">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Available</span>
              <h3>{availableRooms}</h3>
            </div>
          </div>

          <div className="rooms-stat-card">
            <div className="rooms-stat-icon occupied">
              <i className="bi bi-person-fill"></i>
            </div>

            <div>
              <span>Occupied</span>
              <h3>{occupiedRooms}</h3>
            </div>
          </div>

          <div className="rooms-stat-card">
            <div className="rooms-stat-icon maintenance">
              <i className="bi bi-tools"></i>
            </div>

            <div>
              <span>Maintenance</span>
              <h3>{maintenanceRooms}</h3>
            </div>
          </div>

        </div>

        {/* ACTION */}

        <div className="rooms-actions">

          <button
            type="button"
            className="add-room-btn"
            onClick={() => setShowAddRoom(!showAddRoom)}
          >
            <i className="bi bi-plus-circle"></i>

            {showAddRoom ? 'Close Form' : 'Add New Room'}
          </button>

        </div>

        {/* ADD ROOM */}

        {showAddRoom && (
          <AddRoom onAdd={handleAddRoom} />
        )}

        {/* FILTER */}

        <RoomFilter
          status={statusFilter}
          type={typeFilter}
          setStatus={setStatusFilter}
          setType={setTypeFilter}
          onClear={clearFilters}
        />

        {/* ROOM HEADER */}

        <div className="rooms-list-header">

          <div>
            <h2>Hotel Rooms</h2>

            <p>
              Showing {filteredRooms.length} of {rooms.length} room records
            </p>
          </div>

          <span className="rooms-result">
            {filteredRooms.length} Rooms
          </span>

        </div>

        {/* ROOMS */}

        {filteredRooms.length > 0 ? (
          <div className="rooms-grid">

            {filteredRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
              >
                <RoomCard room={room} />
              </div>
            ))}

          </div>
        ) : (
          <div className="rooms-empty">

            <i className="bi bi-door-open"></i>

            <h3>No Rooms Found</h3>

            <p>
              Try changing your room status or room type filter.
            </p>

          </div>
        )}

        {/* DETAILS */}

        {selectedRoom && (
          <RoomDetails
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
          />
        )}

      </div>

    </MainLayout>
  )
}

export default Rooms