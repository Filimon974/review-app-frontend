import { useEffect, useState }
from "react";

import MainLayout
from "../layouts/MainLayout";

import API
from "../services/api";

import useFetch
from "../hooks/useFetch";

import PlaceCard
from "../components/PlaceCard";

import ReviewCard
from "../components/ReviewCard";

function Search() {

  /*
  =========================
  TAGS
  =========================
  */

  const {
    data: tags
  } = useFetch("/tags");

  /*
  =========================
  MODE
  =========================
  */

  const [mode, setMode] =
    useState("places");

  /*
  =========================
  RESULTS
  =========================
  */

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  /*
  =========================
  FILTER STATES
  =========================
  */

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [tag, setTag] =
    useState("");

  const [user, setUser] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  const [rating, setRating] =
    useState("");

  /*
  =========================
  FETCH DATA
  =========================
  */

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          setLoading(true);

          /*
          =========================
          PLACES SEARCH
          =========================
          */

          if (mode === "places") {

            const response =
              await API.get(

                "/places/search",

                {
                  params: {
                    search,
                    category,
                    sort,
                    rating
                  }
                }

              );

            setResults(
              response.data
            );

          }

          /*
          =========================
          REVIEWS SEARCH
          =========================
          */

          if (mode === "reviews") {

            const response =
              await API.get(

                "/reviews/search",

                {
                  params: {
                    search,
                    category,
                    tag,
                    user,
                    sort
                  }
                }

              );

            setResults(
              response.data
            );

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchData();

  }, [

    mode,
    search,
    category,
    tag,
    user,
    sort,
    rating

  ]);

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

            <span
              className="
              inline-flex
              items-center
              rounded-full
              bg-orange-100
              text-orange-600
              px-4
              py-1.5
              text-sm
              font-semibold
              "
            >
              Explore
            </span>

            <h1
              className="
              text-5xl
              md:text-6xl
              font-black
              tracking-tight
              text-gray-900
              mt-4
              "
            >
              Discover
            </h1>

            <p
              className="
              text-lg
              text-gray-500
              mt-4
              max-w-2xl
              "
            >
              Find the best places and authentic
              experiences shared by the community.
            </p>

          </div>

          {/* MODE SWITCH */}
          <div
            className="
            flex
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-1.5
            shadow-sm
            w-fit
            "
          >

            <button

              onClick={() =>
                setMode("places")
              }

              className={`
              px-6
              py-3
              rounded-xl
              font-semibold
              transition-all

              ${
                mode === "places"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-black"
              }
              `}
            >
              Places
            </button>

            <button

              onClick={() =>
                setMode("reviews")
              }

              className={`
              px-6
              py-3
              rounded-xl
              font-semibold
              transition-all

              ${
                mode === "reviews"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-black"
              }
              `}
            >
              Reviews
            </button>

          </div>

        </div>

        {/* FILTERS */}
        <div
          className="
          mt-10
          bg-white
          border
          border-gray-100
          rounded-[32px]
          p-5
          md:p-7
          shadow-sm
          "
        >

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-5
            gap-4
            "
          >

            {/* SEARCH */}
            <input

              type="text"

              placeholder={
                mode === "places"
                  ? "Search by place"
                  : "Search by place"
              }

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              className="
              h-14
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              px-5
              outline-none
              focus:border-black
              focus:bg-white
              transition
              "
            />

            {/* CATEGORY */}
            <select

              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }

              className="
              h-14
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              px-5
              outline-none
              focus:border-black
              focus:bg-white
              transition
              "
            >

              <option value="">
                All Categories
              </option>

              <option value="restaurant">
                Restaurant
              </option>

              <option value="hotel">
                Hotel
              </option>

              

            </select>

            {/* TAGS */}
            {mode === "reviews" && (

              <select

                value={tag}

                onChange={(e) =>
                  setTag(
                    e.target.value
                  )
                }

                className="
                h-14
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-5
                outline-none
                focus:border-black
                focus:bg-white
                transition
                "
              >

                <option value="">
                  All Tags
                </option>

                {tags?.map(tag => (

                  <option
                    key={tag._id}
                    value={tag._id}
                  >
                    {tag.name}
                  </option>

                ))}

              </select>

            )}

            {/* USER */}
            {mode === "reviews" && (

              <input

                type="text"

                placeholder="Search by user"

                value={user}

                onChange={(e) =>
                  setUser(
                    e.target.value
                  )
                }

                className="
                h-14
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-5
                outline-none
                focus:border-black
                focus:bg-white
                transition
                "
              />

            )}

            {/* RATING */}
            {mode === "places" && (

              <select

                value={rating}

                onChange={(e) =>
                  setRating(
                    e.target.value
                  )
                }

                className="
                h-14
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-5
                outline-none
                focus:border-black
                focus:bg-white
                transition
                "
              >

                <option value="">
                  Any Rating
                </option>

                <option value="5">
                  5 Stars
                </option>

                <option value="4">
                  4+ Stars
                </option>

                <option value="3">
                  3+ Stars
                </option>

              </select>

            )}

            {/* SORT */}
            <select

              value={sort}

              onChange={(e) =>
                setSort(
                  e.target.value
                )
              }

              className="
              h-14
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              px-5
              outline-none
              focus:border-black
              focus:bg-white
              transition
              "
            >

              <option value="newest">
                Newest
              </option>

              <option value="popular">
                Popular
              </option>

              <option value="rating">
                Highest Rated
              </option>

            </select>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-7
            mt-10
            "
          >

            {[1,2,3,4,5,6].map(item => (

              <div

                key={item}

                className="
                bg-white
                border
                border-gray-100
                rounded-[28px]
                overflow-hidden
                shadow-sm
                animate-pulse
                "
              >

                <div
                  className="
                  h-64
                  bg-gray-200
                  "
                />

                <div className="p-5">

                  <div
                    className="
                    h-6
                    w-2/3
                    bg-gray-200
                    rounded-lg
                    "
                  />

                  <div
                    className="
                    h-4
                    w-1/2
                    bg-gray-100
                    rounded-lg
                    mt-4
                    "
                  />

                  <div
                    className="
                    h-4
                    w-full
                    bg-gray-100
                    rounded-lg
                    mt-6
                    "
                  />

                  <div
                    className="
                    h-4
                    w-5/6
                    bg-gray-100
                    rounded-lg
                    mt-3
                    "
                  />

                </div>

              </div>

            ))}

          </div>

        ) : (

          <>
            {/* EMPTY */}
            {results?.length === 0 && (

              <div
                className="
                mt-12
                bg-white
                border
                border-dashed
                border-gray-200
                rounded-[32px]
                p-16
                text-center
                "
              >

                <h2
                  className="
                  text-3xl
                  font-bold
                  text-gray-900
                  "
                >
                  No results found
                </h2>

                <p
                  className="
                  text-gray-500
                  mt-4
                  "
                >
                  Try adjusting your search
                  filters or keywords.
                </p>

              </div>

            )}

            {/* RESULTS */}
            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-7
              mt-10
              "
            >

              {/* PLACES */}
              {mode === "places" && (

                results?.map(place => (

                  <PlaceCard
                    key={place._id}
                    place={place}
                  />

                ))

              )}

              {/* REVIEWS */}
              {mode === "reviews" && (

                results?.map(review => (

                  <ReviewCard
                    key={review._id}
                    review={review}
                  />

                ))

              )}

            </div>
          </>

        )}

      </section>

    </MainLayout>

  );

}

export default Search;