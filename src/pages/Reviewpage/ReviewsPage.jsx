import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mantine/core"; // Assume Mantine UI is used
import ReviewForm from "../../components/ReviewForm/ReviewForm"
import axios from "axios";
import "./ReviewPage.css"; // Make sure you have this file for additional styling

const ReviewPage = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from the backend
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://test-api.nova-techs.com/reviews/${id}`
      );

      // Sort reviews by creation date (assume 'createdAt' is available)
      const sortedReviews = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setReviews(sortedReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to fetch reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch reviews when the component mounts or when the product ID changes
  useEffect(() => {
    if (id) {
      fetchReviews();
    } else {
      setError("Invalid product ID.");
      setLoading(false);
    }
  }, [id, fetchReviews]);

  // Handle a new review submission
  const handleNewReview = async (newReview) => {
    try {
      // Add the new review at the beginning of the reviews list
      setReviews((prevReviews) => [newReview, ...prevReviews]);

      // Optionally, fetch the updated reviews to ensure server consistency
      await fetchReviews();
    } catch (error) {
      console.error("Error updating reviews:", error);
      alert("Failed to update reviews after submission.");
    }
  };

  // Calculate average rating
  const calculateAverageRating = useCallback(() => {
    if (reviews.length === 0) return 0;

    const validRatings = reviews
      .map((review) => review.rating)
      .filter((rating) => typeof rating === "number" && !isNaN(rating));

    if (validRatings.length === 0) return 0;

    const totalRating = validRatings.reduce((acc, rating) => acc + rating, 0);
    return (totalRating / validRatings.length).toFixed(2);
  }, [reviews]);

  const renderStars = (rating) => {
    const maxStars = 5;
    return (
      <div>
        {[...Array(maxStars)].map((_, index) => (
          <span
            key={index}
            style={{
              color: index < rating ? "#ffc107" : "#e4e5e9",
              fontSize: "1.2em",
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <div>
        <ReviewForm productId={id} onNewReview={handleNewReview} />
      </div>
      <div>Average Rating: {calculateAverageRating()}</div>
      <div className="reviews-container">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-box">
              <h5>{review.reviewerName}</h5>

              <p>{review.comment}</p>
              <p>{renderStars(review.rating)}</p>
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default ReviewPage;
