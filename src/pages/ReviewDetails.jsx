import { useParams } from "react-router-dom";

import MainLayout
  from "../layouts/MainLayout";

import useFetch
  from "../hooks/useFetch";

import {
  FiHeart,
  FiMapPin,
  FiShare2,
  FiStar
} from "react-icons/fi";

function ReviewDetails() {

  const { id } = useParams();

  /*
  =========================
  FETCH REVIEW
  =========================
  */

  const {
    data: review,
    loading,
    error
  } = useFetch(`/reviews/${id}`);

  /*
  =========================
  SKELETON LOADING
  =========================
  */

  if (loading) {

    return (

      <MainLayout>

        <section className="mt-10 animate-pulse">

          {/* HERO */}
          <div
            className="
            w-full
            h-[55vh]
            rounded-[32px]
            bg-gray-200
            "
          />



          {/* CONTENT */}
          <div
            className="
            mt-10
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-10
            "
          >

            {/* LEFT */}
            <div className="lg:col-span-2">

              <div className="h-5 w-40 bg-gray-200 rounded-full" />

              <div className="h-10 w-28 bg-gray-200 rounded-full mt-5" />

              <div className="space-y-3 mt-8">
                <div className="h-4 bg-gray-200 rounded-full w-full" />
                <div className="h-4 bg-gray-200 rounded-full w-11/12" />
                <div className="h-4 bg-gray-200 rounded-full w-10/12" />
                <div className="h-4 bg-gray-200 rounded-full w-9/12" />
              </div>



              {/* TAGS */}
              <div className="flex gap-3 mt-10 flex-wrap">
                {[1,2,3,4].map(item => (
                  <div
                    key={item}
                    className="
                    h-10
                    w-24
                    rounded-full
                    bg-gray-200
                    "
                  />
                ))}
              </div>



              {/* GALLERY */}
              <div
                className="
                grid
                grid-cols-2
                md:grid-cols-3
                gap-4
                mt-12
                "
              >
                {[1,2,3].map(item => (
                  <div
                    key={item}
                    className="
                    h-48
                    rounded-3xl
                    bg-gray-200
                    "
                  />
                ))}
              </div>

            </div>



            {/* SIDEBAR */}
            <div>

              <div
                className="
                bg-white
                border
                border-gray-100
                rounded-[32px]
                p-6
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                    w-16
                    h-16
                    rounded-full
                    bg-gray-200
                    "
                  />

                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-32 bg-gray-200 rounded-full" />
                    <div className="h-3 w-20 bg-gray-200 rounded-full" />
                  </div>

                </div>



                <div className="mt-10 space-y-4">

                  <div className="h-14 rounded-2xl bg-gray-200" />

                  <div className="h-14 rounded-2xl bg-gray-200" />

                </div>

              </div>

            </div>

          </div>

        </section>

      </MainLayout>

    );

  }

  /*
  =========================
  ERROR
  =========================
  */

  if (error) {

    return (

      <MainLayout>

        <div
          className="
          mt-20
          bg-red-50
          border
          border-red-100
          text-red-500
          rounded-3xl
          p-6
          text-center
          "
        >
          {error}
        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <section className="mt-10 pb-20">

        {/* HERO IMAGE */}
        {
          review.photos?.[0] ? (

            <div className="relative overflow-hidden rounded-[32px]">

              <img

                src={review.photos[0]}

                alt="review"

                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/1200x700";
                }}

                className="
                w-full
                h-[55vh]
                object-cover
                "
              />



              {/* OVERLAY */}
              <div
                className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/50
                via-black/10
                to-transparent
                "
              />

            </div>

          ) : (

            <div
              className="
              w-full
              h-[40vh]
              rounded-[32px]
              bg-gradient-to-br
              from-orange-100
              to-amber-50
              flex
              items-center
              justify-center
              text-5xl
              font-bold
              text-orange-500
              "
            >
              Review
            </div>

          )
        }

        {/* CONTENT */}
        <div
          className="
          mt-10
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-10
          "
        >

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* PLACE */}
            <div
              className="
              inline-flex
              items-center
              gap-2
              bg-orange-50
              text-orange-600
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              "
            >

              <FiMapPin />

              {review.place?.name}

            </div>



            {/* RATING */}
            <div
              className="
              flex
              items-center
              gap-4
              mt-6
              "
            >

              <div
                className="
                w-16
                h-16
                rounded-2xl
                bg-amber-100
                text-amber-500
                flex
                items-center
                justify-center
                text-3xl
                "
              >
                <FiStar />
              </div>

              <div>

                <h1
                  className="
                  text-4xl
                  md:text-5xl
                  font-black
                  text-gray-900
                  "
                >
                  {review.rating}/5
                </h1>

                <p className="text-gray-500 mt-1">
                  Community Rating
                </p>

              </div>

            </div>



            {/* REVIEW TEXT */}
            <div
              className="
              mt-10
              bg-white
              border
              border-gray-100
              rounded-[32px]
              p-8
              shadow-sm
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                text-gray-900
                "
              >
                Review
              </h2>

              <p
                className="
                mt-6
                text-lg
                leading-9
                text-gray-600
                "
              >
                {review.reviewText}
              </p>

            </div>

            {/* TAGS */}
            {
              review.tags?.length > 0 && (

                <div className="mt-10">

                  <h2
                    className="
                    text-2xl
                    font-bold
                    text-gray-900
                    mb-5
                    "
                  >
                    Tags
                  </h2>

                  <div
                    className="
                    flex
                    flex-wrap
                    gap-3
                    "
                  >

                    {review.tags.map(tag => (

                      <div
                        key={tag._id}
                        className="
                        px-5
                        py-3
                        bg-white
                        border
                        border-gray-100
                        rounded-full
                        text-sm
                        font-semibold
                        text-gray-700
                        shadow-sm
                        hover:border-orange-200
                        hover:text-orange-600
                        transition
                        "
                      >
                        #{tag.name}
                      </div>

                    ))}

                  </div>

                </div>

              )
            }

            {/* GALLERY */}
            {
              review.photos?.length > 1 && (

                <div className="mt-14">

                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    mb-6
                    "
                  >

                    <h2
                      className="
                      text-2xl
                      font-bold
                      text-gray-900
                      "
                    >
                      Gallery
                    </h2>

                    <span
                      className="
                      text-sm
                      text-gray-500
                      "
                    >
                      {review.photos.length} photos
                    </span>

                  </div>



                  <div
                    className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    gap-5
                    "
                  >

                    {review.photos.map(
                      (photo, index) => (

                        <div
                          key={index}
                          className="
                          overflow-hidden
                          rounded-[28px]
                          group
                          "
                        >

                          <img

                            src={photo}

                            alt="review"

                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/400";
                            }}

                            className="
                            w-full
                            h-52
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                            "

                          />

                        </div>

                      )
                    )}

                  </div>

                </div>

              )
            }

          </div>

          {/* RIGHT SIDEBAR */}
          <div>

            <div
              className="
              bg-white
              border
              border-gray-100
              rounded-[32px]
              p-7
              sticky
              top-24
              shadow-sm
              "
            >

              {/* USER */}
              <div
                className="
                flex
                items-center
                gap-4
                "
              >

                <img

                  src={
                    review.user?.avatar ||
                    "https://i.pravatar.cc/150"
                  }

                  alt={review.user?.name}

                  onError={(e) => {
                    e.target.src =
                      "https://i.pravatar.cc/150";
                  }}

                  className="
                  w-16
                  h-16
                  rounded-full
                  object-cover
                  ring-4
                  ring-orange-100
                  "

                />



                <div>

                  <h3
                    className="
                    font-bold
                    text-xl
                    text-gray-900
                    "
                  >
                    {review.user?.name}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Community Reviewer
                  </p>

                </div>

              </div>

              {/* STATS */}
              <div
                className="
                mt-8
                bg-gray-50
                rounded-3xl
                p-5
                "
              >

                <div
                  className="
                  flex
                  items-center
                  justify-between
                  "
                >

                  <span className="text-gray-500">
                    Likes Received
                  </span>

                  <span
                    className="
                    font-black
                    text-2xl
                    text-gray-900
                    "
                  >
                    {review.likesCount}
                  </span>

                </div>

              </div>

              {/* ACTIONS */}
              <div
                className="
                mt-8
                flex
                flex-col
                gap-4
                "
              >

                <button
                  className="
                  w-full
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  duration-300
                  shadow-lg
                  shadow-orange-500/20
                  "
                >

                  <FiHeart />

                  Like Review

                </button>



                <button

                  onClick={() => {

                    navigator.clipboard.writeText(
                      window.location.href
                    );

                    alert(
                      "Link copied!"
                    );

                  }}

                  className="
                  w-full
                  border
                  border-gray-200
                  bg-white
                  hover:bg-gray-50
                  py-4
                  rounded-2xl
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                  "
                >

                  <FiShare2 />

                  Share Review

                </button>

              </div>

            </div>

          </div>

        </div>

        

      </section>

    </MainLayout>

  );

}

export default ReviewDetails;