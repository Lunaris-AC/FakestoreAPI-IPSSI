import React from 'react';

// CartItem component receives item, onUpdateQuantity and onRemove as props
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    // Main container for the cart item, styles are added using tailwind
    <div className="flex items-center justify-between bg-white rounded shadow p-4 mb-2">
        {/* Container for item image and title */}
      <div className="flex items-center">
        {/* Product image */}
        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mr-4" />
        <div>
          {/* Product title */}
          <h3 className="font-semibold">{item.title}</h3>
          {/* Product price */}
          <p className="text-gray-600">Price: ${item.price}</p>
        </div>
      </div>
         {/* Container for quantity input and remove button */}
      <div className="flex items-center">
        {/* Input for adjusting product quantity */}
        <input
          type="number"
          min="1"
          value={item.quantity}
           // Calls onUpdateQuantity when input changes
          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
          className="border p-2 rounded w-20 text-center mr-2"
        />
          {/* Button to remove item */}
        <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
          Remove
        </button>
      </div>
    </div>
  );
};

// Export the CartItem component
export default CartItem;