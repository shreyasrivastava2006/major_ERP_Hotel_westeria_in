import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./AddHotel.css";

function AddHotel() {
  const navigate = useNavigate();
  const location = useLocation();

  const editMode = location.state?.mode === "edit";
  const editingHotel = location.state?.hotel || null;

  const [formData, setFormData] = useState({
    hotelName: "",
    hotelCode: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    managerName: "",
    managerEmail: "",
    managerPhone: "",
    plan: "Basic",
    rooms: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editMode && editingHotel) {
      setFormData({
        hotelName: editingHotel.name || "",
        hotelCode: editingHotel.hotelId || "",
        email: editingHotel.email || "",
        phone: editingHotel.contact || "",
        address: editingHotel.address || "",
        city: editingHotel.city || "",
        state: editingHotel.state || "Uttar Pradesh",
        pincode: editingHotel.pincode || "",
        managerName: editingHotel.manager || "",
        managerEmail: editingHotel.email || "",
        managerPhone: editingHotel.contact || "",
        plan: editingHotel.plan || "Basic",
        rooms: editingHotel.rooms || "",
        description: editingHotel.description || "",
        status: editingHotel.status || "Active",
      });
    }
  }, [editMode, editingHotel]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.hotelName.trim()) {
      newErrors.hotelName = "Hotel name is required";
    }

    if (!formData.hotelCode.trim()) {
      newErrors.hotelCode = "Hotel ID is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Hotel email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    }

    if (!formData.managerName.trim()) {
      newErrors.managerName = "Manager name is required";
    }

    if (!formData.managerEmail.trim()) {
      newErrors.managerEmail = "Manager email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.managerEmail)) {
      newErrors.managerEmail = "Enter a valid manager email";
    }

    if (!formData.managerPhone.trim()) {
      newErrors.managerPhone = "Manager phone is required";
    }

    if (!formData.rooms) {
      newErrors.rooms = "Number of rooms is required";
    } else if (Number(formData.rooms) <= 0) {
      newErrors.rooms = "Rooms must be greater than 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    if (editMode) {
      alert("Hotel details updated successfully.");
    } else {
      alert("Hotel added successfully.");
    }

    navigate("/super-admin/hotels");
  };

  const handleCancel = () => {
    navigate("/super-admin/hotels");
  };

  return (
    <SuperAdminLayout>
      <div className="super-add-hotel-page">

        {/* =====================================================
            BREADCRUMB
        ===================================================== */}
        <div className="super-add-hotel-breadcrumb">

          <span
            className="super-add-hotel-breadcrumb-link"
            onClick={() => navigate("/super-admin")}
          >
            <i className="bi bi-grid-1x2-fill"></i>
            Dashboard
          </span>

          <i className="bi bi-chevron-right"></i>

          <span
            className="super-add-hotel-breadcrumb-link"
            onClick={() => navigate("/super-admin/hotels")}
          >
            Hotels
          </span>

          <i className="bi bi-chevron-right"></i>

          <span>
            {editMode ? "Edit Hotel" : "Add Hotel"}
          </span>

        </div>


        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <div className="super-add-hotel-header">

          <div>
            <span className="super-add-hotel-eyebrow">
              HOTEL MANAGEMENT
            </span>

            <h1>
              {editMode ? "Edit Hotel" : "Add New Hotel"}
            </h1>

            <p>
              {editMode
                ? "Update the hotel information and management details."
                : "Register a new hotel property on the Wisteria In platform."}
            </p>
          </div>

          <button
            type="button"
            className="super-add-hotel-back-btn"
            onClick={handleCancel}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Hotels
          </button>

        </div>


        {/* =====================================================
            FORM
        ===================================================== */}
        <form
          className="super-add-hotel-form"
          onSubmit={handleSubmit}
        >

          {/* ===================================================
              HOTEL INFORMATION
          =================================================== */}
          <section className="super-add-hotel-card">

            <div className="super-add-hotel-card-header">

              <div className="super-add-hotel-card-icon">
                <i className="bi bi-building"></i>
              </div>

              <div>
                <h2>Hotel Information</h2>
                <p>
                  Basic information about the hotel property.
                </p>
              </div>

            </div>


            <div className="super-add-hotel-grid">

              {/* HOTEL NAME */}
              <div className="super-add-hotel-field">

                <label>
                  Hotel Name
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.hotelName ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-building"></i>

                  <input
                    type="text"
                    name="hotelName"
                    placeholder="Enter hotel name"
                    value={formData.hotelName}
                    onChange={handleChange}
                  />
                </div>

                {errors.hotelName && (
                  <small>{errors.hotelName}</small>
                )}

              </div>


              {/* HOTEL ID */}
              <div className="super-add-hotel-field">

                <label>
                  Hotel ID
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.hotelCode ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-upc-scan"></i>

                  <input
                    type="text"
                    name="hotelCode"
                    placeholder="e.g. HOTEL-006"
                    value={formData.hotelCode}
                    onChange={handleChange}
                  />
                </div>

                {errors.hotelCode && (
                  <small>{errors.hotelCode}</small>
                )}

              </div>


              {/* EMAIL */}
              <div className="super-add-hotel-field">

                <label>
                  Hotel Email
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.email ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-envelope"></i>

                  <input
                    type="email"
                    name="email"
                    placeholder="hotel@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {errors.email && (
                  <small>{errors.email}</small>
                )}

              </div>


              {/* PHONE */}
              <div className="super-add-hotel-field">

                <label>
                  Hotel Phone
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.phone ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-telephone"></i>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {errors.phone && (
                  <small>{errors.phone}</small>
                )}

              </div>


              {/* ADDRESS */}
              <div className="super-add-hotel-field full">

                <label>
                  Address
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input textarea ${
                    errors.address ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-geo-alt"></i>

                  <textarea
                    name="address"
                    placeholder="Enter complete hotel address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>

                {errors.address && (
                  <small>{errors.address}</small>
                )}

              </div>


              {/* CITY */}
              <div className="super-add-hotel-field">

                <label>
                  City
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.city ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-buildings"></i>

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                {errors.city && (
                  <small>{errors.city}</small>
                )}

              </div>


              {/* STATE */}
              <div className="super-add-hotel-field">

                <label>
                  State
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.state ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-map"></i>

                  <input
                    type="text"
                    name="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                {errors.state && (
                  <small>{errors.state}</small>
                )}

              </div>


              {/* PINCODE */}
              <div className="super-add-hotel-field">

                <label>
                  Pincode
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.pincode ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-mailbox"></i>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>

                {errors.pincode && (
                  <small>{errors.pincode}</small>
                )}

              </div>


              {/* ROOMS */}
              <div className="super-add-hotel-field">

                <label>
                  Number of Rooms
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.rooms ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-door-open"></i>

                  <input
                    type="number"
                    min="1"
                    name="rooms"
                    placeholder="e.g. 50"
                    value={formData.rooms}
                    onChange={handleChange}
                  />
                </div>

                {errors.rooms && (
                  <small>{errors.rooms}</small>
                )}

              </div>

            </div>

          </section>


          {/* ===================================================
              MANAGER INFORMATION
          =================================================== */}
          <section className="super-add-hotel-card">

            <div className="super-add-hotel-card-header">

              <div className="super-add-hotel-card-icon plum">
                <i className="bi bi-person-badge"></i>
              </div>

              <div>
                <h2>Hotel Manager</h2>
                <p>
                  Assign the primary manager for this hotel.
                </p>
              </div>

            </div>


            <div className="super-add-hotel-grid">

              {/* MANAGER NAME */}
              <div className="super-add-hotel-field">

                <label>
                  Manager Name
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.managerName ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-person"></i>

                  <input
                    type="text"
                    name="managerName"
                    placeholder="Enter manager name"
                    value={formData.managerName}
                    onChange={handleChange}
                  />
                </div>

                {errors.managerName && (
                  <small>{errors.managerName}</small>
                )}

              </div>


              {/* MANAGER EMAIL */}
              <div className="super-add-hotel-field">

                <label>
                  Manager Email
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.managerEmail ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-envelope"></i>

                  <input
                    type="email"
                    name="managerEmail"
                    placeholder="manager@example.com"
                    value={formData.managerEmail}
                    onChange={handleChange}
                  />
                </div>

                {errors.managerEmail && (
                  <small>{errors.managerEmail}</small>
                )}

              </div>


              {/* MANAGER PHONE */}
              <div className="super-add-hotel-field">

                <label>
                  Manager Phone
                  <span>*</span>
                </label>

                <div
                  className={`super-add-hotel-input ${
                    errors.managerPhone ? "has-error" : ""
                  }`}
                >
                  <i className="bi bi-telephone"></i>

                  <input
                    type="tel"
                    name="managerPhone"
                    placeholder="+91 98765 43210"
                    value={formData.managerPhone}
                    onChange={handleChange}
                  />
                </div>

                {errors.managerPhone && (
                  <small>{errors.managerPhone}</small>
                )}

              </div>

            </div>

          </section>


          {/* ===================================================
              SUBSCRIPTION
          =================================================== */}
          <section className="super-add-hotel-card">

            <div className="super-add-hotel-card-header">

              <div className="super-add-hotel-card-icon gold">
                <i className="bi bi-credit-card"></i>
              </div>

              <div>
                <h2>Subscription & Status</h2>
                <p>
                  Configure the hotel's subscription plan and status.
                </p>
              </div>

            </div>


            <div className="super-add-hotel-grid">

              {/* PLAN */}
              <div className="super-add-hotel-field">

                <label>
                  Subscription Plan
                </label>

                <div className="super-add-hotel-select">

                  <i className="bi bi-layers"></i>

                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                  >
                    <option value="Basic">Basic Plan</option>
                    <option value="Premium">Premium Plan</option>
                    <option value="Enterprise">
                      Enterprise Plan
                    </option>
                  </select>

                </div>

              </div>


              {/* STATUS */}
              <div className="super-add-hotel-field">

                <label>
                  Hotel Status
                </label>

                <div className="super-add-hotel-select">

                  <i className="bi bi-toggle-on"></i>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                </div>

              </div>


              {/* DESCRIPTION */}
              <div className="super-add-hotel-field full">

                <label>
                  Hotel Description
                </label>

                <div className="super-add-hotel-input textarea">

                  <i className="bi bi-card-text"></i>

                  <textarea
                    name="description"
                    placeholder="Enter a short description about the hotel..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>

                </div>

              </div>

            </div>

          </section>


          {/* ===================================================
              FORM ACTIONS
          =================================================== */}
          <div className="super-add-hotel-actions">

            <button
              type="button"
              className="super-add-hotel-cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="super-add-hotel-submit-btn"
            >
              <i
                className={`bi ${
                  editMode
                    ? "bi-check2-circle"
                    : "bi-building-add"
                }`}
              ></i>

              {editMode
                ? "Update Hotel"
                : "Create Hotel"}
            </button>

          </div>

        </form>

      </div>
    </SuperAdminLayout>
  );
}

export default AddHotel;