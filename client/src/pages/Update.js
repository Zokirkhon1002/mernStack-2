import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Update = ({ handleLoader }) => {
  const [data, setData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/${id}`);
        const { title, image, description } = data.travel;
        setData({ title, image, description });
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(() => {
      fetchData();
    },100)
    
  }, [id]);

  const { title, image, description } = data;

  const hanleUpdate = async (e) => {
    handleLoader(true);
    try {
      e.preventDefault();
      await axios.put(`${process.env.REACT_APP_URL}/${id}`, data);

      setData({
        title: "",
        image: "",
        description: "",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      handleLoader(false);
    }
  };

  return (
    <form onSubmit={hanleUpdate}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          onChange={(e) => setData({ ...data, title: e.target.value })}
          value={title}
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
          onChange={(e) => setData({ ...data, description: e.target.value })}
          value={description}
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
          onChange={(e) => setData({ ...data, image: e.target.value })}
          value={image}
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

export default Update;
