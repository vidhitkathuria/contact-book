import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [email, setEmail] = useState("");

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleRegister = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/users/register`,
        user
      );

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup d-flex align-items-center mt-4">
      <div className="card w-25 mx-auto  p-4">
        <h1 className="text-center text-dark mb-4">SignUp</h1>
        <form action="" className="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              className="form-control"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              name="password"
              className="form-control"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </form>
        <div className="d-flex justify-content-between">
          <button onClick={handleRegister} className="btn btn-primary">
            SignUp
          </button>
          <div className="d-flex align-items-center">
            <span className="text-primary mx-2 fs-6">
              Already have an account?
            </span>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
