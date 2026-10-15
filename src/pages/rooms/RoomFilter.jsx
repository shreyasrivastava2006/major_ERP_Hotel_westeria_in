function RoomFilter({
  status,
  type,
  setStatus,
  setType,
  onClear,
}) {
  return (
    <div className="room-filter">

      <div className="filter-group">
        <label>Room Status</label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Available">
            Available
          </option>

          <option value="Occupied">
            Occupied
          </option>

          <option value="Maintenance">
            Maintenance
          </option>
        </select>
      </div>

      <div className="filter-group">
        <label>Room Type</label>

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="All">
            All Types
          </option>

          <option value="Deluxe Room">
            Deluxe Room
          </option>

          <option value="Executive Room">
            Executive Room
          </option>

          <option value="Suite Room">
            Suite Room
          </option>
        </select>
      </div>

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

export default RoomFilter;