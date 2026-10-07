import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './StaffDetails.css'

function StaffDetails() {
  const navigate = useNavigate()

  const staff = {
    name: 'Anjali Sharma',
    employeeId: 'EMP-1001',
    department: 'Front Office',
    position: 'Receptionist',
    email: 'anjali.sharma@wisteriain.com',
    phone: '+91 98765 43210',
    gender: 'Female',
    dateOfBirth: '15 March 1998',
    joiningDate: '12 January 2024',
    salary: '₹28,000',
    shift: 'Morning',
    address: 'Lucknow, Uttar Pradesh',
    emergencyContact: 'Rakesh Sharma',
    emergencyPhone: '+91 98765 11111',
    status: 'Active'
  }

  return (
    <MainLayout>

      <div className="staff-details-page">

        <Breadcrumb
          items={['Staff', 'Staff Details']}
        />

        <div className="staff-details-header">

          <PageHeader
            title="Staff Details"
            subtitle="View complete employee information"
          />

          <button
            type="button"
            className="back-details-btn"
            onClick={() => navigate('/staff')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Staff
          </button>

        </div>

        {/* PROFILE */}

        <div className="staff-profile-card">

          <div className="staff-profile-left">

            <div className="large-staff-avatar">
              {staff.name.charAt(0)}
            </div>

            <div>
              <h2>{staff.name}</h2>

              <p className="staff-position">
                {staff.position}
              </p>

              <span className="details-status">
                {staff.status}
              </span>
            </div>

          </div>

          <div className="profile-actions">

            <button
              type="button"
              className="edit-profile-btn"
              onClick={() => navigate('/staff/add')}
            >
              <i className="bi bi-pencil"></i>
              Edit Staff
            </button>

          </div>

        </div>

        {/* EMPLOYEE OVERVIEW */}

        <div className="details-section">

          <div className="details-section-heading">

            <div className="details-icon">
              <i className="bi bi-person-badge"></i>
            </div>

            <div>
              <h2>Employee Overview</h2>
              <p>Basic employment information</p>
            </div>

          </div>

          <div className="details-grid">

            <div className="detail-item">
              <span>Employee ID</span>
              <strong>{staff.employeeId}</strong>
            </div>

            <div className="detail-item">
              <span>Department</span>
              <strong>{staff.department}</strong>
            </div>

            <div className="detail-item">
              <span>Position</span>
              <strong>{staff.position}</strong>
            </div>

            <div className="detail-item">
              <span>Joining Date</span>
              <strong>{staff.joiningDate}</strong>
            </div>

            <div className="detail-item">
              <span>Monthly Salary</span>
              <strong>{staff.salary}</strong>
            </div>

            <div className="detail-item">
              <span>Shift</span>
              <strong>{staff.shift}</strong>
            </div>

          </div>

        </div>

        {/* PERSONAL INFORMATION */}

        <div className="details-section">

          <div className="details-section-heading">

            <div className="details-icon">
              <i className="bi bi-person"></i>
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>Employee personal details</p>
            </div>

          </div>

          <div className="details-grid">

            <div className="detail-item">
              <span>Full Name</span>
              <strong>{staff.name}</strong>
            </div>

            <div className="detail-item">
              <span>Gender</span>
              <strong>{staff.gender}</strong>
            </div>

            <div className="detail-item">
              <span>Date of Birth</span>
              <strong>{staff.dateOfBirth}</strong>
            </div>

            <div className="detail-item">
              <span>Email Address</span>
              <strong>{staff.email}</strong>
            </div>

            <div className="detail-item">
              <span>Phone Number</span>
              <strong>{staff.phone}</strong>
            </div>

            <div className="detail-item">
              <span>Address</span>
              <strong>{staff.address}</strong>
            </div>

          </div>

        </div>

        {/* EMERGENCY CONTACT */}

        <div className="details-section">

          <div className="details-section-heading">

            <div className="details-icon">
              <i className="bi bi-telephone"></i>
            </div>

            <div>
              <h2>Emergency Contact</h2>
              <p>Emergency contact information</p>
            </div>

          </div>

          <div className="details-grid emergency-grid">

            <div className="detail-item">
              <span>Contact Name</span>
              <strong>{staff.emergencyContact}</strong>
            </div>

            <div className="detail-item">
              <span>Contact Number</span>
              <strong>{staff.emergencyPhone}</strong>
            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="details-footer">

          <button
            type="button"
            className="footer-back-btn"
            onClick={() => navigate('/staff')}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Staff Directory
          </button>

        </div>

      </div>

    </MainLayout>
  )
}

export default StaffDetails