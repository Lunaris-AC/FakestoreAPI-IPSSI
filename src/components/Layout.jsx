import React from 'react'
// Import the Header component
import Header from './Header'

// Layout component, it receives children as prop
const Layout = ({ children }) => {
    return (
      // React Fragment to wrap the layout structure
    <>
      {/* Header component  */}
    <Header />
      {/* Main content area of the layout */}
        <main className="container mx-auto py-8">
          {/* Renders the component's children in the main section */}
            {children}
        </main>
    </>
    )
}

// Export the Layout component
export default Layout