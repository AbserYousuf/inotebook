import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const host = process.env.REACT_APP_API_URL;

export default function Navbar({ loading }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const isLoggedIn = !!localStorage.getItem("token");

  const grabDetails = async () => {
    loading(10);
    if (showProfile) {
      setShowProfile(false);
      loading(0);
      return;
    }
    loading(50);
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      loading(70);
      if (json.data) {
        setUser({
          name: json.data.Name,
          username: json.data.Username,
          email: json.data.Email,
        });
        setShowProfile(true);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    loading(100);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowProfile(false);
    navigate("/login");
  };

  // Check if we are on /login, /signup, or /redirect page
  const hideAuthButtons =
    location.pathname === "/signup" || location.pathname === "/redirect";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      {/* ↑ added fixed-top → common for note apps, prevents layout shift */}

      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook {/* changed from <span> to <Link> for better semantics */}
        </Link>

        {/* Hamburger - this should now be visible below ~992px */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* ↑ added mb-2 mb-lg-0 → better spacing on mobile */}
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          {/* Right side items */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* ↑ wrapped in d-flex + gap + mt for better mobile stacking */}

            {!isLoggedIn && !hideAuthButtons && (
              <>
                <Link className="btn btn-primary" to="/login">
                  Login
                </Link>
                <Link className="btn btn-success" to="/signup">
                  Signup
                </Link>
              </>
            )}

            {isLoggedIn && (
              <div className="d-flex align-items-center gap-3">
                <div
                  onClick={grabDetails}
                  style={{
                    height: "2.2em",
                    width: "2.2em",
                    border: "1px solid white",
                    borderRadius: "50%",
                    cursor: "pointer",
                    backgroundColor: "#343a40", // subtle bg for contrast
                  }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <i
                    className="fa-solid fa-user"
                    style={{ color: "#9e78d1" }}
                  />
                </div>

                {showProfile && (
                  <div
                    className="profile-dropdown bg-dark text-white p-3 rounded shadow"
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: "1rem",
                      zIndex: 1000,
                      minWidth: "220px",
                    }}
                  >
                    <div>
                      <strong>Name:</strong> {user.name}
                    </div>
                    <div>
                      <strong>Username:</strong> {user.username}
                    </div>
                    <div>
                      <strong>Email:</strong> {user.email}
                    </div>
                  </div>
                )}

                <button
                  className="btn btn-outline-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
