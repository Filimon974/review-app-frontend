import {
  FiMapPin,
  FiStar
} from "react-icons/fi";

import { Link }
from "react-router-dom";

function PlaceCard({ place }) {

  return (

    <Link
      to={`/place/${place._id}`}
      className="
      group
      block
      overflow-hidden
      rounded-[30px]
      border
      border-black/5
      bg-white
      shadow-sm
      transition-all
      duration-500
      hover:-translate-y-1
      hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >

      {/* IMAGE */}
      <div
        className="
        relative
        h-[260px]
        overflow-hidden
        bg-gray-100
        "
      >

        <img
          src={
            place.photos?.[0] ||
            "https://placehold.co/600x400?text=No+Image"
          }

          alt={place.name}

          onError={(e) => {

            e.target.src =
              "https://placehold.co/600x400?text=No+Image";

          }}

          className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
          "
        />



        {/* OVERLAY */}
        <div
          className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/30
          via-transparent
          to-transparent
          "
        />



        {/* RATING */}
        <div
          className="
          absolute
          top-4
          right-4
          flex
          items-center
          gap-1
          rounded-full
          bg-white/95
          backdrop-blur-md
          px-3
          py-1.5
          text-sm
          font-semibold
          shadow-lg
          "
        >

          <FiStar
            className="
            fill-orange-500
            text-orange-500
            "
          />

          {place.averageRating?.toFixed(1) || "0.0"}

        </div>

      </div>



      {/* CONTENT */}
      <div className="p-6">

        {/* LOCATION */}
        <div
          className="
          flex
          items-center
          gap-2
          text-sm
          font-medium
          text-gray-500
          "
        >

          <FiMapPin className="text-orange-500" />

          <span className="truncate">
            {place.location}
          </span>

        </div>



        {/* TITLE */}
        <h3
          className="
          mt-3
          line-clamp-1
          text-2xl
          font-bold
          tracking-tight
          text-black
          "
        >
          {place.name}
        </h3>



        {/* CATEGORY */}
        <div
          className="
          mt-4
          inline-flex
          items-center
          rounded-full
          bg-orange-50
          px-4
          py-2
          text-sm
          font-semibold
          text-orange-600
          "
        >
          {place.category}
        </div>

      </div>

    </Link>

  );

}

export default PlaceCard;