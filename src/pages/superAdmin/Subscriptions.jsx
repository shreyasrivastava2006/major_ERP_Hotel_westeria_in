import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./Subscriptions.css";

// =====================================================
// STORAGE KEYS
// =====================================================

const SUBSCRIPTION_KEY = "wisteriaSubscriptions";
const PLANS_KEY = "wisteriaSubscriptionPlans";
const HOTELS_KEY = "wisteriaHotels";

// =====================================================
// DEFAULT PLANS
// =====================================================

const defaultPlans = [
  {
    id: 1,
    name: "Basic",
    price: 999,
    billingCycle: "Monthly",
    status: "Active",
  },
  {
    id: 2,
    name: "Premium",
    price: 2499,
    billingCycle: "Monthly",
    status: "Active",
  },
  {
    id: 3,
    name: "Enterprise",
    price: 4999,
    billingCycle: "Monthly",
    status: "Active",
  },
];

// =====================================================
// DEFAULT HOTELS
// =====================================================

const defaultHotels = [
  { id: 1, name: "Wisteria Grand" },
  { id: 2, name: "Wisteria Palace" },
  { id: 3, name: "Wisteria Residency" },
];

// =====================================================
// DATE HELPERS
// =====================================================

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const toDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const addBillingPeriod = (dateString, billingCycle) => {
  const date = new Date(`${dateString}T12:00:00`);

  if (billingCycle === "Yearly") {
    date.setFullYear(date.getFullYear() + 1);
  } else {
    date.setMonth(date.getMonth() + 1);
  }

  return toDateString(date);
};

const daysRemaining = (dateString) => {
  if (!dateString) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(`${dateString}T00:00:00`);

  return Math.ceil(
    (expiry.getTime() - today.getTime()) / 86400000
  );
};

// =====================================================
// CURRENCY
// =====================================================

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

// =====================================================
// INITIAL FORM
// =====================================================

const initialForm = {
  hotelId: "",
  planId: "",
  startDate: toDateString(new Date()),
  paymentStatus: "Paid",
  notes: "",
};

// =====================================================
// MAIN COMPONENT
// =====================================================

