import React, { createContext, useState, useEffect } from 'react'

// Create authentication context
export const AuthContext = createContext(null)

// AuthProvider component, provides authentication context
export const AuthProvider = ({ children }) => {
    // User state
  const [user, setUser] = useState(null)
  // Token state, gets initial value from localStorage
  const [token, setToken] = useState(localStorage.getItem('token') || null)

   // Function to update the token on login
    const login = (newToken) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }
   // Function to remove token and user from the state
    const logout = () => {
        setToken(null);
        setUser(null)
        localStorage.removeItem('token')
  }

  useEffect(() => {
      // Check if a token is present
    if (token) {
        // Function to fetch user data
          const fetchUser = async () => {
          try {
                // dummy fetch because the fakestore API doesn't provide a user endpoint from the token
                 setUser({id: 1, username:"admin"})
            } catch (error) {
            console.error('Error fetching user data: ', error)
              logout()
        }
      }
        // Call fetch user function
          fetchUser()
    }
  }, [token])

    // Provide authentication context to children
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}