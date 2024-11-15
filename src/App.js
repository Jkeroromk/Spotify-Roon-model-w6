import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import FeaturedSongs from "./Pages/FeaturedSong";
import SearchSongs from "./Pages/SearchSong";
import MouseTrail from "./Components/MouseTrail"; // Import MouseTrail
import Login from "./Pages/Login";
import EmptyBody from "./Components/User";


function App() {
  return (
    <Router>
      <div className="Landing-page">
        <MouseTrail />
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/featuredsongs" element={<FeaturedSongs />} />
          <Route path="/searchsongs" element={<SearchSongs />} />
          <Route path="/Log-in" element={<Login/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


