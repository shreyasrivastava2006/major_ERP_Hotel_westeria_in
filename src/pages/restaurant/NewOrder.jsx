import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import { useHotelData } from '../../context/HotelDataContext'
import { useHotel } from '../../context/HotelContext'
import './NewOrder.css'

const MENU_ITEMS = [
  {
    id: 'FOOD-001',
    name: 'Paneer Tikka',
    price: 320,
    type: 'Veg',
  },
  {
    id: 'FOOD-002',
    name: 'Chicken Biryani',
    price: 450,
    type: 'Non-Veg',
  },
  {
    id: 'FOOD-003',
    name: 'Butter Naan',
    price: 80,
    type: 'Veg',
  },
  {
    id: 'FOOD-004',
    name: 'Dal Makhani',
    price: 280,
    type: 'Veg',
  },
  {
    id: 'FOOD-005',
    name: 'Chicken Tikka',
    price: 390,
    type: 'Non-Veg',
  },
  {
    id: 'FOOD-006',
    name: 'Gulab Jamun',
    price: 150,
    type: 'Veg',
  },
]

function NewOrder() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const {
    addRestaurantOrder,
    guests,
    rooms,
  } = useHotelData()

  const [order, setOrder] = useState({
    guestName: '',
    roomNumber: '',
    orderType: 'Room Service',
    paymentStatus: 'Pending',
    notes: '',
  })

  const [items, setItems] = useState(
    MENU_ITEMS.map((item) => ({
      ...item,
      quantity: 0,
    }))
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const updateQuantity = (id, change) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                0,
                item.quantity + change
              ),
            }
          : item
      )
    )
  }

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    )
  }, [items])

  const tax = subtotal * 0.05

  const total = subtotal + tax

  const selectedItems = items.filter(
    (item) => item.quantity > 0
  )

  const generateOrderNumber = () => {
    const existingOrders =
      JSON.parse(
        localStorage.getItem(
          'wisteriaRestaurantOrders'
        )
      ) || []

    const maxNumber = existingOrders.reduce(
      (max, existingOrder) => {
        const match = String(
          existingOrder.orderNo || ''
        ).match(/(\d+)$/)

        if (!match) {
          return max
        }

        return Math.max(
          max,
          Number(match[1])
        )
      },
      1000
    )

    return `ORD-${maxNumber + 1}`
  }

  const findRoom = () => {
    return (rooms || []).find(
      (room) =>
        String(room.number) ===
          String(order.roomNumber) ||
        String(room.roomNumber) ===
          String(order.roomNumber)
    )
  }

  const findGuest = () => {
    return (guests || []).find(
      (guest) =>
        String(
          guest.name ||
            `${guest.firstName || ''} ${
              guest.lastName || ''
            }`.trim()
        ).toLowerCase() ===
        String(order.guestName)
          .trim()
          .toLowerCase()
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSubmitting) {
      return
    }

    if (!order.guestName.trim()) {
      alert('Please enter guest name.')
      return
    }

    if (!order.roomNumber.trim()) {
      alert('Please enter room number.')
      return
    }

    if (selectedItems.length === 0) {
      alert('Please select at least one food item.')
      return
    }

    const room = findRoom()
    const guest = findGuest()

    if (
      order.orderType === 'Room Service' &&
      rooms?.length > 0 &&
      !room
    ) {
      alert(
        `Room ${order.roomNumber} was not found in the current hotel data.`
      )
      return
    }

    setIsSubmitting(true)

    const now = new Date()

    const orderDate = now.toISOString().split('T')[0]

    const formattedDate =
      now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })

    const newOrder = {
      id: `ORD-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`,

      orderNo: generateOrderNumber(),

      hotelId: selectedHotel?.id || '',
      hotelName: selectedHotel?.name || '',

      guestId: guest?.id || '',
      guestName: order.guestName.trim(),

      roomId: room?.id || '',
      roomNumber: order.roomNumber.trim(),

      orderType: order.orderType,

      items: selectedItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        type: item.type,
      })),

      subtotal,
      tax,
      totalAmount: total,
      amount: total,

      paymentStatus: order.paymentStatus,
      payment: order.paymentStatus,

      status: 'Pending',

      notes: order.notes.trim(),

      orderDate,
      dateISO: orderDate,
      date: formattedDate,

      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }

    try {
      addRestaurantOrder(newOrder)

      alert(
        `Order ${newOrder.orderNo} created successfully!\nTotal Amount: ₹${total.toLocaleString(
          'en-IN',
          {
            maximumFractionDigits: 0,
          }
        )}`
      )

      navigate('/restaurant/orders')
    } catch (error) {
      console.error(
        'Error creating restaurant order:',
        error
      )

      alert(
        'Unable to create order. Please try again.'
      )

      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <Breadcrumb items={['Restaurant', 'New Order']} />

      <PageHeader
        title="New Restaurant Order"
        subtitle="Create a new food order for a guest or room"
      />

      <div className="new-order-page">

        {/* HOTEL BAR */}

        {selectedHotel && (
          <div className="new-order-hotel-bar">
            <div className="new-order-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <span>Order For</span>
              <strong>{selectedHotel.name}</strong>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* ORDER INFORMATION */}

          <div className="new-order-card">

            <div className="new-order-card-header">
              <div>
                <h2>Order Information</h2>
                <p>
                  Enter the basic details for this order
                </p>
              </div>
            </div>

            <div className="new-order-form-grid">

              {/* GUEST */}

              <div className="new-order-form-group">
                <label>
                  Guest Name <span>*</span>
                </label>

                <div className="new-order-input">
                  <i className="bi bi-person"></i>

                  <input
                    type="text"
                    name="guestName"
                    value={order.guestName}
                    onChange={handleChange}
                    placeholder="Enter guest name"
                    required
                  />
                </div>
              </div>

              {/* ROOM */}

              <div className="new-order-form-group">
                <label>
                  Room Number <span>*</span>
                </label>

                <div className="new-order-input">
                  <i className="bi bi-door-open"></i>

                  <input
                    type="text"
                    name="roomNumber"
                    value={order.roomNumber}
                    onChange={handleChange}
                    placeholder="e.g. 101"
                    required
                  />
                </div>
              </div>

              {/* ORDER TYPE */}

              <div className="new-order-form-group">
                <label>Order Type</label>

                <div className="new-order-input">
                  <i className="bi bi-cup-hot"></i>

                  <select
                    name="orderType"
                    value={order.orderType}
                    onChange={handleChange}
                  >
                    <option>
                      Room Service
                    </option>

                    <option>
                      Restaurant
                    </option>

                    <option>
                      Takeaway
                    </option>
                  </select>
                </div>
              </div>

              {/* PAYMENT */}

              <div className="new-order-form-group">
                <label>Payment Status</label>

                <div className="new-order-input">
                  <i className="bi bi-credit-card"></i>

                  <select
                    name="paymentStatus"
                    value={order.paymentStatus}
                    onChange={handleChange}
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Partial</option>
                  </select>
                </div>
              </div>

              {/* NOTES */}

              <div className="new-order-form-group full-width">
                <label>
                  Special Instructions
                </label>

                <textarea
                  name="notes"
                  value={order.notes}
                  onChange={handleChange}
                  placeholder="Add any special instructions..."
                  rows="3"
                ></textarea>
              </div>

            </div>
          </div>

          {/* FOOD ITEMS */}

          <div className="new-order-card">

            <div className="new-order-card-header">
              <div>
                <h2>Select Food Items</h2>
                <p>
                  Choose items and specify the required
                  quantity
                </p>
              </div>

              <span className="food-selection-count">
                {selectedItems.length} Selected
              </span>
            </div>

            <div className="food-items-grid">

              {items.map((item) => (
                <div
                  className={`food-item-card ${
                    item.quantity > 0
                      ? 'selected'
                      : ''
                  }`}
                  key={item.id}
                >

                  <div className="food-item-top">

                    <span
                      className={`food-type-dot ${
                        item.type === 'Veg'
                          ? 'veg'
                          : 'nonveg'
                      }`}
                    ></span>

                    <span className="food-type">
                      {item.type}
                    </span>

                  </div>

                  <h3>{item.name}</h3>

                  <strong>
                    ₹
                    {item.price.toLocaleString(
                      'en-IN'
                    )}
                  </strong>

                  <div className="quantity-control">

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          -1
                        )
                      }
                      disabled={
                        item.quantity === 0
                      }
                    >
                      <i className="bi bi-dash"></i>
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          1
                        )
                      }
                    >
                      <i className="bi bi-plus"></i>
                    </button>

                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* ORDER SUMMARY */}

          <div className="new-order-summary">

            <div className="summary-header">

              <div>
                <h2>Order Summary</h2>

                <p>
                  {selectedItems.length} item
                  {selectedItems.length !== 1
                    ? 's'
                    : ''}{' '}
                  selected
                </p>
              </div>

              <i className="bi bi-cart3"></i>

            </div>

            {selectedItems.length > 0 ? (
              <div className="summary-items">

                {selectedItems.map((item) => (
                  <div
                    className="summary-item"
                    key={item.id}
                  >

                    <div>
                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        {item.quantity} × ₹
                        {item.price.toLocaleString(
                          'en-IN'
                        )}
                      </span>
                    </div>

                    <strong>
                      ₹
                      {(
                        item.quantity *
                        item.price
                      ).toLocaleString(
                        'en-IN'
                      )}
                    </strong>

                  </div>
                ))}

              </div>
            ) : (
              <div className="summary-empty">

                <i className="bi bi-cart3"></i>

                <p>
                  No items selected
                </p>

              </div>
            )}

            <div className="summary-total">

              <div>
                <span>Subtotal</span>

                <strong>
                  ₹
                  {subtotal.toLocaleString(
                    'en-IN',
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </strong>
              </div>

              <div>
                <span>GST (5%)</span>

                <strong>
                  ₹
                  {tax.toLocaleString(
                    'en-IN',
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </strong>
              </div>

              <div className="grand-total">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹
                  {total.toLocaleString(
                    'en-IN',
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </strong>

              </div>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="new-order-actions">

            <button
              type="button"
              className="new-order-cancel"
              onClick={() =>
                navigate('/restaurant')
              }
              disabled={isSubmitting}
            >
              <i className="bi bi-arrow-left"></i>
              Cancel
            </button>

            <button
              type="submit"
              className="new-order-submit"
              disabled={isSubmitting}
            >
              <i
                className={`bi ${
                  isSubmitting
                    ? 'bi-hourglass-split'
                    : 'bi-check-circle'
                }`}
              ></i>

              {isSubmitting
                ? 'Creating...'
                : 'Create Order'}
            </button>

          </div>

        </form>
      </div>
    </MainLayout>
  )
}

export default NewOrder