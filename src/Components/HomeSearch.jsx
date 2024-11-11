import React, { useEffect } from "react";
import Logo from "../assets/wp8733088.png";
import BGM from "../assets/bgm.mp3";

const HomeSearch = () => {
    
  useEffect(() => {
    const audio = document.getElementById("bgm");
    if (audio) {
      audio.volume = 0.3; // Set volume to 30%
      audio.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []); // Empty dependency array to run only on page load

  return (
    <>
      <section className="search-section">
        <div className="search-container">
          <div className="search-row">
            <h1 className="search-title">
              Find the music that you like the most
            </h1>
            <h3 className="search-subtitle">
              Let's decide what type of music for you of the day
            </h3>
            <div className="input-box">
              <form className="input-submit" id="searchForm">
                <input
                  type="text"
                  required
                  className="searchInput"
                  id="searchInput"
                  placeholder="Search by Song name, artist, album or title"
                />
                <div className="btn-search">
                  <button type="submit" className="btn" id="searchButton">
                    <span className="gray">Search</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="img-wrapper">
              <img className="search-img" src={Logo} alt="" />
            </div>
          </div>
        </div>
        <div>
          <audio id="bgm" src={BGM} autoPlay></audio>
        </div>
      </section>
    </>
  );
};

export default HomeSearch;


