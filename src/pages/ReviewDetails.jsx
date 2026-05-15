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



  if (loading) {

    return (
      <MainLayout>
        <div className="mt-20 text-center">
          Loading review...
        </div>
      </MainLayout>
    );

  }



  if (error) {

    return (
      <MainLayout>
        <div className="mt-20 text-center text-red-500">
          {error}
        </div>
      </MainLayout>
    );

  }



  return (

    <MainLayout>

      <section className="mt-10">

        {/* HERO IMAGE */}
        {
          review.photos?.[0] && (

            <img

              src={review.photos[0]}

              alt="review"

              className="
              w-full
              h-[60vh]
              object-cover
              rounded-3xl
              "

            />

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
              flex
              items-center
              gap-3
              text-gray-500
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
              gap-2
              mt-4
              "
            >

              <FiStar
                className="
                text-yellow-500
                "
              />

              <span
                className="
                text-2xl
                font-bold
                "
              >
                {review.rating}/5
              </span>

            </div>



            {/* REVIEW TEXT */}
            <p
              className="
              mt-8
              text-lg
              leading-relaxed
              text-gray-700
              "
            >
              {review.reviewText}
            </p>



            {/* GALLERY */}
            {
              review.photos?.length > 1 && (

                <div className="mt-12">

                  <h2
                    className="
                    text-2xl
                    font-bold
                    mb-6
                    "
                  >
                    Gallery
                  </h2>



                  <div
                    className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    gap-4
                    "
                  >

                    {review.photos.map(
                      (photo, index) => (

                        <img

                          key={index}

                          src={photo}

                          alt="review"

                          className="
                          w-full
                          h-48
                          object-cover
                          rounded-2xl
                          cursor-pointer
                          hover:opacity-90
                          transition
                          "

                        />

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
              rounded-3xl
              p-6
              sticky
              top-24
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

                  className="
                  w-16
                  h-16
                  rounded-full
                  object-cover
                  "

                />



                <div>

                  <h3
                    className="
                    font-bold
                    text-lg
                    "
                  >
                    {review.user?.name}
                  </h3>

                  <p className="text-gray-500">
                    Reviewer
                  </p>

                </div>

              </div>



              {/* STATS */}
              <div
                className="
                mt-8
                space-y-4
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
                    Likes
                  </span>

                  <span className="font-bold">
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
                  bg-black
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
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
                  py-4
                  rounded-2xl
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  "
                >

                  <FiShare2 />

                  Share Review

                </button>

              </div>

            </div>

          </div>

        </div>



        {/* COMMENTS PLACEHOLDER */}
        <section className="mt-20">

          <h2
            className="
            text-3xl
            font-bold
            "
          >
            Comments
          </h2>



          <div
            className="
            mt-6
            bg-white
            rounded-3xl
            p-8
            text-gray-500
            "
          >
            Comments system coming soon.
          </div>

        </section>

      </section>

    </MainLayout>

  );

}

export default ReviewDetails;