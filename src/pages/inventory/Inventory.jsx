import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import { useHotel } from '../../context/HotelContext'

import './Inventory.css'

function Inventory() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const [items] = useState([
    {
      id: 1,
      name: 'Bath Towels',
      category: 'Housekeeping',
      quantity: 120,
      unit: 'Pieces',
      minStock: 30,
      price: 450,
      supplier: 'Royal Supplies',
    },
    {
      id: 2,
      name: 'Shampoo',
      category: 'Toiletries',
      quantity: 25,
      unit: 'Bottles',
      minStock: 40,
      price: 180,
      supplier: 'Hotel Essentials',
    },
    {
      id: 3,
      name: 'Coffee Powder',
      category: 'Restaurant',
      quantity: 65,
      unit: 'Kg',
      minStock: 20,
      price: 620,
      supplier: 'Fresh Foods',
    },
    {
      id: 4,
      name: 'Bed Sheets',
      category: 'Housekeeping',
      quantity: 15,
      unit: 'Pieces',
      minStock: 25,
      price: 850,
      supplier: 'Royal Supplies',
    },
    {
      id: 5,
      name: 'Mineral Water',
      category: 'Restaurant',
      quantity: 0,
      unit: 'Bottles',
      minStock: 50,
      price: 30,
      supplier: 'Aqua Distributors',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')

  const getStatus = (quantity, minStock) => {
    if (quantity === 0) return 'Out of Stock'
    if (quantity <= minStock) return 'Low Stock'
    return 'In Stock'
  }

  const totalItems = items.length

  const lowStock = items.filter(
    (item) => item.quantity > 0 && item.quantity <= item.minStock
  ).length

  const outOfStock = items.filter(
    (item) => item.quantity === 0
  ).length

  const totalValue = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  )

  const filteredItems = items.filter((item) => {
    const search = searchTerm.toLowerCase().trim()

    const matchesSearch =
      item.name.toLowerCase().includes(search) ||
      item.supplier.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search)

    const matchesCategory =
      categoryFilter === 'All Categories' ||
      item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <MainLayout>
      <div className="inventory-page">

        <Breadcrumb items={['Inventory']} />

        {/* Header */}
        <div className="inventory-header">

          <PageHeader
            title="Inventory Management"
            subtitle={
              selectedHotel
                ? `Manage inventory and stock for ${selectedHotel.name}`
                : 'Manage hotel stock, supplies and inventory items'
            }
          />

          <button
            type="button"
            className="add-item-btn"
            onClick={() => navigate('/inventory/add-items')}
          >
            <i className="bi bi-plus-lg"></i>
            Add Item
          </button>

        </div>

        {/* Selected Hotel */}
        {selectedHotel && (
          <div className="inventory-hotel-bar">

            <div className="inventory-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="inventory-hotel-info">
              <span>SELECTED PROPERTY</span>

              <strong>{selectedHotel.name}</strong>

              <small>
                {selectedHotel.code} • {selectedHotel.category} •{' '}
                {selectedHotel.address.city}, {selectedHotel.address.state}
              </small>
            </div>

          </div>
        )}

        {/* Statistics */}
        <div className="inventory-stats">

          <div className="inventory-stat-card">

            <div className="stat-icon purple">
              <i className="bi bi-box-seam"></i>
            </div>

            <div>
              <span>Total Items</span>
              <h2>{totalItems}</h2>
            </div>

          </div>

          <div className="inventory-stat-card">

            <div className="stat-icon orange">
              <i className="bi bi-exclamation-triangle"></i>
            </div>

            <div>
              <span>Low Stock</span>
              <h2>{lowStock}</h2>
            </div>

          </div>

          <div className="inventory-stat-card">

            <div className="stat-icon red">
              <i className="bi bi-x-circle"></i>
            </div>

            <div>
              <span>Out of Stock</span>
              <h2>{outOfStock}</h2>
            </div>

          </div>

          <div className="inventory-stat-card">

            <div className="stat-icon green">
              <i className="bi bi-cash-stack"></i>
            </div>

            <div>
              <span>Stock Value</span>
              <h2>
                ₹{totalValue.toLocaleString('en-IN')}
              </h2>
            </div>

          </div>

        </div>

        {/* Inventory Card */}
        <div className="inventory-card">

          <div className="inventory-card-header">

            <div>
              <h2>Inventory Items</h2>
              <p>
                {selectedHotel
                  ? `Current stock overview for ${selectedHotel.name}`
                  : 'Current stock overview'}
              </p>
            </div>

            <div className="inventory-actions">

              <div className="inventory-search">

                <i className="bi bi-search"></i>

                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {searchTerm && (
                  <button
                    type="button"
                    className="inventory-clear-btn"
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}

              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option>All Categories</option>
                <option>Housekeeping</option>
                <option>Restaurant</option>
                <option>Toiletries</option>
                <option>Office Supplies</option>
                <option>Maintenance</option>
              </select>

            </div>

          </div>

          <div className="inventory-result">
            Showing {filteredItems.length} of {items.length} items
          </div>

          {/* Table */}
          <div className="inventory-table-wrapper">

            <table className="inventory-table">

              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Min. Stock</th>
                  <th>Supplier</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredItems.length > 0 ? (

                  filteredItems.map((item) => {

                    const status = getStatus(
                      item.quantity,
                      item.minStock
                    )

                    return (
                      <tr key={item.id}>

                        <td>
                          <div className="item-name">

                            <div className="item-icon">
                              <i className="bi bi-box"></i>
                            </div>

                            <strong>{item.name}</strong>

                          </div>
                        </td>

                        <td>{item.category}</td>

                        <td>
                          <strong>{item.quantity}</strong>
                        </td>

                        <td>{item.unit}</td>

                        <td>{item.minStock}</td>

                        <td>{item.supplier}</td>

                        <td>
                          ₹{item.price.toLocaleString('en-IN')}
                        </td>

                        <td>
                          <span
                            className={`stock-status ${status
                              .toLowerCase()
                              .replaceAll(' ', '-')}`}
                          >
                            {status}
                          </span>
                        </td>

                      </tr>
                    )
                  })

                ) : (

                  <tr>
                    <td
                      colSpan="8"
                      className="inventory-empty"
                    >
                      <i className="bi bi-box-seam"></i>

                      <strong>
                        No inventory items found
                      </strong>

                      <span>
                        Try changing your search or category filter.
                      </span>

                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Bottom Actions */}
        <div className="inventory-bottom-actions">

          <button
            type="button"
            onClick={() =>
              navigate('/inventory/stock-history')
            }
            className="secondary-inventory-btn"
          >
            <i className="bi bi-clock-history"></i>
            Stock History
          </button>

          <button
            type="button"
            onClick={() =>
              navigate('/inventory/suppliers')
            }
            className="secondary-inventory-btn"
          >
            <i className="bi bi-truck"></i>
            Suppliers
          </button>

        </div>

      </div>
    </MainLayout>
  )
}

export default Inventory