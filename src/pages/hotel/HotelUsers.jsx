import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './HotelUsers.css'

function HotelUsers() {
  const navigate = useNavigate()

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'admin@grandpalace.com',
      phone: '+91 98765 43210',
      role: 'Hotel Admin',
      department: 'Management',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Anjali Sharma',
      email: 'anjali@grandpalace.com',
      phone: '+91 98765 11111',
      role: 'Manager',
      department: 'Management',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Rahul Verma',
      email: 'rahul@grandpalace.com',
      phone: '+91 98765 22222',
      role: 'Receptionist',
      department: 'Front Office',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Priya Singh',
      email: 'priya@grandpalace.com',
      phone: '+91 98765 33333',
      role: 'Housekeeping',
      department: 'Housekeeping',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Aman Gupta',
      email: 'aman@grandpalace.com',
      phone: '+91 98765 44444',
      role: 'Restaurant Staff',
      department: 'Restaurant',
      status: 'Inactive'
    },
    {
      id: 6,
      name: 'Neha Kapoor',
      email: 'neha@grandpalace.com',
      phone: '+91 98765 55555',
      role: 'Accountant',
      department: 'Finance',
      status: 'Active'
    }
  ])

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Receptionist',
    department: 'Front Office'
  })

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.phone.toLowerCase().includes(searchText) ||
      user.department.toLowerCase().includes(searchText)

    const matchesRole =
      roleFilter === 'All' || user.role === roleFilter

    const matchesStatus =
      statusFilter === 'All' || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const totalUsers = users.length
  const activeUsers = users.filter(
    (user) => user.status === 'Active'
  ).length
  const inactiveUsers = users.filter(
    (user) => user.status === 'Inactive'
  ).length
  const adminUsers = users.filter(
    (user) => user.role === 'Hotel Admin'
  ).length

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  const handleAddUser = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all required fields.')
      return
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      department: formData.department,
      status: 'Active'
    }

    setUsers((previous) => [...previous, newUser])

    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Receptionist',
      department: 'Front Office'
    })

    setShowForm(false)
  }

  const toggleStatus = (id) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === 'Active'
                  ? 'Inactive'
                  : 'Active'
            }
          : user
      )
    )
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    )

    if (!confirmed) return

    setUsers((previous) =>
      previous.filter((user) => user.id !== id)
    )
  }

  const clearFilters = () => {
    setSearch('')
    setRoleFilter('All')
    setStatusFilter('All')
  }

  return (
    <MainLayout>
      <div className="hotel-users-page">

        <Breadcrumb
          items={['Hotel', 'Hotel Users']}
        />

        {/* Header */}
        <div className="hotel-users-header">

          <PageHeader
            title="Hotel Users"
            subtitle="Manage users and staff access for this hotel"
          />

          <div className="hotel-users-header-actions">

            <button
              type="button"
              className="hotel-users-back-btn"
              onClick={() => navigate('/hotel/settings')}
            >
              <i className="bi bi-arrow-left"></i>
              Hotel Settings
            </button>

            <button
              type="button"
              className="hotel-users-add-btn"
              onClick={() => setShowForm(!showForm)}
            >
              <i className="bi bi-person-plus"></i>
              Add User
            </button>

          </div>

        </div>

        {/* Stats */}
        <div className="hotel-users-stats">

          <div className="hotel-users-stat-card">
            <div className="hotel-users-stat-icon">
              <i className="bi bi-people"></i>
            </div>
            <div>
              <span>Total Users</span>
              <strong>{totalUsers}</strong>
            </div>
          </div>

          <div className="hotel-users-stat-card">
            <div className="hotel-users-stat-icon active-icon">
              <i className="bi bi-person-check"></i>
            </div>
            <div>
              <span>Active Users</span>
              <strong>{activeUsers}</strong>
            </div>
          </div>

          <div className="hotel-users-stat-card">
            <div className="hotel-users-stat-icon inactive-icon">
              <i className="bi bi-person-x"></i>
            </div>
            <div>
              <span>Inactive Users</span>
              <strong>{inactiveUsers}</strong>
            </div>
          </div>

          <div className="hotel-users-stat-card">
            <div className="hotel-users-stat-icon admin-icon">
              <i className="bi bi-shield-check"></i>
            </div>
            <div>
              <span>Hotel Admins</span>
              <strong>{adminUsers}</strong>
            </div>
          </div>

        </div>

        {/* Add User Form */}
        {showForm && (
          <div className="hotel-users-form-card">

            <div className="hotel-users-form-header">
              <div>
                <h2>Add New User</h2>
                <p>Create a new user account for this hotel</p>
              </div>

              <button
                type="button"
                className="hotel-users-close-btn"
                onClick={() => setShowForm(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleAddUser}>

              <div className="hotel-users-form-grid">

                <div className="hotel-users-field">
                  <label>
                    Full Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="hotel-users-field">
                  <label>
                    Email Address <span>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="hotel-users-field">
                  <label>
                    Phone Number <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="hotel-users-field">
                  <label>Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option>Hotel Admin</option>
                    <option>Manager</option>
                    <option>Receptionist</option>
                    <option>Housekeeping</option>
                    <option>Restaurant Staff</option>
                    <option>Accountant</option>
                    <option>Inventory Manager</option>
                    <option>Maintenance</option>
                  </select>
                </div>

                <div className="hotel-users-field">
                  <label>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option>Management</option>
                    <option>Front Office</option>
                    <option>Housekeeping</option>
                    <option>Restaurant</option>
                    <option>Finance</option>
                    <option>Inventory</option>
                    <option>Maintenance</option>
                  </select>
                </div>

              </div>

              <div className="hotel-users-form-actions">

                <button
                  type="button"
                  className="hotel-users-form-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="hotel-users-form-save"
                >
                  <i className="bi bi-person-plus"></i>
                  Create User
                </button>

              </div>

            </form>

          </div>
        )}

        {/* Users Card */}
        <div className="hotel-users-card">

          <div className="hotel-users-card-header">

            <div>
              <h2>Hotel User Accounts</h2>
              <p>
                Users registered under this hotel
              </p>
            </div>

            <span className="hotel-users-count">
              {filteredUsers.length} Users
            </span>

          </div>

          {/* Filters */}
          <div className="hotel-users-toolbar">

            <div className="hotel-users-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="hotel-users-filter">

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Hotel Admin">Hotel Admin</option>
                <option value="Manager">Manager</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Restaurant Staff">
                  Restaurant Staff
                </option>
                <option value="Accountant">Accountant</option>
              </select>

            </div>

            <div className="hotel-users-filter">

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>

            <button
              type="button"
              className="hotel-users-clear-btn"
              onClick={clearFilters}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Clear
            </button>

          </div>

          {/* Table */}
          <div className="hotel-users-table-wrapper">

            <table className="hotel-users-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredUsers.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="hotel-users-empty"
                    >
                      <i className="bi bi-people"></i>
                      <strong>No users found</strong>
                      <span>
                        Try changing your search or filters.
                      </span>
                    </td>
                  </tr>

                ) : (

                  filteredUsers.map((user) => (

                    <tr key={user.id}>

                      <td>

                        <div className="hotel-users-user">

                          <div className="hotel-users-avatar">
                            {user.name
                              .split(' ')
                              .map((word) => word[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>{user.name}</strong>
                            <span>User ID: USR-{String(user.id).padStart(3, '0')}</span>
                          </div>

                        </div>

                      </td>

                      <td>

                        <div className="hotel-users-contact">
                          <span>
                            <i className="bi bi-envelope"></i>
                            {user.email}
                          </span>

                          <span>
                            <i className="bi bi-telephone"></i>
                            {user.phone}
                          </span>
                        </div>

                      </td>

                      <td>
                        <span className="hotel-users-role">
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <span className="hotel-users-department">
                          {user.department}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`hotel-users-status ${
                            user.status.toLowerCase()
                          }`}
                        >
                          <i className="bi bi-circle-fill"></i>
                          {user.status}
                        </span>
                      </td>

                      <td>

                        <div className="hotel-users-actions">

                          <button
                            type="button"
                            className="hotel-users-action-btn"
                            title={
                              user.status === 'Active'
                                ? 'Deactivate User'
                                : 'Activate User'
                            }
                            onClick={() => toggleStatus(user.id)}
                          >
                            <i
                              className={
                                user.status === 'Active'
                                  ? 'bi bi-person-dash'
                                  : 'bi bi-person-check'
                              }
                            ></i>
                          </button>

                          <button
                            type="button"
                            className="hotel-users-action-btn delete"
                            title="Delete User"
                            onClick={() => handleDelete(user.id)}
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

export default HotelUsers