import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please login first</div>;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <div>Access Denied. This page requires {requiredRole} role.</div>;
  }

  return children;
};

export default ProtectedRoute;
