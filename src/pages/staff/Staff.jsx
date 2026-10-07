import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import staffData from '../../data/staff'
import './Staff.css'

function Staff() {
  const navigate = useNavigate()

  const [staff, setStaff] = useState(staffData)
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All')
  const [status, setStatus] = useState('All')

  const departments = [
    'All',
    ...new Set(staffData.map((member) => member.department))
  ]

  const filteredStaff = staff.filter((member) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      member.name.toLowerCase().includes(searchText) ||
      member.email.toLowerCase().includes(searchText) ||
      member.role.toLowerCase().includes(searchText)

    const matchesDepartment =
      department === 'All' || member.department === department

    const matchesStatus =
      status === 'All' || member.status === status

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const activeStaff = staff.filter(
    (member) => member.status === 'Active'
  ).length

  const inactiveStaff = staff.filter(
    (member) => member.status === 'Inactive'
  ).length

  const totalDepartments = new Set(
    staff.map((member) => member.department)
  ).size

  const handleStatusChange = (id, newStatus) => {
    setStaff((currentStaff) =>
      currentStaff.map((member) =>
        member.id === id
          ? { ...member, status: newStatus }
          : member
      )
    )
  }

  const clearFilters = () => {
    setSearch('')
    setDepartment('All')
    setStatus('All')
  }

  return (
    <MainLayout>
      <div className="staff-page">

        <Breadcrumb items={['Staff']} />

        <div className="staff-header">
          <PageHeader
            title="Staff Management"
            subtitle="Manage hotel employees, departments and staff records"
          />

          <button
            type="button"
            className="staff-add-btn"
            onClick={() => navigate('/staff/add')}
          >
            <i className="bi bi-person-plus"></i>
            Add Staff
          </button>
        </div>

        {/* Statistics */}
        <div className="staff-stats">

          <div className="staff-stat-card">
            <div className="staff-stat-icon">
              <i className="bi bi-people"></i>
            </div>
            <div>
              <span>Total Staff</span>
              <strong>{staff.length}</strong>
            </div>
          </div>

          <div className="staff-stat-card">
            <div className="staff-stat-icon active">
              <i className="bi bi-person-check"></i>
            </div>
            <div>
              <span>Active Staff</span>
              <strong>{activeStaff}</strong>
            </div>
          </div>

          <div className="staff-stat-card">
            <div className="staff-stat-icon inactive">
              <i className="bi bi-person-x"></i>
            </div>
            <div>
              <span>Inactive Staff</span>
              <strong>{inactiveStaff}</strong>
            </div>
          </div>

          <div className="staff-stat-card">
            <div className="staff-stat-icon department">
              <i className="bi bi-diagram-3"></i>
            </div>
            <div>
              <span>Departments</span>
              <strong>{totalDepartments}</strong>
            </div>
          </div>

        </div>

        {/* Filters */}
        <div className="staff-filter-card">

          <div className="staff-search">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search staff by name, email or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="staff-filter-group">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? 'All Departments' : item}
                </option>
              ))}
            </select>
          </div>

          <div className="staff-filter-group">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>

          <button
            type="button"
            className="staff-clear-btn"
            onClick={clearFilters}
          >
            <i className="bi bi-arrow-counterclockwise"></i>
            Clear
          </button>

        </div>

        {/* Staff Table */}
        <div className="staff-table-card">

          <div className="staff-table-header">
            <div>
              <h2>Staff Directory</h2>
              <p>
                Showing {filteredStaff.length} of {staff.length} staff members
              </p>
            </div>
          </div>

          <div className="staff-table-wrapper">

            <table className="staff-table">

              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <tr key={member.id}>

                      <td>
                        <div className="staff-employee">

                          <div className="staff-avatar">
                            {member.name.charAt(0)}
                          </div>

                          <div>
                            <strong>{member.name}</strong>
                            <span>EMP-{String(member.id).padStart(4, '0')}</span>
                          </div>

                        </div>
                      </td>

                      <td>
                        <span className="staff-department">
                          {member.department}
                        </span>
                      </td>

                      <td>{member.role}</td>

                      <td>
                        <span className="staff-email">
                          {member.email}
                        </span>
                      </td>

                      <td>
                        <select
                          className={`staff-status-select ${member.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                          value={member.status}
                          onChange={(e) =>
                            handleStatusChange(
                              member.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="On Leave">On Leave</option>
                        </select>
                      </td>

                      <td>
                        <div className="staff-actions">

                          <button
                            type="button"
                            className="staff-action-btn view"
                            title="View Details"
                            onClick={() =>
                              navigate('/staff/details')
                            }
                          >
                            <i className="bi bi-eye"></i>
                          </button>

                          <button
                            type="button"
                            className="staff-action-btn edit"
                            title="Edit Staff"
                            onClick={() =>
                              navigate('/staff/add')
                            }
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <div className="staff-empty">
                        <i className="bi bi-people"></i>
                        <h3>No Staff Found</h3>
                        <p>
                          No staff members match your current filters.
                        </p>
                        <button
                          type="button"
                          onClick={clearFilters}
                        >
                          Clear Filters
                        </button>
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

export default Staff