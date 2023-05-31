/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, isLoggedIn, ...props }) {
  return (
    // eslint-disable-next-line react/destructuring-assignment
    isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
  );
}

export default ProtectedRoute;
