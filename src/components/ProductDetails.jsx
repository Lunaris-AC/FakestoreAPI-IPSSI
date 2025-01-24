import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// ProductDetails component, displays detailed information for a product
const ProductDetails = ({ product, onAddToCart }) => {
  // Get user data from useAuth hook
  const { user } = useAuth();
  // Get navigate function from react-router-dom
  const navigate = useNavigate();

    // Function to redirect to login page
    const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
      // Main container for product details, styled with tailwind
    <div className="bg-white rounded shadow-md p-6">
        {/* Container for product info and image */}
      <div className="flex flex-col md:flex-row">
          {/* Product image */}
        <img src={product.image} alt={product.title} className="w-full h-64 object-contain md:w-1/2 p-4"/>
        {/* Container for product details */}
        <div className="md:ml-6 md:w-1/2">
          {/* Product title */}
          <h2 className="text-2xl font-semibold">{product.title}</h2>
           {/* Product price */}
          <p className="text-gray-600 mt-2">${product.price}</p>
           {/* Product description */}
          <p className="mt-4 text-gray-700">{product.description}</p>
           {/* Product category */}
            <p className="mt-4 text-gray-700">Category: {product.category}</p>
          {/* Conditional rendering of add to cart button based on user authentication */}
          {user ? (
            // Add to cart button, if user is logged in
            <button onClick={onAddToCart} className="mt-6 bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600">
              Add to Cart
            </button>
          ) : (
            // Login button, if user is not logged in
            <button onClick={handleLoginRedirect} className="mt-6 bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500">
                Please login to add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;