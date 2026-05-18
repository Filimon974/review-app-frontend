import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import useFetch from "../../hooks/useFetch";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function AdminPlaces() {

  const { token } = useAuth();

  const {
    data: places,
    loading,
    error
  } = useFetch("/places");

  /*
  =========================
  FORM STATE
  =========================
  */

  const [name, setName] =
    useState("");

  const [category, setCategory] =
    useState("restaurant");

  const [description, setDescription] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [contactInfo, setContactInfo] =
    useState("");

  const [photo, setPhoto] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  /*
  =========================
  CLOUDINARY
  =========================
  */

  const CLOUD_NAME =
    import.meta.env
      .VITE_CLOUDINARY_CLOUD_NAME;

  const UPLOAD_PRESET =
    import.meta.env
      .VITE_CLOUDINARY_UPLOAD_PRESET;

  /*
  =========================
  IMAGE UPLOAD
  =========================
  */

  const handleImageUpload =
    async (e) => {

      try {

        const file =
          e.target.files[0];

        if (!file) return;

        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "upload_preset",
          UPLOAD_PRESET
        );

        const response =
          await fetch(

            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

            {
              method: "POST",
              body: formData
            }

          );

        const data =
          await response.json();

        setPhoto(
          data.secure_url
        );

      } catch (error) {

        console.log(error);

      } finally {

        setUploading(false);

      }

    };

  /*
  =========================
  CREATE PLACE
  =========================
  */

  const handleCreatePlace =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(

          "/places",

          {
            name,
            category,
            description,
            location,
            contactInfo,
            photos: [photo]
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert("Place created");

        window.location.reload();

      } catch (error) {

        console.log(error);

        alert("Failed");

      }

    };

  /*
  =========================
  DELETE PLACE
  =========================
  */

  const handleDelete =
    async (id) => {

      const confirmDelete =
        confirm(
          "Delete place?"
        );

      if (!confirmDelete) return;

      try {

        await API.delete(

          `/places/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        window.location.reload();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      <div className="mt-10">

        {/* HEADER */}
        <div
          className="
          flex
          items-center
          justify-between
          "
        >

          <div>

            <h1
              className="
              text-4xl
              font-bold
              "
            >
              Admin Places
            </h1>

            <p
              className="
              text-gray-500
              mt-2
              "
            >
              Manage platform places
            </p>

          </div>

        </div>

        {/* LOADING */}
        {loading && (

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            mt-10
            "
          >

            {[...Array(4)].map((_, i) => (

              <div
                key={i}
                className="
                animate-pulse
                bg-white
                rounded-3xl
                overflow-hidden
                "
              >

                <div
                  className="
                  h-56
                  bg-gray-200
                  "
                />

                <div className="p-5">

                  <div
                    className="
                    h-6
                    w-40
                    bg-gray-200
                    rounded-full
                    "
                  />

                  <div
                    className="
                    h-4
                    w-24
                    bg-gray-100
                    rounded-full
                    mt-4
                    "
                  />

                </div>

              </div>

            ))}

          </div>

        )}

        {/* ERROR */}
        {error && (

          <div
            className="
            mt-10
            bg-red-50
            border
            border-red-200
            text-red-500
            rounded-3xl
            p-6
            "
          >
            {error}
          </div>

        )}

        {/* CREATE FORM */}
        <form
          onSubmit={handleCreatePlace}
          className="
          bg-white
          rounded-[32px]
          p-6
          md:p-8
          mt-10
          border
          border-gray-100
          shadow-sm
          space-y-5
          "
        >

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
            "
          >

            <input
              type="text"
              placeholder="Place name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
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
            />

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

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="
            w-full
            bg-gray-50
            border
            border-gray-200
            rounded-2xl
            px-5
            py-4
            h-36
            outline-none
            resize-none
            focus:border-orange-500
            focus:bg-white
            transition
            "
          />

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
            "
          >

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
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
            />

            <input
              type="text"
              placeholder="Contact info"
              value={contactInfo}
              onChange={(e) =>
                setContactInfo(
                  e.target.value
                )
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
            />

          </div>

          {/* IMAGE */}
          <div>

            <label
              className="
              block
              text-lg
              font-semibold
              mb-4
              "
            >
              Place Image
            </label>

            <label
              className="
              flex
              flex-col
              items-center
              justify-center
              border-2
              border-dashed
              border-gray-200
              rounded-[28px]
              p-10
              cursor-pointer
              bg-gray-50
              hover:bg-orange-50
              hover:border-orange-300
              transition
              "
            >

              <div
                className="
                text-5xl
                "
              >
                📷
              </div>

              <p
                className="
                mt-4
                text-lg
                font-semibold
                text-gray-800
                "
              >
                {
                  uploading
                    ? "Uploading image..."
                    : "Click to upload image"
                }
              </p>

              <p
                className="
                text-sm
                text-gray-500
                mt-2
                "
              >
                PNG, JPG, WEBP supported
              </p>

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />

            </label>

            {photo && (

              <div className="mt-6">

                <img
                  src={photo}
                  alt="Preview"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/1200x800?text=Image";
                  }}
                  className="
                  w-full
                  h-72
                  object-cover
                  rounded-[28px]
                  "
                />

              </div>

            )}

          </div>

          <button
            className="
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-8
            py-4
            rounded-full
            font-semibold
            transition
            "
          >

            Create Place

          </button>

        </form>

        {/* PLACE LIST */}
        <div
          className="
          mt-14
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          "
        >

          {places?.map(place => (

            <div
              key={place._id}
              className="
              bg-white
              rounded-[30px]
              overflow-hidden
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              transition
              duration-300
              "
            >

              <img
                src={
                  place.photos?.[0] ||
                  "https://placehold.co/1200x800?text=Place"
                }
                alt={place.name}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/1200x800?text=Place";
                }}
                className="
                w-full
                h-64
                object-cover
                "
              />

              <div className="p-6">

                <h2
                  className="
                  text-2xl
                  font-bold
                  text-gray-900
                  "
                >
                  {place.name}
                </h2>

                <p
                  className="
                  text-gray-500
                  mt-2
                  "
                >
                  {place.location}
                </p>

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  mt-6
                  "
                >

                  {/* EDIT */}
                  <Link
                    to={`/admin/places/edit/${place._id}`}
                    className="
                    bg-black
                    hover:bg-gray-800
                    text-white
                    px-5
                    py-3
                    rounded-full
                    font-medium
                    transition
                    "
                  >
                    Edit
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(
                        place._id
                      )
                    }
                    className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-5
                    py-3
                    rounded-full
                    font-medium
                    transition
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </AdminLayout>

  );

}

export default AdminPlaces;