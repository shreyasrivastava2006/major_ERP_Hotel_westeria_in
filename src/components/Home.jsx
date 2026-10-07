import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import logo from '../assets/image1.png'

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const goToLogin = () => {
    setMenuOpen(false)
    navigate('/login')
  }

  const scrollToSection = (sectionId) => {
    setMenuOpen(false)

    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()

    const form = e.target

    const name = form.name.value
    const email = form.email.value
    const subject = form.subject.value
    const message = form.message.value

    const mailSubject = encodeURIComponent(
      subject || `Wisteria In Contact - ${name}`
    )

    const mailBody = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`
    )

    window.location.href =
      `mailto:your-email@example.com?subject=${mailSubject}&body=${mailBody}`
  }

  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}
      <header className="home-nav">
        <div className="home-nav-inner">

          <button
            className="brand"
            onClick={() => scrollToSection('top')}
            type="button"
          >
            <img
              src={logo}
              alt="Wisteria In"
              className="brand-logo"
            />

            <span className="brand-name">
              Wisteria In
            </span>
          </button>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>

            <button
              type="button"
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('modules')}
            >
              Modules
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('why-us')}
            >
              About
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('testimonials')}
            >
              Experience
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>

          </nav>

          <div className="nav-actions">

            <button
              type="button"
              className="nav-login-btn"
              onClick={goToLogin}
            >
              Login
            </button>

            <button
              type="button"
              className="nav-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <i
                className={
                  menuOpen
                    ? 'bi bi-x-lg'
                    : 'bi bi-list'
                }
              ></i>
            </button>

          </div>

        </div>
      </header>

      <div id="top"></div>

      {/* ================= HERO ================= */}
      <section className="hero">

        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>

        <div className="hero-content">

          <span className="hero-eyebrow">
            WELCOME TO WISTERIA IN
          </span>

          <h1>
            Hospitality
            <br />
            <span>Beyond Stay</span>
          </h1>

          <p className="hero-sub">
            A complete hotel management experience designed
            to bring reservations, rooms, guests, services,
            billing and operations together.
          </p>

          <div className="hero-actions">

            <button
              type="button"
              className="gold-btn"
              onClick={goToLogin}
            >
              Get Started
              <i className="bi bi-arrow-right"></i>
            </button>

            <button
              type="button"
              className="outline-light-btn"
              onClick={() => scrollToSection('features')}
            >
              Explore More
            </button>

          </div>

        </div>

        <div className="hero-bottom">

          <div className="hero-bottom-item">
            <i className="bi bi-building"></i>

            <div>
              <strong>Complete ERP</strong>
              <span>Hotel Operations</span>
            </div>
          </div>

          <div className="hero-bottom-item">
            <i className="bi bi-calendar-check"></i>

            <div>
              <strong>Smart Management</strong>
              <span>Reservations & Rooms</span>
            </div>
          </div>

          <div className="hero-bottom-item">
            <i className="bi bi-headset"></i>

            <div>
              <strong>Connected Teams</strong>
              <span>One Organized System</span>
            </div>
          </div>

        </div>

      </section>

      {/* ================= INTRO ================= */}
      <section className="intro-section">

        <div className="intro-image">

          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
            alt="Luxury hotel"
          />

          <div className="experience-badge">
            <span>WISTERIA</span>
            <strong>IN</strong>
            <small>Hospitality Beyond Stay</small>
          </div>

        </div>

        <div className="intro-content">

          <span className="section-label">
            ABOUT WISTERIA IN
          </span>

          <h2>
            Everything your hotel needs,
            <span> beautifully connected.</span>
          </h2>

          <p>
            Wisteria In is a hotel management ERP designed
            to simplify everyday hotel operations. From the
            front desk to housekeeping, restaurant, billing
            and reports, every department stays connected
            through one organized system.
          </p>

          <p>
            Manage your property efficiently while creating
            a smoother experience for your team and guests.
          </p>

          <button
            type="button"
            className="dark-btn"
            onClick={() => scrollToSection('modules')}
          >
            Discover Our System
            <i className="bi bi-arrow-right"></i>
          </button>

        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section
        className="features section-light"
        id="features"
      >

        <div className="section-head">

          <span className="section-label">
            OUR FEATURES
          </span>

          <h2>
            Designed around
            <span> hotel operations</span>
          </h2>

          <p>
            Powerful modules that help different hotel
            departments work together seamlessly.
          </p>

        </div>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              <i className="bi bi-calendar2-check"></i>
            </div>

            <h3>Reservations</h3>

            <p>
              Manage bookings, availability and
              reservation details from one place.
            </p>

            <span className="card-link">
              Explore
              <i className="bi bi-arrow-right"></i>
            </span>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <i className="bi bi-door-open"></i>
            </div>

            <h3>Front Office</h3>

            <p>
              Simplify check-in, check-out, room
              transfers and guest requests.
            </p>

            <span className="card-link">
              Explore
              <i className="bi bi-arrow-right"></i>
            </span>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <i className="bi bi-stars"></i>
            </div>

            <h3>Housekeeping</h3>

            <p>
              Track room conditions, cleaning schedules
              and inspection activities.
            </p>

            <span className="card-link">
              Explore
              <i className="bi bi-arrow-right"></i>
            </span>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <i className="bi bi-receipt"></i>
            </div>

            <h3>Billing</h3>

            <p>
              Organize invoices, payments and billing
              information with ease.
            </p>

            <span className="card-link">
              Explore
              <i className="bi bi-arrow-right"></i>
            </span>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <i className="bi bi-cup-hot"></i>
            </div>

            <h3>Restaurant</h3>

            <p>
              Manage menus, orders and restaurant
              operations in one connected system.
            </p>

            <span className="card-link">
              Explore
              <i className="bi bi-arrow-right"></i>
            </span>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <i className="bi bi-bar-chart-line"></i>
            </div>

            <h3>Reports</h3>

            <p>
              Understand occupancy, revenue and
              operational performance through reports.
            </p>

            <span className="card-link">
              Explore
              <i className="bi bi-arrow-right"></i>
            </span>

          </div>

        </div>

      </section>

      {/* ================= MODULES ================= */}
      <section
        className="modules-band"
        id="modules"
      >

        <div className="modules-image"></div>

        <div className="modules-overlay"></div>

        <div className="modules-content">

          <span className="section-label light-label">
            COMPLETE HOTEL ERP
          </span>

          <h2>
            From the lobby
            <br />
            <span>to the ledger.</span>
          </h2>

          <p>
            One connected system for every department
            of your hotel.
          </p>

          <div className="module-list">

            <span>Dashboard</span>
            <span>Rooms</span>
            <span>Guests</span>
            <span>Reservations</span>
            <span>Front Office</span>
            <span>Housekeeping</span>
            <span>Restaurant</span>
            <span>Services</span>
            <span>Billing</span>
            <span>Inventory</span>
            <span>Staff</span>
            <span>Maintenance</span>
            <span>Reports</span>

          </div>

        </div>

      </section>

      {/* ================= WHY US ================= */}
      <section
        className="why-us"
        id="why-us"
      >

        <div className="why-content">

          <span className="section-label">
            WHY WISTERIA IN
          </span>

          <h2>
            A smarter way to
            <span> manage hospitality.</span>
          </h2>

          <p>
            Wisteria In brings essential hotel operations
            together so your teams can spend less time
            managing disconnected information and more
            time delivering better hospitality.
          </p>

          <div className="why-points">

            <div className="why-point">

              <i className="bi bi-check-circle"></i>

              <div>
                <strong>Centralized Management</strong>

                <span>
                  Keep important hotel information organized
                  in one system.
                </span>
              </div>

            </div>

            <div className="why-point">

              <i className="bi bi-check-circle"></i>

              <div>
                <strong>Department Connectivity</strong>

                <span>
                  Connect front office, housekeeping,
                  restaurant, billing and more.
                </span>
              </div>

            </div>

            <div className="why-point">

              <i className="bi bi-check-circle"></i>

              <div>
                <strong>Clear Reports</strong>

                <span>
                  Access useful operational and financial
                  information when you need it.
                </span>
              </div>

            </div>

          </div>

          <button
            type="button"
            className="dark-btn"
            onClick={goToLogin}
          >
            Enter Wisteria In
            <i className="bi bi-arrow-right"></i>
          </button>

        </div>

        <div className="why-image">

          <img
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85"
            alt="Luxury hotel interior"
          />

        </div>

      </section>

      {/* ================= EXPERIENCE ================= */}
      <section
        className="experience-section"
        id="testimonials"
      >

        <div className="section-head">

          <span className="section-label">
            THE WISTERIA EXPERIENCE
          </span>

          <h2>
            Built for the way
            <span> hotels work.</span>
          </h2>

          <p>
            A clean and organized workspace for modern
            hotel management.
          </p>

        </div>

        <div className="experience-grid">

          <div className="experience-card">

            <i className="bi bi-layout-text-window-reverse"></i>

            <h3>One Dashboard</h3>

            <p>
              Get a clear view of essential hotel
              operations from one place.
            </p>

          </div>

          <div className="experience-card">

            <i className="bi bi-people"></i>

            <h3>Connected Teams</h3>

            <p>
              Keep departments coordinated with
              shared operational information.
            </p>

          </div>

          <div className="experience-card">

            <i className="bi bi-shield-check"></i>

            <h3>Organized Records</h3>

            <p>
              Maintain guest, room, billing and
              operational records systematically.
            </p>

          </div>

        </div>

      </section>

      {/* ================= CONTACT ================= */}
      <section
        className="final-cta"
        id="contact"
      >

        <div className="contact-wrapper">

          {/* CONTACT INFORMATION */}

          <div className="contact-info">

            <span className="section-label light-label">
              GET IN TOUCH
            </span>

            <h2>
              We'd love to
              <br />
              <span>hear from you.</span>
            </h2>

            <p>
              Have a question, suggestion, or want to know
              more about Wisteria In? Send us a message and
              we'll get back to you.
            </p>

            <div className="contact-details">

              <div className="contact-detail">

                <div className="contact-detail-icon">
                  <i className="bi bi-envelope"></i>
                </div>

                <div>
                  <strong>Email</strong>
                  <span>your-email@example.com</span>
                </div>

              </div>

              <div className="contact-detail">

                <div className="contact-detail-icon">
                  <i className="bi bi-telephone"></i>
                </div>

                <div>
                  <strong>Phone</strong>
                  <span>+91 XXXXX XXXXX</span>
                </div>

              </div>

              <div className="contact-detail">

                <div className="contact-detail-icon">
                  <i className="bi bi-clock"></i>
                </div>

                <div>
                  <strong>Response Time</strong>
                  <span>We'll get back to you soon</span>
                </div>

              </div>

            </div>

          </div>

          {/* CONTACT FORM */}

          <div className="contact-form-card">

            <div className="contact-form-header">

              <span>CONTACT US</span>

              <h3>
                Send us a message
              </h3>

              <p>
                Fill in the details below and we'll get in touch.
              </p>

            </div>

            <form
              className="contact-form"
              onSubmit={handleContactSubmit}
            >

              <div className="contact-form-row">

                <div className="contact-field">

                  <label htmlFor="contact-name">
                    Your Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />

                </div>

                <div className="contact-field">

                  <label htmlFor="contact-email">
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />

                </div>

              </div>

              <div className="contact-field">

                <label htmlFor="contact-subject">
                  Subject
                </label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What would you like to discuss?"
                  required
                />

              </div>

              <div className="contact-field">

                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  required
                ></textarea>

              </div>

              <button
                type="submit"
                className="contact-submit-btn"
              >
                Send Message
                <i className="bi bi-send"></i>
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">

        <div className="footer-top">

          <div className="footer-brand">

            <img
              src={logo}
              alt="Wisteria In"
              className="footer-logo"
            />

            <h3>
              Wisteria In
            </h3>

            <p>
              Hospitality beyond stay.
            </p>

          </div>

          <div className="footer-col">

            <h4>Explore</h4>

            <button
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection('modules')}
            >
              Modules
            </button>

            <button
              onClick={() => scrollToSection('why-us')}
            >
              About
            </button>

          </div>

          <div className="footer-col">

            <h4>Management</h4>

            <button
              onClick={() => scrollToSection('features')}
            >
              Rooms
            </button>

            <button
              onClick={() => scrollToSection('features')}
            >
              Restaurant
            </button>

            <button
              onClick={() => scrollToSection('features')}
            >
              Billing
            </button>

          </div>

          <div className="footer-col">

            <h4>Connect</h4>

            <button
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>

            <button
              onClick={goToLogin}
            >
              Login
            </button>

            <div className="footer-socials">

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <i className="bi bi-linkedin"></i>
              </a>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} Wisteria In.
            All rights reserved.
          </span>

          <span>
            Hospitality Beyond Stay
          </span>

        </div>

      </footer>

    </div>
  )
}

export default Home
