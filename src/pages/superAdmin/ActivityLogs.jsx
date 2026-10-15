import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./ActivityLogs.css";

// =====================================================
// STORAGE
// =====================================================

const LOGS_KEY = "wisteriaActivityLogs";

// =====================================================
// HELPERS
// =====================================================

const readLogs = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem(LOGS_KEY) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getDateOnly = (date) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  return `${parsed.getFullYear()}-${String(
    parsed.getMonth() + 1
  ).padStart(2, "0")}-${String(
    parsed.getDate()
  ).padStart(2, "0")}`;
};

const getIcon = (module) => {
  const icons = {
    Hotels: "bi-building",
    Users: "bi-people",
    Subscriptions: "bi-credit-card",
    Plans: "bi-gem",
    Support: "bi-headset",
    Settings: "bi-gear",
    Authentication: "bi-shield-lock",
    System: "bi-activity",
  };

  return icons[module] || "bi-clock-history";
};

const escapeCSV = (value) => {
  const text = String(value ?? "");

  return `"${text.replace(/"/g, '""')}"`;
};

// =====================================================
// MAIN COMPONENT
// =====================================================

function ActivityLogs() {
  const navigate = useNavigate();

  const [logs, setLogs] = useState(readLogs);

  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [selectedLog, setSelectedLog] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);

  // =====================================================
  // SYNC LOGS
  // =====================================================

  useEffect(() => {
    const syncLogs = () => {
      setLogs(readLogs());
    };

    window.addEventListener(
      "wisteria-activity-updated",
      syncLogs
    );

    window.addEventListener("storage", syncLogs);

    window.addEventListener("focus", syncLogs);

    return () => {
      window.removeEventListener(
        "wisteria-activity-updated",
        syncLogs
      );

      window.removeEventListener("storage", syncLogs);
      window.removeEventListener("focus", syncLogs);
    };
  }, []);

  // =====================================================
  // MODULE OPTIONS
  // =====================================================

  const modules = useMemo(() => {
    return [
      "All",
      ...new Set(
        logs.map((log) => log.module).filter(Boolean)
      ),
    ];
  }, [logs]);

  // =====================================================
  // FILTERED LOGS
  // =====================================================

  const filteredLogs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return logs
      .filter((log) => {
        const matchesSearch =
          String(log.id || "")
            .toLowerCase()
            .includes(query) ||
          String(log.user || "")
            .toLowerCase()
            .includes(query) ||
          String(log.action || "")
            .toLowerCase()
            .includes(query) ||
          String(log.hotel || "")
            .toLowerCase()
            .includes(query) ||
          String(log.description || "")
            .toLowerCase()
            .includes(query);

        const matchesModule =
          moduleFilter === "All" ||
          log.module === moduleFilter;

        const matchesStatus =
          statusFilter === "All" ||
          log.status === statusFilter;

        const matchesDate =
          !dateFilter ||
          getDateOnly(log.timestamp) === dateFilter;

        return (
          matchesSearch &&
          matchesModule &&
          matchesStatus &&
          matchesDate
        );
      })
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() -
          new Date(a.timestamp).getTime()
      );
  }, [
    logs,
    search,
    moduleFilter,
    statusFilter,
    dateFilter,
  ]);

  // =====================================================
  // STATS
  // =====================================================

  const stats = useMemo(() => {
    const today = getDateOnly(new Date());

    return {
      total: logs.length,

      today: logs.filter(
        (log) => getDateOnly(log.timestamp) === today
      ).length,

      success: logs.filter(
        (log) => log.status === "Success"
      ).length,

      failed: logs.filter(
        (log) => log.status === "Failed"
      ).length,
    };
  }, [logs]);

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setModuleFilter("All");
    setStatusFilter("All");
    setDateFilter("");
  };

  // =====================================================
  // EXPORT CSV
  // =====================================================

  const handleExport = () => {
    if (filteredLogs.length === 0) {
      window.alert("No activity logs available to export.");
      return;
    }

    const headers = [
      "Log ID",
      "Date & Time",
      "User",
      "Role",
      "Hotel",
      "Module",
      "Action",
      "Description",
      "Status",
    ];

    const rows = filteredLogs.map((log) => [
      log.id,
      formatDate(log.timestamp),
      log.user,
      log.role,
      log.hotel,
      log.module,
      log.action,
      log.description,
      log.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Wisteria_Activity_Logs_${getDateOnly(
      new Date()
    )}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  // =====================================================
  // CLEAR LOGS
  // =====================================================

  const handleClearLogs = () => {
    try {
      localStorage.setItem(LOGS_KEY, "[]");

      setLogs([]);
      setSelectedLog(null);
      setShowClearModal(false);

      window.dispatchEvent(
        new Event("wisteria-activity-updated")
      );
    } catch (error) {
      console.error("Unable to clear logs:", error);
      window.alert("Unable to clear activity logs.");
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SuperAdminLayout>
      <div className="activity-logs-page">

        {/* BREADCRUMB */}

        <div className="activity-logs-breadcrumb">
          <button
            type="button"
            onClick={() => navigate("/super-admin")}
          >
            Super Admin
          </button>

          <i className="bi bi-chevron-right"></i>
          <span>System</span>
          <i className="bi bi-chevron-right"></i>
          <strong>Activity Logs</strong>
        </div>

        {/* HEADER */}

        <div className="activity-logs-header">
          <div>
            <span className="activity-logs-eyebrow">
              SYSTEM MONITORING
            </span>

            <h1>Activity Logs</h1>

            <p>
              Monitor administrative actions, track system
              activities and review important events.
            </p>
          </div>

          <div className="activity-logs-header-actions">
            <button
              className="activity-logs-outline-btn"
              onClick={() => navigate("/super-admin")}
            >
              <i className="bi bi-arrow-left"></i>
              Dashboard
            </button>

            <button
              className="activity-logs-primary-btn"
              onClick={handleExport}
            >
              <i className="bi bi-download"></i>
              Export CSV
            </button>
          </div>
        </div>

        {/* STATS */}

        <div className="activity-logs-stats">

          <div className="activity-logs-stat-card">
            <div className="activity-logs-stat-icon gold">
              <i className="bi bi-clock-history"></i>
            </div>

            <div>
              <span>Total Activities</span>
              <strong>{stats.total}</strong>
              <small>All recorded events</small>
            </div>
          </div>

          <div className="activity-logs-stat-card">
            <div className="activity-logs-stat-icon purple">
              <i className="bi bi-calendar-check"></i>
            </div>

            <div>
              <span>Today's Activities</span>
              <strong>{stats.today}</strong>
              <small>Events recorded today</small>
            </div>
          </div>

          <div className="activity-logs-stat-card">
            <div className="activity-logs-stat-icon green">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Successful Actions</span>
              <strong>{stats.success}</strong>
              <small>Completed successfully</small>
            </div>
          </div>

          <div className="activity-logs-stat-card">
            <div className="activity-logs-stat-icon rose">
              <i className="bi bi-x-circle"></i>
            </div>

            <div>
              <span>Failed Actions</span>
              <strong>{stats.failed}</strong>
              <small>Unsuccessful events</small>
            </div>
          </div>

        </div>

        {/* FILTERS */}

        <div className="activity-logs-filter-card">
          <div className="activity-logs-filter-title">
            <div className="activity-logs-filter-icon">
              <i className="bi bi-funnel"></i>
            </div>

            <div>
              <strong>Filter Activities</strong>
              <span>Find specific system events</span>
            </div>
          </div>

          <div className="activity-logs-filter-controls">
            <div className="activity-logs-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search activities..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <select
              value={moduleFilter}
              onChange={(event) =>
                setModuleFilter(event.target.value)
              }
            >
              {modules.map((module) => (
                <option key={module} value={module}>
                  {module === "All"
                    ? "All Modules"
                    : module}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(event) =>
                setDateFilter(event.target.value)
              }
            />

            <button
              className="activity-logs-clear-filter"
              onClick={clearFilters}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              Clear
            </button>
          </div>
        </div>

        {/* TABLE */}

        <div className="activity-logs-table-card">

          <div className="activity-logs-table-heading">
            <div>
              <span>ACTIVITY HISTORY</span>

              <h2>System Activity</h2>

              <p>
                Showing {filteredLogs.length} of{" "}
                {logs.length} activities
              </p>
            </div>

            <button
              className="activity-logs-danger-btn"
              onClick={() => setShowClearModal(true)}
              disabled={logs.length === 0}
            >
              <i className="bi bi-trash"></i>
              Clear Logs
            </button>
          </div>

          <div className="activity-logs-table-wrapper">
            <table className="activity-logs-table">
              <thead>
                <tr>
                  <th>ACTIVITY</th>
                  <th>USER</th>
                  <th>HOTEL</th>
                  <th>MODULE</th>
                  <th>DATE & TIME</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id}>

                      <td>
                        <div className="activity-logs-action-cell">
                          <div className="activity-logs-row-icon">
                            <i
                              className={`bi ${getIcon(
                                log.module
                              )}`}
                            ></i>
                          </div>

                          <div>
                            <strong>{log.action}</strong>
                            <span>{log.description}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="activity-logs-user-cell">
                          <strong>
                            {log.user || "Unknown"}
                          </strong>
                          <span>
                            {log.role || "Not specified"}
                          </span>
                        </div>
                      </td>

                      <td>{log.hotel || "—"}</td>

                      <td>
                        <span className="activity-logs-module">
                          {log.module || "System"}
                        </span>
                      </td>

                      <td>{formatDate(log.timestamp)}</td>

                      <td>
                        <span
                          className={`activity-logs-status ${
                            log.status === "Success"
                              ? "success"
                              : "failed"
                          }`}
                        >
                          <span className="status-dot"></span>
                          {log.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="activity-logs-view-btn"
                          title="View Details"
                          onClick={() => setSelectedLog(log)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      <div className="activity-logs-empty">
                        <i className="bi bi-clock-history"></i>

                        <h3>No Activity Logs Found</h3>

                        <p>
                          Activities will appear here after
                          logging is connected to your modules.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAILS MODAL */}

        {selectedLog && (
          <div
            className="activity-logs-modal-overlay"
            onClick={() => setSelectedLog(null)}
          >
            <div
              className="activity-logs-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Activity Details"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="activity-logs-modal-header">
                <div>
                  <span>ACTIVITY DETAILS</span>
                  <h2>{selectedLog.action}</h2>
                  <p>{selectedLog.id}</p>
                </div>

                <button
                  className="activity-logs-modal-close"
                  onClick={() => setSelectedLog(null)}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <div className="activity-logs-modal-body">
                <div className="activity-logs-detail-grid">

                  <div>
                    <span>USER</span>
                    <strong>{selectedLog.user || "Unknown"}</strong>
                  </div>

                  <div>
                    <span>ROLE</span>
                    <strong>
                      {selectedLog.role || "Not specified"}
                    </strong>
                  </div>

                  <div>
                    <span>HOTEL</span>
                    <strong>{selectedLog.hotel || "—"}</strong>
                  </div>

                  <div>
                    <span>MODULE</span>
                    <strong>{selectedLog.module || "System"}</strong>
                  </div>

                  <div>
                    <span>STATUS</span>
                    <strong>{selectedLog.status}</strong>
                  </div>

                  <div>
                    <span>DATE & TIME</span>
                    <strong>
                      {formatDate(selectedLog.timestamp)}
                    </strong>
                  </div>

                </div>

                <div className="activity-logs-detail-description">
                  <h3>Activity Description</h3>
                  <p>
                    {selectedLog.description ||
                      "No description available."}
                  </p>
                </div>
              </div>

              <div className="activity-logs-modal-footer">
                <button
                  className="activity-logs-outline-btn"
                  onClick={() => setSelectedLog(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CLEAR CONFIRMATION */}

        {showClearModal && (
          <div
            className="activity-logs-modal-overlay"
            onClick={() => setShowClearModal(false)}
          >
            <div
              className="activity-logs-confirm-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Clear Activity Logs"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="activity-logs-confirm-icon">
                <i className="bi bi-trash"></i>
              </div>

              <h2>Clear Activity Logs?</h2>

              <p>
                This will permanently delete all locally
                stored activity records. This action
                cannot be undone.
              </p>

              <div className="activity-logs-confirm-actions">
                <button
                  className="activity-logs-outline-btn"
                  onClick={() => setShowClearModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="activity-logs-danger-btn"
                  onClick={handleClearLogs}
                >
                  Delete All Logs
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </SuperAdminLayout>
  );
}

export default ActivityLogs;