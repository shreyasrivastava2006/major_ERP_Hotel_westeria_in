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
      type: 'Veg',
      price: 320,
      status: 'Available',
    },
    {
      id: 2,
      name: 'Chicken Tikka',
      category: 'Starters',
      type: 'Non-Veg',
      price: 390,
      status: 'Available',
    },
    {
      id: 3,
      name: 'Chicken Biryani',
      category: 'Main Course',
      type: 'Non-Veg',
      price: 450,
      status: 'Available',
    },
    {
      id: 4,
      name: 'Dal Makhani',
      category: 'Main Course',
      type: 'Veg',
      price: 280,
      status: 'Available',
    },
    {
      id: 5,
      name: 'Butter Naan',
      category: 'Breads',
      type: 'Veg',
      price: 80,
      status: 'Available',
    },
    {
      id: 6,
      name: 'Garlic Naan',
      category: 'Breads',
      type: 'Veg',
      price: 100,
      status: 'Available',
    },
    {
      id: 7,
      name: 'Gulab Jamun',
      category: 'Desserts',
      type: 'Veg',
      price: 150,
      status: 'Available',
    },
    {
      id: 8,
      name: 'Chocolate Brownie',
      category: 'Desserts',
      type: 'Veg',
      price: 220,
      status: 'Unavailable',
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
    const searchText = search.toLowerCase()

    const matchesSearch =
      item.name.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText)

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

  const categoryCount = new Set(
    menuItems.map((item) => item.category)
  ).size

  return (
    <MainLayout>

      <Breadcrumb items={['Restaurant', 'Menu Management']} />

      <PageHeader
        title="Menu Management"
        subtitle="Manage restaurant food items, categories and availability"
      />

      <div className="menu-management-page">

        {/* Stats */}

        <div className="menu-management-stats">

          <div className="menu-management-stat-card">
            <div className="menu-management-stat-icon">
              <i className="bi bi-menu-button-wide"></i>
            </div>

            <div>
              <span>Total Items</span>
              <h3>{menuItems.length}</h3>
            </div>
          </div>

          <div className="menu-management-stat-card">
            <div className="menu-management-stat-icon available">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Available</span>
              <h3>{availableItems}</h3>
            </div>
          </div>

          <div className="menu-management-stat-card">
            <div className="menu-management-stat-icon unavailable">
              <i className="bi bi-x-circle"></i>
            </div>

            <div>
              <span>Unavailable</span>
              <h3>{unavailableItems}</h3>
            </div>
          </div>

          <div className="menu-management-stat-card">
            <div className="menu-management-stat-icon categories">
              <i className="bi bi-grid"></i>
            </div>

            <div>
              <span>Categories</span>
              <h3>{categoryCount}</h3>
            </div>
          </div>

        </div>

        {/* Toolbar */}

        <div className="menu-management-toolbar">

          <div className="menu-management-search">
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
          >
            <option value="All">All Types</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>

          <button
            type="button"
            className="menu-management-clear"
            onClick={clearFilters}
          >
            <i className="bi bi-arrow-counterclockwise"></i>
            Clear
          </button>

          <button
            type="button"
            className="menu-management-add"
            onClick={() => navigate('/restaurant/menu')}
          >
            <i className="bi bi-plus-lg"></i>
            Add / View Menu
          </button>

        </div>

        {/* Table */}

        <div className="menu-management-table-card">

          <div className="menu-management-table-header">

            <div>
              <h2>Menu Items</h2>
              <p>
                Showing {filteredItems.length} of {menuItems.length} items
              </p>
            </div>

            <span className="menu-management-result">
              {filteredItems.length} Results
            </span>

          </div>

          <div className="menu-management-table-wrapper">

            <table className="menu-management-table">

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
                        <div className="menu-management-item">

                          <span
                            className={`food-dot ${
                              item.type === 'Veg'
                                ? 'veg'
                                : 'non-veg'
                            }`}
                          ></span>

                          <div>
                            <strong>{item.name}</strong>
                            <small>
                              Item ID: #{item.id}
                            </small>
                          </div>

                        </div>
                      </td>

                      <td>
                        <span className="menu-management-category">
                          {item.category}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`menu-management-type ${
                            item.type === 'Veg'
                              ? 'veg'
                              : 'non-veg'
                          }`}
                        >
                          <i
                            className={`bi ${
                              item.type === 'Veg'
                                ? 'bi-leaf'
                                : 'bi-egg-fried'
                            }`}
                          ></i>

                          {item.type}
                        </span>
                      </td>

                      <td>
                        <strong className="menu-management-price">
                          ₹{item.price.toLocaleString('en-IN')}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`menu-management-status ${
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
                          className="menu-management-toggle"
                          onClick={() => toggleStatus(item.id)}
                          title="Change availability"
                        >
                          <i
                            className={`bi ${
                              item.status === 'Available'
                                ? 'bi-toggle-on'
                                : 'bi-toggle-off'
                            }`}
                          ></i>
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">

                      <div className="menu-management-empty">

                        <i className="bi bi-search"></i>

                        <h3>No Menu Items Found</h3>

                        <p>
                          Try changing your search or filters.
                        </p>

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