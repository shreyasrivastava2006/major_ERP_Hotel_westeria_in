import { useMemo, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import PageHeader from "../../components/layout/PageHeader";
import Breadcrumb from "../../components/layout/Breadcrumb";

import GuestFilter from "./GuestFilter";
import GuestCard from "./GuestCard";
import AddGuest from "./AddGuests";
import GuestDetails from "./GuestDetails";

import { useHotel } from "../../context/HotelContext";
import { useHotelData } from "../../context/HotelDataContext";

import "./Guests.css";

function Guests() {
  const { selectedHotel } = useHotel();

  const {
    guests,
    addGuest,
  } = useHotelData();

  const [showAddGuest, setShowAddGuest] = useState(false);

  const [selectedGuestId, setSelectedGuestId] =
    useState(null);

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  /* ==============================
     SELECTED GUEST
  ============================== */

  const selectedGuest = guests.find(
    (guest) => guest.id === selectedGuestId
  );

  /* ==============================
     ADD GUEST
  ============================== */

  const handleAddGuest = (newGuest) => {
    addGuest({
      ...newGuest,
      name: newGuest.name.trim(),
      email: newGuest.email.trim(),
      phone: newGuest.phone.trim(),
      room: newGuest.room.trim(),
    });

    setShowAddGuest(false);
  };

  /* ==============================
     FILTER + SEARCH
  ============================== */

  const filteredGuests = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    return guests.filter((guest) => {
      const matchesStatus =
        statusFilter === "All" ||
        guest.status === statusFilter;

      const matchesSearch =
        !search ||
        guest.name?.toLowerCase().includes(search) ||
        guest.email?.toLowerCase().includes(search) ||
        guest.phone?.toLowerCase().includes(search) ||
        String(guest.room || "")
          .toLowerCase()
          .includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [guests, statusFilter, searchTerm]);

  /* ==============================
     CLEAR FILTERS
  ============================== */

  const handleClearFilters = () => {
    setStatusFilter("All");
    setSearchTerm("");
  };

  /* ==============================
     VIEW DETAILS
  ============================== */

  const handleViewDetails = (guest) => {
    setSelectedGuestId(guest.id);
  };

  /* ==============================
     CLOSE DETAILS
  ============================== */

  const handleCloseDetails = () => {
    setSelectedGuestId(null);
  };

  return (
    <MainLayout>

      <Breadcrumb items={["Guests"]} />

      <PageHeader
        title="Guests"
        subtitle={
          selectedHotel
            ? `Manage guests for ${selectedHotel.name}`
            : "Manage guest profiles, stays and guest information"
        }
      />

      <div className="guests-page">

        {/* SELECTED HOTEL */}

        {selectedHotel && (
          <div className="guests-hotel-bar">

            <div className="guests-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="guests-hotel-info">

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

        {/* ACTION */}

        <div className="guest-actions">

          <button
            type="button"
            className="add-guest-btn"
            onClick={() =>
              setShowAddGuest((prev) => !prev)
            }
          >

            <i
              className={
                showAddGuest
                  ? "bi bi-x-circle"
                  : "bi bi-person-plus"
              }
            ></i>

            {showAddGuest
              ? "Close Form"
              : "Add New Guest"}

          </button>

        </div>

        {/* ADD GUEST */}

        {showAddGuest && (
          <AddGuest
            onAdd={handleAddGuest}
          />
        )}

        {/* FILTER */}

        <GuestFilter
          status={statusFilter}
          setStatus={setStatusFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClear={handleClearFilters}
        />

        {/* HEADER */}

        <div className="guests-list-header">

          <div>

            <h2>Hotel Guests</h2>

            <p>
              Showing {filteredGuests.length} of{" "}
              {guests.length} guest records
            </p>

          </div>

          <span className="guests-result">
            {filteredGuests.length} Guests
          </span>

        </div>

        {/* GUEST LIST */}

        {filteredGuests.length > 0 ? (

          <div className="guests-grid">

            {filteredGuests.map((guest) => (

              <div
                key={guest.id}
                onClick={() =>
                  handleViewDetails(guest)
                }
              >

                <GuestCard
                  guest={guest}
                />

              </div>

            ))}

          </div>

        ) : (

          <div className="guests-empty">

            <i className="bi bi-people"></i>

            <h3>
              No Guests Found
            </h3>

            <p>
              {guests.length === 0
                ? "No guest records are available for this property."
                : "Try changing your search or status filter."}
            </p>

          </div>

        )}

        {/* DETAILS */}

        {selectedGuest && (
          <GuestDetails
            guest={selectedGuest}
            onClose={handleCloseDetails}
          />
        )}

      </div>

    </MainLayout>
  );
}

export default Guests;