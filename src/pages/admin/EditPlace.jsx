import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import API from "../../services/api";

import { useAuth }
from "../../context/AuthContext";

function EditPlace() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [category, setCategory] =
    useState("restaurant");

  const [formData, setFormData] =
    useState({

      name: "",
      category: "",
      description: "",
      location: "",
      photos: []

    });



  /*
  =========================
  FETCH PLACE
  =========================
  */

  useEffect(() => {

    const fetchPlace = async () => {

      try {

        const res = await API.get(
          `/places/${id}`
        );

        setFormData(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchPlace();

  }, [id]);




  /*
  =========================
  INPUT CHANGE
  =========================
  */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };




  /*
  =========================
  UPDATE PLACE
  =========================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await API.put(

          `/places/${id}`,

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert("Place updated");

        navigate("/admin/places");

      } catch (error) {

        console.log(error);

      }

    };



  /*
  =========================
  SKELETON LOADING
  =========================
  */

  if (loading) {

    return (

      <MainLayout>

        <div
          className="
          max-w-4xl
          mx-auto
          mt-10
          bg-white
          rounded-[32px]
          border
          border-gray-100
          shadow-sm
          p-8
          animate-pulse
          "
        >

          <div
            className="
            h-10
            w-52
            bg-gray-200
            rounded-xl
            "
          />

          <div className="mt-8 space-y-5">

            <div
              className="
              h-14
              bg-gray-100
              rounded-2xl
              "
            />

            <div
              className="
              h-14
              bg-gray-100
              rounded-2xl
              "
            />

            <div
              className="
              h-14
              bg-gray-100
              rounded-2xl
              "
            />

            <div
              className="
              h-40
              bg-gray-100
              rounded-2xl
              "
            />

            <div
              className="
              h-14
              w-40
              bg-gray-200
              rounded-full
              "
            />

          </div>

        </div>

      </MainLayout>

    );

  }



  return (

    <MainLayout>

      <div
        className="
        max-w-4xl
        mx-auto
        mt-10
        mb-16
        "
      >

        {/* HEADER */}
        <div className="mb-8">

          <p
            className="
            text-sm
            font-medium
            text-orange-500
            uppercase
            tracking-wide
            "
          >
            Admin
          </p>

          <h1
            className="
            text-4xl
            md:text-5xl
            font-bold
            text-gray-900
            mt-2
            "
          >
            Edit Place
          </h1>

          <p
            className="
            text-gray-500
            mt-3
            text-lg
            "
          >
            Update place information and details.
          </p>

        </div>



        {/* FORM CARD */}
        <div
          className="
          bg-white
          border
          border-gray-100
          shadow-sm
          rounded-[32px]
          overflow-hidden
          "
        >

          {/* IMAGE */}
          <div
            className="
            h-[260px]
            md:h-[340px]
            bg-gray-100
            overflow-hidden
            "
          >

            <img
              src={
                formData.photos?.[0] ||
                "https://placehold.co/1200x600?text=No+Image"
              }
              alt={formData.name}
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/1200x600?text=Image";
              }}
              className="
              w-full
              h-full
              object-cover
              "
            />

          </div>



          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
            p-6
            md:p-10
            space-y-6
            "
          >

            {/* NAME */}
            <div>

              <label
                className="
                text-sm
                font-semibold
                text-gray-700
                block
                mb-2
                "
              >
                Place Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Place name"
                value={formData.name}
                onChange={handleChange}
                className="
                w-full
                bg-gray-50
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-100
                transition
                "
              />

            </div>



            {/* CATEGORY */}
            <div>

              <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
              w-full
              bg-gray-50
              border
              border-gray-200
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-orange-500
              focus:bg-white
              transition
              "
            >

              <option value="restaurant">
                Restaurant
              </option>

              <option value="hotel">
                Hotel
              </option>

            </select>

          </div>



            {/* LOCATION */}
            <div>

              <label
                className="
                text-sm
                font-semibold
                text-gray-700
                block
                mb-2
                "
              >
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="
                w-full
                bg-gray-50
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-100
                transition
                "
              />

            </div>



            {/* DESCRIPTION */}
            <div>

              <label
                className="
                text-sm
                font-semibold
                text-gray-700
                block
                mb-2
                "
              >
                Description
              </label>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="
                w-full
                bg-gray-50
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                outline-none
                resize-none
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-100
                transition
                "
              />

            </div>



            {/* BUTTONS */}
            <div
              className="
              flex
              flex-col
              sm:flex-row
              gap-4
              pt-2
              "
            >

              <button
                type="submit"
                className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                font-semibold
                px-8
                py-4
                rounded-full
                transition
                shadow-sm
                "
              >
                Save Changes
              </button>



              <button
                type="button"
                onClick={() =>
                  navigate("/admin/places")
                }
                className="
                bg-gray-100
                hover:bg-gray-200
                text-gray-700
                font-semibold
                px-8
                py-4
                rounded-full
                transition
                "
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </MainLayout>

  );

}

export default EditPlace;