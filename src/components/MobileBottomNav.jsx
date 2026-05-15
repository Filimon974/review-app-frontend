import { Link } from "react-router-dom";

import {
  FiHome,
  FiBookmark,
  FiUser,
  FiPlusCircle
} from "react-icons/fi";



function MobileBottomNav() {

  return (

    <div
      className="
      md:hidden
      fixed
      bottom-0
      left-0
      w-full
      bg-white
      border-t
      border-gray-200
      flex
      justify-around
      items-center
      py-3
      z-50
      "
    >

      <Link
        to="/"
        className="
        flex
        flex-col
        items-center
        text-xs
        "
      >
        <FiHome className="text-xl" />
        Home
      </Link>



      <Link
        to="/saved"
        className="
        flex
        flex-col
        items-center
        text-xs
        "
      >
        <FiBookmark className="text-xl" />
        Saved
      </Link>



      {/* CENTER BUTTON */}
      <button
        className="
        bg-black
        text-white
        p-3
        rounded-full
        -mt-8
        shadow-lg
        "
      >
        <FiPlusCircle className="text-2xl" />
      </button>



      <Link
        to="/profile"
        className="
        flex
        flex-col
        items-center
        text-xs
        "
      >
        <FiUser className="text-xl" />
        Profile
      </Link>

    </div>

  );

}

export default MobileBottomNav;