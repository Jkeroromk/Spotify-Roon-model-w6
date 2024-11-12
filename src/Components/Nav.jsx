import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import BGM from "../assets/bgm.mp3";

const Nav = () => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark theme

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.muted = false; // Unmute the audio
      audioRef.current.play(); // Start playing music
      setIsPlaying(true); // Ensure state reflects that music is playing
      setAnimate(true); // Start animation when audio starts
    } document.body.classList.add(isDarkMode ? 'dark-theme' : 'light-theme');

    // Clean up the theme class when the component is unmounted
    return () => {
      document.body.classList.remove('dark-theme', 'light-theme');
    };
  }, [isDarkMode]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setAnimate(false); // Stop animation when audio stops
      } else {
        audioRef.current.play();
        setAnimate(true); // Start animation when audio starts
      }
      setIsPlaying(!isPlaying); // Toggle the state based on whether it's currently playing
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle between dark and light mode
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
            <li className="nav-link"><a href="#" className="nav-link-anchor link-hover-effect link-hover-effect-black link-hover-effect--white no-cursor">Log in</a></li>
            <button className="btn_menu cursor-pointer" onClick={openMenu} ><FontAwesomeIcon icon="fa-solid fa-caret-down" /></button>
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
              <li className="menu_list"><a href="./song.html?featured=true" className="menu_link" onClick={CloseMenu}>Songs</a></li>
              <li className="menu_list"><a href="" className="menu_link no-cursor" onClick={CloseMenu} >Contact</a></li>
              <li className="menu_list"><a href="#" className="menu_link no-cursor" onClick={CloseMenu} >Login</a></li>
              <li className="menu_list"><a href="#" className="menu_link no-cursor menu_signup" onClick={CloseMenu} >Sign Up</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;



