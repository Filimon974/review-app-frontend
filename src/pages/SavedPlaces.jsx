import MainLayout
  from "../layouts/MainLayout";

import useFetch
  from "../hooks/useFetch";

import PlaceCard
  from "../components/PlaceCard";

import { FiBookmark } from "react-icons/fi";



function SavedPlaces() {

  const {
    data: places,
    loading,
    error
  } = useFetch("/users/saved");



  /*
  =========================
  SKELETON LOADING
  =========================
  */

  if (loading) {

    return (

      <MainLayout>

        <section className="mt-10">

          {/* HEADER SKELETON */}
          <div className="animate-pulse">

            <div
              className="
              h-12
              w-72
              bg-gray-200
              rounded-2xl
              "
            />

            <div
              className="
              h-5
              w-52
              bg-gray-100
              rounded-xl
              mt-4
              "
            />

          </div>



          {/* GRID SKELETON */}
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

            {[...Array(8)].map((_, index) => (

              <div
                key={index}
                className="
                bg-white
                rounded-[28px]
                overflow-hidden
                border
                border-gray-100
                animate-pulse
                "
              >

                <div
                  className="
                  w-full
                  h-64
                  bg-gray-200
                  "
                />

                <div className="p-5">

                  <div
                    className="
                    h-6
                    bg-gray-200
                    rounded-xl
                    w-3/4
                    "
                  />

                  <div
                    className="
                    h-4
                    bg-gray-100
                    rounded-xl
                    w-1/2
                    mt-4
                    "
                  />

                  <div
                    className="
                    h-4
                    bg-gray-100
                    rounded-xl
                    w-full
                    mt-6
                    "
                  />

                  <div
                    className="
                    h-4
                    bg-gray-100
                    rounded-xl
                    w-5/6
                    mt-3
                    "
                  />

                </div>

              </div>

            ))}

          </div>

        </section>

      </MainLayout>

    );

  }



  /*
  =========================
  ERROR STATE
  =========================
  */

  if (error) {

    return (

      <MainLayout>

        <section
          className="
          mt-20
          "
        >

          <div
            className="
            max-w-xl
            mx-auto
            bg-red-50
            border
            border-red-100
            text-red-500
            rounded-[28px]
            p-8
            text-center
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              "
            >
              Failed to load saved places
            </h2>

            <p className="mt-3">
              {error}
            </p>

          </div>

        </section>

      </MainLayout>

    );

  }



  return (

    <MainLayout>

      <section className="mt-10 pb-16">

        {/* HEADER */}
        <div
          className="
          flex
          flex-col
          lg:flex-row
          lg:items-end
          lg:justify-between
          gap-6
          "
        >

          <div>

            

            <h1
              className="
              text-4xl
              md:text-5xl
              font-black
              tracking-tight
              text-gray-900
              "
            >
              Saved Places
            </h1>

            

          </div>



          {/* COUNT CARD */}
          <div
            className="
            bg-white
            border
            border-gray-100
            rounded-[28px]
            px-8
            py-6
            shadow-sm
            min-w-[220px]
            "
          >

            <p
              className="
              text-gray-500
              text-sm
              font-medium
              "
            >
              Total Saved
            </p>

            <h2
              className="
              text-5xl
              font-black
              text-gray-900
              mt-3
              "
            >
              {places?.length || 0}
            </h2>

          </div>

        </div>



        {/* EMPTY STATE */}
        {places.length === 0 && (

          <div
            className="
            mt-16
            bg-white
            border
            border-gray-100
            rounded-[32px]
            p-12
            md:p-16
            text-center
            shadow-sm
            "
          >

            <div
              className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-orange-50
              flex
              items-center
              justify-center
              text-orange-500
              text-3xl
              "
            >

              <FiBookmark />

            </div>

            <h2
              className="
              text-3xl
              font-black
              text-gray-900
              mt-8
              "
            >
              No saved places yet
            </h2>

            <p
              className="
              text-gray-500
              mt-4
              max-w-md
              mx-auto
              leading-relaxed
              text-lg
              "
            >
              Start exploring and bookmark places you love
              so you can quickly revisit them later.
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
            gap-7
            mt-12
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