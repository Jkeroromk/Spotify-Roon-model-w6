import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import{ BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import Songs from "./Pages/Songs";


function App() {
  return (
    <Router>
    <div>
      <Nav/>
      <Route path='/' exact component={SearchPage}/>
      <Route path='/songs' exact component={Songs}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
