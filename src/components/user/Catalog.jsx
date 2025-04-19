import React, { useState, useEffect } from 'react';
import { getAllBooks, searchBooks } from '../../api/bookService';
import { useCart } from '../../contexts/CartContext';

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  // Fetch all books when component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getAllBooks();
        setBooks(data);
        setError('');
      } catch (err) {
        setError('Failed to load books. Please try again later.');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      const data = await getAllBooks();
      setBooks(data);
      return;
    }

    try {
      setLoading(true);
      const data = await searchBooks(searchTerm);
      setBooks(data);
      setError('');
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Error searching books:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle key press for search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Add book to cart
  const handleAddToCart = (book) => {
    addToCart(book);
    // Optional: Show some feedback to the user
    alert(`"${book.title}" added to your cart!`);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Book Catalog</h1>
      
      {/* Search Bar */}
      <div className="flex mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search books by title, author, or genre..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
        >
          Search
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading books...</p>
        </div>
      ) : (
        <>
          {/* Book Grid */}
          {books.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No books found. Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Book Image (placeholder) */}
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <span className="text-gray-500">{book.title.charAt(0)}</span>
                  </div>
                  
                  {/* Book Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                    <p className="text-gray-700 mb-2 text-sm line-clamp-3">
                      {book.description || 'No description available.'}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold">${book.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAddToCart(book)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalog;