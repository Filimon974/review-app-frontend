import heroImage from "../assets/hero.jpg";

import {
  FiSearch
} from "react-icons/fi";



function HeroSection() {

  return (

    <section
      className="
        relative
        w-full
        min-h-[70vh]
        md:min-h-[85vh]
        rounded-3xl
        md:rounded-[40px]
        overflow-hidden
        mt-6
        "
    >

      {/* BACKGROUND IMAGE */}
      <img
        src={heroImage}
        alt="Hero"
        className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        "
      />



      {/* DARK OVERLAY */}
      <div
        className="
        absolute
        inset-0
        bg-black/45
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
        h-full
        text-center
        px-6
        "
      >

        {/* TITLE */}
        <h1
          className="
          text-white
          font-bold
          leading-tight
          text-[clamp(2.5rem,7vw,6rem)]
          max-w-4xl
          "
        >
          Discover Ethiopia Through
          Real Experiences
        </h1>



        {/* SUBTITLE */}
        <p
          className="
          text-white/90
          mt-6
          text-base
          md:text-xl
          max-w-2xl
          "
        >
          Find and review the best
          restaurants, hotels, and
          student-friendly places.
        </p>



        {/* SEARCH BAR */}
        <div
          className="
          mt-8
          bg-white
          rounded-full
          flex
          items-center
          px-5
          py-4
          w-full
          max-w-2xl
          "
        >

          <FiSearch
            className="
            text-gray-500
            text-xl
            "
          />

          <input
            type="text"
            placeholder="Search places..."
            className="
            ml-3
            w-full
            outline-none
            text-gray-700
            bg-transparent
            "
          />

        </div>



        {/* BUTTONS */}
        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-4
          mt-8
          w-full
          md:w-auto
          "
        >

          <button
            className="
            bg-white
            text-black
            px-8
            py-4
            rounded-full
            font-semibold
            hover:bg-gray-200
            transition
            "
          >
            Explore Places
          </button>



          <button
            className="
            bg-orange-500
            text-white
            px-8
            py-4
            rounded-full
            font-semibold
            hover:bg-orange-600
            transition
            "
          >
            Write Review
          </button>

        </div>

      </div>

    </section>

  );

}

export default HeroSection;