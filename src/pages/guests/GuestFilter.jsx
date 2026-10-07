import { useState } from 'react'

function GuestFilter() {
  const [status, setStatus] = useState('All')

  return (
    <div className="guest-filter">

      <div className="filter-group">
        <label>Guest Status</label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Checked In</option>
          <option>Reserved</option>
          <option>Checked Out</option>
        </select>
      </div>

      <div className="guest-search">
        <label>Search Guest</label>

        <div className="search-box">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search by name, email or phone"
          />
        </div>
      </div>

      <button className="filter-btn">
        <i className="bi bi-funnel"></i>
        Apply Filter
      </button>

    </div>
  )
}

export default GuestFilter