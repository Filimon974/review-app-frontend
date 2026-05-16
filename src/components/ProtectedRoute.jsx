import { Navigate } from "react-router-dom";

import { useAuth }
from "../context/AuthContext";



function ProtectedRoute({
  children
}) {

  const {
    user,
    authLoading
  } = useAuth();



  // WAIT FOR AUTH
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



  // NOT LOGGED IN
  if (!user) {

    return (
      <Navigate to="/login" />
    );

  }



  return children;

}

export default ProtectedRoute;