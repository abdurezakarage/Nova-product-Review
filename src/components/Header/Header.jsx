// Header Component
import React from "react";
import { Image } from "@mantine/core";
import { Link } from "react-router-dom"; // Import Link
import "./Header.css"; // Import the updated CSS

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo">
        <Link to="/">
          {" "}
          {/* Use Link for navigation */}
          <Image
            src="https://www.nova-infotech.com/assets/img/logo.png"
            alt="Nova Infotech Logo"
            width={150}
            fluid
            style={{ cursor: "pointer" }} // Make the cursor indicate the image is clickable
          />
        </Link>
      </div>
      <div className="button-container">
        <Link to="/" className="nav-link">
          Home
        </Link>{" "}
        {/* Link to home */}
      </div>
      <div>
        <Link to="/create-product" className="nav-link">
          {" "}
          {/* Link to create-product */}
          Create Product
        </Link>
      </div>
    </div>
  );
};

export default Header;
