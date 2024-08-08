import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utility/AuthUtility';

interface ProtectedRouteProps {
  component: React.ComponentType<any>; // Allow component to have any props
  [key: string]: any; // Allow other props to be passed
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
