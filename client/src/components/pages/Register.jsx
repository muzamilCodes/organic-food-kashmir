import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setloading] = useState(false)

  const navigate = useNavigate();

  const formBody = {
    username,
    email,
    password,
  };

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      setloading(true)

      const res = await axiosInstance.post("/user/register", formBody); // network api call

      if (res.status === 201) {
        toast.success(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        if ([400, 401, 403, 500].includes(error.response.status)) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Network Error!");
      }
    }finally{
      setTimeout(() => {
        setloading(false)
      }, 3000);
    }
  };

  return (
    <div className="register_container container mt-5 p-4 w-100">
      <form>
        <p className="text-success h4 mb-3"> Register With Us </p>

        <div className="mb-3">
          <label className="mb-2">
            Username <span className="text-danger">*</span>
          </label>
          <input
            onChange={(event) => {
              setusername(event.target.value);
            }}
            className="form-control"
            placeholder="your username goes here"
            type="text"
            value={username}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">
            Email <span className="text-danger">*</span>
          </label>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="form-control"
            placeholder="your Email goes here"
            type="email"
            value={email}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">
            {" "}
            password <span className="text-danger">*</span>
          </label>
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="form-control"
            placeholder="your password goes here"
            type="password"
            value={password}
          />
        </div>

        <p>
          Already an existing user. Go to the <Link to={"/login"}>
            login
          </Link>
        </p>
        <button
          type="submit"
          className="btn btn-outline-success"
          onClick={(event) => {
            handleRegister(event);
          }}
          disabled = {loading}
        >
        { loading ? "Loading......" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
