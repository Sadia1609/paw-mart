import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const AdminRoute = ({ children }) => {
  const { user, userRole, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-blue-600"></div>
      </div>
    );
  }

  if (user && userRole === 'admin') {
    return children;
  }

  return <Navigate to="/dashboard/stats" state={{ from: location }} replace />;
};

export default AdminRoute;