function Subscriptions() {
  const navigate = useNavigate();

  // =====================================================
  // LOAD PLANS
  // =====================================================

  const [plans, setPlans] = useState(() => {
    try {
      const saved = localStorage.getItem(PLANS_KEY);

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      console.error("Error loading plans:", error);
    }

    return defaultPlans;
  });

  // =====================================================
  // LOAD HOTELS
  // =====================================================

  const [hotels, setHotels] = useState(() => {
    try {
      const saved = localStorage.getItem(HOTELS_KEY);

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      console.error("Error loading hotels:", error);
    }

    return defaultHotels;
  });

  // =====================================================
  // LOAD SUBSCRIPTIONS
  // =====================================================

  const [subscriptions, setSubscriptions] = useState(() => {
    try {
      const saved = localStorage.getItem(SUBSCRIPTION_KEY);

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      console.error("Error loading subscriptions:", error);
    }

    return [];
  });

  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingSubscription, setEditingSubscription] =
    useState(null);

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  // =====================================================
  // REFRESH PLANS AND HOTELS
  // =====================================================

  useEffect(() => {
    const refreshData = () => {
      try {
        const savedPlans = localStorage.getItem(PLANS_KEY);
        const savedHotels = localStorage.getItem(HOTELS_KEY);

        if (savedPlans !== null) {
          const parsedPlans = JSON.parse(savedPlans);

          if (Array.isArray(parsedPlans)) {
            setPlans(parsedPlans);
          }
        }

        if (savedHotels !== null) {
          const parsedHotels = JSON.parse(savedHotels);

          if (Array.isArray(parsedHotels)) {
            setHotels(parsedHotels);
          }
        }
      } catch (error) {
        console.error("Error refreshing data:", error);
      }
    };

    window.addEventListener("focus", refreshData);
    window.addEventListener("storage", refreshData);

    return () => {
      window.removeEventListener("focus", refreshData);
      window.removeEventListener("storage", refreshData);
    };
  }, []);

  // =====================================================
  // SAVE SUBSCRIPTIONS
  // =====================================================

  const updateSubscriptions = (updated) => {
    setSubscriptions(updated);

    localStorage.setItem(
      SUBSCRIPTION_KEY,
      JSON.stringify(updated)
    );
  };

  // =====================================================
  // GET PLAN
  // =====================================================

  const getPlan = (planId) =>
    plans.find(
      (plan) => String(plan.id) === String(planId)
    );

  // =====================================================
  // GET HOTEL
  // =====================================================

  const getHotel = (hotelId) =>
    hotels.find(
      (hotel) => String(hotel.id) === String(hotelId)
    );

  // =====================================================
  // SUBSCRIPTION STATUS
  // =====================================================

  const getStatus = (subscription) => {
    if (subscription.status === "Cancelled") {
      return "Cancelled";
    }

    const remaining = daysRemaining(subscription.endDate);

    if (remaining < 0) return "Expired";

    if (remaining <= 7) return "Expiring Soon";

    return "Active";
  };

  // =====================================================
  // ENRICH SUBSCRIPTIONS
  // =====================================================

  const enrichedSubscriptions = useMemo(() => {
    return subscriptions.map((subscription) => {
      const plan = plans.find(
        (item) =>
          String(item.id) === String(subscription.planId)
      );

      const hotel = hotels.find(
        (item) =>
          String(item.id) === String(subscription.hotelId)
      );

      return {
        ...subscription,
        hotelName:
          hotel?.name ||
          subscription.hotelName ||
          "Unknown Hotel",
        planName:
          plan?.name ||
          subscription.planName ||
          "Unknown Plan",
        status: getStatus(subscription),
        remaining: daysRemaining(subscription.endDate),
      };
    });
  }, [subscriptions, plans, hotels]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const stats = useMemo(() => {
    const active = enrichedSubscriptions.filter(
      (item) =>
        item.status === "Active" ||
        item.status === "Expiring Soon"
    );

    const expired = enrichedSubscriptions.filter(
      (item) => item.status === "Expired"
    );

    const revenue = active.reduce((total, item) => {
      const plan = plans.find(
        (p) => String(p.id) === String(item.planId)
      );

      const price = Number(item.price ?? plan?.price ?? 0);
      const cycle = item.billingCycle || plan?.billingCycle;

      return total + (cycle === "Yearly" ? price / 12 : price);
    }, 0);

    return {
      total: enrichedSubscriptions.length,
      active: active.length,
      expired: expired.length,
      revenue,
    };
  }, [enrichedSubscriptions, plans]);

  // =====================================================
  // FILTER SUBSCRIPTIONS
  // =====================================================

  const filteredSubscriptions = useMemo(() => {
    return enrichedSubscriptions.filter((item) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        item.hotelName.toLowerCase().includes(query) ||
        item.planName.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesPlan =
        planFilter === "All" ||
        String(item.planId) === String(planFilter);

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [
    enrichedSubscriptions,
    search,
    statusFilter,
    planFilter,
  ]);

  // =====================================================
  // OPEN ASSIGN MODAL
  // =====================================================

  const handleAssign = () => {
    setEditingSubscription(null);
    setForm(initialForm);
    setError("");
    setShowModal(true);
  };

  // =====================================================
  // OPEN CHANGE PLAN MODAL
  // =====================================================

  const handleChangePlan = (subscription) => {
    setEditingSubscription(subscription);

    setForm({
      hotelId: String(subscription.hotelId),
      planId: String(subscription.planId),
      startDate: subscription.startDate,
      paymentStatus: subscription.paymentStatus || "Paid",
      notes: subscription.notes || "",
    });

    setError("");
    setShowModal(true);
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // SAVE SUBSCRIPTION
  // =====================================================

  const handleSave = (event) => {
    event.preventDefault();

    if (!form.hotelId || !form.planId || !form.startDate) {
      setError("Please complete all required fields.");
      return;
    }

    const selectedPlan = getPlan(form.planId);
    const selectedHotel = getHotel(form.hotelId);

    if (!selectedPlan || !selectedHotel) {
      setError("Please select a valid hotel and plan.");
      return;
    }

    if (selectedPlan.status !== "Active") {
      setError("This plan is inactive.");
      return;
    }

    const duplicate = subscriptions.some(
      (item) =>
        String(item.hotelId) === String(form.hotelId) &&
        item.id !== editingSubscription?.id &&
        getStatus(item) !== "Cancelled" &&
        getStatus(item) !== "Expired"
    );

    if (duplicate) {
      setError(
        "This hotel already has an active subscription."
      );
      return;
    }

    const endDate = addBillingPeriod(
      form.startDate,
      selectedPlan.billingCycle
    );

    const subscriptionData = {
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      price: Number(selectedPlan.price),
      billingCycle: selectedPlan.billingCycle,
      startDate: form.startDate,
      endDate,
      paymentStatus: form.paymentStatus,
      notes: form.notes.trim(),
      status: "Active",
    };

    if (editingSubscription) {
      const updated = subscriptions.map((item) =>
        item.id === editingSubscription.id
          ? {
              ...item,
              ...subscriptionData,
            }
          : item
      );

      updateSubscriptions(updated);
    } else {
      const newSubscription = {
        id: Date.now(),
        ...subscriptionData,
        createdAt: new Date().toISOString(),
      };

      updateSubscriptions([
        ...subscriptions,
        newSubscription,
      ]);
    }

    setShowModal(false);
    setEditingSubscription(null);
    setForm(initialForm);
  };

  // =====================================================
  // RENEW SUBSCRIPTION
  // =====================================================

  const handleRenew = (subscription) => {
    const plan = getPlan(subscription.planId);

    if (!plan || plan.status !== "Active") {
      alert("The selected plan is unavailable.");
      return;
    }

    const confirmed = window.confirm(
      `Renew subscription for ${subscription.hotelName}?`
    );

    if (!confirmed) return;

    const today = toDateString(new Date());

    const currentEnd = subscription.endDate;

    const startDate =
      daysRemaining(currentEnd) >= 0
        ? currentEnd
        : today;

    const newEndDate = addBillingPeriod(
      startDate,
      subscription.billingCycle || plan.billingCycle
    );

    const updated = subscriptions.map((item) =>
      item.id === subscription.id
        ? {
            ...item,
            startDate,
            endDate: newEndDate,
            status: "Active",
            renewedAt: new Date().toISOString(),
          }
        : item
    );

    updateSubscriptions(updated);
  };

  // =====================================================
  // CANCEL SUBSCRIPTION
  // =====================================================

  const handleCancel = (subscription) => {
    const confirmed = window.confirm(
      `Cancel subscription for ${subscription.hotelName}?`
    );

    if (!confirmed) return;

    const updated = subscriptions.map((item) =>
      item.id === subscription.id
        ? {
            ...item,
            status: "Cancelled",
            cancelledAt: new Date().toISOString(),
          }
        : item
    );

    updateSubscriptions(updated);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    setShowModal(false);
    setEditingSubscription(null);
    setError("");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SuperAdminLayout>
      <div className="super-subscriptions-page">

        {/* BREADCRUMB */}

        <div className="super-subscriptions-breadcrumb">
          <button
            onClick={() => navigate("/super-admin")}
          >
            Super Admin
          </button>

          <i className="bi bi-chevron-right"></i>

          <strong>Subscriptions</strong>
        </div>

        {/* HEADER */}

        <div className="super-subscriptions-header">
          <div>
            <span className="super-subscriptions-eyebrow">
              SUBSCRIPTION MANAGEMENT
            </span>

            <h1>Hotel Subscriptions</h1>

            <p>
              Manage hotel subscription plans, renewals,
              billing cycles and account status.
            </p>
          </div>

          <div className="super-subscriptions-header-actions">
            <button
              className="super-subscriptions-back-btn"
              onClick={() => navigate("/super-admin")}
            >
              <i className="bi bi-arrow-left"></i>
              Dashboard
            </button>

            <button
              className="super-subscriptions-add-btn"
              onClick={handleAssign}
            >
              <i className="bi bi-plus-lg"></i>
              Assign Subscription
            </button>
          </div>
        </div>

        {/* STATISTICS */}

        <div className="super-subscriptions-stats">

          <div className="super-subscriptions-stat-card">
            <div className="super-subscriptions-stat-icon gold">
              <i className="bi bi-credit-card-2-front"></i>
            </div>

            <div className="super-subscriptions-stat-content">
              <span>Total Subscriptions</span>
              <strong>{stats.total}</strong>
              <small>All subscription records</small>
            </div>
          </div>

          <div className="super-subscriptions-stat-card">
            <div className="super-subscriptions-stat-icon green">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div className="super-subscriptions-stat-content">
              <span>Active Subscriptions</span>
              <strong>{stats.active}</strong>
              <small>Currently subscribed hotels</small>
            </div>
          </div>

          <div className="super-subscriptions-stat-card">
            <div className="super-subscriptions-stat-icon rose">
              <i className="bi bi-exclamation-circle-fill"></i>
            </div>

            <div className="super-subscriptions-stat-content">
              <span>Expired Subscriptions</span>
              <strong>{stats.expired}</strong>
              <small>Require renewal</small>
            </div>
          </div>

          <div className="super-subscriptions-stat-card">
            <div className="super-subscriptions-stat-icon purple">
              <i className="bi bi-currency-rupee"></i>
            </div>

            <div className="super-subscriptions-stat-content">
              <span>Monthly Revenue</span>
              <strong>{formatCurrency(stats.revenue)}</strong>
              <small>Estimated recurring revenue</small>
            </div>
          </div>

        </div>

        {/* FILTERS */}

        <div className="super-subscriptions-filter-card">
          <div className="super-subscriptions-filter-title">
            <div className="super-subscriptions-filter-icon">
              <i className="bi bi-funnel"></i>
            </div>

            <div>
              <strong>Subscription Directory</strong>
              <span>Search and manage hotel subscriptions</span>
            </div>
          </div>

          <div className="super-subscriptions-filter-controls">
            <div className="super-subscriptions-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search hotel or plan..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Expiring Soon">Expiring Soon</option>
              <option value="Expired">Expired</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={planFilter}
              onChange={(event) =>
                setPlanFilter(event.target.value)
              }
            >
              <option value="All">All Plans</option>

              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>

            <button
              className="super-subscriptions-clear-btn"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setPlanFilter("All");
              }}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Clear
            </button>
          </div>
        </div>

        {/* TABLE SECTION */}

        <div className="super-subscriptions-table-card">

          <div className="super-subscriptions-table-header">
            <div>
              <span>HOTEL SUBSCRIPTIONS</span>
              <h2>Subscription Records</h2>
              <p>
                Showing {filteredSubscriptions.length} of{" "}
                {subscriptions.length} subscriptions
              </p>
            </div>

            <button
              className="super-subscriptions-manage-plans"
              onClick={() => navigate("/super-admin/plans")}
            >
              <i className="bi bi-layers"></i>
              Manage Plans
            </button>
          </div>

          <div className="super-subscriptions-table-wrapper">
            <table className="super-subscriptions-table">
              <thead>
                <tr>
                  <th>HOTEL</th>
                  <th>SUBSCRIPTION PLAN</th>
                  <th>AMOUNT</th>
                  <th>START DATE</th>
                  <th>EXPIRY DATE</th>
                  <th>STATUS</th>
                  <th>PAYMENT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubscriptions.length > 0 ? (
                  filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.id}>
                      <td>
                        <div className="super-subscriptions-hotel">
                          <div className="super-subscriptions-hotel-icon">
                            <i className="bi bi-building"></i>
                          </div>

                          <div>
                            <strong>
                              {subscription.hotelName}
                            </strong>

                            <span>
                              ID: {subscription.hotelId}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="super-subscriptions-plan-badge">
                          <i className="bi bi-gem"></i>
                          {subscription.planName}
                        </span>
                      </td>

                      <td>
                        <div className="super-subscriptions-amount">
                          <strong>
                            {formatCurrency(subscription.price)}
                          </strong>

                          <span>
                            /{" "}
                            {subscription.billingCycle === "Yearly"
                              ? "year"
                              : "month"}
                          </span>
                        </div>
                      </td>

                      <td>{formatDate(subscription.startDate)}</td>

                      <td>
                        <div className="super-subscriptions-expiry">
                          <strong>
                            {formatDate(subscription.endDate)}
                          </strong>

                          {subscription.status === "Expiring Soon" && (
                            <span>
                              {subscription.remaining} days left
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`super-subscriptions-status ${
                            subscription.status
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                          }`}
                        >
                          <span className="status-dot"></span>
                          {subscription.status}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`super-subscriptions-payment ${
                            subscription.paymentStatus === "Paid"
                              ? "paid"
                              : "pending"
                          }`}
                        >
                          {subscription.paymentStatus}
                        </span>
                      </td>

                      <td>
                        <div className="super-subscriptions-actions">
                          <button
                            className="edit"
                            title="Change Plan"
                            onClick={() =>
                              handleChangePlan(subscription)
                            }
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>

                          <button
                            className="renew"
                            title="Renew Subscription"
                            disabled={
                              subscription.status === "Cancelled"
                            }
                            onClick={() =>
                              handleRenew(subscription)
                            }
                          >
                            <i className="bi bi-arrow-repeat"></i>
                          </button>

                          <button
                            className="cancel"
                            title="Cancel Subscription"
                            disabled={
                              subscription.status === "Cancelled"
                            }
                            onClick={() =>
                              handleCancel(subscription)
                            }
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="super-subscriptions-empty">
                        <i className="bi bi-credit-card"></i>
                        <h3>No Subscriptions Found</h3>
                        <p>
                          Assign a subscription to a hotel
                          to get started.
                        </p>

                        <button onClick={handleAssign}>
                          <i className="bi bi-plus-lg"></i>
                          Assign Subscription
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ASSIGN / EDIT MODAL */}

        {showModal && (
          <div
            className="super-subscriptions-modal-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              className="super-subscriptions-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="subscription-modal-title"
            >
              <div className="super-subscriptions-modal-header">
                <div>
                  <span>SUBSCRIPTION MANAGEMENT</span>

                  <h2 id="subscription-modal-title">
                    {editingSubscription
                      ? "Change Subscription"
                      : "Assign Subscription"}
                  </h2>

                  <p>
                    {editingSubscription
                      ? "Update the hotel's subscription plan."
                      : "Assign a subscription package to a hotel."}
                  </p>
                </div>

                <button
                  className="super-subscriptions-modal-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <form onSubmit={handleSave}>
                <div className="super-subscriptions-modal-body">
                  {error && (
                    <div className="super-subscriptions-form-error">
                      {error}
                    </div>
                  )}

                  <div className="super-subscriptions-form-grid">
                    <div className="super-subscriptions-form-field">
                      <label>Assign Hotel *</label>

                      <select
                        name="hotelId"
                        value={form.hotelId}
                        onChange={handleChange}
                        disabled={Boolean(editingSubscription)}
                        required
                      >
                        <option value="">Select Hotel</option>

                        {hotels.map((hotel) => (
                          <option key={hotel.id} value={hotel.id}>
                            {hotel.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="super-subscriptions-form-field">
                      <label>Subscription Plan *</label>

                      <select
                        name="planId"
                        value={form.planId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Plan</option>

                        {plans
                          .filter(
                            (plan) =>
                              plan.status === "Active" ||
                              String(plan.id) === String(form.planId)
                          )
                          .map((plan) => (
                            <option key={plan.id} value={plan.id}>
                              {plan.name} -{" "}
                              {formatCurrency(plan.price)}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="super-subscriptions-form-field">
                      <label>Start Date *</label>

                      <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="super-subscriptions-form-field">
                      <label>Payment Status</label>

                      <select
                        name="paymentStatus"
                        value={form.paymentStatus}
                        onChange={handleChange}
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>

                    <div className="super-subscriptions-form-field full">
                      <label>Additional Notes</label>

                      <textarea
                        name="notes"
                        rows="3"
                        placeholder="Enter subscription notes..."
                        value={form.notes}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {form.planId && getPlan(form.planId) && (
                    <div className="super-subscriptions-plan-preview">
                      <div>
                        <span>SELECTED PLAN</span>

                        <strong>
                          {getPlan(form.planId).name}
                        </strong>
                      </div>

                      <div>
                        <span>SUBSCRIPTION PRICE</span>

                        <strong>
                          {formatCurrency(
                            getPlan(form.planId).price
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>BILLING CYCLE</span>

                        <strong>
                          {getPlan(form.planId).billingCycle}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                <div className="super-subscriptions-modal-footer">
                  <button
                    type="button"
                    className="super-subscriptions-cancel-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="super-subscriptions-save-btn"
                  >
                    <i className="bi bi-check-circle"></i>

                    {editingSubscription
                      ? "Save Changes"
                      : "Assign Subscription"}
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

export default Subscriptions;