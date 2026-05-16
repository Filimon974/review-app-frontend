import AdminLayout from "../../layouts/AdminLayout";

function AdminDashboard() {

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

          <p className="text-5xl font-bold mt-4">
            0
          </p>
        </div>

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

          <p className="text-5xl font-bold mt-4">
            0
          </p>
        </div>

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

          <p className="text-5xl font-bold mt-4">
            0
          </p>
        </div>

      </div>

    </AdminLayout>

  );

}

export default AdminDashboard;