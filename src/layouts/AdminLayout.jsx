import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLayout({ children }) {

  const { logout } = useAuth();

  const navigate = useNavigate();



  const handleLogout = () => {

    logout();

    navigate("/login");

  };



  return (

    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header
        className="
        bg-white
        border-b
        sticky
        top-0
        z-50
        "
      >

        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          py-5
          flex
          items-center
          justify-between
          "
        >

          {/* LOGO */}
          <Link
            to="/admin/dashboard"
            className="
            text-2xl
            font-bold
            "
          >
            Admin Panel
          </Link>



          {/* NAVIGATION */}
          <nav
            className="
            flex
            items-center
            gap-6
            "
          >

            <Link
              to="/admin/dashboard"
              className="
              font-medium
              hover:text-orange-500
              transition
              "
            >
              Dashboard
            </Link>

            <Link
              to="/admin/places"
              className="
              font-medium
              hover:text-orange-500
              transition
              "
            >
              Places
            </Link>

            <Link
              to="/admin/tags"
              className="
              font-medium
              hover:text-orange-500
              transition
              "
            >
              Tags
            </Link>



            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="
              bg-black
              text-white
              px-5
              py-2
              rounded-full
              hover:opacity-90
              transition
              "
            >
              Logout
            </button>

          </nav>

        </div>

      </header>



      {/* PAGE CONTENT */}
      <main
        className="
        max-w-7xl
        mx-auto
        px-6
        py-10
        "
      >
        {children}
      </main>

    </div>

  );

}

export default AdminLayout;