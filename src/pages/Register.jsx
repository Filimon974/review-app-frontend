import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const usernameRef = useRef();
const emailRef = useRef();
const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      // 2. Sending username in the API payload
      await API.post("/auth/register", {
        username,
        email,
        password
      });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed"
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
            Register
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

          {/* 3. Updated input field for Username */}
          <input
  ref={usernameRef}
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) =>
    setUsername(e.target.value)
  }
  onKeyDown={(e) => {

    if (e.key === "Enter") {

      e.preventDefault();

      emailRef.current.focus();

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
  mt-4
  p-4
  rounded-2xl
  border
  outline-none
  "
/>

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

      handleSubmit(e);

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
                : "Register"
            }

          </button>


          <p
            className="
            text-center
            mt-5
            text-gray-500
            "
          >
            Already have an account?
            <Link
              to="/login"
              className="
              text-black
              font-semibold
              ml-2
              "
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </MainLayout>
  );
}

export default Register;
