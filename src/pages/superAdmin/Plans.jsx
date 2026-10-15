import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./Plans.css";

// =====================================================
// DEFAULT SUBSCRIPTION PLANS
// =====================================================

const defaultPlans = [
  {
    id: 1,
    name: "Basic",
    subtitle: "Essential Hotel Management",
    description:
      "Perfect for small hotels starting their digital management journey.",
    price: 999,
    billingCycle: "Monthly",
    status: "Active",
    subscribers: 12,
    popular: false,
    features: [
      "Room Management",
      "Guest Management",
      "Reservation Management",
      "Basic Dashboard",
      "Email Support",
    ],
  },
  {
    id: 2,
    name: "Premium",
    subtitle: "Advanced Hotel Operations",
    description:
      "Designed for growing hotels requiring advanced operational tools.",
    price: 2499,
    billingCycle: "Monthly",
    status: "Active",
    subscribers: 24,
    popular: true,
    features: [
      "All Basic Features",
      "Restaurant Management",
      "Housekeeping Management",
      "Billing & Invoices",
      "Inventory Management",
      "Advanced Reports",
      "Priority Support",
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    subtitle: "Complete Hotel ERP Solution",
    description:
      "A comprehensive solution for large hotels and hotel chains.",
    price: 4999,
    billingCycle: "Monthly",
    status: "Active",
    subscribers: 8,
    popular: false,
    features: [
      "All Premium Features",
      "Multi-Hotel Management",
      "Staff Management",
      "Maintenance Management",
      "Revenue Analytics",
      "Custom Reports",
      "Dedicated Support",
      "Unlimited Users",
    ],
  },
];

// =====================================================
// INITIAL FORM
// =====================================================

const initialForm = {
  name: "",
  subtitle: "",
  description: "",
  price: "",
  billingCycle: "Monthly",
  status: "Active",
  features: "",
  popular: false,
};

// =====================================================
// CURRENCY FORMAT
// =====================================================

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// =====================================================
// MAIN COMPONENT
// =====================================================

function Plans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState(() => {
    try {
      const saved = localStorage.getItem("wisteriaSubscriptionPlans");

      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      console.error("Unable to load plans:", error);
    }

    return defaultPlans;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  // =====================================================
  // SAVE PLANS
  // =====================================================

  const updatePlans = (updatedPlans) => {
    setPlans(updatedPlans);

    localStorage.setItem(
      "wisteriaSubscriptionPlans",
      JSON.stringify(updatedPlans)
    );
  };

  // =====================================================
  // STATISTICS
  // =====================================================

  const stats = useMemo(() => {
    const activePlans = plans.filter(
      (plan) => plan.status === "Active"
    );

    const subscribers = plans.reduce(
      (total, plan) => total + Number(plan.subscribers || 0),
      0
    );

    const monthlyRevenue = activePlans.reduce((total, plan) => {
      const monthlyPrice =
        plan.billingCycle === "Yearly"
          ? Number(plan.price) / 12
          : Number(plan.price);

      return total + monthlyPrice * Number(plan.subscribers || 0);
    }, 0);

    return {
      total: plans.length,
      active: activePlans.length,
      subscribers,
      revenue: monthlyRevenue,
    };
  }, [plans]);

  // =====================================================
  // FILTER PLANS
  // =====================================================

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        plan.name.toLowerCase().includes(query) ||
        plan.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || plan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [plans, search, statusFilter]);

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const handleAddPlan = () => {
    setEditingPlan(null);
    setForm(initialForm);
    setError("");
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);

    setForm({
      name: plan.name,
      subtitle: plan.subtitle,
      description: plan.description,
      price: String(plan.price),
      billingCycle: plan.billingCycle,
      status: plan.status,
      features: plan.features.join("\n"),
      popular: plan.popular,
    });

    setError("");
    setShowModal(true);
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  // =====================================================
  // SAVE PLAN
  // =====================================================

  const handleSavePlan = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      form.price === "" ||
      !form.features.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!Number.isFinite(Number(form.price)) || Number(form.price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    const featuresArray = form.features
      .split("\n")
      .map((feature) => feature.trim())
      .filter(Boolean);

    if (featuresArray.length === 0) {
      setError("Please add at least one feature.");
      return;
    }

    const duplicatePlan = plans.some(
      (plan) =>
        plan.name.toLowerCase() === form.name.trim().toLowerCase() &&
        plan.id !== editingPlan?.id
    );

    if (duplicatePlan) {
      setError("A plan with this name already exists.");
      return;
    }

    const planData = {
      name: form.name.trim(),
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      billingCycle: form.billingCycle,
      status: form.status,
      popular: form.popular,
      features: featuresArray,
    };

    if (editingPlan) {
      const updated = plans.map((plan) =>
        plan.id === editingPlan.id
          ? { ...plan, ...planData }
          : plan
      );

      updatePlans(updated);
    } else {
      const newPlan = {
        id: Date.now(),
        ...planData,
        subscribers: 0,
      };

      updatePlans([...plans, newPlan]);
    }

    setShowModal(false);
    setEditingPlan(null);
    setForm(initialForm);
  };

  // =====================================================
  // TOGGLE PLAN STATUS
  // =====================================================

  const toggleStatus = (id) => {
    const updated = plans.map((plan) =>
      plan.id === id
        ? {
            ...plan,
            status:
              plan.status === "Active" ? "Inactive" : "Active",
          }
        : plan
    );

    updatePlans(updated);
  };

  // =====================================================
  // DELETE PLAN
  // =====================================================

  const handleDeletePlan = (plan) => {
    if (Number(plan.subscribers) > 0) {
      alert(
        "This plan has subscribers. Reassign them before deleting the plan."
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete the "${plan.name}" plan?`
    );

    if (!confirmed) return;

    updatePlans(plans.filter((item) => item.id !== plan.id));
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    setShowModal(false);
    setEditingPlan(null);
    setError("");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SuperAdminLayout>
      <div className="super-plans-page">

        {/* BREADCRUMB */}

        <div className="super-plans-breadcrumb">
          <button
            type="button"
            onClick={() => navigate("/super-admin")}
          >
            Super Admin
          </button>

          <i className="bi bi-chevron-right"></i>

          <strong>Subscription Plans</strong>
        </div>

        {/* HEADER */}

        <div className="super-plans-header">
          <div>
            <span className="super-plans-eyebrow">
              SUBSCRIPTION MANAGEMENT
            </span>

            <h1>Subscription Plans</h1>

            <p>
              Create, manage and customize subscription
              packages for Wisteria In hotels.
            </p>
          </div>

          <div className="super-plans-header-actions">
            <button
              type="button"
              className="super-plans-back-btn"
              onClick={() => navigate("/super-admin")}
            >
              <i className="bi bi-arrow-left"></i>
              Back to Dashboard
            </button>

            <button
              type="button"
              className="super-plans-add-btn"
              onClick={handleAddPlan}
            >
              <i className="bi bi-plus-lg"></i>
              Add New Plan
            </button>
          </div>
        </div>

        {/* STATISTICS */}

        <div className="super-plans-stats">

          <div className="super-plans-stat-card">
            <div className="super-plans-stat-icon gold">
              <i className="bi bi-layers-fill"></i>
            </div>

            <div className="super-plans-stat-content">
              <span>Total Plans</span>
              <strong>{stats.total}</strong>
              <small>Available packages</small>
            </div>
          </div>

          <div className="super-plans-stat-card">
            <div className="super-plans-stat-icon green">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div className="super-plans-stat-content">
              <span>Active Plans</span>
              <strong>{stats.active}</strong>
              <small>Currently available</small>
            </div>
          </div>

          <div className="super-plans-stat-card">
            <div className="super-plans-stat-icon purple">
              <i className="bi bi-people-fill"></i>
            </div>

            <div className="super-plans-stat-content">
              <span>Total Subscribers</span>
              <strong>{stats.subscribers}</strong>
              <small>Demo hotel subscriptions</small>
            </div>
          </div>

          <div className="super-plans-stat-card">
            <div className="super-plans-stat-icon rose">
              <i className="bi bi-currency-rupee"></i>
            </div>

            <div className="super-plans-stat-content">
              <span>Monthly Revenue</span>
              <strong>{formatCurrency(stats.revenue)}</strong>
              <small>Estimated recurring revenue</small>
            </div>
          </div>

        </div>

        {/* FILTER BAR */}

        <div className="super-plans-filter-card">
          <div className="super-plans-filter-title">
            <div className="super-plans-filter-icon">
              <i className="bi bi-funnel"></i>
            </div>

            <div>
              <strong>Manage Plans</strong>
              <span>Search and filter subscription packages</span>
            </div>
          </div>

          <div className="super-plans-filter-controls">
            <div className="super-plans-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search subscription plans..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <select
              className="super-plans-select"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button
              type="button"
              className="super-plans-clear-btn"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Clear
            </button>
          </div>
        </div>

        {/* PLANS SECTION */}

        <div className="super-plans-section-heading">
          <div>
            <span>AVAILABLE PACKAGES</span>
            <h2>All Subscription Plans</h2>
            <p>
              Showing {filteredPlans.length} of {plans.length} plans
            </p>
          </div>

          <div className="super-plans-count">
            <i className="bi bi-grid"></i>
            {filteredPlans.length} Plans
          </div>
        </div>

        {/* PLAN CARDS */}

        <div className="super-plans-grid">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={`super-plan-card ${
                  plan.popular ? "popular" : ""
                }`}
              >
                {plan.popular && (
                  <div className="super-plan-popular-badge">
                    <i className="bi bi-star-fill"></i>
                    Most Popular
                  </div>
                )}

                <div className="super-plan-card-top">
                  <div className="super-plan-icon">
                    <i
                      className={`bi ${
                        plan.name.toLowerCase() === "basic"
                          ? "bi-building"
                          : plan.name.toLowerCase() === "premium"
                          ? "bi-gem"
                          : "bi-buildings"
                      }`}
                    ></i>
                  </div>

                  <span
                    className={`super-plan-status ${
                      plan.status === "Active"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    <span className="status-dot"></span>
                    {plan.status}
                  </span>
                </div>

                <div className="super-plan-heading">
                  <h3>{plan.name}</h3>
                  <span>{plan.subtitle}</span>
                </div>

                <p className="super-plan-description">
                  {plan.description}
                </p>

                <div className="super-plan-pricing">
                  <strong>{formatCurrency(plan.price)}</strong>

                  <span>
                    / {plan.billingCycle === "Yearly" ? "year" : "month"}
                  </span>
                </div>

                <div className="super-plan-subscribers">
                  <i className="bi bi-people"></i>
                  <strong>{plan.subscribers}</strong>
                  <span>Subscribed Hotels</span>
                </div>

                <div className="super-plan-divider"></div>

                <div className="super-plan-features">
                  <h4>INCLUDED FEATURES</h4>

                  <ul>
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <i className="bi bi-check-circle-fill"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="super-plan-card-actions">
                  <button
                    type="button"
                    className="super-plan-edit-btn"
                    onClick={() => handleEditPlan(plan)}
                  >
                    <i className="bi bi-pencil-square"></i>
                    Edit Plan
                  </button>

                  <button
                    type="button"
                    className={`super-plan-toggle-btn ${
                      plan.status === "Active" ? "deactivate" : "activate"
                    }`}
                    onClick={() => toggleStatus(plan.id)}
                    title={
                      plan.status === "Active"
                        ? "Deactivate Plan"
                        : "Activate Plan"
                    }
                  >
                    <i
                      className={`bi ${
                        plan.status === "Active"
                          ? "bi-pause-circle"
                          : "bi-play-circle"
                      }`}
                    ></i>
                  </button>

                  <button
                    type="button"
                    className="super-plan-delete-btn"
                    onClick={() => handleDeletePlan(plan)}
                    title="Delete Plan"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="super-plans-empty">
              <i className="bi bi-inbox"></i>
              <h3>No Plans Found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        {/* ADD / EDIT MODAL */}

        {showModal && (
          <div
            className="super-plan-modal-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              className="super-plan-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="super-plan-modal-title"
            >
              <div className="super-plan-modal-header">
                <div>
                  <span>SUBSCRIPTION MANAGEMENT</span>

                  <h2 id="super-plan-modal-title">
                    {editingPlan ? "Edit Plan" : "Add New Plan"}
                  </h2>

                  <p>
                    {editingPlan
                      ? "Update the selected subscription package."
                      : "Create a new subscription package for hotels."}
                  </p>
                </div>

                <button
                  type="button"
                  className="super-plan-modal-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <form onSubmit={handleSavePlan}>
                <div className="super-plan-modal-body">

                  {error && (
                    <div className="super-plan-form-error">
                      {error}
                    </div>
                  )}

                  <div className="super-plan-form-grid">
                    <div className="super-plan-form-field">
                      <label>Plan Name *</label>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Business"
                        required
                      />
                    </div>

                    <div className="super-plan-form-field">
                      <label>Plan Subtitle</label>

                      <input
                        type="text"
                        name="subtitle"
                        value={form.subtitle}
                        onChange={handleChange}
                        placeholder="e.g. Advanced Hotel Solution"
                      />
                    </div>

                    <div className="super-plan-form-field">
                      <label>Price (₹) *</label>

                      <input
                        type="number"
                        name="price"
                        min="0"
                        step="1"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Enter plan price"
                        required
                      />
                    </div>

                    <div className="super-plan-form-field">
                      <label>Billing Cycle</label>

                      <select
                        name="billingCycle"
                        value={form.billingCycle}
                        onChange={handleChange}
                      >
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>

                    <div className="super-plan-form-field">
                      <label>Plan Status</label>

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="super-plan-form-field">
                      <label>Plan Highlight</label>

                      <label className="super-plan-checkbox">
                        <input
                          type="checkbox"
                          name="popular"
                          checked={form.popular}
                          onChange={handleChange}
                        />
                        Mark as Most Popular
                      </label>
                    </div>

                    <div className="super-plan-form-field full">
                      <label>Description *</label>

                      <textarea
                        name="description"
                        rows="3"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the subscription plan..."
                        required
                      />
                    </div>

                    <div className="super-plan-form-field full">
                      <label>Included Features *</label>

                      <textarea
                        name="features"
                        rows="6"
                        value={form.features}
                        onChange={handleChange}
                        placeholder={
                          "Room Management\nGuest Management\nReservations\nBilling"
                        }
                        required
                      />

                      <small>
                        Enter one feature per line.
                      </small>
                    </div>
                  </div>
                </div>

                <div className="super-plan-modal-footer">
                  <button
                    type="button"
                    className="super-plan-cancel-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="super-plan-save-btn"
                  >
                    <i className="bi bi-check2-circle"></i>
                    {editingPlan ? "Save Changes" : "Create Plan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </SuperAdminLayout>
  );
}

export default Plans;