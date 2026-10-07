import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './MenuManagement.css'

function MenuManagement() {
  const navigate = useNavigate()

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Paneer Tikka',
      category: 'Starters',
      price: 320,
      type: 'Veg',
      status: 'Available',
    },
    {
      id: 2,
      name: 'Chicken Biryani',
      category: 'Main Course',
      price: 450,
      type: 'Non-Veg',
      status: 'Available',
    },
    {
      id: 3,
      name: 'Butter Naan',
      category: 'Breads',
      price: 80,
      type: 'Veg',
      status: 'Available',
    },
    {
      id: 4,
      name: 'Dal Makhani',
      category: 'Main Course',
      price: 280,
      type: 'Veg',
      status: 'Available',
    },
    {
      id: 5,
      name: 'Chicken Tikka',
      category: 'Starters',
      price: 390,
      type: 'Non-Veg',
      status: 'Unavailable',
    },
    {
      id: 6,
      name: 'Gulab Jamun',
      category: 'Desserts',
      price: 150,
      type: 'Veg',
      status: 'Available',
    },
  ])

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('All')

  const categories = [
    'All',
    'Starters',
    'Main Course',
    'Breads',
    'Desserts',
  ]

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || item.category === category

    const matchesType =
      type === 'All' || item.type === type

    return matchesSearch && matchesCategory && matchesType
  })

  const toggleStatus = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === 'Available'
                  ? 'Unavailable'
                  : 'Available',
            }
          : item
      )
    )
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setType('All')
  }

  const availableItems = menuItems.filter(
    (item) => item.status === 'Available'
  ).length

  const unavailableItems = menuItems.filter(
    (item) => item.status === 'Unavailable'
  ).length

  return (
    <MainLayout>
      <Breadcrumb items={['Restaurant', 'Menu Management']} />

      <PageHeader
        title="Menu Management"
        subtitle="Manage restaurant menu items, categories and availability"
      />

      <div className="menu-management-page">

        {/* Stats */}
        <div className="menu-stats">
          <div className="menu-stat-card">
            <div className="menu-stat-icon">
              <i className="bi bi-menu-button-wide"></i>
            </div>
            <div>
              <span>Total Items</span>
              <h3>{menuItems.length}</h3>
            </div>
          </div>

          <div className="menu-stat-card">
            <div className="menu-stat-icon available">
              <i className="bi bi-check-circle"></i>
            </div>
            <div>
              <span>Available</span>
              <h3>{availableItems}</h3>
            </div>
          </div>

          <div className="menu-stat-card">
            <div className="menu-stat-icon unavailable">
              <i className="bi bi-x-circle"></i>
            </div>
            <div>
              <span>Unavailable</span>
              <h3>{unavailableItems}</h3>
            </div>
          </div>

          <div className="menu-stat-card">
            <div className="menu-stat-icon category">
              <i className="bi bi-grid"></i>
            </div>
            <div>
              <span>Categories</span>
              <h3>{categories.length - 1}</h3>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="menu-toolbar">
          <div className="menu-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search menu item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="menu-filter"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === 'All' ? 'All Categories' : item}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="menu-filter"
          >
            <option value="All">All Types</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>

          <button
            type="button"
            className="menu-clear-btn"
            onClick={clearFilters}
          >
            <i className="bi bi-arrow-counterclockwise"></i>
            Clear
          </button>

          <button
            type="button"
            className="menu-add-btn"
            onClick={() => navigate('/restaurant/new-order')}
          >
            <i className="bi bi-plus-lg"></i>
            New Order
          </button>
        </div>

        {/* Table */}
        <div className="menu-table-card">
          <div className="menu-table-header">
            <div>
              <h2>Restaurant Menu</h2>
              <p>
                Showing {filteredItems.length} of {menuItems.length} menu items
              </p>
            </div>
          </div>

          <div className="menu-table-wrapper">
            <table className="menu-table">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>CATEGORY</th>
                  <th>TYPE</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="menu-item-name">
                          <span className={`food-dot ${item.type.toLowerCase()}`}></span>
                          {item.name}
                        </div>
                      </td>

                      <td>
                        <span className="menu-category">
                          {item.category}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`menu-type ${item.type.toLowerCase()}`}
                        >
                          {item.type}
                        </span>
                      </td>

                      <td>
                        <strong className="menu-price">
                          ₹{item.price.toLocaleString('en-IN')}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`menu-status ${
                            item.status === 'Available'
                              ? 'available'
                              : 'unavailable'
                          }`}
                        >
                          <span></span>
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className={`menu-status-btn ${
                            item.status === 'Available'
                              ? 'disable'
                              : 'enable'
                          }`}
                          onClick={() => toggleStatus(item.id)}
                        >
                          <i
                            className={`bi ${
                              item.status === 'Available'
                                ? 'bi-toggle-on'
                                : 'bi-toggle-off'
                            }`}
                          ></i>

                          {item.status === 'Available'
                            ? 'Disable'
                            : 'Enable'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <div className="menu-empty">
                        <i className="bi bi-search"></i>
                        <h3>No menu items found</h3>
                        <p>Try changing your search or filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </MainLayout>
  )
}

export default MenuManagement