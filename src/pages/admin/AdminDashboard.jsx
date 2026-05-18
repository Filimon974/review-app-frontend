import AdminLayout from "../../layouts/AdminLayout";

import useFetch from "../../hooks/useFetch";

function AdminDashboard() {

  const {
    data,
    loading,
    error
  } = useFetch("/admin/dashboard-stats");

  if (loading) {

    return (

      <AdminLayout>

        <section className="space-y-8">

          <div>

            <div
              className="
              h-12
              w-64
              rounded-2xl
              bg-gray-200
              animate-pulse
              "
            />

            <div
              className="
              h-5
              w-72
              rounded-xl
              bg-gray-100
              animate-pulse
              mt-4
              "
            />

          </div>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            "
          >

            {[1,2,3].map((item) => (

              <div
                key={item}
                className="
                bg-white
                rounded-[32px]
                p-8
                border
                border-gray-100
                shadow-sm
                "
              >

                <div
                  className="
                  h-5
                  w-32
                  rounded-lg
                  bg-gray-100
                  animate-pulse
                  "
                />

                <div
                  className="
                  h-16
                  w-24
                  rounded-xl
                  bg-gray-200
                  animate-pulse
                  mt-6
                  "
                />

              </div>

            ))}

          </div>

        </section>

      </AdminLayout>

    );

  }

  if (error) {

    return (

      <AdminLayout>

        <div
          className="
          text-red-500
          text-lg
          "
        >
          {error}
        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <section>

        {/* HEADER */}
        <div>

          <h1
            className="
            text-4xl
            md:text-5xl
            font-bold
            tracking-tight
            text-gray-950
            "
          >
            Dashboard
          </h1>

          <p
            className="
            text-gray-500
            text-lg
            mt-3
            "
          >
            Platform analytics overview
          </p>

        </div>

        {/* TOP STATS */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mt-10
          "
        >

          <div
            className="
            bg-white
            rounded-[32px]
            p-8
            border
            border-gray-100
            shadow-sm
            "
          >

            <p className="text-gray-500">
              Total Places
            </p>

            <h2
              className="
              text-5xl
              font-bold
              mt-5
              tracking-tight
              "
            >
              {data.totalPlaces}
            </h2>

          </div>

          <div
            className="
            bg-white
            rounded-[32px]
            p-8
            border
            border-gray-100
            shadow-sm
            "
          >

            <p className="text-gray-500">
              Total Reviews
            </p>

            <h2
              className="
              text-5xl
              font-bold
              mt-5
              tracking-tight
              "
            >
              {data.totalReviews}
            </h2>

          </div>

          <div
            className="
            bg-white
            rounded-[32px]
            p-8
            border
            border-gray-100
            shadow-sm
            "
          >

            <p className="text-gray-500">
              Total Users
            </p>

            <h2
              className="
              text-5xl
              font-bold
              mt-5
              tracking-tight
              "
            >
              {data.totalUsers}
            </h2>

          </div>

        </div>

        {/* EXTRA ANALYTICS */}
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          mt-8
          "
        >

          {/* TOP PLACE */}
          <div
            className="
            bg-white
            rounded-[32px]
            p-8
            border
            border-gray-100
            shadow-sm
            "
          >

            <p
              className="
              text-sm
              font-medium
              text-gray-500
              uppercase
              tracking-wide
              "
            >
              Top Rated Place
            </p>

            <h2
              className="
              text-3xl
              md:text-4xl
              font-bold
              mt-5
              tracking-tight
              "
            >
              {data.topRatedPlace?.name || "N/A"}
            </h2>

            <div
              className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-amber-100
              text-amber-700
              px-5
              py-2.5
              text-sm
              font-semibold
              "
            >
              ⭐ {data.topRatedPlace?.averageRating || 0}
            </div>

          </div>

          {/* MOST ACTIVE USER */}
          <div
            className="
            bg-white
            rounded-[32px]
            p-8
            border
            border-gray-100
            shadow-sm
            "
          >

            <p
              className="
              text-sm
              font-medium
              text-gray-500
              uppercase
              tracking-wide
              "
            >
              Most Active User
            </p>

            <h2
              className="
              text-3xl
              md:text-4xl
              font-bold
              mt-5
              tracking-tight
              "
            >
              {data.mostActiveUser?.username || "N/A"}
            </h2>

            <div
              className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-100
              text-blue-700
              px-5
              py-2.5
              text-sm
              font-semibold
              "
            >
              {data.mostActiveReviews} reviews written
            </div>

          </div>

        </div>

      </section>

    </AdminLayout>

  );

}

export default AdminDashboard;