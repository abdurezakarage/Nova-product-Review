import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="header-container">
      {/* Logo */}
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img
            src="https://www.nova-infotech.com/assets/img/logo.png"
            alt="Nova Infotech Logo"
            className="logo-image"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className={`links ${isMenuOpen ? "open" : ""}`}>
        <div className="button-container">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            <button className="header-button">Home</button>
          </Link>
          <Link to="/create-product" className="nav-link" onClick={closeMenu}>
            <button className="header-button"> Create Product</button>
          </Link>
        </div>
      </div>

      {/* Expand/Collapse Icon */}
      <div
        className="icon"
        onClick={toggleMenu}
        role="button"
        aria-label="Toggle Menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
};

export default Header;
