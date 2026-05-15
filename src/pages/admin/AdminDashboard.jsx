import MainLayout from "../../layouts/MainLayout";

import {
  FiMapPin,
  FiUsers,
  FiStar,
  FiMessageCircle
} from "react-icons/fi";



function AdminDashboard() {

  return (

    <MainLayout>

      <div className="mt-10">

        {/* HEADER */}
        <div>

          <h1
            className="
            text-5xl
            font-bold
            "
          >
            Admin Dashboard
          </h1>

          <p
            className="
            text-gray-500
            mt-3
            "
          >
            Manage your platform
          </p>

        </div>



        {/* STATS */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mt-10
          "
        >

          <div
            className="
            bg-white
            rounded-3xl
            p-6
            "
          >

            <FiMapPin size={30} />

            <h2
              className="
              text-4xl
              font-bold
              mt-5
              "
            >
              120
            </h2>

            <p className="text-gray-500">
              Places
            </p>

          </div>



          <div
            className="
            bg-white
            rounded-3xl
            p-6
            "
          >

            <FiUsers size={30} />

            <h2
              className="
              text-4xl
              font-bold
              mt-5
              "
            >
              540
            </h2>

            <p className="text-gray-500">
              Users
            </p>

          </div>



          <div
            className="
            bg-white
            rounded-3xl
            p-6
            "
          >

            <FiStar size={30} />

            <h2
              className="
              text-4xl
              font-bold
              mt-5
              "
            >
              1.2K
            </h2>

            <p className="text-gray-500">
              Reviews
            </p>

          </div>



          <div
            className="
            bg-white
            rounded-3xl
            p-6
            "
          >

            <FiMessageCircle size={30} />

            <h2
              className="
              text-4xl
              font-bold
              mt-5
              "
            >
              85
            </h2>

            <p className="text-gray-500">
              Reports
            </p>

          </div>

        </div>



        {/* QUICK ACTIONS */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          mt-10
          "
        >

          <a
            href="/admin/places"
            className="
            bg-black
            text-white
            rounded-3xl
            p-8
            text-2xl
            font-bold
            "
          >
            Manage Places
          </a>



          <a
            href="/admin/reviews"
            className="
            bg-white
            rounded-3xl
            p-8
            text-2xl
            font-bold
            "
          >
            Moderate Reviews
          </a>

        </div>

      </div>

    </MainLayout>

  );

}

export default AdminDashboard;