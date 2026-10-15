import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import { useHotel } from '../../context/HotelContext'

import './AddItems.css'

function AddItems() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    quantity: '',
    unit: '',
    minStock: '',
    price: '',
    supplier: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    alert(
      selectedHotel
        ? `Inventory item added successfully to ${selectedHotel.name}!`
        : 'Inventory item added successfully!'
    )

    navigate('/inventory')
  }

  return (
    <MainLayout>

      <div className="add-items-page">

        <Breadcrumb
          items={['Inventory', 'Add Item']}
        />

        {/* Header */}
        <div className="add-items-header">

          <PageHeader
            title="Add Inventory Item"
            subtitle={
              selectedHotel
                ? `Add a new inventory item for ${selectedHotel.name}`
                : 'Add a new item to hotel inventory'
            }
          />

          <button
            type="button"
            className="back-inventory-btn"
            onClick={() => navigate('/inventory')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Inventory
          </button>

        </div>

        {/* Selected Property */}
        {selectedHotel && (
          <div className="add-items-hotel-bar">

            <div className="add-items-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div className="add-items-hotel-info">

              <span>ADDING INVENTORY FOR</span>

              <strong>{selectedHotel.name}</strong>

              <small>
                {selectedHotel.code} • {selectedHotel.category} •{' '}
                {selectedHotel.address.city}, {selectedHotel.address.state}
              </small>

            </div>

          </div>
        )}

        <div className="add-items-card">

          <form onSubmit={handleSubmit}>

            {/* ITEM INFORMATION */}

            <div className="form-section">

              <h2>Item Information</h2>

              <div className="form-grid">

                <div className="form-group">

                  <label>Item Name *</label>

                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="Enter item name"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Category *</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select category
                    </option>

                    <option value="Housekeeping">
                      Housekeeping
                    </option>

                    <option value="Restaurant">
                      Restaurant
                    </option>

                    <option value="Toiletries">
                      Toiletries
                    </option>

                    <option value="Office Supplies">
                      Office Supplies
                    </option>

                    <option value="Maintenance">
                      Maintenance
                    </option>
                  </select>

                </div>

                <div className="form-group">

                  <label>Quantity *</label>

                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    min="0"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Unit *</label>

                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select unit
                    </option>

                    <option value="Pieces">
                      Pieces
                    </option>

                    <option value="Bottles">
                      Bottles
                    </option>

                    <option value="Kg">
                      Kg
                    </option>

                    <option value="Litres">
                      Litres
                    </option>

                    <option value="Boxes">
                      Boxes
                    </option>

                    <option value="Packets">
                      Packets
                    </option>
                  </select>

                </div>

                <div className="form-group">

                  <label>Minimum Stock *</label>

                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleChange}
                    placeholder="Minimum stock level"
                    min="0"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Price per Unit *</label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="₹ Enter price"
                    min="0"
                    step="0.01"
                    required
                  />

                </div>

              </div>

            </div>

            {/* SUPPLIER INFORMATION */}

            <div className="form-section">

              <h2>Supplier Information</h2>

              <div className="form-grid">

                <div className="form-group">

                  <label>Supplier *</label>

                  <select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select supplier
                    </option>

                    <option value="Royal Supplies">
                      Royal Supplies
                    </option>

                    <option value="Hotel Essentials">
                      Hotel Essentials
                    </option>

                    <option value="Fresh Foods">
                      Fresh Foods
                    </option>

                    <option value="Aqua Distributors">
                      Aqua Distributors
                    </option>
                  </select>

                </div>

                <div className="form-group full-width">

                  <label>Description</label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter item description..."
                    rows="4"
                  ></textarea>

                </div>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="form-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate('/inventory')}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-item-btn"
              >
                <i className="bi bi-check-lg"></i>
                Save Item
              </button>

            </div>

          </form>

        </div>

      </div>

    </MainLayout>
  )
}

export default AddItems