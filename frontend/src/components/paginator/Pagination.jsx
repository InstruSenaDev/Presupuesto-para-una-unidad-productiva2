import React from 'react';

const Pagination = ({ movementsPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(movementsTotal / movementsPage); // Asegúrate de definir movementsTotal
  const pageNumbers = [];

  const createPageNumbers = () => {
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage > 3) {
        pageNumbers.push(1);
        if (currentPage > 4) pageNumbers.push("...");

        for (
          let i = Math.max(2, currentPage - 1);
          i <= Math.min(totalPages - 1, currentPage + 1);
          i++
        ) {
          pageNumbers.push(i);
        }

        if (currentPage < totalPages - 2) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else {
        for (let i = 1; i <= Math.min(4, totalPages); i++) {
          pageNumbers.push(i);
        }
        if (totalPages > 4) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
  };

  createPageNumbers();

  const onPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const onSpecifyPage = (numberPage) => {
    if (numberPage !== "...") {
      setCurrentPage(numberPage);
    }
  };

  return (
    <div className="w-full mt-6">
      <div className="flex justify-center items-center">
        <button
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 capitalize bg-white rounded-md ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-500"
              : "text-gray-700 hover:text-white hover:bg-emerald-700"
          }`}
          onClick={onPreviousPage}
        >
          Regresar
        </button>

        <div className="hidden sm:flex">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => onSpecifyPage(page)}
              className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md ${
                page === currentPage
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700"
              }`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 mx-1 transition-colors duration-300 transform bg-white rounded-md ${
            currentPage >= totalPages
              ? "cursor-not-allowed text-gray-500"
              : "text-gray-700 hover:text-white hover:bg-emerald-700"
          }`}
          onClick={onNextPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Pagination;
