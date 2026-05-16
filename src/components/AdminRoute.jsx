import { Navigate }
from "react-router-dom";

import { useAuth }
from "../context/AuthContext";



function AdminRoute({
  children
}) {

  const {
    user,
    authLoading
  } = useAuth();



  if (authLoading) {

    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        "
      >
        Loading...
      </div>
    );

  }



  if (!user) {

    return (
      <Navigate to="/login" />
    );

  }



  if (user.role !== "admin") {

    return (
      <Navigate to="/" />
    );

  }



  return children;

}

export default AdminRoute;