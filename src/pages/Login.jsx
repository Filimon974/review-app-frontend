import { useState, useRef } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import API from "../services/api";

import {
  useAuth
} from "../context/AuthContext";



function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();



  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const emailRef = useRef();
const passwordRef = useRef();

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        const response =
          await API.post(
            "/auth/login",
            {
              email,
              password
            }
          );

        login(response.data);

        if (response.data.role === "admin") {

  navigate("/admin");

} else {

  navigate("/");

}

      } catch (err) {

        setError(
          err.response?.data?.message ||
          "Login failed"
        );

      } finally {

        setLoading(false);

      }

    };



  return (

    <MainLayout>

      <div
        className="
        min-h-[80vh]
        flex
        items-center
        justify-center
        "
      >

        <form

          onSubmit={handleSubmit}

          className="
          bg-white
          p-8
          rounded-3xl
          shadow-sm
          w-full
          max-w-md
          "
        >

          <h1
            className="
            text-4xl
            font-bold
            text-center
            "
          >
            Login
          </h1>



          {error && (

            <div
              className="
              bg-red-100
              text-red-500
              p-3
              rounded-xl
              mt-5
              "
            >
              {error}
            </div>

          )}



          {/* EMAIL */}
          <input

            ref={emailRef}
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  }}

            className="
            w-full
            mt-6
            p-4
            rounded-2xl
            border
            outline-none
            "
          />



          {/* PASSWORD */}
          <input

            ref={passwordRef}
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  }}

            className="
            w-full
            mt-4
            p-4
            rounded-2xl
            border
            outline-none
            "
          />



          {/* BUTTON */}
          <button

            disabled={loading}

            className="
            w-full
            mt-6
            bg-black
            text-white
            p-4
            rounded-2xl
            font-semibold
            "
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>



          <p
            className="
            text-center
            mt-5
            text-gray-500
            "
          >

            No account?

            <Link
              to="/register"
              className="
              text-black
              font-semibold
              ml-2
              "
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </MainLayout>

  );

}

export default Login;