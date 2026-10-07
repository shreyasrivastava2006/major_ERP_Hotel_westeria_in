import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NewOrder.css'

function NewOrder() {
  const navigate = useNavigate()

  const menuItems = [
    { id: 1, name: 'Paneer Butter Masala', price: 320 },
    { id: 2, name: 'Veg Biryani', price: 280 },
    { id: 3, name: 'Dal Makhani', price: 250 },
    { id: 4, name: 'Butter Naan', price: 60 },
    { id: 5, name: 'Fresh Lime Soda', price: 120 },
    { id: 6, name: 'Gulab Jamun', price: 100 }
  ]

  const [order, setOrder] = useState({
    guest: '',
    tableRoom: '',
    orderType: 'Dine In',
    notes: ''
  })

  const [selectedItems, setSelectedItems] = useState([])

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    })
  }

  const addItem = (item) => {
    const existing = selectedItems.find(
      selected => selected.id === item.id
    )

    if (existing) {
      setSelectedItems(
        selectedItems.map(selected =>
          selected.id === item.id
            ? { ...selected, quantity: selected.quantity + 1 }
            : selected
        )
      )
    } else {
      setSelectedItems([
        ...selectedItems,
        { ...item, quantity: 1 }
      ])
    }
  }

  const decreaseItem = (id) => {
    setSelectedItems(
      selectedItems
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setSelectedItems(
      selectedItems.filter(item => item.id !== id)
    )
  }

  const subtotal = selectedItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  const tax = Math.round(subtotal * 0.05)

  const total = subtotal + tax

  const placeOrder = (e) => {
    e.preventDefault()

    if (!order.guest || !order.tableRoom || selectedItems.length === 0) {
      return
    }

    alert('Order placed successfully!')

    navigate('/restaurant/orders')
  }

  return (
    <div className="new-order-page">

      <div className="new-order-header">
        <div>
          <h1>New Order</h1>
          <p>Create a new restaurant or room service order</p>
        </div>

        <button
          className="back-orders-btn"
          onClick={() => navigate('/restaurant/orders')}
        >
          <i className="bi bi-arrow-left"></i>
          Orders
        </button>
      </div>

      <form onSubmit={placeOrder}>

        <div className="new-order-layout">

          <div className="order-left">

            <div className="order-info-card">

              <div className="order-card-title">
                <div>
                  <h2>Order Information</h2>
                  <p>Enter guest and order details</p>
                </div>

                <i className="bi bi-person-lines-fill"></i>
              </div>

              <div className="order-form-grid">

                <div className="order-input-group">
                  <label>Guest Name</label>
                  <input
                    type="text"
                    name="guest"
                    placeholder="Enter guest name"
                    value={order.guest}
                    onChange={handleChange}
                  />
                </div>

                <div className="order-input-group">
                  <label>Table / Room Number</label>
                  <input
                    type="text"
                    name="tableRoom"
                    placeholder="e.g. Table 05 / Room 205"
                    value={order.tableRoom}
                    onChange={handleChange}
                  />
                </div>

                <div className="order-input-group">
                  <label>Order Type</label>
                  <select
                    name="orderType"
                    value={order.orderType}
                    onChange={handleChange}
                  >
                    <option>Dine In</option>
                    <option>Room Service</option>
                    <option>Takeaway</option>
                  </select>
                </div>

                <div className="order-input-group">
                  <label>Special Instructions</label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="Optional instructions"
                    value={order.notes}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>

            <div className="available-menu-card">

              <div className="order-card-title">
                <div>
                  <h2>Menu Items</h2>
                  <p>Select items to add to the order</p>
                </div>

                <i className="bi bi-menu-button-wide-fill"></i>
              </div>

              <div className="available-menu-grid">

                {menuItems.map(item => (

                  <div
                    className="available-menu-item"
                    key={item.id}
                  >

                    <div className="available-item-icon">
                      <i className="bi bi-cup-hot-fill"></i>
                    </div>

                    <div className="available-item-info">
                      <h3>{item.name}</h3>
                      <strong>₹{item.price}</strong>
                    </div>

                    <button
                      type="button"
                      className="add-item-btn"
                      onClick={() => addItem(item)}
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>

                  </div>

                ))}

              </div>

            </div>

          </div>

          <div className="order-summary-card">

            <div className="summary-header">
              <div>
                <h2>Order Summary</h2>
                <p>{selectedItems.length} item(s) selected</p>
              </div>

              <i className="bi bi-receipt-cutoff"></i>
            </div>

            <div className="selected-items">

              {selectedItems.length === 0 ? (

                <div className="empty-order">
                  <i className="bi bi-basket3"></i>
                  <p>No items added</p>
                  <span>Select items from the menu</span>
                </div>

              ) : (

                selectedItems.map(item => (

                  <div
                    className="selected-order-item"
                    key={item.id}
                  >

                    <div className="selected-item-details">
                      <h3>{item.name}</h3>
                      <span>₹{item.price} each</span>
                    </div>

                    <div className="quantity-controls">

                      <button
                        type="button"
                        onClick={() => decreaseItem(item.id)}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => addItem(item)}
                      >
                        +
                      </button>

                    </div>

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>

                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>

                  </div>

                ))

              )}

            </div>

            <div className="summary-total">

              <div>
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>

              <div>
                <span>Tax (5%)</span>
                <strong>₹{tax}</strong>
              </div>

              <div className="grand-total">
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>

            </div>

            <button
              type="submit"
              className="place-order-btn"
            >
              <i className="bi bi-check-circle-fill"></i>
              Place Order
            </button>

          </div>

        </div>

      </form>

    </div>
  )
}

export default NewOrder