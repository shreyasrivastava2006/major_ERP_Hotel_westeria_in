import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './Maintenance.css'

function Maintenance() {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([
    {
      id: 'MT-1001',
      issue: 'AC not cooling',
      location: 'Room 101',
      assigned: 'Vikash Yadav',
      priority: 'High',
      date: '14 Sep 2026',
      status: 'In Progress',
    },
    {
      id: 'MT-1002',
      issue: 'Bathroom tap leakage',
      location: 'Room 205',
      assigned: 'Aman Gupta',
      priority: 'Medium',
      date: '14 Sep 2026',
      status: 'Pending',
    },
    {
      id: 'MT-1003',
      issue: 'TV remote not working',
      location: 'Room 302',
      assigned: 'Vikash Yadav',
      priority: 'Low',
      date: '13 Sep 2026',
      status: 'Completed',
    },
    {
      id: 'MT-1004',
      issue: 'Lift maintenance',
      location: 'Main Building',
      assigned: 'Aman Gupta',
      priority: 'High',
      date: '12 Sep 2026',
      status: 'In Progress',
    },
    {
      id: 'MT-1005',
      issue: 'Light replacement',
      location: 'Room 204',
      assigned: 'Vikash Yadav',
      priority: 'Low',
      date: '11 Sep 2026',
      status: 'Completed',
    },
  ])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredTasks = tasks.filter((task) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      task.id.toLowerCase().includes(searchText) ||
      task.issue.toLowerCase().includes(searchText) ||
      task.location.toLowerCase().includes(searchText) ||
      task.assigned.toLowerCase().includes(searchText)

    const matchesStatus =
      statusFilter === 'All' || task.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const pending = tasks.filter((task) => task.status === 'Pending').length
  const inProgress = tasks.filter(
    (task) => task.status === 'In Progress'
  ).length
  const completed = tasks.filter(
    (task) => task.status === 'Completed'
  ).length

  const updateStatus = (id) => {
    setTasks((previous) =>
      previous.map((task) => {
        if (task.id !== id) return task

        if (task.status === 'Pending') {
          return { ...task, status: 'In Progress' }
        }

        if (task.status === 'In Progress') {
          return { ...task, status: 'Completed' }
        }

        return task
      })
    )
  }

  return (
    <MainLayout>
      <div className="maintenance-page">

        <Breadcrumb items={['Maintenance']} />

        <div className="maintenance-header">
          <PageHeader
            title="Maintenance"
            subtitle="Manage maintenance tasks, repairs and service activities"
          />

          <div className="maintenance-header-actions">
            <button
              type="button"
              className="maintenance-secondary-btn"
              onClick={() => navigate('/maintenance/equipment')}
            >
              <i className="bi bi-tools"></i>
              Equipment
            </button>

            <button
              type="button"
              className="maintenance-secondary-btn"
              onClick={() => navigate('/maintenance/requests')}
            >
              <i className="bi bi-clipboard-check"></i>
              Requests
            </button>

            <button
              type="button"
              className="maintenance-primary-btn"
              onClick={() => navigate('/maintenance/requests')}
            >
              <i className="bi bi-plus-lg"></i>
              New Request
            </button>
          </div>
        </div>

        <div className="maintenance-stats">

          <div className="maintenance-stat-card">
            <div className="maintenance-stat-icon">
              <i className="bi bi-tools"></i>
            </div>
            <div>
              <span>Total Tasks</span>
              <strong>{tasks.length}</strong>
            </div>
          </div>

          <div className="maintenance-stat-card">
            <div className="maintenance-stat-icon pending-icon">
              <i className="bi bi-clock"></i>
            </div>
            <div>
              <span>Pending</span>
              <strong>{pending}</strong>
            </div>
          </div>

          <div className="maintenance-stat-card">
            <div className="maintenance-stat-icon progress-icon">
              <i className="bi bi-arrow-repeat"></i>
            </div>
            <div>
              <span>In Progress</span>
              <strong>{inProgress}</strong>
            </div>
          </div>

          <div className="maintenance-stat-card">
            <div className="maintenance-stat-icon completed-icon">
              <i className="bi bi-check-circle"></i>
            </div>
            <div>
              <span>Completed</span>
              <strong>{completed}</strong>
            </div>
          </div>

        </div>

        <div className="maintenance-card">

          <div className="maintenance-card-header">
            <div>
              <h2>Maintenance Tasks</h2>
              <p>Track current repair and maintenance activities</p>
            </div>

            <span className="maintenance-count">
              {filteredTasks.length} Tasks
            </span>
          </div>

          <div className="maintenance-toolbar">

            <div className="maintenance-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search maintenance..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="maintenance-filter-card">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

          </div>

          <div className="maintenance-table-wrapper">

            <table className="maintenance-table">

              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>Issue</th>
                  <th>Location</th>
                  <th>Assigned To</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="maintenance-empty">
                      <i className="bi bi-search"></i>
                      <span>No maintenance tasks found.</span>
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <tr key={task.id}>

                      <td>
                        <strong>{task.id}</strong>
                      </td>

                      <td>
                        <div className="maintenance-issue">
                          <div className="maintenance-item-icon">
                            <i className="bi bi-wrench-adjustable"></i>
                          </div>

                          <span>{task.issue}</span>
                        </div>
                      </td>

                      <td>
                        <span className="maintenance-location">
                          <i className="bi bi-geo-alt"></i>
                          {task.location}
                        </span>
                      </td>

                      <td>{task.assigned}</td>

                      <td>
                        <span
                          className={`maintenance-priority ${task.priority.toLowerCase()}`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td>{task.date}</td>

                      <td>
                        <span
                          className={`maintenance-status ${task.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td>
                        {task.status === 'Completed' ? (
                          <span className="maintenance-done">
                            <i className="bi bi-check-lg"></i>
                            Done
                          </span>
                        ) : (
                          <button
                            type="button"
                            className={`maintenance-action-btn ${
                              task.status === 'Pending'
                                ? 'start'
                                : 'complete'
                            }`}
                            onClick={() => updateStatus(task.id)}
                          >
                            <i
                              className={
                                task.status === 'Pending'
                                  ? 'bi bi-play-fill'
                                  : 'bi bi-check-lg'
                              }
                            ></i>

                            {task.status === 'Pending'
                              ? 'Start'
                              : 'Complete'}
                          </button>
                        )}
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  )
}

export default Maintenance