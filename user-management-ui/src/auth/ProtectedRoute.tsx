import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
