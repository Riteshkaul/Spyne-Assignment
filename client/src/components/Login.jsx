import React, { useContext, useState } from "react";
import api from "../api";
import AuthContext from "../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      navigate("/cars");
      login(response.data.token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Login</h2>
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
        Login
      </button>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="login-button">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default Login;
