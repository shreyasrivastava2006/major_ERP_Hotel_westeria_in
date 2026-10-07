import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./Hotels.css";

function Hotels() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");

  const [hotels, setHotels] = useState([
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
  ]);

  const cities = useMemo(() => {
    return ["All", ...new Set(hotels.map((hotel) => hotel.city))];
  }, [hotels]);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        hotel.name.toLowerCase().includes(searchValue) ||
        hotel.hotelId.toLowerCase().includes(searchValue) ||
        hotel.location.toLowerCase().includes(searchValue) ||
        hotel.manager.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || hotel.status === statusFilter;

      const matchesCity =
        cityFilter === "All" || hotel.city === cityFilter;

      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [hotels, search, statusFilter, cityFilter]);

  const totalHotels = hotels.length;

  const activeHotels = hotels.filter(
    (hotel) => hotel.status === "Active"
  ).length;

  const pendingHotels = hotels.filter(
    (hotel) => hotel.status === "Pending"
  ).length;

  const totalRooms = hotels.reduce(
    (total, hotel) => total + hotel.rooms,
    0
  );

  const totalUsers = hotels.reduce(
    (total, hotel) => total + hotel.users,
    0
  );

  const handleView = (hotel) => {
    navigate("/super-admin/hotel-details", {
      state: { hotel },
    });
  };

  const handleEdit = (hotel) => {
    navigate("/super-admin/hotels/add", {
      state: {
        mode: "edit",
        hotel,
      },
    });
  };

  const handleStatusChange = (id) => {
    setHotels((currentHotels) =>
      currentHotels.map((hotel) => {
        if (hotel.id !== id) return hotel;

        const nextStatus =
          hotel.status === "Active" ? "Inactive" : "Active";

        return {
          ...hotel,
          status: nextStatus,
        };
      })
    );
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this hotel?"
    );

    if (!confirmed) return;

    setHotels((currentHotels) =>
      currentHotels.filter((hotel) => hotel.id !== id)
    );
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCityFilter("All");
  };

  return (
    <SuperAdminLayout>
      <div className="super-hotels-page">

        {/* =====================================================
            BREADCRUMB
        ===================================================== */}
        <div className="super-hotels-breadcrumb">
          <span
            onClick={() => navigate("/super-admin")}
            className="super-hotels-breadcrumb-link"
          >
            <i className="bi bi-grid-1x2-fill"></i>
            Dashboard
          </span>

          <i className="bi bi-chevron-right"></i>

          <span>Hotels</span>
        </div>


        {/* =====================================================
            HEADER
        ===================================================== */}
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
            onClick={() => navigate("/super-admin/hotels/add")}
          >
            <i className="bi bi-building-add"></i>
            Add Hotel
          </button>

        </div>


        {/* =====================================================
            STATISTICS
        ===================================================== */}
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


        {/* =====================================================
            FILTERS
        ===================================================== */}
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

            {/* SEARCH */}
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
                  onClick={() => setSearch("")}
                  className="super-hotels-search-clear"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}

            </div>


            {/* CITY */}
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


            {/* STATUS */}
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


            {/* CLEAR */}
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


        {/* =====================================================
            HOTELS TABLE
        ===================================================== */}
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
                            {hotel.name.charAt(0)}
                          </div>

                          <div className="super-hotel-details">

                            <strong>{hotel.name}</strong>

                            <span>
                              {hotel.hotelId}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* LOCATION */}
                      <td>

                        <div className="super-hotel-location">

                          <i className="bi bi-geo-alt"></i>

                          <span>
                            {hotel.location}
                          </span>

                        </div>

                      </td>


                      {/* MANAGER */}
                      <td>

                        <div className="super-hotel-manager">

                          <strong>
                            {hotel.manager}
                          </strong>

                          <span>
                            {hotel.email}
                          </span>

                        </div>

                      </td>


                      {/* ROOMS */}
                      <td>

                        <div className="super-hotel-number">

                          <i className="bi bi-door-open"></i>

                          <strong>
                            {hotel.rooms}
                          </strong>

                        </div>

                      </td>


                      {/* USERS */}
                      <td>

                        <div className="super-hotel-number">

                          <i className="bi bi-people"></i>

                          <strong>
                            {hotel.users}
                          </strong>

                        </div>

                      </td>


                      {/* PLAN */}
                      <td>

                        <span
                          className={`super-hotel-plan ${hotel.plan
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {hotel.plan}
                        </span>

                      </td>


                      {/* STATUS */}
                      <td>

                        <span
                          className={`super-hotel-status ${hotel.status.toLowerCase()}`}
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
                            onClick={() => handleView(hotel)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>

                          <button
                            type="button"
                            className="super-hotel-action edit"
                            title="Edit Hotel"
                            onClick={() => handleEdit(hotel)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            type="button"
                            className="super-hotel-action status"
                            title="Change Status"
                            onClick={() =>
                              handleStatusChange(hotel.id)
                            }
                          >
                            <i className="bi bi-arrow-repeat"></i>
                          </button>

                          <button
                            type="button"
                            className="super-hotel-action delete"
                            title="Delete Hotel"
                            onClick={() =>
                              handleDelete(hotel.id)
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


          {/* TABLE FOOTER */}
          {filteredHotels.length > 0 && (
            <div className="super-hotels-table-footer">

              <span>
                Showing{" "}
                <strong>{filteredHotels.length}</strong>{" "}
                of{" "}
                <strong>{hotels.length}</strong>{" "}
                hotels
              </span>

              <span>
                Last updated: 01 Oct 2026
              </span>

            </div>
          )}

        </div>

      </div>
    </SuperAdminLayout>
  );
}

export default Hotels;