import { NavLink } from "react-router-dom";
import "./SuperAdminSidebar.css";

function SuperAdminSidebar({ isOpen, onLogout }) {
  return (
    <aside
      className={`super-admin-sidebar ${
        isOpen ? "open" : "closed"
      }`}
    >
      {/* LOGO */}
      <div className="super-sidebar-logo">
        <div className="super-logo-circle">W</div>

        {isOpen && (
          <div className="super-logo-text">
            <h2>Wisteria In</h2>
            <span>SUPER ADMIN</span>
          </div>
        )}
      </div>

      {/* MENU */}
      <nav className="super-sidebar-menu">

        {/* MAIN */}
        <div className="super-menu-title">
          {isOpen && "MAIN"}
        </div>

        <NavLink
          to="/super-admin"
          end
          className="super-sidebar-link"
        >
          <i className="bi bi-grid-1x2-fill"></i>
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        {/* HOTEL MANAGEMENT */}
        <div className="super-menu-title">
          {isOpen && "HOTEL MANAGEMENT"}
        </div>

        <NavLink
          to="/super-admin/hotels"
          className="super-sidebar-link"
        >
          <i className="bi bi-buildings-fill"></i>
          {isOpen && <span>Hotels</span>}
        </NavLink>

        {/* USER MANAGEMENT */}
        <div className="super-menu-title">
          {isOpen && "USER MANAGEMENT"}
        </div>

        <NavLink
          to="/super-admin/users"
          className="super-sidebar-link"
        >
          <i className="bi bi-people-fill"></i>
          {isOpen && <span>Users</span>}
        </NavLink>

        {/* SUBSCRIPTION */}
        <div className="super-menu-title">
          {isOpen && "SUBSCRIPTION"}
        </div>

        <NavLink
          to="/super-admin/plans"
          className="super-sidebar-link"
        >
          <i className="bi bi-credit-card-2-front-fill"></i>
          {isOpen && <span>Plans</span>}
        </NavLink>

        <NavLink
          to="/super-admin/subscriptions"
          className="super-sidebar-link"
        >
          <i className="bi bi-wallet2"></i>
          {isOpen && <span>Subscriptions</span>}
        </NavLink>

        {/* REPORTS */}
        <div className="super-menu-title">
          {isOpen && "REPORTS"}
        </div>

        <NavLink
          to="/super-admin/reports/hotel-performance"
          className="super-sidebar-link"
        >
          <i className="bi bi-bar-chart-fill"></i>
          {isOpen && <span>Hotel Performance</span>}
        </NavLink>

        <NavLink
          to="/super-admin/reports/revenue"
          className="super-sidebar-link"
        >
          <i className="bi bi-graph-up-arrow"></i>
          {isOpen && <span>Revenue Report</span>}
        </NavLink>

        {/* SYSTEM */}
        <div className="super-menu-title">
          {isOpen && "SYSTEM"}
        </div>

        <NavLink
          to="/super-admin/support"
          className="super-sidebar-link"
        >
          <i className="bi bi-headset"></i>
          {isOpen && <span>Support</span>}
        </NavLink>

        <NavLink
          to="/super-admin/system-settings"
          className="super-sidebar-link"
        >
          <i className="bi bi-gear-fill"></i>
          {isOpen && <span>System Settings</span>}
        </NavLink>

        <NavLink
          to="/super-admin/activity-logs"
          className="super-sidebar-link"
        >
          <i className="bi bi-clock-history"></i>
          {isOpen && <span>Activity Logs</span>}
        </NavLink>

      </nav>

      {/* LOGOUT */}
      <div className="super-sidebar-bottom">
        <button
          type="button"
          className="super-sidebar-logout"
          onClick={onLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default SuperAdminSidebar;