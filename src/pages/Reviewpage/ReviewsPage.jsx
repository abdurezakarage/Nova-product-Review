import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Container } from "@mantine/core";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import axios from "axios";
import "./ReviewPage.css";

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://test-api.nova-techs.com/reviews/${id}`
      );
      const sortedReviews = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setReviews(sortedReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to fetch reviews.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchReviews();
    } else {
      setError("Invalid product ID.");
      setLoading(false);
    }
  }, [id, fetchReviews]);

  const handleNewReview = async (newReview) => {
    try {
      setReviews((prevReviews) => [newReview, ...prevReviews]);
      await fetchReviews();
      navigate("/");
    } catch (error) {
      console.error("Error updating reviews:", error);
    }
  };

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

  const toggleExpanded = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <div className="reviews-and-form-container">
        <div className="formcontainer">
          <ReviewForm productId={id} onNewReview={handleNewReview} />
          {reviews.length > 0 && (
            <div className="average-rating">
              <p>Average Rating: {calculateAverageRating()}</p>
            </div>
          )}
        </div>

        <div className="reviews-container">
          {reviews.length === 0 ? (
            <p>No reviews available for this product yet.</p>
          ) : (
            reviews.map((review) => {
              const isExpanded = expandedReviews[review.id];
              const wordLimit = 25;
              const truncatedComment =
                review.comment.split(" ").length > wordLimit
                  ? review.comment.split(" ").slice(0, wordLimit).join(" ") +
                    "..."
                  : review.comment;

              return (
                <div key={review.id} className="review-box">
                  <h5>{review.reviewerName}</h5>
                  <p>
                    {isExpanded ? review.comment : truncatedComment}
                    {review.comment.split(" ").length > wordLimit && (
                      <button
                        onClick={() => toggleExpanded(review.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#007BFF",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}
                  </p>
                  <p>{renderStars(review.rating)}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Container>
  );
};

export default ReviewPage;
