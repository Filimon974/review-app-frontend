import useFetch from "../hooks/useFetch";

import ReviewCard from "./ReviewCard";

function RecentReviewsSection() {

  const {
    data: reviews,
    loading,
    error
  } = useFetch("/feed/recent-reviews");

  if (loading) {

    return (

      <section className="mt-24">

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
            w-80
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
          xl:grid-cols-3
          gap-8
          mt-10
          "
        >

          {[1,2,3].map((item) => (

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

              <div className="p-6">

                <div
                  className="
                  h-5
                  w-40
                  rounded-lg
                  bg-gray-200
                  animate-pulse
                  "
                />

                <div
                  className="
                  h-4
                  w-28
                  rounded-lg
                  bg-gray-100
                  animate-pulse
                  mt-3
                  "
                />

                <div className="mt-6 space-y-3">

                  <div
                    className="
                    h-4
                    w-full
                    rounded-lg
                    bg-gray-100
                    animate-pulse
                    "
                  />

                  <div
                    className="
                    h-4
                    w-full
                    rounded-lg
                    bg-gray-100
                    animate-pulse
                    "
                  />

                  <div
                    className="
                    h-4
                    w-2/3
                    rounded-lg
                    bg-gray-100
                    animate-pulse
                    "
                  />

                </div>

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

    <section className="mt-24">

      {/* HEADER */}
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
          Recent Reviews
        </h2>

        <p
          className="
          text-gray-500
          mt-3
          text-lg
          "
        >
          Fresh experiences shared by users
        </p>

      </div>

      {/* GRID */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-8
        mt-10
        "
      >

        {reviews.map((review) => (

          <ReviewCard
            key={review._id}
            review={review}
          />

        ))}

      </div>

    </section>

  );

}

export default RecentReviewsSection;