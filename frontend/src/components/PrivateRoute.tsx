import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({
  element
}: any) => {
  const { isAuthenticated } = useAuth();

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
