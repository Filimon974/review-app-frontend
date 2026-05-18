import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import useFetch from "../hooks/useFetch";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";

import {
  FiStar,
  FiUpload,
  FiX,
  FiImage
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
  FORM STATE
  =========================
  */

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

        <div
          className="
          min-h-screen
          flex
          items-center
          justify-center
          text-gray-500
          "
        >
          Loading...
        </div>

      </MainLayout>

    );

  }



  if (error) {

    return (

      <MainLayout>

        <div
          className="
          min-h-screen
          flex
          items-center
          justify-center
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

      <section
        className="
        max-w-4xl
        mx-auto
        py-8
        md:py-12
        "
      >

        {/* HEADER */}
        <div className="mb-8">

          <p
            className="
            text-sm
            font-semibold
            uppercase
            tracking-[0.2em]
            text-orange-500
            "
          >
            Update Experience
          </p>

          <h1
            className="
            text-4xl
            md:text-5xl
            font-bold
            text-gray-900
            mt-3
            "
          >
            Edit Review
          </h1>

          <p
            className="
            text-gray-500
            mt-4
            text-base
            md:text-lg
            "
          >
            Improve your review and keep your experience updated.
          </p>

        </div>



        {/* CARD */}
        <div
          className="
          bg-white
          border
          border-gray-100
          rounded-[32px]
          shadow-sm
          overflow-hidden
          "
        >

          <form
            onSubmit={handleSubmit}
            className="
            p-6
            md:p-10
            space-y-8
            "
          >

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
                Rating
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
                      text-[34px]
                      transition

                      ${
                        star <= rating
                          ? "text-orange-500 fill-orange-500"
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
                text-sm
                font-semibold
                text-gray-700
                mb-3
                "
              >
                Your Review
              </label>

              <textarea
                rows="7"
                value={text}
                onChange={(e) =>
                  setText(e.target.value)
                }
                placeholder="
Share your updated experience...
                "
                required
                className="
                w-full
                bg-gray-50
                border
                border-gray-200
                rounded-3xl
                px-5
                py-5
                outline-none
                resize-none
                leading-relaxed
                transition
                focus:border-orange-400
                focus:ring-4
                focus:ring-orange-100
                "
              />

            </div>



            {/* IMAGE UPLOAD */}
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
                Update Photos
              </label>

              <label
                className="
                flex
                flex-col
                items-center
                justify-center
                border-2
                border-dashed
                border-gray-200
                rounded-[28px]
                py-14
                px-6
                cursor-pointer
                hover:bg-orange-50/40
                hover:border-orange-300
                transition
                "
              >

                <div
                  className="
                  w-16
                  h-16
                  rounded-full
                  bg-orange-100
                  flex
                  items-center
                  justify-center
                  "
                >

                  <FiUpload
                    className="
                    text-2xl
                    text-orange-500
                    "
                  />

                </div>

                <p
                  className="
                  mt-5
                  font-semibold
                  text-gray-800
                  "
                >
                  {
                    uploading
                      ? "Uploading photos..."
                      : "Upload More Photos"
                  }
                </p>

                <p
                  className="
                  text-sm
                  text-gray-500
                  mt-2
                  "
                >
                  PNG, JPG, WEBP supported
                </p>

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
                    mb-4
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
                      Review Photos
                    </h3>

                  </div>



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
                        className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        bg-gray-100
                        "
                      >

                        <img
                          src={photo}
                          alt="review"
                          className="
                          w-full
                          h-44
                          object-cover
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
                          top-3
                          right-3
                          bg-black/80
                          hover:bg-black
                          text-white
                          p-2
                          rounded-full
                          transition
                          "
                        >

                          <FiX />

                        </button>

                      </div>

                    ))}

                  </div>

                </div>

              )
            }



            {/* SUBMIT */}
            <button
              disabled={submitting}
              className="
              w-full
              bg-orange-500
              hover:bg-orange-600
              disabled:opacity-70
              text-white
              py-4
              rounded-full
              font-semibold
              text-lg
              transition
              shadow-sm
              "
            >

              {
                submitting
                  ? "Updating Review..."
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