// src/pages/rooms/Rooms.jsx

import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import PageHeader from "../../components/layout/PageHeader";
import Breadcrumb from "../../components/layout/Breadcrumb";

import RoomFilter from "./RoomFilter";
import RoomCard from "./RoomCard";
import AddRoom from "./AddRoom";
import RoomDetails from "./RoomDetails";

import { useHotel } from "../../context/HotelContext";
import { useHotelData } from "../../context/HotelDataContext";

import "./Rooms.css";

function Rooms() {
  const { selectedHotel } = useHotel();

  const {
    rooms,
    addRoom,
    totalRooms,
    availableRooms,
    occupiedRooms,
    maintenanceRooms,
  } = useHotelData();

  const [showAddRoom, setShowAddRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // =====================================================
  // ADD ROOM
  // =====================================================

  const handleAddRoom = (newRoom) => {
    addRoom({
      ...newRoom,
      price: Number(newRoom.price) || 0,
    });

    setShowAddRoom(false);
  };

  // =====================================================
  // FILTER ROOMS
  // =====================================================

  const filteredRooms = rooms.filter((room) => {
    const matchesStatus =
      statusFilter === "All" ||
      room.status === statusFilter;

    const matchesType =
      typeFilter === "All" ||
      room.type === typeFilter;

    return matchesStatus && matchesType;
  });

  // =====================================================
  // CLEAR FILTER
  // =====================================================

  const clearFilters = () => {
    setStatusFilter("All");
    setTypeFilter("All");
  };

  // =====================================================
  // OPEN ROOM DETAILS
  // =====================================================

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
  };

  // =====================================================
  // CLOSE ROOM DETAILS
  // =====================================================

  const handleCloseDetails = () => {
    setSelectedRoom(null);
  };

  return (
    <MainLayout>
      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <Breadcrumb items={["Rooms"]} />

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <PageHeader
        title="Rooms"
        subtitle={
          selectedHotel
            ? `Manage rooms for ${selectedHotel.name}`
            : "Manage hotel rooms, availability and room status"
        }
      />

      <div className="rooms-page">

        {/* =================================================
            SELECTED HOTEL
        ================================================= */}

        {selectedHotel && (
          <div className="rooms-hotel-bar">

            <div className="rooms-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <span>SELECTED PROPERTY</span>

              <strong>
                {selectedHotel.name}
              </strong>

              <small>
                {selectedHotel.code} •{" "}
                {selectedHotel.address.city},{" "}
                {selectedHotel.address.state}
              </small>
            </div>

          </div>
        )}

        {/* =================================================
            ROOM STATISTICS
        ================================================= */}

        <div className="rooms-stats">

          {/* TOTAL */}
          <div className="rooms-stat-card">

            <div className="rooms-stat-icon">
              <i className="bi bi-door-open"></i>
            </div>

            <div>
              <span>Total Rooms</span>
              <h3>{totalRooms}</h3>
            </div>

          </div>

          {/* AVAILABLE */}
          <div className="rooms-stat-card">

            <div className="rooms-stat-icon available">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Available</span>
              <h3>{availableRooms}</h3>
            </div>

          </div>

          {/* OCCUPIED */}
          <div className="rooms-stat-card">

            <div className="rooms-stat-icon occupied">
              <i className="bi bi-person-fill"></i>
            </div>

            <div>
              <span>Occupied</span>
              <h3>{occupiedRooms}</h3>
            </div>

          </div>

          {/* MAINTENANCE */}
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

        {/* =================================================
            ADD ROOM BUTTON
        ================================================= */}

        <div className="rooms-actions">

          <button
            type="button"
            className="add-room-btn"
            onClick={() =>
              setShowAddRoom((prev) => !prev)
            }
          >

            <i
              className={
                showAddRoom
                  ? "bi bi-x-circle"
                  : "bi bi-plus-circle"
              }
            ></i>

            {showAddRoom
              ? "Close Form"
              : "Add New Room"}

          </button>

        </div>

        {/* =================================================
            ADD ROOM FORM
        ================================================= */}

        {showAddRoom && (
          <AddRoom
            onAdd={handleAddRoom}
          />
        )}

        {/* =================================================
            ROOM FILTER
        ================================================= */}

        <RoomFilter
          status={statusFilter}
          type={typeFilter}
          setStatus={setStatusFilter}
          setType={setTypeFilter}
          onClear={clearFilters}
        />

        {/* =================================================
            ROOM LIST HEADER
        ================================================= */}

        <div className="rooms-list-header">

          <div>
            <h2>Hotel Rooms</h2>

            <p>
              Showing{" "}
              {filteredRooms.length} of{" "}
              {rooms.length} room records
            </p>
          </div>

          <span className="rooms-result">
            {filteredRooms.length} Rooms
          </span>

        </div>

        {/* =================================================
            ROOM CARDS
        ================================================= */}

        {filteredRooms.length > 0 ? (

          <div className="rooms-grid">

            {filteredRooms.map((room) => (

              <div
                key={room.id}
              >

                <RoomCard
                  room={room}
                  onViewDetails={handleViewDetails}
                />

              </div>

            ))}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="rooms-empty">

            <i className="bi bi-door-open"></i>

            <h3>No Rooms Found</h3>

            <p>
              Try changing your room status or
              room type filter.
            </p>

          </div>

        )}

        {/* =================================================
            ROOM DETAILS MODAL
        ================================================= */}

        {selectedRoom && (

          <RoomDetails
            room={selectedRoom}
            onClose={handleCloseDetails}
          />

        )}

      </div>
    </MainLayout>
  );
}

export default Rooms;