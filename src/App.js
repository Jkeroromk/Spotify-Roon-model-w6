import React, { useState } from "react";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import FeaturedSongs from "./Pages/FeaturedSong";
import SearchSongs from "./Pages/SearchSong";
import MouseTrail from "./Components/MouseTrail"; // Import MouseTrail
import Login from "./Pages/Login";
import Songinfo from "./Pages/Songinfo";
import Playlist from "./Pages/Playlist";

function App() {
  // Move playlist state here to manage it globally
  const [playlist, setPlaylist] = useState([]);

  // Function to add or remove songs from the playlist
  const handleAddOrRemoveFromPlaylist = (song) => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.some((item) => item.id === song.id)
        ? prevPlaylist.filter((item) => item.id !== song.id) // Remove song if it exists
        : [...prevPlaylist, song] // Add song if it doesn't exist
    );
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
          <Route path="/Log-in" element={<Login />} />
          <Route
            path="/song-info"
            element={<Songinfo playlist={playlist} onAddOrRemoveFromPlaylist={handleAddOrRemoveFromPlaylist} />}
          />
          <Route
            path="/myplaylist"
            element={<Playlist songs={playlist} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

