import React, { useState } from "react";
import api from "../api"; // Import the axios instance
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    // Check if the selected images exceed the 10-image limit
    if (selectedImages.length > 10) {
      alert("You can only upload up to 10 images.");
    } else {
      setImages(selectedImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await api.post("/car", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Content type for file uploads
        },
      });

      if (response.data) {
        navigate("/cars");
        alert("Car added successfully!");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Add Car</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          accept="image/*"
        />
        <p>{images.length} / 10 images selected</p>
        <button type="submit" disabled={images.length > 10}>
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
