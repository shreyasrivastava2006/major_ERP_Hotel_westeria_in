import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./Users.css";

// =====================================================
// LOCAL STORAGE
// =====================================================

const USERS_KEY = "wisteriaSuperAdminUsers";
const ACTIVITY_KEY = "wisteriaActivityLogs";

// =====================================================
// DEFAULT USERS
// =====================================================

const defaultUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@wisteriain.com",
    phone: "",
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
    phone: "",
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
    phone: "",
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
    phone: "",
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
    phone: "",
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
    phone: "",
    role: "Hotel Admin",
    hotel: "Wisteria Residency",
    department: "Management",
    status: "Active",
    lastLogin: "25 Sep 2026",
  },
];

// =====================================================
// EMPTY FORM
// =====================================================

const initialForm = {
  name: "",
  email: "",
  phone: "",
  role: "Staff",
  hotel: "",
  department: "",
  status: "Active",
};

// =====================================================
// HELPERS
// =====================================================

const loadUsers = () => {
  try {
    const saved = localStorage.getItem(USERS_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error loading users:", error);
  }

  return defaultUsers;
};

const createId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `USER-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
};

const getInitials = (name = "") => {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

const addActivity = ({
  hotel = "",
  action,
  description,
  status = "Success",
}) => {
  try {
    const stored = JSON.parse(
      localStorage.getItem(ACTIVITY_KEY) || "[]"
    );

    const logs = Array.isArray(stored) ? stored : [];

    const newLog = {
      id: createId(),
      user: "Super Admin",
      role: "Super Admin",
      hotel,
      module: "Users",
      action,
      description,
      status,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(
      ACTIVITY_KEY,
      JSON.stringify([newLog, ...logs])
    );

    window.dispatchEvent(
      new Event("wisteria-activity-updated")
    );
  } catch (error) {
    console.error("Activity log error:", error);
  }
};

// =====================================================
// MAIN COMPONENT
// =====================================================

function Users() {
  const navigate = useNavigate();

  // USERS
  const [users, setUsers] = useState(loadUsers);

  // FILTERS
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // POPUP MODAL
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ ...initialForm });
  const [formError, setFormError] = useState("");

  // DELETE CONFIRMATION
  const [deleteTarget, setDeleteTarget] = useState(null);

  // SUCCESS MESSAGE
  const [message, setMessage] = useState("");

  // =====================================================
  // SAVE USERS TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
      );
    } catch (error) {
      console.error("Error saving users:", error);
    }
  }, [users]);

  // =====================================================
  // LOCK SCROLL WHEN MODAL IS OPEN
  // =====================================================

  useEffect(() => {
    if (!showModal && !deleteTarget) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showModal, deleteTarget]);

  // =====================================================
  // CLOSE MODAL USING ESCAPE KEY
  // =====================================================

  useEffect(() => {
    if (!showModal && !deleteTarget) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
        setDeleteTarget(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showModal, deleteTarget]);

  // =====================================================
  // SUCCESS MESSAGE TIMER
  // =====================================================

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [message]);

  // =====================================================
  // FILTER USERS
  // =====================================================

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch = [
        user.name,
        user.email,
        user.hotel,
        user.department,
        user.phone,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(query)
      );

      const matchesRole =
        roleFilter === "All Roles" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        user.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [users, search, roleFilter, statusFilter]);

  // =====================================================
  // USER STATISTICS
  // =====================================================

  const totalUsers = users.length;

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

  // =====================================================
  // OPEN ADD USER POPUP
  // =====================================================

  const openAddModal = () => {
    setModalMode("add");
    setSelectedUser(null);
    setForm({ ...initialForm });
    setFormError("");
    setShowModal(true);
  };

  // =====================================================
  // OPEN VIEW USER POPUP
  // =====================================================

  const openViewModal = (user) => {
    setModalMode("view");
    setSelectedUser(user);
    setForm({ ...initialForm, ...user });
    setFormError("");
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT USER POPUP
  // =====================================================

  const openEditModal = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setForm({ ...initialForm, ...user });
    setFormError("");
    setShowModal(true);
  };

  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormError("");
  };

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => {
      const updated = {
        ...previous,
        [name]: value,
      };

      if (name === "role") {
        if (value === "Super Admin") {
          updated.hotel = "All Hotels";
          updated.department = "Administration";
        } else if (previous.role === "Super Admin") {
          updated.hotel = "";
          updated.department = "";
        }
      }

      return updated;
    });

    setFormError("");
  };

  // =====================================================
  // SAVE USER
  // =====================================================

  const handleSaveUser = (event) => {
    event.preventDefault();

    if (modalMode === "view") return;

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const hotel = form.hotel.trim();
    const department = form.department.trim();

    if (!name || !email || !hotel || !department) {
      setFormError("Please fill all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      setFormError("Phone number must contain 10 digits.");
      return;
    }

    const emailExists = users.some(
      (user) =>
        String(user.email).toLowerCase() === email &&
        String(user.id) !== String(selectedUser?.id)
    );

    if (emailExists) {
      setFormError("This email address is already registered.");
      return;
    }

    const userData = {
      name,
      email,
      phone,
      role: form.role,
      hotel,
      department,
      status: form.status,
    };

    // UPDATE USER

    if (modalMode === "edit" && selectedUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === selectedUser.id
            ? { ...user, ...userData }
            : user
        )
      );

      addActivity({
        hotel,
        action: "User Updated",
        description: `User "${name}" was updated.`,
      });

      setMessage(`${name} updated successfully.`);
    }

    // ADD USER

    else {
      const newUser = {
        id: createId(),
        ...userData,
        lastLogin: "Never",
      };

      setUsers((previous) => [newUser, ...previous]);

      addActivity({
        hotel,
        action: "User Created",
        description: `New user "${name}" was created.`,
      });

      setMessage(`${name} added successfully.`);
    }

    closeModal();
  };

  // =====================================================
  // ACTIVATE / DEACTIVATE USER
  // =====================================================

  const toggleStatus = (user) => {
    const newStatus =
      user.status === "Active"
        ? "Inactive"
        : "Active";

    setUsers((previous) =>
      previous.map((item) =>
        item.id === user.id
          ? { ...item, status: newStatus }
          : item
      )
    );

    addActivity({
      hotel: user.hotel,
      action:
        newStatus === "Active"
          ? "User Activated"
          : "User Deactivated",
      description: `User "${user.name}" status changed to ${newStatus}.`,
    });

    setMessage(
      `${user.name} is now ${newStatus.toLowerCase()}.`
    );
  };

  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDeleteUser = () => {
    if (!deleteTarget) return;

    setUsers((previous) =>
      previous.filter(
        (user) => user.id !== deleteTarget.id
      )
    );

    addActivity({
      hotel: deleteTarget.hotel,
      action: "User Deleted",
      description: `User "${deleteTarget.name}" was deleted.`,
    });

    setMessage(`${deleteTarget.name} deleted successfully.`);

    setDeleteTarget(null);
    closeModal();
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All Roles");
    setStatusFilter("All Status");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SuperAdminLayout>
      <div className="super-users-page">

        {/* ============================================
            BREADCRUMB
        ============================================ */}

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

        {/* ============================================
            PAGE HEADER
        ============================================ */}

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
              onClick={openAddModal}
            >
              <i className="bi bi-person-plus"></i>
              Add User
            </button>
          </div>
        </div>

        {/* ============================================
            SUCCESS MESSAGE
        ============================================ */}

        {message && (
          <div className="super-users-success-message">
            <i className="bi bi-check-circle-fill"></i>
            <span>{message}</span>

            <button
              type="button"
              onClick={() => setMessage("")}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        )}

        {/* ============================================
            STATISTICS
        ============================================ */}

        <div className="super-users-stats">

          <div className="super-users-stat-card">
            <div className="super-users-stat-icon gold">
              <i className="bi bi-people-fill"></i>
            </div>

            <div className="super-users-stat-content">
              <span>Total Users</span>
              <strong>{totalUsers}</strong>
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

        {/* ============================================
            FILTER SECTION
        ============================================ */}

        <div className="super-users-filter-card">

          <div className="super-users-filter-title">
            <div className="filter-title-icon">
              <i className="bi bi-funnel"></i>
            </div>

            <div>
              <strong>Filter Users</strong>
              <span>Search and filter system users</span>
            </div>
          </div>

          <div className="super-users-filter-controls">

            <div className="super-users-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search users, email, hotel..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
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
              onChange={(event) =>
                setRoleFilter(event.target.value)
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
              onChange={(event) =>
                setStatusFilter(event.target.value)
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

        {/* ============================================
            USERS TABLE
        ============================================ */}

        <div className="super-users-table-card">

          <div className="super-users-table-header">
            <div>
              <span className="super-users-table-label">
                SYSTEM USERS
              </span>

              <h2>All Users</h2>

              <p>
                Showing{" "}
                <strong>{filteredUsers.length}</strong>{" "}
                of <strong>{users.length}</strong> users
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

                      {/* USER */}

                      <td>
                        <div className="super-user-info">
                          <div className="super-user-avatar">
                            {getInitials(user.name)}
                          </div>

                          <div className="super-user-details">
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* ROLE */}

                      <td>
                        <span
                          className={`super-user-role role-${String(
                            user.role
                          )
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* HOTEL */}

                      <td>
                        <div className="super-user-hotel">
                          <i className="bi bi-building"></i>
                          <span>{user.hotel}</span>
                        </div>
                      </td>

                      {/* DEPARTMENT */}

                      <td>
                        <span className="super-user-department">
                          {user.department}
                        </span>
                      </td>

                      {/* STATUS */}

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

                      {/* LAST LOGIN */}

                      <td>
                        <span className="super-user-last-login">
                          <i className="bi bi-clock"></i>
                          {user.lastLogin || "Never"}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="super-user-actions">

                          <button
                            type="button"
                            className="super-user-action view"
                            title="View User"
                            onClick={() =>
                              openViewModal(user)
                            }
                          >
                            <i className="bi bi-eye"></i>
                          </button>

                          <button
                            type="button"
                            className="super-user-action edit"
                            title="Edit User"
                            onClick={() =>
                              openEditModal(user)
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
                              toggleStatus(user)
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
                              setDeleteTarget(user)
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

                      <strong>No users found</strong>

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

        {/* ============================================
            ADD / EDIT / VIEW USER POPUP
        ============================================ */}

        {showModal && (
          <div
            className="super-users-modal-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              className="super-users-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="super-users-modal-title"
            >

              {/* MODAL HEADER */}

              <div className="super-users-modal-header">

                <div className="super-users-modal-heading">
                  <div className="super-users-modal-heading-icon">
                    <i
                      className={`bi ${
                        modalMode === "add"
                          ? "bi-person-plus"
                          : modalMode === "edit"
                          ? "bi-pencil-square"
                          : "bi-person-vcard"
                      }`}
                    ></i>
                  </div>

                  <div>
                    <span>
                      {modalMode === "add"
                        ? "CREATE NEW ACCOUNT"
                        : modalMode === "edit"
                        ? "UPDATE USER DETAILS"
                        : "USER INFORMATION"}
                    </span>

                    <h2 id="super-users-modal-title">
                      {modalMode === "add"
                        ? "Add New User"
                        : modalMode === "edit"
                        ? "Edit User"
                        : "User Details"}
                    </h2>

                    <p>
                      {modalMode === "add"
                        ? "Enter the details to register a new system user."
                        : modalMode === "edit"
                        ? "Update the selected user's information."
                        : "View the selected user's information."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="super-users-modal-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              {/* FORM */}

              <form
                className="super-users-modal-form"
                onSubmit={handleSaveUser}
              >
                <div className="super-users-modal-body">

                  <div className="super-users-form-section-title">
                    <i className="bi bi-person-lines-fill"></i>
                    Personal Information
                  </div>

                  <div className="super-users-form-grid">

                    {/* FULL NAME */}

                    <div className="super-users-form-group">
                      <label htmlFor="user-name">
                        Full Name <span>*</span>
                      </label>

                      <div className="super-users-input-wrapper">
                        <i className="bi bi-person"></i>

                        <input
                          id="user-name"
                          type="text"
                          name="name"
                          placeholder="Enter full name"
                          value={form.name}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          required
                        />
                      </div>
                    </div>

                    {/* EMAIL */}

                    <div className="super-users-form-group">
                      <label htmlFor="user-email">
                        Email Address <span>*</span>
                      </label>

                      <div className="super-users-input-wrapper">
                        <i className="bi bi-envelope"></i>

                        <input
                          id="user-email"
                          type="email"
                          name="email"
                          placeholder="Enter email address"
                          value={form.email}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          required
                        />
                      </div>
                    </div>

                    {/* PHONE */}

                    <div className="super-users-form-group">
                      <label htmlFor="user-phone">
                        Phone Number
                      </label>

                      <div className="super-users-input-wrapper">
                        <i className="bi bi-telephone"></i>

                        <input
                          id="user-phone"
                          type="tel"
                          name="phone"
                          placeholder="Enter 10-digit number"
                          value={form.phone}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                          maxLength={10}
                        />
                      </div>
                    </div>

                    {/* STATUS */}

                    <div className="super-users-form-group">
                      <label htmlFor="user-status">
                        Account Status
                      </label>

                      <div className="super-users-input-wrapper">
                        <i className="bi bi-toggle-on"></i>

                        <select
                          id="user-status"
                          name="status"
                          value={form.status}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                        >
                          <option value="Active">
                            Active
                          </option>

                          <option value="Inactive">
                            Inactive
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* ACCESS DETAILS */}

                  <div className="super-users-form-section-title">
                    <i className="bi bi-shield-lock"></i>
                    Role & Access Information
                  </div>

                  <div className="super-users-form-grid">

                    {/* ROLE */}

                    <div className="super-users-form-group">
                      <label htmlFor="user-role">
                        User Role <span>*</span>
                      </label>

                      <div className="super-users-input-wrapper">
                        <i className="bi bi-person-badge"></i>

                        <select
                          id="user-role"
                          name="role"
                          value={form.role}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                        >
                          <option value="Staff">Staff</option>

                          <option value="Manager">
                            Manager
                          </option>

                          <option value="Hotel Admin">
                            Hotel Admin
                          </option>

                          <option value="Super Admin">
                            Super Admin
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* HOTEL */}

                    <div className="super-users-form-group">
                      <label htmlFor="user-hotel">
                        Assigned Hotel <span>*</span>
                      </label>

                      <div className="super-users-input-wrapper">
                        <i className="bi bi-building"></i>

                        <input
                          id="user-hotel"
                          type="text"
                          name="hotel"
                          placeholder="Enter hotel name"
                          value={form.hotel}
                          onChange={handleInputChange}
                          disabled={
                            modalMode === "view" ||
                            form.role === "Super Admin"
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* DEPARTMENT */}

                    <div className="super-users-form-group super-users-form-full">
                      <label htmlFor="user-department">
                        Department <span>*</span>
                      </label>

                      <div className="super-users-input-wrapper">
                        <i className="bi bi-diagram-3"></i>

                        <select
                          id="user-department"
                          name="department"
                          value={form.department}
                          onChange={handleInputChange}
                          disabled={
                            modalMode === "view" ||
                            form.role === "Super Admin"
                          }
                          required
                        >
                          <option value="">
                            Select Department
                          </option>

                          <option value="Administration">
                            Administration
                          </option>

                          <option value="Management">
                            Management
                          </option>

                          <option value="Front Office">
                            Front Office
                          </option>

                          <option value="Housekeeping">
                            Housekeeping
                          </option>

                          <option value="Restaurant">
                            Restaurant
                          </option>

                          <option value="Reservations">
                            Reservations
                          </option>

                          <option value="Billing">
                            Billing
                          </option>

                          <option value="Inventory">
                            Inventory
                          </option>

                          <option value="Maintenance">
                            Maintenance
                          </option>

                          <option value="Human Resources">
                            Human Resources
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* LAST LOGIN */}

                  {modalMode === "view" && (
                    <div className="super-users-view-info">
                      <i className="bi bi-clock-history"></i>

                      <span>
                        Last Login:
                        <strong>
                          {" "}
                          {selectedUser?.lastLogin || "Never"}
                        </strong>
                      </span>
                    </div>
                  )}

                  {/* ERROR */}

                  {formError && (
                    <div className="super-users-form-error">
                      <i className="bi bi-exclamation-circle"></i>
                      {formError}
                    </div>
                  )}
                </div>

                {/* MODAL FOOTER */}

                <div className="super-users-modal-footer">

                  <button
                    type="button"
                    className="super-users-modal-cancel"
                    onClick={closeModal}
                  >
                    {modalMode === "view"
                      ? "Close"
                      : "Cancel"}
                  </button>

                  {modalMode === "view" ? (
                    <button
                      type="button"
                      className="super-users-modal-save"
                      onClick={() =>
                        openEditModal(selectedUser)
                      }
                    >
                      <i className="bi bi-pencil-square"></i>
                      Edit User
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="super-users-modal-save"
                    >
                      <i
                        className={`bi ${
                          modalMode === "add"
                            ? "bi-person-check"
                            : "bi-check2-circle"
                        }`}
                      ></i>

                      {modalMode === "add"
                        ? "Save User"
                        : "Update User"}
                    </button>
                  )}

                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================
            DELETE CONFIRMATION POPUP
        ============================================ */}

        {deleteTarget && (
          <div className="super-users-modal-overlay">
            <div
              className="super-users-delete-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Delete User"
            >
              <div className="super-users-delete-icon">
                <i className="bi bi-trash3"></i>
              </div>

              <h2>Delete User?</h2>

              <p>
                Are you sure you want to delete{" "}
                <strong>{deleteTarget.name}</strong>?
                This action cannot be undone.
              </p>

              <div className="super-users-delete-actions">
                <button
                  type="button"
                  className="super-users-modal-cancel"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="super-users-delete-confirm"
                  onClick={handleDeleteUser}
                >
                  <i className="bi bi-trash3"></i>
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </SuperAdminLayout>
  );
}

export default Users;