import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password, navigate }));
  };

  return (
    <div className="register_container container mt-5 p-4 w-100">
      <form>
        <p className="text-success h4 mb-3"> Login With Us </p>

        <div className="mb-3">
          <label className="mb-2">
            Email <span className="text-danger">*</span>
          </label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            className="form-control"
            placeholder="your Email goes here"
            type="email"
            value={email}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">
            password <span className="text-danger">*</span>
          </label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            placeholder="your password goes here"
            type="password"
            value={password}
          />
        </div>

        <p>
          If u are not registered Go to the
          <Link to={"/register"}> Register </Link>
        </p>
        <button
          type="submit"
          className="btn btn-outline-success"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Loading...." : "Login"}
        </button>
        <Link
          to="/forgot/password"
          className="btn btn-outline-primary ms-3"
          style={{ textDecoration: 'none' }}
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default Login;
