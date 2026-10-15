import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./AddUser.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  role: "",
  hotel: "",
  department: "",
  status: "Active",
};

function AddUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.role ||
      !form.hotel ||
      !form.department
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem("wisteriaSuperAdminUsers") || "[]"
    );

    const emailExists = existingUsers.some(
      (user) =>
        user.email.toLowerCase() === form.email.trim().toLowerCase()
    );

    if (emailExists) {
      setError("A user with this email already exists.");
      return;
    }

    const newUser = {
      ...form,
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      lastLogin: "Never",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "wisteriaSuperAdminUsers",
      JSON.stringify([...existingUsers, newUser])
    );

    alert("User added successfully!");

    navigate("/super-admin/users");
  };

  return (
    <SuperAdminLayout>
      <div className="add-user-page">
        <div className="add-user-breadcrumb">
          <button onClick={() => navigate("/super-admin")}>
            Super Admin
          </button>

          <i className="bi bi-chevron-right"></i>

          <button onClick={() => navigate("/super-admin/users")}>
            Users
          </button>

          <i className="bi bi-chevron-right"></i>

          <strong>Add User</strong>
        </div>

        <div className="add-user-header">
          <div>
            <span className="add-user-eyebrow">
              USER MANAGEMENT
            </span>

            <h1>Add New User</h1>

            <p>
              Create a new user and assign their hotel,
              department and access role.
            </p>
          </div>

          <button
            className="add-user-back"
            onClick={() => navigate("/super-admin/users")}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Users
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-user-card">
          <div className="add-user-section-title">
            <div className="add-user-section-icon">
              <i className="bi bi-person-plus"></i>
            </div>

            <div>
              <h2>User Information</h2>
              <p>Enter the basic details of the new user.</p>
            </div>
          </div>

          {error && (
            <div className="add-user-error">{error}</div>
          )}

          <div className="add-user-grid">
            <div className="add-user-field">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-user-field">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-user-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="add-user-field">
              <label>User Role *</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option>Super Admin</option>
                <option>Hotel Admin</option>
                <option>Manager</option>
                <option>Staff</option>
              </select>
            </div>

            <div className="add-user-field">
              <label>Assign Hotel *</label>
              <select
                name="hotel"
                value={form.hotel}
                onChange={handleChange}
                required
              >
                <option value="">Select Hotel</option>
                <option>All Hotels</option>
                <option>Wisteria Grand</option>
                <option>Wisteria Palace</option>
                <option>Wisteria Residency</option>
              </select>
            </div>

            <div className="add-user-field">
              <label>Department *</label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option>Administration</option>
                <option>Management</option>
                <option>Front Office</option>
                <option>Housekeeping</option>
                <option>Restaurant</option>
                <option>Reservations</option>
                <option>Billing</option>
                <option>Maintenance</option>
                <option>Inventory</option>
              </select>
            </div>

            <div className="add-user-field">
              <label>Account Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="add-user-actions">
            <button
              type="button"
              className="add-user-cancel"
              onClick={() => navigate("/super-admin/users")}
            >
              Cancel
            </button>

            <button type="submit" className="add-user-submit">
              <i className="bi bi-person-check"></i>
              Create User
            </button>
          </div>
        </form>
      </div>
    </SuperAdminLayout>
  );
}

export default AddUser;