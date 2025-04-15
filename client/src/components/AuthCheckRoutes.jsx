import { useToast } from "@/hooks/use-toast";
import { checkAuth } from "../store/auth-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthCheckRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
