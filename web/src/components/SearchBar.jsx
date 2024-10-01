import React from 'react';

function SearchBar({ searchTerm, onSearch }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={onSearch}
      placeholder="Search by title, category, or brand..."
      className="p-2 border rounded border-gray-300 w-full"
    />
  );
}

export default SearchBar;
