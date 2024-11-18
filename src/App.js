import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Homepage from "./Pages/Homepage";
import FeaturedSongs from "./Pages/FeaturedSong";
import SearchSongs from "./Pages/SearchSong";
import MouseTrail from "./Components/MouseTrail";
import Login from "./Pages/Login";
import Songinfo from "./Pages/Songinfo";
import Playlist from "./Pages/Playlist";

function App() {
  // Initialize playlist state from localStorage if available
  const [playlist, setPlaylist] = useState(() => {
    const savedPlaylist = localStorage.getItem("playlist");
    return savedPlaylist ? JSON.parse(savedPlaylist) : [];
  });

  // Save playlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  const handleAddOrRemoveFromPlaylist = (song) => {
    setPlaylist((prevPlaylist) => {
      const updatedPlaylist = prevPlaylist.some((item) => item.id === song.id)
        ? prevPlaylist.filter((item) => item.id !== song.id) // Remove song if it exists
        : [...prevPlaylist, song]; // Add song if it doesn't exist

      console.log("Updated Playlist:", updatedPlaylist);
      return updatedPlaylist;
    });
  };

  const onRemoveFromPlaylist = (song) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((item) => item.id !== song.id));
  };


  return (
    <Router>
      <div className="Landing-page">
        <MouseTrail />
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/featuredsongs" element={<FeaturedSongs />} />
          <Route path="/searchsongs" element={<SearchSongs />} />
          <Route path="/log-in" element={<Login />} />
          <Route
            path="/song-info"
            element={
              <Songinfo
                playlist={playlist}
                onAddOrRemoveFromPlaylist={handleAddOrRemoveFromPlaylist}
              />
            }
          />
          <Route
            path="/myplaylist"
            element={<Playlist songs={playlist} onRemoveSong={onRemoveFromPlaylist} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
