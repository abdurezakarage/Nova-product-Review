import React, { useState } from "react";
import { Image } from "@mantine/core";
import { Link } from "react-router-dom"; // Import Link
import "./Header.css"; // Import the updated CSS

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header-container">
      <div className="logo">
        <Link to="/">
          <Image
            src="https://www.nova-infotech.com/assets/img/logo.png"
            alt="Nova Infotech Logo"
          />
        </Link>
      </div>

      <div className={`links ${isMenuOpen ? "open" : ""}`}>
        <div className="button-container">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/create-product" className="nav-link">
            Create Product
          </Link>
        </div>
      </div>

      {/* Hamburger menu button for mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
};

export default Header;
