import React, { useContext, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { foodStoreContext } from '../../context/StoreContext'


const PrivateRoute = ({ children }) => {
    // const { token } = useContext(foodStoreContext)
    const location = useLocation()
    const navigate = useNavigate()
   
const token = localStorage.getItem("token")
    if (!token) {
      // Save the current location to redirect after login
      const from = location.pathname;
      return <Navigate to={`/login?from=${encodeURIComponent(from)}`} replace />;
    }
    
    return children;
    
}

export default PrivateRoute