// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Adjust to your server's base URL
  withCredentials: true,
});

export default api;
