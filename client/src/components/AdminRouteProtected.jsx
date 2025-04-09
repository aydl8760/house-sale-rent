// components/AdminRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRouteProtected = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRouteProtected;
