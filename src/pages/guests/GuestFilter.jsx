function GuestFilter({
  status,
  setStatus,
  searchTerm,
  setSearchTerm,
  onClear,
}) {

  return (
    <div className="guest-filter">

      {/* STATUS */}

      <div className="filter-group">

        <label>
          Guest Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option value="All">
            All Status
          </option>

          <option value="Checked In">
            Checked In
          </option>

          <option value="Reserved">
            Reserved
          </option>

          <option value="Checked Out">
            Checked Out
          </option>

        </select>

      </div>

      {/* SEARCH */}

      <div className="guest-search">

        <label>
          Search Guest
        </label>

        <div className="search-box">

          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search by name, email, phone or room"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

      </div>

      {/* CLEAR */}

      <button
        type="button"
        className="filter-btn"
        onClick={onClear}
      >

        <i className="bi bi-arrow-counterclockwise"></i>

        Clear Filter

      </button>

    </div>
  );
}

export default GuestFilter;