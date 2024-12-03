import React from "react";
import { Form } from "react-bootstrap";

const Sort = ({ setFilters }) => {
  const handleSortChange = (event) => {
    const value = event.target.value;
    const [sortBy, sortOrder] = value.split(",");
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  return (
    <Form.Select placeholder="Sort by" onChange={handleSortChange}>
      <option value="">Sort by</option>
      <option value="price,asc">Price: Low to High</option>
      <option value="price,desc">Price: High to Low</option>
      <option value="rating,desc">Rating: High to Low</option>
    </Form.Select>
  );
};

export default Sort;
