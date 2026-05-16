import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

  const { user } = useAuth();

  // not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // not admin
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;