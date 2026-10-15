import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import PageHeader from "../../components/layout/PageHeader";
import Breadcrumb from "../../components/layout/Breadcrumb";
import { useHotel } from "../../context/HotelContext";
import "./MenuManagement.css";

const STORAGE_KEY = "wisteriaMenuItems";

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
];

const EMPTY_FORM = {
  name: "",
  category: "Main Course",
  type: "Veg",
  price: "",
  description: "",
  available: true,
};

function MenuManagement() {
  const { selectedHotel } = useHotel();

  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const hotelId =
    selectedHotel?.id ||
    selectedHotel?.hotelId ||
    selectedHotel?.code ||
    "";

  const hotelName =
    selectedHotel?.name ||
    selectedHotel?.hotelName ||
    "";

  /* =========================================================
     LOAD MENU
  ========================================================= */

  useEffect(() => {
    try {
      const savedMenu = localStorage.getItem(STORAGE_KEY);

      if (savedMenu) {
        setMenuItems(JSON.parse(savedMenu));
      } else {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(DEFAULT_MENU)
        );

        setMenuItems(DEFAULT_MENU);
      }
    } catch (error) {
      console.error("Error loading menu:", error);
      setMenuItems(DEFAULT_MENU);
    }
  }, []);

  /* =========================================================
     SAVE MENU
  ========================================================= */

  const saveMenu = (updatedMenu) => {
    setMenuItems(updatedMenu);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedMenu)
    );

    window.dispatchEvent(
      new Event("wisteria-menu-updated")
    );
  };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================================================
     OPEN ADD FORM
  ========================================================= */

  const handleAddNew = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     OPEN EDIT FORM
  ========================================================= */

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      name: item.name || "",
      category: item.category || "Main Course",
      type: item.type || "Veg",
      price: item.price || "",
      description: item.description || "",
      available: item.available !== false,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  /* =========================================================
     ADD / UPDATE MENU ITEM
  ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter menu item name.");
      return;
    }

    if (!form.category.trim()) {
      alert("Please select a category.");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    /* UPDATE */

    if (editingId) {
      const updatedMenu = menuItems.map((item) => {
        if (item.id !== editingId) {
          return item;
        }

        return {
          ...item,
          name: form.name.trim(),
          category: form.category,
          type: form.type,
          price: Number(form.price),
          description: form.description.trim(),
          available: form.available,
        };
      });

      saveMenu(updatedMenu);

      alert("Menu item updated successfully.");

      handleCancel();

      return;
    }

    /* ADD */

    const newItem = {
      id: `menu-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)}`,

      name: form.name.trim(),

      category: form.category,

      type: form.type,

      price: Number(form.price),

      description: form.description.trim(),

      available: form.available,

      hotelId,

      hotelName,

      createdAt: new Date().toISOString(),
    };

    saveMenu([
      newItem,
      ...menuItems,
    ]);

    alert("Menu item added successfully.");

    handleCancel();
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = (id) => {
    const item = menuItems.find(
      (menuItem) => menuItem.id === id
    );

    if (!item) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (!confirmed) return;

    const updatedMenu = menuItems.filter(
      (menuItem) => menuItem.id !== id
    );

    saveMenu(updatedMenu);

    alert("Menu item deleted successfully.");
  };

  /* =========================================================
     TOGGLE AVAILABILITY
  ========================================================= */

  const handleToggleAvailability = (id) => {
    const updatedMenu = menuItems.map((item) => {
      if (item.id !== id) {
        return item;
      }

      return {
        ...item,
        available: !item.available,
      };
    });

    saveMenu(updatedMenu);
  };

  /* =========================================================
     FILTER MENU
  ========================================================= */

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesSearch =
        !query ||
        item.name
          ?.toLowerCase()
          .includes(query) ||
        item.category
          ?.toLowerCase()
          .includes(query);

      const matchesFilter =
        filter === "All" ||
        (filter === "Available" &&
          item.available) ||
        (filter === "Unavailable" &&
          !item.available) ||
        (filter === "Veg" &&
          item.type === "Veg") ||
        (filter === "Non-Veg" &&
          item.type === "Non-Veg");

      const matchesHotel =
        !hotelId ||
        !item.hotelId ||
        String(item.hotelId) ===
          String(hotelId);

      return (
        matchesSearch &&
        matchesFilter &&
        matchesHotel
      );
    });
  }, [
    menuItems,
    search,
    filter,
    hotelId,
  ]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const totalItems = menuItems.length;

  const availableItems =
    menuItems.filter(
      (item) => item.available
    ).length;

  const unavailableItems =
    totalItems - availableItems;

  const vegItems =
    menuItems.filter(
      (item) => item.type === "Veg"
    ).length;

  const nonVegItems =
    menuItems.filter(
      (item) => item.type === "Non-Veg"
    ).length;

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <MainLayout>
      <div className="menu-management-page">

        <PageHeader
          title="Menu Management"
          subtitle="Create, update and manage restaurant menu items"
        />

        <Breadcrumb
          items={[
            {
              label: "Restaurant",
              path: "/restaurant",
            },
            {
              label: "Menu Management",
            },
          ]}
        />

        {/* HOTEL */}

        {selectedHotel && (
          <div className="mm-hotel-bar">

            <div className="mm-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <span>Selected Hotel</span>

              <strong>
                {hotelName || "Wisteria In"}
              </strong>
            </div>

          </div>
        )}

        {/* STATS */}

        <div className="mm-stats">

          <div className="mm-stat-card">

            <div className="mm-stat-icon">
              <i className="bi bi-journal-text"></i>
            </div>

            <div>
              <span>Total Items</span>
              <strong>{totalItems}</strong>
            </div>

          </div>

          <div className="mm-stat-card">

            <div className="mm-stat-icon available">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Available</span>
              <strong>{availableItems}</strong>
            </div>

          </div>

          <div className="mm-stat-card">

            <div className="mm-stat-icon unavailable">
              <i className="bi bi-x-circle"></i>
            </div>

            <div>
              <span>Unavailable</span>
              <strong>{unavailableItems}</strong>
            </div>

          </div>

          <div className="mm-stat-card">

            <div className="mm-stat-icon veg">
              <i className="bi bi-egg"></i>
            </div>

            <div>
              <span>Veg / Non-Veg</span>

              <strong>
                {vegItems} / {nonVegItems}
              </strong>
            </div>

          </div>

        </div>

        {/* HEADER */}

        <div className="mm-top-bar">

          <div>
            <h2>Menu Catalogue</h2>

            <p>
              Manage food and beverage items
            </p>
          </div>

          <button
            type="button"
            className="mm-add-btn"
            onClick={handleAddNew}
          >
            <i className="bi bi-plus-lg"></i>
            Add Menu Item
          </button>

        </div>

        {/* ADD / EDIT FORM */}

        {showForm && (
          <div className="mm-form-card">

            <div className="mm-form-header">

              <div>
                <h3>
                  {editingId
                    ? "Edit Menu Item"
                    : "Add New Menu Item"}
                </h3>

                <p>
                  Enter menu item details below.
                </p>
              </div>

              <button
                type="button"
                className="mm-close-btn"
                onClick={handleCancel}
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="mm-form-grid">

                {/* NAME */}

                <div className="mm-form-group">

                  <label>
                    Item Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter item name"
                  />

                </div>

                {/* CATEGORY */}

                <div className="mm-form-group">

                  <label>
                    Category
                    <span>*</span>
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="Starters">
                      Starters
                    </option>

                    <option value="Main Course">
                      Main Course
                    </option>

                    <option value="Breakfast">
                      Breakfast
                    </option>

                    <option value="Snacks">
                      Snacks
                    </option>

                    <option value="Beverages">
                      Beverages
                    </option>

                    <option value="Dessert">
                      Dessert
                    </option>

                    <option value="Indian">
                      Indian
                    </option>

                    <option value="Continental">
                      Continental
                    </option>

                  </select>

                </div>

                {/* TYPE */}

                <div className="mm-form-group">

                  <label>
                    Food Type
                    <span>*</span>
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="Veg">
                      Veg
                    </option>

                    <option value="Non-Veg">
                      Non-Veg
                    </option>

                  </select>

                </div>

                {/* PRICE */}

                <div className="mm-form-group">

                  <label>
                    Price
                    <span>*</span>
                  </label>

                  <div className="mm-price-input">

                    <span>₹</span>

                    <input
                      type="number"
                      name="price"
                      min="1"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                    />

                  </div>

                </div>

                {/* DESCRIPTION */}

                <div className="mm-form-group mm-full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter description..."
                  />

                </div>

                {/* AVAILABILITY */}

                <div className="mm-availability-toggle">

                  <label className="mm-checkbox">

                    <input
                      type="checkbox"
                      name="available"
                      checked={form.available}
                      onChange={handleChange}
                    />

                    <span className="mm-checkmark"></span>

                    <span>
                      Item is currently available
                    </span>

                  </label>

                </div>

              </div>

              <div className="mm-form-actions">

                <button
                  type="button"
                  className="mm-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="mm-save-btn"
                >
                  <i className="bi bi-check-lg"></i>

                  {editingId
                    ? "Update Item"
                    : "Save Item"}

                </button>

              </div>

            </form>

          </div>
        )}

        {/* SEARCH / FILTER */}

        <div className="mm-filter-card">

          <div className="mm-search">

            <i className="bi bi-search"></i>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search menu item or category..."
            />

          </div>

          <div className="mm-filter-buttons">

            {[
              "All",
              "Available",
              "Unavailable",
              "Veg",
              "Non-Veg",
            ].map((filterName) => (
              <button
                type="button"
                key={filterName}
                className={
                  filter === filterName
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(filterName)
                }
              >
                {filterName}
              </button>
            ))}

          </div>

        </div>

        {/* TABLE */}

        <div className="mm-table-card">

          <div className="mm-table-header">

            <div>
              <h3>Menu Items</h3>

              <p>
                {filteredItems.length} item(s) displayed
              </p>
            </div>

          </div>

          {filteredItems.length > 0 ? (

            <div className="mm-table-wrapper">

              <table className="mm-table">

                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th>CATEGORY</th>
                    <th>TYPE</th>
                    <th>PRICE</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredItems.map((item) => (

                    <tr key={item.id}>

                      {/* ITEM */}

                      <td>

                        <div className="mm-item-cell">

                          <div
                            className={`mm-food-dot ${
                              item.type === "Veg"
                                ? "veg"
                                : "nonveg"
                            }`}
                          >
                            <span></span>
                          </div>

                          <div>

                            <strong>
                              {item.name}
                            </strong>

                            <small>
                              {item.description ||
                                "No description available"}
                            </small>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td>

                        <span className="mm-category-badge">
                          {item.category}
                        </span>

                      </td>

                      {/* TYPE */}

                      <td>

                        <span
                          className={`mm-type ${
                            item.type === "Veg"
                              ? "veg"
                              : "nonveg"
                          }`}
                        >
                          {item.type}
                        </span>

                      </td>

                      {/* PRICE */}

                      <td>

                        <strong className="mm-price">
                          ₹
                          {Number(
                            item.price || 0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </td>

                      {/* STATUS */}

                      <td>

                        <button
                          type="button"
                          className={`mm-status-btn ${
                            item.available
                              ? "available"
                              : "unavailable"
                          }`}
                          onClick={() =>
                            handleToggleAvailability(
                              item.id
                            )
                          }
                        >

                          <i
                            className={`bi ${
                              item.available
                                ? "bi-check-circle"
                                : "bi-x-circle"
                            }`}
                          ></i>

                          {item.available
                            ? "Available"
                            : "Unavailable"}

                        </button>

                      </td>

                      {/* ACTION */}

                      <td>

                        <div className="mm-actions">

                          <button
                            type="button"
                            className="mm-edit-btn"
                            onClick={() =>
                              handleEdit(item)
                            }
                            title="Edit menu item"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            type="button"
                            className="mm-delete-btn"
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            title="Delete menu item"
                          >
                            <i className="bi bi-trash3"></i>
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="mm-empty">

              <i className="bi bi-journal-x"></i>

              <h3>
                No Menu Items Found
              </h3>

              <p>
                No items match your current
                search or filter.
              </p>

              <button
                type="button"
                onClick={handleAddNew}
              >
                <i className="bi bi-plus-lg"></i>
                Add Menu Item
              </button>

            </div>

          )}

        </div>

      </div>
    </MainLayout>
  );
}

export default MenuManagement;