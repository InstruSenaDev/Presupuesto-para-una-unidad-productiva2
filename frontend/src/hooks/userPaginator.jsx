import React from 'react';

const Pagination = ({ currentPage, totalPages, nextPage, prevPage }) => {
  return (
    <nav className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1}>
        « Anterior
      </button>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Siguiente »
      </button>
    </nav>
  );
};

export default Pagination;
