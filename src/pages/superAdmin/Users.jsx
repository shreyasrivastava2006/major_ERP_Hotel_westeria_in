import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
//import SuperAdminLayout from "../../component/layout/SuperAdminLayout.jsx";
import "./Users.css";

function Users() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@wisteriain.com",
      role: "Super Admin",
      hotel: "All Hotels",
      department: "Administration",
      status: "Active",
      lastLogin: "28 Sep 2026",
    },
    {
      id: 2,
      name: "Rajesh Sharma",
      email: "rajesh@wisteriain.com",
      role: "Hotel Admin",
      hotel: "Wisteria Grand",
      department: "Management",
      status: "Active",
      lastLogin: "28 Sep 2026",
    },
    {
      id: 3,
      name: "Priya Verma",
      email: "priya@wisteriain.com",
      role: "Manager",
      hotel: "Wisteria Grand",
      department: "Front Office",
      status: "Active",
      lastLogin: "27 Sep 2026",
    },
    {
      id: 4,
      name: "Amit Singh",
      email: "amit@wisteriain.com",
      role: "Staff",
      hotel: "Wisteria Palace",
      department: "Housekeeping",
      status: "Active",
      lastLogin: "26 Sep 2026",
    },
    {
      id: 5,
      name: "Neha Gupta",
      email: "neha@wisteriain.com",
      role: "Staff",
      hotel: "Wisteria Palace",
      department: "Restaurant",
      status: "Inactive",
      lastLogin: "20 Sep 2026",
    },
    {
      id: 6,
      name: "Vikas Yadav",
      email: "vikas@wisteriain.com",
      role: "Hotel Admin",
      hotel: "Wisteria Residency",
      department: "Management",
      status: "Active",
      lastLogin: "25 Sep 2026",
    },
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.hotel.toLowerCase().includes(searchValue) ||
        user.department.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "All Roles" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const adminUsers = users.filter(
    (user) =>
      user.role === "Super Admin" ||
      user.role === "Hotel Admin"
  ).length;

  const toggleStatus = (id) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    const selectedUser = users.find(
      (user) => user.id === id
    );

    if (!selectedUser) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedUser.name}?`
    );

    if (confirmDelete) {
      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user.id !== id
        )
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All Roles");
    setStatusFilter("All Status");
  };

  const handleAddUser = () => {
    alert("Add User page will be connected here.");
  };

  const handleViewUser = (user) => {
    alert(`Viewing ${user.name}`);
  };

  const handleEditUser = (user) => {
    alert(`Editing ${user.name}`);
  };

  return (
    <SuperAdminLayout>
      <div className="super-users-page">

        {/* BREADCRUMB */}
        <div className="super-users-breadcrumb">
          <button
            type="button"
            onClick={() => navigate("/super-admin")}
          >
            Super Admin
          </button>

          <i className="bi bi-chevron-right"></i>

          <strong>Users</strong>
        </div>

        {/* HEADER */}
        <div className="super-users-header">
          <div>
            <span className="super-users-eyebrow">
              USER MANAGEMENT
            </span>

            <h1>User Management</h1>

            <p>
              Manage users, roles and access across all
              Wisteria In hotels
            </p>
          </div>

          <div className="super-users-header-actions">

            <button
              type="button"
              className="super-users-back-btn"
              onClick={() => navigate("/super-admin")}
            >
              <i className="bi bi-arrow-left"></i>
              Back to Dashboard
            </button>

            <button
              type="button"
              className="super-users-add-btn"
              onClick={handleAddUser}
            >
              <i className="bi bi-person-plus"></i>
              Add User
            </button>

          </div>
        </div>

        {/* STATS */}
        <div className="super-users-stats">

          <div className="super-users-stat-card">
            <div className="super-users-stat-icon gold">
              <i className="bi bi-people-fill"></i>
            </div>

            <div className="super-users-stat-content">
              <span>Total Users</span>
              <strong>{users.length}</strong>
              <small>Registered system users</small>
            </div>
          </div>

          <div className="super-users-stat-card">
            <div className="super-users-stat-icon green">
              <i className="bi bi-person-check-fill"></i>
            </div>

            <div className="super-users-stat-content">
              <span>Active Users</span>
              <strong>{activeUsers}</strong>
              <small>Currently active</small>
            </div>
          </div>

          <div className="super-users-stat-card">
            <div className="super-users-stat-icon purple">
              <i className="bi bi-shield-check"></i>
            </div>

            <div className="super-users-stat-content">
              <span>Admin Users</span>
              <strong>{adminUsers}</strong>
              <small>Admin level access</small>
            </div>
          </div>

          <div className="super-users-stat-card">
            <div className="super-users-stat-icon rose">
              <i className="bi bi-person-x-fill"></i>
            </div>

            <div className="super-users-stat-content">
              <span>Inactive Users</span>
              <strong>{inactiveUsers}</strong>
              <small>Currently inactive</small>
            </div>
          </div>

        </div>

        {/* FILTER */}
        <div className="super-users-filter-card">

          <div className="super-users-filter-title">

            <div className="filter-title-icon">
              <i className="bi bi-funnel"></i>
            </div>

            <div>
              <strong>Filter Users</strong>
              <span>
                Search and filter system users
              </span>
            </div>

          </div>

          <div className="super-users-filter-controls">

            <div className="super-users-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search users, email, hotel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}

            </div>

            <select
              className="super-users-select"
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
            >
              <option>All Roles</option>
              <option>Super Admin</option>
              <option>Hotel Admin</option>
              <option>Manager</option>
              <option>Staff</option>
            </select>

            <select
              className="super-users-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button
              type="button"
              className="super-users-clear-btn"
              onClick={clearFilters}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Clear
            </button>

          </div>

        </div>

        {/* TABLE */}
        <div className="super-users-table-card">

          <div className="super-users-table-header">

            <div>
              <span className="super-users-table-label">
                SYSTEM USERS
              </span>

              <h2>All Users</h2>

              <p>
                Showing{" "}
                <strong>
                  {filteredUsers.length}
                </strong>{" "}
                of{" "}
                <strong>{users.length}</strong>{" "}
                users
              </p>
            </div>

            <div className="super-users-result-badge">
              <i className="bi bi-people"></i>
              {filteredUsers.length} Results
            </div>

          </div>

          <div className="super-users-table-wrapper">

            <table className="super-users-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Hotel</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredUsers.length > 0 ? (

                  filteredUsers.map((user) => (

                    <tr key={user.id}>

                      <td>
                        <div className="super-user-info">

                          <div className="super-user-avatar">
                            {user.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <div className="super-user-details">
                            <strong>
                              {user.name}
                            </strong>

                            <span>
                              {user.email}
                            </span>
                          </div>

                        </div>
                      </td>

                      <td>
                        <span
                          className={`super-user-role role-${user.role
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <div className="super-user-hotel">

                          <i className="bi bi-building"></i>

                          <span>
                            {user.hotel}
                          </span>

                        </div>
                      </td>

                      <td>
                        <span className="super-user-department">
                          {user.department}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`super-user-status ${
                            user.status === "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <span className="status-dot"></span>
                          {user.status}
                        </span>
                      </td>

                      <td>
                        <span className="super-user-last-login">

                          <i className="bi bi-clock"></i>

                          {user.lastLogin}

                        </span>
                      </td>

                      <td>
                        <div className="super-user-actions">

                          <button
                            type="button"
                            className="super-user-action view"
                            title="View User"
                            onClick={() =>
                              handleViewUser(user)
                            }
                          >
                            <i className="bi bi-eye"></i>
                          </button>

                          <button
                            type="button"
                            className="super-user-action edit"
                            title="Edit User"
                            onClick={() =>
                              handleEditUser(user)
                            }
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            type="button"
                            className="super-user-action status"
                            title={
                              user.status === "Active"
                                ? "Deactivate User"
                                : "Activate User"
                            }
                            onClick={() =>
                              toggleStatus(user.id)
                            }
                          >
                            <i
                              className={
                                user.status === "Active"
                                  ? "bi bi-person-x"
                                  : "bi bi-person-check"
                              }
                            ></i>
                          </button>

                          <button
                            type="button"
                            className="super-user-action delete"
                            title="Delete User"
                            onClick={() =>
                              deleteUser(user.id)
                            }
                          >
                            <i className="bi bi-trash3"></i>
                          </button>

                        </div>
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="7"
                      className="super-users-empty"
                    >

                      <div className="super-users-empty-icon">
                        <i className="bi bi-person-x"></i>
                      </div>

                      <strong>
                        No users found
                      </strong>

                      <span>
                        Try changing your search or filters.
                      </span>

                      <button
                        type="button"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button>

                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </SuperAdminLayout>
  );
}

export default Users;