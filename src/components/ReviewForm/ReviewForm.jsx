import React, { useState } from "react";
import { TextInput, Textarea, Button, Group, Title } from "@mantine/core";
import { postReview } from "../../Api/api"; // Import the postReview function
import "./ReviewForm.css";

const ReviewForm = ({ productId, onNewReview }) => {
  const [rating, setRating] = useState(1);
  const [reviewerName, setReviewerName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewerName.trim() || reviewerName.trim().length < 3) {
      alert("Reviewer name must be at least 3 characters long.");
      return;
    }

    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    const reviewData = {
      productId: productId,
      rating,
      reviewerName: reviewerName.trim(),
      comment: comment.trim(),
    };

    try {
      const newReview = await postReview(reviewData);

      // Call the onNewReview function to update the parent component with the new review
      onNewReview(newReview);

      // Reset form fields
      setRating(1);
      setReviewerName("");
      setComment("");
    } catch (error) {
      console.error(
        "Failed to submit review:",
        error.response ? error.response.data : error
      );
      alert("Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <Title order={2}>Review</Title>

      <TextInput
        label="Reviewer Name"
        placeholder="Your name"
        value={reviewerName}
        onChange={(e) => setReviewerName(e.target.value)}
        required
      />

      <Textarea
        label="Comment"
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        minRows={3}
        required
      />

      <div className="star-rating">
        <label style={{ fontWeight: "bold" }}>Rating</label>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#ffc107" : "#e4e5e9",
                fontSize: "1.5em",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <Group position="right" mt="md">
        <Button type="submit">Submit Review</Button>
      </Group>
    </form>
  );
};

export default ReviewForm;
