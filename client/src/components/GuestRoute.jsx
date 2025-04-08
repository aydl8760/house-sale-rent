import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuestRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If the user is authenticated, redirect them to the home page
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children; // Allow access to login, signup, or forgotPassword if not authenticated
}
