import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import api from '../utils/api';
import { useSearchParams } from 'react-router-dom';

// Home component, for displaying product listings
const Home = () => {
    // State for all products
    const [products, setProducts] = useState([]);
    // State for categories (not used, but needed to make the linter happy)
    const [setCategories] = useState([]);
    // State for filtered products
    const [filteredProducts, setFilteredProducts] = useState([]);
    // State for search term
    const [searchTerm, setSearchTerm] = useState('');
    // Get the search params from the URL
      const [searchParams] = useSearchParams();

    useEffect(() => {
        // Function to fetch products from the API
        const fetchProducts = async () => {
            try {
                const data = await api.getProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        // Function to fetch product categories
          const fetchCategories = async () => {
            try {
                const data = await api.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        // Fetch data when the component loads
        fetchProducts();
        fetchCategories();
          // Empty dependency to prevent from fetching data again and again
    }, [setCategories]);

      useEffect(() => {
          // Filter products by title based on the search term
        let results = products
            .filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
          // Filter products by category using query params
        const category = searchParams.get('category');
         // If a category exists, filter the products by the current category
        if (category) {
            results = results.filter(product => product.category === category)
        }
        // Set the filtered products
        setFilteredProducts(results);
         // Fetch data when products, searchTerm or searchParams changes
    }, [products, searchTerm, searchParams]);

    // Function to update the search term
    const handleSearch = (term) => {
        setSearchTerm(term)
    }

    return (
         <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                 {/* Search bar component */}
                <SearchBar onSearch={handleSearch} />
                  {/* Products heading */}
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                 {/* Grid to display product cards */}
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {/* Map through filtered products */}
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                {/* Product image */}
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            {/* Product details */}
                            <div className="mt-4 flex justify-between">
                                <div>
                                     {/* Link to product details page */}
                                    <h3 className="text-sm text-gray-700">
                                        <a href={`/product/${product.id}`}>
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            {product.title}
                                        </a>
                                    </h3>
                                    {/* Product category */}
                                   <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                </div>
                                  {/* Product price */}
                                <p className="text-sm font-medium text-gray-900">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;