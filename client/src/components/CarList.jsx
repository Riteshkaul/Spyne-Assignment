import React, { useState, useEffect } from "react";
import api from "../api";
import "../css/carList.css";
import { Link } from "react-router-dom";

function CarList() {
  const [allCars, setAllCars] = useState([]); // Store all cars fetched from the backend
  const [filteredCars, setFilteredCars] = useState([]); // Store cars filtered by search
  const [keyword, setKeyword] = useState(""); // Search keyword

  // Fetch all cars initially when the component mounts
  useEffect(() => {
    const loadCars = async () => {
      try {
        const { data } = await api.get("/car");
        console.log(data);
        setAllCars(data.cars); // Store all cars
        setFilteredCars(data.cars); // Initially, display all cars
      } catch (error) {
        console.error("Failed to load cars", error);
      }
    };
    loadCars();
  }, []);

  // Filter cars based on the search keyword
  useEffect(() => {
    if (!keyword) {
      setFilteredCars(allCars);
    } else {
      const filtered = allCars.filter((car) =>
        [car.title, car.description, car.tags.join(", ")].some((field) =>
          field.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      setFilteredCars(filtered);
    }
  }, [keyword, allCars]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="car-list-container">
      <h2>Your Cars</h2>
      <input
        type="text"
        placeholder="Search by title, description, or tags..."
        value={keyword}
        onChange={handleSearchChange}
      />
      <Link style={{ textDecoration: "none" }} to="/cars/add">
        Add New Car
      </Link>
      <div>
        {filteredCars.map((car) => (
          <Link style={{ textDecoration: "none" }} to={`/cars/${car._id}`}>
            <div key={car._id} className="car-card">
              <h3>{car.title}</h3>
              <p>{car.description}</p>
              {car.tags && <p className="tags">Tags: {car.tags.join(", ")}</p>}

              {/* Display all images of the car */}
              {car.images.length > 0 && (
                <div className="car-images">
                  {car.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${car.title} - ${index + 1}`}
                      className="car-image"
                    />
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CarList;
