import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Playlist = ({ songs = [], onRemoveSong = () => {} }) => {
  // Format the song duration in minutes and seconds
  const formatDuration = (duration_ms) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  return (
    <section className="playlist-section">
      {/* Playlist Header Info */}
      <div className="playlist-info">
        <h1 className="playlist-title">My Playlist</h1>
        <h4 className="playlist-duration">Total Songs: {songs.length}</h4>
      </div>

      <div className="sepre"></div>

      {/* Column Headers */}
      <div className="playlist-header">
        <span>Cover</span>
        <span>Title</span>
        <span>Artist</span>
        <span>Album</span>
        <span>Duration</span>
        <span>Remove</span>
      </div>

      {/* If no songs, show empty message */}
      {songs.length === 0 ? (
        <div className="empty-playlist-message">
          <h5>No songs in the playlist yet.</h5>
        </div>
      ) : (
        <div className="playlist-list">
          {songs.map((song) => (
            <div key={song.id} className="playlist-row">
              {/* Song Cover Image */}
              <img
                src={song.album?.images?.[0]?.url}
                alt={song.name}
                className="playlist-image"
              />
              {/* Song Title */}
              <div className="scrolling-title">
                <span>{song.name}</span>
              </div>
              {/* Song Artist */}
              <p className="song-artist">{song.artists?.[0]?.name}</p>
              {/* Song Album */}
              <p className="song-album">{song.album?.name}</p>
              {/* Song Duration */}
              <p className="song-duration">{formatDuration(song.duration_ms)}</p>
              {/* Remove Song Icon */}
              <FontAwesomeIcon
                icon={faXmark}
                className="remove-icon"
                onClick={() => onRemoveSong(song)}
                title="Remove from playlist"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Playlist;
