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

      </div>

    </AdminLayout>

  );

}

export default AdminDashboard;