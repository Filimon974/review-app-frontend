import { useState } from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import useFetch
from "../../hooks/useFetch";

import API
from "../../services/api";

import { useAuth }
from "../../context/AuthContext";



function AdminTags() {

  const { token } = useAuth();

  const {
    data: tags
  } = useFetch("/tags");

  const [name, setName] =
    useState("");



  /*
  =========================
  CREATE TAG
  =========================
  */

  const handleCreate =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(

          "/tags",

          { name },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        window.location.reload();

      } catch (error) {

        console.log(error);

      }

    };




  /*
  =========================
  DELETE TAG
  =========================
  */

  const handleDelete =
    async (id) => {

      try {

        await API.delete(

          `/tags/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        window.location.reload();

      } catch (error) {

        console.log(error);

      }

    };



  return (

    <AdminLayout>

      <h1
        className="
        text-4xl
        font-bold
        "
      >
        Tags
      </h1>



      {/* FORM */}
      <form
        onSubmit={handleCreate}
        className="
        bg-white
        rounded-3xl
        p-6
        mt-8
        flex
        gap-4
        "
      >

        <input
          type="text"
          placeholder="Tag name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="
          flex-1
          border
          rounded-2xl
          p-4
          "
        />



        <button
          className="
          bg-black
          text-white
          px-6
          rounded-2xl
          "
        >
          Create
        </button>

      </form>



      {/* TAG LIST */}
      <div
        className="
        flex
        flex-wrap
        gap-4
        mt-10
        "
      >

        {tags?.map(tag => (

          <div
            key={tag._id}
            className="
            bg-white
            px-5
            py-3
            rounded-full
            flex
            items-center
            gap-4
            "
          >

            <span>
              {tag.name}
            </span>



            <button
              onClick={() =>
                handleDelete(
                  tag._id
                )
              }
              className="
              text-red-500
              "
            >
              ✕
            </button>

          </div>

        ))}

      </div>

    </AdminLayout>

  );

}

export default AdminTags;