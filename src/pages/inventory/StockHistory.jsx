import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './Suppliers.css'

function Suppliers() {
  const navigate = useNavigate()

  const [suppliers] = useState([
    {
      id: 1,
      name: 'Royal Supplies',
      contact: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'royalsupplies@gmail.com',
      items: 12,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Hotel Essentials',
      contact: 'Amit Sharma',
      phone: '+91 98765 12345',
      email: 'hotelessentials@gmail.com',
      items: 8,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Fresh Foods',
      contact: 'Neeraj Singh',
      phone: '+91 91234 56789',
      email: 'freshfoods@gmail.com',
      items: 15,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Aqua Distributors',
      contact: 'Vikas Verma',
      phone: '+91 99887 66554',
      email: 'aquadistributors@gmail.com',
      items: 5,
      status: 'Inactive'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredSuppliers = suppliers.filter((supplier) => {
    const search = searchTerm.toLowerCase()

    return (
      supplier.name.toLowerCase().includes(search) ||
      supplier.contact.toLowerCase().includes(search) ||
      supplier.phone.toLowerCase().includes(search) ||
      supplier.email.toLowerCase().includes(search)
    )
  })

  const activeSuppliers = suppliers.filter(
    (supplier) => supplier.status === 'Active'
  ).length

  const totalItems = suppliers.reduce(
    (total, supplier) => total + supplier.items,
    0
  )

  return (
    <MainLayout>

      <div className="suppliers-page">

        <Breadcrumb
          items={['Inventory', 'Suppliers']}
        />

        <div className="suppliers-header">

          <PageHeader
            title="Suppliers"
            subtitle="Manage inventory suppliers and vendors"
          />

          <button
            type="button"
            onClick={() => navigate('/inventory')}
            className="back-suppliers-btn"
          >
            <i className="bi bi-arrow-left"></i>
            Back to Inventory
          </button>

        </div>

        {/* STATS */}

        <div className="supplier-stats">

          <div className="supplier-stat">

            <i className="bi bi-truck"></i>

            <div>
              <span>Total Suppliers</span>
              <strong>{suppliers.length}</strong>
            </div>

          </div>

          <div className="supplier-stat">

            <i className="bi bi-check-circle"></i>

            <div>
              <span>Active Suppliers</span>
              <strong>{activeSuppliers}</strong>
            </div>

          </div>

          <div className="supplier-stat">

            <i className="bi bi-box-seam"></i>

            <div>
              <span>Items Supplied</span>
              <strong>{totalItems}</strong>
            </div>

          </div>

        </div>

        {/* SUPPLIERS CARD */}

        <div className="suppliers-card">

          <div className="suppliers-card-header">

            <div>
              <h2>Supplier List</h2>
              <p>All registered inventory suppliers</p>
            </div>

            <div className="supplier-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search suppliers..."
              />

            </div>

          </div>

          <div className="suppliers-table-wrapper">

            <table className="suppliers-table">

              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Contact Person</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredSuppliers.length === 0 ? (

                  <tr>
                    <td
                      colSpan="7"
                      className="supplier-empty"
                    >
                      <i className="bi bi-truck"></i>
                      <strong>No suppliers found</strong>
                      <span>
                        Try a different search term.
                      </span>
                    </td>
                  </tr>

                ) : (

                  filteredSuppliers.map((supplier) => (

                    <tr key={supplier.id}>

                      <td>

                        <div className="supplier-name">

                          <div className="supplier-icon">
                            <i className="bi bi-building"></i>
                          </div>

                          <strong>
                            {supplier.name}
                          </strong>

                        </div>

                      </td>

                      <td>{supplier.contact}</td>

                      <td>{supplier.phone}</td>

                      <td>{supplier.email}</td>

                      <td>
                        <strong>{supplier.items}</strong>
                      </td>

                      <td>

                        <span
                          className={`supplier-status ${
                            supplier.status.toLowerCase()
                          }`}
                        >
                          {supplier.status}
                        </span>

                      </td>

                      <td>

                        <button
                          type="button"
                          className="view-supplier-btn"
                          onClick={() =>
                            alert(
                              `Supplier: ${supplier.name}`
                            )
                          }
                          title="View Supplier"
                        >
                          <i className="bi bi-eye"></i>
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

export default Suppliers