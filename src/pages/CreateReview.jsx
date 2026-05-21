import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import useFetch from "../hooks/useFetch";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";

import {
  FiStar,
  FiUpload,
  FiImage
} from "react-icons/fi";

function CreateReview() {

  const { token } = useAuth();

  /*
  =========================
  FETCH TAGS
  =========================
  */

  const {
    data: tags
  } = useFetch("/tags");



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
    useState(0);

  const [text, setText] =
    useState("");

  const [photos, setPhotos] =
    useState([]);

  const [uploading, setUploading] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [selectedTags, setSelectedTags] =
    useState([]);



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
            tags: selectedTags,
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
        setRating(0);
        setText("");
        setPhotos([]);
        setSelectedTags([]);

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
        max-w-4xl
        mx-auto
        px-4
        py-10
        "
      >

        <div
          className="
          bg-white
          border
          border-gray-100
          shadow-sm
          rounded-[32px]
          overflow-hidden
          "
        >

          {/* HEADER */}
          <div
            className="
            px-8
            py-8
            border-b
            border-gray-100
            bg-gradient-to-b
            from-orange-50
            to-white
            "
          >

            <p
              className="
              text-sm
              font-semibold
              tracking-wide
              uppercase
              text-orange-500
              "
            >
              Share Experience
            </p>

            <h1
              className="
              mt-2
              text-4xl
              md:text-5xl
              font-bold
              tracking-tight
              text-gray-900
              "
            >
              Create Review
            </h1>

            <p
              className="
              mt-3
              text-gray-500
              text-lg
              max-w-2xl
              "
            >
              Help others discover great places
              by sharing your honest experience,
              ratings, photos, and tags.
            </p>

          </div>



          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
            p-8
            space-y-10
            "
          >

            {/* PLACE */}
            <div>

              <label
                className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-3
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
                bg-gray-50
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                text-gray-800
                outline-none
                transition
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-100
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
                text-sm
                font-semibold
                text-gray-700
                mb-4
                "
              >
                Your Rating
              </label>

              <div
                className="
                flex
                items-center
                gap-3
                "
              >

                {[1,2,3,4,5].map(star => (

                  <button

                    type="button"

                    key={star}

                    onClick={() =>
                      setRating(star)
                    }

                    className="
                    transition
                    hover:scale-110
                    "

                  >

                    <FiStar

                      className={`
                      text-4xl
                      transition

                      ${
                        star <= rating
                          ? "text-orange-400 fill-orange-400"
                          : "text-gray-300"
                      }
                      `}

                    />

                  </button>

                ))}

              </div>

            </div>



            {/* REVIEW */}
            <div>

              <label
                className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-3
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
                bg-gray-50
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                text-gray-800
                outline-none
                resize-none
                transition
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-100
                "

              />

            </div>



            {/* PHOTO UPLOAD */}
            <div>

              <label
                className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-3
                "
              >
                Upload Photos
              </label>

              <label
                className="
                relative
                flex
                flex-col
                items-center
                justify-center
                gap-4
                border-2
                border-dashed
                border-gray-200
                rounded-[28px]
                py-14
                px-6
                cursor-pointer
                bg-gray-50
                hover:bg-orange-50
                hover:border-orange-300
                transition
                overflow-hidden
                "
              >

                <div
                  className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-white
                  border
                  border-gray-200
                  flex
                  items-center
                  justify-center
                  shadow-sm
                  "
                >

                  <FiUpload
                    className="
                    text-2xl
                    text-orange-500
                    "
                  />

                </div>

                <div className="text-center">

                  <p
                    className="
                    font-semibold
                    text-gray-800
                    "
                  >
                    {
                      uploading
                        ? "Uploading..."
                        : "Click to upload photos"
                    }
                  </p>

                  <p
                    className="
                    mt-1
                    text-sm
                    text-gray-500
                    "
                  >
                    PNG, JPG, WEBP supported
                  </p>

                </div>

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



            {/* PHOTO PREVIEW */}
            {
              photos.length > 0 && (

                <div>

                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    mb-5
                    "
                  >

                    <FiImage
                      className="
                      text-orange-500
                      "
                    />

                    <h3
                      className="
                      font-semibold
                      text-gray-800
                      "
                    >
                      Uploaded Photos
                    </h3>

                  </div>

                  <div
                    className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    gap-5
                    "
                  >

                    {photos.map((photo, i) => (

                      <div
                        key={i}
                        className="
                        overflow-hidden
                        rounded-3xl
                        border
                        border-gray-100
                        bg-gray-100
                        "
                      >

                        <img

                          src={photo}

                          alt="review"

                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/400x300?text=Image";
                          }}

                          className="
                          w-full
                          h-44
                          object-cover
                          hover:scale-105
                          transition
                          duration-300
                          "

                        />

                      </div>

                    ))}

                  </div>

                </div>

              )
            }



            {/* TAGS */}
            <div>

              <h3
                className="
                text-sm
                font-semibold
                text-gray-700
                mb-4
                "
              >
                Tags
              </h3>

              <div
                className="
                flex
                flex-wrap
                gap-3
                "
              >

                {tags?.map(tag => (

                  <button

                    type="button"

                    key={tag._id}

                    onClick={() => {

                      if (
                        selectedTags.includes(
                          tag._id
                        )
                      ) {

                        setSelectedTags(
                          prev =>
                            prev.filter(
                              id =>
                                id !== tag._id
                            )
                        );

                      } else {

                        setSelectedTags(
                          prev => [
                            ...prev,
                            tag._id
                          ]
                        );

                      }

                    }}

                    className={`
                    px-5
                    py-3
                    rounded-full
                    text-sm
                    font-medium
                    border
                    transition-all

                    ${
                      selectedTags.includes(
                        tag._id
                      )
                        ? `
                          bg-orange-500
                          text-white
                          border-orange-500
                          shadow-sm
                        `
                        : `
                          bg-white
                          text-gray-700
                          border-gray-200
                          hover:border-orange-300
                          hover:text-orange-500
                        `
                    }
                    `}

                  >

                    {tag.name}

                  </button>

                ))}

              </div>

            </div>



            {/* SUBMIT */}
            <button

              disabled={submitting}

              className="
              w-full
              h-14
              rounded-2xl
              bg-black
              text-white
              font-semibold
              text-lg
              transition
              hover:opacity-90
              disabled:opacity-60
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