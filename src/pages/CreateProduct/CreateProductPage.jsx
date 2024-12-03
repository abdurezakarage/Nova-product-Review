import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createProduct } from "../../Api/api"; // Adjust the path as needed
import "./CreateProductPage.css"; // Import custom CSS

const CreateProductPage = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate(); // Initialize navigate

  // Get the logged-in user ID (replace this with your actual authentication logic)
  const addedBy = "user123"; // Example user ID, replace with dynamic value (e.g., from context or localStorage)

  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,
        addedBy, // Add the user ID to the data being sent
      };
      await createProduct(productData);
      navigate("/"); // Redirect to the homepage after product is created
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Row for Name and Description */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="formName">Name</label>
            <input
              type="text"
              id="formName"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="formDescription">Description</label>
            <textarea
              id="formDescription"
              {...register("description")}
              placeholder="Enter product description"
            ></textarea>
          </div>
        </div>

        {/* Row for Price and Category */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="formPrice">Price</label>
            <input
              id="formPrice"
              {...register("price", { required: "Price is required" })}
              placeholder="Enter product price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="formCategory">Category</label>
            <input
              type="text"
              id="formCategory"
              {...register("category")}
              placeholder="Enter product category"
            />
          </div>
        </div>

        {/* Row for Tags and Use */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="formTags">Tags</label>
            <input
              type="text"
              id="formTags"
              {...register("tags")}
              placeholder="Enter product tags"
            />
          </div>

          <div className="form-group">
            <label htmlFor="formUse">Use</label>
            <select id="formUse" {...register("use")}>
              <option value="for_sale">For Sale</option>
              <option value="for_rent">For Rent</option>
              <option value="for_use">For Use</option>
            </select>
          </div>
        </div>

        {/* Row for Minimum Quantity and Selling Price */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="formMinimumQuantity">Minimum Quantity</label>
            <input
              id="formMinimumQuantity"
              {...register("minimumQuantity")}
              placeholder="Enter minimum quantity"
            />
          </div>

          <div className="form-group">
            <label htmlFor="formSellingPrice">Selling Price</label>
            <input
              id="formSellingPrice"
              {...register("sellingPrice")}
              placeholder="Enter selling price"
            />
          </div>
        </div>

        {/* Row for Quantity On Hand and Reserved Quantity */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="formQuantityOnHand">Quantity On Hand</label>
            <input
             
              id="formQuantityOnHand"
              {...register("quantityOnHand")}
              placeholder="Enter quantity on hand"
            />
          </div>

          <div className="form-group">
            <label htmlFor="formReservedQuantity">Reserved Quantity</label>
            <input
             
              id="formReservedQuantity"
              {...register("reservedQuantity")}
              placeholder="Enter reserved quantity"
            />
          </div>
        </div>

        {/* Row for Discount and Image URLs */}
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="formDiscount">Discount</label>
            <input
             
              id="formDiscount"
              {...register("discount")}
              placeholder="Enter discount"
            />
          </div>

          <div className="form-group">
            <label htmlFor="formImageUrls">Image URLs</label>
            <input
              type="text"
              id="formImageUrls"
              {...register("imageUrls")}
              placeholder="Enter image URLs"
            />
          </div>
        </div>

        {/* Hidden field for addedBy */}
        <input type="hidden" value={addedBy} {...register("addedBy")} />

        <button type="submit">Post Product</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
