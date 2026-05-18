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



  /*
  =========================
  SKELETON LOADING SCREEN
  =========================
  */

  if (authLoading) {

    return (

      <div
        className="
        min-h-screen
        bg-[#fafafa]
        px-6
        py-10
        animate-pulse
        "
      >

        {/* TOP BAR */}
        <div
          className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
          "
        >

          <div
            className="
            h-10
            w-40
            rounded-2xl
            bg-gray-200
            "
          />

          <div
            className="
            h-10
            w-28
            rounded-2xl
            bg-gray-200
            "
          />

        </div>



        {/* HERO SKELETON */}
        <div
          className="
          max-w-7xl
          mx-auto
          mt-10
          h-[320px]
          rounded-[36px]
          bg-gray-200
          "
        />



        {/* GRID */}
        <div
          className="
          max-w-7xl
          mx-auto
          mt-10
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
          "
        >

          {[1,2,3,4,5,6].map((item) => (

            <div
              key={item}
              className="
              bg-white
              rounded-[28px]
              p-5
              border
              border-gray-100
              "
            >

              <div
                className="
                h-52
                rounded-3xl
                bg-gray-200
                "
              />

              <div
                className="
                h-6
                w-3/4
                rounded-full
                bg-gray-200
                mt-5
                "
              />

              <div
                className="
                h-4
                w-1/2
                rounded-full
                bg-gray-200
                mt-3
                "
              />

              <div
                className="
                h-10
                rounded-2xl
                bg-gray-200
                mt-6
                "
              />

            </div>

          ))}

        </div>

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