import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './RolesPermissions.css'

function RolesPermissions() {
  const navigate = useNavigate()

  const [roles, setRoles] = useState([
    {
      id: 1,
      role: 'Administrator',
      description: 'Full access to all hotel management modules',
      users: 1,
      permissions: {
        dashboard: true,
        rooms: true,
        guests: true,
        reservations: true,
        frontOffice: true,
        housekeeping: true,
        restaurant: true,
        services: true,
        billing: true,
        inventory: true,
        staff: true,
        maintenance: true,
        reports: true
      }
    },
    {
      id: 2,
      role: 'Manager',
      description: 'Manage hotel operations and reports',
      users: 2,
      permissions: {
        dashboard: true,
        rooms: true,
        guests: true,
        reservations: true,
        frontOffice: true,
        housekeeping: true,
        restaurant: true,
        services: true,
        billing: true,
        inventory: true,
        staff: true,
        maintenance: true,
        reports: true
      }
    },
    {
      id: 3,
      role: 'Receptionist',
      description: 'Manage guests, reservations and front office',
      users: 1,
      permissions: {
        dashboard: true,
        rooms: true,
        guests: true,
        reservations: true,
        frontOffice: true,
        housekeeping: false,
        restaurant: false,
        services: true,
        billing: true,
        inventory: false,
        staff: false,
        maintenance: false,
        reports: false
      }
    },
    {
      id: 4,
      role: 'Housekeeping',
      description: 'Manage room cleaning and housekeeping operations',
      users: 1,
      permissions: {
        dashboard: true,
        rooms: true,
        guests: false,
        reservations: false,
        frontOffice: false,
        housekeeping: true,
        restaurant: false,
        services: true,
        billing: false,
        inventory: false,
        staff: false,
        maintenance: true,
        reports: false
      }
    }
  ])

  const [selectedRole, setSelectedRole] = useState(roles[0])

  const permissionNames = {
    dashboard: 'Dashboard',
    rooms: 'Rooms',
    guests: 'Guests',
    reservations: 'Reservations',
    frontOffice: 'Front Office',
    housekeeping: 'Housekeeping',
    restaurant: 'Restaurant',
    services: 'Services',
    billing: 'Billing',
    inventory: 'Inventory',
    staff: 'Staff',
    maintenance: 'Maintenance',
    reports: 'Reports'
  }

  const permissionIcons = {
    dashboard: 'bi-speedometer2',
    rooms: 'bi-door-open',
    guests: 'bi-people',
    reservations: 'bi-calendar-check',
    frontOffice: 'bi-building',
    housekeeping: 'bi-stars',
    restaurant: 'bi-cup-hot',
    services: 'bi-concierge-bell',
    billing: 'bi-receipt',
    inventory: 'bi-box-seam',
    staff: 'bi-person-badge',
    maintenance: 'bi-tools',
    reports: 'bi-bar-chart-line'
  }

  const handlePermissionChange = (permission) => {
    const updatedRole = {
      ...selectedRole,
      permissions: {
        ...selectedRole.permissions,
        [permission]: !selectedRole.permissions[permission]
      }
    }

    setSelectedRole(updatedRole)

    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === updatedRole.id
          ? updatedRole
          : role
      )
    )
  }

  const savePermissions = () => {
    alert(
      `${selectedRole.role} permissions updated successfully.`
    )
  }

  const enabledCount = Object.values(
    selectedRole.permissions
  ).filter(Boolean).length

  const totalPermissions = Object.keys(
    selectedRole.permissions
  ).length

  return (
    <MainLayout>
      <div className="roles-permissions-page">

        <Breadcrumb
          items={['Settings', 'Roles & Permissions']}
        />

        <div className="roles-permissions-header">

          <PageHeader
            title="Roles & Permissions"
            subtitle="Manage user roles and module access permissions"
          />

          <button
            type="button"
            className="roles-back-btn"
            onClick={() => navigate('/settings')}
          >
            <i className="bi bi-arrow-left"></i>
            Settings
          </button>

        </div>

        <div className="roles-layout">

          {/* ROLES LIST */}

          <div className="roles-list-card">

            <div className="roles-card-header">

              <div>
                <h2>User Roles</h2>
                <p>{roles.length} roles available</p>
              </div>

              <button
                type="button"
                className="add-role-btn"
                onClick={() =>
                  alert(
                    'Add role form will be connected later.'
                  )
                }
              >
                <i className="bi bi-plus-lg"></i>
                Add Role
              </button>

            </div>

            <div className="roles-list">

              {roles.map((role) => (
                <button
                  type="button"
                  key={role.id}
                  className={`role-item ${
                    selectedRole.id === role.id
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => setSelectedRole(role)}
                >

                  <div className="role-icon">
                    <i className="bi bi-person-badge"></i>
                  </div>

                  <div className="role-info">
                    <strong>{role.role}</strong>

                    <span>
                      {role.users}{' '}
                      {role.users === 1
                        ? 'User'
                        : 'Users'}
                    </span>
                  </div>

                  <i className="bi bi-chevron-right role-arrow"></i>

                </button>
              ))}

            </div>

          </div>

          {/* PERMISSIONS */}

          <div className="permissions-card">

            <div className="permissions-header">

              <div className="permissions-role">

                <div className="permissions-role-icon">
                  <i className="bi bi-shield-check"></i>
                </div>

                <div>
                  <h2>{selectedRole.role}</h2>
                  <p>{selectedRole.description}</p>
                </div>

              </div>

              <span className="role-user-count">
                <i className="bi bi-people"></i>

                {selectedRole.users}{' '}
                {selectedRole.users === 1
                  ? 'User'
                  : 'Users'}
              </span>

            </div>

            <div className="permissions-title">

              <div>
                <h3>Module Permissions</h3>

                <p>
                  Select which modules this role can access.
                </p>
              </div>

              <span className="permission-count">
                {enabledCount}/{totalPermissions} Enabled
              </span>

            </div>

            <div className="permissions-grid">

              {Object.entries(
                selectedRole.permissions
              ).map(([permission, enabled]) => (

                <label
                  key={permission}
                  className={`permission-item ${
                    enabled ? 'enabled' : ''
                  }`}
                >

                  <div className="permission-left">

                    <div className="permission-checkbox">

                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() =>
                          handlePermissionChange(
                            permission
                          )
                        }
                      />

                      <span></span>

                    </div>

                    <div className="permission-name">

                      <i
                        className={`bi ${
                          permissionIcons[permission]
                        }`}
                      ></i>

                      {permissionNames[permission]}

                    </div>

                  </div>

                  <span
                    className={`permission-status ${
                      enabled
                        ? 'allowed'
                        : 'denied'
                    }`}
                  >
                    {enabled ? 'Allowed' : 'Denied'}
                  </span>

                </label>

              ))}

            </div>

            <div className="permissions-actions">

              <button
                type="button"
                className="cancel-permissions-btn"
                onClick={() => navigate('/settings')}
              >
                Cancel
              </button>

              <button
                type="button"
                className="save-permissions-btn"
                onClick={savePermissions}
              >
                <i className="bi bi-check-lg"></i>
                Save Permissions
              </button>

            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  )
}

export default RolesPermissions