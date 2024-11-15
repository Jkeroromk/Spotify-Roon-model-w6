import React from 'react';
import '../index.css';
import { useState } from 'react';

const User = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="search-container">
      <div className="search-row">
        <h1 className="search-title">
          Welcome Back
        </h1>
        <h4 className="search-subtitle">
          Need to log in first
        </h4>
        <form className="user-form">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              className="form-input"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-button"
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" className="submit-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default User;
