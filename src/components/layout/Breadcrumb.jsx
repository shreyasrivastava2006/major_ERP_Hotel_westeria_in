import { Link } from "react-router-dom";
import "./Breadcrumb.css";

function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-wrapper">
      <ol className="breadcrumb-list">
        {/* Home */}
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-home">
            <i className="bi bi-house-door-fill"></i>
            <span>Home</span>
          </Link>
        </li>

        {/* Breadcrumb Items */}
        {items.map((item, index) => {
          // Support both:
          // { label: "Super Admin", active: true }
          // and simple strings: "Super Admin"
          const label =
            typeof item === "object" && item !== null
              ? item.label
              : item;

          const active =
            typeof item === "object" && item !== null
              ? item.active
              : index === items.length - 1;

          return (
            <li
              key={`${label}-${index}`}
              className={`breadcrumb-item ${
                active ? "active" : ""
              }`}
              aria-current={active ? "page" : undefined}
            >
              <i className="bi bi-chevron-right breadcrumb-arrow"></i>

              {active ? (
                <span>{label}</span>
              ) : (
                <Link to="#">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;