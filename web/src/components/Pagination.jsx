import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageLinks = () => {
    const pageLinks = [];
    const maxVisiblePages = 3;

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(maxVisiblePages, totalPages); // Show pages 1, 2, 3
    } else if (currentPage === totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1); // Show last three pages
    }

    // Create page links
    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-2 rounded ${
            currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
          }`}
        >
          {i}
        </button>
      );
    }

    return pageLinks;
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-4">
      <button
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
      >
        {'<< First'}
      </button>
      <button
        onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
      >
        {'<'}
      </button>
      {renderPageLinks()}
      <button
        onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
      >
        {'>'}
      </button>
      <button
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
      >
        {'Last >>'}
      </button>
    </div>
  );
}

export default Pagination;
