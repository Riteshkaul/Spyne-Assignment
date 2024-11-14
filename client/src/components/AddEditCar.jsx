import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "../css/AddEditCar.css";
function AddEditCar() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // To hold current images for editing
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        const { data } = await api.get(`/car/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setTags(data.tags.join(", "));
        setExistingImages(data.images); // Load existing images
      };
      fetchCar();
    }
  }, [id]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    images.forEach((image) => formData.append("images", image));

    try {
      if (id) {
        await api.put(`/car/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/car", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/cars");
    } catch (error) {
      console.error("Error saving car:", error);
      alert("Failed to save car. Please try again.");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Car" : "Add New Car"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Display existing images */}
        {existingImages.length > 0 && (
          <div className="existing-images">
            <h3>Current Images:</h3>
            {existingImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Current image ${index + 1}`}
                className="car-image"
                style={{ width: "100px", height: "auto", margin: "5px" }}
              />
            ))}
          </div>
        )}

        {/* Upload new images */}
        <input type="file" multiple onChange={handleImageChange} />

        <button type="submit">{id ? "Update Car" : "Add Car"}</button>
      </form>
    </div>
  );
}

export default AddEditCar;
