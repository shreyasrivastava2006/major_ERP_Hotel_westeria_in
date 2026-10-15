import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./Hotels.css";

// =====================================================
// STORAGE
// =====================================================

const HOTELS_KEY = "wisteriaHotels";

// =====================================================
// DEFAULT HOTELS
// =====================================================

const defaultHotels = [
  {
    id: 1,
    hotelId: "HOTEL-001",
    name: "Grand Palace Hotel",
    location: "Lucknow, Uttar Pradesh",
    city: "Lucknow",
    rooms: 50,
    users: 12,
    manager: "Rajesh Sharma",
    contact: "+91 98765 43210",
    email: "admin@grandpalace.com",
    plan: "Premium",
    status: "Active",
    joined: "28 Sep 2026",
  },
  {
    id: 2,
    hotelId: "HOTEL-002",
    name: "Royal Orchid Hotel",
    location: "Delhi, India",
    city: "Delhi",
    rooms: 80,
    users: 18,
    manager: "Vikas Mehra",
    contact: "+91 98765 12345",
    email: "admin@royalorchid.com",
    plan: "Enterprise",
    status: "Active",
    joined: "25 Sep 2026",
  },
  {
    id: 3,
    hotelId: "HOTEL-003",
    name: "Sunrise Residency",
    location: "Kanpur, Uttar Pradesh",
    city: "Kanpur",
    rooms: 35,
    users: 8,
    manager: "Amit Singh",
    contact: "+91 91234 56789",
    email: "admin@sunriseresidency.com",
    plan: "Basic",
    status: "Pending",
    joined: "22 Sep 2026",
  },
  {
    id: 4,
    hotelId: "HOTEL-004",
    name: "Wisteria Palace",
    location: "Varanasi, Uttar Pradesh",
    city: "Varanasi",
    rooms: 65,
    users: 14,
    manager: "Priya Verma",
    contact: "+91 99887 66554",
    email: "admin@wisteriapalace.com",
    plan: "Premium",
    status: "Active",
    joined: "20 Sep 2026",
  },
  {
    id: 5,
    hotelId: "HOTEL-005",
    name: "Royal Residency",
    location: "Prayagraj, Uttar Pradesh",
    city: "Prayagraj",
    rooms: 42,
    users: 9,
    manager: "Neha Gupta",
    contact: "+91 97654 32109",
    email: "admin@royalresidency.com",
    plan: "Basic",
    status: "Inactive",
    joined: "15 Sep 2026",
  },
];

// =====================================================
// EMPTY HOTEL FORM
// =====================================================

const initialForm = {
  name: "",
  city: "",
  location: "",
  rooms: "",
  users: "0",
  manager: "",
  contact: "",
  email: "",
  plan: "Basic",
  status: "Pending",
};

// =====================================================
// HELPERS
// =====================================================

