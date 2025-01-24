import React from 'react';
import { Link } from 'react-router-dom';

// ProductCard component, displays a product card
const ProductCard = ({ product }) => {
  return (
    // Main container for the product card, styled with tailwind
    <div className="bg-white rounded shadow-md overflow-hidden">
      {/* Product image */}
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain p-4" />
        {/* Container for product info */}
      <div className="p-4">
        {/* Product title */}
        <h3 className="font-semibold text-lg">{product.title}</h3>
          {/* Product price */}
        <p className="text-gray-600">${product.price}</p>
        {/* Link to product details page */}
        <Link to={`/product/${product.id}`} className="mt-2 inline-block bg-blue-500 text-white rounded px-3 py-1 text-sm hover:bg-blue-600">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;