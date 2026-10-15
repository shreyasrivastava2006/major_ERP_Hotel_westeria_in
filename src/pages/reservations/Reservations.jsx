import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import PageHeader from "../../components/layout/PageHeader";
import Breadcrumb from "../../components/layout/Breadcrumb";

import NewReservation from "./NewReservation";
import ReservationCalendar from "./ReservationCalendar";
import ReservationDetails from "./ReservationDetails";

import { useHotel } from "../../context/HotelContext";
import { useHotelData } from "../../context/HotelDataContext";

import "./Reservations.css";

function Reservations() {
  const { selectedHotel } = useHotel();

  const {
    reservations,
    addReservation,
  } = useHotelData();

  const [showNewReservation, setShowNewReservation] =
    useState(false);

  const [selectedReservationId, setSelectedReservationId] =
    useState(null);

  const selectedReservation = reservations.find(
    (reservation) =>
      reservation.id === selectedReservationId
  );

  const handleAddReservation = (newReservation) => {
    addReservation(newReservation);
    setShowNewReservation(false);
  };

  const confirmedReservations = reservations.filter(
    (reservation) =>
      reservation.status === "Confirmed"
  ).length;

  const pendingReservations = reservations.filter(
    (reservation) =>
      reservation.status === "Pending"
  ).length;

  const cancelledReservations = reservations.filter(
    (reservation) =>
      reservation.status === "Cancelled"
  ).length;

  const handleSelectReservation = (reservation) => {
    setSelectedReservationId(reservation.id);
  };

  const handleCloseDetails = () => {
    setSelectedReservationId(null);
  };

  return (
    <MainLayout>

      <Breadcrumb items={["Reservations"]} />

      <PageHeader
        title="Reservations"
        subtitle={
          selectedHotel
            ? `Manage reservations for ${selectedHotel.name}`
            : "Manage hotel bookings, reservations and guest stays"
        }
      />

      <div className="reservations-page">

        {/* ========================================
            SELECTED HOTEL
        ======================================== */}

        {selectedHotel && (
          <div className="reservations-hotel-bar">

            <div className="reservations-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="reservations-hotel-info">

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

        {/* ========================================
            ACTION
        ======================================== */}

        <div className="reservation-actions">

          <button
            type="button"
            className="new-reservation-btn"
            onClick={() =>
              setShowNewReservation(
                (prev) => !prev
              )
            }
          >

            <i
              className={
                showNewReservation
                  ? "bi bi-x-circle"
                  : "bi bi-calendar-plus"
              }
            ></i>

            {showNewReservation
              ? "Close Form"
              : "New Reservation"}

          </button>

        </div>

        {/* ========================================
            NEW RESERVATION
        ======================================== */}

        {showNewReservation && (
          <NewReservation
            onAdd={handleAddReservation}
          />
        )}

        {/* ========================================
            STATS
        ======================================== */}

        <div className="reservation-stats">

          <div className="reservation-stat-card">

            <i className="bi bi-calendar-check"></i>

            <div>
              <h3>{reservations.length}</h3>
              <p>Total Reservations</p>
            </div>

          </div>

          <div className="reservation-stat-card">

            <i className="bi bi-check-circle"></i>

            <div>
              <h3>{confirmedReservations}</h3>
              <p>Confirmed</p>
            </div>

          </div>

          <div className="reservation-stat-card">

            <i className="bi bi-clock"></i>

            <div>
              <h3>{pendingReservations}</h3>
              <p>Pending</p>
            </div>

          </div>

          <div className="reservation-stat-card">

            <i className="bi bi-x-circle"></i>

            <div>
              <h3>{cancelledReservations}</h3>
              <p>Cancelled</p>
            </div>

          </div>

        </div>

        {/* ========================================
            CALENDAR
        ======================================== */}

        <ReservationCalendar
          reservations={reservations}
          onSelect={handleSelectReservation}
        />

        {/* ========================================
            RESERVATION LIST
        ======================================== */}

        <div className="reservation-list">

          <div className="reservation-list-header">

            <div>

              <h2>Recent Reservations</h2>

              <p>
                Latest booking records for this property
              </p>

            </div>

            <span className="reservation-count">
              {reservations.length} Reservations
            </span>

          </div>

          {reservations.length === 0 ? (

            <div className="reservation-empty">

              <i className="bi bi-calendar-x"></i>

              <h3>No Reservations Found</h3>

              <p>
                Create a new reservation to see it here.
              </p>

            </div>

          ) : (

            <div className="reservation-list-body">

              {reservations.map(
                (reservation) => (

                  <div
                    className="reservation-item"
                    key={reservation.id}
                    onClick={() =>
                      handleSelectReservation(
                        reservation
                      )
                    }
                  >

                    <div className="reservation-guest">

                      <strong>
                        {reservation.guestName ||
                          reservation.guest ||
                          "Unknown Guest"}
                      </strong>

                      <span>
                        <i className="bi bi-door-open"></i>

                        Room{" "}
                        {reservation.roomNumber ||
                          reservation.room ||
                          "Not Assigned"}
                      </span>

                    </div>

                    <div className="reservation-dates">

                      <span>
                        {reservation.checkIn}
                      </span>

                      <i className="bi bi-arrow-right"></i>

                      <span>
                        {reservation.checkOut}
                      </span>

                    </div>

                    <span
                      className={`reservation-status ${
                        reservation.status
                          ? reservation.status
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )
                          : "pending"
                      }`}
                    >
                      {reservation.status ||
                        "Pending"}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        {/* ========================================
            DETAILS
        ======================================== */}

        {selectedReservation && (
          <ReservationDetails
            reservation={selectedReservation}
            onClose={handleCloseDetails}
          />
        )}

      </div>

    </MainLayout>
  );
}

export default Reservations;