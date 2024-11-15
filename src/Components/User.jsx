import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebase"; // Import the initialized Firebase app
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const auth = getAuth(firebaseApp); // Use the initialized Firebase app

  // Check localStorage on component mount to set the login state
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      setIsLogin(true); // User is logged in
    } else {
      setIsLogin(false); // User is not logged in
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      alert("Registration Successful!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      alert("Registration failed: " + error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      // Attempt to sign in with provided email and password
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      alert("Login Successful!");
      localStorage.setItem("loggedIn", "true"); // Set loggedIn flag in localStorage
      
      navigate("/"); // Redirect to the home page
      window.location.reload();
    } catch (error) {
      setLoading(false);
  
      // Handle specific errors
      if (error.code === "auth/user-not-found") {
        alert("You need to register first.");
        navigate("/register"); // Redirect to the registration page
      } else {
        // Handle all other errors with a generic message
        alert(error.code === "auth/wrong-password" ? "Incorrect password. Please try again." : `Login failed: ${error.message}`);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div id="songs-loading">
          <FontAwesomeIcon
            icon="fa-solid fa-hourglass-half"
            className="fa-solid fa-hourglass-half"
          />
        </div>
      ) : (
        <div className="search-container">
          <div className="search-row">
            <h1 className="search-title">
              {isLogin ? "Create an Account" : "Welcome Back"}
            </h1>
            <h4 className="search-subtitle">
              {isLogin ? "Fill in the details to sign up" : "Please Enter the info Below"}
            </h4>
            <form
              className="user-form"
              onSubmit={isLogin ? handleRegister : handleSubmit}
            >
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password-button"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
              <button type="submit" className="submit-button">
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </form>
            <div className="signup-section">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)} // Toggle between Login and Sign Up
                className="toggle-signup-button"
              >
                {isLogin
                  ? "Already have an account? Log In"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;

