import React from 'react';
import Login from '../components/Login';

// LoginPage component, displays the login form
const LoginPage = () => {
    return (
      // Container to center the login form
        <div className="flex items-center justify-center h-screen">
            {/* Login form component */}
            <Login />
        </div>
    )
}

export default LoginPage