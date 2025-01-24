import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Login component, for user authentication
const Login = () => {
  // State for username input
  const [username, setUsername] = useState('');
  // State for password input
  const [password, setPassword] = useState('');
  // Get login function from useAuth hook
  const { login } = useAuth();
  // Get navigate function from react-router-dom
  const navigate = useNavigate();
  // Get location function from react-router-dom
    const location = useLocation();


    // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
      // Try login request
    try {
        // Send the credentials and await for the data
      const data = await api.login(username, password);
        // Call the login function from the Auth context
        login(data.token);
      // Get redirect path
      const from = location.state?.from?.pathname || '/';
        // Redirect to the given path or home
      navigate(from, { replace: true });
     // Handle login failure
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., display an error message)
    }
  };

  return (
      // Container for login form
    <div className="bg-white rounded shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {/* Login form */}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
           {/* Username field */}
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-6">
          {/* Password field */}
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;