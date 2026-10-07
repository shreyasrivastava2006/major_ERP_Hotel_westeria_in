import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError('')
    setSuccess('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
    } = formData

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setError(
        'Password must contain at least 6 characters.'
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const existingUsers =
      JSON.parse(
        localStorage.getItem('wisteriaUsers')
      ) || []

    const userExists = existingUsers.some(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    )

    if (userExists) {
      setError(
        'An account with this email already exists.'
      )
      return
    }

    const newUser = {
      id: Date.now(),
      fullName,
      email,
      phone,
      password,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(
      'wisteriaUsers',
      JSON.stringify([
        ...existingUsers,
        newUser,
      ])
    )

    setSuccess(
      'Account created successfully! Redirecting to login...'
    )

    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }

  return (
    <div className="auth-page signup-page">

      {/* LEFT VISUAL PANEL */}
      <section className="auth-visual-panel">

        <div className="auth-visual-overlay"></div>

        <div className="auth-visual-top">

          <img
            src="/src/assets/image1.png"
            alt="Wisteria In"
            className="auth-logo"
          />

          <button
            type="button"
            className="back-website-btn"
            onClick={() => navigate('/home')}
          >
            Back to website
            <i className="bi bi-arrow-up-right"></i>
          </button>

        </div>


        <div className="auth-visual-content">

          <span className="visual-small-title">
            WISTERIA IN
          </span>

          <h2>
            Begin Your
            <br />
            Journey With Us
          </h2>

          <p>
            Create your account and discover
            <br />
            smarter hotel management.
          </p>

          <div className="visual-line"></div>

          <div className="visual-dots">
            <span></span>
            <span className="active"></span>
            <span></span>
          </div>

        </div>

      </section>


      {/* RIGHT FORM PANEL */}
      <section className="auth-form-panel">

        <div className="auth-form-container">

          <div className="mobile-brand">

            <img
              src="/src/assets/image1.png"
              alt="Wisteria In"
            />

            <span>
              Wisteria In
            </span>

          </div>


          <div className="auth-heading">

            <span className="auth-eyebrow">
              GET STARTED
            </span>

            <h1>
              Create an account
            </h1>

            <p>
              Join Wisteria In and experience
              smarter hotel management.
            </p>

          </div>


          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* NAME + PHONE */}
            <div className="signup-two-column">

              <div className="auth-field">

                <label htmlFor="fullName">
                  Full Name
                </label>

                <div className="auth-input-box">

                  <i className="bi bi-person"></i>

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />

                </div>

              </div>


              <div className="auth-field">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <div className="auth-input-box">

                  <i className="bi bi-telephone"></i>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />

                </div>

              </div>

            </div>


            {/* EMAIL */}
            <div className="auth-field">

              <label htmlFor="signup-email">
                Email Address
              </label>

              <div className="auth-input-box">

                <i className="bi bi-envelope"></i>

                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div className="auth-field">

              <label htmlFor="signup-password">
                Password
              </label>

              <div className="auth-input-box">

                <i className="bi bi-lock"></i>

                <input
                  id="signup-password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  <i
                    className={
                      showPassword
                        ? 'bi bi-eye-slash'
                        : 'bi bi-eye'
                    }
                  ></i>
                </button>

              </div>

              <span className="password-hint">
                Use at least 6 characters.
              </span>

            </div>


            {/* CONFIRM PASSWORD */}
            <div className="auth-field">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="auth-input-box">

                <i className="bi bi-shield-lock"></i>

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  <i
                    className={
                      showConfirmPassword
                        ? 'bi bi-eye-slash'
                        : 'bi bi-eye'
                    }
                  ></i>
                </button>

              </div>

            </div>


            {/* ERROR */}
            {error && (
              <div className="auth-error">

                <i className="bi bi-exclamation-circle"></i>

                <span>
                  {error}
                </span>

              </div>
            )}


            {/* SUCCESS */}
            {success && (
              <div className="auth-success">

                <i className="bi bi-check-circle"></i>

                <span>
                  {success}
                </span>

              </div>
            )}


            {/* SUBMIT */}
            <button
              type="submit"
              className="auth-primary-btn"
            >

              <span>
                Create Account
              </span>

              <i className="bi bi-arrow-right"></i>

            </button>

          </form>


          {/* DIVIDER */}
          <div className="auth-divider">

            <span></span>

            <small>
              OR CONTINUE WITH
            </small>

            <span></span>

          </div>


          {/* GOOGLE */}
          <button
            type="button"
            className="google-btn"
          >

            <span className="google-letter">
              G
            </span>

            Continue with Google

          </button>


          {/* LOGIN */}
          <div className="auth-switch">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() =>
                navigate('/login')
              }
            >
              Sign in
            </button>

          </div>


          {/* SECURITY */}
          <div className="auth-security">

            <i className="bi bi-shield-check"></i>

            <span>
              Your account information is kept secure
            </span>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Signup

