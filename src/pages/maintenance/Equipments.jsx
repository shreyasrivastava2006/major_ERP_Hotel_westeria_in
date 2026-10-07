import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './Equipments.css'

function Equipments() {
  const navigate = useNavigate()

  const [equipment, setEquipment] = useState([
    {
      id: 'EQ-1001',
      name: 'Air Conditioner',
      category: 'HVAC',
      location: 'Room 101',
      condition: 'Good',
      lastService: '01 Sep 2026',
      nextService: '01 Dec 2026',
      status: 'Operational',
    },
    {
      id: 'EQ-1002',
      name: 'Washing Machine',
      category: 'Laundry',
      location: 'Laundry Room',
      condition: 'Good',
      lastService: '15 Aug 2026',
      nextService: '15 Nov 2026',
      status: 'Operational',
    },
    {
      id: 'EQ-1003',
      name: 'Elevator',
      category: 'Electrical',
      location: 'Main Building',
      condition: 'Needs Service',
      lastService: '10 Jun 2026',
      nextService: '10 Sep 2026',
      status: 'Maintenance Due',
    },
    {
      id: 'EQ-1004',
      name: 'Generator',
      category: 'Power',
      location: 'Basement',
      condition: 'Good',
      lastService: '20 Jul 2026',
      nextService: '20 Oct 2026',
      status: 'Operational',
    },
    {
      id: 'EQ-1005',
      name: 'Water Pump',
      category: 'Plumbing',
      location: 'Utility Area',
      condition: 'Fair',
      lastService: '05 Aug 2026',
      nextService: '05 Nov 2026',
      status: 'Operational',
    },
  ])

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')

  const filteredEquipment = equipment.filter((item) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      item.id.toLowerCase().includes(searchText) ||
      item.name.toLowerCase().includes(searchText) ||
      item.location.toLowerCase().includes(searchText)

    const matchesCategory =
      categoryFilter === 'All Categories' ||
      item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const operational = equipment.filter(
    (item) => item.status === 'Operational'
  ).length

  const maintenanceDue = equipment.filter(
    (item) => item.status === 'Maintenance Due'
  ).length

  const updateStatus = (id) => {
    setEquipment((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === 'Operational'
                  ? 'Maintenance Due'
                  : 'Operational',
            }
          : item
      )
    )
  }

  return (
    <MainLayout>
      <div className="equipment-page">

        <Breadcrumb
          items={['Maintenance', 'Equipment']}
        />

        <div className="equipment-header">
          <PageHeader
            title="Equipment"
            subtitle="Manage hotel equipment, service schedules and operational status"
          />

          <button
            type="button"
            className="back-maintenance-btn"
            onClick={() => navigate('/maintenance')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Maintenance
          </button>
        </div>

        {/* STATS */}
        <div className="equipment-stats">

          <div className="equipment-stat-card">
            <div className="equipment-stat-icon">
              <i className="bi bi-tools"></i>
            </div>

            <div>
              <span>Total Equipment</span>
              <strong>{equipment.length}</strong>
            </div>
          </div>

          <div className="equipment-stat-card">
            <div className="equipment-stat-icon operational-icon">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Operational</span>
              <strong>{operational}</strong>
            </div>
          </div>

          <div className="equipment-stat-card">
            <div className="equipment-stat-icon maintenance-icon">
              <i className="bi bi-exclamation-triangle"></i>
            </div>

            <div>
              <span>Maintenance Due</span>
              <strong>{maintenanceDue}</strong>
            </div>
          </div>

        </div>

        {/* EQUIPMENT CARD */}
        <div className="equipment-card">

          <div className="equipment-card-header">
            <div>
              <h2>Equipment List</h2>
              <p>Current hotel equipment and maintenance status</p>
            </div>

            <span className="equipment-count">
              {filteredEquipment.length} Equipment
            </span>
          </div>

          {/* TOOLBAR */}
          <div className="equipment-toolbar">

            <div className="equipment-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search equipment..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All Categories">
                All Categories
              </option>
              <option value="HVAC">HVAC</option>
              <option value="Laundry">Laundry</option>
              <option value="Electrical">Electrical</option>
              <option value="Power">Power</option>
              <option value="Plumbing">Plumbing</option>
            </select>

          </div>

          {/* TABLE */}
          <div className="equipment-table-wrapper">

            <table className="equipment-table">

              <thead>
                <tr>
                  <th>Equipment ID</th>
                  <th>Equipment</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Condition</th>
                  <th>Last Service</th>
                  <th>Next Service</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredEquipment.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="equipment-empty"
                    >
                      <i className="bi bi-search"></i>
                      <span>No equipment found.</span>
                    </td>
                  </tr>
                ) : (
                  filteredEquipment.map((item) => (
                    <tr key={item.id}>

                      <td>
                        <strong>{item.id}</strong>
                      </td>

                      <td>
                        <div className="equipment-name">
                          <div className="equipment-item-icon">
                            <i className="bi bi-tools"></i>
                          </div>

                          <span>{item.name}</span>
                        </div>
                      </td>

                      <td>{item.category}</td>

                      <td>
                        <span className="equipment-location">
                          <i className="bi bi-geo-alt"></i>
                          {item.location}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`equipment-condition ${item.condition
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >
                          {item.condition}
                        </span>
                      </td>

                      <td>{item.lastService}</td>

                      <td>{item.nextService}</td>

                      <td>
                        <span
                          className={`equipment-status ${
                            item.status === 'Operational'
                              ? 'operational'
                              : 'maintenance-due'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="equipment-action-btn"
                          onClick={() => updateStatus(item.id)}
                        >
                          <i className="bi bi-arrow-repeat"></i>
                          Update
                        </button>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  )
}

export default Equipments