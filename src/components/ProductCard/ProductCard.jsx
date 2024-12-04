import React from "react";
import { Card, Image, Text, Button } from "@mantine/core"; // Import Mantine components
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="productcard">
      {/* Image Container */}
      <div className="product-card-image">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          style={{
            width: "auto",
            height: "160px", // Force height to 160px
            objectFit: "contain", // Maintain aspect ratio and fit within height
            display: "block", // Ensure proper rendering
          }}
        />
      </div>

      {/* Product Name */}
      <div className="product-name">{product.name}</div>

      {/* Product Price */}
      <div className="product-price">${product.price}</div>

      {/* Button */}
      <Button
        variant="filled"
        color="blue"
        mt="md"
        fullWidth
        onClick={() => navigate(`/products/${product.id}`)}
      >
        View Details
      </Button>
    </div>
  );
};

export default ProductCard;
