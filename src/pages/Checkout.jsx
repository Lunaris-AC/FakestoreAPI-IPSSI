import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Checkout component, renders checkout form and handles checkout logic
const Checkout = () => {
    // Get cart from localStorage, or set to empty array if there's nothing
    const [cart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
     // Navigation function
    const navigate = useNavigate();
    // State to manage the payment status
    const [paymentStatus, setPaymentStatus] = useState(null);
     // State for the address data
    const [address, setAddress] = useState({
        street: '',
        city: '',
        zipcode: '',
    });
    // State for the card data
    const [card, setCard] = useState({
        number: '',
        expiry: '',
        cvv: '',
    });
    // State for form errors
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Redirect to the cart page if the cart is empty
        if(cart.length === 0) {
            navigate('/cart')
        }
    }, [cart, navigate]);

  // Function to calculate the total amount of the cart
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Function to handle address input changes
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
        // Reset the error for the changed input
         setErrors({...errors, [name]: ''})
    };

    // Function to handle credit card input changes, and format the data
    const handleCardChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        // Formats the card number input to be displayed with spaces every 4 numbers
        if (name === 'number') {
            formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
          // Formats the expiry date with a "/", and limits to 5 characters
        } else if (name === 'expiry') {
            formattedValue = value.replace(/\D/g, '').substring(0, 2) + '/' + value.replace(/\D/g, '').substring(2, 4);
             formattedValue = formattedValue.substring(0,5);
             // Formats the CVV to only allow 3 numbers
        } else if (name === 'cvv'){
            formattedValue = value.replace(/\D/g, '').substring(0,3);
        }
         setCard({ ...card, [name]: formattedValue });
        // Reset the error for the changed input
       setErrors({...errors, [name]: ''})
    };
     // Function to validate the form data
    const validate = () => {
        let newErrors = {}
        // Check that address is valid
        if(!address.street){
            newErrors.street = "Street is required"
        }
        if(!address.city){
            newErrors.city = "City is required"
        }
        if(!address.zipcode){
            newErrors.zipcode = "Zip Code is required"
        }
        // Check that card is valid
        if(!card.number){
            newErrors.number = "Card number is required"
        }else if(card.number.replace(/\s/g, '').length !== 16){
            newErrors.number = "Card number is invalid"
        }
        if(!card.expiry){
            newErrors.expiry = "Expiry is required"
        }else if(!/^\d{2}\/\d{2}$/.test(card.expiry)){
            newErrors.expiry = "Expiry is invalid"
        }
        if(!card.cvv){
            newErrors.cvv = "CVV is required"
        }else if(card.cvv.length !== 3){
            newErrors.cvv = "CVV is invalid"
        }
        // Set errors and returns if there are no errors
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    };

      // Function to handle the payment simulation
    const handlePayment = (e) => {
        e.preventDefault();
        // Validate before payment simulation
         if(!validate()){
            return
        }
       // Sets payment status to processing
        setPaymentStatus("processing")
        // Simulates a delay on payment processing
        setTimeout(() => {
           // Sets the payment status to success, if payment was successful
            setPaymentStatus("success");
             // Create a new order object
            const newOrder = {
                id: uuidv4(),
                date: new Date().toISOString().split('T')[0],
                items: cart,
            };
             // Get the orders from local storage
            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            // Update the orders in local storage
            localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
            // Clear the current cart
            localStorage.removeItem('cart');
             // Dispatch storage event to update header
            window.dispatchEvent(new Event('storage'))
            // After the payment was successful, redirect to payment-successful page
             setTimeout(() => {
                 navigate('/payment-successful')
             }, 2000)
        }, 3000)
    };

    // If the cart is empty, show message and redirect
    if (cart.length === 0) {
        return <p>Your cart is empty.</p>;
    }

  return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
             {/* Cart items to be checked out */}
            <ul>
                {cart.map((item) => (
                    <li key={item.id} className="flex items-center justify-between bg-white rounded shadow p-4 mb-2">
                        <div className="flex items-center">
                            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mr-4" />
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-gray-600">Price: ${item.price}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Checkout form */}
            <div className="text-right mt-4">
                <p className="font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
                 <form onSubmit={handlePayment} className="mt-4">
                     {/* Address section */}
                    <div className="mb-4 relative">
                        <h3 className="text-xl font-semibold mb-2">Address</h3>
                           <input
                            type="text"
                             name="street"
                             placeholder="Address and Number"
                             value={address.street}
                            onChange={handleAddressChange}
                            className={`border p-2 rounded w-full mb-2 ${errors.street ? 'border-red-500' : ''}`}
                           required
                          />
                         {/* Shows street error, when there is one */}
                           {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
                            <input
                             type="text"
                              name="city"
                             placeholder="City"
                              value={address.city}
                             onChange={handleAddressChange}
                             className={`border p-2 rounded w-full mb-2 ${errors.city ? 'border-red-500' : ''}`}
                             required
                            />
                           {/* Shows city error, when there is one */}
                           {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                         <input
                           type="text"
                           name="zipcode"
                           placeholder="Zip Code"
                            value={address.zipcode}
                            onChange={handleAddressChange}
                            className={`border p-2 rounded w-full mb-2 ${errors.zipcode ? 'border-red-500' : ''}`}
                           required
                           />
                          {/* Shows zipcode error, when there is one */}
                          {errors.zipcode && <p className="text-red-500 text-sm">{errors.zipcode}</p>}
                    </div>
                     {/* Payment section */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Payment Information</h3>
                        <input
                            type="text"
                            name="number"
                            placeholder="Card Number: 0000 0000 0000 0000"
                            value={card.number}
                            onChange={handleCardChange}
                            className={`border p-2 rounded w-full mb-2 ${errors.number ? 'border-red-500' : ''}`}
                            required
                        />
                            {/* Shows card number error, when there is one */}
                         {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
                         <input
                            type="text"
                            name="expiry"
                            placeholder="Expiration Date: MM/YY"
                            value={card.expiry}
                            onChange={handleCardChange}
                            className={`border p-2 rounded w-full mb-2 ${errors.expiry ? 'border-red-500' : ''}`}
                            required
                        />
                            {/* Shows expiry date error, when there is one */}
                         {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV: 000"
                            value={card.cvv}
                            onChange={handleCardChange}
                            className={`border p-2 rounded w-full mb-2 ${errors.cvv ? 'border-red-500' : ''}`}
                            required
                        />
                         {/* Shows cvv error, when there is one */}
                         {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                    </div>
                      {/* Displays the payment status message */}
                    {paymentStatus === "processing" && <p>Processing...</p>}
                      {/* Displays payment successful message */}
                    {paymentStatus === "success" && <p>Payment Successful</p>}
                     {/* Payment button, is disabled when payment is processing */}
                    <button
                        disabled={paymentStatus === "processing" || paymentStatus === "success"}
                        className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                    >
                        Simulate Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;