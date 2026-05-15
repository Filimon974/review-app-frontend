import useFetch from "../hooks/useFetch";

import ReviewCard from "./ReviewCard";



function TrendingReviewsSection() {

  const {
    data: reviews,
    loading,
    error
  } = useFetch("/feed/trending-reviews");



  if (loading) {
    return (
      <div className="mt-20 text-center">
        Loading reviews...
      </div>
    );
  }



  if (error) {
    return (
      <div className="mt-20 text-center text-red-500">
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
          md:text-4xl
          font-bold
          "
        >
          Trending Reviews
        </h2>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Most loved reviews right now
        </p>

      </div>



      {/* GRID */}
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

export default TrendingReviewsSection;