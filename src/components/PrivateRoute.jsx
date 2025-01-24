import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// PrivateRoute component, to protect routes based on authentication
const PrivateRoute = ({ children }) => {
  // Get the auth token
  const { token } = useAuth();
    // Get the current location
    const location = useLocation()
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // If token exists, render children
  return children;
};

export default PrivateRoute;