import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './Orders.css'

function Orders() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNo: 'ORD-1001',
      guest: 'Rahul Sharma',
      room: '101',
      items: 'Paneer Tikka, Butter Naan',
      amount: 480,
      orderType: 'Room Service',
      status: 'Pending',
      payment: 'Pending',
      date: '28 Sep 2026',
    },
    {
      id: 2,
      orderNo: 'ORD-1002',
      guest: 'Priya Verma',
      room: '201',
      items: 'Chicken Biryani, Gulab Jamun',
      amount: 600,
      orderType: 'Room Service',
      status: 'Preparing',
      payment: 'Paid',
      date: '28 Sep 2026',
    },
    {
      id: 3,
      orderNo: 'ORD-1003',
      guest: 'Aman Singh',
      room: '102',
      items: 'Dal Makhani, Butter Naan',
      amount: 360,
      orderType: 'Restaurant',
      status: 'Ready',
      payment: 'Paid',
      date: '27 Sep 2026',
    },
    {
      id: 4,
      orderNo: 'ORD-1004',
      guest: 'Neha Kapoor',
      room: '205',
      items: 'Chicken Tikka, Garlic Naan',
      amount: 490,
      orderType: 'Room Service',
      status: 'Completed',
      payment: 'Paid',
      date: '27 Sep 2026',
    },
    {
      id: 5,
      orderNo: 'ORD-1005',
      guest: 'Vikash Yadav',
      room: '302',
      items: 'Gulab Jamun',
      amount: 150,
      orderType: 'Takeaway',
      status: 'Completed',
      payment: 'Paid',
      date: '26 Sep 2026',
    },
  ])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    )
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('All')
    setTypeFilter('All')
  }

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      order.orderNo.toLowerCase().includes(searchText) ||
      order.guest.toLowerCase().includes(searchText) ||
      order.room.toLowerCase().includes(searchText) ||
      order.items.toLowerCase().includes(searchText)

    const matchesStatus =
      statusFilter === 'All' ||
      order.status === statusFilter

    const matchesType =
      typeFilter === 'All' ||
      order.orderType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const totalOrders = orders.length

  const pendingOrders = orders.filter(
    (order) => order.status === 'Pending'
  ).length

  const preparingOrders = orders.filter(
    (order) => order.status === 'Preparing'
  ).length

  const completedOrders = orders.filter(
    (order) => order.status === 'Completed'
  ).length

  const totalRevenue = orders.reduce(
    (total, order) => total + order.amount,
    0
  )

  return (
    <MainLayout>
      <Breadcrumb items={['Restaurant', 'Orders']} />

      <PageHeader
        title="Restaurant Orders"
        subtitle="Manage food orders, order status and payments"
      />

      <div className="orders-page">

        {/* Stats */}

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

        {/* Revenue */}

        <div className="orders-revenue">
          <div className="orders-revenue-icon">
            <i className="bi bi-currency-rupee"></i>
          </div>

          <div>
            <span>Total Order Revenue</span>
            <strong>
              ₹{totalRevenue.toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        {/* Filters */}

        <div className="orders-filter-card">

          <div className="orders-search">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search order, guest or room..."
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

        {/* Table */}

        <div className="orders-table-card">

          <div className="orders-table-header">
            <div>
              <h2>Order List</h2>
              <p>
                Showing {filteredOrders.length} of {orders.length} orders
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
                </tr>
              </thead>

              <tbody>

                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>

                      <td>
                        <span className="order-number">
                          #{order.orderNo}
                        </span>
                      </td>

                      <td>
                        <strong className="order-guest">
                          {order.guest}
                        </strong>
                      </td>

                      <td>
                        <span className="order-room">
                          Room {order.room}
                        </span>
                      </td>

                      <td>
                        <span className="order-items">
                          {order.items}
                        </span>
                      </td>

                      <td>
                        <span className="order-type">
                          {order.orderType}
                        </span>
                      </td>

                      <td>
                        <strong className="order-amount">
                          ₹{order.amount.toLocaleString('en-IN')}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`payment-status ${
                            order.payment.toLowerCase()
                          }`}
                        >
                          {order.payment}
                        </span>
                      </td>

                      <td>
                        <select
                          className={`order-status-select ${order.status
                            .toLowerCase()
                            .replace(' ', '-')}`}
                          value={order.status}
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
                        </select>
                      </td>

                      <td>
                        <span className="order-date">
                          {order.date}
                        </span>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">
                      <div className="orders-empty">
                        <i className="bi bi-receipt"></i>
                        <h3>No Orders Found</h3>
                        <p>
                          Try changing your search or filters.
                        </p>
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