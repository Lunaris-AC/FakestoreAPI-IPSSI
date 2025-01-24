import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

// Profile component, renders the user profile page
const Profile = () => {
    // Get user data and logout function from Auth context
    const { user, logout } = useAuth();
     // Navigation function
    const navigate = useNavigate();
    // State for storing orders from local storage
    const [orders, setOrders] = useState([]);
     // State for filter from date
    const [filterFromDate, setFilterFromDate] = useState('');
    // State for filter to date
    const [filterToDate, setFilterToDate] = useState('');
      // State to manage cart visibility
      const [setCartOpen] = useState(false);


    useEffect(() => {
      // Fetch orders from localStorage, or set to empty if there's no orders
        const ordersFromLS =  JSON.parse(localStorage.getItem('orders') || '[]');
         // Sets the orders to the state
            setOrders(ordersFromLS)
        // Gets the current date
            const today = new Date();
          // Sets the previous month date
          const lastMonth = new Date(today);
          lastMonth.setMonth(today.getMonth() - 1);
          // Sets the dates to filter the orders
          setFilterFromDate(lastMonth.toISOString().split('T')[0]);
          setFilterToDate(today.toISOString().split('T')[0]);
     }, []);

   // Logout function
    const handleLogout = () => {
        logout()
        navigate('/')
    }
    // Function to add products from an order to the cart
    const handleAddToCartFromOrder = (order) => {
        // Get cart data from local storage, or set to empty array
     const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      // Map through the order items
      order.items.forEach(item => {
          // Checks if the item already exists in the cart
            const existingCartItem = cart.find((cartItem) => cartItem.id === item.id);
          if(existingCartItem){
              // If the item exists, it updates the quantity
              const updatedCart = cart.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
          }else{
              // If the item doesn't exist, it adds it to the cart
            const updatedCart = [...cart, item];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
          }
          // Dispatch the event for updating cart
           window.dispatchEvent(new Event('storage'))
      });
        // Set cart modal to open
          setCartOpen(true);
           // Reload page
         navigate(0)
    };
     // Function to filter orders by date
    const filteredOrders = orders.filter((order) => {
         // Return true if there's no filter date
         if(!filterFromDate && !filterToDate){
          return true
         }
          // Get the order date
          const orderDate = new Date(order.date)
        // if a filter from date exists, return false for all the orders that are before that date
         if(filterFromDate){
            const fromDate = new Date(filterFromDate);
             if(orderDate < fromDate){
                 return false
             }
        }
        // if a filter to date exists, return false for all the orders that are after that date
        if(filterToDate){
            const toDate = new Date(filterToDate);
            if(orderDate > toDate){
                return false
            }
        }
           return true
    });
     // Function to generate a receipt of an order with jspdf
    const generateReceiptPdf = (order) => {
        const doc = new jsPDF();
        doc.text(`Order ID: ${order.id}`, 10, 10);
        doc.text(`Date: ${order.date}`, 10, 20);
          // Set initial y position for the items
        let y = 40
        // Maps through order items to add them to the receipt
        order.items.forEach((item) => {
            doc.text(`${item.title} - $${item.price} - Quantity: ${item.quantity}`, 10, y);
            y+=10
        })
        // Calculates the total for the current order
        let total = order.items.reduce((total, item) => total + item.price * item.quantity, 0);
          // Adds the total to the receipt
        doc.text(`Total: $${total.toFixed(2)}`, 10, y);
        // Save the pdf
        doc.save(`receipt-order-${order.id}.pdf`);
    };

    // Redirect to login page if the user is not logged in
    if (!user) {
        return <p>Please login</p>;
    }

    return (
        <div className="container mx-auto py-8">
           {/* Profile heading */}
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            {/* User information */}
            <div className="bg-white rounded shadow-md p-6 mb-4">
                <h3 className="text-xl font-semibold mb-2">Account Information</h3>
                <p>Username: {user.username}</p>
            </div>
             {/* Order history section */}
            <section className="py-24 relative">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                    {/* Order history heading */}
                    <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">Order History</h2>
                      {/* Date filter inputs */}
                    <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
                        <div className="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
                            <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
                                 {/* from date filter input */}
                                <svg className="relative " width="18" height="20" viewBox="0 0 18 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                                        stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input type="text" name="from-dt" id="from-dt"
                                    className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                                       placeholder="11-01-2023"
                                       value={filterFromDate}
                                       onChange={(e) => setFilterFromDate(e.target.value)}
                                />
                            </div>
                             {/* date to filter input */}
                            <p className="font-medium text-lg leading-8 text-black">To</p>
                            <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
                                <svg className="relative " width="18" height="20" viewBox="0 0 18 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                                        stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input type="text" name="to-dt" id="to-dt"
                                    className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                                       placeholder="11-01-2023"
                                      value={filterToDate}
                                       onChange={(e) => setFilterToDate(e.target.value)}
                                    />
                            </div>
                        </div>
                    </div>
                     {/* Maps through filtered orders */}
                       {filteredOrders.map((order) => (
                         <div key={order.id} className="mt-7 border border-gray-300 pt-9">
                             {/* Order info  */}
                                <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                                    <div className="data">
                                         {/* Order ID */}
                                        <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Order : #{order.id}</p>
                                        {/* Order date */}
                                        <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Order Payment : {order.date}</p>
                                    </div>
                                      {/* Buttons for the receipt and to add to cart */}
                                    <div className="flex items-center gap-3 max-md:mt-5">
                                        <button
                                            onClick={() => generateReceiptPdf(order)}
                                            className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">Show
                                            Invoice</button>
                                        <button
                                             onClick={() => handleAddToCartFromOrder(order)}
                                            className="rounded-full px-7 py-3 bg-indigo-600 shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">Buy
                                             Now
                                            <ShoppingCartIcon className="size-4 ml-2" />
                                          </button>

                                    </div>
                                </div>
                                 {/* horizontal line */}
                                <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                                    fill="none">
                                    <path d="M0 1H1216" stroke="#D1D5DB" />
                                </svg>
                                 {/* map through the order items */}
                                 {order.items.map(item => (
                                    <div key={item.id} className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                                        <div className="grid grid-cols-4 w-full">
                                           {/* Product image */}
                                            <div className="col-span-4 sm:col-span-1">
                                                <img src={item.image} alt="" className="max-sm:mx-auto object-cover" />
                                            </div>
                                            <div
                                                className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                                                {/* Product title */}
                                                <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                                                    {item.title}
                                               </h6>
                                                {/* Product author */}
                                                <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">By: FakeStore</p>
                                                <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                                    <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Size:
                                                        s</span>
                                                    {/* Product quantity */}
                                                    <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty:
                                                        {item.quantity}</span>
                                                    {/* Product price */}
                                                    <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Price ${item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}


                         </div>
                        ))}
                 </div>
            </section>
            {/* Logout button */}
           <div className="text-right mt-4">
          <button onClick={handleLogout} className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600">
              Logout
           </button>
      </div>
          </div>
    );
};

export default Profile;