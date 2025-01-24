import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import Checkout from './pages/Checkout';
import PaymentSuccessful from './pages/PaymentSuccessful';
import Profile from './pages/Profile';

// App component, sets up the main application structure and routing
const App = () => {
    return (
      // Provide the authentication context to the app
        <AuthProvider>
            {/* Router for application navigation */}
        <Router>
            {/* Routes configuration */}
            <Routes>
              {/* Login route  */}
              <Route path="/login" element={<LoginPage />} />
               {/* Main route with layout */}
              <Route path="/*" element={
                   // Layout component to render headers and footers
                  <Layout>
                     {/* Nested routes */}
                      <Routes>
                          {/* Home page */}
                          <Route path="/" element={<Home />} />
                          {/* Product details page */}
                         <Route path="/product/:id" element={<ProductPage />} />
                           {/* Checkout page, protected route */}
                         <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                             {/* Profile page, protected route */}
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                            {/* Payment successful page, protected route */}
                        <Route path="/payment-successful" element={<PrivateRoute><PaymentSuccessful /></PrivateRoute>} />
                           {/* Not found page, if route is not in the routes */}
                          <Route path="*" element={<p>Not Found</p>} />
                      </Routes>
                  </Layout>
              } />
          </Routes>
        </Router>
        </AuthProvider>
    );
};

export default App;