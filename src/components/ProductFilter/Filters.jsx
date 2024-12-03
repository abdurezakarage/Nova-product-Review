import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { fetchProducts } from "../../Api/api";

const Filters = ({ setFilters }) => {
  const [categories, setCategories] = useState([]); // Available categories
  const [category, setCategory] = useState(""); // Selected category
  const [minPrice, setMinPrice] = useState(""); // Minimum price
  const [maxPrice, setMaxPrice] = useState(""); // Maximum price

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

  // Update filters dynamically when values change
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
      {/* <h2>Filter Products</h2> */}
      <Row className="g-2 mb-4">
        <Col>
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
        </Col>
        {/* <Col>
          <Form.Control
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Col> */}
      </Row>
    </div>
  );
};

export default Filters;
