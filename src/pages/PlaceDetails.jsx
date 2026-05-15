import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { useAuth }from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

import MainLayout from "../layouts/MainLayout";
import ReviewCard from "../components/ReviewCard";
import {FiMapPin,FiStar,FiBookmark} from "react-icons/fi";

function PlaceDetails() {

  const { id } = useParams();
  const { token } = useAuth();
  const [saving, setSaving] = useState(false);
  const [sortBy, setSortBy] = useState("latest");

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
        return new Date(b.createdAt)
          - new Date(a.createdAt);
      }

      if (sortBy === "highest") {
        return b.rating - a.rating;
      }

      if (sortBy === "lowest") {
        return a.rating - b.rating;
      }

      if (sortBy === "popular") {
        return b.likesCount
          - a.likesCount;
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

    alert("Place saved!");

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  } finally {

    setSaving(false);

  }

};

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }



  if (error) {
    return (
      <div className="p-10 text-red-500">
        {error}
      </div>
    );
  }



  return (

    <MainLayout>

      <div className="mt-10">

        {/* IMAGE */}
        <img
          src={
            place.photos?.[0] ||
            "https://via.placeholder.com/800"
          }
          alt={place.name}
          className="
          w-full
          h-[60vh]
          object-cover
          rounded-3xl
          "
        />



        {/* CONTENT */}
        <div
          className="
          mt-8
          flex
          flex-col
          lg:flex-row
          gap-10
          "
        >

          {/* LEFT */}
          <div className="flex-1">

            {/* TITLE */}
            <div
              className="
              flex
              items-center
              justify-between
              "
            >

              <h1
                className="
                text-4xl
                md:text-5xl
                font-bold
                "
              >
                {place.name}
              </h1>



              <button
                onClick={handleSave}
                disabled={saving}
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

                <FiBookmark />

                {saving ? "Saving..." : "Save"}

              </button>

            </div>



            {/* LOCATION */}
            <div
              className="
              flex
              items-center
              gap-2
              text-gray-500
              mt-4
              "
            >

              <FiMapPin />

              {place.location}

            </div>



            {/* RATING */}
            <div
              className="
              flex
              items-center
              gap-2
              mt-4
              "
            >

              <FiStar className="text-yellow-500" />

              <span className="font-semibold">
                {place.averageRating?.toFixed(1)}
              </span>

              <span className="text-gray-500">
                ({place.totalReviews} reviews)
              </span>

            </div>



            {/* DESCRIPTION */}
            <p
              className="
              mt-8
              text-gray-700
              leading-relaxed
              text-lg
              "
            >
              {place.description}
            </p>

            {/* RATING BREAKDOWN */}

<div className="mt-10">

  <h2
    className="
    text-2xl
    font-bold
    mb-6
    "
  >
    Ratings Overview
  </h2>



  <div
    className="
    bg-gray-50
    rounded-3xl
    p-6
    "
  >

    <div
      className="
      flex
      items-center
      gap-4
      "
    >

      <div
        className="
        text-5xl
        font-bold
        "
      >
        {place.averageRating?.toFixed(1)}
      </div>

      <div>

        <div
          className="
          flex
          items-center
          gap-1
          text-yellow-500
          "
        >
          ★★★★★
        </div>

        <p className="text-gray-500">
          {place.totalReviews} reviews
        </p>

      </div>

    </div>

  </div>

</div>

{/* REVIEW PHOTOS */}

{
  reviews?.length > 0 && (

    <div className="mt-12">

      <h2
        className="
        text-2xl
        font-bold
        mb-6
        "
      >
        Review Gallery
      </h2>



      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-4
        "
      >

        {reviews
          .flatMap(
            review => review.photos || []
          )
          .slice(0, 8)
          .map((photo, index) => (

            <img

              key={index}

              src={photo}

              alt="review"

              className="
              w-full
              h-40
              object-cover
              rounded-2xl
              "

            />

          ))}

      </div>

    </div>

  )
}

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

    <h2
      className="
      text-3xl
      font-bold
      "
    >
      Reviews
    </h2>



    {/* SORT */}
    <select

      value={sortBy}

      onChange={(e) =>
        setSortBy(e.target.value)
      }

      className="
      border
      rounded-2xl
      px-4
      py-3
      outline-none
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

      <div className="mt-10">
        Loading reviews...
      </div>

    ) : sortedReviews.length === 0 ? (

      <div
        className="
        mt-10
        text-gray-500
        "
      >
        No reviews yet.
      </div>

    ) : (

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
        mt-10
        "
      >

        {sortedReviews.map(review => (

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

        </div>

      </div>

    </MainLayout>

  );

}

export default PlaceDetails;