import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import logo from "../../assets/image1.png";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";


function Login() {
  const navigate = useNavigate();

  // =========================================
  // STATES
  // =========================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");

  const [googleLoading, setGoogleLoading] = useState(false);


  // =========================================
  // EMAIL / PASSWORD LOGIN
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Empty field validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }


    // Get registered users
    const users = JSON.parse(
      localStorage.getItem("wisteriaUsers") || "[]"
    );


    // Find matching user
    const registeredUser = users.find(
      (user) =>
        user.email?.toLowerCase() ===
          email.trim().toLowerCase() &&
        user.password === password
    );


    // User not found
    if (!registeredUser) {
      setError(
        "Invalid email or password. Please check your details or create an account."
      );

      return;
    }


    // Logged-in user information
    const loggedInUser = {
      id: registeredUser.id,
      fullName: registeredUser.fullName,
      email: registeredUser.email,
      phone: registeredUser.phone || "",
      provider: "email",
    };


    // Remember me
    if (rememberMe) {
      localStorage.setItem(
        "wisteriaLoggedInUser",
        JSON.stringify(loggedInUser)
      );
    } else {
      sessionStorage.setItem(
        "wisteriaLoggedInUser",
        JSON.stringify(loggedInUser)
      );
    }


    // Go to dashboard
    navigate("/dashboard");
  };


  // =========================================
  // GOOGLE LOGIN
  // =========================================

  const handleGoogleLogin = async () => {
    try {
      setError("");

      setGoogleLoading(true);


      // Open Google authentication popup
      const result = await signInWithPopup(
        auth,
        googleProvider
      );


      // Firebase user
      const user = result.user;


      // Create Wisteria user object
      const loggedInUser = {
        id: user.uid,

        fullName:
          user.displayName || "Google User",

        email:
          user.email || "",

        phone:
          user.phoneNumber || "",

        photoURL:
          user.photoURL || "",

        provider: "google",
      };


      // Store login information
      localStorage.setItem(
        "wisteriaLoggedInUser",
        JSON.stringify(loggedInUser)
      );


      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {

      console.error(
        "Google Login Error:",
        error
      );


      // Popup closed
      if (
        error.code ===
        "auth/popup-closed-by-user"
      ) {
        setError(
          "Google sign-in was cancelled."
        );
      }


      // Popup blocked
      else if (
        error.code ===
        "auth/popup-blocked"
      ) {
        setError(
          "Google sign-in popup was blocked. Please allow popups for this website."
        );
      }


      // Different login provider
      else if (
        error.code ===
        "auth/account-exists-with-different-credential"
      ) {
        setError(
          "An account already exists with this email using another sign-in method."
        );
      }


      // Unauthorized domain
      else if (
        error.code ===
        "auth/unauthorized-domain"
      ) {
        setError(
          "This website domain is not authorized in Firebase."
        );
      }


      // Generic error
      else {
        setError(
          "Unable to sign in with Google. Please try again."
        );
      }

    } finally {

      setGoogleLoading(false);

    }
  };


  // =========================================
  // BACK TO WEBSITE
  // =========================================

  const handleBackToWebsite = () => {
    navigate("/home");
  };


  // =========================================
  // FORGOT PASSWORD
  // =========================================

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };


  // =========================================
  // SIGNUP
  // =========================================

  const handleSignup = () => {
    navigate("/signup");
  };


  // =========================================
  // UI
  // =========================================

  return (
    <div className="auth-page login-page">


      {/* =================================================
          LEFT VISUAL PANEL
      ================================================= */}

      <section className="auth-visual-panel">

        {/* Overlay */}
        <div className="auth-visual-overlay"></div>


        {/* ---------------------------------------------
            TOP
        --------------------------------------------- */}

        <div className="auth-visual-top">


          {/* Logo */}

          <img
            src={logo}
            alt="Wisteria In"
            className="auth-logo"
          />


          {/* Back button */}

          <button
            type="button"
            className="back-website-btn"
            onClick={handleBackToWebsite}
          >

            <span>
              Back to website
            </span>

            <i className="bi bi-arrow-up-right"></i>

          </button>

        </div>


        {/* ---------------------------------------------
            VISUAL CONTENT
        --------------------------------------------- */}

        <div className="auth-visual-content">


          <span className="visual-small-title">
            WISTERIA IN
          </span>


          <h2>
            Hospitality
            <br />
            Beyond Stay
          </h2>


          <p>
            A smarter way to manage every
            <br />
            part of your hotel experience.
          </p>


          <div className="visual-line"></div>


          <div className="visual-dots">

            <span></span>

            <span></span>

            <span className="active"></span>

          </div>

        </div>

      </section>



      {/* =================================================
          RIGHT FORM PANEL
      ================================================= */}

      <section className="auth-form-panel">


        <div className="auth-form-container">


          {/* =================================================
              MOBILE BRAND
          ================================================= */}

          <div className="mobile-brand">

            <img
              src={logo}
              alt="Wisteria In"
            />

            <span>
              Wisteria In
            </span>

          </div>



          {/* =================================================
              HEADING
          ================================================= */}

          <div className="auth-heading">

            <span className="auth-eyebrow">
              WELCOME BACK
            </span>


            <h1>
              Sign in to your account
            </h1>


            <p>
              Access your hotel management workspace
              and continue where you left off.
            </p>

          </div>



          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >


            {/* ---------------------------------------------
                EMAIL
            --------------------------------------------- */}

            <div className="auth-field">


              <label htmlFor="login-email">
                Email Address
              </label>


              <div className="auth-input-box">


                <i className="bi bi-envelope"></i>


                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {

                    setEmail(
                      e.target.value
                    );

                    setError("");

                  }}
                  autoComplete="email"
                />

              </div>

            </div>



            {/* ---------------------------------------------
                PASSWORD
            --------------------------------------------- */}

            <div className="auth-field">


              <div className="auth-label-row">


                <label htmlFor="login-password">
                  Password
                </label>


                <button
                  type="button"
                  className="forgot-btn"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>

              </div>



              <div className="auth-input-box">


                <i className="bi bi-lock"></i>


                <input
                  id="login-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {

                    setPassword(
                      e.target.value
                    );

                    setError("");

                  }}
                  autoComplete="current-password"
                />



                {/* SHOW PASSWORD */}

                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  <i
                    className={
                      showPassword
                        ? "bi bi-eye-slash"
                        : "bi bi-eye"
                    }
                  ></i>

                </button>

              </div>

            </div>



            {/* =================================================
                REMEMBER ME
            ================================================= */}

            <label className="remember-row">


              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(
                    e.target.checked
                  )
                }
              />


              <span className="remember-box"></span>


              <span>
                Remember me
              </span>

            </label>



            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

              <div className="auth-error">


                <i className="bi bi-exclamation-circle"></i>


                <span>
                  {error}
                </span>


              </div>

            )}



            {/* =================================================
                SIGN IN BUTTON
            ================================================= */}

            <button
              type="submit"
              className="auth-primary-btn"
            >

              <span>
                Sign In
              </span>


              <i className="bi bi-arrow-right"></i>

            </button>


          </form>



          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="auth-divider">

            <span></span>


            <small>
              OR CONTINUE WITH
            </small>


            <span></span>

          </div>



          {/* =================================================
              GOOGLE LOGIN
          ================================================= */}

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
          >


            {googleLoading ? (

              <>

                <span className="google-spinner"></span>

                <span>
                  Signing in with Google...
                </span>

              </>

            ) : (

              <>

                <span className="google-letter">
                  G
                </span>


                <span>
                  Continue with Google
                </span>

              </>

            )}

          </button>



          {/* =================================================
              CREATE ACCOUNT
          ================================================= */}

          <div className="auth-switch">


            <span>
              New to Wisteria In?
            </span>


            <button
              type="button"
              onClick={handleSignup}
            >
              Create an account
            </button>


          </div>



          {/* =================================================
              SECURITY
          ================================================= */}

          <div className="auth-security">


            <i className="bi bi-shield-check"></i>


            <span>
              Secure access to your hotel workspace
            </span>


          </div>


        </div>

      </section>

    </div>
  );
}


export default Login;