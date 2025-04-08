import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthCheckRoutes() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated && user ? <Outlet /> : <Navigate to="/login" />;
}
