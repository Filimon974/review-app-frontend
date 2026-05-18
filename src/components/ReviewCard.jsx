import {
  FiHeart,
  FiMapPin,
  FiStar
} from "react-icons/fi";

import { useState } from "react";

import API from "../services/api";

import { useAuth }
from "../context/AuthContext";

import { Link }
from "react-router-dom";

function ReviewCard({ review }) {

  const { token } = useAuth();

  const [likes, setLikes] = useState(
    review.likes?.length || 0
  );

  const [liked, setLiked] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleLike = async (e) => {

    e.preventDefault();

    e.stopPropagation();

    try {

      setLoading(true);

      if (!token) {

        alert("Login required");

        return;

      }

      await API.put(

        `/reviews/like/${review._id}`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      if (liked) {

        setLikes(prev => prev - 1);

      } else {

        setLikes(prev => prev + 1);

      }

      setLiked(!liked);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <Link
      to={`/reviews/${review._id}`}
      className="
      group
      bg-white
      rounded-[32px]
      overflow-hidden
      border
      border-gray-100
      shadow-sm
      hover:shadow-2xl
      hover:-translate-y-1
      transition-all
      duration-300
      flex
      flex-col
      "
    >

      {/* IMAGE */}
      <div
        className="
        relative
        w-full
        aspect-[4/3]
        overflow-hidden
        bg-gray-100
        "
      >

        <img
          src={
            review.photos?.[0] ||
            "https://placehold.co/800x600?text=No+Image"
          }
          alt="Review"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/800x600?text=No+Image";
          }}
          className="
          w-full
          h-full
          object-cover
          group-hover:scale-105
          transition-transform
          duration-500
          "
        />

        {/* RATING */}
        <div
          className="
          absolute
          top-4
          right-4
          bg-white/95
          backdrop-blur-md
          px-3
          py-1.5
          rounded-full
          flex
          items-center
          gap-1
          text-sm
          font-semibold
          shadow-md
          "
        >

          {review.rating}

          <FiStar
            className="
            text-orange-500
            fill-orange-500
            "
          />

        </div>

      </div>

      {/* CONTENT */}
      <div
        className="
        flex
        flex-col
        flex-1
        p-6
        "
      >

        {/* USER */}
        <div
          className="
          flex
          items-start
          justify-between
          gap-4
          "
        >

          <div>

            <h3
              className="
              text-lg
              font-bold
              text-gray-900
              "
            >
              {review.user?.username || "Anonymous"}
            </h3>

            <div
              className="
              flex
              items-center
              gap-1
              mt-1
              text-sm
              text-gray-500
              "
            >

              <FiMapPin />

              <span>
                {review.place?.location}
              </span>

            </div>

          </div>

        </div>

        {/* REVIEW TEXT */}
        <p
          className="
          mt-4
          text-[15px]
          leading-7
          text-gray-600
          line-clamp-4
          "
        >
          {review.comment}
        </p>

        {/* FOOTER */}
        <div
          className="
          mt-auto
          pt-6
          flex
          items-center
          justify-between
          "
        >

          <div>

            <p
              className="
              text-sm
              text-gray-400
              "
            >
              Reviewed Place
            </p>

            <h4
              className="
              font-semibold
              text-gray-900
              "
            >
              {review.place?.name}
            </h4>

          </div>

          <button

            onClick={handleLike}

            disabled={loading}

            className={`
            h-11
            px-4
            rounded-full
            flex
            items-center
            gap-2
            transition-all

            ${
              liked
                ? "bg-red-50 text-red-500"
                : "bg-gray-100 text-gray-600"
            }

            hover:scale-105
            `}
          >

            <FiHeart
              className={
                liked
                  ? "fill-red-500"
                  : ""
              }
            />

            <span className="font-medium">
              {likes}
            </span>

          </button>

        </div>

      </div>

    </Link>

  );

}

export default ReviewCard;