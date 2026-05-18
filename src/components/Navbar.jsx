import {
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  FiLogOut
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

import MobileBottomNav from "./MobileBottomNav";

function Navbar() {

  const {
    user,
    logout
  } = useAuth();

  const navigate = useNavigate();

  const desktopLinks = [
    {
      path: "/",
      label: "Home"
    },
    {
      path: "/search",
      label: "Discover"
    },
    {
      path: "/saved",
      label: "Saved"
    }
  ];

  return (

    <>

      {/* TOP NAVBAR */}
      <nav
        className="
        sticky
        top-0
        z-[120]
        border-b
        border-black/5
        bg-white/80
        backdrop-blur-xl
        "
      >

        <div
          className="
          max-w-7xl
          mx-auto
          px-4
          md:px-6
          h-[76px]
          flex
          items-center
          justify-between
          "
        >

          {/* LOGO */}
          <Link
            to="/"
            className="
            text-2xl
            font-black
            tracking-tight
            text-black
            "
          >
            WanderRate
          </Link>

          {/* DESKTOP MENU */}
          <div
            className="
            hidden
            md:flex
            items-center
            gap-2
            "
          >

            {desktopLinks.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  px-5
                  py-3
                  rounded-2xl
                  text-sm
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        bg-black
                        text-white
                      `
                      : `
                        text-gray-600
                        hover:bg-gray-100
                        hover:text-black
                      `
                  }
                `}
              >
                {item.label}
              </NavLink>

            ))}

          </div>

          {/* RIGHT SIDE */}
          <div
            className="
            flex
            items-center
            gap-3
            "
          >

            {user ? (

              <>

                <Link
                  to="/create-review"
                  className="
                  hidden
                  md:flex
                  items-center
                  justify-center
                  px-5
                  py-3
                  rounded-2xl
                  bg-orange-500
                  text-white
                  text-sm
                  font-semibold
                  shadow-lg
                  shadow-orange-500/20
                  hover:bg-orange-600
                  transition-all
                  duration-300
                  "
                >
                  Write Review
                </Link>

                <Link
                  to="/profile"
                  className="
                  hidden
                  md:flex
                  items-center
                  justify-center
                  px-5
                  py-3
                  rounded-2xl
                  bg-gray-100
                  text-sm
                  font-semibold
                  hover:bg-gray-200
                  transition
                  "
                >
                  Profile
                </Link>

                <button

                  onClick={() => {

                    logout();

                    navigate("/");

                  }}

                  className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-2xl
                  bg-black
                  text-white
                  text-sm
                  font-semibold
                  hover:opacity-90
                  transition-all
                  duration-300
                  "
                >

                  <FiLogOut />

                  Logout

                </button>

              </>

            ) : (

              <>

                <Link
                  to="/login"
                  className="
                  text-sm
                  font-semibold
                  text-gray-600
                  hover:text-black
                  transition
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                  px-5
                  py-3
                  rounded-2xl
                  bg-orange-500
                  text-white
                  text-sm
                  font-semibold
                  shadow-lg
                  shadow-orange-500/20
                  hover:bg-orange-600
                  transition-all
                  duration-300
                  "
                >
                  Register
                </Link>

              </>

            )}

          </div>

        </div>

      </nav>

      {/* MOBILE BOTTOM NAV */}
      {user && <MobileBottomNav />}

    </>

  );

}

export default Navbar;