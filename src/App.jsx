import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CreateProductPage from "./pages/createProduct/CreateProductPage";
import ReviewPage from "./pages/Reviewpage/ReviewsPage"
import ReviewForm from "./components/ReviewForm/ReviewForm";
import Header from "./components/Header/Header"
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="/products/:productId/review" element={<ReviewForm />} />
          <Route path="/reviews/:id" element={<ReviewPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
