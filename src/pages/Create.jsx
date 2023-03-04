import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Create = () => {
  const [error, setError] = useState(null);
  const [contact, setContact] = useState({
    name: "",
    number: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/contact/create`,
        contact,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      console.log(data);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="text-center my-4">
      <h1>Create new Contact</h1>
      <form
        action=""
        className="form-control d-flex flex-column w-25 p-2 mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter name"
          className="form-control my-3"
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="enter contact number"
          onChange={(e) =>
            setContact({ ...contact, number: Number(e.target.value) })
          }
        />
        <button
          className="form-control btn btn-primary w-25 mx-auto"
          type="submit"
        >
          Create
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Create;
