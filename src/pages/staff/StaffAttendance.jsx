import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './StaffAttendance.css'

function StaffAttendance() {
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState('2026-09-14')
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const [attendance, setAttendance] = useState([
    {
      id: 1,
      employeeId: 'EMP-1001',
      name: 'Anjali Sharma',
      department: 'Front Office',
      shift: 'Morning',
      checkIn: '08:55 AM',
      checkOut: '05:05 PM',
      status: 'Present'
    },
    {
      id: 2,
      employeeId: 'EMP-1002',
      name: 'Rahul Verma',
      department: 'Housekeeping',
      shift: 'Morning',
      checkIn: '09:10 AM',
      checkOut: '05:15 PM',
      status: 'Late'
    },
    {
      id: 3,
      employeeId: 'EMP-1003',
      name: 'Priya Singh',
      department: 'Restaurant',
      shift: 'Afternoon',
      checkIn: '01:00 PM',
      checkOut: '09:00 PM',
      status: 'Present'
    },
    {
      id: 4,
      employeeId: 'EMP-1004',
      name: 'Aman Gupta',
      department: 'Kitchen',
      shift: 'Evening',
      checkIn: '-',
      checkOut: '-',
      status: 'Absent'
    },
    {
      id: 5,
      employeeId: 'EMP-1005',
      name: 'Neha Kapoor',
      department: 'Accounts',
      shift: 'Morning',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
      status: 'Present'
    },
    {
      id: 6,
      employeeId: 'EMP-1006',
      name: 'Vikash Yadav',
      department: 'Maintenance',
      shift: 'Night',
      checkIn: '-',
      checkOut: '-',
      status: 'On Leave'
    }
  ])

  const handleStatusChange = (id, status) => {
    setAttendance((prev) =>
      prev.map((person) =>
        person.id === id
          ? {
              ...person,
              status
            }
          : person
      )
    )
  }

  const filteredAttendance = attendance.filter((person) => {
    const searchValue = search.toLowerCase()

    const matchesSearch =
      person.name.toLowerCase().includes(searchValue) ||
      person.employeeId.toLowerCase().includes(searchValue) ||
      person.department.toLowerCase().includes(searchValue)

    const matchesFilter =
      filter === 'All' ||
      person.status === filter

    return matchesSearch && matchesFilter
  })

  const presentCount = attendance.filter(
    (person) => person.status === 'Present'
  ).length

  const lateCount = attendance.filter(
    (person) => person.status === 'Late'
  ).length

  const absentCount = attendance.filter(
    (person) => person.status === 'Absent'
  ).length

  const leaveCount = attendance.filter(
    (person) => person.status === 'On Leave'
  ).length

  return (
    <MainLayout>

      <div className="staff-attendance-page">

        <Breadcrumb
          items={['Staff', 'Attendance']}
        />

        <div className="attendance-header">

          <PageHeader
            title="Staff Attendance"
            subtitle="Track daily employee attendance and working hours"
          />

          <button
            type="button"
            className="back-attendance-btn"
            onClick={() => navigate('/staff')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Staff
          </button>

        </div>

        {/* DATE */}

        <div className="attendance-date-card">

          <div className="date-title">

            <div className="date-icon">
              <i className="bi bi-calendar3"></i>
            </div>

            <div>
              <strong>Attendance Date</strong>
              <span>Select date to view attendance</span>
            </div>

          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
          />

        </div>

        {/* STATS */}

        <div className="attendance-stats">

          <div className="attendance-stat-card">

            <div className="attendance-stat-icon purple">
              <i className="bi bi-people"></i>
            </div>

            <div>
              <span>Total Staff</span>
              <h2>{attendance.length}</h2>
            </div>

          </div>

          <div className="attendance-stat-card">

            <div className="attendance-stat-icon green">
              <i className="bi bi-check-circle"></i>
            </div>

            <div>
              <span>Present</span>
              <h2>{presentCount}</h2>
            </div>

          </div>

          <div className="attendance-stat-card">

            <div className="attendance-stat-icon orange">
              <i className="bi bi-clock"></i>
            </div>

            <div>
              <span>Late</span>
              <h2>{lateCount}</h2>
            </div>

          </div>

          <div className="attendance-stat-card">

            <div className="attendance-stat-icon red">
              <i className="bi bi-x-circle"></i>
            </div>

            <div>
              <span>Absent</span>
              <h2>{absentCount}</h2>
            </div>

          </div>

          <div className="attendance-stat-card">

            <div className="attendance-stat-icon blue">
              <i className="bi bi-calendar-event"></i>
            </div>

            <div>
              <span>On Leave</span>
              <h2>{leaveCount}</h2>
            </div>

          </div>

        </div>

        {/* TABLE */}

        <div className="attendance-card">

          <div className="attendance-card-header">

            <div>
              <h2>Daily Attendance</h2>
              <p>Mark and manage staff attendance</p>
            </div>

            <div className="attendance-filters">

              <div className="attendance-search">

                <i className="bi bi-search"></i>

                <input
                  type="text"
                  placeholder="Search staff..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="Present">Present</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>
                <option value="On Leave">On Leave</option>
              </select>

            </div>

          </div>

          <div className="attendance-table-wrapper">

            <table className="attendance-table">

              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Shift</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Mark Attendance</th>
                </tr>
              </thead>

              <tbody>

                {filteredAttendance.map((person) => (

                  <tr key={person.id}>

                    <td>

                      <div className="attendance-employee">

                        <div className="attendance-avatar">
                          {person.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{person.name}</strong>
                          <span>{person.employeeId}</span>
                        </div>

                      </div>

                    </td>

                    <td>{person.department}</td>

                    <td>{person.shift}</td>

                    <td>{person.checkIn}</td>

                    <td>{person.checkOut}</td>

                    <td>
                      <span
                        className={`attendance-status ${person.status
                          .toLowerCase()
                          .replace(' ', '-')}`}
                      >
                        {person.status}
                      </span>
                    </td>

                    <td>

                      <div className="attendance-buttons">

                        <button
                          type="button"
                          className="present-btn"
                          title="Present"
                          onClick={() =>
                            handleStatusChange(
                              person.id,
                              'Present'
                            )
                          }
                        >
                          <i className="bi bi-check-lg"></i>
                        </button>

                        <button
                          type="button"
                          className="late-btn"
                          title="Late"
                          onClick={() =>
                            handleStatusChange(
                              person.id,
                              'Late'
                            )
                          }
                        >
                          <i className="bi bi-clock"></i>
                        </button>

                        <button
                          type="button"
                          className="absent-btn"
                          title="Absent"
                          onClick={() =>
                            handleStatusChange(
                              person.id,
                              'Absent'
                            )
                          }
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {filteredAttendance.length === 0 && (
              <div className="no-attendance">

                <i className="bi bi-person-x"></i>

                <h3>No Attendance Records</h3>

                <p>
                  No staff members match your search.
                </p>

              </div>
            )}

          </div>

        </div>

        <div className="attendance-note">

          <i className="bi bi-info-circle"></i>

          <p>
            Attendance changes are currently stored for this
            session only. Backend integration can be added later.
          </p>

        </div>

      </div>

    </MainLayout>
  )
}

export default StaffAttendance