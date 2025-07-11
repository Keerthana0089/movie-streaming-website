import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/netflix-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaHeart, FaSearch, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { FaFire } from "react-icons/fa";
const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div
        className="navbar__logo-wrapper"
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => !showPopup && setShowPopup(false)}
        onClick={() => setShowPopup((prev) => !prev)}
        ref={popupRef}
      >
        <img src={logo} alt="App Logo" className="navbar__logo" />
        {localStorage.getItem("isAuthenticated") === "true" && showPopup && (
          <div className="user-info-popup">
            <p>👤 <strong>admin</strong></p>
            <p>✅ Authenticated</p>
            <p className="logout-hover" onClick={handleLogout}>🔓 Logout</p>
          </div>
        )}
      </div>

      <div className="navbar__menu">
        <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
          <FaHome className="nav-icon" />
          <span>Home</span>
        </Link>
        <Link to="/favorites" className={`nav-item ${isActive("/favorites") ? "active" : ""}`}>
          <FaHeart className="nav-icon" />
          <span>Favorites</span>
        </Link>
        <Link to="/trending" className={`nav-item ${isActive("/trending") ? "active" : ""}`}>
  <FaFire className="nav-icon" />
  <span>Trending</span>
</Link>

        <Link to="/search" className={`nav-item ${isActive("/search") ? "active" : ""}`}>
          <FaSearch className="nav-icon" />
          <span>Search</span>
        </Link>
      </div>

      <div className="navbar__right">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
        <br/>
        </div>
        <div className="navbar__right">
        {localStorage.getItem("isAuthenticated") === "true" && (
  <div className="nav-item logout-item" onClick={handleLogout}>
    <FaSignOutAlt className="nav-icon" />
    <span>Logout</span>
  </div>
)}

      </div>
    </nav>
  );
};

export default Navbar;
