// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://spyne-assignment-3.onrender.com/api", // Adjust to your server's base URL
  withCredentials: true,
});

export default api;
