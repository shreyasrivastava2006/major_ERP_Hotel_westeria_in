import { useNavigate } from 'react-router-dom'
import SuperAdminLayout from '../../components/layout/SuperAdminLayout'
import './SuperAdminDashboard.css'

function SuperAdminDashboard() {
  const navigate = useNavigate()

  const hotels = [
    {
      id: 1,
      hotelId: 'HOTEL-001',
      name: 'Grand Palace Hotel',
      location: 'Lucknow, Uttar Pradesh',
      rooms: 50,
      users: 12,
      status: 'Active'
    },
    {
      id: 2,
      hotelId: 'HOTEL-002',
      name: 'Royal Orchid Hotel',
      location: 'Delhi, India',
      rooms: 80,
      users: 18,
      status: 'Active'
    },
    {
      id: 3,
      hotelId: 'HOTEL-003',
      name: 'Sunrise Residency',
      location: 'Kanpur, Uttar Pradesh',
      rooms: 35,
      users: 8,
      status: 'Pending'
    }
  ]

  const totalHotels = hotels.length

  const activeHotels = hotels.filter(
    hotel => hotel.status === 'Active'
  ).length

  const pendingHotels = hotels.filter(
    hotel => hotel.status === 'Pending'
  ).length

  const totalRooms = hotels.reduce(
    (total, hotel) => total + hotel.rooms,
    0
  )

  const totalUsers = hotels.reduce(
    (total, hotel) => total + hotel.users,
    0
  )


  return (
    <SuperAdminLayout>

      <div className="super-dashboard">


        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="super-dashboard-breadcrumb">
          <span>Super Admin</span>
          <i className="bi bi-chevron-right"></i>
          <strong>Dashboard</strong>
        </div>


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="super-dashboard-header">

          <div>
            <h1>Super Admin Dashboard</h1>

            <p>
              Manage hotels, users and the Wisteria In platform
            </p>
          </div>


          <button
            type="button"
            className="super-add-hotel-btn"
            onClick={() => navigate('/super-admin/hotels/add')}
          >
            <i className="bi bi-plus-lg"></i>

            Add Hotel
          </button>

        </div>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="super-stat-grid">


          {/* TOTAL HOTELS */}
          <div className="super-stat-card">

            <div className="super-stat-icon purple">
              <i className="bi bi-buildings-fill"></i>
            </div>

            <div className="super-stat-content">
              <span>Total Hotels</span>
              <strong>{totalHotels}</strong>
              <small>Registered hotels</small>
            </div>

          </div>


          {/* ACTIVE HOTELS */}
          <div className="super-stat-card">

            <div className="super-stat-icon green">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div className="super-stat-content">
              <span>Active Hotels</span>
              <strong>{activeHotels}</strong>
              <small>Currently active</small>
            </div>

          </div>


          {/* PENDING */}
          <div className="super-stat-card">

            <div className="super-stat-icon gold">
              <i className="bi bi-hourglass-split"></i>
            </div>

            <div className="super-stat-content">
              <span>Pending Hotels</span>
              <strong>{pendingHotels}</strong>
              <small>Awaiting activation</small>
            </div>

          </div>


          {/* ROOMS */}
          <div className="super-stat-card">

            <div className="super-stat-icon blue">
              <i className="bi bi-door-open-fill"></i>
            </div>

            <div className="super-stat-content">
              <span>Total Rooms</span>
              <strong>{totalRooms}</strong>
              <small>Across all hotels</small>
            </div>

          </div>


          {/* USERS */}
          <div className="super-stat-card">

            <div className="super-stat-icon rose">
              <i className="bi bi-people-fill"></i>
            </div>

            <div className="super-stat-content">
              <span>Total Users</span>
              <strong>{totalUsers}</strong>
              <small>Platform users</small>
            </div>

          </div>

        </div>


        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="super-dashboard-grid">


          {/* =================================================
              PLATFORM OVERVIEW
          ================================================= */}

          <section className="super-panel overview-panel">

            <div className="super-panel-header">

              <div>
                <span className="super-panel-label">
                  PLATFORM
                </span>

                <h2>Platform Overview</h2>
              </div>

              <i className="bi bi-bar-chart-line"></i>

            </div>


            <div className="overview-list">

              <div className="overview-row">

                <div className="overview-row-left">
                  <div className="overview-mini-icon">
                    <i className="bi bi-building"></i>
                  </div>

                  <span>Registered Hotels</span>
                </div>

                <strong>{totalHotels}</strong>

              </div>


              <div className="overview-row">

                <div className="overview-row-left">
                  <div className="overview-mini-icon">
                    <i className="bi bi-door-open"></i>
                  </div>

                  <span>Total Rooms</span>
                </div>

                <strong>{totalRooms}</strong>

              </div>


              <div className="overview-row">

                <div className="overview-row-left">
                  <div className="overview-mini-icon">
                    <i className="bi bi-person-check"></i>
                  </div>

                  <span>Platform Users</span>
                </div>

                <strong>{totalUsers}</strong>

              </div>


              <div className="overview-row">

                <div className="overview-row-left">
                  <div className="overview-mini-icon">
                    <i className="bi bi-check2-circle"></i>
                  </div>

                  <span>Active Hotels</span>
                </div>

                <strong>{activeHotels}</strong>

              </div>

            </div>

          </section>


          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <section className="super-panel quick-panel">

            <div className="super-panel-header">

              <div>
                <span className="super-panel-label">
                  ACTIONS
                </span>

                <h2>Quick Actions</h2>
              </div>

              <i className="bi bi-lightning-charge"></i>

            </div>


            <div className="quick-actions">


              <button
                type="button"
                onClick={() =>
                  navigate('/super-admin/hotels/add')
                }
                className="quick-action"
              >
                <div className="quick-action-icon">
                  <i className="bi bi-building-add"></i>
                </div>

                <div>
                  <strong>Add New Hotel</strong>
                  <span>Register a new hotel</span>
                </div>

                <i className="bi bi-chevron-right arrow"></i>
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate('/super-admin/hotels')
                }
                className="quick-action"
              >
                <div className="quick-action-icon">
                  <i className="bi bi-buildings"></i>
                </div>

                <div>
                  <strong>Manage Hotels</strong>
                  <span>View all registered hotels</span>
                </div>

                <i className="bi bi-chevron-right arrow"></i>
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate('/super-admin/users')
                }
                className="quick-action"
              >
                <div className="quick-action-icon">
                  <i className="bi bi-people"></i>
                </div>

                <div>
                  <strong>Manage Users</strong>
                  <span>Manage platform users</span>
                </div>

                <i className="bi bi-chevron-right arrow"></i>
              </button>

            </div>

          </section>

        </div>


        {/* =================================================
            RECENT HOTELS
        ================================================= */}

        <section className="super-panel hotels-panel">

          <div className="super-panel-header">

            <div>
              <span className="super-panel-label">
                HOTEL MANAGEMENT
              </span>

              <h2>Recent Hotels</h2>
            </div>


            <button
              type="button"
              className="view-all-btn"
              onClick={() =>
                navigate('/super-admin/hotels')
              }
            >
              View All

              <i className="bi bi-arrow-right"></i>
            </button>

          </div>


          {/* TABLE */}

          <div className="super-table-wrapper">

            <table className="super-hotels-table">

              <thead>

                <tr>
                  <th>Hotel</th>
                  <th>Location</th>
                  <th>Rooms</th>
                  <th>Users</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

                {hotels.map(hotel => (

                  <tr key={hotel.id}>

                    <td>

                      <div className="hotel-name-cell">

                        <div className="hotel-table-icon">
                          <i className="bi bi-building"></i>
                        </div>

                        <div>
                          <strong>{hotel.name}</strong>
                          <span>{hotel.hotelId}</span>
                        </div>

                      </div>

                    </td>


                    <td>
                      <div className="location-cell">
                        <i className="bi bi-geo-alt"></i>
                        {hotel.location}
                      </div>
                    </td>


                    <td>
                      <span className="table-number">
                        {hotel.rooms}
                      </span>
                    </td>


                    <td>
                      <span className="table-number">
                        {hotel.users}
                      </span>
                    </td>


                    <td>

                      <span
                        className={`hotel-status ${
                          hotel.status.toLowerCase()
                        }`}
                      >
                        <span></span>
                        {hotel.status}
                      </span>

                    </td>


                    <td>

                      <button
                        type="button"
                        className="hotel-view-btn"
                        onClick={() =>
                          navigate(
                            `/super-admin/hotel-details?id=${hotel.id}`
                          )
                        }
                      >
                        View
                        <i className="bi bi-arrow-right"></i>
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>


      </div>

    </SuperAdminLayout>
  )
}

export default SuperAdminDashboard