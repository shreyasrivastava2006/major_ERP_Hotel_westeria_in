function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <i className={`bi ${icon}`}></i>
      </div>

      <div>
        <p>{title}</p>
        <h3>{value}</h3>
        <span>{subtitle}</span>
      </div>
    </div>
  )
}

export default StatCard