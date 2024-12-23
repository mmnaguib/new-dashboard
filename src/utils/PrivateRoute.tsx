import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isLoggedIn = localStorage.getItem("authToken");

  return (
    <Route {...rest} element={isLoggedIn ? children : <Navigate to="/" />} />
  );
};

export default PrivateRoute;
