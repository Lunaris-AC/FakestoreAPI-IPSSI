import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import useAuth from '../hooks/useAuth';

// ProductPage component, displays a single product detail page
const ProductPage = () => {
    // Get product id from route params
    const { id } = useParams();
    // State for current product
    const [product, setProduct] = useState(null);
    // Navigation function
    const navigate = useNavigate();
    // State for cart data from localStorage
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
     // Get user info from useAuth hook
    const { user } = useAuth();

    useEffect(() => {
        // Function to fetch product details from api
        const fetchProduct = async () => {
            try {
                const data = await api.getProduct(id);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                 // Navigate to not found page when there is an error
                navigate('/not-found');
            }
        };
         // Fetch product on mount, when id is changed
        fetchProduct();
    }, [id, navigate]);

    // Function to handle add to cart
    const handleAddToCart = async () => {
         // Redirect to login if not logged in
        if(!user){
            navigate('/login');
            return
        }
        if (product) {
             // Check if the item already exists in the cart
            const existingCartItem = cart.find((item) => item.id === product.id);
             let updatedCart
            if(existingCartItem){
                // If the item exists, updates the quantity
                 updatedCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }else{
                // if the item doesn't exist, adds it to the cart.
                const newItem = { ...product, quantity: 1 };
               updatedCart = [...cart, newItem];
            }
            // Sets the updated cart
             setCart(updatedCart);
            // Saves the cart data in local storage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            // Dispatch storage event
            window.dispatchEvent(new Event('storage'))
            // Reload page for the cart count to be updated
            navigate(0)
        }
    };
    // Display a loading message if product is null
    if (!product) {
        return <p>Loading...</p>;
    }

  return (
     <div className="bg-white">
          <div className="pt-6">
             {/* Navigation breadcrumb */}
              <nav aria-label="Breadcrumb">
                  <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                      <li>
                           {/* Breadcrumb home link */}
                          <div className="flex items-center">
                              <a href="/" className="mr-2 text-sm font-medium text-gray-900">Home</a>
                              <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                              </svg>
                          </div>
                      </li>
                        {/* Breadcrumb category link */}
                       <li className="text-sm">
                             <a href={`/?category=${product.category}`}  className="mr-2 text-sm font-medium text-gray-900">{product.category}</a>
                              <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                 <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                             </svg>
                       </li>
                       {/* Breadcrumb product title */}
                      <li className="text-sm">
                           <span aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{product.title}</span>
                      </li>
                  </ol>
              </nav>

              {/* Image gallery */}
              <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                 <div className="hidden size-full rounded-lg object-cover lg:block">
                      <img
                           src={product.image}
                            alt={product.title}
                        className="size-full object-cover "
                        style={{height: "400px"}} />
                   </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                      <div className="aspect-[3/2] w-full rounded-lg object-cover">
                          <img
                             src={product.image}
                            alt={product.title}
                            className=" object-cover"
                            style={{height: "197px"}}
                            />
                       </div>
                       <div className="aspect-[3/2] w-full rounded-lg object-cover">
                          <img
                            src={product.image}
                              alt={product.title}
                                className="object-cover"
                                style={{height: "197px"}}
                             />
                       </div>
                   </div>
                   <div className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-auto">
                       <img
                            src={product.image}
                             alt={product.title}
                            className="object-cover"
                           style={{height: "480px"}}
                            />
                   </div>
              </div>

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                  </div>

                  {/* Options */}
                  <div className="mt-4 lg:row-span-3 lg:mt-0">
                      <h2 className="sr-only">Product information</h2>
                      <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
                           {/* Add to bag button */}
                           <button
                              onClick={handleAddToCart}
                                type="button"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >Add to bag</button>
                      </div>
                    {/* Product description and category */}
                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>
                        {/* Category */}
                         <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Category</h3>
                            <div className="mt-4">
                             <p className="text-gray-600">{product.category}</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default ProductPage;