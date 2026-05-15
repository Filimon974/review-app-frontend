import { useState } from "react";

import MainLayout
  from "../layouts/MainLayout";

import useFetch
  from "../hooks/useFetch";

import API
  from "../services/api";

import { useAuth }
  from "../context/AuthContext";

import {
  FiStar,
  FiUpload
} from "react-icons/fi";



function CreateReview() {

  const { token } = useAuth();



  /*
  =========================
  FETCH PLACES
  =========================
  */

  const {
    data: places
  } = useFetch("/places");



  /*
  =========================
  FORM STATE
  =========================
  */

  const [placeId, setPlaceId] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [text, setText] =
    useState("");

  const [photos, setPhotos] =
    useState([]);

  const [uploading, setUploading] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);



  /*
  =========================
  CLOUDINARY
  =========================
  */

  const CLOUD_NAME =
    import.meta.env
      .VITE_CLOUDINARY_CLOUD_NAME;

  const UPLOAD_PRESET =
    import.meta.env
      .VITE_CLOUDINARY_UPLOAD_PRESET;



  /*
  =========================
  PHOTO UPLOAD
  =========================
  */

  const handlePhotoUpload =
    async (e) => {

      try {

        const files =
          Array.from(e.target.files);

        setUploading(true);



        let uploadedPhotos = [];



        for (const file of files) {

          const formData =
            new FormData();

          formData.append(
            "file",
            file
          );

          formData.append(
            "upload_preset",
            UPLOAD_PRESET
          );



          const response =
            await fetch(

              `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

              {
                method: "POST",
                body: formData
              }

            );



          const data =
            await response.json();



          uploadedPhotos.push(
            data.secure_url
          );

        }



        setPhotos(prev => [
          ...prev,
          ...uploadedPhotos
        ]);

      } catch (error) {

        console.log(error);

        alert("Upload failed");

      } finally {

        setUploading(false);

      }

    };



  /*
  =========================
  SUBMIT REVIEW
  =========================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setSubmitting(true);



        await API.post(

          "/reviews",

          {
            place: placeId,
            rating,
            reviewText: text,
            photos
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );



        alert(
          "Review created successfully"
        );



        setPlaceId("");
        setRating(5);
        setText("");
        setPhotos([]);

      } catch (error) {

        console.log(error);

        alert("Failed to create review");

      } finally {

        setSubmitting(false);

      }

    };



  return (

    <MainLayout>

      <section
        className="
        max-w-3xl
        mx-auto
        mt-10
        "
      >

        <div
          className="
          bg-white
          rounded-3xl
          p-8
          "
        >

          <h1
            className="
            text-4xl
            font-bold
            "
          >
            Create Review
          </h1>



          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* PLACE SELECT */}
            <div>

              <label
                className="
                block
                font-semibold
                mb-2
                "
              >
                Select Place
              </label>

              <select

                value={placeId}

                onChange={(e) =>
                  setPlaceId(e.target.value)
                }

                required

                className="
                w-full
                border
                rounded-2xl
                px-4
                py-4
                outline-none
                "
              >

                <option value="">
                  Choose place
                </option>

                {places?.map(place => (

                  <option
                    key={place._id}
                    value={place._id}
                  >
                    {place.name}
                  </option>

                ))}

              </select>

            </div>



            {/* RATING */}
            <div>

              <label
                className="
                block
                font-semibold
                mb-3
                "
              >
                Rating
              </label>

              <div className="flex gap-3">

                {[1,2,3,4,5].map(star => (

                  <button

                    type="button"

                    key={star}

                    onClick={() =>
                      setRating(star)
                    }

                  >

                    <FiStar

                      className={`
                      text-3xl
                      ${
                        star <= rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                      `}

                    />

                  </button>

                ))}

              </div>

            </div>



            {/* REVIEW TEXT */}
            <div>

              <label
                className="
                block
                font-semibold
                mb-2
                "
              >
                Review
              </label>

              <textarea

                rows="6"

                value={text}

                onChange={(e) =>
                  setText(e.target.value)
                }

                placeholder="
                Share your experience...
                "

                required

                className="
                w-full
                border
                rounded-2xl
                px-4
                py-4
                outline-none
                resize-none
                "
              />

            </div>



            {/* PHOTO UPLOAD */}
            <div>

              <label
                className="
                block
                font-semibold
                mb-3
                "
              >
                Photos
              </label>

              <label
                className="
                flex
                items-center
                justify-center
                gap-3
                border-2
                border-dashed
                rounded-2xl
                py-10
                cursor-pointer
                hover:bg-gray-50
                transition
                "
              >

                <FiUpload />

                {
                  uploading
                    ? "Uploading..."
                    : "Upload Photos"
                }

                <input

                  type="file"

                  multiple

                  hidden

                  accept="image/*"

                  onChange={
                    handlePhotoUpload
                  }

                />

              </label>

            </div>



            {/* PREVIEW */}
            {
              photos.length > 0 && (

                <div
                  className="
                  grid
                  grid-cols-2
                  md:grid-cols-3
                  gap-4
                  "
                >

                  {photos.map((photo, i) => (

                    <img

                      key={i}

                      src={photo}

                      alt="review"

                      className="
                      w-full
                      h-40
                      object-cover
                      rounded-2xl
                      "
                    />

                  ))}

                </div>

              )
            }



            {/* SUBMIT */}
            <button

              disabled={submitting}

              className="
              w-full
              bg-black
              text-white
              py-4
              rounded-2xl
              font-semibold
              hover:opacity-90
              transition
              "
            >

              {
                submitting
                  ? "Publishing..."
                  : "Publish Review"
              }

            </button>

          </form>

        </div>

      </section>

    </MainLayout>

  );

}

export default CreateReview;