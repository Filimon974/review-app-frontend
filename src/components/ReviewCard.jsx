import {FiHeart,FiMapPin,FiStar} from "react-icons/fi";
import { useState } from "react";
import API from "../services/api";
import {useAuth} from "../context/AuthContext";
import { Link } from "react-router-dom";


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
      bg-white
      rounded-3xl
      p-5
      shadow-sm
      hover:shadow-lg
      transition
      "
    >

      {/* USER */}
      <div
        className="
        flex
        items-center
        justify-between
        "
      >

        <div>

          <h3
            className="
            font-bold
            text-lg
            "
          >
            {review.user?.name || "Anonymous"}
          </h3>

          <div
            className="
            flex
            items-center
            gap-1
            text-sm
            text-gray-500
            mt-1
            "
          >

            <FiMapPin />

            {review.place?.location}

          </div>

        </div>



        {/* RATING */}
        <div
          className="
          flex
          items-center
          gap-1
          bg-orange-100
          text-orange-600
          px-3
          py-1
          rounded-full
          font-semibold
          "
        >

          {review.rating}

          <FiStar className="fill-orange-500" />

        </div>

      </div>



      {/* REVIEW TEXT */}
      <p
        className="
        text-gray-700
        mt-4
        leading-relaxed
        "
      >
        {review.comment}
      </p>



      {/* PHOTO */}
      {review.photos?.[0] && (

        <img
          src={review.photos[0]}
          alt="Review"
          className="
          w-full
          h-[260px]
          object-cover
          rounded-2xl
          mt-4
          "
        />

      )}



      {/* FOOTER */}
      <div
        className="
        flex
        items-center
        justify-between
        mt-5
        "
      >

        <div
          className="
          text-sm
          text-gray-500
          "
        >
          {review.place?.name}
        </div>



         <button

  onClick={handleLike}

  disabled={loading}

  className={`
  flex
  items-center
  gap-2
  transition

  ${
    liked
      ? "text-red-500"
      : "text-gray-600"
  }

  hover:text-red-500
  `}
>

          <FiHeart
            className={
                liked ? "fill-red-500" : ""
            }
     />

          {likes}

        </button>

      </div>

    </Link>

  );

}

export default ReviewCard;