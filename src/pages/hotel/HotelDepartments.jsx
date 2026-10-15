import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './HotelDepartments.css'

function HotelDepartments() {
  const navigate = useNavigate()

  const [departments, setDepartments] = useState([
    {
      id: 1,
      code: 'DEP-001',
      name: 'Management',
      head: 'Rajesh Kumar',
      employees: 4,
      description: 'Overall hotel administration and management',
      status: 'Active'
    },
    {
      id: 2,
      code: 'DEP-002',
      name: 'Front Office',
      head: 'Anjali Sharma',
      employees: 8,
      description: 'Reception, reservations and guest services',
      status: 'Active'
    },
    {
      id: 3,
      code: 'DEP-003',
      name: 'Housekeeping',
      head: 'Priya Singh',
      employees: 14,
      description: 'Room cleaning and housekeeping operations',
      status: 'Active'
    },
    {
      id: 4,
      code: 'DEP-004',
      name: 'Restaurant',
      head: 'Vikash Yadav',
      employees: 10,
      description: 'Restaurant, food and beverage operations',
      status: 'Active'
    },
    {
      id: 5,
      code: 'DEP-005',
      name: 'Finance',
      head: 'Neha Kapoor',
      employees: 4,
      description: 'Accounts, billing and financial management',
      status: 'Active'
    },
    {
      id: 6,
      code: 'DEP-006',
      name: 'Maintenance',
      head: 'Aman Gupta',
      employees: 5,
      description: 'Hotel equipment and maintenance operations',
      status: 'Active'
    },
    {
      id: 7,
      code: 'DEP-007',
      name: 'Inventory',
      head: 'Rahul Verma',
      employees: 3,
      description: 'Stock, supplies and inventory management',
      status: 'Inactive'
    }
  ])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    head: '',
    employees: '',
    description: ''
  })

  const filteredDepartments = departments.filter((department) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      department.name.toLowerCase().includes(searchText) ||
      department.code.toLowerCase().includes(searchText) ||
      department.head.toLowerCase().includes(searchText) ||
      department.description.toLowerCase().includes(searchText)

    const matchesStatus =
      statusFilter === 'All' ||
      department.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalDepartments = departments.length

  const activeDepartments = departments.filter(
    (department) => department.status === 'Active'
  ).length

  const inactiveDepartments = departments.filter(
    (department) => department.status === 'Inactive'
  ).length

  const totalEmployees = departments.reduce(
    (total, department) => total + Number(department.employees),
    0
  )

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  const handleAddDepartment = (e) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.head ||
      !formData.employees
    ) {
      alert('Please fill all required fields.')
      return
    }

    const newDepartment = {
      id: Date.now(),
      code: `DEP-${String(departments.length + 1).padStart(3, '0')}`,
      name: formData.name,
      head: formData.head,
      employees: Number(formData.employees),
      description:
        formData.description || 'Hotel department',
      status: 'Active'
    }

    setDepartments((previous) => [
      ...previous,
      newDepartment
    ])

    setFormData({
      name: '',
      head: '',
      employees: '',
      description: ''
    })

    setShowForm(false)
  }

  const toggleStatus = (id) => {
    setDepartments((previous) =>
      previous.map((department) =>
        department.id === id
          ? {
              ...department,
              status:
                department.status === 'Active'
                  ? 'Inactive'
                  : 'Active'
            }
          : department
      )
    )
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this department?'
    )

    if (!confirmed) return

    setDepartments((previous) =>
      previous.filter((department) => department.id !== id)
    )
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('All')
  }

  return (
    <MainLayout>
      <div className="hotel-departments-page">

        <Breadcrumb
          items={['Hotel', 'Departments']}
        />

        {/* Header */}
        <div className="hotel-departments-header">

          <PageHeader
            title="Hotel Departments"
            subtitle="Manage departments and organizational structure of this hotel"
          />

          <div className="hotel-departments-header-actions">

            <button
              type="button"
              className="hotel-departments-back-btn"
              onClick={() => navigate('/hotel/settings')}
            >
              <i className="bi bi-arrow-left"></i>
              Hotel Settings
            </button>

            <button
              type="button"
              className="hotel-departments-add-btn"
              onClick={() => setShowForm(!showForm)}
            >
              <i className="bi bi-plus-lg"></i>
              Add Department
            </button>

          </div>

        </div>

        {/* Stats */}
        <div className="hotel-departments-stats">

          <div className="hotel-departments-stat-card">
            <div className="hotel-departments-stat-icon">
              <i className="bi bi-diagram-3"></i>
            </div>

            <div>
              <span>Total Departments</span>
              <strong>{totalDepartments}</strong>
            </div>
          </div>

          <div className="hotel-departments-stat-card">
            <div className="hotel-departments-stat-icon active-icon">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Active Departments</span>
              <strong>{activeDepartments}</strong>
            </div>
          </div>

          <div className="hotel-departments-stat-card">
            <div className="hotel-departments-stat-icon inactive-icon">
              <i className="bi bi-dash-circle"></i>
            </div>

            <div>
              <span>Inactive Departments</span>
              <strong>{inactiveDepartments}</strong>
            </div>
          </div>

          <div className="hotel-departments-stat-card">
            <div className="hotel-departments-stat-icon staff-icon">
              <i className="bi bi-people"></i>
            </div>

            <div>
              <span>Total Employees</span>
              <strong>{totalEmployees}</strong>
            </div>
          </div>

        </div>

        {/* Add Department Form */}
        {showForm && (
          <div className="hotel-departments-form-card">

            <div className="hotel-departments-form-header">

              <div>
                <h2>Add New Department</h2>
                <p>
                  Create a department for your hotel
                </p>
              </div>

              <button
                type="button"
                className="hotel-departments-close-btn"
                onClick={() => setShowForm(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form onSubmit={handleAddDepartment}>

              <div className="hotel-departments-form-grid">

                <div className="hotel-departments-field">
                  <label>
                    Department Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Front Office"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="hotel-departments-field">
                  <label>
                    Department Head <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="head"
                    placeholder="Enter department head"
                    value={formData.head}
                    onChange={handleChange}
                  />
                </div>

                <div className="hotel-departments-field">
                  <label>
                    Number of Employees <span>*</span>
                  </label>

                  <input
                    type="number"
                    name="employees"
                    min="1"
                    placeholder="Enter employee count"
                    value={formData.employees}
                    onChange={handleChange}
                  />
                </div>

                <div className="hotel-departments-field full-width">
                  <label>Description</label>

                  <textarea
                    name="description"
                    rows="3"
                    placeholder="Enter department description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

              </div>

              <div className="hotel-departments-form-actions">

                <button
                  type="button"
                  className="hotel-departments-form-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="hotel-departments-form-save"
                >
                  <i className="bi bi-plus-lg"></i>
                  Create Department
                </button>

              </div>

            </form>

          </div>
        )}

        {/* Departments Card */}
        <div className="hotel-departments-card">

          <div className="hotel-departments-card-header">

            <div>
              <h2>Departments</h2>
              <p>
                Manage departments and their assigned employees
              </p>
            </div>

            <span className="hotel-departments-count">
              {filteredDepartments.length} Departments
            </span>

          </div>

          {/* Toolbar */}
          <div className="hotel-departments-toolbar">

            <div className="hotel-departments-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search departments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <div className="hotel-departments-filter">

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>

            <button
              type="button"
              className="hotel-departments-clear-btn"
              onClick={clearFilters}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Clear
            </button>

          </div>

          {/* Table */}
          <div className="hotel-departments-table-wrapper">

            <table className="hotel-departments-table">

              <thead>
                <tr>
                  <th>Department</th>
                  <th>Department Head</th>
                  <th>Employees</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredDepartments.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="hotel-departments-empty"
                    >
                      <i className="bi bi-diagram-3"></i>
                      <strong>No departments found</strong>
                      <span>
                        Try changing your search or filters.
                      </span>
                    </td>
                  </tr>

                ) : (

                  filteredDepartments.map((department) => (

                    <tr key={department.id}>

                      <td>

                        <div className="hotel-department-name">

                          <div className="hotel-department-icon">
                            <i className="bi bi-building"></i>
                          </div>

                          <div>
                            <strong>
                              {department.name}
                            </strong>

                            <span>
                              {department.code}
                            </span>
                          </div>

                        </div>

                      </td>

                      <td>

                        <div className="hotel-department-head">

                          <div className="hotel-department-head-avatar">
                            {department.head
                              .split(' ')
                              .map((word) => word[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <span>
                            {department.head}
                          </span>

                        </div>

                      </td>

                      <td>

                        <span className="hotel-department-employees">
                          <i className="bi bi-people"></i>
                          {department.employees}
                        </span>

                      </td>

                      <td>
                        <span className="hotel-department-description">
                          {department.description}
                        </span>
                      </td>

                      <td>

                        <span
                          className={`hotel-department-status ${
                            department.status.toLowerCase()
                          }`}
                        >
                          <i className="bi bi-circle-fill"></i>
                          {department.status}
                        </span>

                      </td>

                      <td>

                        <div className="hotel-department-actions">

                          <button
                            type="button"
                            className="hotel-department-action-btn"
                            title={
                              department.status === 'Active'
                                ? 'Deactivate Department'
                                : 'Activate Department'
                            }
                            onClick={() =>
                              toggleStatus(department.id)
                            }
                          >
                            <i
                              className={
                                department.status === 'Active'
                                  ? 'bi bi-toggle-on'
                                  : 'bi bi-toggle-off'
                              }
                            ></i>
                          </button>

                          <button
                            type="button"
                            className="hotel-department-action-btn delete"
                            title="Delete Department"
                            onClick={() =>
                              handleDelete(department.id)
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </button>

                        </div>

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

export default HotelDepartments