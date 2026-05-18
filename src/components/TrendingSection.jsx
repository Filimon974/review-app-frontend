import PlaceCard from "./PlaceCard";

import useFetch from "../hooks/useFetch";

function TrendingSection() {

  const {
    data: places,
    loading,
    error
  } = useFetch("/feed/popular-places");

  if (loading) {

    return (

      <section className="mt-20">

        {/* HEADER */}
        <div>

          <div
            className="
            h-10
            w-64
            rounded-2xl
            bg-gray-200
            animate-pulse
            "
          />

          <div
            className="
            h-5
            w-56
            rounded-xl
            bg-gray-100
            animate-pulse
            mt-4
            "
          />

        </div>

        {/* SKELETON GRID */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-8
          mt-10
          "
        >

          {[1,2,3,4].map((item) => (

            <div
              key={item}
              className="
              bg-white
              rounded-[32px]
              overflow-hidden
              border
              border-gray-100
              shadow-sm
              "
            >

              <div
                className="
                aspect-[4/3]
                bg-gray-200
                animate-pulse
                "
              />

              <div className="p-5">

                <div
                  className="
                  h-4
                  w-24
                  rounded-lg
                  bg-gray-100
                  animate-pulse
                  "
                />

                <div
                  className="
                  h-7
                  w-40
                  rounded-xl
                  bg-gray-200
                  animate-pulse
                  mt-4
                  "
                />

                <div
                  className="
                  h-4
                  w-20
                  rounded-lg
                  bg-gray-100
                  animate-pulse
                  mt-5
                  "
                />

              </div>

            </div>

          ))}

        </div>

      </section>

    );

  }

  if (error) {

    return (

      <div
        className="
        mt-20
        text-center
        text-red-500
        "
      >
        {error}
      </div>

    );

  }

  return (

    <section className="mt-20">

      {/* HEADER */}
      <div
        className="
        flex
        items-end
        justify-between
        gap-6
        "
      >

        <div>

          <h2
            className="
            text-3xl
            md:text-5xl
            font-bold
            tracking-tight
            text-gray-950
            "
          >
            Trending Now
          </h2>

          <p
            className="
            text-gray-500
            text-lg
            mt-3
            "
          >
            Highly rated places people love
          </p>

        </div>

      </div>

      {/* GRID */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-8
        mt-10
        "
      >

        {places.map((place) => (

          <PlaceCard
            key={place._id}
            place={place}
          />

        ))}

      </div>

    </section>

  );

}

export default TrendingSection;