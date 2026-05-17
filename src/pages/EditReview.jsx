import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import useFetch from "../hooks/useFetch";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";

import {
  FiStar,
  FiUpload,
  FiX
} from "react-icons/fi";



function EditReview() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();



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
  FETCH TAGS
  =========================
  */

  const {
    data: tags
  } = useFetch("/tags");



  /*
  =========================
  FORM STATE
  =========================
  */

  const [rating, setRating] =
    useState(0);

  const [text, setText] =
    useState("");

  const [photos, setPhotos] =
    useState([]);

  const [selectedTags, setSelectedTags] =
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
  PREFILL DATA
  =========================
  */

  useEffect(() => {

    if (review) {

      setRating(review.rating || 0);

      setText(review.reviewText || "");

      setPhotos(review.photos || []);

      setSelectedTags(
        review.tags?.map(
          tag => tag._id
        ) || []
      );

    }

  }, [review]);



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
  REMOVE IMAGE
  =========================
  */

  const handleRemovePhoto = (photoUrl) => {

  setPhotos(prev =>
    prev.filter(
      photo => photo !== photoUrl
    )
  );

};



  /*
  =========================
  UPDATE REVIEW
  =========================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setSubmitting(true);



        await API.put(

          `/reviews/${id}`,

          {
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
          "Review updated successfully"
        );



        navigate("/profile");

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update review"
        );

      } finally {

        setSubmitting(false);

      }

    };



  if (loading) {

    return (

      <MainLayout>

        <div className="mt-20 text-center">
          Loading...
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
            Edit Review
          </h1>



          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

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
                      transition
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



            {/* TAGS */}
            <div>

              <h3
                className="
                font-semibold
                mb-3
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
                    px-4
                    py-2
                    rounded-full
                    border
                    transition

                    ${
                      selectedTags.includes(
                        tag._id
                      )
                        ? "bg-black text-white"
                        : "bg-white"
                    }
                    `}
                  >

                    {tag.name}

                  </button>

                ))}

              </div>

            </div>



            {/* IMAGE UPLOAD */}
            <div>

              <label
                className="
                block
                font-semibold
                mb-3
                "
              >
                Update Photos
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
                    : "Upload More Photos"
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



            {/* PHOTO PREVIEW */}
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

                    <div
                      key={i}
                      className="relative"
                    >

                      <img
                        src={photo}
                        alt="review"
                        className="
                        w-full
                        h-40
                        object-cover
                        rounded-2xl
                        "
                      />



                      <button
                        type="button"
                        onClick={() =>
                          handleRemovePhoto(
                            photo
                          )
                        }
                        className="
                        absolute
                        top-2
                        right-2
                        bg-black
                        text-white
                        p-2
                        rounded-full
                        "
                      >

                        <FiX />

                      </button>

                    </div>

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
                  ? "Updating..."
                  : "Update Review"
              }

            </button>

          </form>

        </div>

      </section>

    </MainLayout>

  );

}

export default EditReview;