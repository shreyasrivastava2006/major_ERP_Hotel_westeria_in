import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2>Wisteria In</h2>
        <span>Hotel Management ERP</span>
      </div>

      <div className="navbar-right">
        <button className="icon-btn" title="Notifications">
          <i className="bi bi-bell"></i>
        </button>

        <div className="profile">
          <i className="bi bi-person-circle"></i>
          <span>Admin</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar