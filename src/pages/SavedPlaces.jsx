import MainLayout
  from "../layouts/MainLayout";

import useFetch
  from "../hooks/useFetch";

import PlaceCard
  from "../components/PlaceCard";



function SavedPlaces() {

  const {
    data: places,
    loading,
    error
  } = useFetch("/users/saved");



  if (loading) {

    return (

      <MainLayout>

        <div
          className="
          mt-20
          text-center
          "
        >
          Loading saved places...
        </div>

      </MainLayout>

    );

  }



  if (error) {

    return (

      <MainLayout>

        <div
          className="
          mt-20
          text-center
          text-red-500
          "
        >
          {error}
        </div>

      </MainLayout>

    );

  }



  return (

    <MainLayout>

      <section className="mt-10">

        {/* HEADER */}
        <div>

          <h1
            className="
            text-4xl
            md:text-5xl
            font-bold
            "
          >
            Saved Places
          </h1>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Your bookmarked places
          </p>

        </div>



        {/* EMPTY STATE */}
        {places.length === 0 && (

          <div
            className="
            mt-20
            bg-white
            rounded-3xl
            p-10
            text-center
            "
          >

            <h2
              className="
              text-2xl
              font-semibold
              "
            >
              No saved places yet
            </h2>

            <p
              className="
              text-gray-500
              mt-3
              "
            >
              Start exploring and save
              places you love.
            </p>

          </div>

        )}



        {/* GRID */}
        {places.length > 0 && (

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

        )}

      </section>

    </MainLayout>

  );

}

export default SavedPlaces;