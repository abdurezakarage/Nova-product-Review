import React from "react";
import { Form } from "react-bootstrap";

const Sort = ({ setFilters }) => {
  const handleSortChange = (event) => {
    const value = event.target.value;
    const [sortBy, sortOrder] = value.split(",");
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  return (
    <div>
      <Form.Select
        placeholder="Sort by"
        onChange={handleSortChange}
        style={{
          height: "30px", // Set a smaller height
          width: "30px", // Set a smaller width
          padding: "5px", // Set padding to reduce space inside
          fontSize: "14px", // Smaller font size for a compact look
        }}
      >
        <option value="">Sort by</option>
        <option value="price,asc">Price: Low to High</option>
        <option value="price,desc">Price: High to Low</option>
        <option value="rating,desc">Rating: High to Low</option>
      </Form.Select>
    </div>
  );
};

export default Sort;
