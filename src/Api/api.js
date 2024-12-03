import axios from "axios";

const api = axios.create({
  baseURL: `https://test-api.nova-techs.com`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch Products
export const fetchProducts = (params) => api.get("/products", { params });

// Fetch Single Product
export const fetchProductById = (id) => api.get(`/products/${id}`);

// Fetch Reviews
export const fetchReviews = async (productId) => {
  try {
    const response = await axios.get(
      `https://test-api.nova-techs.com/reviews`,
      {
        params: { productId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; 
  }
};
// Create Product
export const createProduct = async (data) => {
  try {
    const payload = {
      name: data.name.trim(), // Ensure no extra spaces
      description: data.description.trim() || "No description provided",
      price: parseFloat(data.price), // Ensure it's a float
      category: data.category.trim(),
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [], // Trim tags and convert to array
      use: data.use || "for_sale", // Default value
      minimumQuantity: parseInt(data.minimumQuantity, 10) || 1, // Default to 1
      sellingPrice: parseFloat(data.sellingPrice) || parseFloat(data.price), // Default to price
      addedBy: "      ", 
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default to 30 days later
      quantityOnHand: parseInt(data.quantityOnHand, 10) || 0,
      reservedQuantity: parseInt(data.reservedQuantity, 10) || 0,
      discount: parseFloat(data.discount) || 0, // Default to 0
      imageUrls: data.imageUrls
        ? data.imageUrls.split(",").map((url) => url.trim())
        : [], // Default image
    };

    console.log("Payload sent to API:", payload); // Debug the payload

    const response = await fetch("https://test-api.nova-techs.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData); // Log the server's response
      throw new Error(
        `Error: ${response.status} - ${errorData.message || "Unknown error"}`
      );
    }

    return response.json(); // Return the response JSON if successful
  } catch (error) {
    console.error("Error creating product:", error.message); // Log error
    throw error; // Re-throw for the UI to handle
  }
};
// Update Product
export const updateProduct = (id, data) => api.patch(`/products/${id}`, data);

// Delete Product
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Post Review
export const postReview = (data) => api.post(`/reviews`, data);

export default api;
