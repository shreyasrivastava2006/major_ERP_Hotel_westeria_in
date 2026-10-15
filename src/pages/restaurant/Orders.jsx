import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import { useHotelData } from '../../context/HotelDataContext'
import { useHotel } from '../../context/HotelContext'
import './Orders.css'

function Orders() {
  const navigate = useNavigate()
  const { selectedHotel } = useHotel()

  const {
    restaurantOrders,
    updateRestaurantOrder,
    deleteRestaurantOrder,
  } = useHotelData()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [paymentFilter, setPaymentFilter] = useState('All')

  const hotelOrders = useMemo(() => {
    if (!selectedHotel?.id) {
      return restaurantOrders || []
    }

    const hasHotelSpecificOrders = restaurantOrders?.some(
      (order) => order.hotelId
    )

    if (!hasHotelSpecificOrders) {
      return restaurantOrders || []
    }

    return (restaurantOrders || []).filter(
      (order) => order.hotelId === selectedHotel.id
    )
  }, [restaurantOrders, selectedHotel])

  const filteredOrders = useMemo(() => {
    const searchText = search.toLowerCase().trim()

    return hotelOrders.filter((order) => {

      const itemsText = Array.isArray(order.items)
        ? order.items
            .map((item) => item.name)
            .join(' ')
            .toLowerCase()
        : String(order.items || '').toLowerCase()

      const guestName = String(
        order.guestName || order.guest || ''
      ).toLowerCase()

      const roomNumber = String(
        order.roomNumber || order.room || ''
      ).toLowerCase()

      const orderNo = String(order.orderNo || '').toLowerCase()

      const matchesSearch =
        !searchText ||
        orderNo.includes(searchText) ||
        guestName.includes(searchText) ||
        roomNumber.includes(searchText) ||
        itemsText.includes(searchText)

      const matchesStatus =
        statusFilter === 'All' ||
        order.status === statusFilter

      const matchesType =
        typeFilter === 'All' ||
        order.orderType === typeFilter

      const paymentStatus =
        order.paymentStatus || order.payment || 'Pending'

      const matchesPayment =
        paymentFilter === 'All' ||
        paymentStatus === paymentFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPayment
      )
    })
  }, [
    hotelOrders,
    search,
    statusFilter,
    typeFilter,
    paymentFilter,
  ])

  const totalOrders = hotelOrders.length

  const pendingOrders = hotelOrders.filter(
    (order) => order.status === 'Pending'
  ).length

  const preparingOrders = hotelOrders.filter(
    (order) => order.status === 'Preparing'
  ).length

  const readyOrders = hotelOrders.filter(
    (order) => order.status === 'Ready'
  ).length

  const completedOrders = hotelOrders.filter(
    (order) => order.status === 'Completed'
  ).length

  const totalRevenue = hotelOrders
    .filter((order) => order.status !== 'Cancelled')
    .reduce(
      (total, order) =>
        total + Number(order.totalAmount || order.amount || 0),
      0
    )

  const updateStatus = (id, newStatus) => {
    updateRestaurantOrder(id, {
      status: newStatus,
    })
  }

  const updatePayment = (id, newPayment) => {
    updateRestaurantOrder(id, {
      paymentStatus: newPayment,
      payment: newPayment,
    })
  }

  const handleDelete = (order) => {
    const confirmDelete = window.confirm(
      `Delete order ${order.orderNo}?`
    )

    if (!confirmDelete) {
      return
    }

    deleteRestaurantOrder(order.id)
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('All')
    setTypeFilter('All')
    setPaymentFilter('All')
  }

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString('en-IN', {
      maximumFractionDigits: 0,
    })}`
  }

  const formatDate = (order) => {
    if (order.date) {
      return order.date
    }

    if (order.orderDate) {
      return new Date(order.orderDate).toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }
      )
    }

    return '—'
  }

  const getItemsText = (order) => {
    if (!Array.isArray(order.items)) {
      return order.items || 'No items'
    }

    return order.items
      .map((item) => `${item.name} × ${item.quantity}`)
      .join(', ')
  }

  return (
    <MainLayout>
      <Breadcrumb items={['Restaurant', 'Orders']} />

      <PageHeader
        title="Restaurant Orders"
        subtitle="Manage food orders, order status and payments"
      />

      <div className="orders-page">

        {/* HOTEL BAR */}

        {selectedHotel && (
          <div className="orders-hotel-bar">
            <div className="orders-hotel-icon">
              <i className="bi bi-building"></i>
            </div>

            <div>
              <span>Currently Managing</span>
              <strong>{selectedHotel.name}</strong>
            </div>
          </div>
        )}

        {/* STATS */}

        <div className="orders-stats">

          <div className="orders-stat-card">
            <div className="orders-stat-icon">
              <i className="bi bi-receipt"></i>
            </div>

            <div>
              <span>Total Orders</span>
              <h3>{totalOrders}</h3>
            </div>
          </div>

          <div className="orders-stat-card">
            <div className="orders-stat-icon pending">
              <i className="bi bi-clock"></i>
            </div>

            <div>
              <span>Pending</span>
              <h3>{pendingOrders}</h3>
            </div>
          </div>

          <div className="orders-stat-card">
            <div className="orders-stat-icon preparing">
              <i className="bi bi-fire"></i>
            </div>

            <div>
              <span>Preparing</span>
              <h3>{preparingOrders}</h3>
            </div>
          </div>

          <div className="orders-stat-card">
            <div className="orders-stat-icon completed">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Completed</span>
              <h3>{completedOrders}</h3>
            </div>
          </div>

        </div>

        {/* REVENUE */}

        <div className="orders-revenue">
          <div className="orders-revenue-icon">
            <i className="bi bi-currency-rupee"></i>
          </div>

          <div>
            <span>Total Order Revenue</span>
            <strong>{formatCurrency(totalRevenue)}</strong>
          </div>
        </div>

        {/* FILTERS */}

        <div className="orders-filter-card">

          <div className="orders-search">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search order, guest, room or item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Order Types</option>
            <option value="Room Service">Room Service</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Takeaway">Takeaway</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="All">All Payments</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
          </select>

          <button
            type="button"
            className="orders-clear-btn"
            onClick={clearFilters}
          >
            <i className="bi bi-arrow-counterclockwise"></i>
            Clear
          </button>

          <button
            type="button"
            className="orders-new-btn"
            onClick={() => navigate('/restaurant/new-order')}
          >
            <i className="bi bi-plus-lg"></i>
            New Order
          </button>

        </div>

        {/* TABLE */}

        <div className="orders-table-card">

          <div className="orders-table-header">

            <div>
              <h2>Order List</h2>

              <p>
                Showing {filteredOrders.length} of {hotelOrders.length}{' '}
                orders
              </p>
            </div>

            <span className="orders-result">
              {filteredOrders.length} Results
            </span>

          </div>

          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>
                <tr>
                  <th>ORDER NO.</th>
                  <th>GUEST</th>
                  <th>ROOM</th>
                  <th>ITEMS</th>
                  <th>TYPE</th>
                  <th>AMOUNT</th>
                  <th>PAYMENT</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {

                    const payment =
                      order.paymentStatus ||
                      order.payment ||
                      'Pending'

                    return (
                      <tr key={order.id}>

                        <td>
                          <span className="order-number">
                            #{order.orderNo}
                          </span>
                        </td>

                        <td>
                          <strong className="order-guest">
                            {order.guestName || order.guest}
                          </strong>
                        </td>

                        <td>
                          <span className="order-room">
                            {order.roomNumber
                              ? `Room ${order.roomNumber}`
                              : '—'}
                          </span>
                        </td>

                        <td>
                          <span className="order-items">
                            {getItemsText(order)}
                          </span>
                        </td>

                        <td>
                          <span className="order-type">
                            {order.orderType}
                          </span>
                        </td>

                        <td>
                          <strong className="order-amount">
                            {formatCurrency(
                              order.totalAmount || order.amount
                            )}
                          </strong>
                        </td>

                        <td>
                          <select
                            className={`payment-status-select ${payment
                              .toLowerCase()
                              .replace(/\s+/g, '-')}`}
                            value={payment}
                            onChange={(e) =>
                              updatePayment(
                                order.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Partial">
                              Partial
                            </option>

                            <option value="Paid">
                              Paid
                            </option>
                          </select>
                        </td>

                        <td>
                          <select
                            className={`order-status-select ${String(
                              order.status || 'Pending'
                            )
                              .toLowerCase()
                              .replace(/\s+/g, '-')}`}
                            value={order.status || 'Pending'}
                            onChange={(e) =>
                              updateStatus(
                                order.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Preparing">
                              Preparing
                            </option>

                            <option value="Ready">
                              Ready
                            </option>

                            <option value="Completed">
                              Completed
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>
                          </select>
                        </td>

                        <td>
                          <span className="order-date">
                            {formatDate(order)}
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="order-delete-btn"
                            title="Delete Order"
                            onClick={() =>
                              handleDelete(order)
                            }
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </td>

                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="10">

                      <div className="orders-empty">

                        <i className="bi bi-receipt"></i>

                        <h3>No Orders Found</h3>

                        <p>
                          {hotelOrders.length === 0
                            ? 'No restaurant orders have been created yet.'
                            : 'Try changing your search or filters.'}
                        </p>

                        {hotelOrders.length === 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              navigate('/restaurant/new-order')
                            }
                          >
                            <i className="bi bi-plus-lg"></i>
                            Create Order
                          </button>
                        )}

                      </div>

                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  )
}

export default Orders