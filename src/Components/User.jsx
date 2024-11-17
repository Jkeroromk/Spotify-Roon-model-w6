import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import getAccessToken from "../auth";
import axios from "axios";

const Songinfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { song } = location.state || {}; // Get song info from the location state

  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSongClicked, setIsSongClicked] = useState(false); // Track if a song is clicked
  const [numRecommendations, setNumRecommendations] = useState(5); // Default to 5

  // Update recommendations count based on window width
  const updateRecommendationsCount = () => {
    const width = window.innerWidth;
    if (width < 600) {
      setNumRecommendations(4); // Very small screen, show 4 songs per row
    } else if (width >= 600 && width < 900) {
      setNumRecommendations(6); // Small screen, show 6 songs per row
    } else if (width >= 900 && width < 1200) {
      setNumRecommendations(8); // Medium screen, show 8 songs per row
    } else {
      setNumRecommendations(10); // Large screen, show 10 songs per row
    }
  };

  // Fetch recommended songs based on the current song
  useEffect(() => {
    updateRecommendationsCount(); // Update recommendations count on initial load
    window.addEventListener("resize", updateRecommendationsCount); // Add resize event listener

    if (!song) return;

    const fetchRecommendedSongs = async () => {
      try {
        setLoading(true); // Set loading to true
        const token = await getAccessToken();
        if (!token) {
          console.error("No access token available.");
          return;
        }

        const response = await axios.get("https://api.spotify.com/v1/recommendations", {
          params: {
            seed_tracks: song.id, // Use the current song ID as a seed
            limit: 20, // Fetch more songs than needed (we'll filter based on count)
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter out the current song from the recommended songs
        const filteredSongs = response.data.tracks.filter(track => track.id !== song.id);
        setRecommendedSongs(filteredSongs);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching recommended songs", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchRecommendedSongs();

    return () => {
      window.removeEventListener("resize", updateRecommendationsCount); // Clean up event listener
    };
  }, [song]);

  // Handle back navigation
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Handle song click for further details
  const handleRecommendationClick = (selectedSong) => {
    setIsSongClicked(true); // Set the song clicked state to true
    setTimeout(() => {
      navigate("/song-info", { state: { song: selectedSong } }); // Navigate to the song info page
      setIsSongClicked(false); // Reset the clicked state after navigation
    }, 1000); // Show a loading spinner for 1 second before navigating
  };

  if (!song) {
    return <div>No song data available</div>;
  }

  const { album, name, artists, duration_ms, preview_url } = song;
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
  const formattedDuration = `${minutes}:${seconds.padStart(2, "0")}`;

  return (
    <section className="song-info-section">
      {isSongClicked && (
        <div className="spinner-container">
          <div id="songs-loading">
            <FontAwesomeIcon icon="fa-solid fa-hourglass-half" className="songs-loading-spinner" />
          </div>
        </div>
      )}

      {!isSongClicked && (
        <>
          <div className="song-info-header">
            <button onClick={handleBackClick} className="song-info-back">
              <FontAwesomeIcon icon={faArrowLeft} />
              <h3>Back</h3>
            </button>
          </div>

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
              <h4 className="artist">{artists[0]?.name}</h4>
              <h4>Album: {album.name}</h4>
              <h4>Duration: {formattedDuration}</h4>

              {preview_url ? (
                <audio controls className="audio-player">
                  <source src={preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <h4>No preview available</h4>
              )}
            </div>
          </div>

          <div className="sepre"></div>
          <div className="song-info-recommend">
            <h2>Songs You Might Like</h2>
            <div className="recommended-songs">
              {loading ? (
                <div id="songs-loading">
                  <FontAwesomeIcon
                    icon="fa-solid fa-hourglass-half"
                    className="fa-solid fa-hourglass-half songs-loading-spinner"
                  />
                </div>
              ) : (
                recommendedSongs.slice(0, numRecommendations).map((track) => (
                  <div
                    key={track.id}
                    className="recommended-song"
                    onClick={() => handleRecommendationClick(track)}
                  >
                    <img
                      src={track.album.images[0]?.url}
                      alt={`Album cover of ${track.album.name}`}
                      className="recommended-song-img"
                    />
                    <div className="recommended-song-info">
                      <h4>{track.name}</h4> {/* Scrolling title */}
                      <p>{track.artists.map(artist => artist.name).join(", ")}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Songinfo;
