import { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import './ResetPassword.css'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    console.log('Password reset successfully')
  }

  return (
    <AuthLayout>
      <div className="reset-card">

        <div className="reset-header">
          <i className="bi bi-key"></i>
          <h1>Reset Password</h1>
          <p>Create a new password for your account.</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="reset-btn">
            Reset Password
          </button>

        </form>

        <a href="/login" className="back-login">
          ← Back to Login
        </a>

      </div>
    </AuthLayout>
  )
}

export default ResetPassword