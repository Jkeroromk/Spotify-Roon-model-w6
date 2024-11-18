import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import getAccessToken from "../auth";
import axios from "axios";

const Songinfo = ({ song: propSong, playlist, onAddOrRemoveFromPlaylist }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Avoid redeclaring `song` by renaming it as `fetchedSong`
  const { song: fetchedSong } = location.state || {};

  // Use `propSong` (from props) or `fetchedSong` (from location.state)
  const song = propSong || fetchedSong;

  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promptMessage, setPromptMessage] = useState(""); // For the prompt message

  // Function to calculate the limit based on screen size
  const calculateLimit = () => {
    const screenWidth = window.innerWidth;

    // Calculate items per row based on screen width
    const itemsPerRow =
      screenWidth > 1200
        ? 5
        : screenWidth > 992
        ? 4
        : screenWidth > 768
        ? 3
        : 2;

    // Maximum of 2 rows
    const maxRows = 2;

    // Total items to fetch
    return itemsPerRow * maxRows;
  };

  useEffect(() => {
    if (!song) return;

    const fetchRecommendedSongs = async () => {
      try {
        setLoading(true);

        // Get access token
        const token = await getAccessToken();
        if (!token) {
          console.error("No access token available.");
          return;
        }

        // Calculate limit based on screen size
        const limit = calculateLimit();

        // Fetch recommended songs using the access token
        const response = await axios.get(
          "https://api.spotify.com/v1/recommendations",
          {
            params: {
              seed_tracks: song.id,
              limit, // Use the calculated limit
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Filter out the current song from the recommended songs
        const filteredSongs = response.data.tracks.filter(
          (track) => track.id !== song.id
        );
        setRecommendedSongs(filteredSongs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommended songs", error);
        setLoading(false);
      }
    };

    fetchRecommendedSongs();
  }, [song]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddOrRemoveFromPlaylist = () => {
    // Toggle the song in the playlist
    onAddOrRemoveFromPlaylist(song);
  
    // Show a prompt message after adding/removing
    const message = playlist.some((item) => item.id === song.id)
      ? "Added the song to the playlist"
      : "Removed the song from the playlist";
  
    setPromptMessage(message);
  
    // Clear the prompt message after 2 seconds
    setTimeout(() => {
      setPromptMessage("");
    }, 2000);
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
      {promptMessage && (
        <div className="prompt-message">
          <p>{promptMessage}</p>
        </div>
      )}

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

          <div className="song-info-user-action">
            {preview_url ? (
              <audio controls className="audio-player">
                <source src={preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <h3 className="no-preview">No preview available</h3>
            )}

            <button
              className={`check-btn ${playlist.some((item) => item.id === song.id) ? "btn-green" : ""}`}
              onClick={handleAddOrRemoveFromPlaylist}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-square-check"
                className="check-mark"
              />
            </button>
          </div>
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
          ) : recommendedSongs.length > 0 ? (
            recommendedSongs.map((track) => (
              <div
                key={track.id}
                className="recommended-song"
                onClick={() => navigate("/song-info", { state: { song: track } })}
              >
                <img
                  src={track.album.images[0]?.url}
                  alt={`Album cover of ${track.album.name}`}
                  className="recommended-song-img"
                />
                <div className="recommended-song-info">
                  <h4>{track.name}</h4>
                  <h5>
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </h5>
                </div>
              </div>
            ))
          ) : (
            <h5>No recommendations available</h5>
          )}
        </div>
      </div>
    </section>
  );
};

export default Songinfo;
