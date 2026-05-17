import {
  FiHome,
  FiCompass,
  FiPlusSquare,
  FiBookmark,
  FiUser
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

function MobileBottomNav() {

  const navItems = [
    {
      path: "/",
      icon: <FiHome />,
      label: "Home"
    },
    {
      path: "/search",
      icon: <FiCompass />,
      label: "Discover"
    },
    {
      path: "/create-review",
      icon: <FiPlusSquare />,
      label: "Review"
    },
    {
      path: "/saved",
      icon: <FiBookmark />,
      label: "Saved"
    },
    {
      path: "/profile",
      icon: <FiUser />,
      label: "Profile"
    }
  ];

  return (

    <nav
      className="
      fixed
      bottom-0
      left-0
      right-0
      bg-white
      border-t
      z-50
      md:hidden
      "
    >

      <div
        className="
        flex
        justify-around
        items-center
        py-3
        "
      >

        {navItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex
              flex-col
              items-center
              text-xs
              transition

              ${
                isActive
                  ? "text-black"
                  : "text-gray-400"
              }
            `}
          >

            <div className="text-xl">
              {item.icon}
            </div>

            <span className="mt-1">
              {item.label}
            </span>

          </NavLink>

        ))}

      </div>

    </nav>

  );

}

export default MobileBottomNav;