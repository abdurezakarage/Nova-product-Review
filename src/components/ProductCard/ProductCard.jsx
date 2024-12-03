import React from "react";
import { Card, Button } from "react-bootstrap"; // Import React Bootstrap components
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card className="product-card">
      <Card.Img
        variant="top"
        className="product-image"
        src={product.imageUrls[0]}
        alt={product.name}
      />
      <Card.Body>
        <Card.Title className="product-name">{product.name}</Card.Title>
        <Card.Text className="product-price">${product.price}</Card.Text>
        <Button
          className="view-button"
          variant="primary"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
