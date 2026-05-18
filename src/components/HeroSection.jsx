import heroImage from "../assets/hero.jpg";

import { Link }
from "react-router-dom";

function HeroSection() {

  return (

    <section
      className="
      relative
      overflow-hidden
      rounded-[32px]
      md:rounded-[44px]
      min-h-[78vh]
      md:min-h-[88vh]
      mt-6
      bg-black
      "
    >

      {/* BACKGROUND IMAGE */}
      <img
        src={heroImage}
        alt="Discover Ethiopia"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/1600x900?text=Discover+Ethiopia";
        }}
        className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        "
      />



      {/* OVERLAY */}
      <div
        className="
        absolute
        inset-0
        bg-gradient-to-b
        from-black/50
        via-black/40
        to-black/70
        "
      />



      {/* CONTENT */}
      <div
        className="
        relative
        z-10
        flex
        flex-col
        items-center
        justify-center
        text-center
        min-h-[78vh]
        md:min-h-[88vh]
        px-6
        md:px-10
        "
      >

        {/* BADGE */}
        <div
          className="
          mb-6
          px-5
          py-2
          rounded-full
          border
          border-white/20
          bg-white/10
          backdrop-blur-md
          text-white/90
          text-sm
          font-medium
          tracking-wide
          "
        >
          Explore • Review • Discover
        </div>



        {/* TITLE */}
        <h1
          className="
          text-white
          font-black
          leading-[0.95]
          tracking-tight
          max-w-5xl
          text-[clamp(3rem,8vw,7rem)]
          "
        >
          Discover Ethiopia
          Through Real
          Experiences
        </h1>



        {/* SUBTITLE */}
        <p
          className="
          mt-7
          max-w-2xl
          text-white/80
          text-base
          md:text-xl
          leading-relaxed
          "
        >
          Find authentic reviews for restaurants,
          hotels, cafés, resorts, and student-friendly
          places across Ethiopia.
        </p>



        {/* BUTTONS */}
        <div
          className="
          flex
          flex-col
          sm:flex-row
          items-center
          gap-4
          mt-10
          w-full
          sm:w-auto
          "
        >

          {/* PRIMARY */}
          <Link
            to="/search"
            className="
            w-full
            sm:w-auto
            "
          >

            <button
              className="
              w-full
              sm:w-auto
              px-8
              py-4
              rounded-2xl
              bg-white
              text-black
              font-semibold
              text-lg
              shadow-xl
              hover:scale-[1.02]
              hover:bg-gray-100
              active:scale-[0.98]
              transition-all
              duration-300
              "
            >
              Explore Places
            </button>

          </Link>



          {/* SECONDARY */}
          <Link
            to="/create-review"
            className="
            w-full
            sm:w-auto
            "
          >

            <button
              className="
              w-full
              sm:w-auto
              px-8
              py-4
              rounded-2xl
              bg-orange-500
              text-white
              font-semibold
              text-lg
              shadow-xl
              shadow-orange-500/30
              hover:bg-orange-600
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all
              duration-300
              "
            >
              Write Review
            </button>

          </Link>

        </div>

      </div>

    </section>

  );

}

export default HeroSection;