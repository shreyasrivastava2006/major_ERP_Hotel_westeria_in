import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../components/layout/Breadcrumb'
import PageHeader from '../../components/layout/PageHeader'
import './AddStaff.css'

function AddStaff() {
  const navigate = useNavigate()

  const [staff, setStaff] = useState({
    name: '',
    employeeId: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    joiningDate: '',
    salary: '',
    shift: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    status: 'Active'
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setStaff((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !staff.name ||
      !staff.employeeId ||
      !staff.department ||
      !staff.position ||
      !staff.email ||
      !staff.phone
    ) {
      alert('Please fill all required fields.')
      return
    }

    alert('Staff member added successfully.')
    navigate('/staff')
  }

  const handleCancel = () => {
    navigate('/staff')
  }

  return (
    <MainLayout>
      <div className="add-staff-page">

        <Breadcrumb items={['Staff', 'Add Staff']} />

        <div className="add-staff-header">
          <PageHeader
            title="Add Staff"
            subtitle="Create a new employee profile"
          />

          <button
            type="button"
            className="add-staff-back-btn"
            onClick={handleCancel}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Staff
          </button>
        </div>

        <form className="add-staff-card" onSubmit={handleSubmit}>

          {/* Personal Information */}
          <div className="add-staff-section">

            <div className="add-staff-section-title">
              <div className="add-staff-section-icon">
                <i className="bi bi-person"></i>
              </div>

              <div>
                <h2>Personal Information</h2>
                <p>Enter the employee's basic information</p>
              </div>
            </div>

            <div className="add-staff-grid">

              <div className="add-staff-group">
                <label>
                  Full Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={staff.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="add-staff-group">
                <label>
                  Employee ID <span>*</span>
                </label>

                <input
                  type="text"
                  name="employeeId"
                  value={staff.employeeId}
                  onChange={handleChange}
                  placeholder="e.g. EMP-1007"
                />
              </div>

              <div className="add-staff-group">
                <label>Gender</label>

                <select
                  name="gender"
                  value={staff.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="add-staff-group">
                <label>Date of Birth</label>

                <input
                  type="date"
                  name="dob"
                  value={staff.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="add-staff-group full-width">
                <label>Address</label>

                <textarea
                  name="address"
                  value={staff.address}
                  onChange={handleChange}
                  placeholder="Enter employee address"
                  rows="3"
                ></textarea>
              </div>

            </div>
          </div>

          {/* Employment Information */}
          <div className="add-staff-section">

            <div className="add-staff-section-title">
              <div className="add-staff-section-icon">
                <i className="bi bi-briefcase"></i>
              </div>

              <div>
                <h2>Employment Information</h2>
                <p>Enter department, position and work details</p>
              </div>
            </div>

            <div className="add-staff-grid">

              <div className="add-staff-group">
                <label>
                  Department <span>*</span>
                </label>

                <select
                  name="department"
                  value={staff.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="Management">Management</option>
                  <option value="Front Office">Front Office</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div className="add-staff-group">
                <label>
                  Position <span>*</span>
                </label>

                <input
                  type="text"
                  name="position"
                  value={staff.position}
                  onChange={handleChange}
                  placeholder="e.g. Receptionist"
                />
              </div>

              <div className="add-staff-group">
                <label>Joining Date</label>

                <input
                  type="date"
                  name="joiningDate"
                  value={staff.joiningDate}
                  onChange={handleChange}
                />
              </div>

              <div className="add-staff-group">
                <label>Salary</label>

                <div className="add-staff-input-prefix">
                  <span>₹</span>

                  <input
                    type="number"
                    name="salary"
                    value={staff.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                    min="0"
                  />
                </div>
              </div>

              <div className="add-staff-group">
                <label>Shift</label>

                <select
                  name="shift"
                  value={staff.shift}
                  onChange={handleChange}
                >
                  <option value="">Select Shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
              </div>

              <div className="add-staff-group">
                <label>Status</label>

                <select
                  name="status"
                  value={staff.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

            </div>
          </div>

          {/* Contact Information */}
          <div className="add-staff-section">

            <div className="add-staff-section-title">
              <div className="add-staff-section-icon">
                <i className="bi bi-envelope"></i>
              </div>

              <div>
                <h2>Contact Information</h2>
                <p>Enter employee contact details</p>
              </div>
            </div>

            <div className="add-staff-grid">

              <div className="add-staff-group">
                <label>
                  Email Address <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={staff.email}
                  onChange={handleChange}
                  placeholder="employee@wisteriain.com"
                />
              </div>

              <div className="add-staff-group">
                <label>
                  Phone Number <span>*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={staff.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

            </div>
          </div>

          {/* Emergency Contact */}
          <div className="add-staff-section">

            <div className="add-staff-section-title">
              <div className="add-staff-section-icon">
                <i className="bi bi-telephone"></i>
              </div>

              <div>
                <h2>Emergency Contact</h2>
                <p>Enter emergency contact information</p>
              </div>
            </div>

            <div className="add-staff-grid">

              <div className="add-staff-group">
                <label>Emergency Contact Name</label>

                <input
                  type="text"
                  name="emergencyContact"
                  value={staff.emergencyContact}
                  onChange={handleChange}
                  placeholder="Enter contact name"
                />
              </div>

              <div className="add-staff-group">
                <label>Emergency Phone</label>

                <input
                  type="tel"
                  name="emergencyPhone"
                  value={staff.emergencyPhone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="add-staff-actions">

            <button
              type="button"
              className="add-staff-cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-staff-save-btn"
            >
              <i className="bi bi-person-plus"></i>
              Add Staff
            </button>

          </div>

        </form>
      </div>
    </MainLayout>
  )
}

export default AddStaff