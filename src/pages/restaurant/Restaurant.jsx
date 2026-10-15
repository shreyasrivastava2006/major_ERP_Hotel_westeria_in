import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './Restaurant.css'

function Restaurant() {
  const navigate = useNavigate()

  const stats = [
    {
      title: 'Total Orders',
      value: '24',
      subtitle: 'Today',
      icon: 'bi-receipt',
      className: ''
    },
    {
      title: 'Pending Orders',
      value: '5',
      subtitle: 'Need attention',
      icon: 'bi-clock',
      className: 'pending'
    },
    {
      title: 'Preparing',
      value: '7',
      subtitle: 'In kitchen',
      icon: 'bi-fire',
      className: 'preparing'
    },
    {
      title: "Today's Revenue",
      value: '₹18,450',
      subtitle: 'Restaurant earnings',
      icon: 'bi-currency-rupee',
      className: 'revenue'
    }
  ]

  const recentOrders = [
    {
      id: 1,
      orderNo: 'ORD-1001',
      guest: 'Rahul Sharma',
      room: '101',
      items: 'Paneer Tikka, Butter Naan',
      amount: 480,
      status: 'Pending'
    },
    {
      id: 2,
      orderNo: 'ORD-1002',
      guest: 'Priya Verma',
      room: '201',
      items: 'Chicken Biryani, Gulab Jamun',
      amount: 600,
      status: 'Preparing'
    },
    {
      id: 3,
      orderNo: 'ORD-1003',
      guest: 'Aman Singh',
      room: '102',
      items: 'Dal Makhani, Butter Naan',
      amount: 360,
      status: 'Ready'
    },
    {
      id: 4,
      orderNo: 'ORD-1004',
      guest: 'Neha Kapoor',
      room: '205',
      items: 'Chicken Tikka, Garlic Naan',
      amount: 490,
      status: 'Completed'
    }
  ]

  const quickActions = [
    {
      title: 'Restaurant Menu',
      description: 'View food items and availability',
      icon: 'bi-menu-button-wide',
      path: '/restaurant/menu'
    },
    {
      title: 'Menu Management',
      description: 'Manage food items and pricing',
      icon: 'bi-gear',
      path: '/restaurant/menu-management'
    },
    {
      title: 'New Order',
      description: 'Create a new restaurant order',
      icon: 'bi-plus-circle',
      path: '/restaurant/new-order'
    },
    {
      title: 'All Orders',
      description: 'View and manage restaurant orders',
      icon: 'bi-receipt',
      path: '/restaurant/orders'
    }
  ]

  return (
    <MainLayout>

      <Breadcrumb items={['Restaurant']} />

      <PageHeader
        title="Restaurant"
        subtitle="Manage restaurant operations, food orders and menu"
      />

      <div className="restaurant-page">

        {/* Stats */}

        <div className="restaurant-stats">

          {stats.map((stat) => (
            <div className="restaurant-stat-card" key={stat.title}>

              <div className={`restaurant-stat-icon ${stat.className}`}>
                <i className={`bi ${stat.icon}`}></i>
              </div>

              <div>
                <span>{stat.title}</span>
                <h3>{stat.value}</h3>
                <small>{stat.subtitle}</small>
              </div>

            </div>
          ))}

        </div>

        {/* Quick Actions */}

        <div className="restaurant-section">

          <div className="restaurant-section-header">
            <div>
              <h2>Restaurant Operations</h2>
              <p>Quick access to restaurant management modules</p>
            </div>
          </div>

          <div className="restaurant-actions">

            {quickActions.map((action) => (
              <button
                type="button"
                className="restaurant-action-card"
                key={action.title}
                onClick={() => navigate(action.path)}
              >

                <div className="restaurant-action-icon">
                  <i className={`bi ${action.icon}`}></i>
                </div>

                <div className="restaurant-action-content">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>

                <i className="bi bi-arrow-right restaurant-action-arrow"></i>

              </button>
            ))}

          </div>

        </div>

        {/* Revenue + Kitchen Overview */}

        <div className="restaurant-overview">

          <div className="restaurant-overview-card revenue-card">

            <div className="overview-card-header">
              <div>
                <h2>Today's Revenue</h2>
                <p>Restaurant income overview</p>
              </div>

              <div className="overview-icon">
                <i className="bi bi-currency-rupee"></i>
              </div>
            </div>

            <div className="revenue-value">
              ₹18,450
            </div>

            <div className="revenue-details">
              <div>
                <span>Room Service</span>
                <strong>₹11,250</strong>
              </div>

              <div>
                <span>Restaurant</span>
                <strong>₹5,700</strong>
              </div>

              <div>
                <span>Takeaway</span>
                <strong>₹1,500</strong>
              </div>
            </div>

          </div>

          <div className="restaurant-overview-card kitchen-card">

            <div className="overview-card-header">
              <div>
                <h2>Kitchen Status</h2>
                <p>Current order processing</p>
              </div>

              <div className="overview-icon">
                <i className="bi bi-cup-hot"></i>
              </div>
            </div>

            <div className="kitchen-status-list">

              <div className="kitchen-status-item">
                <div>
                  <span className="status-dot pending-dot"></span>
                  <span>Pending</span>
                </div>

                <strong>5</strong>
              </div>

              <div className="kitchen-status-item">
                <div>
                  <span className="status-dot preparing-dot"></span>
                  <span>Preparing</span>
                </div>

                <strong>7</strong>
              </div>

              <div className="kitchen-status-item">
                <div>
                  <span className="status-dot ready-dot"></span>
                  <span>Ready</span>
                </div>

                <strong>4</strong>
              </div>

              <div className="kitchen-status-item">
                <div>
                  <span className="status-dot completed-dot"></span>
                  <span>Completed</span>
                </div>

                <strong>8</strong>
              </div>

            </div>

          </div>

        </div>

        {/* Recent Orders */}

        <div className="restaurant-table-card">

          <div className="restaurant-table-header">

            <div>
              <h2>Recent Orders</h2>
              <p>Latest restaurant orders</p>
            </div>

            <button
              type="button"
              className="view-all-btn"
              onClick={() => navigate('/restaurant/orders')}
            >
              View All
              <i className="bi bi-arrow-right"></i>
            </button>

          </div>

          <div className="restaurant-table-wrapper">

            <table className="restaurant-table">

              <thead>
                <tr>
                  <th>ORDER NO.</th>
                  <th>GUEST</th>
                  <th>ROOM</th>
                  <th>ITEMS</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>

                {recentOrders.map((order) => (
                  <tr key={order.id}>

                    <td>
                      <span className="restaurant-order-number">
                        #{order.orderNo}
                      </span>
                    </td>

                    <td>
                      <strong>{order.guest}</strong>
                    </td>

                    <td>
                      <span className="restaurant-room">
                        Room {order.room}
                      </span>
                    </td>

                    <td>
                      <span className="restaurant-order-items">
                        {order.items}
                      </span>
                    </td>

                    <td>
                      <strong className="restaurant-order-amount">
                        ₹{order.amount.toLocaleString('en-IN')}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`restaurant-order-status ${order.status
                          .toLowerCase()
                          .replace(' ', '-')}`}
                      >
                        <span></span>
                        {order.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default Restaurant