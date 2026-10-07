import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'bi-speedometer2',
      path: '/dashboard'
    },
    {
      title: 'Rooms',
      icon: 'bi-door-open',
      path: '/rooms'
    },
    {
      title: 'Guests',
      icon: 'bi-people',
      path: '/guests'
    },
    {
      title: 'Reservations',
      icon: 'bi-calendar-check',
      path: '/reservations'
    },
    {
      title: 'Front Office',
      icon: 'bi-building',
      path: '/front-office'
    },
    {
      title: 'Housekeeping',
      icon: 'bi-stars',
      path: '/housekeeping'
    },
    {
      title: 'Restaurant',
      icon: 'bi-cup-hot',
      path: '/restaurant'
    },
    {
      title: 'Services',
      icon: 'bi-bell',
      path: '/services'
    },
    {
      title: 'Billing',
      icon: 'bi-receipt',
      path: '/billing'
    },
    {
      title: 'Inventory',
      icon: 'bi-box-seam',
      path: '/inventory'
    },
    {
      title: 'Staff',
      icon: 'bi-person-badge',
      path: '/staff'
    },
    {
      title: 'Maintenance',
      icon: 'bi-tools',
      path: '/maintenance'
    },
    {
      title: 'Reports',
      icon: 'bi-bar-chart-line',
      path: '/reports'
    },
    {
      title: 'Settings',
      icon: 'bi-gear',
      path: '/settings'
    }
  ]

  const isMenuActive = (path) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    )
  }

  return (
    <aside
      className={`sidebar ${
        collapsed ? 'sidebar-collapsed' : ''
      }`}
    >

      {/* =========================
          BRAND
      ========================= */}
      <div className="sidebar-brand">

        <div className="sidebar-brand-icon">
          <i className="bi bi-building"></i>
        </div>

        <div className="sidebar-brand-text">
          <strong>Wisteria In</strong>
          <span>Hotel ERP</span>
        </div>

      </div>


      {/* =========================
          NAVIGATION
      ========================= */}
      <nav className="sidebar-nav">

        <div className="sidebar-section-title">
          <span>MAIN MENU</span>
        </div>

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            title={collapsed ? item.title : ''}
            className={`sidebar-link ${
              isMenuActive(item.path) ? 'active' : ''
            }`}
          >

            <i className={`bi ${item.icon}`}></i>

            <span className="sidebar-link-text">
              {item.title}
            </span>

          </NavLink>

        ))}

      </nav>


      {/* =========================
          SIDEBAR BOTTOM
      ========================= */}
      <div className="sidebar-bottom">

        <div className="sidebar-version">

          <span>Wisteria In ERP</span>

          <small>
            v1.0.0
          </small>

        </div>

      </div>


      {/* =========================
          COLLAPSE BUTTON
      ========================= */}
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={
          collapsed
            ? 'Expand sidebar'
            : 'Collapse sidebar'
        }
        title={
          collapsed
            ? 'Expand Sidebar'
            : 'Collapse Sidebar'
        }
      >

        <i
          className={`bi ${
            collapsed
              ? 'bi-chevron-right'
              : 'bi-chevron-left'
          }`}
        ></i>

      </button>

    </aside>
  )
}

export default Sidebar