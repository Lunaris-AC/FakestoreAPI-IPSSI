import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// PaymentSuccessful component, displays the success payment message
const PaymentSuccessful = () => {
    // Navigation function
    const navigate = useNavigate();

    useEffect(() => {
         // Navigate to home after 3 seconds
        setTimeout(() => {
           navigate('/')
        }, 3000)
         // dependency array to trigger this method only on component mount
    }, [navigate]);

  return (
      // Container for the payment successful message, using tailwind
    <div className="flex justify-center items-center h-screen">
        {/* Container to center the message */}
      <div className="text-center">
        {/* Payment successful title */}
        <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
          {/* Message for user */}
        <p className="text-gray-700">
          Thank you for your purchase. You will be redirected in 3 seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessful;