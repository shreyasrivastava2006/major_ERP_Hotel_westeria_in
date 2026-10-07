import './SearchBar.css'

function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="search-bar">
      <i className="bi bi-search search-icon"></i>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>
  )
}

export default SearchBar