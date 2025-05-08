import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Log from "./Log";
import Reg from "./Reg"; // Import the Register component
import Home from "./Home";
import About from "./About";
import Trans from "./Trans";
import Rep from "./Rep.js";
import './Log.css';
import './Reg.css';
import "./Home.css";
import "./About.css";
import "./Rep.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Log />} />
        <Route path="/Reg" element={<Reg />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/About" element={<About />} />
        <Route path="/Trans" element={<Trans />} />
        <Route path="/Rep" element={<Rep />} />
      </Routes>
    </Router>
  );
}

export default App;
