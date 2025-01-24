import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

// Custom hook to use the authentication context
const useAuth = () => {
  // Return the AuthContext
    return useContext(AuthContext)
}

export default useAuth