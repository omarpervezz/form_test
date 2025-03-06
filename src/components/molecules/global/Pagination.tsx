import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const pageRange = 3;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - pageRange && i <= currentPage + pageRange)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`px-3 py-1 rounded-md mx-1 text-sm font-semibold ${
              i === currentPage
                ? "bg-[#1571E7] text-white dark:bg-darkMainBg"
                : "bg-[#e6e8eb] text-gray-700 dark:bg-darkButtonBg dark:text-white"
            }`}
          >
            {i}
          </button>
        );
      } else if (pages[pages.length - 1]?.key !== "ellipsis") {
        pages.push(
          <button
            key="ellipsis"
            className="px-2 py-1.5 text-sm font-semibold rounded-md bg-[#F5F7FA] dark:bg-[#F4F7FE4D] text-[#243045] disabled:opacity-50"
          >
            <Ellipsis className="w-4 h-4" />
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2 mb-4 sm:mb-0">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-2 py-1.5 text-sm font-semibold rounded-md bg-[#F5F7FA] text-[#243045] disabled:opacity-50 dark:bg-[#F4F7FE4D] "
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-2 py-1.5 text-sm font-semibold rounded-md bg-[#F5F7FA] text-[#243045] disabled:opacity-50 dark:bg-[#F4F7FE4D]"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;


