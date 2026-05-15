import { Link } from "react-router-dom";
import { useAuth }from "../context/AuthContext";
import {FiSearch,FiBell} from "react-icons/fi";
import { useNavigate } from "react-router-dom";


function Navbar() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    

  return (

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



  <Link to="/saved">
    Saved
  </Link>



  {user ? (

    <>

      {/* USER NAME */}
      <div
        className="
        font-semibold
        "
      >
        {user.name}
      </div>
      <Link to="/create-review">
  Write Review
</Link>
      <Link to="/profile">Profile </Link>


      {/* LOGOUT */}
      <button

        onClick={() => {logout(); navigate("/"); }}

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

  );

}

export default Navbar;