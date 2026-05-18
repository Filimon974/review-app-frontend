import MainLayout from "../layouts/MainLayout";
import useFetch from "../hooks/useFetch";
import ReviewCard from "../components/ReviewCard";
import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import {
  FiBookmark,
  FiStar,
  FiEdit,
  FiTrash2,
  FiCamera
} from "react-icons/fi";

import { Link } from "react-router-dom";

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

  const handleDeleteReview =
    async (reviewId) => {

      const confirmDelete =
        confirm(
          "Delete this review?"
        );

      if (!confirmDelete) return;

      try {

        await API.delete(

          `/reviews/${reviewId}`,

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

        alert("Failed to delete review");

      }

    };

  const handleAvatarUpload =
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

  /*
  =========================
  SKELETON LOADING
  =========================
  */

  if (loading) {

    return (

      <MainLayout>

        <section className="mt-10 animate-pulse">

          <div
            className="
            bg-white
            border
            border-gray-100
            rounded-[32px]
            p-8
            shadow-sm
            "
          >

            <div
              className="
              flex
              flex-col
              md:flex-row
              gap-6
              "
            >

              <div
                className="
                w-28
                h-28
                rounded-full
                bg-gray-200
                "
              />

              <div className="flex-1">

                <div
                  className="
                  h-8
                  w-56
                  bg-gray-200
                  rounded-xl
                  "
                />

                <div
                  className="
                  h-5
                  w-72
                  bg-gray-100
                  rounded-xl
                  mt-4
                  "
                />

              </div>

            </div>

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-5
              mt-10
              "
            >

              {[1, 2, 3].map(item => (

                <div
                  key={item}
                  className="
                  h-36
                  rounded-3xl
                  bg-gray-100
                  "
                />

              ))}

            </div>

          </div>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
            mt-12
            "
          >

            {[1, 2, 3].map(item => (

              <div
                key={item}
                className="
                h-[420px]
                rounded-3xl
                bg-gray-100
                "
              />

            ))}

          </div>

        </section>

      </MainLayout>

    );

  }

  if (error) {

    return (

      <MainLayout>

        <div
          className="
          mt-20
          text-center
          text-red-500
          "
        >
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

      <section className="mt-10 pb-16">

        {/* PROFILE HEADER */}
        <div
          className="
          bg-white
          border
          border-gray-100
          rounded-[32px]
          p-6
          md:p-10
          shadow-sm
          "
        >

          <div
            className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            gap-8
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

                onError={(e) => {
                  e.target.src =
                    "https://i.pravatar.cc/300";
                }}

                className="
                w-32
                h-32
                rounded-full
                object-cover
                border-4
                border-white
                shadow-lg
                "
              />

              <label
                className="
                absolute
                bottom-1
                right-1
                w-11
                h-11
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                cursor-pointer
                hover:scale-105
                transition
                shadow-lg
                "
              >

                {
                  uploading
                    ? "..."
                    : <FiCamera />
                }

                <input

                  type="file"

                  accept="image/*"

                  hidden

                  onChange={
                    handleAvatarUpload
                  }

                />

              </label>

            </div>

            
            <div className="flex-1">

              

              <h1
                className="
                text-4xl
                md:text-5xl
                font-black
                tracking-tight
                text-gray-900
                "
              >
                {user.name}
              </h1>

              <p
                className="
                text-gray-500
                mt-3
                text-lg
                "
              >
                {user.email}
              </p>

            </div>

            {/* BUTTON */}
            <button
              className="
              flex
              items-center
              justify-center
              gap-2
              bg-black
              hover:bg-gray-900
              text-white
              px-6
              py-4
              rounded-2xl
              font-semibold
              transition
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

            {/* CARD */}
            <div
              className="
              rounded-3xl
              border
              border-gray-100
              bg-gray-50
              p-6
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
                text-gray-500
                font-medium
                "
              >

                <FiStar />

                Reviews

              </div>

              <h2
                className="
                text-5xl
                font-black
                mt-5
                text-gray-900
                "
              >
                {stats.reviewsCount}
              </h2>

            </div>

            <div
              className="
              rounded-3xl
              border
              border-gray-100
              bg-gray-50
              p-6
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
                text-gray-500
                font-medium
                "
              >

                <FiBookmark />

                Saved Places

              </div>

              <h2
                className="
                text-5xl
                font-black
                mt-5
                text-gray-900
                "
              >
                {stats.savedCount}
              </h2>

            </div>

            <div
              className="
              rounded-3xl
              border
              border-gray-100
              bg-gray-50
              p-6
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
                text-gray-500
                font-medium
                "
              >
                ❤️ Likes Received
              </div>

              <h2
                className="
                text-5xl
                font-black
                mt-5
                text-gray-900
                "
              >
                {stats.likesReceived}
              </h2>

            </div>

          </div>

        </div>

        {/* REVIEWS */}
        <section className="mt-16">

          <div
            className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            "
          >

            <div>

              <h2
                className="
                text-3xl
                md:text-4xl
                font-black
                text-gray-900
                "
              >
                Your Reviews
              </h2>

              <p
                className="
                text-gray-500
                mt-2
                "
              >
                Manage and edit your published reviews
              </p>

            </div>

          </div>

          {
            reviews.length === 0 ? (

              <div
                className="
                mt-10
                bg-white
                border
                border-dashed
                border-gray-200
                rounded-3xl
                p-14
                text-center
                "
              >

                <h3
                  className="
                  text-2xl
                  font-bold
                  text-gray-900
                  "
                >
                  No reviews yet
                </h3>

                <p
                  className="
                  text-gray-500
                  mt-3
                  "
                >
                  Start reviewing amazing places.
                </p>

              </div>

            ) : (

              <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-7
                mt-10
                "
              >

                {reviews.map(review => (

                  <div

                    key={review._id}

                    className="
                    bg-white
                    rounded-[28px]
                    border
                    border-gray-100
                    p-3
                    shadow-sm
                    hover:shadow-lg
                    transition
                    "
                  >

                    <ReviewCard
                      review={review}
                    />

                    {/* ACTIONS */}
                    <div
                      className="
                      mt-5
                      flex
                      gap-3
                      "
                    >

                      <Link

                        to={`/reviews/edit/${review._id}`}

                        className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-2
                        border
                        border-gray-200
                        py-3.5
                        rounded-2xl
                        font-semibold
                        hover:bg-black
                        hover:text-white
                        hover:border-black
                        transition
                        "
                      >

                        <FiEdit />

                        Edit

                      </Link>

                      <button

                        onClick={() =>
                          handleDeleteReview(
                            review._id
                          )
                        }

                        className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-red-500
                        text-white
                        py-3.5
                        rounded-2xl
                        font-semibold
                        hover:bg-red-600
                        transition
                        "
                      >

                        <FiTrash2 />

                        Delete

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )
          }

        </section>

      </section>

    </MainLayout>

  );

}

export default Profile;