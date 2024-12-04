import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchReviews, deleteProduct } from "../../Api/api";
import { Button, Container, Card } from "react-bootstrap";
import "./ProductPage.css";

const ProductPage = ({ products }) => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Fetch product details and reviews
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://test-api.nova-techs.com/products/${id}`
      );
      const data = await response.json();
      setProduct(data);
    };

    const fetchProductReviews = async () => {
      try {
        const reviewData = await fetchReviews(id);
        setReviews(reviewData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]); // Set reviews to empty on error
      }
    };

    fetchProduct();
    fetchProductReviews();
  }, [id]);

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

  // Navigate to reviews page
  const handleNavigateToReviews = () => {
    navigate(`/reviews/${id}`); // Pass the product ID to reviews page
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const description = product.description;
  const isLongDescription = description.length > 150;
  const displayedDescription = isLongDescription
    ? showFullDescription
      ? description
      : `${description.slice(0, 150)}...`
    : description;

  return (
    <Container className="product-page-container">
      <h2>Product Details</h2>
      <Card className="product-card">
        <Card.Body>
          <Card.Img
            src={product.imageUrls[0]}
            alt={product.name}
            height="200"
          />
          <Card.Title className="card-title">{product.name}</Card.Title>
          <Card.Text className="card-text description">
            {displayedDescription}
            {isLongDescription && (
              <span
                className="see-more"
                onClick={toggleDescription}
                role="button"
              >
                {showFullDescription ? " See Less" : " See More"}
              </span>
            )}
          </Card.Text>
          <Card.Text className="card-text">
            <strong>Price:</strong> ${product.price}
          </Card.Text>
          <Card.Text className="card-text">
            <strong>Available stock:</strong> {product.quantityOnHand}
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="button-container">
        <Button className="btn-review" onClick={handleNavigateToReviews}>
          Review Product
        </Button>
        <Button className="btn-danger" onClick={handleDelete}>
          Delete Product
        </Button>
      </div>
    </Container>
  );
};

export default ProductPage;
