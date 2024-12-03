import React, { useState } from "react";

import { useQuery } from "react-query";
import { Container, Spinner, Alert } from "react-bootstrap";
import Filters from "../../components/ProductFilter/Filters";
import Sort from "../../components/Sort/Sort";
import Pagination from "../../components/Pagination/Pagination";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchProducts } from "../../Api/api";
import "./HomePage.css";
import { Flex } from "@mantine/core";

const HomePage = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ["products", filters, page],
    () => fetchProducts({ ...filters, page }),
    { keepPreviousData: true }
  );

  if (isLoading) return <Spinner animation="border" />;
  if (isError) return <Alert variant="danger">Error loading products!</Alert>;

  const { data: products, totalPages = 1 } = data?.data || {};

  return (
    <Container className="pcontainer">
      <div className="filter-container">
        <div className="filter-sort-container">
          <Filters setFilters={setFilters} />
          <Sort setFilters={setFilters} />
        </div>
      </div>

      <div className="product-grid">
        {products?.map((product) => (
          <div className="product-item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default HomePage;
