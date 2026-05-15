import MainLayout from "../layouts/MainLayout";
import useFetch from "../hooks/useFetch";
import ReviewCard from "../components/ReviewCard";
import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import {
  FiBookmark,
  FiStar,
  FiEdit
} from "react-icons/fi";



function Profile() {

  const {
    data,
    loading,
    error
  } = useFetch("/users/me");

  const { token } = useAuth();

  const [uploading, setUploading] =
    useState(false);
  const CLOUD_NAME =
  import.meta.env
    .VITE_CLOUDINARY_CLOUD_NAME;

const UPLOAD_PRESET =
  import.meta.env
    .VITE_CLOUDINARY_UPLOAD_PRESET;


    const handleAvatarUpload =
  async (e) => {

    try {

      const file =
        e.target.files[0];

      if (!file) return;

      setUploading(true);



      /*
      ==========================
      CLOUDINARY UPLOAD
      ==========================
      */

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



      const cloudinaryRes =
        await fetch(

          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

          {
            method: "POST",
            body: formData
          }

        );



      const cloudinaryData =
        await cloudinaryRes.json();



      /*
      ==========================
      SAVE TO DATABASE
      ==========================
      */

      await API.put(

        "/users/avatar",

        {
          avatar:
            cloudinaryData.secure_url
        },

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

      alert("Upload failed");

    } finally {

      setUploading(false);

    }

  };


  if (loading) {
    
    return (
      <MainLayout>
        <div className="mt-20 text-center">
          Loading profile...
        </div>
      </MainLayout>
    );

  }



  if (error) {

    return (
      <MainLayout>
        <div className="mt-20 text-center text-red-500">
          {error}
        </div>
      </MainLayout>
    );

  }



  const {
    user,
    stats,
    reviews
  } = data;



  return (

    <MainLayout>

      <section className="mt-10">

        {/* PROFILE HEADER */}
        <div
          className="
          bg-white
          rounded-3xl
          p-8
          "
        >

          <div
            className="
            flex
            flex-col
            md:flex-row
            md:items-center
            gap-6
            "
          >

            {/* AVATAR */}
            <div className="relative">
                <img

              src={
                user.avatar ||
                "https://i.pravatar.cc/300"
              }

              alt={user.name}

              className="
              w-28
              h-28
              rounded-full
              object-cover
              "
            />

            <label
  className="
  absolute
  bottom-0
  right-0
  bg-black
  text-white
  p-2
  rounded-full
  cursor-pointer
  "
>
    {uploading ? "..." : "📷"}
  <input

    type="file"

    accept="image/*"

    hidden

    onChange={handleAvatarUpload}

  />

</label>

            </div>
            



            {/* INFO */}
            <div className="flex-1">

              <h1
                className="
                text-4xl
                font-bold
                "
              >
                {user.name}
              </h1>

              <p
                className="
                text-gray-500
                mt-2
                "
              >
                {user.email}
              </p>

            </div>



            {/* EDIT BUTTON */}
            <button
              className="
              flex
              items-center
              gap-2
              bg-black
              text-white
              px-5
              py-3
              rounded-full
              "
            >

              <FiEdit />

              Edit Profile

            </button>

          </div>



          {/* STATS */}
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            mt-10
            "
          >

            {/* REVIEWS */}
            <div
              className="
              bg-gray-50
              rounded-2xl
              p-6
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
                text-gray-500
                "
              >

                <FiStar />

                Reviews

              </div>

              <h2
                className="
                text-4xl
                font-bold
                mt-3
                "
              >
                {stats.reviewsCount}
              </h2>

            </div>



            {/* SAVED */}
            <div
              className="
              bg-gray-50
              rounded-2xl
              p-6
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
                text-gray-500
                "
              >

                <FiBookmark />

                Saved

              </div>

              <h2
                className="
                text-4xl
                font-bold
                mt-3
                "
              >
                {stats.savedCount}
              </h2>

            </div>



            {/* LIKES */}
            <div
              className="
              bg-gray-50
              rounded-2xl
              p-6
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
                text-gray-500
                "
              >

                ❤️ Likes Received

              </div>

              <h2
                className="
                text-4xl
                font-bold
                mt-3
                "
              >
                {stats.likesReceived}
              </h2>

            </div>

          </div>

        </div>



        {/* USER REVIEWS */}
        <section className="mt-16">

          <h2
            className="
            text-3xl
            font-bold
            "
          >
            Your Reviews
          </h2>



          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
            mt-8
            "
          >

            {reviews.map(review => (

              <ReviewCard
                key={review._id}
                review={review}
              />

            ))}

          </div>

        </section>

      </section>

    </MainLayout>

  );

}

export default Profile;