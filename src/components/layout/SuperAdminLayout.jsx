import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SuperAdminSidebar from './SuperAdminSidebar'
import './SuperAdminLayout.css'

function SuperAdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="super-admin-layout">

      {/* SIDEBAR */}
      <SuperAdminSidebar
        isOpen={sidebarOpen}
        onLogout={handleLogout}
      />

      {/* MAIN */}
      <div
        className={`super-admin-main ${
          sidebarOpen
            ? 'sidebar-is-open'
            : 'sidebar-is-closed'
        }`}
      >

        {/* TOPBAR */}
        <header className="super-admin-topbar">

          <div className="super-admin-topbar-left">

            <button
              type="button"
              className="super-menu-toggle"
              onClick={() => setSidebarOpen(prev => !prev)}
            >
              <i className="bi bi-list"></i>
            </button>

            <div className="super-admin-title">
              <span>Wisteria In</span>
              <strong>Super Admin Panel</strong>
            </div>

          </div>


          <div className="super-admin-topbar-right">

            <button
              type="button"
              className="super-notification-btn"
            >
              <i className="bi bi-bell"></i>
              <small></small>
            </button>


            <div className="super-admin-user">

              <div className="super-admin-avatar">
                SA
              </div>

              <div className="super-admin-user-info">
                <strong>Super Admin</strong>
                <span>System Administrator</span>
              </div>

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}
        <main className="super-admin-content">
          {children}
        </main>


        {/* FOOTER */}
        <footer className="super-admin-footer">

          <span>
            © 2026 Wisteria In. All Rights Reserved.
          </span>

          <span>
            Super Admin Management System
          </span>

        </footer>

      </div>

    </div>
  )
}

export default SuperAdminLayout