import React from "react";
import { useLocation } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Songinfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { song } = location.state || {}; 

  // If no song data is found, display a message
  if (!song) {
    return <div>No song data available</div>;
  }

  const { album, name, artists, duration_ms, preview_url } = song;

 
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
  const formattedDuration = `${minutes}:${seconds.padStart(2, "0")}`;

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <section className="song-info-section">
      <div className="song-info-header">
        <button onClick={handleBackClick} className="song-info-back">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          <h3>Back</h3>
        </button>
      </div>
      <div className="sepre"></div>
      {/* Song information */}
      <div className="song-info-container">
        <div className="song-info-left-row">
          <img
            src={album.images[0]?.url}
            alt={`Album cover of ${album.name}`}
            className="song-info-img"
          />
        </div>

        <div className="song-info-right-row">
          <h2>{name}</h2>
          <h4>{artists[0]?.name}</h4>
          <h4>Duration: {formattedDuration}</h4>
          
          {/* Preview audio */}
          {preview_url ? (
            <audio controls>
              <source src={preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <h4>No preview available</h4>
          )}
        </div>
      </div>

      {/* Recommended Songs (optional section for additional recommendations) */}
      <div className="song-info-recommend">
        <h3>Songs You Might Like</h3>
        <div className="sepre"></div>
        {/* Implement recommended songs here if needed */}
      </div>
    </section>
  );
};

export default Songinfo;

