import { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import './ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Password reset request:', email)
  }

  return (
    <AuthLayout>
      <div className="forgot-card">
        <div className="forgot-header">
          <i className="bi bi-shield-lock"></i>
          <h1>Forgot Password?</h1>
          <p>Enter your email to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="reset-btn">
            Send Reset Link
          </button>
        </form>

        <a href="/login" className="back-login">
          ← Back to Login
        </a>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword