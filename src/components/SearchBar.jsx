import React from 'react';

// SearchBar component, receives onSearch as prop
const SearchBar = ({ onSearch }) => {
  return (
    // Input field for searching products
    <input
        // sets the input to text
      type="text"
      // sets the placeholder for the search bar
      placeholder="Search products..."
      // sets the styles using tailwind css
      className="border p-2 rounded w-full mb-4"
      // calls the onSearch prop method on input change
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;