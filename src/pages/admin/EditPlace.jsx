import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import API from "../../services/api";

import { useAuth }
from "../../context/AuthContext";



function EditPlace() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();



  const [formData, setFormData] =
    useState({

      name: "",
      category: "",
      description: "",
      location: "",
      photos: []

    });



  /*
  =========================
  FETCH PLACE
  =========================
  */

  useEffect(() => {

    const fetchPlace = async () => {

      try {

        const res = await API.get(
          `/places/${id}`
        );

        setFormData(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchPlace();

  }, [id]);




  /*
  =========================
  INPUT CHANGE
  =========================
  */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };




  /*
  =========================
  UPDATE PLACE
  =========================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await API.put(

          `/places/${id}`,

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert("Place updated");

        navigate("/admin/places");

      } catch (error) {

        console.log(error);

      }

    };



  return (

    <MainLayout>

      <div
        className="
        max-w-3xl
        mx-auto
        mt-10
        bg-white
        p-8
        rounded-3xl
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-8
          "
        >
          Edit Place
        </h1>



        <form
          onSubmit={handleSubmit}
          className="
          flex
          flex-col
          gap-5
          "
        >

          <input
            type="text"
            name="name"
            placeholder="Place name"
            value={formData.name}
            onChange={handleChange}
            className="
            border
            p-4
            rounded-2xl
            "
          />



          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="
            border
            p-4
            rounded-2xl
            "
          />



          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="
            border
            p-4
            rounded-2xl
            "
          />



          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="
            border
            p-4
            rounded-2xl
            "
          />



          <button
            className="
            bg-black
            text-white
            py-4
            rounded-2xl
            "
          >
            Save Changes
          </button>

        </form>

      </div>

    </MainLayout>

  );

}

export default EditPlace;