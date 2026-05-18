import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

import MainLayout from "../layouts/MainLayout";
import ReviewCard from "../components/ReviewCard";

import {
  FiMapPin,
  FiStar,
  FiBookmark
} from "react-icons/fi";

function PlaceDetails() {

  const { id } = useParams();

  const { token } = useAuth();

  const [saving, setSaving] =
    useState(false);

  const [sortBy, setSortBy] =
    useState("latest");

  const [saved, setSaved] =
    useState(false);

  const {
    data: place,
    loading,
    error
  } = useFetch(`/places/${id}`);

  const {
    data: reviews,
    loading: reviewsLoading
  } = useFetch(
    `/reviews/place/${id}`
  );



  const sortedReviews =
    [...(reviews || [])].sort(
      (a, b) => {

        if (sortBy === "latest") {
          return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
          );
        }

        if (sortBy === "highest") {
          return b.rating - a.rating;
        }

        if (sortBy === "lowest") {
          return a.rating - b.rating;
        }

        if (sortBy === "popular") {
          return (
            b.likesCount -
            a.likesCount
          );
        }

        return 0;

      }
    );



  const handleSave = async () => {

    try {

      if (!token) {

        alert("Login required");

        return;

      }

      setSaving(true);

      await API.put(

        `/users/save/${id}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      setSaved(!saved);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setSaving(false);

    }

  };



  /*
  =========================
  LOADING SKELETON
  =========================
  */

  if (loading) {

    return (

      <MainLayout>

        <div className="animate-pulse">

          <div
            className="
            w-full
            h-[60vh]
            rounded-[32px]
            bg-gray-200
            "
          />



          <div
            className="
            mt-10
            grid
            lg:grid-cols-[1fr_320px]
            gap-8
            "
          >

            <div>

              <div
                className="
                h-14
                w-2/3
                rounded-2xl
                bg-gray-200
                "
              />



              <div
                className="
                mt-5
                h-6
                w-1/3
                rounded-xl
                bg-gray-200
                "
              />



              <div
                className="
                mt-4
                h-6
                w-40
                rounded-xl
                bg-gray-200
                "
              />



              <div className="mt-8 space-y-3">

                <div className="h-4 bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded-xl w-5/6" />

              </div>

            </div>



            <div
              className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              border
              border-gray-100
              "
            >

              <div
                className="
                h-10
                w-32
                rounded-xl
                bg-gray-200
                "
              />



              <div className="mt-6 space-y-4">

                <div className="h-4 bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded-xl w-2/3" />

              </div>

            </div>

          </div>



          <div
            className="
            mt-16
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
            "
          >

            {[1,2,3].map((item) => (

              <div
                key={item}
                className="
                bg-white
                border
                border-gray-100
                rounded-[28px]
                p-5
                shadow-sm
                "
              >

                <div
                  className="
                  h-52
                  rounded-2xl
                  bg-gray-200
                  "
                />



                <div
                  className="
                  mt-5
                  h-5
                  w-2/3
                  rounded-xl
                  bg-gray-200
                  "
                />



                <div
                  className="
                  mt-3
                  h-4
                  rounded-xl
                  bg-gray-200
                  "
                />



                <div
                  className="
                  mt-2
                  h-4
                  w-5/6
                  rounded-xl
                  bg-gray-200
                  "
                />

              </div>

            ))}

          </div>

        </div>

      </MainLayout>

    );

  }



  /*
  =========================
  ERROR STATE
  =========================
  */

  if (error) {

    return (

      <MainLayout>

        <div
          className="
          min-h-[60vh]
          flex
          items-center
          justify-center
          "
        >

          <div
            className="
            bg-white
            border
            border-red-100
            text-red-500
            rounded-[28px]
            px-8
            py-6
            shadow-sm
            "
          >
            {error}
          </div>

        </div>

      </MainLayout>

    );

  }



  return (

    <MainLayout>

      <section className="mt-8 md:mt-10">

        {/* HERO IMAGE */}
        <div className="relative overflow-hidden rounded-[32px]">

          <img
            src={
              place.photos?.[0] ||
              "https://via.placeholder.com/1400x700"
            }
            alt={place.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/1400x700";
            }}
            className="
            w-50%
            h-[90vh]
            md:h-[65vh]
            object-cover
            "
          />



          <div
            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            via-black/10
            to-transparent
            "
          />



          <div
            className="
            absolute
            bottom-0
            left-0
            w-full
            p-6
            md:p-10
            "
          >

            <div
              className="
              flex
              flex-col
              md:flex-row
              md:items-end
              md:justify-between
              gap-6
              "
            >

              <div>

                <h1
                  className="
                  text-4xl
                  md:text-6xl
                  font-black
                  text-white
                  tracking-tight
                  "
                >
                  {place.name}
                </h1>



                <div
                  className="
                  flex
                  flex-wrap
                  items-center
                  gap-5
                  mt-5
                  text-white/90
                  "
                >

                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    "
                  >
                    <FiMapPin />
                    {place.location}
                  </div>



                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    "
                  >
                    <FiStar className="text-amber-400 fill-amber-400" />

                    <span className="font-semibold">
                      {place.averageRating?.toFixed(1)}
                    </span>

                    <span className="text-white/70">
                      ({place.totalReviews} reviews)
                    </span>

                  </div>

                </div>

              </div>



              <button
                onClick={handleSave}
                disabled={saving}
                className={`
                flex
                items-center
                justify-center
                gap-2
                px-6
                py-4
                rounded-2xl
                font-semibold
                backdrop-blur-xl
                border
                transition-all
                duration-300

                ${
                  saved
                    ? `
                    bg-emerald-500
                    border-emerald-400
                    text-white
                    `
                    : `
                    bg-white/10
                    border-white/20
                    text-white
                    hover:bg-white
                    hover:text-black
                    `
                }
                `}
              >

                <FiBookmark />

                {
                  saving
                    ? "Saving..."
                    : saved
                    ? "Saved"
                    : "Save Place"
                }

              </button>

            </div>

          </div>

        </div>



        {/* CONTENT */}
        <div
          className="
          mt-10
          grid
          lg:grid-cols-[1fr_340px]
          gap-8
          "
        >

          {/* LEFT SIDE */}
          <div>

            {/* DESCRIPTION */}
            <div
              className="
              bg-white
              rounded-[32px]
              border
              border-gray-100
              shadow-sm
              p-7
              md:p-9
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                text-gray-900
                "
              >
                About this place
              </h2>



              <p
                className="
                mt-5
                text-gray-600
                leading-8
                text-[17px]
                "
              >
                {place.description}
              </p>

            </div>



            {/* REVIEWS */}
            <section className="mt-10">

              <div
                className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
                "
              >

                <div>

                  <h2
                    className="
                    text-3xl
                    font-black
                    text-gray-900
                    "
                  >
                    Reviews
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Real experiences from users
                  </p>

                </div>



                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  px-5
                  py-3
                  outline-none
                  text-sm
                  font-medium
                  shadow-sm
                  "
                >

                  <option value="latest">
                    Latest
                  </option>

                  <option value="highest">
                    Highest Rated
                  </option>

                  <option value="lowest">
                    Lowest Rated
                  </option>

                  <option value="popular">
                    Most Popular
                  </option>

                </select>

              </div>



              {
                reviewsLoading ? (

                  <div
                    className="
                    mt-8
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                    "
                  >

                    {[1,2,3].map((item) => (

                      <div
                        key={item}
                        className="
                        animate-pulse
                        bg-white
                        rounded-[28px]
                        border
                        border-gray-100
                        shadow-sm
                        p-5
                        "
                      >

                        <div
                          className="
                          h-52
                          bg-gray-200
                          rounded-2xl
                          "
                        />



                        <div
                          className="
                          mt-5
                          h-5
                          w-1/2
                          bg-gray-200
                          rounded-xl
                          "
                        />



                        <div
                          className="
                          mt-3
                          h-4
                          bg-gray-200
                          rounded-xl
                          "
                        />



                        <div
                          className="
                          mt-2
                          h-4
                          w-5/6
                          bg-gray-200
                          rounded-xl
                          "
                        />

                      </div>

                    ))}

                  </div>

                ) : sortedReviews.length === 0 ? (

                  <div
                    className="
                    mt-8
                    bg-white
                    border
                    border-dashed
                    border-gray-200
                    rounded-[28px]
                    p-12
                    text-center
                    "
                  >

                    <h3
                      className="
                      text-xl
                      font-bold
                      text-gray-800
                      "
                    >
                      No reviews yet
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Be the first person to share an experience.
                    </p>

                  </div>

                ) : (

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

                    {sortedReviews.map((review) => (

                      <ReviewCard
                        key={review._id}
                        review={review}
                      />

                    ))}

                  </div>

                )
              }

            </section>

          </div>



          {/* RIGHT SIDE */}
          <div
            className="
            bg-white
            border
            border-gray-100
            rounded-[32px]
            shadow-sm
            p-7
            h-fit
            sticky
            top-24
            "
          >

            <h3
              className="
              text-2xl
              font-bold
              text-gray-900
              "
            >
              Ratings Overview
            </h3>



            <div
              className="
              mt-8
              flex
              items-center
              gap-5
              "
            >

              <div
                className="
                text-6xl
                font-black
                text-gray-900
                leading-none
                "
              >
                {place.averageRating?.toFixed(1)}
              </div>



              <div>

                <div
                  className="
                  text-amber-400
                  text-xl
                  "
                >
                  ★★★★★
                </div>

                <p className="text-gray-500 mt-2">
                  Based on {place.totalReviews} reviews
                </p>

              </div>

            </div>



            <div className="mt-8 space-y-4">

              {[5,4,3,2,1].map((star) => (

                <div
                  key={star}
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >

                  <span
                    className="
                    text-sm
                    font-semibold
                    w-3
                    "
                  >
                    {star}
                  </span>



                  <div
                    className="
                    flex-1
                    h-2.5
                    rounded-full
                    bg-gray-100
                    overflow-hidden
                    "
                  >

                    <div
                      className="
                      h-full
                      rounded-full
                      bg-amber-400
                      "
                      style={{
                        width: `${Math.max(
                          15,
                          place.averageRating * 20
                        )}%`
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </MainLayout>

  );

}

export default PlaceDetails;