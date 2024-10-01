import React, { useEffect, useState, useCallback} from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { debounce } from '../utils/debounce';

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rowsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Debounced search function
  const debounceSearch = useCallback(debounce(function(value){
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value) ||
      (product.brand && product.brand.toLowerCase().includes(value))
    );
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  },500),[products])
  
  const handleSearch = function(event) {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    debounceSearch(value)
    
  }

  // Handle selecting a single row
  const handleSelectRow = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(row => row !== id) : [...prev, id]);
  };

  // Handle selecting all rows on the current page
  const handleSelectAll = () => {
    const currentPageItems = paginatedProducts();
    if (selectedRows.length === currentPageItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentPageItems.map(product => product.id));
    }
  };

  // Handle deleting selected rows
  const handleDeleteSelected = () => {
    setFilteredProducts(filteredProducts.filter(product => !selectedRows.includes(product.id)));
    setSelectedRows([]);
  };

  // Pagination logic
  const paginatedProducts = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      {loading ? (
        <div className="text-center text-gray-600">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-600">Error: {error}</div>
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <div className="my-4 flex items-center">
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedRows.length === paginatedProducts().length && paginatedProducts().length > 0}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">{selectedRows.length} rows selected</span>
          </div>
          <table className="min-w-full bg-white rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Select</th>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left hidden md:table-cell">Description</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Brand</th>
                <th className="py-2 px-4 text-left">Rating</th>
                <th className="py-2 px-4 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts().map(product => (
                <tr
                  key={product.id}
                  className={`${
                    selectedRows.includes(product.id) ? 'bg-gray-200' : 'bg-white'
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(product.id)}
                      onChange={() => handleSelectRow(product.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
                  <td className="py-2 px-4 text-gray-800">{product.title}</td>
                  <td className="py-2 px-4 text-gray-600 hidden md:table-cell">{product.description}</td>
                  <td className="py-2 px-4 text-gray-800">{product.category}</td>
                  <td className="py-2 px-4 text-gray-800">{product.brand}</td>
                  <td className="py-2 px-4 text-gray-800">{product.rating}</td>
                  <td className="py-2 px-4 text-gray-800">${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handleDeleteSelected}
              disabled={selectedRows.length === 0}
              className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition duration-200 ${
                selectedRows.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Delete Selected
            </button>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductsTable;
