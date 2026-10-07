import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './Services.css'

function Services() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Airport Transfer',
      category: 'Transportation',
      price: 1200,
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Laundry Service',
      category: 'Housekeeping',
      price: 350,
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Spa & Massage',
      category: 'Wellness',
      price: 1800,
      availability: 'Available'
    },
    {
      id: 4,
      name: 'Room Decoration',
      category: 'Special Request',
      price: 2500,
      availability: 'Unavailable'
    }
  ])

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    category: 'Transportation',
    price: '',
    availability: 'Available'
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const addService = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.price) {
      return
    }

    const newService = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      availability: formData.availability
    }

    setServices((prev) => [...prev, newService])

    setFormData({
      name: '',
      category: 'Transportation',
      price: '',
      availability: 'Available'
    })

    setShowForm(false)
  }

  const deleteService = (id) => {
    setServices((prev) =>
      prev.filter((service) => service.id !== id)
    )
  }

  const toggleAvailability = (id) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? {
              ...service,
              availability:
                service.availability === 'Available'
                  ? 'Unavailable'
                  : 'Available'
            }
          : service
      )
    )
  }

  const available = services.filter(
    (service) => service.availability === 'Available'
  ).length

  const unavailable = services.filter(
    (service) => service.availability === 'Unavailable'
  ).length

  return (
    <MainLayout>
      <div className="services-page">

        <Breadcrumb items={['Services']} />

        <div className="services-header">
          <PageHeader
            title="Hotel Services"
            subtitle="Manage additional services offered to hotel guests"
          />

          <button
            type="button"
            className="add-service-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <i className="bi bi-plus-lg"></i>
            {showForm ? 'Close Form' : 'Add Service'}
          </button>
        </div>

        {/* STATS */}

        <div className="services-stats">

          <div className="service-stat-card">
            <div className="service-stat-icon">
              <i className="bi bi-grid-fill"></i>
            </div>

            <div>
              <span>Total Services</span>
              <h2>{services.length}</h2>
            </div>
          </div>

          <div className="service-stat-card">
            <div className="service-stat-icon available">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div>
              <span>Available</span>
              <h2>{available}</h2>
            </div>
          </div>

          <div className="service-stat-card">
            <div className="service-stat-icon unavailable">
              <i className="bi bi-x-circle-fill"></i>
            </div>

            <div>
              <span>Unavailable</span>
              <h2>{unavailable}</h2>
            </div>
          </div>

        </div>

        {/* ADD SERVICE FORM */}

        {showForm && (
          <div className="service-form-card">

            <div className="service-form-header">

              <div>
                <h2>Add New Service</h2>
                <p>Enter service details</p>
              </div>

              <button
                type="button"
                className="close-service-btn"
                onClick={() => setShowForm(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form onSubmit={addService}>

              <div className="service-form-grid">

                <div className="service-input-group">
                  <label>Service Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter service name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="service-input-group">
                  <label>Category</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Transportation">
                      Transportation
                    </option>
                    <option value="Housekeeping">
                      Housekeeping
                    </option>
                    <option value="Wellness">
                      Wellness
                    </option>
                    <option value="Special Request">
                      Special Request
                    </option>
                    <option value="Business">
                      Business
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="service-input-group">
                  <label>Price (₹)</label>

                  <input
                    type="number"
                    name="price"
                    min="0"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="service-input-group">
                  <label>Availability</label>

                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">
                      Unavailable
                    </option>
                  </select>
                </div>

              </div>

              <div className="service-form-actions">

                <button
                  type="button"
                  className="cancel-service-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-service-btn"
                >
                  <i className="bi bi-check-lg"></i>
                  Save Service
                </button>

              </div>

            </form>
          </div>
        )}

        {/* SERVICES TABLE */}

        <div className="services-table-card">

          <div className="services-table-header">
            <div>
              <h2>Available Hotel Services</h2>
              <p>Manage all additional hotel services</p>
            </div>
          </div>

          <div className="services-table-wrapper">

            <table className="services-table">

              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service.id}>

                      <td>
                        <div className="service-name">
                          <div className="service-icon">
                            <i className="bi bi-stars"></i>
                          </div>

                          <strong>{service.name}</strong>
                        </div>
                      </td>

                      <td>
                        <span className="service-category">
                          {service.category}
                        </span>
                      </td>

                      <td>
                        <strong className="service-price">
                          ₹{service.price.toLocaleString('en-IN')}
                        </strong>
                      </td>

                      <td>
                        <button
                          type="button"
                          className={`service-availability ${
                            service.availability === 'Available'
                              ? 'available'
                              : 'unavailable'
                          }`}
                          onClick={() =>
                            toggleAvailability(service.id)
                          }
                        >
                          <i
                            className={
                              service.availability === 'Available'
                                ? 'bi bi-check-circle-fill'
                                : 'bi bi-x-circle-fill'
                            }
                          ></i>

                          {service.availability}
                        </button>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="delete-service-btn"
                          onClick={() =>
                            deleteService(service.id)
                          }
                          title="Delete Service"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="services-empty"
                    >
                      <i className="bi bi-inbox"></i>
                      <span>No services available</span>
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

export default Services