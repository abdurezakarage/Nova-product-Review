import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProduct } from "../Api/api"; // Import the delete function
import { Button, Container, Card } from "react-bootstrap";

const DeleteProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Use navigate to redirect after deletion
  const [product, setProduct] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://test-api.nova-techs.com/products/${id}`
      );
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  // Handle product deletion
  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      alert("Product deleted successfully!");
      navigate("/"); // Redirect to homepage after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // If product data is not yet fetched, show a loading state
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Product Details</h2>
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>
            <strong>Price:</strong> ${product.price}
          </Card.Text>
          <Card.Text>
            <strong>Category:</strong> {product.category}
          </Card.Text>
          <Card.Text>
            <strong>Tags:</strong> {product.tags.join(", ")}
          </Card.Text>
          <Card.Text>
            <strong>Quantity On Hand:</strong> {product.quantityOnHand}
          </Card.Text>

          <Button variant="danger" onClick={handleDelete}>
            Delete Product
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeleteProduct;
