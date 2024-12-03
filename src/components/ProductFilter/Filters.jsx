import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { fetchProducts } from "../../Api/api";
import "./Filters.css"
const Filters = ({ setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch categories on component load
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchProducts();
        const data = response.data.data;

        if (Array.isArray(data)) {
          const uniqueCategories = Array.from(
            new Set(data.map((product) => product.category))
          );
          setCategories(uniqueCategories);
        } else {
          console.error("API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  // Update filters when values change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: category || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    }));
  }, [category, minPrice, maxPrice, setFilters]);

  return (
    <div>
      <div className="filters">
        <div className="category">
          <Form.Select
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))
            ) : (
              <option>No categories available</option>
            )}
          </Form.Select>
        </div>
        <div className="minprice inputw">
          <Form.Control
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{
              height: "30px", // Set a smaller height
              width: "10px", // Set a smaller width
              padding: "8px", // Set padding to reduce space inside
              fontSize: "14px", // Smaller font size for a compact look
            }}
          />
        </div>
        <div className="maxprice inputw">
          <Form.Control
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{
              height: "30px", // Set a smaller height
              width: "10px", // Set a smaller width
              padding: "8px", // Set padding to reduce space inside
              fontSize: "14px", // Smaller font size for a compact look
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
