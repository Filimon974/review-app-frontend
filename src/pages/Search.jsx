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



function Search() {

  const {
    data: tags
  } = useFetch("/tags");



  const [places, setPlaces] =
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

  const [sort, setSort] =
    useState("newest");

  const [rating, setRating] =
    useState("");



  /*
  =========================
  FETCH PLACES
  =========================
  */

  useEffect(() => {

    const fetchPlaces =
      async () => {

        try {

          setLoading(true);

          const response =
            await API.get(

              "/places/search",

              {
                params: {
                  search,
                  category,
                  tag,
                  sort,
                  rating
                }
              }

            );

          setPlaces(
            response.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };



    fetchPlaces();

  }, [
    search,
    category,
    tag,
    sort,
    rating
  ]);



  return (

    <MainLayout>

      <div className="mt-10">

        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Discover Places
        </h1>



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
            placeholder="Search places..."
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

          </select>



          {/* TAG */}
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



          {/* RATING */}
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

          {places?.map(place => (

            <PlaceCard
              key={place._id}
              place={place}
            />

          ))}

        </div>

      </div>

    </MainLayout>

  );

}

export default Search;