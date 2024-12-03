import React from "react";
import { Stack, Text, Card } from "@mantine/core";

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <Text>No reviews yet.</Text>;
  }

  return (
    <Stack>
      {reviews.map((review) => (
        <Card shadow="sm" padding="md" key={review.id}>
          <Text weight={500}>{review.reviewerName || "Anonymous"}</Text>
          <Text>Rating: {review.rating}/5</Text>
          <Text>{review.comment}</Text>
        </Card>
      ))}
    </Stack>
  );
};

export default ReviewList;
