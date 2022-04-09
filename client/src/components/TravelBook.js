import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const TravelBook = () => {
  const [travelBook, setTravelBook] = useState([]);
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(process.env.REACT_APP_URL);
      setTravelBook(data.travels);
      setIsLoading(false);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    },100)
    
  }, []);

  const handleDeleteById = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await axios.delete(`${process.env.REACT_APP_URL}/${id}`);

      setId("");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const forScrollingTillTheEnd = useRef();

  useEffect(() => {
    if (forScrollingTillTheEnd.current) {
      forScrollingTillTheEnd.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        travelBook?.map(({ _id, title, image, description }) => (
          <div
            ref={forScrollingTillTheEnd}
            key={_id}
            className="card mb-3 mt-3"
          >
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <div className="d-flex justify-content-start">
                <Link className="btn btn-primary" to={`/update/${_id}`}>
                  Update
                </Link>
                <form onSubmit={handleDeleteById}>
                  <button
                    type="submit"
                    className="btn btn-danger mx-2"
                    onClick={() => setId(_id)}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TravelBook;
