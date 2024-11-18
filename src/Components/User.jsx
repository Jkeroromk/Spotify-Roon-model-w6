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
  const [isLogin, setIsLogin] = useState(true); // Default to "Log In"
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
      navigate("/"); // Redirect to the home page after successful registration
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

      navigate("/");
      window.location.reload(); // Redirect to the home page
    } catch (error) {
      setLoading(false);

      // Handle specific errors
      if (error.code === "auth/user-not-found") {
        alert("You need to register first.");
        navigate("/register"); // Redirect to the registration page
      } else {
        alert(error.code === "auth/wrong-password" ? "Incorrect password. Please try again." : `Login failed: ${error.message}`);
      }
    }
  };

  const handleGuestLogin = () => {
    const guestCredentials = {
      email: "123@gmail.com",
      password: "123456",
    };
  
    // Set the loggedIn flag in localStorage
    localStorage.setItem("loggedIn", "true"); 
    localStorage.setItem("userType", "guest"); // Optional: Store user type as guest
  
    console.log("Logging in as guest with:", guestCredentials);
    alert("You are now logged in as a guest!");
  
    navigate("/"); // Redirect to home page after guest login
    window.location.reload();
  };
  

  return (
    <>
      {loading ? (
        <div id="songs-loading">
          <FontAwesomeIcon icon="fa-solid fa-hourglass-half" />
        </div>
      ) : (
        <div className="search-container">
          <div className="search-row">
            <h1 className="search-title">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h1>
            <h4 className="search-subtitle">
              {isLogin ? "Please Enter the info Below" : "Fill in the details to sign up"}
            </h4>
            <form
              className="user-form"
              onSubmit={isLogin ? handleSubmit : handleRegister}
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
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </form>

            <div className="signup-section">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)} // Toggle between Login and Sign Up
                className="toggle-signup-button"
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Log In"}
              </button>
              <div className="guest-btn">
                {!isLogin && (
                  <button
                    type="button"
                    onClick={handleGuestLogin}
                    className="toggle-signup-button"
                  >
                    Log in as Guest
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
