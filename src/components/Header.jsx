import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import api from '../utils/api';

const Header = () => {
    // Get user data from useAuth hook
    const { user } = useAuth();
     // State to manage cart item count
    const [cartItemCount, setCartItemCount] = useState(0);
     // State to manage mobile menu visibility
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     // State for categories
    const [categories, setCategories] = useState([]);
    // State for cart open
    const [cartOpen, setCartOpen] = useState(false);
    // State to save cart data
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
     // Hook for navigation
     const navigate = useNavigate();

    useEffect(() => {
         // Function to update the cart item count from localStorage
        const updateCartItemCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0))
        }
        // Get cart item count from localStorage
        updateCartItemCount()
        // Add storage event listener to update cart count
        window.addEventListener('storage', updateCartItemCount)
        // Fetch categories from API
         const fetchCategories = async () => {
           try {
             const data = await api.getCategories();
              setCategories(data);
           } catch (error) {
            console.error('Error fetching categories:', error);
            }
       };
          fetchCategories();
        // Remove event listener
        return () => {
            window.removeEventListener('storage', updateCartItemCount)
        }
    }, []);
     useEffect(() => {
        // Save cart on local storage
       localStorage.setItem('cart', JSON.stringify(cart));
        // Dispatch storage event
        window.dispatchEvent(new Event('storage'))
    }, [cart]);


    // Function to toggle mobile menu visibility
    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }
     // Function to toggle cart visibility
     const handleCartToggle = () => {
        setCartOpen(!cartOpen)
     };

    // Function to remove an item from cart
    const handleRemoveItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
         navigate(0);
  };
    // Function to update item quantity in cart
    const handleUpdateQuantity = (id, quantity) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        navigate(0)
    };

    // Function to calculate cart total
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    // Function to handle checkout, and redirect to the checkout page.
    const handleCheckout = () => {
      setCartOpen(false)
      navigate('/checkout')
    }

  return (
     <div className="bg-white">
          {/* Mobile menu overlay */}
          <div className={`relative z-40 lg:hidden ${mobileMenuOpen ? '' : 'hidden'}`} role="dialog" aria-modal="true">
              <div className="fixed inset-0 bg-black/25" aria-hidden="true"></div>
              <div className="fixed inset-0 z-40 flex">
                  {/* Mobile menu */}
                  <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                       {/* Mobile menu close button */}
                      <div className="flex px-4 pb-2 pt-5">
                          <button type="button" className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" onClick={handleMobileMenuToggle}>
                              <span className="absolute -inset-0.5"></span>
                              <span className="sr-only">Close menu</span>
                              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                          </button>
                      </div>
                      {/* Mobile menu links */}
                      <div className="mt-2">
                          <div className="border-b border-gray-200">
                              <div className="-mb-px flex space-x-8 px-4" aria-orientation="horizontal" role="tablist">
                                  {/* Map through categories */}
                                  {categories.map((category, index) => (
                                        <NavLink
                                            key={index}
                                           to={`/?category=${category}`}
                                            id={`tabs-1-tab-${index}`}
                                          className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900"
                                          aria-controls={`tabs-1-panel-${index}`}
                                          role="tab"
                                          type="button"
                                        >
                                            {category}
                                        </NavLink>
                                  ))}
                              </div>
                          </div>
                           {/* Map through categories, show all categories link in dropdown*/}
                           {categories.map((category, index) => (
                          <div key={index} id={`tabs-1-panel-${index}`} className="space-y-10 px-4 pb-8 pt-10" aria-labelledby={`tabs-1-tab-${index}`} role="tabpanel" tabIndex="0">
                             <div>
                             <ul aria-labelledby="women-clothing-heading-mobile" className="mt-6 flex flex-col space-y-6">
                                  <li className="flow-root">
                                        <NavLink  to={`/?category=${category}`} className="-m-2 block p-2 text-gray-500">Browse All</NavLink>
                                   </li>
                             </ul>
                             </div>
                         </div>
                            ))}
                      </div>
                      {/* Mobile menu account links */}
                       <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                           <div className="flow-root">
                                 <NavLink to="/" className="-m-2 block p-2 font-medium text-gray-900">Home</NavLink>
                           </div>
                           {/* Conditional profile link */}
                           {user ? (
                             <div className="flow-root">
                                 <NavLink to="/profile" className="-m-2 block p-2 font-medium text-gray-900">Profile</NavLink>
                            </div>

                            ):
                            // Conditional login link
                             (<div className="flow-root">
                                 <NavLink to="/login" className="-m-2 block p-2 font-medium text-gray-900">Sign in</NavLink>
                             </div>)}

                        </div>
                      {/* Mobile login link */}
                      <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                        {user ? null : (
                             <>
                            <div className="flow-root">
                               <NavLink to="/login" className="-m-2 block p-2 font-medium text-gray-900">Sign in</NavLink>
                            </div>
                            </>
                            )}
                      </div>
                  </div>
              </div>
          </div>

          {/* Header navbar */}
          <header className="relative bg-white">
              <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="border-b border-gray-200">
                      <div className="flex h-16 items-center">
                           {/* Mobile menu toggle button */}
                          <button type="button" className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden" onClick={handleMobileMenuToggle}>
                              <span className="absolute -inset-0.5"></span>
                              <span className="sr-only">Open menu</span>
                              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                              </svg>
                          </button>

                          {/* Logo */}
                          <div className="ml-4 flex lg:ml-0">
                              <NavLink to="/">
                                  <span className="sr-only">Your Company</span>
                                  <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                             </NavLink>
                          </div>

                          {/* Desktop Navigation Links */}
                          <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                              <div className="flex h-full space-x-8">
                               {/* Home link */}
                              <NavLink to="/" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Home</NavLink>
                                {/* Desktop category links, map through categories */}
                                  {categories.map((category, index) => (
                                      <div key={index} className="flex">
                                          <div className="relative flex">
                                              <NavLink to={`/?category=${category}`} className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800" >
                                                 {category}
                                              </NavLink>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Cart and User actions */}
                          <div className="ml-auto flex items-center">
                              {/* Conditional profile or sign in link */}
                              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                {user ? (
                                     <NavLink to="/profile" className="text-sm font-medium text-gray-700 hover:text-gray-800">Profile</NavLink>
                                ):  (   <NavLink to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</NavLink>
                                   )}
                               </div>
                              {/* Cart button, open cart modal*/}
                              <div className="ml-4 flow-root lg:ml-6">
                                  <button type="button" className="group -m-2 flex items-center p-2" onClick={handleCartToggle}>
                                    <ShoppingCartIcon className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItemCount}</span>
                                     <span className="sr-only">items in cart, view bag</span>
                                 </button>
                            </div>
                          </div>
                      </div>
                  </div>
              </nav>
          </header>
            {/* Cart modal */}
           <div className={`relative z-10 ${cartOpen ? '' : 'hidden'}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
             <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

             <div className="fixed inset-0 overflow-hidden">
                 <div className="absolute inset-0 overflow-hidden">
                     <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                          {/* Cart modal, container */}
                         <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                 {/* Cart modal header */}
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        {/* Cart modal title */}
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                         {/* Cart modal close button */}
                                        <div className="ml-3 flex h-7 items-center">
                                           <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={handleCartToggle}>
                                             <span className="absolute -inset-0.5"></span>
                                             <span className="sr-only">Close panel</span>
                                                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                 </svg>
                                            </button>
                                        </div>
                                    </div>
                                   {/* Cart items */}
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul className="-my-6 divide-y divide-gray-200">
                                                 {/* Map through cart items */}
                                                {cart.map((item) => (
                                                   <li key={item.id} className="flex py-6">
                                                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            {/* Cart item image */}
                                                          <img src={item.image} alt={item.title} className="size-full object-cover" />
                                                        </div>
                                                         {/* Cart item info */}
                                                         <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                               <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    {/* Link to product page, product title and price */}
                                                                 <h3>
                                                                     <a href={`/product/${item.id}`}>{item.title}</a>
                                                                  </h3>
                                                                    <p className="ml-4">${item.price}</p>
                                                                </div>
                                                                 {/* Cart item category */}
                                                                 <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                                            </div>
                                                             <div className="flex flex-1 items-end justify-between text-sm">
                                                                  {/* Cart item quantity and update */}
                                                                 <div className="text-gray-500 flex items-center">
                                                                     Qty
                                                                   <input
                                                                    type="number"
                                                                        min="1"
                                                                        value={item.quantity}
                                                                       onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                                                        className="border p-2 rounded w-15 text-center ml-2"
                                                                     />
                                                                  </div>
                                                                {/* Cart item remove button */}
                                                                <div className="flex">
                                                                      <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                                                  </div>
                                                              </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Cart modal footer */}
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    {/* Subtotal */}
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${calculateTotal().toFixed(2)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                   {/* Checkout button, redirects to checkout page */}
                                    <div className="mt-6">
                                          <button onClick={handleCheckout} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</button>
                                    </div>
                                   {/* Continue shopping button, closes the cart modal */}
                                   <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                           or
                                           <button type="button"  onClick={handleCartToggle} className="font-medium text-indigo-600 hover:text-indigo-500">
                                               Continue Shopping
                                                <span aria-hidden="true"> →</span>
                                           </button>
                                        </p>
                                   </div>
                                </div>
                            </div>
                       </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
  );
};

export default Header;