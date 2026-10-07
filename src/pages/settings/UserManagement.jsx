import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './UserManagement.css'

function UserManagement() {
  const navigate = useNavigate()

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@wisteriain.com',
      role: 'Administrator',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      email: 'rahul@wisteriain.com',
      role: 'Receptionist',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Priya Singh',
      email: 'priya@wisteriain.com',
      role: 'Manager',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Aman Verma',
      email: 'aman@wisteriain.com',
      role: 'Housekeeping',
      status: 'Inactive'
    }
  ])

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Receptionist'
  })

  const activeUsers = users.filter(
    (user) => user.status === 'Active'
  ).length

  const inactiveUsers = users.filter(
    (user) => user.status === 'Inactive'
  ).length

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const addUser = (e) => {
    e.preventDefault()

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'Active'
    }

    setUsers((prevUsers) => [
      ...prevUsers,
      newUser
    ])

    setFormData({
      name: '',
      email: '',
      role: 'Receptionist'
    })

    setShowForm(false)
  }

  const toggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
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

  const deleteUser = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    )

    if (!confirmed) return

    setUsers((prevUsers) =>
      prevUsers.filter(
        (user) => user.id !== id
      )
    )
  }

  return (
    <MainLayout>

      <div className="user-management-page">

        <Breadcrumb
          items={['Settings', 'User Management']}
        />

        <div className="user-management-header">

          <PageHeader
            title="User Management"
            subtitle="Manage system users, roles and access"
          />

          <button
            type="button"
            className="user-management-back-btn"
            onClick={() => navigate('/settings')}
          >
            <i className="bi bi-arrow-left"></i>
            Settings
          </button>

        </div>

        {/* STATS */}

        <div className="user-management-stats">

          <div className="user-stat-card">

            <div className="user-stat-icon">
              <i className="bi bi-people"></i>
            </div>

            <div>
              <span>Total Users</span>
              <h2>{users.length}</h2>
            </div>

          </div>

          <div className="user-stat-card">

            <div className="user-stat-icon active">
              <i className="bi bi-person-check"></i>
            </div>

            <div>
              <span>Active Users</span>
              <h2>{activeUsers}</h2>
            </div>

          </div>

          <div className="user-stat-card">

            <div className="user-stat-icon inactive">
              <i className="bi bi-person-x"></i>
            </div>

            <div>
              <span>Inactive Users</span>
              <h2>{inactiveUsers}</h2>
            </div>

          </div>

        </div>

        {/* ADD USER FORM */}

        {showForm && (
          <form
            className="user-form-card"
            onSubmit={addUser}
          >

            <div className="user-form-header">

              <div>
                <h2>Add New User</h2>
                <p>Create a new system user</p>
              </div>

              <button
                type="button"
                className="close-user-form"
                onClick={() =>
                  setShowForm(false)
                }
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <div className="user-form-grid">

              <div className="user-form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />

              </div>

              <div className="user-form-group">

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />

              </div>

              <div className="user-form-group">

                <label>Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option>Administrator</option>
                  <option>Manager</option>
                  <option>Receptionist</option>
                  <option>Housekeeping</option>
                  <option>Restaurant Staff</option>
                  <option>Accountant</option>
                </select>

              </div>

            </div>

            <div className="user-form-actions">

              <button
                type="button"
                className="cancel-user-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-user-btn"
              >
                <i className="bi bi-person-plus"></i>
                Add User
              </button>

            </div>

          </form>
        )}

        {/* USERS TABLE */}

        <div className="user-management-card">

          <div className="user-card-header">

            <div>
              <h2>System Users</h2>
              <p>
                {users.length} users registered
              </p>
            </div>

            <button
              type="button"
              className="add-user-btn"
              onClick={() =>
                setShowForm(true)
              }
            >
              <i className="bi bi-plus-lg"></i>
              Add User
            </button>

          </div>

          <div className="user-table-wrapper">

            <table className="user-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td>
                      <div className="user-info">

                        <div className="user-avatar">
                          {user.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {user.name}
                        </strong>

                      </div>
                    </td>

                    <td>
                      <span className="user-email">
                        {user.email}
                      </span>
                    </td>

                    <td>
                      <span className="user-role">
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`user-status ${
                          user.status === 'Active'
                            ? 'active'
                            : 'inactive'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>

                      <div className="user-actions">

                        <button
                          type="button"
                          className="status-user-btn"
                          onClick={() =>
                            toggleStatus(user.id)
                          }
                        >
                          {user.status === 'Active'
                            ? 'Deactivate'
                            : 'Activate'}
                        </button>

                        <button
                          type="button"
                          className="delete-user-btn"
                          onClick={() =>
                            deleteUser(user.id)
                          }
                          aria-label="Delete user"
                        >
                          <i className="bi bi-trash"></i>
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default UserManagement