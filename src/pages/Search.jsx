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

      <div className="mt-10">

        {/* HEADER */}
        <div
          className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          "
        >

          <div>

            <h1
              className="
              text-4xl
              font-bold
              "
            >
              Discover
            </h1>

            <p
              className="
              text-gray-500
              mt-2
              "
            >
              Explore places and experiences
            </p>

          </div>



          {/* MODE SWITCH */}
          <div
            className="
            flex
            bg-gray-100
            rounded-full
            p-1
            w-fit
            "
          >

            <button

              onClick={() =>
                setMode("places")
              }

              className={`
              px-5
              py-2
              rounded-full
              transition

              ${
                mode === "places"
                  ? "bg-black text-white"
                  : "text-gray-600"
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
              px-5
              py-2
              rounded-full
              transition

              ${
                mode === "reviews"
                  ? "bg-black text-white"
                  : "text-gray-600"
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
          bg-white
          rounded-3xl
          p-6
          mt-8
          grid
          grid-cols-1
          md:grid-cols-5
          gap-4
          "
        >

          {/* SEARCH */}
          <input
            type="text"

            placeholder={
              mode === "places"
                ? "Search places..."
                : "Search reviews by place..."
            }

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            className="
            border
            rounded-2xl
            p-4
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
            border
            rounded-2xl
            p-4
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

            <option value="cafe">
              Cafe
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
              border
              rounded-2xl
              p-4
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

              placeholder="Search user..."

              value={user}

              onChange={(e) =>
                setUser(
                  e.target.value
                )
              }

              className="
              border
              rounded-2xl
              p-4
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
              border
              rounded-2xl
              p-4
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
            border
            rounded-2xl
            p-4
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



        {/* LOADING */}
        {loading && (

          <div
            className="
            mt-10
            text-center
            "
          >
            Loading...
          </div>

        )}



        {/* RESULTS */}
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

      </div>

    </MainLayout>

  );

}

export default Search;