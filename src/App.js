import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import{ BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./Pages/Homepage";
import FeaturedSongs from "./Pages/FeaturedSong";
import SearchSongs from "./Pages/SearchSong";


function App() {
  return (
    <Router>
    <div>
      <Nav/>
      <Route path='/' exact component={Homepage}/>
      <Route path='/featuredsongs' exact component={FeaturedSongs}/>
      <Route path='/searchsongs' exact component={SearchSongs}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
