import React from "react";
import { Card, Image, Text, Button } from "@mantine/core"; // Import Mantine components
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card shadow="sm" padding="lg" radius="md" className="product-card">
      <Card.Section>
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          height={160}
          className="product-image"
        />
      </Card.Section>

      <Text weight={500} size="lg" mt="md" className="product-name">
        {product.name}
      </Text>

      <Text color="dimmed" size="sm" className="product-price">
        ${product.price}
      </Text>

      <Button
        variant="filled"
        color="blue"
        mt="md"
        fullWidth
        onClick={() => navigate(`/products/${product.id}`)}
      >
        View Details
      </Button>
    </Card>
  );
};

export default ProductCard;
