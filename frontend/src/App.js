import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Home } from "./components/home";
import { Favorites } from "./components/favorites";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
      </Routes>
    </div>
  );
}

export default App;
