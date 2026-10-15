import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import PageHeader from "../../components/layout/PageHeader";
import Breadcrumb from "../../components/layout/Breadcrumb";
import { useHotel } from "../../context/HotelContext";
import "./Menu.css";

const DEFAULT_MENU = [
  {
    id: "menu-001",
    name: "Paneer Butter Masala",
    category: "Main Course",
    type: "Veg",
    price: 320,
    description: "Paneer cooked in a rich buttery tomato gravy.",
    available: true,
  },
  {
    id: "menu-002",
    name: "Chicken Biryani",
    category: "Main Course",
    type: "Non-Veg",
    price: 420,
    description: "Fragrant basmati rice cooked with tender chicken.",
    available: true,
  },
  {
    id: "menu-003",
    name: "Dal Makhani",
    category: "Main Course",
    type: "Veg",
    price: 260,
    description: "Slow-cooked black lentils with cream and butter.",
    available: true,
  },
  {
    id: "menu-004",
    name: "Caesar Salad",
    category: "Starters",
    type: "Veg",
    price: 220,
    description: "Fresh lettuce, dressing, herbs and crunchy toppings.",
    available: true,
  },
  {
    id: "menu-005",
    name: "Grilled Chicken",
    category: "Main Course",
    type: "Non-Veg",
    price: 450,
    description: "Tender grilled chicken served with vegetables.",
    available: true,
  },
  {
    id: "menu-006",
    name: "Chocolate Brownie",
    category: "Dessert",
    type: "Veg",
    price: 180,
    description: "Warm chocolate brownie served as a sweet finish.",
    available: true,
  },
  {
    id: "menu-007",
    name: "Fresh Lime Soda",
    category: "Beverages",
    type: "Veg",
    price: 120,
    description: "Refreshing fresh lime soda.",
    available: true,
  },
  {
    id: "menu-008",
    name: "Masala Tea",
    category: "Beverages",
    type: "Veg",
    price: 90,
    description: "Traditional Indian tea with aromatic spices.",
    available: true,
  },
];

const STORAGE_KEY = "wisteriaMenuItems";

function Menu() {
  const { selectedHotel } = useHotel();

  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  const hotelId =
    selectedHotel?.id ||
    selectedHotel?.hotelId ||
    selectedHotel?.code ||
    "";

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        setMenuItems(JSON.parse(saved));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MENU));
        setMenuItems(DEFAULT_MENU);
      }
    } catch (error) {
      console.error("Unable to load menu:", error);
      setMenuItems(DEFAULT_MENU);
    }
  }, []);

  useEffect(() => {
    const handleMenuUpdate = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
          setMenuItems(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Unable to refresh menu:", error);
      }
    };

    window.addEventListener("wisteria-menu-updated", handleMenuUpdate);

    return () => {
      window.removeEventListener(
        "wisteria-menu-updated",
        handleMenuUpdate
      );
    };
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(menuItems.map((item) => item.category).filter(Boolean)),
    ];
  }, [menuItems]);

  const filteredMenu = useMemo(() => {
    const query = search.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesSearch =
        !query ||
        item.name?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      const matchesType =
        typeFilter === "All" ||
        item.type === typeFilter;

      const matchesAvailability =
        availabilityFilter === "All" ||
        (availabilityFilter === "Available" && item.available) ||
        (availabilityFilter === "Unavailable" && !item.available);

      const matchesHotel =
        !hotelId ||
        !item.hotelId ||
        String(item.hotelId) === String(hotelId);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesAvailability &&
        matchesHotel
      );
    });
  }, [
    menuItems,
    search,
    categoryFilter,
    typeFilter,
    availabilityFilter,
    hotelId,
  ]);

  const availableCount = menuItems.filter((item) => item.available).length;
  const unavailableCount = menuItems.length - availableCount;

  const formatPrice = (price) => {
    return `₹${Number(price || 0).toLocaleString("en-IN")}`;
  };

  return (
    <MainLayout>
      <div className="menu-page">
        <PageHeader
          title="Restaurant Menu"
          subtitle="View and manage the hotel's food and beverage menu"
        />

        <Breadcrumb
          items={[
            { label: "Restaurant", path: "/restaurant" },
            { label: "Menu" },
          ]}
        />

        {selectedHotel && (
          <div className="menu-hotel-bar">
            <div className="menu-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <span>Selected Hotel</span>
              <strong>
                {selectedHotel.name ||
                  selectedHotel.hotelName ||
                  "Wisteria In"}
              </strong>
            </div>
          </div>
        )}

        <div className="menu-stats">
          <div className="menu-stat-card">
            <div className="menu-stat-icon">
              <i className="bi bi-journal-text"></i>
            </div>

            <div>
              <span>Total Items</span>
              <strong>{menuItems.length}</strong>
            </div>
          </div>

          <div className="menu-stat-card">
            <div className="menu-stat-icon available">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Available</span>
              <strong>{availableCount}</strong>
            </div>
          </div>

          <div className="menu-stat-card">
            <div className="menu-stat-icon unavailable">
              <i className="bi bi-x-circle"></i>
            </div>

            <div>
              <span>Unavailable</span>
              <strong>{unavailableCount}</strong>
            </div>
          </div>

          <div className="menu-stat-card">
            <div className="menu-stat-icon category">
              <i className="bi bi-grid"></i>
            </div>

            <div>
              <span>Categories</span>
              <strong>{Math.max(categories.length - 1, 0)}</strong>
            </div>
          </div>
        </div>

        <div className="menu-toolbar">
          <div className="menu-search">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search menu item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <div className="menu-section-header">
          <div>
            <h2>Menu Items</h2>
            <p>{filteredMenu.length} item(s) found</p>
          </div>

          <a
            href="/restaurant/menu-management"
            className="menu-manage-btn"
          >
            <i className="bi bi-pencil-square"></i>
            Manage Menu
          </a>
        </div>

        {filteredMenu.length > 0 ? (
          <div className="menu-grid">
            {filteredMenu.map((item) => (
              <div
                className={`menu-card ${
                  !item.available ? "menu-card-disabled" : ""
                }`}
                key={item.id}
              >
                <div className="menu-card-top">
                  <div
                    className={`menu-food-dot ${
                      item.type === "Veg" ? "veg" : "nonveg"
                    }`}
                  >
                    <span></span>
                  </div>

                  <span className="menu-category">
                    {item.category}
                  </span>

                  <span
                    className={`menu-availability ${
                      item.available
                        ? "available"
                        : "unavailable"
                    }`}
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="menu-card-content">
                  <h3>{item.name}</h3>

                  <p>
                    {item.description ||
                      "No description available for this item."}
                  </p>
                </div>

                <div className="menu-card-bottom">
                  <span
                    className={`menu-type ${
                      item.type === "Veg" ? "veg-text" : "nonveg-text"
                    }`}
                  >
                    {item.type}
                  </span>

                  <strong>{formatPrice(item.price)}</strong>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="menu-empty">
            <i className="bi bi-search"></i>
            <h3>No menu items found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Menu;