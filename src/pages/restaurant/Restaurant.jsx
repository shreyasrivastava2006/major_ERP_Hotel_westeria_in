import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import PageHeader from '../../components/layout/PageHeader'
import Breadcrumb from '../../components/layout/Breadcrumb'
import './Restaurant.css'

function Restaurant() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNo: '#ORD-1001',
      table: 'Table 05',
      guest: 'Rahul Sharma',
      items: 3,
      amount: 1450,
      type: 'Dine In',
      status: 'Preparing'
    },
    {
      id: 2,
      orderNo: '#ORD-1002',
      table: 'Room 205',
      guest: 'Priya Singh',
      items: 2,
      amount: 850,
      type: 'Room Service',
      status: 'Pending'
    },
    {
      id: 3,
      orderNo: '#ORD-1003',
      table: 'Table 02',
      guest: 'Aman Verma',
      items: 4,
      amount: 2100,
      type: 'Dine In',
      status: 'Completed'
    },
    {
      id: 4,
      orderNo: '#ORD-1004',
      table: 'Room 302',
      guest: 'Sneha Gupta',
      items: 2,
      amount: 650,
      type: 'Room Service',
      status: 'Ready'
    }
  ])

  const updateStatus = (id, status) => {
    setOrders(
      orders.map(order =>
        order.id === id
          ? { ...order, status }
          : order
      )
    )
  }

  const totalOrders = orders.length

  const pendingOrders = orders.filter(
    order => order.status === 'Pending'
  ).length

  const preparingOrders = orders.filter(
    order => order.status === 'Preparing'
  ).length

  const completedOrders = orders.filter(
    order => order.status === 'Completed'
  ).length

  const totalRevenue = orders.reduce(
    (total, order) => total + order.amount,
    0
  )

  return (
    <MainLayout>

      <Breadcrumb items={['Restaurant']} />

      <PageHeader
        title="Restaurant Management"
        subtitle="Manage restaurant orders, menu and room service"
      />

      {/* Stats */}
      <div className="restaurant-stats">

        <div className="restaurant-stat-card">
          <div className="restaurant-stat-icon">
            <i className="bi bi-receipt"></i>
          </div>

          <div>
            <span>Total Orders</span>
            <h2>{totalOrders}</h2>
          </div>
        </div>

        <div className="restaurant-stat-card">
          <div className="restaurant-stat-icon pending">
            <i className="bi bi-clock-fill"></i>
          </div>

          <div>
            <span>Pending</span>
            <h2>{pendingOrders}</h2>
          </div>
        </div>

        <div className="restaurant-stat-card">
          <div className="restaurant-stat-icon preparing">
            <i className="bi bi-fire"></i>
          </div>

          <div>
            <span>Preparing</span>
            <h2>{preparingOrders}</h2>
          </div>
        </div>

        <div className="restaurant-stat-card">
          <div className="restaurant-stat-icon completed">
            <i className="bi bi-check-circle-fill"></i>
          </div>

          <div>
            <span>Completed</span>
            <h2>{completedOrders}</h2>
          </div>
        </div>

      </div>

      {/* Revenue */}
      <div className="restaurant-overview">

        <div className="revenue-card">

          <div className="revenue-icon">
            <i className="bi bi-currency-rupee"></i>
          </div>

          <div>
            <span>Today's Restaurant Revenue</span>
            <h2>₹{totalRevenue.toLocaleString('en-IN')}</h2>
          </div>

        </div>

      </div>

      {/* Restaurant Operations */}
      <div className="restaurant-section">

        <div className="restaurant-section-title">
          <h2>Restaurant Operations</h2>
          <p>Quick access to restaurant management</p>
        </div>

        <div className="restaurant-actions">

          {/* Menu Management */}
          <div
            className="restaurant-action-card"
            onClick={() => navigate('/restaurant/menu')}
          >
            <div className="restaurant-action-icon menu">
              <i className="bi bi-menu-button-wide-fill"></i>
            </div>

            <div className="restaurant-action-content">
              <h3>Menu Management</h3>
              <p>
                Add, edit and manage restaurant food and beverages.
              </p>
            </div>

            <i className="bi bi-chevron-right restaurant-action-arrow"></i>
          </div>

          {/* Order Management */}
          <div
            className="restaurant-action-card"
            onClick={() => navigate('/restaurant/orders')}
          >
            <div className="restaurant-action-icon orders">
              <i className="bi bi-basket3-fill"></i>
            </div>

            <div className="restaurant-action-content">
              <h3>Order Management</h3>
              <p>
                Track dine-in and room service orders.
              </p>
            </div>

            <i className="bi bi-chevron-right restaurant-action-arrow"></i>
          </div>

          {/* Room Service */}
          <div
            className="restaurant-action-card"
            onClick={() => navigate('/services/room-services')}
          >
            <div className="restaurant-action-icon service">
              <i className="bi bi-bell-fill"></i>
            </div>

            <div className="restaurant-action-content">
              <h3>Room Service</h3>
              <p>
                Manage food and beverage requests from hotel rooms.
              </p>
            </div>

            <i className="bi bi-chevron-right restaurant-action-arrow"></i>
          </div>

        </div>

      </div>

      {/* Today's Orders */}
      <div className="restaurant-table-card">

        <div className="restaurant-table-header">
          <div>
            <h2>Today's Orders</h2>
            <p>Monitor current restaurant orders</p>
          </div>
        </div>

        <div className="restaurant-table-wrapper">

          <table className="restaurant-table">

            <thead>
              <tr>
                <th>Order</th>
                <th>Table / Room</th>
                <th>Guest</th>
                <th>Items</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {orders.map(order => (
                <tr key={order.id}>

                  <td>
                    <span className="order-number">
                      {order.orderNo}
                    </span>
                  </td>

                  <td>
                    <span className="table-room">
                      {order.table}
                    </span>
                  </td>

                  <td>
                    <strong className="restaurant-guest">
                      {order.guest}
                    </strong>
                  </td>

                  <td>
                    {order.items}
                  </td>

                  <td>
                    <span className="order-type">
                      {order.type}
                    </span>
                  </td>

                  <td>
                    <strong className="restaurant-amount">
                      ₹{order.amount.toLocaleString('en-IN')}
                    </strong>
                  </td>

                  <td>
                    <select
                      className={`order-status ${order.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                      value={order.status}
                      onChange={e =>
                        updateStatus(
                          order.id,
                          e.target.value
                        )
                      }
                    >
                      <option>Pending</option>
                      <option>Preparing</option>
                      <option>Ready</option>
                      <option>Completed</option>
                    </select>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  )
}

export default Restaurant