import React from "react";
import "./Pagination.css";

const PaginationComponent = ({ totalPages, currentPage, setPage }) => {
  const validTotalPages =
    Number.isInteger(totalPages) && totalPages > 0 ? totalPages : 1;
  const pageNumbers = Array.from({ length: validTotalPages }, (_, i) => i + 1);
  const handlePrevious = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < validTotalPages) {
      setPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      {/* Previous Button */}
      <button
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`pagination-button ${
            page === currentPage ? "active" : ""
          }`}
          onClick={() => setPage(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`pagination-button ${
          currentPage === validTotalPages ? "disabled" : ""
        }`}
        onClick={handleNext}
        disabled={currentPage === validTotalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
