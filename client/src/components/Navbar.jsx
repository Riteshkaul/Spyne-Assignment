import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../css/Navbar.css";
import AuthContext from "../Auth/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to home or login after logout
  };

  return (
    <nav className="navbar">
      <h1>Car Manager</h1>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/cars/add" className="navbar-link">
              Add Car
            </Link>
            <Link to="/cars" className="navbar-link">
              All Cars
            </Link>

            <button
              onClick={handleLogout}
              className="navbar-link logout-button"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/signup" className="navbar-link">
            Signup
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
