import React from "react";
import { Image, Button } from "@mantine/core"; // Import Mantine components
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
            height: "160px",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
      <div className="product-name">{product.name}</div>

      <div className="product-price">${product.price}</div>
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
