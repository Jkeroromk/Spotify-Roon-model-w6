import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BGM from "../assets/bgm.mp3";

const Nav = () => {
  const audioRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark theme
  const [isAudioAllowed, setIsAudioAllowed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state from localStorage on initial mount and on any changes to localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setIsDarkMode(savedTheme === "dark");
    document.body.classList.add(savedTheme === "dark" ? "dark-theme" : "light-theme");

    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Listen for changes in localStorage to update the login state
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem("loggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      document.body.classList.remove("dark-theme", "light-theme");
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array to only run on mount

  // Listen for changes to location (for updating audio and theme)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.muted = false; // Unmute the audio
      if (isAudioAllowed) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
        setAnimate(true);
      }
    }
  }, [isAudioAllowed]);

  useEffect(() => {
    const currentPath = location.pathname;
    const shouldPauseAudio = currentPath === "/featuredsongs" || currentPath === "/searchsongs" || currentPath === "/log-in" || currentPath === "/song-info";

    if (shouldPauseAudio && isPlaying) {
      audioRef.current.pause();
      setAnimate(false);
      setIsPlaying(false);
      setIsAudioAllowed(false); // Disallow audio on specific routes
    } else if (!shouldPauseAudio && !isPlaying) {
      setIsAudioAllowed(true); // Allow audio on other routes
    }
  }, [location.pathname, isPlaying]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setAnimate(false);
      } else if (isAudioAllowed) {
        audioRef.current.play().catch(() => {});
        setAnimate(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(newTheme === 'dark' ? 'dark-theme' : 'light-theme');
    localStorage.setItem('theme', newTheme); // Save current theme to localStorage
  };

  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false"); // Set loggedIn flag to false
    setIsLoggedIn(false); // Update the state to reflect logged out status
    navigate("/"); // Redirect to login page
  };

  function openMenu() {
    document.body.classList.add("menu--open");
  }

  function CloseMenu() {
    document.body.classList.remove("menu--open");
  }

  return (
    <>
      <section id="Landing-page">
        <nav>
          <figure>
            <a href="/"><FontAwesomeIcon icon="fa-brands fa-spotify" className="spotify-logo" /></a>
          </figure>
          <ul className="nav-links-list">
            <li className="nav-link">
              <a href="#" onClick={toggleAudio}>
                <FontAwesomeIcon
                  icon="fa-solid fa-chart-simple"
                  className="chart-icon"
                  beatFade={animate}
                />
              </a>
            </li>
            <li className="nav-link"><a href="/featuredsongs" className="nav-link-anchor link-hover-effect link-hover-effect-black link-hover-effect--white">Find Featured Songs</a></li>
            {isLoggedIn ? (
              <>
                <li className="nav-link">
                  <a href="/myplaylist" className="nav-link-anchor link-hover-effect link-hover-effect-black link-hover-effect--white">
                    My Playlist
                  </a>
                </li>
                <li className="nav-link">
                  <button onClick={handleLogout} className="nav-link-anchor link-hover-effect link-hover-effect-black link-hover-effect--white log-out">
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-link">
                <a href="/log-in" className="nav-link-anchor link-hover-effect link-hover-effect-black link-hover-effect--white">
                  Log in
                </a>
              </li>
            )}
            <button className="btn_menu cursor-pointer" onClick={openMenu}><FontAwesomeIcon icon="fa-solid fa-caret-down" /></button>
            <li className="nav-link"><a href="#" onClick={toggleTheme}><FontAwesomeIcon icon="fa-solid fa-circle-half-stroke" spin /></a></li>
          </ul>
        </nav>
        <div>
          <audio ref={audioRef} src={BGM} autoPlay muted></audio>
        </div>
        <div className="menu_backdrop">
          <div className="menu_backdrop-container">
            <button className="btn_menu btn_menu--close" onClick={CloseMenu}>
              <FontAwesomeIcon icon="fa-solid fa-times" />
            </button>
            <ul className="menu_links">
              <li className="menu_list"><a href="https://jkeroromk.github.io/Advance-portfolio/" className="menu_link" onClick={CloseMenu} >About</a></li>
              <li className="menu_list"><a href="/featuredsongs" className="menu_link" onClick={CloseMenu}>Songs</a></li>
              <li className="menu_list"><a href="https://jkeroromk.github.io/Advance-portfolio/" className="menu_link no-cursor" onClick={CloseMenu} >Contact</a></li>
              {isLoggedIn ? (
                <>
                  <li className="menu_list"><a href="/myplaylist" className="menu_link" onClick={CloseMenu}>My Playlist</a></li>
                  <li className="menu_list"><button onClick={handleLogout} className="menu_link">Log Out</button></li>
                </>
              ) : (
                <li className="menu_list"><a href="/log-in" className="menu_link" onClick={CloseMenu}>Login</a></li>
              )}
              <li className="menu_list"><a href="#" className="menu_link no-cursor menu_signup" onClick={CloseMenu}>Sign Up</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;
