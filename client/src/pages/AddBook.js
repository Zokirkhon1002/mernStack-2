import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = ({ handleLoader }) => {
  const [data, setData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleGetTextAndSetText = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newData = { ...data };
    newData[fieldName] = fieldValue;

    setData(newData);
  };

  const handleSubmit = async (e) => {
    handleLoader(true);
    try {
      e.preventDefault();
      await axios.post(`${process.env.REACT_APP_URL}/add`, data);
      setData({
        title: "",
        image: "",
        description: "",
      });
      setTimeout(() => {
        navigate("/");
      },100)
    } catch (err) {
      console.log(err);
    } finally {
      handleLoader(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          onChange={handleGetTextAndSetText}
          type="text"
          className="form-control"
          id="title"
          aria-describedby="emailHelp"
          name="title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          onChange={handleGetTextAndSetText}
          type="text"
          className="form-control"
          id="description"
          name="description"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image URL
        </label>
        <input
          onChange={handleGetTextAndSetText}
          type="text"
          className="form-control"
          id="image"
          name="image"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddBook;
