import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/signup", { username, email, password });
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="input-field"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="input-field"
      />
      <button type="submit" className="submit-button">
        Sign Up
      </button>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="login-button">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
