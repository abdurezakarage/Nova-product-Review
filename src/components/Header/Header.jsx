import React, { useState } from "react";
import { Image } from "@mantine/core";
import { Link } from "react-router-dom"; 
import "./Header.css"; // 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
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

      {/* button for mobile */}
      <div className="icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
};

export default Header;
