import React, { useState } from "react";
import Logo from "../assets/wp8733088.png";
import { useNavigate } from "react-router-dom";

const HomeSearch = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const navigate = useNavigate(); // Get the navigate function

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      // Navigate to the FeaturedSongs page and pass the search query in the URL
      navigate(`/searchsongs?search=${searchQuery}`);
    }
  };

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
              <form className="input-submit" id="searchForm" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  required
                  className="searchInput"
                  id="searchInput"
                  placeholder="Search by Song name, artist, album or title"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query
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
      </section>
    </>
  );
};

export default HomeSearch;




