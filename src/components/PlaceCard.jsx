import {
  FiMapPin,
  FiStar
} from "react-icons/fi";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  return (
    <Link
      to={`/place/${place._id}`}
      className="
      block
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-sm
      hover:shadow-lg
      transition
      duration-300
      "
    >
      
      {/* IMAGE CONTAINER */}
<div
  className="
  relative
  h-[240px]
  bg-gray-50
  overflow-hidden
  "
>
  <img
    src={
      place.photos?.[0] ||
    "https://placehold.co"
      
    }
    alt={place.name}
    className="
    w-full
    h-full
    object-contain
    hover:scale-105
    transition
    duration-500
    "
  />


        {/* RATING BADGE */}
        <div
          className="
          absolute
          top-4
          right-4
          bg-white
          px-3
          py-1
          rounded-full
          flex
          items-center
          gap-1
          text-sm
          font-semibold
          "
        >
          {place.averageRating?.toFixed(1) || "0.0"}
          <FiStar
            className="
            text-yellow-500
            fill-yellow-500
            "
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* LOCATION */}
        <div
          className="
          flex
          items-center
          text-gray-500
          text-sm
          gap-1
          "
        >
          <FiMapPin />
          {place.location}
        </div>

        {/* NAME */}
        <h3
          className="
          text-2xl
          font-bold
          mt-2
          "
        >
          {place.name}
        </h3>

        {/* CATEGORY */}
        <div
          className="
          mt-3
          flex
          items-center
          gap-2
          text-gray-600
          "
        >
          <span>
            {place.category}
          </span>
          <span>•</span>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
