import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoutes = () => {
  const location = useLocation();
  const user = auth.getCurrentUser();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ pathname: location.pathname }} />
  );
};
export default ProtectedRoutes;
