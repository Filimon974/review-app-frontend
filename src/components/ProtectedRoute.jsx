import { Navigate }
from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

function ProtectedRoute({
  children
}) {

  const {
    user,
    authLoading
  } = useAuth();



  /* LOADING STATE */
  if (authLoading) {

    return (

      <div
        className="
        min-h-screen
        bg-[#fafafa]
        flex
        items-center
        justify-center
        px-6
        "
      >

        <div
          className="
          w-full
          max-w-md
          rounded-[32px]
          border
          border-black/5
          bg-white
          p-8
          shadow-sm
          "
        >

          {/* IMAGE */}
          <div
            className="
            h-52
            w-full
            rounded-3xl
            bg-gray-200
            animate-pulse
            "
          />



          {/* TITLE */}
          <div
            className="
            mt-6
            h-6
            w-2/3
            rounded-full
            bg-gray-200
            animate-pulse
            "
          />



          {/* TEXT */}
          <div
            className="
            mt-4
            space-y-3
            "
          >

            <div
              className="
              h-4
              w-full
              rounded-full
              bg-gray-200
              animate-pulse
              "
            />

            <div
              className="
              h-4
              w-5/6
              rounded-full
              bg-gray-200
              animate-pulse
              "
            />

            <div
              className="
              h-4
              w-4/6
              rounded-full
              bg-gray-200
              animate-pulse
              "
            />

          </div>



          {/* BUTTON */}
          <div
            className="
            mt-8
            h-12
            w-full
            rounded-2xl
            bg-gray-200
            animate-pulse
            "
          />

        </div>

      </div>

    );

  }



  /* NOT LOGGED IN */
  if (!user) {

    return (
      <Navigate to="/login" />
    );

  }



  return children;

}

export default ProtectedRoute;