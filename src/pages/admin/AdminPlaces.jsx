import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
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

    <MainLayout>

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



        {/* CREATE FORM */}
        <form
          onSubmit={handleCreatePlace}
          className="
          bg-white
          rounded-3xl
          p-8
          mt-10
          space-y-5
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
            border
            rounded-2xl
            p-4
            "
          />



          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="
            w-full
            border
            rounded-2xl
            p-4
            "
          >

            <option value="restaurant">
              Restaurant
            </option>

            <option value="hotel">
              Hotel
            </option>

          </select>



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
            border
            rounded-2xl
            p-4
            h-32
            "
          />



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
            border
            rounded-2xl
            p-4
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
            border
            rounded-2xl
            p-4
            "
          />



          {/* IMAGE */}
          <div>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageUpload
              }
            />

            {uploading && (
              <p className="mt-2">
                Uploading...
              </p>
            )}

            {photo && (

              <img
                src={photo}
                alt="Preview"
                className="
                w-40
                h-40
                object-cover
                rounded-2xl
                mt-4
                "
              />

            )}

          </div>



          <button
            className="
            bg-black
            text-white
            px-6
            py-4
            rounded-full
            "
          >

            Create Place

          </button>

        </form>

            


        {/* PLACE LIST */}
        <div
          className="
          mt-12
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
              rounded-3xl
              overflow-hidden
              "
            >

              <img
                src={place.photos?.[0]}
                alt={place.name}
                className="
                w-full
                h-56
                object-cover
                "
              />



              <div className="p-5">

                <h2
                  className="
                  text-2xl
                  font-bold
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
  gap-3
  mt-5
  "
>

  {/* EDIT */}
  <Link
    to={`/admin/places/edit/${place._id}`}
    className="
    bg-black
    text-white
    px-4
    py-2
    rounded-full
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
    text-white
    px-4
    py-2
    rounded-full
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

    </MainLayout>

  );

}

export default AdminPlaces;