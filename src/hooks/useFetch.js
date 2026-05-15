import { useEffect, useState } from "react";

import API from "../services/api";



function useFetch(endpoint) {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true);



        /*
        =========================
        GET TOKEN
        =========================
        */

        const token =
          localStorage.getItem("token");



        /*
        =========================
        REQUEST
        =========================
        */

        const response = await API.get(

          endpoint,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );



        setData(response.data);

      } catch (err) {

        console.log(err);

        setError("Something went wrong");

      } finally {

        setLoading(false);

      }

    };



    fetchData();

  }, [endpoint]);



  return {

    data,
    loading,
    error

  };

}

export default useFetch;