import { Link, useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiHome,
  FiCompass,
  FiPlusSquare,
  FiBookmark,
  FiUser
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();



  return (

    <>

      {/* =========================
          MOBILE TOP NAVBAR
      ========================= */}
      <nav
        className="
        flex
        md:hidden
        items-center
        justify-between
        px-4
        py-4
        bg-white
        border-b
        sticky
        top-0
        z-[100]
        "
      >

        {/* LOGO */}
        <Link
          to="/"
          className="
          text-xl
          font-bold
          "
        >
          WanderRate
        </Link>



        {/* AUTH */}
        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          {user ? (

            <button

              onClick={() => {

                logout();

                navigate("/");

              }}

              className="
              bg-black
              text-white
              px-4
              py-2
              rounded-full
              text-sm
              "
            >
              Logout
            </button>

          ) : (

            <>

              <Link
                to="/login"
                className="
                text-sm
                font-medium
                "
              >
                Login
              </Link>



              <Link
                to="/register"
                className="
                bg-black
                text-white
                px-4
                py-2
                rounded-full
                text-sm
                "
              >
                Register
              </Link>

            </>

          )}

        </div>

      </nav>



      {/* =========================
          DESKTOP NAVBAR
      ========================= */}
      <nav
        className="
        hidden
        md:flex
        items-center
        justify-between
        px-6
        py-4
        bg-white
        border-b
        border-gray-200
        sticky
        top-0
        z-50
        "
      >

        {/* LOGO */}
        <Link
          to="/"
          className="
          text-2xl
          font-bold
          text-black
          "
        >
          WanderRate
        </Link>



        {/* SEARCH */}
        <div
          className="
          flex
          items-center
          bg-gray-100
          rounded-full
          px-4
          py-3
          w-[420px]
          "
        >

          <FiSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search places..."
            className="
            bg-transparent
            outline-none
            ml-3
            w-full
            text-sm
            "
          />

        </div>



        {/* MENU */}
        <div
          className="
          flex
          items-center
          gap-6
          "
        >

          <Link to="/">
            Home
          </Link>

          <Link to="/search">
            Discover
          </Link>

          <Link to="/saved">
            Saved
          </Link>



          {user ? (

            <>

              

              <Link to="/create-review">
                Write Review
              </Link>



              <Link to="/profile">
                Profile
              </Link>



              {/* LOGOUT */}
              <button

                onClick={() => {

                  logout();

                  navigate("/");

                }}

                className="
                bg-black
                text-white
                px-5
                py-2
                rounded-full
                "
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <Link
                to="/login"
                className="
                font-medium
                "
              >
                Login
              </Link>



              <Link
                to="/register"
                className="
                bg-orange-500
                text-white
                px-5
                py-2
                rounded-full
                "
              >
                Register
              </Link>

            </>

          )}

        </div>

      </nav>



      {/* =========================
          MOBILE BOTTOM NAVBAR
      ========================= */}
      {user && (

        <nav
          className="
          fixed
          bottom-0
          left-0
          right-0
          bg-white
          border-t
          z-[100]
          md:hidden
          "
        >

          <div
            className="
            grid
            grid-cols-5
            py-3
            "
          >

            {/* HOME */}
            <Link
              to="/"
              className="
              flex
              flex-col
              items-center
              text-xs
              text-gray-600
              "
            >

              <FiHome size={20} />

              <span className="mt-1">
                Home
              </span>

            </Link>



            {/* DISCOVER */}
            <Link
              to="/search"
              className="
              flex
              flex-col
              items-center
              text-xs
              text-gray-600
              "
            >

              <FiCompass size={20} />

              <span className="mt-1">
                Discover
              </span>

            </Link>



            {/* CREATE REVIEW */}
            <Link
              to="/create-review"
              className="
              flex
              flex-col
              items-center
              text-xs
              text-orange-500
              "
            >

              <FiPlusSquare size={24} />

              <span className="mt-1">
                Review
              </span>

            </Link>



            {/* SAVED */}
            <Link
              to="/saved"
              className="
              flex
              flex-col
              items-center
              text-xs
              text-gray-600
              "
            >

              <FiBookmark size={20} />

              <span className="mt-1">
                Saved
              </span>

            </Link>



            {/* PROFILE */}
            <Link
              to="/profile"
              className="
              flex
              flex-col
              items-center
              text-xs
              text-gray-600
              "
            >

              <FiUser size={20} />

              <span className="mt-1">
                Profile
              </span>

            </Link>

          </div>

        </nav>

      )}

    </>

  );

}

export default Navbar;