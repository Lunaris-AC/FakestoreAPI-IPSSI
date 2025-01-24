import React from 'react';

// CategoryFilter component, receives categories and onFilter props
const CategoryFilter = ({ categories, onFilter }) => {
  return (
    <div className="mb-4">
      {/* Label for the filter dropdown */}
      <label className="block text-gray-700 text-sm font-bold mb-2">Filter by category:</label>
        {/* Select dropdown, calls onFilter on change */}
      <select onChange={(e) => onFilter(e.target.value)} className="border p-2 rounded w-full">
        <option value="">All Categories</option>
        {/* Maps through categories to create options */}
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;