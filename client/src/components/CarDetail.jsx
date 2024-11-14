import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../css/carDetail.css";

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await api.get(`/car/${id}`);
      setCar(data);
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    await api.delete(`/car/${id}`);
    navigate("/cars");
  };

  return (
    <div className="car-detail-container">
      <h2 className="car-title">{car.title}</h2>
      {car.images && car.images.length > 0 && (
        <div className="car-image-container">
          <img src={car.images[0]} alt={car.title} className="car-image" />
        </div>
      )}
      <p className="car-description">{car.description}</p>
      <div className="button-group">
        <button
          className="edit-button"
          onClick={() => navigate(`/cars/edit/${id}`)}
        >
          Edit
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default CarDetail;