const loadHotels = () => {
  try {
    const stored = localStorage.getItem(HOTELS_KEY);

    if (stored !== null) {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Unable to load hotels:", error);
  }

  return defaultHotels;
};

const createId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `hotel-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
};

const formatDate = () => {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// =====================================================
// MAIN COMPONENT
// =====================================================

function Hotels() {
  const navigate = useNavigate();

  // HOTELS
  const [hotels, setHotels] = useState(loadHotels);

  // FILTERS
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");

  // POPUP
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [form, setForm] = useState({ ...initialForm });
  const [formError, setFormError] = useState("");

  // DELETE POPUP
  const [deleteTarget, setDeleteTarget] = useState(null);

  // SUCCESS MESSAGE
  const [message, setMessage] = useState("");

  // =====================================================
  // SAVE HOTELS
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        HOTELS_KEY,
        JSON.stringify(hotels)
      );
    } catch (error) {
      console.error("Unable to save hotels:", error);
    }
  }, [hotels]);

  // =====================================================
  // LOCK BACKGROUND SCROLL
  // =====================================================

  useEffect(() => {
    if (!showModal && !deleteTarget) return;

    const previous = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [showModal, deleteTarget]);

  // =====================================================
  // CLOSE USING ESCAPE
  // =====================================================

  useEffect(() => {
    if (!showModal && !deleteTarget) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
        setDeleteTarget(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal, deleteTarget]);

  // =====================================================
  // SUCCESS MESSAGE TIMER
  // =====================================================

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [message]);

  // =====================================================
  // FILTER OPTIONS
  // =====================================================

  const cities = useMemo(() => {
    return [
      "All",
      ...new Set(
        hotels.map((hotel) => hotel.city).filter(Boolean)
      ),
    ];
  }, [hotels]);

  // =====================================================
  // FILTERED HOTELS
  // =====================================================

  const filteredHotels = useMemo(() => {
    const query = search.toLowerCase().trim();

    return hotels.filter((hotel) => {
      const matchesSearch = [
        hotel.name,
        hotel.hotelId,
        hotel.location,
        hotel.manager,
        hotel.email,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(query)
      );

      const matchesStatus =
        statusFilter === "All" ||
        hotel.status === statusFilter;

      const matchesCity =
        cityFilter === "All" ||
        hotel.city === cityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCity
      );
    });
  }, [hotels, search, statusFilter, cityFilter]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalHotels = hotels.length;

  const activeHotels = hotels.filter(
    (hotel) => hotel.status === "Active"
  ).length;

  const pendingHotels = hotels.filter(
    (hotel) => hotel.status === "Pending"
  ).length;

  const totalRooms = hotels.reduce(
    (total, hotel) => total + Number(hotel.rooms || 0),
    0
  );

  const totalUsers = hotels.reduce(
    (total, hotel) => total + Number(hotel.users || 0),
    0
  );

  // =====================================================
  // OPEN ADD HOTEL POPUP
  // =====================================================

  const openAddModal = () => {
    setModalMode("add");
    setSelectedHotel(null);
    setForm({ ...initialForm });
    setFormError("");
    setShowModal(true);
  };

  // =====================================================
  // OPEN VIEW HOTEL POPUP
  // =====================================================

  const openViewModal = (hotel) => {
    setModalMode("view");
    setSelectedHotel(hotel);
    setForm({ ...initialForm, ...hotel });
    setFormError("");
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT HOTEL POPUP
  // =====================================================

  const openEditModal = (hotel) => {
    setModalMode("edit");
    setSelectedHotel(hotel);
    setForm({ ...initialForm, ...hotel });
    setFormError("");
    setShowModal(true);
  };

  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const closeModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
    setFormError("");
  };

  // =====================================================
  // HANDLE FORM INPUT
  // =====================================================

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  // =====================================================
  // GENERATE HOTEL ID
  // =====================================================

  const generateHotelId = () => {
    const numbers = hotels
      .map((hotel) => {
        const match = String(
          hotel.hotelId || ""
        ).match(/^HOTEL-(\d+)$/);

        return match ? Number(match[1]) : 0;
      });

    const nextNumber = Math.max(0, ...numbers) + 1;

    return `HOTEL-${String(nextNumber).padStart(3, "0")}`;
  };

  // =====================================================
  // SAVE HOTEL
  // =====================================================

  const handleSaveHotel = (event) => {
    event.preventDefault();

    if (modalMode === "view") return;

    const name = form.name.trim();
    const city = form.city.trim();
    const location = form.location.trim();
    const manager = form.manager.trim();
    const contact = form.contact.trim();
    const email = form.email.trim().toLowerCase();

    if (
      !name ||
      !city ||
      !location ||
      !manager ||
      !contact ||
      !email
    ) {
      setFormError("Please fill all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const phoneDigits = contact.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 12) {
      setFormError("Please enter a valid contact number.");
      return;
    }

    const rooms = Number(form.rooms);
    const usersCount = Number(form.users);

    if (
      !Number.isInteger(rooms) ||
      rooms < 1
    ) {
      setFormError("Total rooms must be at least 1.");
      return;
    }

    if (
      !Number.isInteger(usersCount) ||
      usersCount < 0
    ) {
      setFormError("Total users cannot be negative.");
      return;
    }

    const hotelData = {
      name,
      city,
      location,
      manager,
      contact,
      email,
      rooms,
      users: usersCount,
      plan: form.plan,
      status: form.status,
    };

    // EDIT HOTEL

    if (modalMode === "edit" && selectedHotel) {
      setHotels((previous) =>
        previous.map((hotel) =>
          hotel.id === selectedHotel.id
            ? { ...hotel, ...hotelData }
            : hotel
        )
      );

      setMessage(`${name} updated successfully.`);
    }

    // ADD HOTEL

    else {
      const newHotel = {
        id: createId(),
        hotelId: generateHotelId(),
        ...hotelData,
        joined: formatDate(),
      };

      setHotels((previous) => [
        newHotel,
        ...previous,
      ]);

      setMessage(`${name} added successfully.`);
    }

    closeModal();
  };

  // =====================================================
  // CHANGE HOTEL STATUS
  // =====================================================

  const handleStatusChange = (hotel) => {
    const nextStatus =
      hotel.status === "Active"
        ? "Inactive"
        : "Active";

    setHotels((previous) =>
      previous.map((item) =>
        item.id === hotel.id
          ? {
              ...item,
              status: nextStatus,
            }
          : item
      )
    );

    setMessage(
      `${hotel.name} is now ${nextStatus.toLowerCase()}.`
    );
  };

  // =====================================================
  // DELETE HOTEL
  // =====================================================

  const handleDeleteHotel = () => {
    if (!deleteTarget) return;

    setHotels((previous) =>
      previous.filter(
        (hotel) => hotel.id !== deleteTarget.id
      )
    );

    setMessage(
      `${deleteTarget.name} deleted successfully.`
    );

    setDeleteTarget(null);
    closeModal();
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCityFilter("All");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SuperAdminLayout>
      <div className="super-hotels-page">

        {/* ============================================
            BREADCRUMB
        ============================================ */}

        <div className="super-hotels-breadcrumb">
          <button
            type="button"
            className="super-hotels-breadcrumb-link"
            onClick={() => navigate("/super-admin")}
          >
            <i className="bi bi-grid-1x2-fill"></i>
            Dashboard
          </button>

          <i className="bi bi-chevron-right"></i>

          <span>Hotels</span>
        </div>

        {/* ============================================
            HEADER
        ============================================ */}

        <div className="super-hotels-header">
          <div>
            <span className="super-hotels-eyebrow">
              HOTEL MANAGEMENT
            </span>

            <h1>Hotels</h1>

            <p>
              Manage and monitor all hotels registered on the
              Wisteria In platform.
            </p>
          </div>

          <button
            type="button"
            className="super-hotels-add-btn"
            onClick={openAddModal}
          >
            <i className="bi bi-building-add"></i>
            Add Hotel
          </button>
        </div>

        {/* ============================================
            SUCCESS MESSAGE
        ============================================ */}

        {message && (
          <div className="super-hotels-success-message">
            <i className="bi bi-check-circle-fill"></i>

            <span>{message}</span>

            <button
              type="button"
              onClick={() => setMessage("")}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        )}

        {/* ============================================
            STATISTICS
        ============================================ */}

        <div className="super-hotels-stats">

          <div className="super-hotels-stat-card">
            <div className="super-hotels-stat-icon gold">
              <i className="bi bi-buildings-fill"></i>
            </div>

            <div className="super-hotels-stat-content">
              <span>Total Hotels</span>
              <strong>{totalHotels}</strong>
              <small>Registered properties</small>
            </div>
          </div>

          <div className="super-hotels-stat-card">
            <div className="super-hotels-stat-icon green">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div className="super-hotels-stat-content">
              <span>Active Hotels</span>
              <strong>{activeHotels}</strong>
              <small>Currently operational</small>
            </div>
          </div>

          <div className="super-hotels-stat-card">
            <div className="super-hotels-stat-icon purple">
              <i className="bi bi-hourglass-split"></i>
            </div>

            <div className="super-hotels-stat-content">
              <span>Pending</span>
              <strong>{pendingHotels}</strong>
              <small>Awaiting activation</small>
            </div>
          </div>

          <div className="super-hotels-stat-card">
            <div className="super-hotels-stat-icon rose">
              <i className="bi bi-door-open-fill"></i>
            </div>

            <div className="super-hotels-stat-content">
              <span>Total Rooms</span>
              <strong>{totalRooms}</strong>
              <small>Across all hotels</small>
            </div>
          </div>

          <div className="super-hotels-stat-card">
            <div className="super-hotels-stat-icon blue">
              <i className="bi bi-people-fill"></i>
            </div>

            <div className="super-hotels-stat-content">
              <span>Total Users</span>
              <strong>{totalUsers}</strong>
              <small>Platform users</small>
            </div>
          </div>

        </div>

        {/* ============================================
            FILTERS
        ============================================ */}

        <div className="super-hotels-filter-card">

          <div className="super-hotels-filter-heading">
            <div>
              <i className="bi bi-funnel"></i>
              <span>Filter Hotels</span>
            </div>

            <span className="super-hotels-result-count">
              {filteredHotels.length} result
              {filteredHotels.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="super-hotels-filter-row">

            <div className="super-hotels-search-box">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search hotel, ID or manager..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  className="super-hotels-search-clear"
                  onClick={() => setSearch("")}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>

            <select
              className="super-hotels-filter-select"
              value={cityFilter}
              onChange={(event) =>
                setCityFilter(event.target.value)
              }
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === "All" ? "All Cities" : city}
                </option>
              ))}
            </select>

            <select
              className="super-hotels-filter-select"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button
              type="button"
              className="super-hotels-clear-btn"
              onClick={clearFilters}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Clear
            </button>

          </div>
        </div>

        {/* ============================================
            HOTEL DIRECTORY
        ============================================ */}

        <div className="super-hotels-table-card">

          <div className="super-hotels-table-header">
            <div>
              <span className="super-hotels-table-eyebrow">
                REGISTERED PROPERTIES
              </span>

              <h2>Hotel Directory</h2>
            </div>

            <div className="super-hotels-directory-count">
              <i className="bi bi-buildings"></i>
              {filteredHotels.length} Hotels
            </div>
          </div>

          <div className="super-hotels-table-wrapper">
            <table className="super-hotels-table">

              <thead>
                <tr>
                  <th>HOTEL</th>
                  <th>LOCATION</th>
                  <th>MANAGER</th>
                  <th>ROOMS</th>
                  <th>USERS</th>
                  <th>PLAN</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredHotels.length > 0 ? (
                  filteredHotels.map((hotel) => (
                    <tr key={hotel.id}>

                      {/* HOTEL */}

                      <td>
                        <div className="super-hotel-info">
                          <div className="super-hotel-avatar">
                            {String(hotel.name || "H")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="super-hotel-details">
                            <strong>{hotel.name}</strong>
                            <span>{hotel.hotelId}</span>
                          </div>
                        </div>
                      </td>

                      {/* LOCATION */}

                      <td>
                        <div className="super-hotel-location">
                          <i className="bi bi-geo-alt"></i>
                          <span>{hotel.location}</span>
                        </div>
                      </td>

                      {/* MANAGER */}

                      <td>
                        <div className="super-hotel-manager">
                          <strong>{hotel.manager}</strong>
                          <span>{hotel.email}</span>
                        </div>
                      </td>

                      {/* ROOMS */}

                      <td>
                        <div className="super-hotel-number">
                          <i className="bi bi-door-open"></i>
                          <strong>{hotel.rooms}</strong>
                        </div>
                      </td>

                      {/* USERS */}

                      <td>
                        <div className="super-hotel-number">
                          <i className="bi bi-people"></i>
                          <strong>{hotel.users}</strong>
                        </div>
                      </td>

                      {/* PLAN */}

                      <td>
                        <span
                          className={`super-hotel-plan ${String(
                            hotel.plan || "Basic"
                          )
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {hotel.plan}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`super-hotel-status ${String(
                            hotel.status || "Pending"
                          ).toLowerCase()}`}
                        >
                          <i className="bi bi-circle-fill"></i>
                          {hotel.status}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="super-hotel-actions">

                          <button
                            type="button"
                            className="super-hotel-action view"
                            title="View Hotel"
                            onClick={() =>
                              openViewModal(hotel)
                            }
                          >
                            <i className="bi bi-eye"></i>
                          </button>

                          <button
                            type="button"
                            className="super-hotel-action edit"
                            title="Edit Hotel"
                            onClick={() =>
                              openEditModal(hotel)
                            }
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            type="button"
                            className="super-hotel-action status"
                            title="Change Hotel Status"
                            onClick={() =>
                              handleStatusChange(hotel)
                            }
                          >
                            <i className="bi bi-arrow-repeat"></i>
                          </button>

                          <button
                            type="button"
                            className="super-hotel-action delete"
                            title="Delete Hotel"
                            onClick={() =>
                              setDeleteTarget(hotel)
                            }
                          >
                            <i className="bi bi-trash3"></i>
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="super-hotels-empty-cell"
                    >
                      <div className="super-hotels-empty">
                        <div className="super-hotels-empty-icon">
                          <i className="bi bi-building-x"></i>
                        </div>

                        <h3>No Hotels Found</h3>

                        <p>
                          No hotels match your current
                          search or filter.
                        </p>

                        <button
                          type="button"
                          onClick={clearFilters}
                        >
                          Clear Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {filteredHotels.length > 0 && (
            <div className="super-hotels-table-footer">
              <span>
                Showing{" "}
                <strong>{filteredHotels.length}</strong>{" "}
                of <strong>{hotels.length}</strong> hotels
              </span>

              <span>
                Last updated: {formatDate()}
              </span>
            </div>
          )}

        </div>

        {/* ============================================
            ADD / EDIT / VIEW HOTEL POPUP
        ============================================ */}

        {showModal && (
          <div
            className="super-hotels-modal-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              className="super-hotels-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="super-hotels-modal-title"
            >

              {/* POPUP HEADER */}

              <div className="super-hotels-modal-header">

                <div className="super-hotels-modal-heading">
                  <div className="super-hotels-modal-heading-icon">
                    <i
                      className={`bi ${
                        modalMode === "add"
                          ? "bi-building-add"
                          : modalMode === "edit"
                          ? "bi-pencil-square"
                          : "bi-building"
                      }`}
                    ></i>
                  </div>

                  <div>
                    <span>
                      {modalMode === "add"
                        ? "REGISTER NEW PROPERTY"
                        : modalMode === "edit"
                        ? "UPDATE PROPERTY DETAILS"
                        : "PROPERTY INFORMATION"}
                    </span>

                    <h2 id="super-hotels-modal-title">
                      {modalMode === "add"
                        ? "Add New Hotel"
                        : modalMode === "edit"
                        ? "Edit Hotel"
                        : "Hotel Details"}
                    </h2>

                    <p>
                      {modalMode === "add"
                        ? "Enter the details to register a new hotel."
                        : modalMode === "edit"
                        ? "Update the selected hotel's information."
                        : "View the selected hotel's information."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="super-hotels-modal-close"
                  onClick={closeModal}
                  aria-label="Close popup"
                >
                  <i className="bi bi-x-lg"></i>
                </button>

              </div>

              {/* POPUP FORM */}

              <form
                className="super-hotels-modal-form"
                onSubmit={handleSaveHotel}
              >
                <div className="super-hotels-modal-body">

                  {/* HOTEL INFORMATION */}

                  <div className="super-hotels-form-section-title">
                    <i className="bi bi-buildings"></i>
                    Hotel Information
                  </div>

                  <div className="super-hotels-form-grid">

                    {/* HOTEL NAME */}

                    <div className="super-hotels-form-group super-hotels-form-full">
                      <label htmlFor="hotel-name">
                        Hotel Name <span>*</span>
                      </label>

                      <div className="super-hotels-input-wrapper">
                        <i className="bi bi-building"></i>

                        <input
                          id="hotel-name"
                          type="text"
                          name="name"
                          placeholder="Enter hotel name"
                          value={form.name}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          required
                        />
                      </div>
                    </div>

                    {/* CITY */}

                    <div className="super-hotels-form-group">
                      <label htmlFor="hotel-city">
                        City <span>*</span>
                      </label>

                      <div className="super-hotels-input-wrapper">
                        <i className="bi bi-geo-alt"></i>

                        <input
                          id="hotel-city"
                          type="text"
                          name="city"
                          placeholder="Enter city"
                          value={form.city}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          required
                        />
                      </div>
                    </div>

                    {/* LOCATION */}

                    <div className="super-hotels-form-group">
                      <label htmlFor="hotel-location">
                        Location <span>*</span>
                      </label>

                      <div className="super-hotels-input-wrapper">
                        <i className="bi bi-map"></i>

                        <input
                          id="hotel-location"
                          type="text"
                          name="location"
                          placeholder="City, State"
                          value={form.location}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          required
                        />
                      </div>
                    </div>

                    {/* ROOMS */}

                    <div className="super-hotels-form-group">
                      <label htmlFor="hotel-rooms">
                        Total Rooms <span>*</span>
                      </label>

                      <div className="super-hotels-input-wrapper">
                        <i className="bi bi-door-open"></i>

                        <input
                          id="hotel-rooms"
                          type="number"
                          name="rooms"
                          placeholder="Enter room count"
                          value={form.rooms}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    {/* USERS */}

                    <div className="super-hotels-form-group">
                      <label htmlFor="hotel-users">
                        Total Users
                      </label>

                      <div className="super-hotels-input-wrapper">
                        <i className="bi bi-people"></i>

                        <input
                          id="hotel-users"
                          type="number"
                          name="users"
                          placeholder="Enter user count"
                          value={form.users}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          min="0"
                        />
                      </div>
                    </div>

                  </div>

                  {/* MANAGER INFORMATION */}

                  <div className="super-hotels-form-section-title">
                    <i className="bi bi-person-badge"></i>
                    Manager & Contact Information
                  </div>

                  <div className="super-hotels-form-grid">

                    {/* MANAGER */}

                    <div className="super-hotels-form-group">
                      <label htmlFor="hotel-manager">
                        Manager Name <span>*</span>
                      </label>

                      <div className="super-hotels-input-wrapper">
                        <i className="bi bi-person"></i>

                        <input
                          id="hotel-manager"
                          type="text"
                          name="manager"
                          placeholder="Enter manager name"
                          value={form.manager}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          required
                        />
                      </div>
                    </div>

                    {/* CONTACT */}

                    <div className="super-hotels-form-group">
                      <label htmlFor="hotel-contact">
                        Contact Number <span>*</span>
                      </label>

                      <div className="super-hotels-input-wrapper">
                        <i className="bi bi-telephone"></i>

                        <input
                          id="hotel-contact"
                          type="tel"
                          name="contact"
                          placeholder="+91 98765 43210"
                          value={form.contact}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          required
                        />
                      </div>
                    </div>

                    {/* EMAIL */}

                    <div className="super-hotels-form-group super-hotels-form-full">
                      <label htmlFor="hotel-email">
                        Email Address <span>*</span>
                      </label>

                      <div className="super-hotels-input-wrapper">
                        <i className="bi bi-envelope"></i>

                        <input
                          id="hotel-email"
                          type="email"
                          name="email"
                          placeholder="Enter hotel email"
                          value={form.email}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          required
                        />
                      </div>
                    </div>

                  </div>

                  {/* SUBSCRIPTION */}

                  <div className="super-hotels-form-section-title">
                    <i className="bi bi-credit-card"></i>
                    Subscription & Status
                  </div>

                  <div className="super-hotels-form-grid">

                    {/* PLAN */}

                    <div className="super-hotels-form-group">
                      <label htmlFor="hotel-plan">
                        Subscription Plan
                      </label>

                      <div className="super-hotels-input-wrapper">
                        <i className="bi bi-gem"></i>

                        <select
                          id="hotel-plan"
                          name="plan"
                          value={form.plan}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                        >
                          <option value="Basic">Basic</option>
                          <option value="Premium">Premium</option>
                          <option value="Enterprise">
                            Enterprise
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* STATUS */}

                    <div className="super-hotels-form-group">
                      <label htmlFor="hotel-status">
                        Hotel Status
                      </label>

                      <div className="super-hotels-input-wrapper">
                        <i className="bi bi-toggle-on"></i>

                        <select
                          id="hotel-status"
                          name="status"
                          value={form.status}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Inactive">
                            Inactive
                          </option>
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* VIEW DETAILS */}

                  {modalMode === "view" && (
                    <div className="super-hotels-view-info">
                      <i className="bi bi-info-circle"></i>

                      <div>
                        <span>
                          Hotel ID:{" "}
                          <strong>
                            {selectedHotel?.hotelId}
                          </strong>
                        </span>

                        <span>
                          Joined:{" "}
                          <strong>
                            {selectedHotel?.joined}
                          </strong>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ERROR */}

                  {formError && (
                    <div className="super-hotels-form-error">
                      <i className="bi bi-exclamation-circle"></i>
                      {formError}
                    </div>
                  )}

                </div>

                {/* POPUP FOOTER */}

                <div className="super-hotels-modal-footer">

                  <button
                    type="button"
                    className="super-hotels-modal-cancel"
                    onClick={closeModal}
                  >
                    {modalMode === "view"
                      ? "Close"
                      : "Cancel"}
                  </button>

                  {modalMode === "view" ? (
                    <button
                      type="button"
                      className="super-hotels-modal-save"
                      onClick={() =>
                        openEditModal(selectedHotel)
                      }
                    >
                      <i className="bi bi-pencil-square"></i>
                      Edit Hotel
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="super-hotels-modal-save"
                    >
                      <i
                        className={`bi ${
                          modalMode === "add"
                            ? "bi-building-check"
                            : "bi-check2-circle"
                        }`}
                      ></i>

                      {modalMode === "add"
                        ? "Save Hotel"
                        : "Update Hotel"}
                    </button>
                  )}

                </div>
              </form>

            </div>
          </div>
        )}

        {/* ============================================
            DELETE CONFIRMATION POPUP
        ============================================ */}

        {deleteTarget && (
          <div className="super-hotels-modal-overlay">
            <div
              className="super-hotels-delete-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Delete Hotel"
            >
              <div className="super-hotels-delete-icon">
                <i className="bi bi-trash3"></i>
              </div>

              <h2>Delete Hotel?</h2>

              <p>
                Are you sure you want to delete{" "}
                <strong>{deleteTarget.name}</strong>?
                This action cannot be undone.
              </p>

              <div className="super-hotels-delete-actions">
                <button
                  type="button"
                  className="super-hotels-modal-cancel"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="super-hotels-delete-confirm"
                  onClick={handleDeleteHotel}
                >
                  <i className="bi bi-trash3"></i>
                  Delete Hotel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </SuperAdminLayout>
  );
}

export default Hotels;