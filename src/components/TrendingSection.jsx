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

      <div
        className="
        mt-20
        text-center
        text-gray-500
        "
      >
        Loading places...
      </div>

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

    <section
      className="
      mt-16
      "
    >

      {/* HEADER */}
      <div
        className="
        flex
        items-center
        justify-between
        "
      >

        <div>

          <h2
            className="
            text-3xl
            md:text-4xl
            font-bold
            "
          >
            Trending Now
          </h2>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Highly rated places
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
        gap-6
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