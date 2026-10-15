import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./Support.css";

// =====================================================
// STORAGE KEYS
// =====================================================

const SUPPORT_KEY = "wisteriaSupportTickets";
const HOTELS_KEY = "wisteriaHotels";

// =====================================================
// DEFAULT HOTELS
// =====================================================

const defaultHotels = [
  {
    id: 1,
    name: "Wisteria Grand",
  },
  {
    id: 2,
    name: "Wisteria Palace",
  },
  {
    id: 3,
    name: "Wisteria Residency",
  },
];

// =====================================================
// HELPERS
// =====================================================

const readStorage = (key, fallback = []) => {
  try {
    const saved = localStorage.getItem(key);

    if (saved !== null) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
  }

  return fallback;
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const createTicketId = () => {
  return `TKT-${Date.now()}`;
};

const initialForm = {
  hotelId: "",
  subject: "",
  category: "Technical Issue",
  priority: "Medium",
  description: "",
  status: "Open",
  assignedTo: "",
  notes: "",
};

// =====================================================
// MAIN COMPONENT
// =====================================================

function Support() {
  const navigate = useNavigate();

  // =====================================================
  // DATA
  // =====================================================

  const [tickets, setTickets] = useState(() =>
    readStorage(SUPPORT_KEY)
  );

  const [hotels] = useState(() =>
    readStorage(HOTELS_KEY, defaultHotels)
  );

  // =====================================================
  // FILTERS
  // =====================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // =====================================================
  // MODAL
  // =====================================================

  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [viewTicket, setViewTicket] = useState(null);

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  // =====================================================
  // SAVE TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      SUPPORT_KEY,
      JSON.stringify(tickets)
    );
  }, [tickets]);

  // =====================================================
  // FILTERED TICKETS
  // =====================================================

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        String(ticket.id).toLowerCase().includes(query) ||
        String(ticket.hotelName || "")
          .toLowerCase()
          .includes(query) ||
        String(ticket.subject || "")
          .toLowerCase()
          .includes(query) ||
        String(ticket.category || "")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        ticket.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const stats = useMemo(() => {
    return {
      total: tickets.length,

      open: tickets.filter(
        (ticket) => ticket.status === "Open"
      ).length,

      progress: tickets.filter(
        (ticket) => ticket.status === "In Progress"
      ).length,

      resolved: tickets.filter(
        (ticket) => ticket.status === "Resolved"
      ).length,
    };
  }, [tickets]);

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const handleAddTicket = () => {
    setEditingTicket(null);
    setForm({ ...initialForm });
    setError("");
    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);

    setForm({
      hotelId: String(ticket.hotelId || ""),
      subject: ticket.subject || "",
      category: ticket.category || "Technical Issue",
      priority: ticket.priority || "Medium",
      description: ticket.description || "",
      status: ticket.status || "Open",
      assignedTo: ticket.assignedTo || "",
      notes: ticket.notes || "",
    });

    setError("");
    setViewTicket(null);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTicket(null);
    setError("");
  };

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // =====================================================
  // SAVE TICKET
  // =====================================================

  const handleSaveTicket = (event) => {
    event.preventDefault();

    if (!form.hotelId) {
      setError("Please select a hotel.");
      return;
    }

    if (!form.subject.trim()) {
      setError("Please enter ticket subject.");
      return;
    }

    if (!form.description.trim()) {
      setError("Please enter ticket description.");
      return;
    }

    const selectedHotel = hotels.find(
      (hotel) =>
        String(hotel.id) === String(form.hotelId)
    );

    if (!selectedHotel) {
      setError("Selected hotel was not found.");
      return;
    }

    const now = new Date().toISOString();

    if (editingTicket) {
      const updatedTicket = {
        ...editingTicket,

        hotelId: form.hotelId,
        hotelName: selectedHotel.name,

        subject: form.subject.trim(),
        category: form.category,
        priority: form.priority,
        description: form.description.trim(),
        status: form.status,
        assignedTo: form.assignedTo.trim(),
        notes: form.notes.trim(),

        updatedAt: now,
      };

      setTickets((previous) =>
        previous.map((ticket) =>
          ticket.id === editingTicket.id
            ? updatedTicket
            : ticket
        )
      );
    } else {
      const newTicket = {
        id: createTicketId(),

        hotelId: form.hotelId,
        hotelName: selectedHotel.name,

        subject: form.subject.trim(),
        category: form.category,
        priority: form.priority,
        description: form.description.trim(),
        status: form.status,
        assignedTo: form.assignedTo.trim(),
        notes: form.notes.trim(),

        createdAt: now,
        updatedAt: now,
      };

      setTickets((previous) => [
        newTicket,
        ...previous,
      ]);
    }

    handleCloseModal();
  };

  // =====================================================
  // CHANGE STATUS
  // =====================================================

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : ticket
      )
    );

    setViewTicket((previous) =>
      previous?.id === ticketId
        ? {
            ...previous,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          }
        : previous
    );
  };

  // =====================================================
  // DELETE TICKET
  // =====================================================

  const handleDeleteTicket = (ticketId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this support ticket?"
    );

    if (!confirmed) return;

    setTickets((previous) =>
      previous.filter(
        (ticket) => ticket.id !== ticketId
      )
    );

    setViewTicket(null);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SuperAdminLayout>
      <div className="super-support-page">

        {/* ================= BREADCRUMB ================= */}

        <div className="super-support-breadcrumb">
          <button
            type="button"
            onClick={() => navigate("/super-admin")}
          >
            Super Admin
          </button>

          <i className="bi bi-chevron-right"></i>

          <span>System</span>

          <i className="bi bi-chevron-right"></i>

          <strong>Support</strong>
        </div>

        {/* ================= HEADER ================= */}

        <div className="super-support-header">
          <div>
            <span className="super-support-eyebrow">
              SUPER ADMIN SUPPORT CENTER
            </span>

            <h1>Support Management</h1>

            <p>
              Manage hotel support requests, resolve
              issues and monitor ticket progress.
            </p>
          </div>

          <div className="super-support-header-actions">
            <button
              type="button"
              className="super-support-back-btn"
              onClick={() => navigate("/super-admin")}
            >
              <i className="bi bi-arrow-left"></i>
              Dashboard
            </button>

            <button
              type="button"
              className="super-support-add-btn"
              onClick={handleAddTicket}
            >
              <i className="bi bi-plus-lg"></i>
              Create Ticket
            </button>
          </div>
        </div>

        {/* ================= STATISTICS ================= */}

        <div className="super-support-stats">

          <div className="super-support-stat-card">
            <div className="super-support-stat-icon gold">
              <i className="bi bi-ticket-perforated"></i>
            </div>

            <div className="super-support-stat-content">
              <span>Total Tickets</span>
              <strong>{stats.total}</strong>
              <small>All support requests</small>
            </div>
          </div>

          <div className="super-support-stat-card">
            <div className="super-support-stat-icon rose">
              <i className="bi bi-envelope-open"></i>
            </div>

            <div className="super-support-stat-content">
              <span>Open Tickets</span>
              <strong>{stats.open}</strong>
              <small>Awaiting action</small>
            </div>
          </div>

          <div className="super-support-stat-card">
            <div className="super-support-stat-icon purple">
              <i className="bi bi-arrow-repeat"></i>
            </div>

            <div className="super-support-stat-content">
              <span>In Progress</span>
              <strong>{stats.progress}</strong>
              <small>Currently being handled</small>
            </div>
          </div>

          <div className="super-support-stat-card">
            <div className="super-support-stat-icon green">
              <i className="bi bi-check-circle"></i>
            </div>

            <div className="super-support-stat-content">
              <span>Resolved Tickets</span>
              <strong>{stats.resolved}</strong>
              <small>Successfully resolved</small>
            </div>
          </div>

        </div>

        {/* ================= FILTERS ================= */}

        <div className="super-support-filter-card">
          <div className="super-support-filter-heading">
            <div className="super-support-filter-icon">
              <i className="bi bi-funnel"></i>
            </div>

            <div>
              <strong>Ticket Filters</strong>
              <span>
                Search and filter support requests
              </span>
            </div>
          </div>

          <div className="super-support-filter-controls">
            <div className="super-support-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search ticket or hotel..."
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
              <option value="Open">Open</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
            >
              <option value="All">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>

            <button
              type="button"
              className="super-support-clear-btn"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setPriorityFilter("All");
              }}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Clear
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="super-support-table-card">
          <div className="super-support-table-header">
            <div>
              <span>SUPPORT REQUESTS</span>

              <h2>Support Tickets</h2>

              <p>
                Showing {filteredTickets.length} of{" "}
                {tickets.length} tickets
              </p>
            </div>

            <div className="super-support-table-count">
              <i className="bi bi-ticket-perforated"></i>
              {tickets.length} Tickets
            </div>
          </div>

          <div className="super-support-table-wrapper">
            <table className="super-support-table">
              <thead>
                <tr>
                  <th>TICKET ID</th>
                  <th>HOTEL</th>
                  <th>SUBJECT</th>
                  <th>CATEGORY</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                  <th>CREATED DATE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr key={ticket.id}>

                      <td>
                        <strong className="super-support-ticket-id">
                          {ticket.id}
                        </strong>
                      </td>

                      <td>
                        <div className="super-support-hotel-cell">
                          <div className="super-support-hotel-icon">
                            <i className="bi bi-building"></i>
                          </div>

                          <strong>{ticket.hotelName}</strong>
                        </div>
                      </td>

                      <td>
                        <div className="super-support-subject-cell">
                          <strong>{ticket.subject}</strong>

                          <span>
                            {ticket.description.length > 55
                              ? `${ticket.description.slice(0, 55)}...`
                              : ticket.description}
                          </span>
                        </div>
                      </td>

                      <td>{ticket.category}</td>

                      <td>
                        <span
                          className={`super-support-priority ${ticket.priority.toLowerCase()}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`super-support-status ${ticket.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          <span className="status-dot"></span>
                          {ticket.status}
                        </span>
                      </td>

                      <td>{formatDate(ticket.createdAt)}</td>

                      <td>
                        <div className="super-support-actions">

                          <button
                            type="button"
                            className="view"
                            title="View Ticket"
                            onClick={() => setViewTicket(ticket)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>

                          <button
                            type="button"
                            className="edit"
                            title="Edit Ticket"
                            onClick={() => handleEditTicket(ticket)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>

                          <button
                            type="button"
                            className="delete"
                            title="Delete Ticket"
                            onClick={() =>
                              handleDeleteTicket(ticket.id)
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="super-support-empty">
                        <i className="bi bi-headset"></i>

                        <h3>No Support Tickets Found</h3>

                        <p>
                          Create a support ticket or adjust
                          the selected filters.
                        </p>

                        <button
                          type="button"
                          onClick={handleAddTicket}
                        >
                          <i className="bi bi-plus-lg"></i>
                          Create Ticket
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= ADD / EDIT MODAL ================= */}

        {showModal && (
          <div
            className="super-support-modal-overlay"
            onClick={handleCloseModal}
          >
            <div
              className="super-support-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Support Ticket Form"
              onClick={(event) => event.stopPropagation()}
            >

              <div className="super-support-modal-header">
                <div>
                  <span>SUPPORT MANAGEMENT</span>

                  <h2>
                    {editingTicket
                      ? "Update Support Ticket"
                      : "Create Support Ticket"}
                  </h2>

                  <p>
                    Enter the details of the hotel
                    support request.
                  </p>
                </div>

                <button
                  type="button"
                  className="super-support-modal-close"
                  onClick={handleCloseModal}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <form onSubmit={handleSaveTicket}>
                <div className="super-support-modal-body">

                  {error && (
                    <div className="super-support-form-error">
                      <i className="bi bi-exclamation-circle"></i>
                      {error}
                    </div>
                  )}

                  <div className="super-support-form-grid">

                    <div className="super-support-form-field">
                      <label>Hotel *</label>

                      <select
                        name="hotelId"
                        value={form.hotelId}
                        onChange={handleChange}
                      >
                        <option value="">
                          Select Hotel
                        </option>

                        {hotels.map((hotel) => (
                          <option
                            key={hotel.id}
                            value={hotel.id}
                          >
                            {hotel.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="super-support-form-field">
                      <label>Category *</label>

                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                      >
                        <option>Technical Issue</option>
                        <option>Booking Issue</option>
                        <option>Billing Issue</option>
                        <option>Subscription Issue</option>
                        <option>Account Access</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="super-support-form-field full">
                      <label>Ticket Subject *</label>

                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Enter support ticket subject"
                      />
                    </div>

                    <div className="super-support-form-field">
                      <label>Priority</label>

                      <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>

                    <div className="super-support-form-field">
                      <label>Status</label>

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                      </select>
                    </div>

                    <div className="super-support-form-field full">
                      <label>Description *</label>

                      <textarea
                        name="description"
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the issue in detail..."
                      />
                    </div>

                    <div className="super-support-form-field full">
                      <label>Assigned To</label>

                      <input
                        type="text"
                        name="assignedTo"
                        value={form.assignedTo}
                        onChange={handleChange}
                        placeholder="Enter support staff name"
                      />
                    </div>

                    <div className="super-support-form-field full">
                      <label>Internal Notes</label>

                      <textarea
                        name="notes"
                        rows="3"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Add internal notes or resolution details..."
                      />
                    </div>

                  </div>
                </div>

                <div className="super-support-modal-footer">
                  <button
                    type="button"
                    className="super-support-cancel-btn"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="super-support-save-btn"
                  >
                    <i className="bi bi-check-lg"></i>

                    {editingTicket
                      ? "Update Ticket"
                      : "Create Ticket"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= VIEW MODAL ================= */}

        {viewTicket && (
          <div
            className="super-support-modal-overlay"
            onClick={() => setViewTicket(null)}
          >
            <div
              className="super-support-modal super-support-view-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Support Ticket Details"
              onClick={(event) => event.stopPropagation()}
            >

              <div className="super-support-modal-header">
                <div>
                  <span>TICKET DETAILS</span>

                  <h2>{viewTicket.subject}</h2>

                  <p>{viewTicket.id}</p>
                </div>

                <button
                  type="button"
                  className="super-support-modal-close"
                  onClick={() => setViewTicket(null)}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <div className="super-support-modal-body">

                <div className="super-support-detail-grid">

                  <div>
                    <span>HOTEL</span>
                    <strong>{viewTicket.hotelName}</strong>
                  </div>

                  <div>
                    <span>CATEGORY</span>
                    <strong>{viewTicket.category}</strong>
                  </div>

                  <div>
                    <span>PRIORITY</span>
                    <strong>{viewTicket.priority}</strong>
                  </div>

                  <div>
                    <span>STATUS</span>
                    <strong>{viewTicket.status}</strong>
                  </div>

                  <div>
                    <span>CREATED AT</span>
                    <strong>
                      {formatDate(viewTicket.createdAt)}
                    </strong>
                  </div>

                  <div>
                    <span>ASSIGNED TO</span>
                    <strong>
                      {viewTicket.assignedTo || "Not Assigned"}
                    </strong>
                  </div>

                </div>

                <div className="super-support-detail-section">
                  <h3>Issue Description</h3>

                  <p>{viewTicket.description}</p>
                </div>

                <div className="super-support-detail-section">
                  <h3>Internal Notes</h3>

                  <p>
                    {viewTicket.notes ||
                      "No internal notes added."}
                  </p>
                </div>

                <div className="super-support-detail-section">
                  <h3>Update Ticket Status</h3>

                  <select
                    className="super-support-detail-status-select"
                    value={viewTicket.status}
                    onChange={(event) =>
                      handleStatusChange(
                        viewTicket.id,
                        event.target.value
                      )
                    }
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                    <option>Closed</option>
                  </select>
                </div>

              </div>

              <div className="super-support-modal-footer">
                <button
                  type="button"
                  className="super-support-cancel-btn"
                  onClick={() => setViewTicket(null)}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="super-support-save-btn"
                  onClick={() => handleEditTicket(viewTicket)}
                >
                  <i className="bi bi-pencil-square"></i>
                  Edit Ticket
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </SuperAdminLayout>
  );
}

export default Support;