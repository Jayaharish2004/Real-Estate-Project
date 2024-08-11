import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('sellerAuth') === 'true';

  return isAuthenticated ? children : <Navigate to="/seller-login" />;
};

export default PrivateRoute;
