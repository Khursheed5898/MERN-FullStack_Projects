import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";
import "../styles/Auth.css";

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    try {
      let response;
      if (isLogin) {
        response = await loginUser(email, password);
      } else {
        response = await registerUser(username, email, password);
      }

      if (typeof response.data === "string" && (response.data.includes("<!doctype html>") || response.data.includes("<html"))) {
        throw new Error("Configuration Error: Frontend received HTML instead of API response. Please set VITE_API_BASE_URL to your Render backend URL.");
      }

      const token = response.data?.token;
      if (!token) {
        throw new Error("Invalid response from server: No authentication token received.");
      }

      const userData =
        response.data.user ||
        response.data.userData || {
          username: username || email.split("@")[0],
          email: email,
        };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      onLogin(userData);
      navigate("/");
    } catch (err) {
      console.error("Auth Error Full Details:", err, err.response);
      let serverError = "";

      if (err.response?.data?.message) {
        serverError = err.response.data.message;
      } else if (err.response?.data?.error) {
        serverError = err.response.data.error;
      } else if (typeof err.response?.data === "string" && err.response.data.includes("ECONNREFUSED")) {
        serverError = "Backend server is offline (ECONNREFUSED at port 5000). Please start your backend server.";
      } else if (typeof err.response?.data === "string" && (err.response.data.includes("<!doctype html>") || err.response.data.includes("<html"))) {
        serverError = `Configuration Error: Received HTML instead of API response (${err.response.status}). Check VITE_API_BASE_URL on Vercel.`;
      } else if (err.response?.status === 404) {
        serverError = `API Route Not Found (404). Backend service is not reachable at: ${err.config?.url || 'endpoint'}`;
      } else if (err.response?.status === 502 || err.response?.status === 503) {
        serverError = `Render Backend is waking up (Status ${err.response.status}). Free tier servers take ~45-60s to boot. Please retry in a moment.`;
      } else if (err.response?.status === 500) {
        const bodyText = typeof err.response?.data === 'string' ? err.response.data.slice(0, 80) : '';
        serverError = `Backend Server Error (500)${bodyText ? ': ' + bodyText : '. Check backend server logs.'}`;
      } else if (err.message && err.message.includes("Network Error")) {
        serverError = "Network Error: Cannot connect to backend server. Make sure the backend on Render/Local is running and reachable.";
      } else if (err.message) {
        serverError = err.message;
      } else {
        serverError = "Unknown error occurred. Please check browser console for details.";
      }
      setError(serverError);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card-wrapper">
        <Link to="/" className="auth-back-home">
          <span className="auth-back-arrow">←</span>
          BACK TO HOME
        </Link>

        <div className={`auth-card fade-in ${!isLogin ? "signup-mode" : ""}`}>
        <Link to="/" className="auth-logo">
          DiBot.AI✨
        </Link>

        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Login to continue your debate practice."
              : "Create your account to start debating with DiBot.AI."}
          </p>
          {error && <div className="error-alert">{error}</div>}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group fade-in">
              <label>Full Name</label>
              <input
                type="text"
                name="username"
                placeholder="Your Name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

          <div className="auth-footer">
            {isLogin ? (
              <>
                Don't have an account?
                <button onClick={() => setIsLogin(false)}>Register</button>
              </>
            ) : (
              <>
                Already have an account?
                <button onClick={() => setIsLogin(true)}>Login</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
