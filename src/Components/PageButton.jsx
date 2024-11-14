import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageButton = ({ onNext, onPrev, currentPage, totalPages, loading }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This will give a smooth scroll effect
    });
  };
  return (
    <div className="pagination">
      <button
        id="prevButton"
        className="page-btn"
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
      </button>

      <div className="currentPageDisplay">
        {loading ? (
          // Skeleton loader for page number display
          <div className="skeleton-loader skeleton-text" />
        ) : (
          // Actual page info
          <>
            Page {currentPage} of {totalPages}
          </>
        )}
      </div>

      <button
        id="nextButton"
        className="page-btn"
        onClick={() => {
          onNext();
          scrollToTop(); // Scroll to top when navigating
        }}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
      </button>
    </div>
  );
};

export default PageButton;
