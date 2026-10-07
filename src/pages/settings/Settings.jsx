import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './Settings.css'

function Settings() {
  const navigate = useNavigate()

  const settingsItems = [
    {
      title: 'Hotel Profile',
      icon: 'bi-building',
      description:
        'Manage hotel information, contact details and property information.',
      path: '/settings/hotel-profile',
      action: 'Manage'
    },
    {
      title: 'User Management',
      icon: 'bi-people',
      description:
        'Manage system users, roles and access permissions.',
      path: '/settings/user-management',
      action: 'Manage'
    },
    {
      title: 'Roles & Permissions',
      icon: 'bi-shield-lock',
      description:
        'Manage user roles and define system access permissions.',
      path: '/settings/roles-permissions',
      action: 'Manage'
    },
    {
      title: 'Notifications',
      icon: 'bi-bell',
      description:
        'Manage notification preferences and system alerts.',
      action: 'Coming Soon'
    },
    {
      title: 'Security',
      icon: 'bi-lock',
      description:
        'Manage password, login and security preferences.',
      action: 'Coming Soon'
    }
  ]

  const handleAction = (item) => {
    if (item.path) {
      navigate(item.path)
    } else {
      alert(`${item.title} settings coming soon`)
    }
  }

  return (
    <MainLayout>

      <div className="settings-page">

        <Breadcrumb items={['Settings']} />

        <PageHeader
          title="Settings"
          subtitle="Manage hotel settings and system preferences"
        />

        <div className="settings-grid">

          {settingsItems.map((item) => (
            <div
              className="settings-card"
              key={item.title}
            >

              <div className="settings-card-icon">
                <i className={`bi ${item.icon}`}></i>
              </div>

              <div className="settings-card-content">

                <h2>{item.title}</h2>

                <p>
                  {item.description}
                </p>

                <button
                  type="button"
                  className="settings-card-btn"
                  onClick={() => handleAction(item)}
                >
                  {item.action}

                  <i
                    className={`bi ${
                      item.path
                        ? 'bi-arrow-right'
                        : 'bi-clock'
                    }`}
                  ></i>
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </MainLayout>
  )
}

export default Settings