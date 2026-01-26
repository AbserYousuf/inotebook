import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ loading }) {
  const host = "http://localhost:5000";
  const location = useLocation();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  React.useEffect(() => {}, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const grabDetails = async () => {
    loading(10);
    console.log("click");

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
          authtoken: localStorage.getItem("token"), // MUST match middleware
        },
      });

      const json = await response.json();
      console.log(json);
      loading(70);
      // 👇 this is the correct check
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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Navbar</span>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
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

          {!localStorage.getItem("token") ? (
            <>
              <Link className="btn btn-primary mx-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-success" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <div className="position-relative d-flex align-items-center">
              {/* User Icon */}
              <div
                onClick={grabDetails}
                style={{
                  height: "2em",
                  width: "2em",
                  border: "1px solid white",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <i className="fa-solid fa-user" style={{ color: "#9e78d1" }} />
              </div>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="profile-dropdown">
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

              <button className="btn btn-primary mx-3" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
