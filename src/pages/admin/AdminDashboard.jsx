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

        <div className="mt-10">
          Loading...
        </div>

      </AdminLayout>

    );

  }



  if (error) {

    return (

      <AdminLayout>

        <div className="mt-10 text-red-500">
          {error}
        </div>

      </AdminLayout>

    );

  }



  return (

    <AdminLayout>

      <h1
        className="
        text-4xl
        font-bold
        "
      >
        Dashboard
      </h1>



      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mt-10
        "
      >

        {/* PLACES */}
        <div
          className="
          bg-white
          rounded-3xl
          p-8
          "
        >

          <h2 className="text-gray-500">
            Total Places
          </h2>

          <p
            className="
            text-5xl
            font-bold
            mt-4
            "
          >
            {data.totalPlaces}
          </p>

        </div>



        {/* REVIEWS */}
        <div
          className="
          bg-white
          rounded-3xl
          p-8
          "
        >

          <h2 className="text-gray-500">
            Total Reviews
          </h2>

          <p
            className="
            text-5xl
            font-bold
            mt-4
            "
          >
            {data.totalReviews}
          </p>

        </div>



        {/* USERS */}
        <div
          className="
          bg-white
          rounded-3xl
          p-8
          "
        >

          <h2 className="text-gray-500">
            Users
          </h2>

          <p
            className="
            text-5xl
            font-bold
            mt-4
            "
          >
            {data.totalUsers}
          </p>

        </div>

        {/* EXTRA ANALYTICS */}
<div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  gap-6
  mt-10
  "
>

  {/* TOP PLACE */}
  <div
    className="
    bg-white
    rounded-3xl
    p-8
    "
  >

    <h2 className="text-gray-500">
      Top Rated Place
    </h2>

    <div className="mt-4">

      <h3
        className="
        text-2xl
        font-bold
        "
      >
        {data.topRatedPlace?.name || "N/A"}
      </h3>

      <p className="mt-2 text-gray-500">

        ⭐
        {" "}
        {data.topRatedPlace?.averageRating || 0}

      </p>

    </div>

  </div>



  {/* MOST ACTIVE USER */}
  <div
    className="
    bg-white
    rounded-3xl
    p-8
    "
  >

    <h2 className="text-gray-500">
      Most Active User
    </h2>

    <div className="mt-4">

      <h3
        className="
        text-2xl
        font-bold
        "
      >
        {data.mostActiveUser?.username || "N/A"}
      </h3>

      <p className="mt-2 text-gray-500">

        {data.mostActiveReviews}
        {" "}
        reviews written

      </p>

    </div>

  </div>

</div>

      </div>

    </AdminLayout>

  );

}

export default AdminDashboard;